import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectData } from '../data/projects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const project = projectData[slug];
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!project) return <div className="p-20">Project not found</div>;

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % project.images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-full p-10 md:p-20">
            <h1 className="text-[clamp(24px,4vw,40px)] tracking-[0.2em] uppercase font-serif mb-20">STUDIO.INT INTERIOR DESIGN</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Image Gallery with Arrows Outside */}
                <div className="w-full flex items-center gap-4">
                    <button onClick={prevImage} className="p-2 opacity-30 hover:opacity-100 transition-opacity flex-shrink-0">
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
                            <path d="M20 2L4 20L20 38" />
                        </svg>
                    </button>

                    <div className="w-full flex flex-col">
                        <img src={project.images[currentIndex]} alt={project.title} className="w-full h-auto" />
                        <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#666]">
                            {currentIndex + 1} / {project.images.length}
                        </div>
                    </div>

                    <button onClick={nextImage} className="p-2 opacity-30 hover:opacity-100 transition-opacity flex-shrink-0">
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
                            <path d="M4 2L20 20L4 38" />
                        </svg>
                    </button>
                </div>

                {/* Project Details */}
                <div className="max-w-md">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">{project.title}</h2>
                    <p className="text-[14px] leading-relaxed text-[#333] mb-8">{project.description}</p>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Featured In</h4>
                    <p className="text-[12px] text-[#666] mb-6">{project.featuredIn}</p>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Photos By</h4>
                    <p className="text-[12px] text-[#666]">{project.photosBy}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;