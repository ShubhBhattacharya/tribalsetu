import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TribalSetu database...");

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.deficiency.deleteMany();
  await prisma.document.deleteMany();
  await prisma.application.deleteMany();
  await prisma.scheme.deleteMany();
  await prisma.ruleConfig.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Users
  const birsa = await prisma.user.create({
    data: {
      id: "usr_student_birsa",
      name: "Birsa Munda",
      email: "birsa.munda@scholar.in",
      role: "STUDENT",
      aadhaarHash: "XXXX-XXXX-8492",
      phone: "+91 98765 43210",
      tribalGroup: "Santhal",
      state: "Jharkhand",
      district: "Ranchi",
      annualIncome: 240000,
    },
  });

  const shanti = await prisma.user.create({
    data: {
      id: "usr_student_shanti",
      name: "Shanti Oraon",
      email: "shanti.oraon@scholar.in",
      role: "STUDENT",
      aadhaarHash: "XXXX-XXXX-3129",
      phone: "+91 98123 45678",
      tribalGroup: "Oraon",
      state: "Odisha",
      district: "Mayurbhanj",
      annualIncome: 180000,
    },
  });

  const arjun = await prisma.user.create({
    data: {
      id: "usr_student_arjun",
      name: "Arjun Gond",
      email: "arjun.gond@scholar.in",
      role: "STUDENT",
      aadhaarHash: "XXXX-XXXX-7714",
      phone: "+91 97555 12345",
      tribalGroup: "Gond",
      state: "Madhya Pradesh",
      district: "Mandla",
      annualIncome: 320000,
    },
  });

  const officer = await prisma.user.create({
    data: {
      id: "usr_officer_rajesh",
      name: "Dr. Rajesh Verma",
      email: "rajesh.verma@mota.gov.in",
      role: "MOTA_OFFICER",
      phone: "+91 11 2338 4123",
      state: "New Delhi",
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: "usr_admin_sunita",
      name: "Smt. Sunita Murmu (IAS)",
      email: "sunita.murmu@mota.gov.in",
      role: "ADMIN",
      phone: "+91 11 2338 7890",
      state: "New Delhi",
    },
  });

  // 3. Seed Schemes
  const nfstScheme = await prisma.scheme.create({
    data: {
      id: "sch_nfst",
      code: "NFST",
      title: "National Fellowship for Higher Education of ST Students (NFST)",
      description: "Domestic fellowships for Scheduled Tribe scholars pursuing M.Phil. & Ph.D. degrees in Indian universities and IITs.",
      type: "DOMESTIC_FELLOWSHIP",
      eligibilityRules: JSON.stringify({
        maxAnnualIncome: 800000,
        minAcademicScore: 55,
        maxDocValidityMonths: 12,
        eligibleDegrees: ["M.Phil", "Ph.D."],
      }),
      deadline: new Date("2026-11-30T23:59:59Z"),
      budget: 650000000,
      totalSlots: 750,
      stipendDetails: "?38,800/month JRF + contingency up to ?20,500/year + HRA",
      isActive: true,
    },
  });

  const nosScheme = await prisma.scheme.create({
    data: {
      id: "sch_nos",
      code: "NOS",
      title: "National Overseas Scholarship for ST Candidates (NOS)",
      description: "Financial assistance for meritorious ST students pursuing Master's, Ph.D. and Post-Doctoral studies in top 500 QS world universities.",
      type: "OVERSEAS_SCHOLARSHIP",
      eligibilityRules: JSON.stringify({
        maxAnnualIncome: 800000,
        minAcademicScore: 60,
        maxQsRanking: 500,
        maxDocValidityMonths: 12,
        eligibleDegrees: ["Master's Degree", "Ph.D."],
      }),
      deadline: new Date("2026-10-31T23:59:59Z"),
      budget: 450000000,
      totalSlots: 100,
      stipendDetails: "100% Tuition Fees + £9,900 / $15,400 annual living stipend + airfare & visa fees",
      isActive: true,
    },
  });

  // 4. Seed Rules
  await prisma.ruleConfig.createMany({
    data: [
      {
        id: "rule-1",
        ruleKey: "MAX_ANNUAL_INCOME",
        title: "Maximum Annual Family Income Ceiling",
        description: "Gross family income above this limit is ineligible for grants.",
        schemeCode: "ALL",
        value: "800000",
        unit: "INR",
      },
      {
        id: "rule-2",
        ruleKey: "MIN_ACADEMIC_CUTOFF_NFST",
        title: "Minimum Qualifying Academic Cutoff (NFST)",
        description: "Minimum percentage in Post-Graduation qualifying degree.",
        schemeCode: "NFST",
        value: "55",
        unit: "%",
      },
      {
        id: "rule-3",
        ruleKey: "MIN_ACADEMIC_CUTOFF_NOS",
        title: "Minimum Qualifying Academic Cutoff (NOS)",
        description: "Minimum percentage for overseas studies.",
        schemeCode: "NOS",
        value: "60",
        unit: "%",
      },
      {
        id: "rule-4",
        ruleKey: "MAX_QS_RANKING_NOS",
        title: "QS World University Ranking Threshold (NOS)",
        description: "Foreign universities must be ranked within this ceiling.",
        schemeCode: "NOS",
        value: "500",
        unit: "Rank",
      },
      {
        id: "rule-5",
        ruleKey: "DOC_VALIDITY_MONTHS",
        title: "Income Certificate Validity Period",
        description: "Income certificates older than this threshold are flagged.",
        schemeCode: "ALL",
        value: "12",
        unit: "Months",
      },
    ],
  });

  // 5. Seed Applications
  // App 1: Birsa Munda - DEFICIENT
  const app1 = await prisma.application.create({
    data: {
      id: "app_birsa_1",
      applicationNo: "NFST-2026-0842",
      userId: birsa.id,
      schemeId: nfstScheme.id,
      status: "DEFICIENT",
      currentStage: "Scrutiny",
      academicScore: 78.5,
      univRanking: 12,
      univName: "Jawaharlal Nehru University, New Delhi",
      degreeProgram: "Ph.D. in Environmental Anthropology",
      researchTopic: "Indigenous Forest Conservation Practices in Chota Nagpur Plateau",
      annualIncome: 240000,
      tribalGroup: "Santhal",
      state: "Jharkhand",
      meritScore: 82.4,
      flags: JSON.stringify(["EXPIRED_DOCUMENT"]),
    },
  });

  await prisma.document.create({
    data: {
      id: "doc_birsa_inc",
      applicationId: app1.id,
      docType: "INCOME_CERTIFICATE",
      fileName: "Income_Cert_Expired_2024_Old.pdf",
      fileUrl: "#",
      verificationStatus: "FLAGGED",
      confidenceScore: 68.0,
      flags: JSON.stringify(["EXPIRED_DOCUMENT"]),
      ocrData: JSON.stringify({
        candidateName: "Birsa Munda",
        annualIncome: 240000,
        issueDate: "12/03/2024",
        issuingAuthority: "Tahasildar Ranchi",
        certificateNo: "INC/2024/00142B",
      }),
    },
  });

  await prisma.deficiency.create({
    data: {
      id: "def_birsa_1",
      applicationId: app1.id,
      docId: "doc_birsa_inc",
      reason: "Income certificate older than 1 year - Re-upload valid PDF for current Financial Year",
      details: "The submitted income certificate was issued prior to FY 2025-26. An updated certificate issued by Tahasildar is required.",
      resolved: false,
    },
  });

  // App 2: Shanti Oraon - VERIFIED
  const app2 = await prisma.application.create({
    data: {
      id: "app_shanti_2",
      applicationNo: "NOS-2026-0118",
      userId: shanti.id,
      schemeId: nosScheme.id,
      status: "VERIFIED",
      currentStage: "Scrutiny",
      academicScore: 86.5,
      univRanking: 4,
      univName: "University of Oxford",
      degreeProgram: "DPhil in Anthropology",
      researchTopic: "Indigenous Ecological Systems in Odisha Forests",
      annualIncome: 180000,
      tribalGroup: "Oraon",
      state: "Odisha",
      meritScore: 92.4,
      meritRank: 1,
    },
  });

  await prisma.document.create({
    data: {
      id: "doc_shanti_ofr",
      applicationId: app2.id,
      docType: "OFFER_LETTER",
      fileName: "Oxford_DPhil_Unconditional_Offer.pdf",
      fileUrl: "#",
      verificationStatus: "VALID",
      confidenceScore: 98.5,
      ocrData: JSON.stringify({
        candidateName: "Shanti Oraon",
        instituteName: "University of Oxford",
        qsRanking: 4,
      }),
    },
  });

  // App 3: Arjun Gond - SANCTIONED
  await prisma.application.create({
    data: {
      id: "app_arjun_3",
      applicationNo: "NFST-2026-0419",
      userId: arjun.id,
      schemeId: nfstScheme.id,
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
      meritRank: 2,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
