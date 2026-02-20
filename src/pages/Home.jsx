import { motion } from "framer-motion";
import { Header } from "@/Components/Header/Header";
import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [activeSection, setActiveSection] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            
            const scrollPosition = scrollContainerRef.current.scrollTop;
            const windowHeight = window.innerHeight;
            
            // Calcola quale sezione è attiva in base allo scroll
            const sectionIndex = Math.round(scrollPosition / windowHeight);
            setActiveSection(sectionIndex);
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

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
                {/* Header Fixed con colore dinamico */}
                <Header activeSection={activeSection} />

                {/* Contenitore scrollabile */}
                <div 
                    ref={scrollContainerRef}
                    className="w-full h-full overflow-y-auto"
                >
                    
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
                    </section>

                    {/* Seconda Sezione - Background Diverso */}
                    <section className="relative w-full h-screen bg-black">
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-white text-start max-w-4xl flex flex-col gap-6"
                            >
                                <h1 className="text-2xl">About Me</h1>
                                <p className="text-6xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
                            </motion.div>
                        </div>
                    </section>

                </div>
            </motion.div>
        </div>
    );
}
