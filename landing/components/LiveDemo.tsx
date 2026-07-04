"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Database, ShieldCheck, Zap, Activity } from "lucide-react";
import { useState } from "react";

export function LiveDemo() {
    const [isRunning, setIsRunning] = useState(false);
    const [step, setStep] = useState(0);

    const startDemo = () => {
        if (isRunning) return;
        setIsRunning(true);
        setStep(0);

        // Simulate pipeline
        const delays = [800, 1500, 2200, 3000];
        delays.forEach((delay, index) => {
            setTimeout(() => setStep(index + 1), delay);
        });

        setTimeout(() => {
            setIsRunning(false);
        }, 4000);
    };

    return (
        <section id="livedemo" className="w-full py-24 bg-zinc-950/50">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <Badge variant="outline" className="mb-4">Real-time Routing</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">See LLM Router X in Action</h2>
                    <p className="text-muted-foreground">Watch as our gateway analyzes intent, evaluates cost, and dynamically routes your request to the optimal model.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Main Demo Console */}
                    <Card className="border-border/50 bg-black/60 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col">

                        {/* Header / Input */}
                        <div className="p-6 border-b border-border/50 bg-zinc-950/50">
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Sparkles className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <input
                                        type="text"
                                        value="Write a Python script to parse a 50GB CSV file and output aggregated statistics."
                                        readOnly
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-12 pr-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <Button onClick={startDemo} disabled={isRunning} className="w-32 bg-primary text-primary-foreground">
                                    {isRunning ? <Activity className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                                    {isRunning ? "Routing..." : "Execute"}
                                </Button>
                            </div>
                        </div>

                        {/* Pipeline Visualization */}
                        <div className="p-8 relative">
                            <div className="flex justify-between items-center relative z-10">

                                {/* Step 1 */}
                                <PipelineNode
                                    icon={ShieldCheck}
                                    title="Intent & Filter"
                                    status={step > 0 ? "done" : (step === 0 && isRunning ? "running" : "idle")}
                                />

                                {/* Step 2 */}
                                <PipelineNode
                                    icon={Database}
                                    title="Semantic Cache"
                                    status={step > 1 ? "done" : (step === 1 ? "running" : "idle")}
                                />

                                {/* Step 3 */}
                                <PipelineNode
                                    icon={Zap}
                                    title="Model Selection"
                                    status={step > 2 ? "done" : (step === 2 ? "running" : "idle")}
                                    isModel
                                />

                            </div>

                            {/* Connecting Lines */}
                            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-zinc-800 -translate-y-1/2 z-0">
                                {isRunning && (
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: step > 2 ? "100%" : (step * 33) + "%" }}
                                        className="h-full bg-primary"
                                        transition={{ duration: 0.8 }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Output Panel */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-t border-border/50 bg-zinc-900">
                            {/* Metrics */}
                            <div className="col-span-1 p-6 border-r border-border/50 bg-black/40">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Routing Decision</h4>
                                <div className="space-y-4">
                                    <MetricRow label="Selected Model" value={step > 2 ? "Gemini 1.5 Pro" : "..."} highlight />
                                    <MetricRow label="Confidence" value={step > 2 ? "94.2%" : "..."} />
                                    <MetricRow label="Est. Cost" value={step > 2 ? "$0.004" : "..."} />
                                    <MetricRow label="Est. Latency" value={step > 2 ? "850ms" : "..."} />
                                </div>
                            </div>

                            {/* Response */}
                            <div className="col-span-1 md:col-span-2 p-6 flex flex-col bg-black/20">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Streamed Response</h4>
                                <div className="flex-1 bg-zinc-950 rounded-lg border border-zinc-800/50 p-4 font-mono text-sm text-zinc-400">
                                    {step > 3 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd<br /><br />
                                            <span className="text-zinc-500"># Using Dask for large out-of-core data</span><br />
                                            <span className="text-blue-400">import</span> dask.dataframe <span className="text-blue-400">as</span> dd<br /><br />
                                            <span className="text-zinc-300">df = dd.read_csv("data.csv")</span>
                                            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                                        </motion.div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-zinc-700">
                                            Awaiting execution...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
        </section>
    );
}

function PipelineNode({ icon: Icon, title, status, isModel = false }: any) {
    return (
        <div className={`flex flex-col items-center gap-3 bg-black flex-1 relative z-10 transition-all duration-300 ${status === 'running' ? 'scale-110' : ''}`}>
            <div className={`
         w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500
         ${status === 'idle' ? 'border-zinc-800 bg-zinc-900 text-zinc-600' : ''}
         ${status === 'running' ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}
         ${status === 'done' ? (isModel ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-primary/50 bg-primary/10 text-primary') : ''}
       `}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium ${status === 'idle' ? 'text-zinc-600' : 'text-zinc-300'}`}>{title}</span>
        </div>
    )
}

function MetricRow({ label, value, highlight = false }: any) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={`font-mono ${highlight ? 'text-primary font-semibold' : 'text-zinc-300'}`}>{value}</span>
        </div>
    )
}
