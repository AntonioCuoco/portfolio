import { motion } from "framer-motion"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function Header() {
    return(
        <div className="relative">
            <motion.h1 className="fixed top-6 left-8 text-2xl md:text-5xl text-black">
                A
            </motion.h1>

            <motion.ul className="fixed right-8 top-6 text-lg text-black font-bold">
                <motion.li>
                    Work
                </motion.li>
                <motion.li>
                    About
                </motion.li>
                <motion.li>
                    Blog
                </motion.li>
            </motion.ul>

            <motion.ul className="fixed bottom-6 left-8 flex flex-col gap-4 text-2xl cursor-pointer">
                <motion.li>
                    <FaLinkedinIn color="black"/>
                </motion.li>
                <motion.li>
                    <FaGithub color="black"/>
                </motion.li>
                <motion.li>
                    <FaInstagram color="black"/>
                </motion.li>
            </motion.ul>
        </div>
    );
}