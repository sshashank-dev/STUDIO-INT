import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "lucide-react";
import { MagneticWrapper } from './MagneticWrapper';

const Navbar = () => {
    // Array of navigation items
    const navItems = [
        { name: "ABOUT", path: "/about" },
        { name: "SELECTED PROJECTS", path: "/selected-projects" },
        // Change this path to match your App.jsx route
        { name: "INT SHOP", path: "/int-shop" },
        { name: "CONTACT", path: "/contact" },
    ];

    return (
        <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-[60] mix-blend-difference pointer-events-none">
            {/* Left Side: Brand Name */}
            <div className="pointer-events-auto">
                <MagneticWrapper>
                    <Link to="/" className="text-xl font-black tracking-tighter uppercase">
                        Studio.Int
                    </Link>
                </MagneticWrapper>
            </div>

            {/* Right Side: Navigation Links */}
            <div className="hidden md:flex flex-1 justify-end gap-18 items-center pointer-events-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="text-[10px] font-bold uppercase tracking-[0.05em] hover:opacity-60 transition-opacity"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden pointer-events-auto">
                <MagneticWrapper>
                    <Menu className="w-6 h-6" />
                </MagneticWrapper>
            </div>
        </nav>
    );
};

export default Navbar;