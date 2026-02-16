"use client";

import { useModels } from "@/hooks/useModels";
import { getSizeInfo } from "@/lib/size";

export function Header() {
  const { models, isLoading, error } = useModels();

  const stats = {
    total: models.length,
    small: models.filter(m => getSizeInfo(m.id).category === "small").length,
    medium: models.filter(m => getSizeInfo(m.id).category === "medium").length,
    large: models.filter(m => getSizeInfo(m.id).category === "large").length,
    heavy: models.filter(m => getSizeInfo(m.id).category === "heavy").length,
  };

  const isConnected = !isLoading && !error;

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Ollama Dashboard</h1>
                <p className="text-sm text-zinc-400">
                  Manage and visualize your local AI models
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1.5">
              <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-xs font-medium text-zinc-400">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {!isLoading && !error && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatCard label="Total Models" value={stats.total} color="white" />
            <StatCard label="Small" value={stats.small} color="green" />
            <StatCard label="Medium" value={stats.medium} color="blue" />
            <StatCard label="Large" value={stats.large} color="amber" />
            <StatCard label="Heavy" value={stats.heavy} color="red" />
          </div>
        )}
      </div>
    </header>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: "white" | "green" | "blue" | "amber" | "red";
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    white: "bg-zinc-800 text-white",
    green: "bg-green-900/30 text-green-400 border-green-800",
    blue: "bg-blue-900/30 text-blue-400 border-blue-800",
    amber: "bg-amber-900/30 text-amber-400 border-amber-800",
    red: "bg-red-900/30 text-red-400 border-red-800",
  };

  return (
    <div className={`rounded-lg border px-3 py-2 ${colorClasses[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
}
