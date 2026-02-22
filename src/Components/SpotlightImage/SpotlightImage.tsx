import { useState, useEffect, useRef } from "react";

interface SpotlightImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

export default function SpotlightImage({ 
    src, 
    alt = "", 
    width = 500, 
    height = 500
}: SpotlightImageProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Rileva se siamo su mobile/touch device
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        
        checkMobile();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const isInside = 
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            setIsHovering(isInside);

            if (isInside) {
                // Calcola posizione relativa all'immagine
                setLocalMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Su mobile mostra sempre l'immagine
    if (isMobile) {
        return (
            <div 
                className="relative"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                <img 
                    src={src} 
                    alt={alt}
                    className="w-full h-full object-contain"
                />
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            data-spotlight-area
            className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {/* Immagine con mask circolare */}
            <div
                className="absolute inset-0"
                style={{
                    opacity: isHovering ? 1 : 0,
                    maskImage: isHovering 
                        ? `radial-gradient(circle 150px at ${localMousePos.x}px ${localMousePos.y}px, black 100%, transparent 100%)`
                        : 'radial-gradient(circle 0px at ${localMousePos.x}px ${localMousePos.y}px, black 100%, transparent 100%)',
                    WebkitMaskImage: isHovering 
                        ? `radial-gradient(circle 150px at ${localMousePos.x}px ${localMousePos.y}px, black 100%, transparent 100%)`
                        : 'radial-gradient(circle 0px at ${localMousePos.x}px ${localMousePos.y}px, black 100%, transparent 100%)',
                    transition: 'none',
                }}
            >
                <img 
                    src={src} 
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
            </div>
        </div>
    );
}
