"use client";

import { useState, useMemo } from "react";
import { useModels } from "@/hooks/useModels";
import { useFireworksModels } from "@/hooks/useFireworksModels";
import { getSizeInfo, SizeCategory } from "@/lib/size";
import { Provider } from "@/lib/types";
import { ModelCard } from "./ModelCard";
import { SearchBar } from "./SearchBar";

const sizeFilters: { category: SizeCategory | "all"; label: string; color: string }[] = [
  { category: "all", label: "All", color: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" },
  { category: "small", label: "Small", color: "bg-green-900/30 text-green-400 border-green-800 hover:bg-green-900/50" },
  { category: "medium", label: "Medium", color: "bg-blue-900/30 text-blue-400 border-blue-800 hover:bg-blue-900/50" },
  { category: "large", label: "Large", color: "bg-amber-900/30 text-amber-400 border-amber-800 hover:bg-amber-900/50" },
  { category: "heavy", label: "Heavy", color: "bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/50" },
];

interface ModelListProps {
  provider: Provider;
}

export function ModelList({ provider }: ModelListProps) {
  const ollama = useModels();
  const fireworks = useFireworksModels();

  const { models, isLoading, error, refetch } = provider === "fireworks" ? fireworks : ollama;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState<SizeCategory | "all">("all");

  const sortedAndFilteredModels = useMemo(() => {
    // Sort by created date (newest first)
    let result = [...models].sort((a, b) => b.created - a.created);
    
    // Filter by size category
    if (selectedSize !== "all") {
      result = result.filter((model) => getSizeInfo(model.id).category === selectedSize);
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((model) =>
        model.id.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [models, searchQuery, selectedSize]);

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
          {provider === "fireworks"
            ? "Make sure the Fireworks API proxy is running at localhost:5050."
            : "Make sure Ollama is running and has models installed."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search models (e.g., Qwen, Gemma, Llama)..."
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {sizeFilters.map((filter) => (
            <button
              key={filter.category}
              onClick={() => setSelectedSize(filter.category)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                selectedSize === filter.category
                  ? filter.color + " ring-1 ring-white/20"
                  : "bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {sortedAndFilteredModels.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h3 className="text-lg font-medium text-zinc-300">No matching models</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Try a different search term or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedAndFilteredModels.map((model) => (
            <ModelCard key={model.id} model={model} provider={provider} />
          ))}
        </div>
      )}

      <div className="text-center text-sm text-zinc-500">
        Showing {sortedAndFilteredModels.length} of {models.length} models
      </div>
    </div>
  );
}
