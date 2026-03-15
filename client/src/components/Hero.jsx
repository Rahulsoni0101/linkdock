import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { handleSignUpSubmit } from '../utils/handlers';
import { Sparkles, ArrowRight, Zap, Globe, Shield } from 'lucide-react';

const sentence = "Turn One Link Into Your Universe.";
const words = sentence.split(" ");

const TILT_STRENGTH = 15;

function TiltCard({ children, className }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [TILT_STRENGTH, -TILT_STRENGTH]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-TILT_STRENGTH, TILT_STRENGTH]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function Hero() {
    const [username, setUsername] = useState('');

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#2665d6]/30 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-[#d2e823]/15 rounded-full blur-[150px] mix-blend-screen"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#030614] to-transparent z-10"></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="glass-panel px-4 py-2 rounded-full inline-flex items-center gap-2 mb-8 mt-12"
                >
                    <Sparkles className="w-4 h-4 text-[#d2e823]" />
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-200">Linkdock Advanced</span>
                </motion.div>

                {/* Animated Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-[100px] font-black leading-[0.95] tracking-tighter mb-8 max-w-5xl">
                    {words.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 1,
                                delay: index * 0.15,
                                ease: [0.2, 0.65, 0.3, 0.9]
                            }}
                            className={`inline-block mr-[2vw] ${word.includes('Universe') ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#d2e823] to-[#2665d6] text-glow pb-2' : 'text-white pb-2'}`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-gray-400 text-xl md:text-2xl font-medium max-w-2xl mb-16 leading-relaxed"
                >
                    The only link-in-bio built for creators who dream bigger. Connect your world and grow your audience in style.
                </motion.p>

                {/* Interactive Form Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                    className="w-full max-w-2xl mb-24"
                    style={{ perspective: 1200 }}
                >
                    <TiltCard className="w-full">
                        <form
                            onSubmit={(e) => handleSignUpSubmit(e, username)}
                            className="glass-panel-heavy p-2 pr-2 pl-6 sm:pl-8 rounded-full flex flex-col sm:flex-row items-center gap-4 transition-all hover:glass-panel shadow-2xl relative z-30 group/form"
                            style={{ transform: "translateZ(30px)" }}
                        >
                            <span className="text-gray-400 font-bold text-lg hidden sm:block pointer-events-none">linkdock.com/</span>
                            <input
                                type="text"
                                placeholder="yourname"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-transparent outline-none border-none flex-1 text-white font-bold text-xl placeholder-white/20 py-4 w-full"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-4 bg-[#d2e823] text-[#030614] font-black text-lg rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(210,232,35,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group-hover/form:shadow-[0_0_15px_rgba(210,232,35,0.2)]"
                            >
                                Claim
                                <ArrowRight className="w-5 h-5 group-hover/form:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </TiltCard>
                </motion.div>

                {/* Floating Micro-Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
                    style={{ perspective: 1200 }}
                >
                    {[
                        { icon: <Zap className="w-6 h-6 text-[#d2e823]" />, title: "Lightning Fast", desc: "Edge network delivery" },
                        { icon: <Globe className="w-6 h-6 text-[#2665d6]" />, title: "Custom Domains", desc: "Bring your own brand" },
                        { icon: <Shield className="w-6 h-6 text-purple-400" />, title: "Bank-grade Security", desc: "Your data is protected" }
                    ].map((feature, i) => (
                        <TiltCard key={i} className="h-full">
                            <div
                                className="glass-panel p-8 rounded-[2rem] flex flex-col items-center sm:items-start text-center sm:text-left gap-5 hover:bg-white/10 transition-colors h-full"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                <div className="p-4 bg-white/5 rounded-2xl glass-panel shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
