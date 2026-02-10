import { useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * ScrambleLogo Component
 * 
 * Displays the "A" logo with a scramble text effect on hover.
 * When the user hovers over the logo, letters cycle randomly
 * until the mouse leaves, then it returns to "A".
 */
export default function ScrambleLogo() {
    const [logoLetter, setLogoLetter] = useState("A");
    const scrambleIntervalRef = useRef(null);

    // Array di lettere per l'effetto scramble
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleLogoHover = () => {
        // Avvia l'effetto scramble
        scrambleIntervalRef.current = setInterval(() => {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            setLogoLetter(randomLetter);
        }, 50); // Cambia lettera ogni 50ms
    };

    const handleLogoLeave = () => {
        // Ferma l'effetto scramble e torna ad "A"
        if (scrambleIntervalRef.current) {
            clearInterval(scrambleIntervalRef.current);
            scrambleIntervalRef.current = null;
        }
        setLogoLetter("A");
    };

    return (
        <div
            className="flex flex-row gap-2 items-end relative"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
        >
            {/* 
                Larghezza fissa (w-6 md:w-10) per evitare layout shift 
                quando le lettere cambiano durante l'animazione scramble.
                text-center per centrare la lettera nel container.
            */}
            <Link
                to="/"
                className="text-2xl md:text-4xl font-tanker transition-colors duration-300 w-5 text-center inline-block"
            >
                {logoLetter}
            </Link>
            <div
                className={`
                    w-2 h-2
                    rounded-full 
                    bg-[#EE7B30]
                    absolute bottom-1.5 right-[-9px]
                    transition-colors
                `}
            />
        </div>
    );
}
