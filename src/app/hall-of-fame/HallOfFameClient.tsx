"use client";

import { motion } from "motion/react";
import Footer from "@/components/Footer";
import { DbSchema } from "@/lib/db";
import { ArrowUpRight } from "lucide-react";

export default function HallOfFameClient({ dbData }: { dbData: DbSchema }) {
    return (
        <main className="bg-black min-h-screen text-white pt-32 hidden-scroll">
            <div className="max-w-7xl mx-auto px-4 md:px-24 mb-24 min-h-[60vh]">

                <motion.h1
                    className="text-6xl md:text-9xl font-heading font-black tracking-tighter uppercase mb-16"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Hall of<br />
                    <span className="text-white">Fame</span>
                </motion.h1>

                {dbData.hallOfFame.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-500 font-mono border-l-2 border-gray-800 pl-6 py-2"
                    >
                        Pending security clearances. No public recognitions listed yet.
                    </motion.div>
                ) : (
                    <div className="flex flex-col border-t border-gray-900">
                        {dbData.hallOfFame.map((entry, idx) => (
                            <motion.a
                                key={entry.id}
                                href={entry.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between py-8 border-b border-gray-900 hover:bg-white/5 transition-colors px-4 -mx-4 rounded"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="flex items-center gap-8">
                                    <span className="text-gray-600 font-mono text-sm hidden sm:block">0{idx + 1}</span>
                                    <h3 className="text-2xl md:text-4xl font-heading font-bold uppercase group-hover:text-white transition-colors">{entry.title}</h3>
                                </div>
                                <div className="text-gray-500 group-hover:text-white transition-colors group-hover:rotate-45 duration-300">
                                    <ArrowUpRight size={32} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
            <Footer profile={dbData.profile} contact={dbData.contact} />
        </main>
    );
}
