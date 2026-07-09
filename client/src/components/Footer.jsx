import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-20 px-10 md:px-20 border-t border-white/10 bg-[#0A0A0A] text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand Section */}
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Studio.Int</h2>
                    <p className="text-[10px] uppercase tracking-widest mt-4 opacity-60">
                        Interior Design & Architecture
                    </p>
                </div>

                {/* Navigation with Slash-Reveal Effect */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2">Navigation</span>
                    {["About", "Selected-Projects", "Shop", "Contact"].map((link) => (
                        <Link
                            key={link}
                            to={`/${link.toLowerCase()}`}
                            className="group flex items-center text-[12px] uppercase w-fit"
                        >
                            <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-300">/</span>
                            <span className="group-hover:translate-x-2 transition-transform duration-300">
                                {link.replace('-', ' ')}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Social Icons (Inline SVG - No Library Needed) */}
                <div className="flex flex-col items-start md:items-end justify-between">
                    <div className="flex gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8" /><path d="M12 8v8" /><circle cx="12" cy="12" r="10" /></svg>
                        </a>

                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] opacity-30 mt-12">
                        © 2026 // SYSTEM_DASHBOARD
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;