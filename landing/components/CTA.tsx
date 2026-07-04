import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section id="cta" className="w-full py-32 bg-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to optimize your AI?</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join leading enterprises that route millions of requests daily using LLM Router X. Deploy our gateway in under 5 minutes.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" className="h-14 px-10 text-lg rounded-full">
                        Start Routing Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-zinc-700 hover:bg-zinc-900">
                        Read Documentation
                    </Button>
                </div>
            </div>
        </section>
    );
}
