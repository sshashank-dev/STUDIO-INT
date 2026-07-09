import React from 'react';
import { Link } from 'react-router-dom';

const ConsultationSection = () => {
    return (
        <section className="w-full h-auto md:h-[70vh] flex flex-col md:flex-row overflow-hidden border-b border-black/5">
            {/* LEFT: Image Container */}
            <div className="w-full md:w-1/2 h-[400px] md:h-full relative">
                <img
                    src="/interior-design.jpg"
                    alt="Beautiful Interior"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* RIGHT: Text & CTA Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16 md:py-0 bg-[#000000] text-[#868383]">
                <h2 className="text-3xl md:text-4xl font-serif text-center max-w-sm mb-8 leading-snug font-light text-[#E5E5E5]">
                    Think you can't afford beautiful interior design? Think again.
                </h2>

                {/* Button: Navigation link to Consultation Page */}
                <Link to="/consultation">
                    <button className="px-8 py-3 bg-[#D4C3A3] text-black font-medium uppercase tracking-[0.2em] text-sm rounded-2xl 
                       transition-all duration-500 ease-out 
                       hover:bg-[#c2b08f] hover:scale-105 hover:shadow-xl hover:shadow-[#D4C3A3]/20">
                        Schedule a Consultation
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default ConsultationSection;