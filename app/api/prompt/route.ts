import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            // Step 1: Simulate Pipeline routing delays
            controller.enqueue(encoder.encode(JSON.stringify({ type: 'status', node: 'intent', state: 'completed' }) + '\n'));
            await new Promise(r => setTimeout(r, 600));

            controller.enqueue(encoder.encode(JSON.stringify({ type: 'status', node: 'cache', state: 'completed' }) + '\n'));
            await new Promise(r => setTimeout(r, 400));

            // Send Metadata payload
            const meta = {
                provider: prompt.length < 50 ? 'Llama 3' : 'Gemini 1.5 Pro',
                latency: 432,
                cost: 0.002,
                confidence: 0.94,
                tokens: { input: prompt.length, output: 0, total: 0 }
            };

            controller.enqueue(encoder.encode(JSON.stringify({ type: 'meta', data: meta }) + '\n'));
            controller.enqueue(encoder.encode(JSON.stringify({ type: 'status', node: 'provider', state: 'completed' }) + '\n'));
            await new Promise(r => setTimeout(r, 400));

            controller.enqueue(encoder.encode(JSON.stringify({ type: 'status', node: 'stream', state: 'running' }) + '\n'));

            // Step 2: Stream fake response chunks
            const sampleText = "Based on the intent analysis of your request, LLM Router X has selected this model to provide an optimal response taking into consideration cost and latency percentiles. \n\nHere is a code snippet you requested:\n```python\nimport pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.head())\n```\nThe gateway successfully bypassed the heavier GPT-4 endpoint avoiding $0.03 in excess costs.";
            const chunks = sampleText.split(' ');

            for (const word of chunks) {
                await new Promise(r => setTimeout(r, 50)); // stream delay
                controller.enqueue(encoder.encode(JSON.stringify({ type: 'chunk', content: word + ' ' }) + '\n'));
            }

            controller.enqueue(encoder.encode(JSON.stringify({ type: 'status', node: 'stream', state: 'completed' }) + '\n'));
            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
