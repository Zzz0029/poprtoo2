"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { useInView } from "motion/react";

interface SplitRevealProps {
  text: string;
  className?: string;
  type?: "chars" | "words" | "lines";
}

export default function SplitReveal({ text, className = "", type = "chars" }: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!textRef.current) return;

    // Initialize SplitType
    const split = new SplitType(textRef.current, { types: type });

    return () => {
      split.revert();
    };
  }, [text, type]);

  return (
    <div ref={containerRef} className={`${className} split-reveal-container`}>
      <h2 ref={textRef} className={isInView ? "opacity-100" : "opacity-0"}>
        {text}
      </h2>

      {isInView && (
        <style dangerouslySetInnerHTML={{
          __html: `
          .split-reveal-container .char, .split-reveal-container .word, .split-reveal-container .line {
            animation: reveal-up 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
            opacity: 0;
            transform: translateY(100%);
            display: inline-block;
          }
          ${Array.from({ length: 150 }).map((_, i) => `
            .split-reveal-container .char:nth-child(${i + 1}), 
            .split-reveal-container .word:nth-child(${i + 1}), 
            .split-reveal-container .line:nth-child(${i + 1}) {
              animation-delay: ${`${(i) * 0.02}s`};
            }
          `).join('')}
          
          @keyframes reveal-up {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}} />
      )}
    </div>
  );
}
