"use client";

import { useWorkspaceStore } from "../store/useWorkspaceStore";
import { BrainCircuit, Database, Server, RadioReceiver } from "lucide-react";

export function RoutingPipeline() {
    const { pipelineNodes, status } = useWorkspaceStore();

    if (status === 'idle') return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-8">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6 px-2">Gateway Execution Pipeline</div>

            <div className="relative flex items-center justify-between p-8 bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden">

                {/* Animated Connecting Track */}
                <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-zinc-900 -translate-y-1/2 z-0 overflow-hidden">
                    {status !== 'idle' && (
                        <div className="h-full bg-primary/20 w-full relative">
                            {/* Virtual Packet */}
                            <div
                                className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
                                style={{
                                    animation: "movePacket 3s infinite cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                            />
                        </div>
                    )}
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes movePacket {
            0% { transform: translateX(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(500%); opacity: 0; }
          }
        `}} />

                <PipelineNode
                    icon={BrainCircuit}
                    title="Intent Analysis"
                    state={pipelineNodes.intent}
                />

                <PipelineNode
                    icon={Database}
                    title="Semantic Cache"
                    state={pipelineNodes.cache}
                />

                <PipelineNode
                    icon={Server}
                    title="Provider Selection"
                    state={pipelineNodes.provider}
                />

                <PipelineNode
                    icon={RadioReceiver}
                    title="Stream Response"
                    state={pipelineNodes.stream}
                />

            </div>
        </div>
    );
}

function PipelineNode({ icon: Icon, title, state }: any) {
    const getStyles = () => {
        switch (state) {
            case 'idle': return 'bg-zinc-950 border-zinc-800 text-zinc-600';
            case 'running': return 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] text-primary scale-110';
            case 'completed': return 'bg-green-500/10 border-green-500/50 text-green-500';
            case 'error': return 'bg-red-500/10 border-red-500/50 text-red-500';
            default: return '';
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 relative z-10 w-24 transition-transform duration-300">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${getStyles()}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[11px] font-medium text-center transition-colors ${state === 'idle' ? 'text-zinc-600' : 'text-zinc-300'}`}>
                {title}
            </span>
        </div>
    );
}
