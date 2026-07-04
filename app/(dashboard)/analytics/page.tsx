"use client";

import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const trafficData = [
    { time: '00:00', requests: 1200, cost: 24 },
    { time: '04:00', requests: 900, cost: 18 },
    { time: '08:00', requests: 3200, cost: 64 },
    { time: '12:00', requests: 4500, cost: 90 },
    { time: '16:00', requests: 3800, cost: 76 },
    { time: '20:00', requests: 2100, cost: 42 },
];

const providerData = [
    { name: 'Gemini Flash', value: 45, color: '#3b82f6' },
    { name: 'Claude 3.5 Sonnet', value: 30, color: '#8b5cf6' },
    { name: 'GPT-4o', value: 15, color: '#10b981' },
    { name: 'Llama 3 8B', value: 10, color: '#f59e0b' },
];

export default function AnalyticsPage() {
    return (
        <div className="w-full max-w-7xl mx-auto pt-24 px-4 pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Real-time telemetry across your LLM infrastructure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard title="Total Cost Saved (24h)" value="$1,240.50" trend="+14.2%" highlight />
                <MetricCard title="Cache Hit Ratio" value="28.4%" trend="+2.1%" />
                <MetricCard title="Avg Latency" value="840ms" trend="-11%" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2 p-6 bg-card border-border shadow-sm">
                    <h3 className="font-semibold mb-6">Traffic & Cost Overlay (24h)</h3>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.2)" vertical={false} />
                                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReq)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6 bg-card border-border shadow-sm flex flex-col">
                    <h3 className="font-semibold mb-6">Routing Distribution</h3>

                    <div className="flex-1 flex flex-col pt-4">
                        <div className="h-[180px] w-full relative mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={providerData} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value">
                                        {providerData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                <span className="text-xl font-bold">14.6k</span>
                                <span className="text-[10px] text-muted-foreground w-16 leading-tight uppercase font-semibold">Total Req</span>
                            </div>
                        </div>

                        {/* Distribution List */}
                        <div className="flex flex-col gap-3 w-full">
                            {providerData.map(provider => (
                                <div key={provider.name} className="flex flex-row items-center justify-between p-2 rounded-lg bg-muted/40">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: provider.color }} />
                                        <span className="text-sm font-medium">{provider.name}</span>
                                    </div>
                                    <span className="text-sm font-mono text-muted-foreground">{provider.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, highlight = false }: any) {
    return (
        <Card className={`p-6 shadow-sm overflow-hidden relative ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
            <div className="text-sm font-medium text-muted-foreground mb-2">{title}</div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-blue-500'}`}>
                {trend} vs last week
            </div>
            {highlight && <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />}
        </Card>
    )
}
