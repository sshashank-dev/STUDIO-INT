import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { shopData } from '../data/shop';
import { useCart } from '../context/CartContext'; // Added this import

const ProductDetail = () => {
    const { slug } = useParams();
    const product = shopData[slug];
    const location = useLocation();
    const { addToCart } = useCart(); // Added this hook

    // Exact navigation links as per your Shop.jsx
    const navLinks = ["MIRRORS", "RUGS", "LIGHTING", "MEET THE MAKERS"];

    if (!product) return <div className="p-20">Product not found.</div>;

    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-[100vw] overflow-x-hidden p-10 md:p-20">
            {/* Header: Exact match to Shop.jsx */}
            <header className="mb-16">
                <Link to="/" className="inline-block group mb-4">
                    <h1 className="text-[32px] md:text-[40px] tracking-[0.2em] font-serif uppercase group-hover:opacity-50 transition-opacity duration-300">
                        STUDIO.INT INTERIOR DESIGN
                    </h1>
                </Link>

                <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.1em] mb-12">
                    <h2 className="text-[18px] font-serif">jh shop</h2>
                    <nav className="flex gap-4 opacity-70">
                        {navLinks.map(link => (
                            <span key={link} className="hover:underline cursor-pointer">{link}</span>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Layout: Exact two-column match */}
            <div className="grid md:grid-cols-2 gap-16 items-start">

                {/* Left: Product Details */}
                <div className="max-w-xl">
                    <h1 className="text-[24px] uppercase tracking-[0.2em] mb-4">{product.title} | {product.variant}</h1>
                    <p className="text-[16px] mb-6 font-bold">$1,600.00</p>
                    <p className="text-[14px] leading-relaxed opacity-80 mb-6">
                        A beautifully abstracted design, inspired by mid-century artisans. Elevates any interior.
                    </p>
                    <p className="text-[14px] mb-8">Dimensions: 14 1/2" W x 11 1/2" H.</p>

                    {/* Updated button with onClick */}
                    <button
                        onClick={() => addToCart(product)}
                        className="border border-black px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                    <div className="mt-8 text-[10px] uppercase underline cursor-pointer">Tear Sheet</div>
                </div>

                {/* Right: Single Image */}
                <div className="w-full flex justify-center items-start">
                    <div className="aspect-[4/5] bg-[#ffffff] w-full max-w-[600px]  mt-[-120px] p-12 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;