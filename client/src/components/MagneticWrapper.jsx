import { memo, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const MagneticWrapper = memo(({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        x.set((clientX - (left + width / 2)) * 0.3);
        y.set((clientY - (top + height / 2)) * 0.3);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: springX, y: springY, willChange: "transform" }}
        >
            {children}
        </motion.div>
    );
});