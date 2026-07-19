"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/api/chat",
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-800">Portfolio Assistant</h1>
          <p className="text-xs text-slate-500">Ask me about Kamran's qualifications</p>
        </div>
        {isLoading && (
          <button
            type="button"
            onClick={stop}
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded-md text-xs font-semibold transition focus:outline-none"
          >
            Stop Generation
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <span className="text-3xl">👋</span>
            <h2 className="font-semibold text-slate-700">Ask a Question</h2>
            <p className="text-sm text-slate-500 max-w-sm">
              Inquire about my React skills, serverless setup, or how I solved form security in this portfolio.
            </p>
          </div>
        ) : (
          (messages as ChatMessage[]).map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[#0f172a] text-white ml-auto rounded-tr-none"
                  : "bg-white border border-slate-200 text-[#0f172a] mr-auto rounded-tl-none"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                {m.role === "user" ? "You" : "Assistant"}
              </span>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          ))
        )}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="bg-white border border-slate-200 text-[#0f172a] mr-auto rounded-lg rounded-tl-none p-3 text-sm max-w-[85%] flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Assistant</span>
            <div className="flex gap-1.5 items-center pl-2">
              <span className="h-1.5 w-1.5 bg-[#0d9488] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="h-1.5 w-1.5 bg-[#0d9488] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="h-1.5 w-1.5 bg-[#0d9488] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something (e.g., What are your React skills?)..."
          disabled={isLoading && messages[messages.length - 1]?.role !== "assistant"}
          className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488] disabled:bg-slate-50"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-[#0f172a] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:hover:bg-slate-900"
        >
          Send
        </button>
      </form>
    </div>
  );
}