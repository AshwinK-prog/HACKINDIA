import { Card } from "@/components/ui/card";
import { BrainCircuit, DatabaseZap, DollarSign, LineChart, Shield, ActivitySquare } from "lucide-react";

export function Features() {
    const features = [
        {
            icon: BrainCircuit,
            title: "Intelligent Routing",
            desc: "Sends complex reasoning to GPT-4o and simpler tasks to Llama 3 or Gemini Flash."
        },
        {
            icon: DatabaseZap,
            title: "Semantic Edge Cache",
            desc: "Instant responses for similar intents. Eliminates redundant LLM provider costs."
        },
        {
            icon: DollarSign,
            title: "Cost Optimization",
            desc: "Save up to 40% on API bills without sacrificing response quality."
        },
        {
            icon: LineChart,
            title: "Advanced Analytics",
            desc: "Track token usage, cost breakdowns, and latency percentiles in real time."
        },
        {
            icon: ActivitySquare,
            title: "Provider Monitoring",
            desc: "Automatic failover if an API goes down. Maintains 99.99% uptime for your app."
        },
        {
            icon: Shield,
            title: "Data Explainability",
            desc: "Detailed logs explain precisely why a model was chosen for any specific prompt."
        }
    ];

    return (
        <section id="features" className="w-full py-24 bg-zinc-950/30">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise-grade capabilities</h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Everything you need to scale generative AI features reliably to millions of users.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((F, i) => (
                        <Card key={i} className="p-6 bg-background/50 border-border/50 hover:bg-zinc-900/80 transition-all duration-300 group cursor-default">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <F.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground">{F.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {F.desc}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
