"use client";

import { motion } from "motion/react";
import MatterCanvas from "@/components/MatterCanvas";
import Footer from "@/components/Footer";
import { DbSchema } from "@/lib/db";

export default function AboutClient({ dbData }: { dbData: DbSchema }) {
    return (
        <main className="bg-black min-h-screen text-white pt-32">
            <div className="max-w-7xl mx-auto px-4 md:px-24 mb-32 flex flex-col md:flex-row gap-16 justify-between items-start">

                {/* Left Column: Text */}
                <div className="w-full md:w-1/2">
                    <motion.h1
                        className="text-6xl md:text-8xl font-heading font-black tracking-tighter uppercase mb-12 whitespace-pre-line leading-[0.9]"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {dbData.about.title}
                    </motion.h1>

                    <motion.div
                        className="flex flex-col gap-8 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {dbData.about.bioBlocks.map((block) => {
                            let sizeClass = "text-base";
                            if (block.textSize === "small") sizeClass = "text-sm";
                            if (block.textSize === "large") sizeClass = "text-xl md:text-2xl";
                            if (block.textSize === "xlarge") sizeClass = "text-2xl md:text-4xl font-heading font-bold uppercase tracking-tight";

                            let colorClass = "text-gray-400";
                            if (block.textColor === "white") colorClass = "text-white";

                            return (
                                <p key={block.id} className={`${sizeClass} ${colorClass}`}>
                                    {block.text}
                                </p>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Right Column: Physics Canvas & Visuals */}
                <motion.div
                    className="w-full md:w-1/2 mt-12 md:mt-0 flex flex-col gap-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl uppercase tracking-widest text-white">{dbData.about.subtitle}</h3>
                        <MatterCanvas words={dbData.about.capabilities} />
                    </div>

                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden grayscale border border-gray-800 group">
                        {/* Abstract rotating placeholder image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={dbData.about.image} alt={dbData.about.subtitle} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-lighten" />
                        <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
                    </div>

                </motion.div>
            </div>

            <Footer profile={dbData.profile} contact={dbData.contact} />
        </main>
    );
}
