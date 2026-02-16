import { describe, it, expect } from "vitest";
import { extractSize, categorizeSize, getSizeInfo } from "./size";

describe("extractSize", () => {
  it("should extract size from colon format", () => {
    expect(extractSize("qwen3-coder:7b")).toBe(7);
    expect(extractSize("llama3:70b")).toBe(70);
    expect(extractSize("gemma:2b")).toBe(2);
  });

  it("should extract size from dash format", () => {
    expect(extractSize("model-7b-v1")).toBe(7);
    expect(extractSize("deepseek-67b")).toBe(67);
  });

  it("should extract size from underscore format", () => {
    expect(extractSize("model_13b_v1")).toBe(13);
  });

  it("should handle uppercase B", () => {
    expect(extractSize("model:7B")).toBe(7);
    expect(extractSize("model-13B")).toBe(13);
  });

  it("should return undefined when no size found", () => {
    expect(extractSize("unknown-model")).toBeUndefined();
    expect(extractSize("test")).toBeUndefined();
  });

  it("should handle decimal sizes", () => {
    expect(extractSize("model:7.5b")).toBe(7);
  });
});

describe("categorizeSize", () => {
  it("should categorize small models", () => {
    expect(categorizeSize(1)).toBe("small");
    expect(categorizeSize(3)).toBe("small");
    expect(categorizeSize(6)).toBe("small");
  });

  it("should categorize medium models", () => {
    expect(categorizeSize(7)).toBe("medium");
    expect(categorizeSize(8)).toBe("medium");
    expect(categorizeSize(13)).toBe("medium");
  });

  it("should categorize large models", () => {
    expect(categorizeSize(14)).toBe("large");
    expect(categorizeSize(34)).toBe("large");
    expect(categorizeSize(70)).toBe("large");
  });

  it("should categorize heavy models", () => {
    expect(categorizeSize(71)).toBe("heavy");
    expect(categorizeSize(100)).toBe("heavy");
    expect(categorizeSize(405)).toBe("heavy");
  });
});

describe("getSizeInfo", () => {
  it("should return info for small models", () => {
    const info = getSizeInfo("gemma:2b");
    expect(info.category).toBe("small");
    expect(info.label).toBe("2B");
    expect(info.sizeInBillions).toBe(2);
    expect(info.color).toContain("green");
  });

  it("should return info for medium models", () => {
    const info = getSizeInfo("qwen3-coder:7b");
    expect(info.category).toBe("medium");
    expect(info.label).toBe("7B");
    expect(info.sizeInBillions).toBe(7);
    expect(info.color).toContain("blue");
  });

  it("should return info for large models", () => {
    const info = getSizeInfo("llama3:70b");
    expect(info.category).toBe("large");
    expect(info.label).toBe("70B");
    expect(info.sizeInBillions).toBe(70);
    expect(info.color).toContain("amber");
  });

  it("should return info for heavy models", () => {
    const info = getSizeInfo("deepseek:100b");
    expect(info.category).toBe("heavy");
    expect(info.label).toBe("100B Heavy");
    expect(info.sizeInBillions).toBe(100);
    expect(info.color).toContain("red");
  });

  it("should return unknown for models without size", () => {
    const info = getSizeInfo("unknown-model");
    expect(info.category).toBe("unknown");
    expect(info.label).toBe("Unknown");
    expect(info.sizeInBillions).toBeUndefined();
  });
});
