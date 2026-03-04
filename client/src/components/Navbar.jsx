import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../utils/constants';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 ${scrolled ? 'bg-[#2665d6] border-b border-[#d2e823]/20 shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="group flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-[#d2e823] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <span className="text-[#2665d6] font-bold text-xl tracking-tighter italic">L</span>
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-[#d2e823]">
                        linkdock
                    </span>
                </a>

                {/* Desktop Links */}
                <ul className="hidden lg:flex items-center gap-10">
                    {NAV_LINKS.map(link => (
                        <li key={link.id}>
                            <a href={link.href} className="text-[#d2e823]/80 hover:text-[#d2e823] font-semibold text-[15px] transition-colors duration-200">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Actions CTA */}
                <div className="flex items-center gap-6">
                    <button className="hidden md:block px-4 py-2 text-[#d2e823]/80 hover:text-[#d2e823] font-bold transition-colors">
                        Log in
                    </button>
                    <button className="px-6 py-2.5 bg-[#d2e823] text-[#2665d6] font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(210,232,35,0.3)]">
                        Sign up free
                    </button>
                </div>
            </div>
        </nav>
    );
}
