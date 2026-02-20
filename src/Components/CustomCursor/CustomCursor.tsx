"use client"

import { motion } from "framer-motion";
import { useMousePosition } from "@/Hooks/useMousePosition";
import { useState, useEffect } from "react";

const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isOverSpotlight, setIsOverSpotlight] = useState(false);

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

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
            style={{
                backgroundColor: isOverSpotlight ? 'transparent' : '#f97316',
            }}
            animate={{
                x: x - (isOverSpotlight ? 80 : 8),
                y: y - (isOverSpotlight ? 80 : 8),
                width: isOverSpotlight ? 160 : 16,
                height: isOverSpotlight ? 160 : 16,
            }}
            transition={{
                x: { type: "spring", stiffness: 500, damping: 30 },
                y: { type: "spring", stiffness: 500, damping: 30 },
                width: { type: "spring", stiffness: 300, damping: 25 },
                height: { type: "spring", stiffness: 300, damping: 25 },
            }}
        />
    );
}

export default CustomCursor;