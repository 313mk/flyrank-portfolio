import Link from "next/link";

export default function CaseStudy() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Case Study: Resilient Chat</h1>
      <p className="text-slate-600">
        Analyzing client-side handling of LLM streams under latency and unhandled API failures.
      </p>
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Technical Highlights</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Custom state-management React hook (`useStreamingChat`)</li>
          <li>API shielding using Vercel Serverless Functions</li>
          <li>Explicit dynamic error boundaries and loading states</li>
        </ul>
      </div>
      <Link href="/contact" className="inline-block text-[#0d9488] font-semibold hover:underline">
        Get in touch to schedule a screening &rarr;
      </Link>
    </div>
  );
}