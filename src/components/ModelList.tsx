"use client";

import { useState, useMemo } from "react";
import { useModels } from "@/hooks/useModels";
import { ModelCard } from "./ModelCard";
import { SearchBar } from "./SearchBar";

export function ModelList() {
  const { models, isLoading, error, refetch } = useModels();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return models;
    
    const query = searchQuery.toLowerCase();
    return models.filter((model) =>
      model.id.toLowerCase().includes(query)
    );
  }, [models, searchQuery]);

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
    <div className="space-y-6">
      <div className="max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search models (e.g., Qwen, Gemma, Llama)..."
        />
      </div>

      {filteredModels.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h3 className="text-lg font-medium text-zinc-300">No matching models</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}

      <div className="text-center text-sm text-zinc-500">
        Showing {filteredModels.length} of {models.length} models
      </div>
    </div>
  );
}
