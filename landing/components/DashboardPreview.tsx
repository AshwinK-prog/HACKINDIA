import { Card } from "@/components/ui/card";
import { LayoutDashboard, Settings, Activity, BrainCircuit } from "lucide-react";

export function DashboardPreview() {
    return (
        <section id="dashboard" className="w-full py-24 bg-zinc-950/20 overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Command Center</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A unified view of your entire AI infrastructure. Monitor latency, track provider costs, and debug specific model responses.
                    </p>
                </div>

                {/* Dashboard Wireframe Container */}
                <div className="max-w-5xl mx-auto">
                    <Card className="border border-border/50 bg-black shadow-2xl rounded-2xl overflow-hidden min-h-[500px] flex">

                        {/* Sidebar */}
                        <div className="w-16 md:w-56 border-r border-border/50 bg-zinc-950/50 flex flex-col p-4 gap-2">
                            <div className="flex items-center gap-3 mb-8 px-2 mt-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                    <BrainCircuit className="w-4 h-4" />
                                </div>
                                <div className="hidden md:block font-bold text-sm tracking-tight text-white">LLM Router X</div>
                            </div>

                            <SidebarItem active icon={LayoutDashboard} label="Overview" />
                            <SidebarItem icon={Activity} label="Analytics" />
                            <SidebarItem icon={Settings} label="Settings" />
                        </div>

                        {/* Main Content Pane */}
                        <div className="flex-1 p-6 flex flex-col bg-[#050510]">

                            {/* Top Navigation */}
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-semibold text-white">Overview</h3>
                                <div className="text-xs text-muted-foreground px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
                                    Live Environment
                                </div>
                            </div>

                            {/* Metric Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <FakeMetric title="Total Requests" value="1.2M" trend="+12%" />
                                <FakeMetric title="Cache Hit Rate" value="18.4%" trend="+2%" />
                                <FakeMetric title="Cost Saved" value="$4,120" trend="+24%" isPrimary />
                                <FakeMetric title="P95 Latency" value="840ms" trend="-11%" />
                            </div>

                            {/* Chart & Logs Area */}
                            <div className="flex gap-4 flex-1">
                                <div className="flex-1 border border-border/50 bg-zinc-950/80 rounded-xl p-4 flex flex-col">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Traffic vs Cost</h4>
                                    {/* Mock Chart Area */}
                                    <div className="flex-1 w-full bg-zinc-900/30 rounded-lg border border-zinc-800/50 flex items-end justify-between p-2 gap-2">
                                        {[40, 70, 50, 90, 60, 100, 80, 50, 60, 40, 80, 110].map((h, i) => (
                                            <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group hover:bg-primary/50 transition-colors" style={{ height: `${h}%` }}>
                                                <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded text-white shadow-xl pointer-events-none">
                                                    Traffic
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}

function SidebarItem({ icon: Icon, label, active = false }: any) {
    return (
        <div className={`p-2 flex items-center gap-3 rounded-lg cursor-default transition-colors ${active ? 'bg-primary/20 text-primary' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium hidden md:block">{label}</span>
        </div>
    )
}

function FakeMetric({ title, value, trend, isPrimary = false }: any) {
    return (
        <div className={`p-4 rounded-xl border ${isPrimary ? 'bg-primary/10 border-primary/20' : 'bg-zinc-950 border-zinc-800'}`}>
            <div className={`text-xs font-medium mb-2 ${isPrimary ? 'text-primary' : 'text-zinc-400'}`}>{title}</div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-zinc-500'}`}>{trend} from last week</div>
        </div>
    )
}
