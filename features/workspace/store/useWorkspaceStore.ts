import { create } from 'zustand';

export type PipelineStatus = 'idle' | 'running' | 'completed' | 'error';
export type NodeState = 'idle' | 'running' | 'completed' | 'error';

export interface RouteMetadata {
    provider: string;
    latency: number;
    cost: number;
    confidence: number;
    tokens: { input: number; output: number; total: number };
}

interface WorkspaceState {
    prompt: string;
    setPrompt: (text: string) => void;

    response: string;
    appendResponseToken: (token: string) => void;
    clearResponse: () => void;

    status: PipelineStatus;
    setStatus: (status: PipelineStatus) => void;

    pipelineNodes: {
        intent: NodeState;
        cache: NodeState;
        provider: NodeState;
        stream: NodeState;
    };
    setNodeState: (node: keyof WorkspaceState['pipelineNodes'], state: NodeState) => void;
    resetNodes: () => void;

    routeMeta: RouteMetadata | null;
    setRouteMeta: (meta: RouteMetadata | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    prompt: '',
    setPrompt: (text) => set({ prompt: text }),

    response: '',
    appendResponseToken: (token) => set((state) => ({ response: state.response + token })),
    clearResponse: () => set({ response: '' }),

    status: 'idle',
    setStatus: (status) => set({ status }),

    pipelineNodes: {
        intent: 'idle',
        cache: 'idle',
        provider: 'idle',
        stream: 'idle',
    },
    setNodeState: (node, state) => set((s) => ({
        pipelineNodes: { ...s.pipelineNodes, [node]: state }
    })),
    resetNodes: () => set({
        pipelineNodes: { intent: 'idle', cache: 'idle', provider: 'idle', stream: 'idle' }
    }),

    routeMeta: null,
    setRouteMeta: (meta) => set({ routeMeta: meta }),
}));
