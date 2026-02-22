"use client"

import { motion } from "framer-motion";
import { useMousePosition } from "@/Hooks/useMousePosition";
import { useState, useEffect } from "react";

const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isOverSpotlight, setIsOverSpotlight] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Dimensioni del cursor
    const smallSize = 24;
    const largeSize = 150;

    useEffect(() => {
        // Rileva se siamo su mobile/touch device
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        
        checkMobile();
    }, []);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Controlla se siamo sopra un'area spotlight
            const spotlightArea = target.closest('[data-spotlight-area]');
            setIsOverSpotlight(!!spotlightArea);
        };

        document.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Nascondi il cursor su mobile
    if (isMobile) return null;

    const currentSize = isOverSpotlight ? largeSize : smallSize;
    const offset = currentSize / 2;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
            animate={{
                x: x - offset,
                y: y - offset,
                width: currentSize,
                height: currentSize,
                backgroundColor: isOverSpotlight ? 'rgba(249, 115, 22, 0)' : 'rgba(249, 115, 22, 1)',
            }}
            transition={{
                x: { type: "spring", stiffness: 500, damping: 30 },
                y: { type: "spring", stiffness: 500, damping: 30 },
                width: { type: "spring", stiffness: 500, damping: 25 },
                height: { type: "spring", stiffness: 500, damping: 25 },
                backgroundColor: { duration: 0.3, ease: "easeInOut" },
            }}
        />
    );
}

export default CustomCursor;