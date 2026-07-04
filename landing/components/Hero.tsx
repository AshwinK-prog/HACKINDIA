"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 rounded-full px-3 py-1">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            LLM Router X Enterprise Gateway 2.0
                        </Badge>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Intelligence routing for
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                            production AI.
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                        Eliminate model lock-in, reduce latency by 40%, and cut costs. Intelligently route requests to Gemini, Claude, and OpenAI via a unified enterprise gateway.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Link href="/workspace">
                            <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 group">
                                Start Routing
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-12 px-8 rounded-full">
                            <Play className="mr-2 w-4 h-4" />
                            View Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>&lt;20ms Overhead</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Enterprise Grade</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-blue-500" />
                            <span>Multi-Model</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Network Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative h-[500px] w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                    {/* Animated Routing Pipeline Visualization Placeholder */}
                    <div className="flex flex-col items-center justify-center w-full h-full relative">
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent absolute top-1/2 -translate-y-1/2 z-0" />
                        </div>

                        {/* Router Node */}
                        <motion.div
                            animate={{ boxShadow: ["0px 0px 0px 0px rgba(59,130,246,0)", "0px 0px 20px 0px rgba(59,130,246,0.5)", "0px 0px 0px 0px rgba(59,130,246,0)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative z-10 -ml-40 bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg"><Zap className="text-blue-500 w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold">Router</div>
                                <div className="text-xs text-muted-foreground">Analyzing intent...</div>
                            </div>
                        </motion.div>

                        {/* Model Node */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 ml-40 mt-10 bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md"
                        >
                            <div className="p-2 bg-green-500/20 rounded-lg"><Cpu className="text-green-500 w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold">Gemini 1.5 Pro</div>
                                <div className="text-xs text-muted-foreground">Cost/Quality Selected</div>
                            </div>
                        </motion.div>

                        {/* Packet Animation */}
                        <motion.div
                            className="absolute left-1/4 top-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20"
                            animate={{
                                x: [0, 200],
                                y: [0, 20],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
