import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: `Deficiency for application ${id} resolved successfully. Scrutiny status resumed.`,
      resolvedAt: new Date().toISOString(),
      updatedStatus: "VERIFIED",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
