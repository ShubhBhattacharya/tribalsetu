import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("tribalsetu_token")?.value || req.headers.get("x-auth-token");
    const userKey = req.cookies.get("tribalsetu_user_key")?.value || req.headers.get("x-user-key");

    if (!token || !userKey || !MOCK_USERS[userKey]) {
      return NextResponse.json(
        { authenticated: false, message: "No active session found" },
        { status: 401 }
      );
    }

    const user = MOCK_USERS[userKey];

    return NextResponse.json({
      authenticated: true,
      user,
      token,
      securityTier: "ENTERPRISE_GOV_GRADE",
      clearanceLevel: "LEVEL_4_RESTRICTED",
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}
