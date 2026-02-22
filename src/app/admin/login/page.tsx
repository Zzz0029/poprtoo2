"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Invalid credentials. Access denied.");
            }
        } catch (err) {
            setError("Connection error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-black min-h-screen flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-md p-8 border border-gray-800 rounded-2xl bg-gray-950 shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Visual Flair */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white" />

                <h1 className="text-3xl font-heading font-black text-white uppercase tracking-widest mb-2 mt-4">System Auth</h1>
                <p className="text-gray-500 font-mono text-sm mb-8">// ENTER CREDENTIALS TO PROCEED</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-6 font-mono">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                            [ERROR] {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-widest">Operator ID</label>
                        <input
                            type="text"
                            className="bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-widest">Passphrase</label>
                        <input
                            type="password"
                            className="bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Initialize Session"}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
