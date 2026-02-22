"use client";

import { motion } from "motion/react";
import { ProfileData, ContactData } from "@/lib/db";

export default function Footer({ profile, contact }: { profile: ProfileData; contact: ContactData }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black text-white pt-24 pb-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-24 mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                <div className="flex flex-col gap-8 max-w-sm">
                    <h3 className="font-heading text-4xl font-bold tracking-tighter uppercase">{profile.name}</h3>
                    <p className="text-gray-500 font-mono text-sm leading-relaxed">
                        A world-class creative developer and {profile.role.toLowerCase()} focused on crafting uncompromised digital experiences.
                    </p>
                </div>

                <div className="flex gap-16 font-mono text-sm">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-gray-600 uppercase tracking-widest">Navigation</h4>
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <a href="/certifications" className="hover:text-white transition-colors">Certifications</a>
                        <a href="/services" className="hover:text-white transition-colors">Services</a>
                        <a href="/about" className="hover:text-white transition-colors">About</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-gray-600 uppercase tracking-widest">Socials</h4>
                        <a href={contact.linkedin} target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href={contact.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a>
                        <a href={contact.whatsappLink} target="_blank" className="hover:text-white transition-colors">WhatsApp</a>
                    </div>
                </div>
            </div>

            {/* Screen-fit Text */}
            <div className="w-full flex justify-center items-center overflow-hidden pointer-events-none mt-16 border-t border-gray-900 pt-8">
                <motion.h1
                    className="text-[13vw] leading-none font-heading font-black text-center text-white opacity-5 tracking-tighter uppercase whitespace-nowrap"
                    initial={{ y: "50%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.1 }}
                    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                    {profile.name}
                </motion.h1>
            </div>

            <div className="text-center text-gray-700 font-mono text-xs mt-4 uppercase">
                &copy; {currentYear} {profile.name}. All rights reserved.
            </div>
        </footer>
    );
}
