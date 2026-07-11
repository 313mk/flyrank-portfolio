"use client";

import { useEffect, useRef, useState } from "react";

export default function Playground() {
  return (
    <div className="space-y-12 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">a11y Component Playground</h1>
        <p className="text-slate-600 mt-2">
          Handmade, accessible interactive UI patterns built from scratch matching W3C ARIA specifications.
        </p>
      </div>

      <section className="space-y-6 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold text-slate-800">1. Accessible Disclosure (Accordion)</h2>
        <AccessibleDisclosure />
      </section>

      <section className="space-y-6 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold text-slate-800">2. Accessible Tabs (Arrow Key Navigation)</h2>
        <AccessibleTabs />
      </section>

      <section className="space-y-6 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold text-slate-800">3. Accessible Modal Dialog (Focus Trap & Escape)</h2>
        <AccessibleModalControl />
      </section>
    </div>
  );
}

// ==========================================
// 1. ACCESSIBLE DISCLOSURE (ACCORDION)
// ==========================================
function AccessibleDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg bg-white max-w-lg">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 font-semibold text-[#0f172a] hover:bg-slate-50 flex justify-between items-center transition focus:outline-none focus:ring-2 focus:ring-[#0d9488] rounded-t-lg"
      >
        <span>What is a Resilient Frontend?</span>
        <span className={`transform transition ${isOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true">
          ▼
        </span>
      </button>
      <div
        id="disclosure-content"
        hidden={!isOpen}
        role="region"
        className="px-4 py-3 border-t border-slate-100 text-slate-600 text-sm leading-relaxed"
      >
        A resilient frontend is designed defensively. It actively anticipates, catches, and handles network latency, 
        API server crashes (like 500 errors), rate limits (429 errors), and browser-side connection cuts gracefully 
        rather than freezing or throwing unhandled runtime errors.
      </div>
    </div>
  );
}

// ==========================================
// 2. ACCESSIBLE TABS (ARROW KEY SYSTEM)
// ==========================================
interface Tab {
  id: string;
  label: string;
  content: string;
}

function AccessibleTabs() {
  const tabs: Tab[] = [
    { id: "react", label: "React", content: "React handles component rendering and local virtual DOM state management." },
    { id: "ts", label: "TypeScript", content: "TypeScript provides strict, compile-time safety and prevents structural API mismatches." },
    { id: "tailwind", label: "Tailwind CSS", content: "Tailwind CSS provides clean utility-first layout styling without style pollution." },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = index;
    if (e.key === "ArrowRight") {
      nextIdx = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIdx = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = tabs.length - 1;
    }

    if (nextIdx !== index) {
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="max-w-lg border border-slate-200 rounded-lg p-4 bg-white">
      <div role="tablist" aria-label="Frontend Technologies" className="flex border-b border-slate-200 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={idx === activeIdx}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={idx === activeIdx ? 0 : -1}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => { tabRefs.current[idx] = el; }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px focus:outline-none transition ${
              idx === activeIdx
                ? "border-[#0d9488] text-[#0d9488]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, idx) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={idx !== activeIdx}
          className="text-sm text-slate-600 leading-relaxed min-h-[48px]"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. ACCESSIBLE MODAL DIALOG
// ==========================================
function AccessibleModalControl() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus(); // Return focus to trigger button
  };

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-[#0f172a] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
      >
        Open Custom Dialog
      </button>

      {isOpen && <AccessibleModal onClose={handleClose} />}
    </div>
  );
}

interface ModalProps {
  onClose: () => void;
}

function AccessibleModal({ onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = modalRef.current;
    if (!rootEl) return;

    // Focus on the first element when modal opens
    const focusable = rootEl.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    // Capture tab keys to trap focus within the modal boundaries
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusableEls = rootEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: loop back to end element
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        // Tab: loop back to first element
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Restore scrolling
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-6 shadow-xl relative"
      >
        <h2 id="modal-title" className="text-xl font-bold text-[#0f172a] mb-2">
          Technical Verification
        </h2>
        <p id="modal-desc" className="text-sm text-slate-500 mb-6 leading-relaxed">
          This custom dialog uses a React Ref observer loop to trap focus. Tabbing out of this window will loop back to the close button, keeping users secure.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#0d9488] text-white rounded-md text-sm font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}