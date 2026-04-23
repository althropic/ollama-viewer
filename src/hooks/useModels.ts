import useSWR from "swr";
import { fetchModels } from "@/lib/api";
import { ModelsResponse, ApiError } from "@/lib/types";

const MODELS_KEY = "/api/models";

/**
 * SWR hook for fetching Ollama models
 * Auto-refreshes every 30 seconds
 */
export function useModels() {
  const { data, error, isLoading, mutate } = useSWR<
    ModelsResponse,
    ApiError
  >(MODELS_KEY, fetchModels, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
  });

  return {
    models: data?.data ?? [],
    isLoading,
    error,
    refetch: mutate,
  };
}
