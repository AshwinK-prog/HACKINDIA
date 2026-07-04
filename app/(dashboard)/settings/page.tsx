"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Copy, Plus, RefreshCw, Sun, Moon, Link as LinkIcon, Users, Check } from "lucide-react";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("rtx_live_9a8b7c6d5e4f3x2y1z");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pt-24 px-4 pb-24">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage budget caps, API access, webhooks, and team preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Navigation/Small settings) */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <Card className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Toggle your dashboard interface theme.
                        </p>
                        {mounted && (
                            <div className="flex bg-muted p-1 rounded-lg">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${theme === 'light' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${theme === 'dark' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </button>
                            </div>
                        )}
                    </Card>

                    <Card className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Receive HTTP POST alerts when budget caps are hit or endpoints degrade.
                        </p>
                        <Button variant="outline" className="w-full">
                            <LinkIcon className="w-4 h-4 mr-2" /> Configure Endpoints
                        </Button>
                    </Card>

                    <Card className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-4">Team Access</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Invite developers (Admin/Viewer scopes) to this organization workspace.
                        </p>
                        <div className="flex -space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center text-xs font-bold text-white z-20">AK</div>
                            <div className="w-10 h-10 rounded-full border-2 border-background bg-rose-500 flex items-center justify-center text-xs font-bold text-white z-10">SR</div>
                            <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground z-0">
                                <Users className="w-4 h-4" />
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Invite Members
                        </Button>
                    </Card>
                </div>

                {/* Right Column (Core configuration) */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <Card className="p-8 bg-card border-border shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Hard Budget Caps</h3>
                        <p className="text-sm text-muted-foreground mb-8 max-w-xl">
                            Enforce a hard limit on daily LLM expenditure. Once this cap is reached, Router X will aggressively fallback to the cheapest cached node or halt requests.
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-muted/40 p-6 rounded-xl border border-border">
                            <div className="flex-1">
                                <div className="text-sm font-semibold mb-1">Daily Cap Threshold</div>
                                <div className="text-xs text-muted-foreground">Gateway forcefully rejects requests exceeding this amount.</div>
                            </div>
                            <div className="flex items-center gap-3 mt-4 md:mt-0">
                                <span className="text-muted-foreground font-medium">$</span>
                                <input type="number" defaultValue={50} className="bg-background border border-border rounded-lg px-4 py-2 w-32 text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-mono" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-card border-border shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">Gateway API Keys</h3>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 shadow-none">Production</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-8 max-w-xl">
                            Your organizational root keys for Router X. Inject this into your backend SDKs. Do not expose these on the client side.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary Key</label>
                                <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <div className="flex-1 bg-muted/50 flex items-center justify-between px-4 py-3 rounded-lg border border-border">
                                        <span className="font-mono text-sm text-foreground tracking-widest">rtx_live_9a8b7c6d5e4f3x2y1z</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="h-[46px] w-[46px] p-0 shrink-0" onClick={handleCopy}>
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                        <Button variant="outline" className="h-[46px] px-4 shrink-0 border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-destructive transition-colors">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Revoke
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end pt-4 mb-10">
                        <Button onClick={handleSave} className="h-12 px-10 text-white rounded-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto">
                            {saving ? 'Saving...' : 'Save Configuration'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
