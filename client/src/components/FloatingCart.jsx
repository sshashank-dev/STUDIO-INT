import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FloatingCart = () => {
    const { cart, total } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) return null;

    return (
        <div
            onClick={() => navigate('/cart')}
            className="fixed bottom-6 right-6 bg-[#1a1a1a] text-white px-6 py-4 rounded-full flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform shadow-lg z-50"
        >
            <span className="text-sm">🛒 {cart.length} items</span>
            <span className="font-bold">${total.toLocaleString()}</span>
        </div>
    );
};

export default FloatingCart;