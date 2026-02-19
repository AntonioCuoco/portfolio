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
                    borderRadius: 0
                }}

            >
                {/* Background */}
                <motion.video
                    src="/videos/red-dancer.mp4"
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full inset-0 object-fill"
                />
                <div className="absolute inset-0 w-full h-full top-0 left-0 bg-black/30" />

                {/* Contenuti che compaiono DOPO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{ color: "white" }}
                >
                    <Header />
                </motion.div>
            </motion.div>
        </div>
    );
}
