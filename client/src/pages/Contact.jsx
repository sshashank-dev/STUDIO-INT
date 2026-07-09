import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Contact = () => {
    const location = useLocation();
    const [modal, setModal] = useState(null);
    const navLinks = ["ABOUT", "SELECTED PROJECTS", "INT SHOP", "CONTACT"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Form Submitted:", data);
        alert("Thank you for your submission.");
        setModal(null);
    };

    return (
        <div className="bg-white text-[#1a1a1a] min-h-screen w-full p-10 md:p-20 font-sans">
            <header className="mb-16">
                <Link to="/" className="inline-block group mb-8">
                    <h1 className="text-[32px] md:text-[40px] tracking-[0.2em] font-serif group-hover:opacity-50 transition-opacity duration-300">
                        STUDIO.INT INTERIOR DESIGN
                    </h1>
                </Link>
                <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-[0.1em]">
                    {navLinks.map((item) => {
                        const path = item === "SELECTED PROJECTS" ? "/selected-projects" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                        return (
                            <Link key={item} to={path} className={location.pathname === path ? "underline underline-offset-4 decoration-1" : "hover:opacity-50"}>
                                {item}
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <h2 className="text-[14px] uppercase tracking-[0.2em] mb-4">CONTACT US</h2>
            <div className="w-12 h-[1px] bg-black mb-12"></div>

            {/* Changed grid-cols-1 and added max-w-xl to keep text readable */}
            <div className="max-w-xl">
                <div className="space-y-12 text-[12px] leading-relaxed">
                    <div>
                        <h4 className="font-bold uppercase tracking-[0.2em] mb-2">MAIN OFFICE</h4>
                        <p> JAIPUR   </p>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-[0.2em] mb-2">PROJECT INQUIRIES</h4>
                        <p className="mb-6">Thank you for your interest in working with Studio.Int!
                            <br /><br />
                            We carefully select new projects to ensure that working together will bring both us and our clients joy. Our ideal projects are extensive renovations or new builds involving a holistic approach to the space including interior architecture as well as finish, fixture, furniture, and accessory selections..</p>
                        <button onClick={() => setModal('project')} className="border border-black px-6 py-3 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-black hover:text-white transition-colors">
                            Project Inquiry Form
                        </button>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-[0.2em] mb-2">THE EXPERT</h4>
                        <p>Have a small project and need personalized advice? Book a 1:1 consultation with us through <i>The Expert</i>.</p>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-[0.2em] mb-2">GENERAL INQUIRIES</h4>
                        <a href="mailto:interior@studioint.com" className="underline underline-offset-4">interior@studioint.com</a>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-[0.2em] mb-2">CAREERS</h4>
                        <p className="max-w-md mb-2">If you feel that you would truly be a perfect fit for our office, please feel free to send your resume and portfolio. We aren't able to reply to every inquiry we receive, but we do look at them all.</p>
                        <a href="mailto:careers@studioint.com" className="underline underline-offset-4">careers@studioint.com</a>
                        <div className="mt-4">
                            <p className="font-bold">Open positions:</p>
                            <p className="font-bold uppercase">Designer I</p>
                            <p className="italic">* Applications closed / under review.</p>
                        </div>
                    </div>

                    <button onClick={() => setModal('mailing')} className="border border-black px-6 py-3 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-black hover:text-white transition-colors">
                        Mailing List
                    </button>
                </div>
            </div>

            {/* Modal remains the same */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 p-4 overflow-y-auto" onClick={() => setModal(null)}>
                    <div className="bg-white border border-black p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between mb-8">
                            <h2 className="text-[14px] uppercase font-bold tracking-[0.2em]">
                                {modal === 'project' ? 'POTENTIAL PROJECT' : 'MAILING LIST'}
                            </h2>
                            <button onClick={() => setModal(null)} className="font-bold">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {modal === 'project' ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="FirstName" placeholder="First Name (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                        <input type="text" name="LastName" placeholder="Last Name (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                    </div>
                                    <input type="email" name="Email" placeholder="Email Address (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                    <input type="tel" name="Phone" placeholder="Phone (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                    <input type="text" name="Address" placeholder="Project Address, City, State (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                    <input type="text" name="SquareFootage" placeholder="Square Footage" className="w-full border-b border-black p-2 outline-none text-[12px]" />
                                    <input type="text" name="StartDate" placeholder="Ideal Project Start Date (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                    <input type="text" name="CompletionDate" placeholder="Ideal Project Completion Date" className="w-full border-b border-black p-2 outline-none text-[12px]" />
                                    <input type="text" name="ConstructionBudget" placeholder="Estimated Construction Budget" className="w-full border-b border-black p-2 outline-none text-[12px]" />
                                    <input type="text" name="FurnitureBudget" placeholder="Estimated Furniture Budget" className="w-full border-b border-black p-2 outline-none text-[12px]" />
                                    <textarea name="Goals" placeholder="What are your project goals?" className="w-full border-b border-black p-2 outline-none text-[12px] h-20" />
                                    <textarea name="HearAboutUs" placeholder="How did you hear about us?" className="w-full border-b border-black p-2 outline-none text-[12px] h-20" />
                                </>
                            ) : (
                                <>
                                    <p className="text-[12px] mb-4">Sign up to receive updates on new projects, shop arrivals, and studio news.</p>
                                    <input type="email" name="Email" placeholder="Email Address (required)" className="w-full border-b border-black p-2 outline-none text-[12px]" required />
                                </>
                            )}
                            <button type="submit" className="border border-black px-8 py-3 uppercase text-[10px] font-bold hover:bg-black hover:text-white transition-colors">
                                {modal === 'project' ? 'SEND' : 'SUBSCRIBE'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;