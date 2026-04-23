"use client";

import { Model, Provider } from "@/lib/types";
import { getSizeInfo } from "@/lib/size";

interface ModelCardProps {
  model: Model;
  provider?: Provider;
}

const providerAccent: Record<Provider, { border: string; badge: string }> = {
  ollama: {
    border: "hover:border-indigo-600/50",
    badge: "bg-indigo-900/30 text-indigo-400 border-indigo-800",
  },
  fireworks: {
    border: "hover:border-orange-600/50",
    badge: "bg-orange-900/30 text-orange-400 border-orange-800",
  },
};

export function ModelCard({ model, provider = "ollama" }: ModelCardProps) {
  const sizeInfo = getSizeInfo(model.id);
  const accent = providerAccent[provider];
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-800/50 ${accent.border}`}>
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
        {provider === "fireworks" && (
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${accent.badge}`}>
            Fireworks
          </span>
        )}
      </div>
    </div>
  );
}
