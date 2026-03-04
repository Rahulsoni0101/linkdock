import React, { useState, useEffect } from 'react';

export default function FeatureOne() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2665d6] py-24 border-t border-[#d2e823]/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-16 w-full">

                {/* Left side: 3D Rotating Graphics */}
                <div className="flex-1 w-full relative h-[500px] lg:h-[600px] flex flex-col items-center justify-center hidden md:flex" style={{ perspective: '1200px' }}>
                    <div
                        className="relative w-full max-w-[400px] h-full flex items-center justify-center"
                        style={{
                            transform: `rotateY(${mousePos.x * -15}deg) rotateX(${mousePos.y * 15}deg)`,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        {/* Phone Mockup Layer */}
                        <div className="absolute w-[260px] h-[540px] bg-[#E9E9E9] rounded-[40px] shadow-2xl overflow-hidden border-8 border-white/20" style={{ transform: 'translateZ(20px)' }}>
                            <div className="w-full h-[40%] bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a80fa?auto=format&fit=crop&w=400')] bg-cover bg-center"></div>
                            <div className="px-4 py-8 flex flex-col items-center bg-[#f4f4f5] h-full relative -mt-6 rounded-t-3xl border-t border-black/5">
                                <div className="w-20 h-20 rounded-full bg-white p-1 mb-3 shadow-md">
                                    <img src="https://images.unsplash.com/photo-1583338917451-fade27c4d5f5?auto=format&fit=crop&w=150" alt="Profile" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <h3 className="text-[26px] font-black text-gray-900 leading-[1.1] text-center mb-4 tracking-tight">Bobby<br />Bakes</h3>
                            </div>
                        </div>

                        {/* Floating Recipe Card */}
                        <div className="absolute bottom-12 -left-8" style={{ transform: 'translateZ(70px)' }}>
                            <div className="w-[180px] bg-white rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-float" style={{ animationDelay: '0.2s' }}>
                                <div className="w-full flex justify-center mb-2">
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Bobby Bakes</span>
                                </div>
                                <div className="w-full h-[110px] rounded-2xl bg-[url('https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300')] bg-cover bg-center mb-3"></div>
                                <h4 className="font-bold text-gray-900 text-center text-[13px] mb-2">Banque Cheesecake</h4>
                                <div className="w-full h-1 bg-gray-100 rounded-full mx-auto w-10 mb-1"></div>
                            </div>
                        </div>

                        {/* Floating Social Icons */}
                        <div className="absolute right-[-10px] top-[40%] -translate-y-1/2 flex flex-col gap-4" style={{ transform: 'translateZ(90px)' }}>
                            <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                                {/* Instagram */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </div>
                            <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl animate-float" style={{ animationDelay: '0.3s' }}>
                                {/* TikTok */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" /></svg>
                            </div>
                            <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl animate-float" style={{ animationDelay: '0.6s' }}>
                                {/* YouTube */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Text Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left z-10 pt-10 lg:pt-0">
                    <h2 className="text-4xl sm:text-[54px] font-black text-[#d2e823] leading-[1.05] tracking-tight mb-4">
                        Create and customize<br />your page in minutes
                    </h2>
                    <p className="text-white/80 text-[17px] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail to match your brand and drive more clicks.
                    </p>
                    <div className="pt-4">
                        <button className="px-8 py-4 bg-[#d2e823] hover:bg-white text-[#2665d6] font-bold rounded-[30px] transition-all duration-300 text-lg hover:scale-105 shadow-[0_20px_40px_rgba(210,232,35,0.2)]">
                            Get started for free
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
