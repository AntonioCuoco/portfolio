import { useState } from 'react';

// A decorative square with a centered circle and dot
export default function StatusSquare({
    size = "md",
    dotColor = "#EE7B30", // Orange dot by default
    className = "",
    text,
    textColor = "#EE7B30",
    elementId,
    downloadable = false,
    downloadableLink = ""
}) {
    // Size configurations
    const sizeConfig = {
        xs: {
            container: "w-10 h-10",
            circle: "w-6 h-6",
            text: "text-[10px]",
            dot: "w-1.5 h-1.5"
        },
        sm: {
            container: "w-14 h-14",
            circle: "w-9 h-9",
            text: "text-xs",
            dot: "w-2 h-2"
        },
        md: {
            container: "w-20 h-20",
            circle: "w-12 h-12",
            text: "text-sm",
            dot: "w-2.5 h-2.5"
        },
        lg: {
            container: "w-28 h-28",
            circle: "w-16 h-16",
            text: "text-base",
            dot: "w-3 h-3"
        },
        xl: {
            container: "w-36 h-36",
            circle: "w-20 h-20",
            text: "text-lg",
            dot: "w-4 h-4"
        }
    };

    const config = sizeConfig[size] || sizeConfig.md;
    const [isPressed, setIsPressed] = useState(false);

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
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onClick={() => document.getElementById(elementId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })}
        >

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
                                : '0 2px 3px rgba(238, 123, 48, 0.3)', // Glow matching the dot color
                            transform: isPressed ? 'scale(0.9)' : 'scale(1)'
                        }}
                    />)
                }
            </div>
        </button >
    );
}
