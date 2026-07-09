import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo } from "react";

const ProjectCard = memo(({ project, index, setSelectedProject }) => {
    const scale = useMotionValue(1);
    const springScale = useSpring(scale, { stiffness: 120, damping: 20 });

    const handleMouseEnter = () => {
        // BYPASS REACT STATE: Prevents the whole Home.jsx from re-rendering
        document.documentElement.setAttribute('data-cursor', 'hovered');
        scale.set(1.05);
    };

    const handleMouseLeave = () => {
        document.documentElement.setAttribute('data-cursor', 'normal');
        scale.set(1);
    };

    return (
        <div
            className="group cursor-none relative mb-24 md:mb-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedProject(project)}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111] transform-gpu">
                <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{ scale: springScale }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                />
            </div>

            <div className="mt-8 flex justify-between items-start">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all duration-500 origin-left">
                    {project.title}
                </h3>

                <div className="p-3 border border-white/5 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <path d="M1 1H14V14" stroke="currentColor" strokeWidth="2" />
                        <path d="M1 14L14 1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        </div>
    );
});

export default ProjectCard;