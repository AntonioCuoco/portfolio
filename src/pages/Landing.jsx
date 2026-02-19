import { useState } from "react";
import { motion, AnimatePresence} from "framer-motion";
import Home from "@/pages/Home";


export default function Landing() {

    const [open, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(true);

    }

    return (
        <div className="min-h-screen min-w-screen flex flex-row justify-between items-center px-16 bg-[#F5F5F5]">
            <h1 className={`text-3xl ${open && "hidden"}`}>ANTONIO CUOCO</h1>
            <motion.div
                layoutId="card"
                className="w-[25vw] h-[30vw] bg-black flex justify-center items-center cursor-pointer"
                layout
                onClick={() => setIsOpen(!open)}
            >
                <p className={`text-[#f5f5f5] text-2xl ${open && "hidden"}`}>ENTER</p>
            </motion.div>
            <h1 className={`text-3xl ${open && "hidden"}`}><span className="-ml-6">CREATIVE</span><br /> FRONTEND<br /> <span className="ml-4">DEVELOPER</span></h1>

            <AnimatePresence>
                {open && <Home onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
