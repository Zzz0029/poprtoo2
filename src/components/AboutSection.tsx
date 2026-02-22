"use client";

import SplitReveal from "./SplitReveal";
import { ProfileData } from "@/lib/db";

export default function AboutSection({ profile }: { profile: ProfileData }) {
    const sizeClasses = {
        small: "text-xl md:text-2xl lg:text-4xl",
        medium: "text-2xl md:text-4xl lg:text-5xl",
        large: "text-3xl md:text-5xl lg:text-7xl",
        xlarge: "text-5xl md:text-7xl lg:text-9xl"
    };

    const textClass = sizeClasses[profile.bioTextSize || "large"];

    return (
        <section className="py-32 px-4 md:px-24 bg-black flex justify-center items-center min-h-[80vh]">
            <div className="max-w-5xl mx-auto w-full">
                <p className="font-mono text-gray-500 uppercase tracking-widest mb-12 text-sm">// SYSTEM: BIO_QUERY_LOADED</p>

                <div className={`${textClass} font-heading font-semibold leading-tight tracking-tight text-white break-all`}>
                    <SplitReveal
                        type="words"
                        text={profile.bioText.split(/\n+/)[0]} // Show just the first paragraph as intro
                    />
                </div>

                <div className="mt-16 flex justify-end">
                    <a href="/about" className="text-xl font-mono text-white border-b border-gray-600 hover:border-white hover:text-gray-300 transition-all py-2 group">
                        Decrypt Bio <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
