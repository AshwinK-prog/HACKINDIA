"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
    const faqs = [
        {
            q: "Does LLM Router X replace my current AI provider?",
            a: "No. LLM Router X acts as a gateway between your application and your providers (OpenAI, Anthropic, Google). You bring your own API keys, and we route the requests."
        },
        {
            q: "How does Semantic Caching work?",
            a: "We embed incoming prompts and compare them against previous requests using cosine similarity. If an identical intent is found, we return the cached response instantly, avoiding the API call completely."
        },
        {
            q: "Does routing add latency to my application?",
            a: "Our gateway adds less than 20ms of overhead. However, because we route simple requests to faster models and cache frequent ones, your overall application latency will drop."
        },
        {
            q: "Is my data secure?",
            a: "Yes. LLM Router X is an enterprise-grade gateway. We do not store your prompts indefinitely and we never use your data to train our own models. SOC2 compliance is standard."
        }
    ];

    return (
        <section id="faq" className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ question, answer }: any) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-border/50 rounded-xl overflow-hidden bg-zinc-950/30">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-zinc-900/50 transition-colors"
            >
                <span className="font-medium text-foreground">{question}</span>
                {open ? <Minus className="w-5 h-5 text-muted-foreground" /> : <Plus className="w-5 h-5 text-muted-foreground" />}
            </button>
            {open && (
                <div className="px-6 pb-5 pt-0 text-muted-foreground leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    )
}
