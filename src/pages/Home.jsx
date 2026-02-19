import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="min-h-screen min-w-screen flex flex-col gap-6 md:gap-10 bg-[#F5F5F5] font-bespoke px-4 md:px-6 py-4">
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
                    style={{ padding: 40, color: "white" }}
                >
                    <h1>Contenuto della pagina</h1>
                    <p>Testo, CTA, immagini, ecc.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
