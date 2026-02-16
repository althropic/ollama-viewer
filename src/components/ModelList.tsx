"use client";

import { useModels } from "@/hooks/useModels";
import { ModelCard } from "./ModelCard";

export function ModelList() {
  const { models, isLoading, error, refetch } = useModels();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-900/20 p-6 text-center">
        <h3 className="text-lg font-medium text-red-200">
          Failed to load models
        </h3>
        <p className="mt-2 text-sm text-red-400">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Retry
        </button>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <h3 className="text-lg font-medium text-zinc-300">No models found</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Make sure Ollama is running and has models installed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
