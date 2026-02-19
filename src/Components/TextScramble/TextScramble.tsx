import { useState, useRef, ElementType, HTMLAttributes } from "react";

interface TextScrambleProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  className?: string;
  speed?: number;
  as?: ElementType;
}

/**
 * TextScramble Component
 * 
 * Displays text with a scramble effect on hover.
 * Each letter cycles randomly when hovering, then returns to original text.
 * 
 * @param {string} text - The text to display
 * @param {string} className - Additional CSS classes
 * @param {number} speed - Speed of scramble effect in ms (default: 50)
 * @param {ElementType} as - HTML element to render (default: "p")
 */
export default function TextScramble({ 
  text = "Text", 
  className = "", 
  speed = 50,
  as: Component = "p",
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const scrambleIntervalRef = useRef<number | null>(null);
  const originalText = text;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleHover = () => {
    scrambleIntervalRef.current = window.setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((letter) => {
            if (letter === " ") return " ";
            
            // Genera una lettera random
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            return randomLetter;
          })
          .join("")
      );
    }, speed);
  };

  const handleLeave = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
    setDisplayText(originalText);
  };

  return (
    <Component
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      {...props}
    >
      {displayText}
    </Component>
  );
}
