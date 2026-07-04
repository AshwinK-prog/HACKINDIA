"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Statistics() {
    return (
        <section id="statistics" className="w-full py-24 bg-background border-y border-border/50">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                    <StatBox value={4} suffix="M+" label="Requests Routed" />
                    <StatBox value={40} suffix="%" label="Average Cost Reduction" />
                    <StatBox value={99} suffix=".99%" label="Uptime Guarantee" />
                    <StatBox value={20} suffix="ms" label="Max Gateway Latency" />
                </div>
            </div>
        </section>
    );
}

function StatBox({ value, suffix, label }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 1000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2 flex items-center">
                <span>{count}</span>
                <span className="text-primary">{suffix}</span>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
    )
}
