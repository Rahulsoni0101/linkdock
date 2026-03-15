import React, { useState } from 'react';
import { NAV_LINKS } from '../utils/constants';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 mt-6"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.nav
                layout
                className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-full max-w-7xl relative ${scrolled ? 'glass-panel-heavy py-2' : 'bg-transparent'}`}
            >
                {/* Logo */}
                <a href="/" className="group flex items-center gap-3 z-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d2e823] to-[#a3b813] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(210,232,35,0.4)]">
                        <span className="text-[#030614] font-black text-xl italic tracking-tighter">L</span>
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">
                        linkdock
                    </span>
                </a>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-8 glass-panel px-8 py-2 rounded-full border-white/5 bg-white/5 z-10">
                    {NAV_LINKS.map((link) => (
                        <a key={link.id} href={link.href} className="text-gray-300 hover:text-[#d2e823] text-sm font-semibold transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 z-10">
                    <button className="hidden sm:block px-5 py-2 text-gray-300 hover:text-white font-semibold transition-colors text-sm">
                        Log in
                    </button>
                    <button className="px-6 py-2.5 bg-[#d2e823] text-[#030614] text-sm font-bold rounded-full hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(210,232,35,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        Sign up free
                    </button>
                </div>
            </motion.nav>
        </motion.div>
    );
}
