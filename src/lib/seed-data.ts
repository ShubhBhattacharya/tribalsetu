import { simulateOCRExtraction } from "./ocr-simulator";
import { computeCompositeMerit } from "./merit-calculator";

export const INITIAL_RULES = [
  {
    id: "rule-1",
    ruleKey: "MAX_ANNUAL_INCOME",
    title: "Maximum Annual Family Income Ceiling",
    description: "Applicants with gross family income above this limit are ineligible for fellowship/scholarship grants.",
    schemeCode: "ALL",
    value: "800000",
    unit: "INR",
    isEditable: true,
  },
  {
    id: "rule-2",
    ruleKey: "MIN_ACADEMIC_CUTOFF_NFST",
    title: "Minimum Qualifying Academic Cutoff (NFST)",
    description: "Minimum percentage/grade in Post-Graduation qualifying degree for domestic PhD/M.Phil.",
    schemeCode: "NFST",
    value: "55",
    unit: "%",
    isEditable: true,
  },
  {
    id: "rule-3",
    ruleKey: "MIN_ACADEMIC_CUTOFF_NOS",
    title: "Minimum Qualifying Academic Cutoff (NOS)",
    description: "Minimum percentage/grade in Bachelor/Master degree for overseas studies.",
    schemeCode: "NOS",
    value: "60",
    unit: "%",
    isEditable: true,
  },
  {
    id: "rule-4",
    ruleKey: "MAX_QS_RANKING_NOS",
    title: "QS World University Ranking Threshold (NOS)",
    description: "Foreign universities must be ranked within this ceiling in current QS World University rankings.",
    schemeCode: "NOS",
    value: "500",
    unit: "Rank",
    isEditable: true,
  },
  {
    id: "rule-5",
    ruleKey: "DOC_VALIDITY_MONTHS",
    title: "Income Certificate Validity Period",
    description: "Income certificates older than this threshold from the application date are automatically flagged.",
    schemeCode: "ALL",
    value: "12",
    unit: "Months",
    isEditable: true,
  },
];

export const INITIAL_SCHEMES = [
  {
    id: "sch_nfst",
    code: "NFST",
    title: "National Fellowship for Higher Education of ST Students (NFST)",
    description: "Fellowships for Scheduled Tribe candidates to pursue M.Phil & Ph.D. degrees in Sciences, Humanities, and Engineering across premier Indian universities and institutes.",
    type: "DOMESTIC_FELLOWSHIP",
    eligibilityRules: JSON.stringify({
      maxAnnualIncome: 800000,
      minAcademicScore: 55,
      maxDocValidityMonths: 12,
      eligibleDegrees: ["M.Phil", "Ph.D."],
    }),
    deadline: new Date("2026-11-30T23:59:59Z"),
    budget: 650000000, // ?65 Crores
    totalSlots: 750,
    stipendDetails: "?38,800/month JRF + ?10,000 - ?20,500/year contingency + HRA as applicable",
    isActive: true,
  },
  {
    id: "sch_nos",
    code: "NOS",
    title: "National Overseas Scholarship for ST Candidates (NOS)",
    description: "Financial assistance to meritorious ST students for pursuing Master's level courses, Ph.D., and Post-Doctoral research abroad in QS top 500 institutions.",
    type: "OVERSEAS_SCHOLARSHIP",
    eligibilityRules: JSON.stringify({
      maxAnnualIncome: 800000,
      minAcademicScore: 60,
      maxQsRanking: 500,
      maxDocValidityMonths: 12,
      eligibleDegrees: ["Master's Degree", "Ph.D.", "Post Doctoral"],
    }),
    deadline: new Date("2026-10-31T23:59:59Z"),
    budget: 450000000, // ?45 Crores
    totalSlots: 100,
    stipendDetails: "100% Tuition Fees + £9,900 / $15,400 per annum living stipend + airfare & visa fees",
    isActive: true,
  },
];
