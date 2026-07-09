import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import PhotoGallery from "../components/PhotoGallery";
import FurnitureScene from "../components/FurnitureScene";
import Navbar from "../components/Navbar"; // IMPORTED NAV
import ConsultationSection from "../components/ConsultationSection";

import Footer from "../components/footer";

const InteriorApp = lazy(() => import("../components/InteriorApp"));

export default function Home() {
    useSmoothScroll();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const transition = { duration: 1.2, ease: [0.33, 1, 0.68, 1] };

    return (
        <main className="bg-[#000000] text-white min-h-screen font-sans overflow-x-hidden relative">
            <Navbar /> {/* CLEANED UP NAV */}

            <div className="noise-bg pointer-events-none opacity-[0.03]" />



            <section className="h-screen flex flex-col justify-center px-6 md:px-10 border-b border-white/5 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } } // Staggers the lines
                    }}
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
                            transition={transition}
                            className="text-[clamp(60px,18vw,300px)] leading-[0.75] font-black uppercase tracking-tighter"
                        >
                            Architectural
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
                            transition={{
                                duration: 1.4,
                                delay: 0.8, // Add this delay to wait for the curtain
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="text-[clamp(60px,18vw,300px)] leading-[0.75] font-black uppercase tracking-tighter opacity-10"
                            style={{ WebkitTextStroke: "1px white", color: "transparent" }}
                        >
                            Narratives
                        </motion.h1>
                    </div>
                </motion.div>
            </section>

            <Suspense fallback={null}><InteriorApp /></Suspense>
            <PhotoGallery />
            <Suspense fallback={<div className="h-screen flex items-center justify-center opacity-10"><Loader2 className="animate-spin" /></div>}><FurnitureScene /></Suspense>
            <br />
            <ConsultationSection />

            <Footer />
        </main>
    );
}