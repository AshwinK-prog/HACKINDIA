"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Code, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPage() {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const logs = [
        {
            id: "rtx_8f72a1b9", time: "11:42 AM", promptShort: "Summarize Q3 earnings report...",
            provider: "Claude 3.5 Sonnet", cost: "$0.012", latency: "840ms", cache: false,
            promptFull: "Please summarize the attached Q3 earnings report for ACME Corp, focusing specifically on operating margins, GAAP revenue, and forward-looking guidance for Q4. Format as markdown bullet points.",
            responseFull: "Based on the ACME Corp Q3 earnings report:\n\n* **GAAP Revenue**: Reached $14.2B, representing a 14% year-over-year increase.\n* **Operating Margins**: Expanded to 22.4%, driven by cloud optimization.\n* **Q4 Guidance**: Projected revenue of $15.1B to $15.5B, raising previous estimates."
        },
        {
            id: "rtx_2b49c8d2", time: "11:41 AM", promptShort: "Translate hello to french",
            provider: "Llama 3 8B", cost: "$0.000", latency: "42ms", cache: true,
            promptFull: "Translate hello to french",
            responseFull: '"Bonjour"'
        },
        {
            id: "rtx_9e1f3a2c", time: "11:35 AM", promptShort: "Write Python script...",
            provider: "GPT-4o", cost: "$0.044", latency: "1120ms", cache: false,
            promptFull: "Write a high-performance Python script using ThreadPoolExecutor to fetch 10,000 URLs concurrently. I need it to cleanly handle timeouts and retry logic with exponential backoff.",
            responseFull: "```python\nimport concurrent.futures\nimport requests\nfrom requests.adapters import HTTPAdapter\nfrom urllib3.util.retry import Retry\n\n# Advanced retry strategy\nretry_strategy = Retry(\n    total=3,\n    backoff_factor=1,\n    status_forcelist=[429, 500, 502, 503, 504]\n)\n# ... (truncated for demo)\n```"
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto pt-24 px-4 pb-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Request Architecture Log</h1>
                <p className="text-muted-foreground text-sm mt-1">Granular audit trail of all AI requests, routing decisions, and payload data.</p>
            </div>

            <Card className="bg-card border-border rounded-xl flex flex-col shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap table-auto border-collapse">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Request ID</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider w-[35%]">Prompt Used</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Provider</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Latency</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Cost</th>
                                <th className="px-6 py-4 border-none"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground">
                            {logs.map((log) => (
                                <React.Fragment key={log.id}>
                                    <tr
                                        onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                        className={`transition-colors cursor-pointer group ${expandedRow === log.id ? 'bg-muted/30' : 'hover:bg-muted/30'}`}
                                    >
                                        <td className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground group-hover:text-foreground border-none">{log.id}</td>
                                        <td className="px-6 py-4 text-muted-foreground border-none">{log.time}</td>
                                        <td className="px-6 py-4 border-none font-medium truncate max-w-xs">{log.promptShort}</td>
                                        <td className="px-6 py-4 border-none">
                                            <Badge variant="outline" className={log.cache ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-none' : 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none'}>
                                                {log.provider}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-xs border-none">{log.latency}</td>
                                        <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground border-none">{log.cost}</td>
                                        <td className="px-6 py-4 text-right border-none">
                                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedRow === log.id ? 'rotate-180 text-foreground' : ''}`} />
                                        </td>
                                    </tr>

                                    {/* Collapsible Detail View */}
                                    <AnimatePresence>
                                        {expandedRow === log.id && (
                                            <tr>
                                                <td colSpan={7} className="p-0 border-0 bg-transparent">
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-background/50 border-y border-border shadow-inner"
                                                    >
                                                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                                                                    <Code className="w-4 h-4" /> Full Prompt Payload
                                                                </div>
                                                                <div className="p-4 bg-muted/40 border border-border rounded-lg text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                                                    {log.promptFull}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                                                                    <Zap className="w-4 h-4" /> Gateway Execution
                                                                </div>
                                                                <div className="p-4 bg-muted/40 border border-border rounded-lg text-sm text-foreground whitespace-pre-wrap leading-relaxed font-mono text-xs">
                                                                    {log.responseFull}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
