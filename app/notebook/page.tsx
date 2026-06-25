"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface LogEntry {
  id: string;
  logNumber: string;
  date: string;
  title: string;
  category: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

const LOG_ENTRIES: LogEntry[] = [
  {
    id: "log-1",
    logNumber: "LOG #03",
    date: "2026-06-15",
    category: "AI INFRASTRUCTURE",
    title: "Deterministic Guardrails in Customer AI Agents",
    content: "When deploying LLMs to interface with live customer systems or databases, the biggest hazard is prompt injection or query hallucination. Rather than hoping the model honors system instructions, we restrict intents using a schema-locked dispatcher. The user input is parsed, matched to an schema enum, and executed via hardcoded API wrappers. This guarantees that model outputs are kept entirely within strict operational bounds.",
    codeSnippet: `// Example of schema-locked intent dispatcher
type SupportedIntent = "GET_BALANCE" | "LIST_TRANSACTIONS";

interface DispatcherResult {
  intent: SupportedIntent;
  parameters: Record<string, any>;
}

function executeIntent(result: DispatcherResult) {
  switch (result.intent) {
    case "GET_BALANCE":
      return fetchBalance(result.parameters.accountId);
    case "LIST_TRANSACTIONS":
      return listTransactions(result.parameters.accountId, result.parameters.limit);
    default:
      throw new Error("Compliance violation: unauthorized schema execution");
  }
}`,
    codeLanguage: "typescript"
  },
  {
    id: "log-2",
    logNumber: "LOG #02",
    date: "2026-05-24",
    category: "PERFORMANCE",
    title: "Reducing Invoicing Pipelines from 48h to 11m",
    content: "In supply chain management, data arrives via messy Excel or PDF documents from dozens of vendors. The legacy validation stack ran batch jobs twice a week. We refactored this into an event-driven queue: each document triggers an isolated serverless runner that processes and validates data against contract terms in parallel. In-memory caching with Redis was added to bypass database bottlenecks for frequently queryable entities.",
    codeSnippet: `// Event-driven serverless batch runner entrypoint
export async function handler(event: SQSMessage) {
  const invoice = JSON.parse(event.body);
  
  // Parallel validation promises
  const [vendorValid, balanceValid] = await Promise.all([
    validateVendor(invoice.vendorId),
    validateBalances(invoice.items)
  ]);

  if (!vendorValid || !balanceValid) {
    return markForManualReview(invoice.id);
  }

  await commitInvoiceToLedger(invoice);
}`,
    codeLanguage: "javascript"
  },
  {
    id: "log-3",
    logNumber: "LOG #01",
    date: "2026-04-02",
    category: "DESIGN SYSTEMS",
    title: "Why Blueprint Aesthetics Elevate Developer Tools",
    content: "Developer interfaces are often cluttered with flat buttons and generic colors. By introducing wireframe aesthetics (dashed borders, alignment pluses, monospace typography), we align the visual design with the actual mental model of coding. Monospace links and bracket wrappers resemble structural indices, and corner brackets draw attention to interactive focal points, creating an incredibly satisfying user flow."
  }
];

export default function NotebookPage() {
  const [expandedLog, setExpandedLog] = useState<string | null>("log-1");

  const toggleLog = (id: string) => {
    setExpandedLog((prev) => (prev === id ? null : id));
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 leading-none">
          Notebook
        </h1>
        <p className="max-w-xl mx-auto text-neutral-500 text-xs sm:text-sm font-mono uppercase tracking-widest">
          Systems Engineering logs &amp; research notes
        </p>
      </div>

      {/* Log list */}
      <div className="space-y-6 pt-6">
        {LOG_ENTRIES.map((log) => {
          const isExpanded = expandedLog === log.id;
          return (
            <div
              key={log.id}
              className={`border border-neutral-200 bg-white relative transition-all duration-300 ${
                isExpanded ? "shadow-md" : "hover:border-neutral-400"
              }`}
            >
              {/* Technical Corners */}
              <div className="tech-bracket-tl"></div>
              <div className="tech-bracket-tr"></div>
              <div className="tech-bracket-bl"></div>
              <div className="tech-bracket-br"></div>

              {/* Log Header / Summary row */}
              <div
                onClick={() => toggleLog(log.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200 whitespace-nowrap">
                    {log.logNumber}
                  </span>
                  <h2 className="text-base font-semibold text-neutral-900 tracking-tight hover:text-neutral-700">
                    {log.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 self-start sm:self-auto">
                  <span>{log.category}</span>
                  <span>&bull;</span>
                  <span>{log.date}</span>
                </div>
              </div>

              {/* Expanded content area */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 space-y-6 border-t border-neutral-100 border-dashed animate-fade-in text-neutral-700">
                  <p className="text-sm leading-relaxed font-light">
                    {log.content}
                  </p>

                  {/* Code snippet block if exists */}
                  {log.codeSnippet && (
                    <div className="relative font-mono text-xs rounded-lg border border-neutral-200 bg-neutral-50 p-4 overflow-x-auto no-scrollbar">
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 text-[10px] text-neutral-400 select-none">
                        <Sparkles className="w-3 h-3" />
                        <span>{log.codeLanguage?.toUpperCase()}</span>
                      </div>
                      <pre className="text-neutral-800 leading-relaxed">
                        <code>{log.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
