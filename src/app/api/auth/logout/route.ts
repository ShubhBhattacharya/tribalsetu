import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Session terminated. Cryptographic credentials cleared from gateway.",
  });

  // Clear session cookies
  response.cookies.delete("tribalsetu_token");
  response.cookies.delete("tribalsetu_user_key");

  return response;
}
