"use client";

import { useWorkspaceStore } from "../store/useWorkspaceStore";
import { Button } from "@/components/ui/button";
import { ArrowUp, StopCircle } from "lucide-react";
import { useRef, useEffect } from "react";

export function PromptComposer() {
    const { prompt, setPrompt, status, setStatus, clearResponse, appendResponseToken, setNodeState, setRouteMeta, resetNodes } = useWorkspaceStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [prompt]);

    const handleSubmit = async () => {
        if (!prompt.trim() || status === 'running') return;

        setStatus('running');
        clearResponse();
        resetNodes();
        setNodeState('intent', 'running');

        try {
            const res = await fetch('/api/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!res.body) throw new Error('No readable stream');
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n').filter(Boolean);

                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line);
                            if (data.type === 'status') {
                                setNodeState(data.node, data.state);
                                if (data.node === 'intent' && data.state === 'completed') setNodeState('cache', 'running');
                                if (data.node === 'cache' && data.state === 'completed') setNodeState('provider', 'running');
                            } else if (data.type === 'meta') {
                                setRouteMeta(data.data);
                            } else if (data.type === 'chunk') {
                                appendResponseToken(data.content);
                            }
                        } catch (e) {
                            console.error("SSE parse error", e, line);
                        }
                    }
                }
            }
            setStatus('completed');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="relative w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)] focus-within:ring-2 focus-within:ring-primary/20 transition-shadow duration-200">
                <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask LLM Router X to analyze data, write code, or route your query..."
                    className="w-full bg-transparent text-white p-4 pr-16 min-h-[80px] max-h-[300px] overflow-y-auto resize-none focus:outline-none placeholder:text-zinc-500"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <span className="text-xs text-zinc-600 hidden md:block">~{Math.ceil(prompt.length / 4)} tokens</span>
                    <button
                        onClick={handleSubmit}
                        disabled={!prompt.trim() && status !== 'running'}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${status === 'running'
                                ? 'bg-zinc-800 text-zinc-400 hover:text-white'
                                : prompt.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-zinc-800 text-zinc-600'
                            }`}
                    >
                        {status === 'running' ? <StopCircle className="w-5 h-5" /> : <ArrowUp className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
