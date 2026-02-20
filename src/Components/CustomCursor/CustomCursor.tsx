"use client"

import { motion } from "framer-motion";
import { useMousePosition } from "@/Hooks/useMousePosition";
import { useState, useEffect } from "react";

const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [cursorState, setCursorState] = useState<'scroll' | 'click' | 'play'>('scroll');
    const [displayText, setDisplayText] = useState("Scroll");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check if hovering over video
            const isVideo = target.tagName === 'VIDEO' || !!target.closest('video');
            
            if (isVideo) {
                setCursorState('play');
                return;
            }
            
            // Check if the element or its parent is clickable
            const isClickable = 
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.onclick !== null ||
                !!target.closest('button') ||
                !!target.closest('a') ||
                !!target.closest('[role="button"]') ||
                !!target.closest('li') ||
                target.style.cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setCursorState(isClickable ? 'click' : 'scroll');
        };

        document.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Typing effect when cursor state changes
    useEffect(() => {
        const targetText = cursorState === 'play' ? 'Play' : cursorState === 'click' ? 'Click' : 'Scroll';
        
        if (displayText === targetText) return;

        setIsTyping(true);
        
        // Phase 1: Delete current text
        let currentText = displayText;
        const deleteInterval = setInterval(() => {
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                setDisplayText(currentText);
            } else {
                clearInterval(deleteInterval);
                
                // Phase 2: Type new text
                let index = 0;
                const typeInterval = setInterval(() => {
                    if (index < targetText.length) {
                        setDisplayText(targetText.slice(0, index + 1));
                        index++;
                    } else {
                        clearInterval(typeInterval);
                        setIsTyping(false);
                    }
                }, 50); // Speed of typing
            }
        }, 40); // Speed of deleting

        return () => {
            clearInterval(deleteInterval);
        };
    }, [cursorState]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none
                 w-14 h-14 p-4 rounded-full flex justify-center items-center bg-transparent border border-[#f9f9f9] mix-blend-difference"
            animate={{
                x: x - 12,
                y: y - 12,
                scale: cursorState !== 'scroll' ? 1.2 : 1,
            }}
            transition={{
                x: { type: "spring", stiffness: 500, damping: 30 },
                y: { type: "spring", stiffness: 500, damping: 30 },
                scale: { type: "spring", stiffness: 400, damping: 25 },
            }}
        > 
            <p className="text-white text-xs font-bold font-mono">
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
            </p>
        </motion.div>
    );
}

export default CustomCursor;