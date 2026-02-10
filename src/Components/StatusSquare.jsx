import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * StatusSquare Component
 * 
 * A decorative button with a centered circle and dot.
 * Can optionally be made draggable within its container.
 * 
 * @param {boolean} draggable - If true, the button can be dragged within its container. Default: false
 */
export default function StatusSquare({
    size = "md",
    dotColor = "#EE7B30", // Orange dot by default
    className = "",
    text,
    textColor = "#EE7B30",
    elementId,
    downloadable = false,
    downloadableLink = "",
    draggable = false // NEW: Enable/disable drag functionality
}) {
    // Size configurations
    const sizeConfig = {
        xs: {
            container: "w-10 h-10",
            circle: "w-6 h-6",
            text: "text-[10px]",
            dot: "w-1.5 h-1.5",
            size: 40
        },
        sm: {
            container: "w-14 h-14",
            circle: "w-9 h-9",
            text: "text-xs",
            dot: "w-2 h-2",
            size: 56
        },
        md: {
            container: "w-20 h-20",
            circle: "w-12 h-12",
            text: "text-sm",
            dot: "w-2.5 h-2.5",
            size: 80
        },
        lg: {
            container: "w-28 h-28",
            circle: "w-16 h-16",
            text: "text-base",
            dot: "w-3 h-3",
            size: 112
        },
        xl: {
            container: "w-36 h-36",
            circle: "w-20 h-20",
            text: "text-lg",
            dot: "w-4 h-4",
            size: 144
        }
    };

    const config = sizeConfig[size] || sizeConfig.md;
    const [isPressed, setIsPressed] = useState(false);

    // Drag state (only used when draggable=true)
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

    // Calculate bounds for dragging
    const getBounds = useCallback(() => {
        if (!containerRef.current || !buttonRef.current) return null;
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonSize = config.size;

        return {
            minX: 0,
            maxX: containerRect.width - buttonSize,
            minY: 0,
            maxY: containerRect.height - buttonSize
        };
    }, [config.size]);

    // Handle drag start
    const handleDragStart = useCallback((clientX, clientY) => {
        if (!draggable) return;
        setIsDragging(true);
        dragStartRef.current = {
            x: clientX,
            y: clientY,
            posX: position.x,
            posY: position.y
        };
    }, [draggable, position]);

    // Handle drag move
    const handleDragMove = useCallback((clientX, clientY) => {
        if (!isDragging || !draggable) return;

        const bounds = getBounds();
        if (!bounds) return;

        const deltaX = clientX - dragStartRef.current.x;
        const deltaY = clientY - dragStartRef.current.y;

        let newX = dragStartRef.current.posX + deltaX;
        let newY = dragStartRef.current.posY + deltaY;

        // Clamp to bounds
        newX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
        newY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));

        setPosition({ x: newX, y: newY });
    }, [isDragging, draggable, getBounds]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Mouse events for draggable mode
    const handleMouseDown = (e) => {
        if (draggable) {
            e.preventDefault();
            handleDragStart(e.clientX, e.clientY);
        }
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    const handleMouseLeave = () => {
        if (!draggable) {
            setIsPressed(false);
        }
    };

    // Touch events
    const handleTouchStart = (e) => {
        if (draggable) {
            const touch = e.touches[0];
            handleDragStart(touch.clientX, touch.clientY);
        }
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };

    // Global event listeners for drag (only when draggable)
    useEffect(() => {
        if (!draggable) return;

        const handleMouseMove = (e) => {
            handleDragMove(e.clientX, e.clientY);
        };

        const handleGlobalMouseUp = () => {
            handleDragEnd();
            setIsPressed(false);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            handleDragMove(touch.clientX, touch.clientY);
        };

        const handleGlobalTouchEnd = () => {
            handleDragEnd();
            setIsPressed(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleGlobalTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [isDragging, draggable, handleDragMove, handleDragEnd]);

    // Handle click
    const handleClick = () => {
        if (draggable) {
            // Only trigger click if we didn't drag
            const dragDistance = Math.abs(position.x - dragStartRef.current.posX) +
                Math.abs(position.y - dragStartRef.current.posY);
            if (dragDistance < 5 && elementId) {
                document.getElementById(elementId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } else {
            // Normal click behavior
            if (elementId) {
                document.getElementById(elementId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    // The button content (shared between both modes)
    const buttonContent = (
        <>
            {/* Inner "Keycap" surface */}
            <div
                className={`
                    ${config.circle}
                    bg-white
                    rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    shadow-[inset_0_4px_8px_rgba(0,0,0,0.12),_0_1px_2px_rgba(255,255,255,1)]
                `}
                style={{
                    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                }}
            >
                {text ? (
                    <a href={downloadableLink} download={downloadable} target="_blank" rel="noopener noreferrer">
                        <span
                            className={`${config.text} text-center font-medium leading-tight whitespace-nowrap font-tanker`}
                            style={{ color: textColor }}
                        >
                            {text}
                        </span>
                    </a>
                ) : (
                    <div
                        className={`
                            ${config.dot} 
                            rounded-full 
                            transition-all duration-200
                        `}
                        style={{
                            backgroundColor: dotColor,
                            boxShadow: isPressed
                                ? '0 0 0 rgba(0,0,0,0)'
                                : '0 2px 3px rgba(238, 123, 48, 0.3)',
                            transform: isPressed ? 'scale(0.9)' : 'scale(1)'
                        }}
                    />
                )}
            </div>
        </>
    );

    // NON-DRAGGABLE MODE (default) - returns the original simple button
    if (!draggable) {
        return (
            <button
                className={`
                    ${config.container}
                    bg-[#f8f8f8]
                    rounded-[18px]
                    flex items-center justify-center
                    relative
                    transition-all duration-100 cubic-bezier(0.4, 0, 0.2, 1)
                    outline-none
                    group
                    ${className}
                `}
                style={{
                    boxShadow: isPressed
                        ? '0 2px 0 #e5e5e5, 0 2px 4px rgba(0,0,0,0.1)'
                        : '0 6px 0 #e5e5e5, 0 8px 16px rgba(0,0,0,0.1)',
                    transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
                    border: '1px solid #f0f0f0'
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
            >
                {buttonContent}
            </button>
        );
    }

    // DRAGGABLE MODE - wraps button in a container for drag bounds
    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full ${className}`}
        >
            <button
                ref={buttonRef}
                className={`
                    ${config.container}
                    bg-[#f8f8f8]
                    rounded-[18px]
                    flex items-center justify-center
                    absolute
                    transition-shadow duration-100 cubic-bezier(0.4, 0, 0.2, 1)
                    outline-none
                    group
                    select-none
                    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                `}
                style={{
                    left: position.x,
                    top: position.y,
                    boxShadow: isPressed
                        ? '0 2px 0 #e5e5e5, 0 2px 4px rgba(0,0,0,0.1)'
                        : '0 6px 0 #e5e5e5, 0 8px 16px rgba(0,0,0,0.1)',
                    transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
                    border: '1px solid #f0f0f0',
                    touchAction: 'none'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onClick={handleClick}
            >
                {buttonContent}
            </button>
        </div>
    );
}
