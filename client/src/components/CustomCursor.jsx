import { useEffect, memo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = memo(() => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const scrollX = useSpring(cursorX, springConfig);
    const scrollY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor, { passive: true });
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: scrollX,
                y: scrollY,
                transform: "translate3d(-50%, -50%, 0)",
                willChange: "transform"
            }}
        />
    );
});

export default CustomCursor;