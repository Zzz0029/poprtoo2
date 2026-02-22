"use client";

import { motion } from "motion/react";

interface MarqueeProps {
    items: string[];
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
}

export default function InfiniteMarquee({ items, direction = "left", speed = "normal" }: MarqueeProps) {
    const durationMap = { slow: 40, normal: 20, fast: 10 };
    const duration = durationMap[speed];

    return (
        <div className="relative w-full overflow-hidden flex bg-[#00ff41] text-black py-4 -rotate-2 scale-110 my-24">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: duration,
                }}
            >
                {/* We duplicate the items array twice to create a seamless loop */}
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                    <div key={idx} className="flex items-center px-4">
                        <span className="text-2xl md:text-5xl font-heading font-black tracking-tighter uppercase mx-4">
                            {item}
                        </span>
                        <span className="text-xl mx-4 opacity-50">•</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
