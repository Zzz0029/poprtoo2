"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 500); // Trigger complete after 100%
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 1; // Random jump 1-15%
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white overflow-hidden origin-top"
            initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            exit={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <div className="flex flex-col items-center justify-center gap-8 relative z-10 w-full max-w-4xl px-4">
                {/* Name Reveal */}
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-8xl font-heading text-center font-bold tracking-tighter"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        RISKI<br /><span className="text-[#00ff41]">PERMANA</span>
                    </motion.h1>
                </div>

                {/* Role Reveal */}
                <div className="overflow-hidden">
                    <motion.p
                        className="text-sm md:text-lg font-mono text-gray-400 tracking-widest uppercase text-center"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Cyber Security Enthusiast • Bug Hunter
                    </motion.p>
                </div>
            </div>

            {/* Persistent Loading Bar & Counter at Bottom */}
            <div className="absolute bottom-12 left-0 w-full px-8 md:px-24 flex items-end justify-between font-mono text-sm mix-blend-difference">
                <div className="flex flex-col gap-2 w-1/2 max-w-[200px]">
                    <span className="text-gray-500 uppercase text-xs tracking-wider">Loading...</span>
                    <div className="w-full h-[2px] bg-white/20 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-[#00ff41]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>

                <div className="text-5xl md:text-8xl font-heading font-light tracking-tighter tabular-nums leading-none">
                    {progress}
                </div>
            </div>

            {/* Background ambient gradient (Cyberpunk hint) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff41]/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
    );
}
