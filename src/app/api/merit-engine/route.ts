import { NextRequest, NextResponse } from "next/server";
import { computeCompositeMerit } from "@/lib/merit-calculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      academicScore = 78.5,
      univRanking = 12,
      annualIncome = 240000,
      schemeCode = "NFST",
      tribalGroup = "Santhal",
      weights = {
        academicWeight: 0.4,
        universityWeight: 0.4,
        socioEconomicWeight: 0.2,
      },
    } = body;

    const result = computeCompositeMerit(
      academicScore,
      univRanking,
      annualIncome,
      schemeCode,
      tribalGroup,
      weights
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to compute merit score" },
      { status: 500 }
    );
  }
}
