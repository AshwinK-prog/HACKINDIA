"use client";

import { useWorkspaceStore } from "../store/useWorkspaceStore";
import { CheckCircle2, ChevronRight, Copy, TerminalSquare, AlertCircle } from "lucide-react";

export function StreamingResponseViewer() {
    const { response, status, routeMeta } = useWorkspaceStore();

    if (status === 'idle' && !response) return null;

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 mt-8">
            {/* Dynamic Metadata Panel */}
            {routeMeta && (
                <div className="flex flex-wrap items-center gap-3 p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm transition-all animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20">
                        <CheckCircle2 className="w-4 h-4" />
                        Routed to {routeMeta.provider}
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400 px-2">
                        <span className="flex items-center gap-1"><span className="text-zinc-600">Latency:</span> {routeMeta.latency}ms</span>
                        <span className="mx-1 text-zinc-700">•</span>
                        <span className="flex items-center gap-1"><span className="text-zinc-600">Est. Cost:</span> ${routeMeta.cost.toFixed(4)}</span>
                        <span className="mx-1 text-zinc-700">•</span>
                        <span className="flex items-center gap-1"><span className="text-zinc-600">Confidence:</span> {(routeMeta.confidence * 100).toFixed(1)}%</span>
                    </div>
                </div>
            )}

            {/* Response Display */}
            {(status === 'running' || response) && (
                <div className="relative group p-6 md:p-8 bg-zinc-950/80 border border-zinc-800 rounded-2xl min-h-[200px] shadow-sm">

                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-400 font-medium">
                            <TerminalSquare className="w-5 h-5 text-zinc-500" />
                            Generated Response
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-zinc-300">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="prose prose-invert prose-p:leading-relaxed max-w-none text-zinc-300 whitespace-pre-wrap font-mono text-sm leading-7">
                        {response}
                        {status === 'running' && (
                            <span className="inline-block w-2.5 h-4 ml-1 bg-primary animate-pulse align-middle" />
                        )}
                    </div>

                    {status === 'error' && (
                        <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-500">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm">Connection to LLM Router X Gateway failed. Please check your network or try again later.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
