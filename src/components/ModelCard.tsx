"use client";

import { OllamaModel } from "@/lib/types";
import { getSizeInfo } from "@/lib/size";

interface ModelCardProps {
  model: OllamaModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const sizeInfo = getSizeInfo(model.id);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      </div>
    </div>
  );
}
