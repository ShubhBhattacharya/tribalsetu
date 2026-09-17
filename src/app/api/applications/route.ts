import { NextRequest, NextResponse } from "next/server";

const MOCK_DB_APPLICATIONS = [
  {
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
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
  },
  {
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
    createdAt: "2026-05-18T09:00:00Z",
    updatedAt: "2026-09-17T12:00:00Z",
  },
  {
    id: "app-3",
    applicationNo: "NFST-2026-0419",
    userId: "usr_student_arjun",
    user: {
      id: "usr_student_arjun",
      name: "Arjun Gond",
      email: "arjun.gond@scholar.in",
      role: "STUDENT",
      tribalGroup: "Gond",
      state: "Madhya Pradesh",
      annualIncome: 320000,
    },
    schemeId: "sch_nfst",
    schemeCode: "NFST",
    status: "SANCTIONED",
    currentStage: "Sanctioned",
    academicScore: 81.2,
    univRanking: 2,
    univName: "IIT Delhi",
    degreeProgram: "Ph.D. in Renewable Energy",
    annualIncome: 320000,
    tribalGroup: "Gond",
    state: "Madhya Pradesh",
    meritScore: 88.48,
    flags: [],
    createdAt: "2026-04-10T08:00:00Z",
    updatedAt: "2026-09-15T14:30:00Z",
  },
  {
    id: "app-4",
    applicationNo: "NOS-2026-0095",
    userId: "usr_student_rani",
    user: {
      id: "usr_student_rani",
      name: "Rani Khasi",
      email: "rani.khasi@scholar.in",
      role: "STUDENT",
      tribalGroup: "Khasi",
      state: "Meghalaya",
      annualIncome: 450000,
    },
    schemeId: "sch_nos",
    schemeCode: "NOS",
    status: "SUBMITTED",
    currentStage: "OCR Verified",
    academicScore: 79.0,
    univRanking: 6,
    univName: "Imperial College London",
    degreeProgram: "MSc in Environmental Engineering",
    annualIncome: 450000,
    tribalGroup: "Khasi",
    state: "Meghalaya",
    meritScore: 85.2,
    flags: [],
    createdAt: "2026-06-01T11:00:00Z",
    updatedAt: "2026-09-16T16:00:00Z",
  },
  {
    id: "app-5",
    applicationNo: "NFST-2026-0921",
    userId: "usr_student_kartik",
    user: {
      id: "usr_student_kartik",
      name: "Kartik Bhil",
      email: "kartik.bhil@scholar.in",
      role: "STUDENT",
      tribalGroup: "Bhil",
      state: "Rajasthan",
      annualIncome: 210000,
    },
    schemeId: "sch_nfst",
    schemeCode: "NFST",
    status: "APPROVED",
    currentStage: "Selection",
    academicScore: 74.0,
    univRanking: 5,
    univName: "Banaras Hindu University (BHU)",
    degreeProgram: "Ph.D. in Botany",
    annualIncome: 210000,
    tribalGroup: "Bhil",
    state: "Rajasthan",
    meritScore: 81.1,
    flags: [],
    createdAt: "2026-05-20T14:10:00Z",
    updatedAt: "2026-09-14T09:45:00Z",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const scheme = searchParams.get("scheme");
  const status = searchParams.get("status");

  let filtered = [...MOCK_DB_APPLICATIONS];
  if (scheme && scheme !== "ALL") {
    filtered = filtered.filter((a) => a.schemeCode === scheme);
  }
  if (status && status !== "ALL") {
    filtered = filtered.filter((a) => a.status === status);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newApp = {
      id: `app-${Date.now()}`,
      applicationNo: `${body.schemeCode || "NFST"}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: body.userId || "usr_student_birsa",
      user: {
        id: body.userId || "usr_student_birsa",
        name: body.name || "Student Scholar",
        email: body.email || "scholar@scholar.in",
        role: "STUDENT",
        tribalGroup: body.tribalGroup || "Santhal",
        state: body.state || "Jharkhand",
        annualIncome: body.annualIncome || 240000,
      },
      schemeId: body.schemeCode === "NOS" ? "sch_nos" : "sch_nfst",
      schemeCode: body.schemeCode || "NFST",
      status: "SUBMITTED",
      currentStage: "OCR Verified",
      academicScore: body.academicScore || 75.0,
      univRanking: body.univRanking || 10,
      univName: body.univName || "Central University",
      degreeProgram: body.degreeProgram || "Ph.D.",
      annualIncome: body.annualIncome || 240000,
      tribalGroup: body.tribalGroup || "Santhal",
      state: body.state || "Jharkhand",
      meritScore: 80.0,
      flags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_DB_APPLICATIONS.unshift(newApp);

    return NextResponse.json({
      success: true,
      message: "Application registered successfully",
      data: newApp,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
