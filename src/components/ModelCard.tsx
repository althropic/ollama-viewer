"use client";

import { OllamaModel } from "@/lib/types";
import { getSizeInfo } from "@/lib/size";
import { getLastUsed, formatLastUsed, markModelAsUsed } from "@/lib/lastUsed";

interface ModelCardProps {
  model: OllamaModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const sizeInfo = getSizeInfo(model.id);
  const lastUsed = getLastUsed(model.id);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleChatLaunch = () => {
    markModelAsUsed(model.id);
    // Open Ollama chat in new tab
    window.open(`http://localhost:8080/chat?model=${encodeURIComponent(model.id)}`, '_blank');
  };

  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-800/50">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {model.id}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {model.owned_by}
          </p>
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${sizeInfo.color}`}>
          {sizeInfo.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
          Created: {formatDate(model.created)}
        </span>
        {lastUsed && (
          <span className="inline-flex items-center rounded-full bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            Last used: {formatLastUsed(lastUsed)}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800">
        <button
          onClick={handleChatLaunch}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Chat
        </button>
      </div>
    </div>
  );
}
