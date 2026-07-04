import { Network } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-12 bg-background border-t border-border/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Network className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-lg tracking-tight">LLM Router X</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            The enterprise AI gateway for optimal routing, semantic caching, and predictive latency.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-border/50 text-sm text-muted-foreground flex justify-between items-center flex-col md:flex-row gap-4">
                    <p>© {new Date().getFullYear()} LLM Router X AI. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-foreground">Twitter</Link>
                        <Link href="#" className="hover:text-foreground">GitHub</Link>
                        <Link href="#" className="hover:text-foreground">Discord</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
