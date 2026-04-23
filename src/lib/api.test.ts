import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchModels, checkApiHealth, fetchFireworksModels, checkFireworksApiHealth } from "./api";
import { ModelsResponse } from "./types";

describe("fetchModels", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should fetch models successfully via proxy", async () => {
    const mockResponse: ModelsResponse = {
      object: "list",
      data: [
        {
          id: "qwen3-coder",
          object: "model",
          created: 1704067200,
          owned_by: "ollama",
        },
      ],
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchModels();

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/models",
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should throw error on failed response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: () => Promise.resolve({ error: "Server error" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchModels()).rejects.toThrow("Server error");
  });

  it("should throw error on network failure", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchModels()).rejects.toThrow("Network error");
  });
});

describe("checkApiHealth", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return true when API is healthy", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkApiHealth();

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/models",
      expect.objectContaining({
        method: "GET",
        signal: expect.any(AbortSignal),
      })
    );
  });

  it("should return false when API is unhealthy", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkApiHealth();

    expect(result).toBe(false);
  });

  it("should return false on network error", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkApiHealth();

    expect(result).toBe(false);
  });
});

describe("fetchFireworksModels", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should fetch Fireworks models successfully via proxy", async () => {
    const mockResponse: ModelsResponse = {
      object: "list",
      data: [
        {
          id: "accounts/fireworks/models/llama-v3p1-8b-instruct",
          object: "model",
          created: 1704067200,
          owned_by: "fireworks",
        },
      ],
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchFireworksModels();

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/fireworks/models",
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should throw error on failed Fireworks response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: () => Promise.resolve({ error: "Fireworks server error" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchFireworksModels()).rejects.toThrow("Fireworks server error");
  });

  it("should throw error on Fireworks network failure", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchFireworksModels()).rejects.toThrow("Network error");
  });
});

describe("checkFireworksApiHealth", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return true when Fireworks API is healthy", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkFireworksApiHealth();

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/fireworks/models",
      expect.objectContaining({
        method: "GET",
        signal: expect.any(AbortSignal),
      })
    );
  });

  it("should return false when Fireworks API is unhealthy", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkFireworksApiHealth();

    expect(result).toBe(false);
  });

  it("should return false on Fireworks network error", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    const result = await checkFireworksApiHealth();

    expect(result).toBe(false);
  });
});
