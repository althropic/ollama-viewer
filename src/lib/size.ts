/**
 * Size categorization for Ollama models
 * Extracts size from model names (e.g., "qwen3-coder:7b" -> 7)
 */

export type SizeCategory = "small" | "medium" | "large" | "heavy" | "unknown";

export interface SizeInfo {
  category: SizeCategory;
  label: string;
  color: string;
  sizeInBillions?: number;
}

/**
 * Extract size in billions from model name
 * Handles formats like: "7b", "13b", "70b", "qwen3-coder:7b"
 */
export function extractSize(modelName: string): number | undefined {
  // Match patterns like "7b", "13b", "70b", "8B" in the model name
  // Use (?![a-zA-Z0-9]) instead of \b to treat underscores as separators
  const match = modelName.match(/:(\d+)(?:\.\d+)?[bB](?![a-zA-Z0-9])/);
  if (match) {
    return parseInt(match[1], 10);
  }
  
  // Also check for patterns like "-7b-" or "_7b_" in the name
  const altMatch = modelName.match(/[-_](\d+)(?:\.\d+)?[bB](?![a-zA-Z0-9])/);
  if (altMatch) {
    return parseInt(altMatch[1], 10);
  }
  
  return undefined;
}

/**
 * Categorize model size
 * - small: < 7B
 * - medium: 7B - 13B
 * - large: 14B - 70B
 * - heavy: > 70B
 */
export function categorizeSize(sizeInBillions: number): SizeCategory {
  if (sizeInBillions < 7) return "small";
  if (sizeInBillions <= 13) return "medium";
  if (sizeInBillions <= 70) return "large";
  return "heavy";
}

/**
 * Get size info for a model
 */
export function getSizeInfo(modelName: string): SizeInfo {
  const size = extractSize(modelName);
  
  if (size === undefined) {
    return {
      category: "unknown",
      label: "Unknown",
      color: "bg-zinc-700 text-zinc-300",
    };
  }
  
  const category = categorizeSize(size);
  
  const categoryConfig: Record<SizeCategory, { label: string; color: string }> = {
    small: { label: `${size}B`, color: "bg-green-900/50 text-green-300 border-green-700" },
    medium: { label: `${size}B`, color: "bg-blue-900/50 text-blue-300 border-blue-700" },
    large: { label: `${size}B`, color: "bg-amber-900/50 text-amber-300 border-amber-700" },
    heavy: { label: `${size}B Heavy`, color: "bg-red-900/50 text-red-300 border-red-700" },
    unknown: { label: "Unknown", color: "bg-zinc-700 text-zinc-300" },
  };
  
  const config = categoryConfig[category];
  
  return {
    category,
    label: config.label,
    color: config.color,
    sizeInBillions: size,
  };
}
