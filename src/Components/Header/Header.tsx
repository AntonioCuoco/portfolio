import { motion } from "framer-motion"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface HeaderProps {
    activeSection?: number;
}

export function Header({ activeSection = 0 }: HeaderProps) {
    // Definisci i colori per ogni sezione
    const sectionColors = [
        { text: "text-black", icon: "black" },      // Sezione 0 - Video rosso
        { text: "text-white", icon: "white" },      // Sezione 1 - Background scuro
    ];

    const currentColor = sectionColors[activeSection] || sectionColors[0];

    return(
        <div className="relative z-20">
            <motion.h1 
                className={`fixed top-6 left-8 text-2xl md:text-5xl ${currentColor.text} transition-colors duration-300`}
                animate={{ color: currentColor.icon }}
            >
                A
            </motion.h1>

            <motion.ul 
                className={`fixed right-8 top-6 text-lg ${currentColor.text} font-bold transition-colors duration-300`}
            >
                <motion.li className="cursor-pointer hover:opacity-70">
                    Work
                </motion.li>
                <motion.li className="cursor-pointer hover:opacity-70">
                    About
                </motion.li>
                <motion.li className="cursor-pointer hover:opacity-70">
                    Blog
                </motion.li>
            </motion.ul>

            <motion.ul className="fixed bottom-6 left-8 flex flex-col gap-4 text-2xl cursor-pointer">
                <motion.li className="hover:opacity-70 transition-opacity">
                    <FaLinkedinIn color={currentColor.icon}/>
                </motion.li>
                <motion.li className="hover:opacity-70 transition-opacity">
                    <FaGithub color={currentColor.icon}/>
                </motion.li>
                <motion.li className="hover:opacity-70 transition-opacity">
                    <FaInstagram color={currentColor.icon}/>
                </motion.li>
            </motion.ul>
        </div>
    );
}