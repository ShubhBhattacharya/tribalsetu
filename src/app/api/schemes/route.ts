import { NextResponse } from "next/server";
import { INITIAL_SCHEMES } from "@/lib/seed-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_SCHEMES,
  });
}
