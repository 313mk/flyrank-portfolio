import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8 py-12">
      <section className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[#0f172a]">
          I build resilient React interfaces integrated with AI.
        </h1>
        <p className="text-lg text-slate-600">
          Designing clean state management to handle LLM streaming, API latency, and network edge cases.
        </p>
        <div className="pt-4">
          <Link href="/case-study" className="bg-[#0d9488] text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-700 transition">
            View My Case Study
          </Link>
        </div>
      </section>
    </div>
  );
}