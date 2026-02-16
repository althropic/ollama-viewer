/**
 * Ollama API Types
 * Based on OpenAI-compatible API format
 */

export interface OllamaModel {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
}

export interface OllamaModelsResponse {
  object: "list";
  data: OllamaModel[];
}

export interface ApiError {
  message: string;
  status?: number;
}
