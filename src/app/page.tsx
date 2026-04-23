"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ModelList } from "@/components/ModelList";
import { ProviderTabs } from "@/components/ProviderTabs";
import { Provider } from "@/lib/types";

export default function Home() {
  const [provider, setProvider] = useState<Provider>("ollama");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header provider={provider} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <ProviderTabs activeProvider={provider} onProviderChange={setProvider} />
        </div>
        <ModelList provider={provider} />
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-sm text-zinc-500">
              {provider === "fireworks" ? "Fireworks" : provider === "nvidia" ? "NVIDIA" : "Ollama"} Dashboard • Built with Next.js & Tailwind CSS
            </p>
            {provider === "ollama" ? (
              <a
                href="http://localhost:8080"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Open Ollama Web UI →
              </a>
            ) : provider === "fireworks" ? (
              <a
                href="http://localhost:5050"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Open Fireworks API →
              </a>
            ) : (
              <a
                href="http://localhost:5050"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Open NVIDIA API →
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
