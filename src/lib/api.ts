import { ModelsResponse, ApiError } from "./types";

/**
 * Fetch models from Ollama API via local proxy
 * Uses Next.js API route to avoid CORS issues
 */
export async function fetchModels(): Promise<ModelsResponse> {
  const response = await fetch("/api/models", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errorData.error || `Failed to fetch models: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  const data = await response.json();
  return data as ModelsResponse;
}

/**
 * Check if Ollama API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/models", {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch models from Fireworks API via local proxy
 * Uses Next.js API route to avoid CORS issues
 */
export async function fetchFireworksModels(): Promise<ModelsResponse> {
  const response = await fetch("/api/fireworks/models", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errorData.error || `Failed to fetch Fireworks models: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  const data = await response.json();
  return data as ModelsResponse;
}

/**
 * Check if Fireworks API is available
 */
export async function checkFireworksApiHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/fireworks/models", {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch models from NVIDIA API via local proxy
 * Uses Next.js API route to avoid CORS issues
 */
export async function fetchNvidiaModels(): Promise<ModelsResponse> {
  const response = await fetch("/api/nvidia/models", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errorData.error || `Failed to fetch NVIDIA models: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  const data = await response.json();
  return data as ModelsResponse;
}

/**
 * Check if NVIDIA API is available
 */
export async function checkNvidiaApiHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/nvidia/models", {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
