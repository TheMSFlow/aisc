import { NextResponse } from "next/server";
import { INTELLIGENCE_API_BASE } from "@/lib/sites";

const API_BASE = INTELLIGENCE_API_BASE;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = encodeURIComponent(searchParams.get("challenge_slug") ?? "aisc");

  if (!API_BASE) {
    return NextResponse.json(
      { ok: false, open: null, active: null },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/public/challenge/cohorts?challenge_slug=${slug}`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, open: null, active: null },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { ok: false, open: null, active: null },
      { status: 503 },
    );
  }
}
