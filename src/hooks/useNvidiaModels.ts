import useSWR from "swr";
import { fetchNvidiaModels } from "@/lib/api";
import { ModelsResponse, ApiError } from "@/lib/types";

const NVIDIA_MODELS_KEY = "/api/nvidia/models";

/**
 * SWR hook for fetching NVIDIA models
 * Auto-refreshes every 30 seconds
 */
export function useNvidiaModels() {
  const { data, error, isLoading, mutate } = useSWR<
    ModelsResponse,
    ApiError
  >(NVIDIA_MODELS_KEY, fetchNvidiaModels, {
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