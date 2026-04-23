/**
 * Provider-agnostic model types
 * Based on OpenAI-compatible API format
 */

export type Provider = "ollama" | "fireworks";

export interface Model {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
}

export interface ModelsResponse {
  object: "list";
  data: Model[];
}

export interface ApiError {
  message: string;
  status?: number;
}

// Legacy aliases for backward compatibility
export type OllamaModel = Model;
export type OllamaModelsResponse = ModelsResponse;
