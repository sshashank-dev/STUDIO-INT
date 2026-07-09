import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shopData } from '../data/shop';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter logic: if 'All' is selected, show everything, otherwise filter by category
    const filteredItems = selectedCategory === 'All'
        ? Object.entries(shopData)
        : Object.entries(shopData).filter(([_, item]) => item.category === selectedCategory);

    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-[100vw] overflow-x-hidden p-10 md:p-20">
            {/* 1. Main Header */}
            <header className="mb-8">
                <Link to="/" className="inline-block group mb-4">
                    <h1 className="text-[32px] md:text-[40px] tracking-[0.2em] font-serif uppercase group-hover:opacity-50 transition-opacity">
                        STUDIO.INT INTERIOR DESIGN
                    </h1>
                </Link>

                {/* 2. Shop Sub-Header with Clickable Filters */}
                <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.1em] mb-12">
                    <h2 className="text-[18px] font-serif">jh shop</h2>
                    <nav className="flex gap-4">
                        {/* Added "All" as a filter option */}
                        {["All", "Mirrors", "Rugs", "Lighting"].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`hover:underline cursor-pointer ${selectedCategory === cat ? "underline" : "opacity-70"}`}
                            >
                                {cat}
                            </button>
                        ))}

                    </nav>
                </div>
            </header>

            {/* 3. Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {filteredItems.map(([slug, item]) => (
                    <Link to={`/shop/${slug}`} key={slug} className="group block">
                        <div className="aspect-[3/4] bg-[#f4f4f4] mb-6 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-[11px] uppercase tracking-[0.1em]">
                            {item.title} {item.variant ? `| ${item.variant}` : ''}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Shop;