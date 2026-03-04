import React from 'react';
import { TEMPLATES_DATA } from '../utils/constants';

export default function Templates() {
    return (
        <section className="relative py-32 bg-[#2665d6] overflow-hidden border-t border-[#d2e823]/10" id="templates">

            {/* Background Details */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-[#d2e823]/5 rounded-full filter blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#d2e823]/5 rounded-full filter blur-[150px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
                    <h2 className="text-4xl sm:text-6xl font-black text-[#d2e823] tracking-tight mb-6">
                        Templates for <br />
                        <span className="text-white">every universe.</span>
                    </h2>
                    <p className="text-white/60 text-lg sm:text-xl font-medium">
                        Don't settle for boring lists. Choose from dozens of premium, highly interactive themes designed to convert casual visitors into superfans.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEMPLATES_DATA.map((template, index) => (
                        <div
                            key={template.id}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 border border-white/10"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Decorative Background for Template Card */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-40 group-hover:opacity-80 transition-opacity duration-700 mix-blend-overlay`}></div>

                            {/* Template Image */}
                            <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md">
                                        {template.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{template.name}</h3>

                                    {/* Hover Actions */}
                                    <div className="mt-4 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <button className="flex-1 bg-white text-black font-bold py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                                            Preview
                                        </button>
                                        <button className="flex-none p-2.5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-md">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Glass Element (Appears on Hover) */}
                            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 delay-75 shadow-xl">
                                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-20 text-center">
                    <button className="relative px-8 py-4 font-bold text-[#2665d6] rounded-full overflow-hidden group bg-[#d2e823] hover:bg-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(210,232,35,0.4)]">
                        <span className="relative z-10 flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">
                            Explore All Themes
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
}
