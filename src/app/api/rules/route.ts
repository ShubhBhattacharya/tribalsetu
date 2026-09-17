import { NextRequest, NextResponse } from "next/server";
import { INITIAL_RULES } from "@/lib/seed-data";

let rulesStore = [...INITIAL_RULES];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: rulesStore,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const updates = await req.json();
    rulesStore = rulesStore.map((r) => {
      const match = updates.find((u: any) => u.ruleKey === r.ruleKey);
      return match ? { ...r, value: match.value, updatedAt: new Date().toISOString() } : r;
    });

    return NextResponse.json({
      success: true,
      message: "Rules successfully updated",
      data: rulesStore,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
