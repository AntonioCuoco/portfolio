import { motion } from "framer-motion";
import { Header } from "@/Components/Header/Header";

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            <motion.div
                layoutId="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    background: "linear-gradient(150deg, #060606, #050505)",
                    borderRadius: 0
                }}
            >
                {/* Contenuti che compaiono DOPO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{color: "white" }}
                >
                    <Header />
                </motion.div>
            </motion.div>
        </div>
    );
}
