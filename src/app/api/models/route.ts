import { NextResponse } from "next/server";

const OLLAMA_API_URL = "https://ollama.com";

/**
 * Proxy endpoint to fetch models from Ollama API
 * This avoids CORS issues by making the request server-side
 */
export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/v1/models`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch models: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to Ollama API" },
      { status: 500 }
    );
  }
}
