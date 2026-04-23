"use client";

import { Provider } from "@/lib/types";

interface ProviderTabsProps {
  activeProvider: Provider;
  onProviderChange: (provider: Provider) => void;
}

const providers: { id: Provider; label: string; description: string; icon: string }[] = [
  {
    id: "ollama",
    label: "Ollama",
    description: "Local models",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    id: "fireworks",
    label: "Fireworks",
    description: "Cloud models",
    icon: "M5 3l14 9-14 9V3z",
  },
];

export function ProviderTabs({ activeProvider, onProviderChange }: ProviderTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-zinc-900/50 p-1 border border-zinc-800">
      {providers.map((provider) => {
        const isActive = activeProvider === provider.id;
        return (
          <button
            key={provider.id}
            onClick={() => onProviderChange(provider.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-zinc-800 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
            }`}
          >
            <svg
              className={`h-4 w-4 ${isActive ? "text-white" : "text-zinc-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={provider.icon}
              />
            </svg>
            <span>{provider.label}</span>
          </button>
        );
      })}
    </div>
  );
}