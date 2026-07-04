"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, LayoutDashboard, History, Activity, Settings, TerminalSquare, LogOut, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
            <Sidebar />
            <main className="flex-1 overflow-y-auto w-full relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none" />
                <div className="relative z-10 w-full min-h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const links = [
        { href: "/workspace", icon: TerminalSquare, label: "Workspace" },
        { href: "/analytics", icon: LayoutDashboard, label: "Analytics" },
        { href: "/models", icon: Activity, label: "Models & Health" },
        { href: "/history", icon: History, label: "Request History" },
        { href: "/settings", icon: Settings, label: "Settings" },
    ];

    return (
        <aside className="w-64 border-r border-border/50 bg-background flex flex-col pt-6 shrink-0 z-20 shadow-2xl">
            <Link href="/" className="flex items-center gap-3 px-6 mb-10 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <BrainCircuit className="w-5 h-5" />
                </div>
                <span className="font-bold tracking-tight group-hover:text-blue-400 transition-colors">Router X</span>
            </Link>

            <div className="flex-1 flex flex-col gap-1 px-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Applications</div>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden ${isActive ? 'text-blue-400 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-zinc-900/50'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <link.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-blue-500' : 'text-muted-foreground group-hover:text-foreground'}`} />
                            <span className="relative z-10">{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-border/50 mt-auto flex flex-col gap-2">
                {/* Theme Toggle Button */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-zinc-900/50 rounded-lg transition-colors w-full text-left"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                )}

                <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors mt-auto">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </div>
            </div>
        </aside>
    );
}
