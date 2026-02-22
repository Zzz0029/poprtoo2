"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Footer from "@/components/Footer";
import { DbSchema } from "@/lib/db";



export default function ContactClient({ dbData }: { dbData: DbSchema }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="bg-black min-h-screen text-white pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-24 mb-32 flex flex-col md:flex-row gap-16 justify-between">

        {/* Left: Contact Info */}
        <div className="w-full md:w-1/2">
          <motion.h1
            className="text-6xl md:text-9xl font-heading font-black tracking-tighter uppercase mb-8 leading-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Initiate<br />
            <span className="text-white">Comms</span>
          </motion.h1>

          <motion.div
            className="flex flex-col gap-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Direct Line (WhatsApp)</p>
              <a href={dbData.contact.whatsappLink} target="_blank" rel="noreferrer" className="text-3xl font-heading hover:text-white transition-colors">
                {dbData.contact.whatsapp}
              </a>
            </div>

            <div>
              <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Encrypted Mail</p>
              <a href={`mailto:${dbData.contact.email}`} className="text-3xl font-heading hover:text-white transition-colors">
                {dbData.contact.email}
              </a>
            </div>

            <div className="flex gap-4 mt-8">
              <a href={dbData.contact.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gray-800 rounded-full hover:border-white hover:text-white transition-colors text-sm uppercase tracking-widest">
                LinkedIn
              </a>
              <a href={dbData.contact.instagram} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gray-800 rounded-full hover:border-white hover:text-white transition-colors text-sm uppercase tracking-widest">
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: FAQ Accordion */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-mono text-white uppercase tracking-widest mb-8">// FREQUENTLY ASKED</h2>

          <div className="space-y-4 font-mono">
            {dbData.faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/30">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-lg text-white">{faq.q}</span>
                  <span className={`text-2xl transform transition-transform ${openIndex === idx ? 'rotate-45 text-white' : 'text-gray-500'}`}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800 mt-2 whitespace-pre-wrap">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

      </div >

      <Footer profile={dbData.profile} contact={dbData.contact} />
    </main >
  );
}
