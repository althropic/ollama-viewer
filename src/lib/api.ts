import { OllamaModelsResponse, ApiError } from "./types";

const OLLAMA_API_URL = "https://ollama.com";

/**
 * Fetch models from Ollama API
 * Uses OpenAI-compatible /v1/models endpoint
 */
export async function fetchModels(): Promise<OllamaModelsResponse> {
  const response = await fetch(`${OLLAMA_API_URL}/v1/models`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: ApiError = {
      message: `Failed to fetch models: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  const data = await response.json();
  return data as OllamaModelsResponse;
}

/**
 * Check if Ollama API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/v1/models`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
