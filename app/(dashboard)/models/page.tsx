"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Activity, Search, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModelsPage() {
    const [search, setSearch] = useState("");

    const models = [
        { name: "Claude 3.5 Sonnet", vendor: "Anthropic", latency: "820ms", health: "Healthy", tpm: "420k", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        { name: "Claude 3 Haiku", vendor: "Anthropic", latency: "250ms", health: "Healthy", tpm: "1.2M", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        { name: "Claude 3 Opus", vendor: "Anthropic", latency: "1450ms", health: "Healthy", tpm: "150k", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        { name: "GPT-4o", vendor: "OpenAI", latency: "940ms", health: "Degraded", tpm: "210k", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { name: "GPT-4 Turbo", vendor: "OpenAI", latency: "780ms", health: "Healthy", tpm: "350k", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { name: "GPT-3.5 Turbo", vendor: "OpenAI", latency: "180ms", health: "Healthy", tpm: "2.4M", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { name: "Gemini 1.5 Pro", vendor: "Google", latency: "410ms", health: "Healthy", tpm: "880k", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { name: "Gemini 1.5 Flash", vendor: "Google", latency: "190ms", health: "Healthy", tpm: "1.5M", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { name: "Llama 3 70B", vendor: "Meta", latency: "650ms", health: "Healthy", tpm: "500k", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
        { name: "Llama 3 8B", vendor: "Meta", latency: "120ms", health: "Healthy", tpm: "1.2M", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
        { name: "Mistral Large 2", vendor: "Mistral AI", latency: "700ms", health: "Healthy", tpm: "380k", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        { name: "Mixtral 8x22B", vendor: "Mistral AI", latency: "450ms", health: "Degraded", tpm: "610k", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        { name: "Command R+", vendor: "Cohere", latency: "880ms", health: "Healthy", tpm: "250k", color: "text-stone-400", bg: "bg-stone-500/10", border: "border-stone-500/20" },
        { name: "DeepSeek Coder V2", vendor: "DeepSeek", latency: "520ms", health: "Healthy", tpm: "750k", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
        { name: "Qwen 2 72B", vendor: "Alibaba", latency: "590ms", health: "Healthy", tpm: "400k", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    ];

    const filteredModels = models.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.vendor.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="w-full max-w-7xl mx-auto pt-24 px-4 pb-12">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Provider Topology</h1>
                    <p className="text-muted-foreground text-sm mt-1">Live monitoring of all 15 integrated routing endpoints.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                        placeholder="Search by model or vendor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredModels.map((m) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={m.name}
                        >
                            <Card className="p-6 bg-card border-border flex flex-col items-start relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">

                                {/* Pulse indicator */}
                                <div className="absolute top-5 right-5 flex items-center justify-center" title={`Status: ${m.health}`}>
                                    <div className={`w-2 h-2 rounded-full absolute ${m.health === 'Healthy' ? 'bg-green-500/40 animate-ping' : 'bg-yellow-500/40 animate-ping'}`} />
                                    <div className={`w-2 h-2 rounded-full relative ${m.health === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                </div>

                                {/* Vendor specific Logo / Icon block */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${m.bg} ${m.border} border`}>
                                    {m.vendor === 'Anthropic' && <span className={`font-serif font-bold text-xl ${m.color}`}>A</span>}
                                    {m.vendor === 'OpenAI' && <span className={`font-sans font-bold text-xl ${m.color}`}>O</span>}
                                    {m.vendor === 'Google' && <span className={`font-sans font-bold text-xl ${m.color}`}>G</span>}
                                    {m.vendor === 'Meta' && <span className={`font-sans font-bold text-xl ${m.color}`}>M</span>}
                                    {m.vendor === 'Mistral AI' && <span className={`font-sans italic font-bold text-xl ${m.color}`}>m</span>}
                                    {m.vendor === 'Cohere' && <span className={`font-sans font-bold text-xl ${m.color}`}>C</span>}
                                    {m.vendor === 'DeepSeek' && <span className={`font-mono font-bold text-xl ${m.color}`}>D</span>}
                                    {m.vendor === 'Alibaba' && <span className={`font-sans font-bold text-xl ${m.color}`}>Q</span>}
                                </div>

                                <h3 className="font-bold text-foreground text-md leading-tight mb-1">{m.name}</h3>
                                <p className="text-xs text-muted-foreground font-medium mb-6 uppercase tracking-wider">{m.vendor}</p>

                                <div className="w-full grid grid-cols-2 gap-4 text-sm border-t border-border pt-4 mt-auto">
                                    <div>
                                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Latency</div>
                                        <div className="font-mono text-foreground font-medium">{m.latency}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">TPM Load</div>
                                        <div className="font-mono text-foreground font-medium">{m.tpm}</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredModels.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        No models match your search criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
