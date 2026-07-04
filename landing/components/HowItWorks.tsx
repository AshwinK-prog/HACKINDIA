import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            title: "Receive Request",
            desc: "Your app sends a standard OpenAI-compatible JSON payload to our gateway."
        },
        {
            title: "Determine Intent & Complexity",
            desc: "We analyze the prompt's token size, intent, and semantic difficulty."
        },
        {
            title: "Evaluate Cache",
            desc: "Semantic caching checks if a mathematically similar request was answered recently."
        },
        {
            title: "Route & Stream",
            desc: "We select the highest ROI model (e.g., Llama 3 for translation, GPT-4 for code) and stream the response."
        }
    ];

    return (
        <section id="howitworks" className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">How LLM Router X Works</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A transparent pipeline designed to augment, not replace, your existing architecture.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-border z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shrink-0 shadow-lg shadow-black">
                                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
