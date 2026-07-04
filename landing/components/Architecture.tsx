"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Server, Settings2, Sparkles, MonitorSmartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Architecture() {
    const [activeNode, setActiveNode] = useState(1);

    const nodes = [
        {
            id: 0,
            title: "Client Application",
            icon: MonitorSmartphone,
            desc: "Your existing application structure remains completely unchanged. You only change the API base URL to our Gateway.",
        },
        {
            id: 1,
            title: "LLM Router X Gateway",
            icon: Server,
            desc: "Our high-performance Edge Gateway validates credentials, manages rate limits, and secures the connection.",
        },
        {
            id: 2,
            title: "Routing Engine",
            icon: Settings2,
            desc: "Analyzes the prompt's token size and complexity in <5ms. Decides whether to use Semantic Cache or route to an LLM.",
        },
        {
            id: 3,
            title: "Model Providers",
            icon: Sparkles,
            desc: "The request is executed by the optimal model (Gemini, OpenAI, Anthropic) and securely streamed back to the client.",
        }
    ];

    return (
        <section id="architecture" className="w-full py-24 bg-background">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Architecture</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A drop-in replacement for any OpenAI-compatible client. Zero new dependencies required.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center max-w-5xl mx-auto">

                    {/* Diagram */}
                    <div className="flex-1 w-full max-w-md relative flex flex-col gap-4">
                        {nodes.map((node) => (
                            <div key={node.id} className="relative group">
                                <button
                                    onClick={() => setActiveNode(node.id)}
                                    className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${activeNode === node.id
                                            ? "bg-zinc-900 border-primary shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-primary"
                                            : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                                        }`}
                                >
                                    <div className={`p-3 rounded-lg ${activeNode === node.id ? 'bg-primary/20 text-primary' : 'bg-black text-muted-foreground'}`}>
                                        <node.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`font-semibold ${activeNode === node.id ? 'text-primary' : 'text-zinc-300'}`}>
                                        {node.title}
                                    </span>
                                </button>

                                {/* Connector Line */}
                                {node.id !== 3 && (
                                    <div className="w-px h-6 bg-zinc-800 mx-auto my-1 relative">
                                        {activeNode >= node.id && (
                                            <motion.div
                                                className="absolute top-0 w-full bg-primary"
                                                initial={{ height: "0%" }}
                                                animate={{ height: "100%" }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Details Panel */}
                    <div className="flex-1 w-full relative min-h-[250px]">
                        <Card className="absolute inset-0 p-8 bg-zinc-950/80 border-zinc-800 backdrop-blur flex flex-col justify-center">
                            <motion.div
                                key={activeNode}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-3 bg-zinc-900 w-fit rounded-lg mb-6 text-primary">
                                    {nodes.map(n => n.id === activeNode && <n.icon key={n.id} className="w-6 h-6" />)}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{nodes[activeNode].title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {nodes[activeNode].desc}
                                </p>
                            </motion.div>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}
