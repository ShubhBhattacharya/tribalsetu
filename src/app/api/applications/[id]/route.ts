import { NextRequest, NextResponse } from "next/server";

const APPLICATION_STORE: { [key: string]: any } = {
  "app-1": {
    id: "app-1",
    applicationNo: "NFST-2026-0842",
    userId: "usr_student_birsa",
    user: {
      id: "usr_student_birsa",
      name: "Birsa Munda",
      email: "birsa.munda@scholar.in",
      role: "STUDENT",
      tribalGroup: "Santhal",
      state: "Jharkhand",
      annualIncome: 240000,
    },
    schemeId: "sch_nfst",
    schemeCode: "NFST",
    status: "DEFICIENT",
    currentStage: "Scrutiny",
    academicScore: 78.5,
    univRanking: 12,
    univName: "Jawaharlal Nehru University, New Delhi",
    degreeProgram: "Ph.D. in Environmental Anthropology",
    annualIncome: 240000,
    tribalGroup: "Santhal",
    state: "Jharkhand",
    meritScore: 82.4,
    flags: ["EXPIRED_DOCUMENT"],
    officerRemarks: "Income certificate older than 1 year - Re-upload valid PDF for current Financial Year 2026-27.",
    documents: [
      {
        id: "doc-1",
        docType: "INCOME_CERTIFICATE",
        fileName: "Income_Certificate_Birsa_Munda.pdf",
        verificationStatus: "FLAGGED",
        confidenceScore: 94.2,
        issueDate: "2024-03-12",
        flags: ["EXPIRED_DOCUMENT"],
      },
      {
        id: "doc-2",
        docType: "CASTE_CERTIFICATE",
        fileName: "ST_Caste_Certificate_Santhal.pdf",
        verificationStatus: "VALID",
        confidenceScore: 99.1,
        issueDate: "2022-08-15",
        flags: [],
      },
      {
        id: "doc-3",
        docType: "MARKSHEET",
        fileName: "PostGrad_Final_Marksheet.pdf",
        verificationStatus: "VALID",
        confidenceScore: 98.4,
        score: 78.5,
        flags: [],
      }
    ],
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
  },
  "app-2": {
    id: "app-2",
    applicationNo: "NOS-2026-0118",
    userId: "usr_student_shanti",
    user: {
      id: "usr_student_shanti",
      name: "Shanti Oraon",
      email: "shanti.oraon@scholar.in",
      role: "STUDENT",
      tribalGroup: "Oraon",
      state: "Odisha",
      annualIncome: 180000,
    },
    schemeId: "sch_nos",
    schemeCode: "NOS",
    status: "VERIFIED",
    currentStage: "Scrutiny",
    academicScore: 86.5,
    univRanking: 4,
    univName: "University of Oxford",
    degreeProgram: "DPhil in Anthropology",
    annualIncome: 180000,
    tribalGroup: "Oraon",
    state: "Odisha",
    meritScore: 92.4,
    flags: [],
    officerRemarks: "All documents verified and cross-matched with state ST repository.",
    documents: [
      {
        id: "doc-4",
        docType: "OFFER_LETTER",
        fileName: "Oxford_Unconditional_Offer.pdf",
        verificationStatus: "VALID",
        confidenceScore: 99.5,
      },
      {
        id: "doc-5",
        docType: "CASTE_CERTIFICATE",
        fileName: "Oraon_ST_Certificate.pdf",
        verificationStatus: "VALID",
        confidenceScore: 98.7,
      }
    ],
    createdAt: "2026-05-18T09:00:00Z",
    updatedAt: "2026-09-17T12:00:00Z",
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const application = APPLICATION_STORE[id] || {
    id,
    applicationNo: `APP-${id}`,
    status: "VERIFIED",
    currentStage: "Scrutiny",
    academicScore: 80.0,
    univRanking: 15,
    univName: "Central University",
    annualIncome: 250000,
    tribalGroup: "Tribal Scholar",
    state: "India",
    flags: [],
  };

  return NextResponse.json({
    success: true,
    data: application,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const existing = APPLICATION_STORE[id] || { id, applicationNo: `APP-${id}` };

    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    APPLICATION_STORE[id] = updated;

    return NextResponse.json({
      success: true,
      message: `Application ${id} updated successfully.`,
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
