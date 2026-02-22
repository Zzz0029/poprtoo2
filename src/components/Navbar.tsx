"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ProfileData, ContactData } from "@/lib/db";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "CERTIFICATIONS", href: "/certifications" },
    { name: "SERVICES", href: "/services" },
    { name: "HALL OF FAME", href: "/hall-of-fame" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
];

export default function Navbar({ profile, contact }: { profile: ProfileData; contact: ContactData }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-8 mix-blend-difference text-white">
                <Link href="/" className="font-heading text-xl md:text-2xl font-bold z-50 tracking-widest uppercase">
                    {profile.name}
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 4rem) 4rem)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 bg-[#111111] text-white flex flex-col justify-start overflow-y-auto px-8 md:px-24 pt-32 pb-12"
                    >
                        <div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl mx-auto gap-12 my-auto">
                            <nav className="flex flex-col gap-4 md:gap-6">
                                {navLinks.map((link, i) => (
                                    <div key={link.name} className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "100%" }}
                                            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black hover:text-gray-300 hover:pl-8 transition-all duration-300 inline-block uppercase tracking-tighter"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </nav>

                            <div className="flex flex-col justify-end pb-8">
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="space-y-8 max-w-sm"
                                >
                                    <div>
                                        <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-2 font-mono">Contact</h3>
                                        <p className="text-lg hover:text-white transition-colors"><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                                        <p className="text-lg hover:text-white transition-colors"><a href={contact.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a></p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-2 font-mono">Socials</h3>
                                        <div className="flex gap-4">
                                            <a href={contact.linkedin} target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
                                            <a href={contact.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-mono">
                                            {profile.role.split(' ').map((word, i) => <span key={i}>{word} </span>)}<br />Based in Indonesia.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
