"use client";

import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${scrolled
                    ? "bg-background/80 backdrop-blur-md border-border"
                    : "bg-transparent border-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Network className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight">LLM Router X</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="#architecture" className="hover:text-foreground transition-colors">Architecture</Link>
                    <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                        Sign In
                    </Link>
                    <Button className="rounded-full px-6">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
}
