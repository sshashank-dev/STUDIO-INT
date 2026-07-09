// components/Curtains.jsx
import { motion } from "framer-motion";

export const Curtains = ({ location }) => {
    // Heavy fabric feel: Fast start, slow end (Expo-like)
    const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] };

    return (
        <>
            {/* LEFT PANEL: Slightly ahead */}
            <motion.div
                key={location.pathname + "left"}
                className="fixed top-0 left-0 w-[50vw] h-full z-[9999] pointer-events-none bg-[#0a0a0a]"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%", "-100%"] }}
                transition={transition}
            />
            {/* RIGHT PANEL: Tiny delay makes it feel like fabric pulling */}
            <motion.div
                key={location.pathname + "right"}
                className="fixed top-0 right-0 w-[50vw] h-full z-[9999] pointer-events-none bg-[#0a0a0a]"
                initial={{ x: "100%" }}
                animate={{ x: ["100%", "0%", "100%"] }}
                transition={{ ...transition, delay: 0.05 }}
            />
        </>
    );
};