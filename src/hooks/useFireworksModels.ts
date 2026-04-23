import useSWR from "swr";
import { fetchFireworksModels } from "@/lib/api";
import { ModelsResponse, ApiError } from "@/lib/types";

const FIREWORKS_MODELS_KEY = "/api/fireworks/models";

/**
 * SWR hook for fetching Fireworks models
 * Auto-refreshes every 30 seconds
 */
export function useFireworksModels() {
  const { data, error, isLoading, mutate } = useSWR<
    ModelsResponse,
    ApiError
  >(FIREWORKS_MODELS_KEY, fetchFireworksModels, {
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