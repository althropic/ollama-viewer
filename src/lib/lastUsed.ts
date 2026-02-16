/**
 * Last used tracking utility
 * Stores and retrieves model usage timestamps in localStorage
 */

const STORAGE_KEY = "ollama-dashboard:last-used";

export interface LastUsedRecord {
  modelId: string;
  timestamp: number;
}

/**
 * Get all last used records from localStorage
 */
export function getLastUsedRecords(): Record<string, number> {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

/**
 * Mark a model as used now
 */
export function markModelAsUsed(modelId: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const records = getLastUsedRecords();
    records[modelId] = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Get the last used timestamp for a model
 */
export function getLastUsed(modelId: string): number | undefined {
  const records = getLastUsedRecords();
  return records[modelId];
}

/**
 * Format last used timestamp for display
 */
export function formatLastUsed(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Sort models by last used (most recent first)
 * Models without last used data go to the end
 */
export function sortByLastUsed<T extends { id: string }>(
  items: T[]
): T[] {
  const records = getLastUsedRecords();
  
  return [...items].sort((a, b) => {
    const aTime = records[a.id] || 0;
    const bTime = records[b.id] || 0;
    return bTime - aTime;
  });
}
