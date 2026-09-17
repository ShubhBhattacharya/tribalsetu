import { NextRequest, NextResponse } from "next/server";
import { simulateOCRExtraction } from "@/lib/ocr-simulator";
import { DocumentType } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      docType = "INCOME_CERTIFICATE",
      fileName = "document.pdf",
      candidateName = "Birsa Munda",
      annualIncome = 240000,
      tribalGroup = "Santhal",
      academicScore = 78.5,
      univName = "JNU New Delhi",
      univRanking = 12,
      rules = {
        maxAnnualIncome: 800000,
        minAcademicScore: 55,
        maxQsRanking: 500,
        maxDocValidityMonths: 12,
      },
    } = body;

    const result = simulateOCRExtraction(
      docType as DocumentType,
      fileName,
      { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
      rules
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute OCR verification" },
      { status: 500 }
    );
  }
}
