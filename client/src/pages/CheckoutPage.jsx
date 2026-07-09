import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // 1. Unified state for all form fields
    const [formData, setFormData] = useState({
        email: '', firstName: '', lastName: '', address1: '', city: '', zip: '', phone: '',
        cardNumber: '', cardName: '', expiry: '', cvv: ''
    });

    const shipping = 119.00;
    const grandTotal = total + shipping;

    const statesAndUTs = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    // Helper to update state
    const updateField = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // 2. Validation Logic
    const validateStep = (stepNumber) => {
        if (stepNumber === 1) return formData.email.includes('@');
        if (stepNumber === 2) return formData.firstName && formData.address1 && formData.city && formData.zip && formData.phone;
        if (stepNumber === 3) return formData.cardNumber && formData.cardName && formData.expiry && formData.cvv;
        return true;
    };

    const handleConfirm = () => {
        if (validateStep(3)) {
            if (typeof clearCart === 'function') clearCart();
            setIsConfirmed(true);
            setStep(4);
        } else {
            alert("Please complete all payment details.");
        }
    };

    const renderStep = (stepNumber, title) => {
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
            <div className={`p-8 border border-[#e5e5e5] ${isActive ? 'bg-white' : 'bg-[#f9f9f9]'}`}>
                {isCompleted ? (
                    <h2 className="text-[16px] font-bold text-black opacity-50">{title} ✓</h2>
                ) : isActive ? (
                    <div>
                        <h2 className="text-[16px] mb-6 font-bold text-black">{title}</h2>
                        {stepNumber === 1 && (
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold uppercase text-black">Email Address</label>
                                <input name="email" type="email" placeholder="Email" onChange={updateField} className="w-full p-3 border border-black" />
                                <button onClick={() => validateStep(1) ? setStep(2) : alert("Please enter a valid email")} className="w-full bg-black text-white py-4 font-bold text-[12px]">CONTINUE</button>
                            </div>
                        )}
                        {stepNumber === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="firstName" placeholder="First Name" onChange={updateField} className="w-full p-3 border border-black" />
                                    <input name="lastName" placeholder="Last Name" onChange={updateField} className="w-full p-3 border border-black" />
                                </div>
                                <input name="address1" placeholder="Address Line 1" onChange={updateField} className="w-full p-3 border border-black" />
                                <div className="grid grid-cols-3 gap-4">
                                    <input name="city" placeholder="City" onChange={updateField} className="p-3 border border-black" />
                                    <select className="p-3 border border-black bg-white"><option>State</option>{statesAndUTs.map(loc => <option key={loc}>{loc}</option>)}</select>
                                    <input name="zip" placeholder="Zip" onChange={updateField} className="p-3 border border-black" />
                                </div>
                                <input name="phone" type="tel" placeholder="Phone Number" onChange={updateField} className="w-full p-3 border border-black" />
                                <button onClick={() => validateStep(2) ? setStep(3) : alert("Please fill all shipping fields")} className="w-full bg-black text-white py-4 font-bold text-[12px]">CONTINUE TO PAYMENT</button>
                            </div>
                        )}
                        {stepNumber === 3 && (
                            <div className="space-y-4">
                                <input name="cardNumber" placeholder="Card Number" onChange={updateField} className="w-full p-3 border border-black" />
                                <input name="cardName" placeholder="Name on Card" onChange={updateField} className="w-full p-3 border border-black" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="expiry" placeholder="MM/YY" onChange={updateField} className="p-3 border border-black" />
                                    <input name="cvv" type="password" placeholder="CVV" onChange={updateField} className="p-3 border border-black" />
                                </div>
                                <button onClick={handleConfirm} className="w-full bg-black text-white py-4 font-bold text-[12px]">PAY NOW</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <h2 className="text-[16px] font-medium text-gray-400">{title}</h2>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white p-8 md:p-16 text-black">
            <h1 className="text-[24px] font-bold mb-12">CHECKOUT</h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-6">
                    {isConfirmed ? (
                        <div className="p-12 border border-black text-center">
                            <h2 className="text-[20px] font-bold mb-4">THANK YOU FOR YOUR ORDER</h2>
                            <p className="mb-8 text-[14px]">Your payment was successful and your order is being processed.</p>
                            <button onClick={() => navigate('/')} className="bg-black text-white px-10 py-4 font-bold text-[12px]">BACK TO HOME</button>
                        </div>
                    ) : (
                        <>
                            {renderStep(1, "1. Your Email")}
                            {renderStep(2, "2. Delivery Information")}
                            {renderStep(3, "3. Payment Details")}
                        </>
                    )}
                </div>

                <div className="bg-[#f4f4f4] p-8 h-fit">
                    {isConfirmed && <div className="mb-6 p-4 bg-black text-white font-bold text-center uppercase tracking-widest">ORDER CONFIRMED</div>}
                    <h2 className="text-[18px] font-bold mb-6 text-black">Order Summary</h2>

                    {!isConfirmed ? (
                        cart.map((item, i) => (
                            <div key={i} className="flex gap-4 mb-6">
                                <img src={item.image} alt={item.title} className="w-16 h-20 object-cover" />
                                <div className="flex-1"><p className="text-[14px] font-bold text-black">{item.title}</p></div>
                                <p className="text-[14px] font-bold text-black">$3,540.00</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-[14px] text-gray-500 italic">Your cart is now empty.</p>
                    )}

                    <div className="bg-[#f4f4f4] p-8 h-fit">
                        {isConfirmed && (
                            <div className="mb-6 p-4 bg-black text-white font-bold text-center uppercase tracking-widest">
                                Order #88294
                            </div>
                        )}

                        <h2 className="text-[18px] font-bold mb-6 text-black">
                            {isConfirmed ? "Order Details" : "Order Summary"}
                        </h2>

                        {cart.length > 0 ? (
                            cart.map((item, i) => (
                                <div key={i} className="flex gap-4 mb-6">
                                    <img src={item.image} alt={item.title} className="w-16 h-20 object-cover" />
                                    <div className="flex-1">
                                        <p className="text-[14px] font-bold text-black">{item.title}</p>
                                        {isConfirmed && <p className="text-[12px] text-gray-500">Qty: 1</p>}
                                    </div>
                                    <p className="text-[14px] font-bold text-black">$3,540.00</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-[14px] text-gray-500 italic mb-6">
                                {isConfirmed ? "Your order is being prepared for shipment." : "Your cart is empty."}
                            </p>
                        )}

                        <div className="border-t border-black pt-6 space-y-4">
                            <div className="flex justify-between text-[14px] text-black">
                                <span>Subtotal</span>
                                <span>${isConfirmed ? total.toLocaleString() + '.00' : total.toLocaleString() + '.00'}</span>
                            </div>
                            <div className="flex justify-between text-[18px] font-bold pt-4 text-black">
                                <span>Total</span>
                                <span>${grandTotal.toLocaleString() + '.00'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;