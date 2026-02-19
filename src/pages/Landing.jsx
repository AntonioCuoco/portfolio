import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import TextScramble from "@/Components/TextScramble/TextScramble"

export default function Landing() {

    const [open, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen min-w-screen flex flex-col md:flex-row justify-between items-end md:justify-between md:items-center md:px-16 bg-[#F5F5F5]">
            <TextScramble className={`text-2xl md:text-3xl ${open && "hidden"} mr-4 w-48 whitespace-nowrap`} text="ANTONIO CUOCO" />
            <motion.video
                layoutId="card"
                className="w-[50vw] h-[50vw] md:w-[25vw] md:h-[30vw] relative bg-black mx-auto flex justify-center items-center cursor-pointer object-cover"
                layout
                onClick={() => setIsOpen(!open)}
                src="/videos/red-dancer.mp4"
            >
                <p className={`text-[#f5f5f5] text-2xl ${open && "hidden"}`}>ENTER</p>
            </motion.video>
            <h1 className={`text-3xl ${open && "hidden"} mr-4 w-48`}>
                <TextScramble text="CREATIVE" className="-ml-6"/> 
                <TextScramble text="FRONTEND" className="" />
                <TextScramble text="DEVELOPER" className="ml-4"/>
            </h1>

            <AnimatePresence>
                {open && <Home onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
