import { PromptComposer } from "@/features/workspace/components/PromptComposer";
import { RoutingPipeline } from "@/features/workspace/components/RoutingPipeline";
import { StreamingResponseViewer } from "@/features/workspace/components/StreamingResponseViewer";

export default function WorkspacePage() {
    return (
        <div className="flex flex-col min-h-screen bg-background pt-24 px-4 pb-12 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight mb-2">AI Workspace</h1>
                <p className="text-muted-foreground text-sm max-w-xl">
                    Enter your prompt below. The Gateway will dynamically route your request to the optimal model based on organizational rules, cost ceilings, and semantic caching.
                </p>
            </div>

            <PromptComposer />

            <RoutingPipeline />

            <StreamingResponseViewer />
        </div>
    );
}
