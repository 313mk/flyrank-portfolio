export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  // Professional contextual answers representing Kamran
  let responseText = "Hello! I am Muhammad Kamran's portfolio assistant. I am running in a resilient, client-side preview stream mode to showcase my real-time token rendering and latency management.\n\nKamran is a Frontend AI Engineer skilled in React, Next.js, strict TypeScript, serverless functions, and resilient state management. He built this entire Next.js portfolio, including this chat streaming gateway and a fully accessible component playground.";

  if (lastUserMessage.toLowerCase().includes("skills") || lastUserMessage.toLowerCase().includes("tech") || lastUserMessage.toLowerCase().includes("react")) {
    responseText = "Muhammad Kamran's core technical skills include:\n\n1. Core Frameworks: React 19, Next.js 16 (App Router, Server/Client components)\n2. Engineering Languages: Strict TypeScript, JavaScript (ES6+)\n3. Layout & Styling: Tailwind CSS, CSS Grid/Flexbox\n4. AI Toolchain: Vercel AI SDK, Cursor, custom streaming hooks, and secure Serverless API gateways.";
  } else if (lastUserMessage.toLowerCase().includes("name") || lastUserMessage.toLowerCase().includes("who") || lastUserMessage.toLowerCase().includes("kamran")) {
    responseText = "This portfolio belongs to Muhammad Kamran. He is a dedicated Frontend AI Intern specializing in building secure, accessible, and resilient web applications integrated cleanly with generative AI models.";
  }

  // Generate a standard readable stream that outputs word-by-word with a delay
  const encoder = new TextEncoder();
  const words = responseText.split(" ");
  let wordIndex = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function pushWord() {
        if (wordIndex < words.length) {
          // Format to match Vercel AI SDK's text stream protocol (0:"text\n")
          const token = `0:${JSON.stringify(words[wordIndex] + " ")}\n`;
          controller.enqueue(encoder.encode(token));
          wordIndex++;
          setTimeout(pushWord, 40); // 40ms delay per word to simulate real streaming
        } else {
          controller.close();
        }
      }
      pushWord();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}