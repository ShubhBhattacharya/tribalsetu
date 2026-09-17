import { NextRequest, NextResponse } from "next/server";
import { INITIAL_SCHEMES } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");

  let filtered = [...INITIAL_SCHEMES];

  if (code) {
    filtered = filtered.filter((s) => s.code.toLowerCase() === code.toLowerCase());
  }

  if (type) {
    filtered = filtered.filter((s) => s.type.toLowerCase() === type.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}
