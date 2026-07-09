import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, total } = useCart();
    const navLinks = ["MIRRORS", "RUGS", "LIGHTING", "MEET THE MAKERS", "FAQ", "PRESS", "TO THE TRADE", "COMING SOON"];

    return (
        <div className="bg-white min-h-screen p-10 md:p-20 text-[#1a1a1a] font-sans">
            {/* Header */}
            <header className="mb-16">
                {/* Studio title links to home */}
                <Link to="/" className="inline-block group mb-8">
                    <h1 className="text-[clamp(24px,4vw,40px)] tracking-[0.2em] font-serif uppercase">
                        STUDIO.INT INTERIOR DESIGN
                    </h1>
                </Link>

                <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.1em]">
                    {/* JH SHOP also links to home or shop main */}
                    <Link to="/" className="font-bold text-[#1a1a1a] hover:opacity-50 transition-opacity">
                        JH SHOP
                    </Link>
                    <nav className="flex gap-6 opacity-70">
                        {["MIRRORS", "RUGS", "LIGHTING", "MEET THE MAKERS"].map(link => (
                            <span key={link} className="hover:underline cursor-pointer">{link}</span>
                        ))}
                    </nav>
                </div>
            </header>

            <h2 className="text-[18px] uppercase tracking-[0.1em] mb-10 border-b border-transparent">SHOPPING CART</h2>

            {cart.length === 0 ? (
                <p className="text-[14px]">Your cart is empty.</p>
            ) : (
                <div className="max-w-6xl">
                    {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-[#e5e5e5] py-6">
                            <div className="flex items-center gap-6">
                                <img src={item.image} alt={item.title} className="w-20 h-24 object-cover" />
                                <div>
                                    <h3 className="text-[14px] uppercase">{item.title} | {item.variant}</h3>
                                    <p className="text-[12px] opacity-60">Options: 5'x8'</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3 text-[14px] opacity-50">
                                    <button>-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                                <p className="text-[14px] w-20 text-right">$3,540.00</p>
                                <button onClick={() => removeFromCart(index)} className="text-[16px] opacity-40 hover:opacity-100">×</button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-10 flex flex-col items-end">
                        <div className="flex gap-16 mb-8">
                            <p className="text-[14px] font-bold">Subtotal</p>
                            <p className="text-[14px] font-bold">$3,540.00</p>
                        </div>
                        <Link
                            to="/checkout"
                            className="inline-block text-center border border-black px-16 py-3 uppercase text-[12px] tracking-[0.1em] hover:bg-black hover:text-white transition-colors"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;