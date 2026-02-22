"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ContactData } from "@/lib/db";

export default function ContactSection({ contact }: { contact: ContactData }) {

    return (
        <section id="contact" className="py-24 px-4 md:px-24 bg-zinc-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto w-full min-h-[60vh] flex flex-col items-center justify-center text-center relative z-10">

                <motion.p
                    className="text-gray-400 font-mono tracking-widest uppercase mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
          // Ready to secure your infrastructure?
                </motion.p>

                <motion.h2
                    className="text-6xl md:text-9xl font-heading font-black tracking-tighter uppercase leading-none mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Let's Work<br />
                    <span className="text-white inline-block transform hover:scale-105 transition-transform duration-500">Together</span>
                </motion.h2>

                <motion.a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-lg overflow-hidden transition-all hover:scale-105"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start a Conversation <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gray-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                </motion.a>

            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
}
