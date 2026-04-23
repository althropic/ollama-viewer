import { NextResponse } from "next/server";

const FIREWORKS_API_URL = "http://localhost:5050";

/**
 * Proxy endpoint to fetch models from Fireworks API
 * Uses local proxy at localhost:5050 to avoid CORS issues
 */
export async function GET() {
  try {
    const response = await fetch(`${FIREWORKS_API_URL}/fireworks/v1/models`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch Fireworks models: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to Fireworks API" },
      { status: 500 }
    );
  }
}