import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1732084113950-CWUOHX7E58ZHQK53R2KF/jhid-albee-335x.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/46c40f22-2778-435b-93bc-db7612f2dc06/23_Library_jhid-foresthouse-366x.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1714058269523-2LEJT2SNCBVDJHD9PJHS/jhid-paris-160x.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1701307616049-O24IR665IUWG2O7F0Q4D/jhid-paris-661x.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1654892246664-C6V40POCJ6FESLYX1EDE/1_jhid-cohen-469x.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1629504312085-LTFRQEYU1S0AM2IXISDY/helgerson-LIOWA-107xcrop.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5627ec30e4b0dc30fe462054/1587598583512-0SN6ZIGF6YP9U1XDHITB/03_JHID_Albemarle+Terrace.jpg?format=2500w",
];

// Custom Thin Arrow Component
const ThinArrow = ({ direction }) => (
    <svg
        width="40" height="80" viewBox="0 0 20 40"
        fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
    >
        {direction === 'left' ? (
            <path d="M15 5L5 20L15 35" />
        ) : (
            <path d="M5 5L15 20L5 35" />
        )}
    </svg>
);

export default function PhotoGallery() {
    const [index, setIndex] = useState(0);
    const [hoveredSide, setHoveredSide] = useState(null);

    const next = () => setIndex((i) => (i + 1) % photos.length);
    const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

    return (
        <section
            onMouseMove={(e) => setHoveredSide(e.clientX < window.innerWidth / 2 ? 'left' : 'right')}
            onMouseLeave={() => setHoveredSide(null)}
            className="relative h-screen w-full overflow-hidden cursor-pointer bg-[#0A0A0A]"
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={photos[index]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "linear" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Typography Overlay */}
            <div className="absolute top-10 left-10 z-10 pointer-events-none">
                <h1 className="text-4xl font-light tracking-[0.2em] uppercase leading-tight text-white/90">
                    <br />Helgerson<br />Interior<br />Design
                </h1>
            </div>

            {/* Left Trigger Area */}
            <div onClick={prev} className="absolute left-0 top-0 w-1/2 h-full z-20 flex items-center justify-start pl-10">
                {hoveredSide === 'left' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ThinArrow direction="left" />
                    </motion.div>
                )}
            </div>

            {/* Right Trigger Area */}
            <div onClick={next} className="absolute right-0 top-0 w-1/2 h-full z-20 flex items-center justify-end pr-10">
                {hoveredSide === 'right' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ThinArrow direction="right" />
                    </motion.div>
                )}
            </div>
        </section>
    );
}