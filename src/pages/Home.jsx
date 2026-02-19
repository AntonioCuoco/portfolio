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
                {/* Contenitore scrollabile */}
                <div className="w-full h-full overflow-y-auto">
                    
                    {/* Prima Sezione - Con Video Background */}
                    <section className="relative w-full h-screen">
                        <motion.video
                            src="/videos/red-dancer.mp4"
                            autoPlay
                            loop
                            muted
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 w-full h-full bg-black/25" />
                        
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="relative z-10"
                            style={{ color: "white" }}
                        >
                            <Header />
                        </motion.div>
                    </section>

                    {/* Seconda Sezione - Background Diverso */}
                    <section className="relative w-full h-screen bg-black">
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-white text-center"
                            >
                                <h2 className="text-5xl font-bold mb-4">Seconda Sezione</h2>
                                <p className="text-xl">Contenuto con background diverso</p>
                            </motion.div>
                        </div>
                    </section>

                </div>
            </motion.div>
        </div>
    );
}
