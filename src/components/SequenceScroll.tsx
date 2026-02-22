"use client";

import { motion } from "motion/react";
import { ProfileData } from "@/lib/db";

export default function SequenceScroll({ profile }: { profile: ProfileData }) {
    return (
        <div className="w-full bg-black flex flex-col pt-10">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
                    <motion.h1
                        className="text-[12vw] md:text-[8rem] lg:text-[10rem] leading-none font-heading font-black tracking-tighter text-white uppercase"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {profile.name}
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-xl md:text-2xl font-mono text-gray-400 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        {profile.role}
                    </motion.p>
                </div>
            </section>

            {/* Statement Section */}
            <section className="relative py-20 px-4 md:px-24 max-w-7xl mx-auto w-full flex flex-col items-start justify-center">
                <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight text-white leading-tight">
                        {profile.statementTitle}
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-400 font-mono leading-relaxed">
                        {profile.statementDesc}
                    </p>
                </div>
            </section>

            {/* Quote Section */}
            <section className="relative py-20 px-4 md:px-24 max-w-7xl mx-auto w-full flex flex-col items-end justify-center text-right">
                <div className="max-w-4xl flex flex-col items-end">
                    <h2
                        className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter text-white leading-none"
                        dangerouslySetInnerHTML={{ __html: profile.quote }}
                    />
                    <div className="w-32 h-[2px] bg-white mt-10" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 md:px-24 w-full flex flex-col items-center justify-center text-center pb-32">
                <div>
                    <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mb-10 text-white">
                        Let's Secure Your Assets
                    </h2>
                    <a href="#contact" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black bg-white overflow-hidden rounded-full transition-transform hover:scale-105 active:scale-95">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gray-200 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="relative uppercase tracking-widest font-mono text-sm">Initiate Contact</span>
                    </a>
                </div>
            </section>

        </div>
    );
}
