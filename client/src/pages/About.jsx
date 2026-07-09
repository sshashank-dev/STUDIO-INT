import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-full p-10 md:p-20 overflow-x-hidden">

            {/* Title with Home Link & Hover Effect */}
            <Link to="/" className="inline-block group mb-10">
                <h1 className="text-[clamp(24px,4vw,40px)] tracking-[0.2em] uppercase font-serif group-hover:opacity-50 transition-opacity duration-300">
                    STUDIO.INT INTERIOR DESIGN
                </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.1em] mb-20">
                {["ABOUT", "SELECTED PROJECTS", "INT SHOP", "CONTACT"].map(item => (
                    <Link
                        key={item}
                        to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`${item === "ABOUT" ? "underline underline-offset-4" : "hover:opacity-50"} transition-opacity`}
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Header Section */}
            <h2 className="text-xl mb-4 text-[#666]">ABOUT STUDIO.INT</h2>
            <div className="w-12 h-[1px] bg-[#666] mb-16" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                <div className="md:col-span-1">
                    <img
                        src="/your-left-photo.jpg"
                        alt="Architectural detail"
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="md:col-span-1 space-y-8 text-[14px] leading-relaxed">
                    {[
                        { title: "OUR MISSION", text: "is to design functional, beautiful, well-crafted objects and spaces that will last and bring joy." },
                        { title: "OUR PERSPECTIVE", text: "is informed by a respect for historical architecture coupled with an appreciation of the playfulness and brightness of modern design." },
                        { title: "OUR APPROACH", text: "is dynamic and thorough. We understand that our clients’ needs and preferences are unique. This drives us to design each project from scratch..." }
                    ].map(section => (
                        <div key={section.title}>
                            <h4 className="font-bold uppercase tracking-[0.1em] mb-2">{section.title}</h4>
                            <p className="text-[#333]">{section.text}</p>
                        </div>
                    ))}
                </div>

                <div className="md:col-span-1">
                    <img
                        src="/your-right-photo.jpg"
                        alt="Interior design project"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;