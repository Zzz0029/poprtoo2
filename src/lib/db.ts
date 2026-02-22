import fs from 'fs/promises';
import path from 'path';
import { supabase } from './supabase';

const TABLE_NAME = 'portfolio_data';

export interface ProfileData {
    name: string;
    role: string;
    statementTitle: string;
    statementDesc: string;
    quote: string;
    bioText: string;
    bioTextSize?: "small" | "medium" | "large" | "xlarge";
}

export interface ContactData {
    email: string;
    whatsapp: string;
    whatsappLink: string;
    linkedin: string;
    instagram: string;
}

export interface Certification {
    id: string;
    title: string;
    category: string;
    image: string;
    year: string;
    pinned?: boolean;
}

export interface HallOfFameEntry {
    id: string;
    title: string;
    url: string;
    pinned?: boolean;
}

export interface BioBlock {
    id: string;
    text: string;
    textSize: "small" | "normal" | "large" | "xlarge";
    textColor: "white" | "gray";
}

export interface AboutData {
    title: string;
    subtitle: string;
    image: string;
    capabilities: string[];
    bioBlocks: BioBlock[];
}

export interface FaqEntry {
    q: string;
    a: string;
}

export interface DbSchema {
    profile: ProfileData;
    contact: ContactData;
    certifications: Certification[];
    hallOfFame: HallOfFameEntry[];
    about: AboutData;
    faqs: FaqEntry[];
}

export async function getDbData(): Promise<DbSchema> {
    // Try Supabase first
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('data')
                .eq('id', 1)
                .single();

            if (!error && data) {
                return data.data as DbSchema;
            }
            if (error) console.warn("Supabase fetch error, falling back to local:", error.message);
        }
    } catch (err) {
        console.error("Supabase connection failed:", err);
    }

    // Fallback to local db.json
    const dataFilePath = path.join(process.cwd(), 'data', 'db.json');
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf8');
        const db = JSON.parse(fileContent);
        // Ensure legacy fields exist (backward compatibility)
        if (!db.hallOfFame) db.hallOfFame = [];
        if (!db.about) {
            db.about = {
                title: "Behind\nThe Entity",
                subtitle: "Core Capabilities",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                capabilities: ["TypeScript", "React", "Next.js", "TailwindCSS", "Framer Motion", "Cyber Security", "Penetration Testing", "Audit", "Zero-Day", "Solidity", "Node.js", "Python"],
                bioBlocks: [
                    { id: "1", text: db.profile.bioText, textSize: "normal", textColor: "gray" }
                ]
            };
        }
        if (!db.faqs) {
            db.faqs = [
                {
                    q: "Do you take on freelance Web Development projects?",
                    a: "Yes. In addition to security audits, I specialize in crafting high-end, Awwwards-winning websites using Next.js and Motion."
                },
                {
                    q: "What does an average security audit look like?",
                    a: "An audit begins with threat modeling, followed by automated scanning, deep manual source code review, and final reporting with actionable remediation steps."
                },
                {
                    q: "How can I hire you for a penetration test?",
                    a: "Reach out via WhatsApp or Email stringently outlining your scope. I'll provide an NDA and a quote based on the surface area."
                },
                {
                    q: "What is your typical turnaround time?",
                    a: "Depending on the complexity of the application, audits take between 1 to 4 weeks. Creative development projects usually span 3 to 8 weeks."
                }
            ];
        }
        return db;
    } catch (error) {
        console.error("Failed to read database:", error);
        // Return fallback data if DB goes missing
        return {
            profile: {
                name: "Loading...",
                role: "Loading...",
                statementTitle: "Loading...",
                statementDesc: "Loading...",
                quote: "Loading...",
                bioText: "Loading..."
            },
            contact: {
                email: "",
                whatsapp: "",
                whatsappLink: "",
                linkedin: "",
                instagram: ""
            },
            certifications: [],
            hallOfFame: [],
            about: {
                title: "Behind\nThe Entity",
                subtitle: "Core Capabilities",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                capabilities: ["Cyber Security", "Penetration Testing"],
                bioBlocks: []
            },
            faqs: [
                {
                    q: "Do you take on freelance Web Development projects?",
                    a: "Yes. In addition to security audits, I specialize in crafting high-end, Awwwards-winning websites using Next.js and Motion."
                }
            ]
        };
    }
}
