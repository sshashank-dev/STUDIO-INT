import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultationPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleRequest = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            setIsSubmitted(true);
        }
    };

    // SUBMISSION SUCCESS SCREEN
    // if (isSubmitted) {
    //     return (
    //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    //             {/* Same size and style as the Sign-in modal */}
    //             <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center relative">
    //                 {/* Close Button */}
    //                 <button
    //                     onClick={() => navigate('/')}
    //                     className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black transition-colors"
    //                 >
    //                     &times;
    //                 </button>

    //                 <h1 className="text-2xl font-serif mb-4 leading-tight">
    //                     Thank You for Your Interest in STUDIO.INT
    //                 </h1>
    //                 <div className="w-12 h-px bg-[#D4C3A3] mx-auto mb-6"></div>
    //                 <p className="text-sm text-gray-600">
    //                     One of our design experts will contact you within 48 hours via email to set up your 1-on-1 design needs assessment.
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }

    // MAIN FORM PAGE
    return (
        <div className="min-h-screen bg-white p-10 md:p-20 text-gray-800">
            <h1 className="text-4xl font-serif mb-4 text-center md:text-left">Schedule Your Free Design Consultation</h1>
            <p className="text-center md:text-left mb-12 text-gray-600">Answer a few quick questions, and we'll match you with a sales designer.</p>

            <div className="flex flex-col md:flex-row gap-16">
                <form onSubmit={handleRequest} className="w-full md:w-1/2 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input type="text" placeholder="Enter your first name" className="w-full border border-gray-300 p-3 rounded focus:ring-1 focus:ring-[#D4C3A3] outline-none" required />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold mb-2">Postal Code*</label>
                            <input type="text" placeholder="Enter your postal code" className="w-full border border-gray-300 p-3 rounded" required />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold mb-2">Phone Number</label>
                            <input type="tel" placeholder="Enter your phone number" className="w-full border border-gray-300 p-3 rounded" required />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold mb-2">Estimated Budget</label>
                            <select className="w-full border border-gray-300 p-3 rounded bg-white">
                                <option>Budget for furniture & decor</option>
                                <option>Not Sure</option>
                                <option>1k-5k</option>
                                <option>5k-10k</option>
                                <option>10k-20k</option>
                                <option>20k-50k</option>
                                <option>Over 50k</option>
                                <option>Custom Amount</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold mb-2">Where did you hear about us?</label>
                            <select className="w-full border border-gray-300 p-3 rounded bg-white">
                                <option>Choose a source</option>
                                <option>Internet Search</option>
                                <option>Friend</option>
                                <option>Social Media</option>
                                <option>Yelp</option>
                                <option>Street Easy</option>
                                <option>Blog</option>
                                <option>Magazine</option>
                                <option>ChatGPT or AI</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Enter a brief description</label>
                        <textarea placeholder="Describe your decor needs" className="w-full border border-gray-300 p-3 rounded h-32" />
                    </div>

                    <button type="submit" className="w-full bg-[#D4C3A3] py-4 font-bold uppercase tracking-widest hover:bg-[#c2b08f] transition-colors">
                        Request My Consultation
                    </button>
                </form>

                <div className="w-full md:w-1/2 bg-gray-50 p-10 rounded-lg h-fit">
                    <h3 className="text-xl font-semibold mb-8 text-center">Why You'll ❤️ STUDIO.INT</h3>
                    <ul className="space-y-8">
                        {["An accomplished interior designer at your fingertips with no obligations after signup",
                            "Complete satisfaction guaranteed to all of our clients",
                            "No markups or brand-loyalties",
                            "Receive exclusive furniture and decor discounts at your favorite stores",
                            "We'll never share your information without your consent!"].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-sm text-gray-700">
                                    <span className="text-xl">✅</span> {item}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* AUTH MODAL */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
                        <h2 className="text-2xl font-serif mb-6">Sign in to continue</h2>
                        <input type="email" placeholder="Enter your email address" className="w-full border border-gray-300 p-3 rounded-lg mb-4" />
                        <button
                            onClick={() => { setIsLoggedIn(true); setShowLoginModal(false); }}
                            className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                        >
                            Sign In with Email
                        </button>
                        <button onClick={() => setShowLoginModal(false)} className="mt-4 text-sm text-gray-500 underline">Cancel</button>
                    </div>
                </div>
            )}


            {isSubmitted && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center relative">
                        {/* Close Button redirects to home */}
                        <button
                            onClick={() => navigate('/')}
                            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black transition-colors"
                        >
                            &times;
                        </button>

                        <h1 className="text-2xl font-serif mb-4 leading-tight">
                            Thank You for Your Interest in STUDIO.INT
                        </h1>
                        <div className="w-12 h-px bg-[#D4C3A3] mx-auto mb-6"></div>
                        <p className="text-sm text-gray-600">
                            One of our design experts will contact you within 48 hours via email to set up your 1-on-1 design needs assessment.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultationPage;