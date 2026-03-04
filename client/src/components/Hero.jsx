import React, { useState, useEffect } from 'react';
import { handleSignUpSubmit } from '../utils/handlers';

const TEMPLATES = [
    {
        id: 'shop',
        title: 'The Storefront',
        role: 'Shopkeeper',
        action: 'Calling to customers!',
        color: '#FF6B6B',
        icon: '🛍️',
        human: (
            <svg viewBox="0 0 100 100" className="w-full h-full animate-bounce-slow">
                <circle cx="50" cy="30" r="15" fill="#fbcfe8" />
                <path d="M50 45 L50 80 M30 60 L50 45 L70 60" stroke="#fbcfe8" strokeWidth="8" fill="none" />
                <path d="M70 60 C85 50 85 70 70 60" stroke="#fbcfe8" strokeWidth="4" className="animate-pulse" />
                <text x="75" y="45" fontSize="10" className="animate-ping">Hey!</text>
            </svg>
        )
    },
    {
        id: 'artist',
        title: 'The Gallery',
        role: 'Digital Artist',
        action: 'Creating magic',
        color: '#4ECDC4',
        icon: '🎨',
        human: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="30" r="15" fill="#ddd6fe" />
                <path d="M50 45 L50 80 M30 80 L50 45 L70 80" stroke="#ddd6fe" strokeWidth="8" fill="none" />
                <path d="M60 55 L85 40" stroke="#ddd6fe" strokeWidth="4" className="animate-draw" />
                <circle cx="85" cy="40" r="5" fill="#d2e823" className="animate-pulse" />
            </svg>
        )
    },
    {
        id: 'music',
        title: 'The Stage',
        role: 'Musician',
        action: 'Dropping beats',
        color: '#FFE66D',
        icon: '🎵',
        human: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="30" r="15" fill="#fef08a" />
                <path d="M50 45 L50 80 M20 60 L50 45 L80 60" stroke="#fef08a" strokeWidth="8" fill="none" />
                <path d="M20 60 L15 75 M80 60 L85 75" stroke="#fef08a" strokeWidth="4" />
                <text x="10" y="30" fontSize="12" className="animate-bounce">🎵</text>
                <text x="80" y="40" fontSize="12" className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎶</text>
            </svg>
        )
    }
];

export default function Hero() {
    const [username, setUsername] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TEMPLATES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activeTemplate = TEMPLATES[currentIndex];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2665d6] pt-20">
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(#d2e823_1px,transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Left Side: Content */}
                <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
                    <div className="inline-block px-4 py-2 rounded-full bg-[#d2e823] text-[#2665d6] text-sm font-bold tracking-widest uppercase">
                        Linkdock Universal
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black leading-[0.9] tracking-tighter text-[#d2e823]">
                        Turn One Link <br />
                        Into Your <span className="text-white">Universe.</span>
                    </h1>

                    <p className="text-white/80 text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        The only link-in-bio built for creators who dream bigger. Connect your world, showcase your vibes, and grow your audience in style.
                    </p>

                    <form
                        onSubmit={(e) => handleSignUpSubmit(e, username)}
                        className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto lg:mx-0 pt-4"
                    >
                        <div className="flex-1 flex items-center bg-white/10 border-2 border-[#d2e823]/30 focus-within:border-[#d2e823] rounded-2xl px-6 py-4 w-full transition-all backdrop-blur-md">
                            <span className="text-[#d2e823]/60 font-bold text-lg">linkdock.com/</span>
                            <input
                                type="text"
                                placeholder="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-transparent outline-none border-none ml-1 w-full text-white font-bold text-lg placeholder-white/20"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-4 bg-[#d2e823] text-[#2665d6] font-black text-lg rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(210,232,35,0.2)]"
                        >
                            Claim your link
                        </button>
                    </form>

                    {/* Slider Dots */}
                    <div className="flex justify-center lg:justify-start gap-3 pt-6">
                        {TEMPLATES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 bg-[#d2e823]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Phone Mockup & Character */}
                <div className="flex-1 relative flex justify-center items-center h-[700px] w-full max-w-[500px]">

                    {/* Character Vignette (Floating outside/beside phone) */}
                    <div className="absolute -left-12 top-1/4 w-48 h-48 z-20 pointer-events-none transition-all duration-700 transform"
                        style={{ opacity: 1, transform: `translateY(${Math.sin(Date.now() / 1000) * 10}px)` }}>
                        <div className="relative w-full h-full">
                            {activeTemplate.human}
                            <div className="absolute top-0 right-0 bg-[#d2e823] text-[#2665d6] px-3 py-1 rounded-full text-[10px] font-black uppercase rotate-12 shadow-lg">
                                {activeTemplate.role}
                            </div>
                        </div>
                    </div>

                    {/* Phone Mockup Slider Container */}
                    <div className="relative w-[320px] h-[650px] bg-black rounded-[50px] border-[12px] border-[#d2e823]/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden scale-110">
                        {/* Internal Screen Content */}
                        <div className="h-full w-full bg-[#0a0a0a] relative overflow-hidden">
                            {/* Animated Background for Slider */}
                            <div
                                className="flex h-full transition-transform duration-700 ease-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {TEMPLATES.map((template) => (
                                    <div key={template.id} className="min-w-full h-full flex flex-col p-8 pt-16">
                                        <div className="w-20 h-20 rounded-3xl bg-[#d2e823] mb-6 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(210,232,35,0.2)]">
                                            {template.icon}
                                        </div>
                                        <h3 className="text-white text-3xl font-black mb-2">{template.title}</h3>
                                        <p className="text-white/40 text-sm mb-8 leading-relaxed">Perfect for your {template.role.toLowerCase()} journey. Launch in minutes.</p>

                                        <div className="space-y-4">
                                            {[1, 2, 3].map((link) => (
                                                <div key={link} className="w-full py-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60 font-bold text-sm">
                                                    Link Option {link}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-10 text-center">
                                            <span className="text-[#d2e823] font-black text-[10px] tracking-widest uppercase">Linkdock.com/you</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Accent Elements */}
                    <div className="absolute top-10 right-0 w-24 h-24 bg-[#d2e823]/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#d2e823]/5 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Global Keyframes for Animations */}
            <style jsx="true">{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
                @keyframes draw {
                    0% { stroke-dasharray: 0 100; }
                    100% { stroke-dasharray: 100 0; }
                }
                .animate-draw {
                    animation: draw 2s infinite ease-in-out;
                    stroke-dasharray: 50 50;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
