import React from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../data/projects';

const Projects = () => {
    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-full p-10 md:p-20">
            {/* Added Home Link and Hover Effect */}
            <Link to="/" className="inline-block group mb-10">
                <h1 className="text-[clamp(24px,4vw,40px)] tracking-[0.2em] uppercase font-serif group-hover:opacity-50 transition-opacity duration-300">
                    STUDIO.INT INTERIOR DESIGN
                </h1>
            </Link>

            {/* Nav */}
            <nav className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.1em] mb-12">
                {["ABOUT", "SELECTED PROJECTS", "INT SHOP", "CONTACT"].map(item => (
                    <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className={item === "SELECTED PROJECTS" ? "underline underline-offset-4" : "hover:opacity-50"}>
                        {item}
                    </Link>
                ))}
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.keys(projectData).map((slug) => (
                    <Link key={slug} to={`/project/${slug}`} className="group block">
                        <div className="w-full aspect-[4/3] bg-[#f4f4f4] mb-4 overflow-hidden">
                            <img src={projectData[slug].images[0]} alt={projectData[slug].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">{projectData[slug].title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Projects; 