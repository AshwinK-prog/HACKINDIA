import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingUp, Lock } from "lucide-react";

export function Problem() {
    return (
        <section id="problem" className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">The AI Infrastructure Problem</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Scaling AI in production creates a trilemma: you are forced to choose between cost, latency, and quality. Model lock-in makes it worse.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="p-6 bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                        <TrendingUp className="w-8 h-8 text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Runaway Costs</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Using the most powerful model for every request wastes capital on simple queries that smaller, cheaper models can handle perfectly.
                        </p>
                    </Card>

                    <Card className="p-6 bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                        <AlertCircle className="w-8 h-8 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Unpredictable Latency</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Provider outages and rate limits cause cascading failures. Without dynamic fallback, your application goes down when OpenAI or Anthropic does.
                        </p>
                    </Card>

                    <Card className="p-6 bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                        <Lock className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Vendor Lock-in</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Hardcoding APIs means you cannot instantly switch to the newest, most efficient model when it releases. You are stuck with legacy endpoints.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}
