import { BoundingBox, DocumentType, ExtractedOCRData } from "@/types";

export interface OCRVerificationResult {
  docType: DocumentType;
  confidenceScore: number;
  extractedData: ExtractedOCRData;
  flags: string[];
  status: "VALID" | "FLAGGED";
  summary: string;
}

export function simulateOCRExtraction(
  docType: DocumentType,
  fileName: string,
  userSubmittedData: {
    candidateName: string;
    annualIncome: number;
    tribalGroup: string;
    academicScore?: number;
    univName?: string;
    univRanking?: number;
  },
  rules: {
    maxAnnualIncome: number;
    minAcademicScore: number;
    maxQsRanking: number;
    maxDocValidityMonths: number;
  }
): OCRVerificationResult {
  const flags: string[] = [];
  let confidence = 94.5;
  const isExpiringMock = fileName.toLowerCase().includes("expired") || fileName.toLowerCase().includes("old");
  const isMismatchMock = fileName.toLowerCase().includes("mismatch") || fileName.toLowerCase().includes("diff");
  const isHighIncomeMock = fileName.toLowerCase().includes("high_income") || fileName.toLowerCase().includes("exceeded");

  let extractedData: ExtractedOCRData = {
    boundingBoxes: [],
  };

  const currentDate = new Date("2026-09-17");
  const validIssueDate = "15/04/2026";
  const oldIssueDate = "12/03/2024"; // > 2 years old

  if (docType === "INCOME_CERTIFICATE") {
    const docIncome = isHighIncomeMock 
      ? 950000 
      : (userSubmittedData.annualIncome || 240000);
    
    const issueDateStr = isExpiringMock ? oldIssueDate : validIssueDate;
    const docName = isMismatchMock 
      ? userSubmittedData.candidateName + " Kumar" 
      : userSubmittedData.candidateName;

    const boundingBoxes: BoundingBox[] = [
      {
        id: "box-inc-1",
        field: "header",
        label: "Government Header",
        x: 18,
        y: 12,
        width: 64,
        height: 8,
        extractedText: "GOVERNMENT OF INDIA - REVENUE DEPARTMENT",
        confidence: 0.98,
      },
      {
        id: "box-inc-2",
        field: "certificateNo",
        label: "Certificate No",
        x: 65,
        y: 22,
        width: 25,
        height: 5,
        extractedText: "INC/2026/89412A",
        confidence: 0.95,
      },
      {
        id: "box-inc-3",
        field: "candidateName",
        label: "Applicant Name",
        x: 28,
        y: 34,
        width: 42,
        height: 6,
        extractedText: docName,
        confidence: isMismatchMock ? 0.82 : 0.97,
      },
      {
        id: "box-inc-4",
        field: "annualIncome",
        label: "Gross Annual Income",
        x: 35,
        y: 48,
        width: 32,
        height: 7,
        extractedText: `? ${docIncome.toLocaleString("en-IN")}/- (Rupees only)`,
        confidence: 0.96,
      },
      {
        id: "box-inc-5",
        field: "issueDate",
        label: "Date of Issue",
        x: 20,
        y: 62,
        width: 22,
        height: 5,
        extractedText: issueDateStr,
        confidence: 0.94,
      },
      {
        id: "box-inc-6",
        field: "issuingAuthority",
        label: "Issuing Authority",
        x: 58,
        y: 78,
        width: 34,
        height: 10,
        extractedText: "Tahasildar & Executive Magistrate",
        confidence: 0.93,
      },
    ];

    extractedData = {
      candidateName: docName,
      annualIncome: docIncome,
      issueDate: issueDateStr,
      issuingAuthority: "Tahasildar & Executive Magistrate",
      certificateNo: "INC/2026/89412A",
      boundingBoxes,
    };

    // Rule checks
    if (docIncome > rules.maxAnnualIncome) {
      flags.push("INCOME_LIMIT_EXCEEDED");
      confidence -= 20;
    }

    if (isExpiringMock) {
      flags.push("EXPIRED_DOCUMENT");
      confidence -= 25;
    }

    if (Math.abs(docIncome - userSubmittedData.annualIncome) > 50000) {
      flags.push("INCOME_MISMATCH_WITH_FORM");
      confidence -= 15;
    }

    if (isMismatchMock) {
      flags.push("NAME_MISMATCH");
      confidence -= 18;
    }
  } else if (docType === "CASTE_CERTIFICATE") {
    const docName = isMismatchMock ? "B. " + userSubmittedData.candidateName : userSubmittedData.candidateName;
    const tribalGroup = userSubmittedData.tribalGroup || "Santhal";

    const boundingBoxes: BoundingBox[] = [
      {
        id: "box-cst-1",
        field: "header",
        label: "Official State Emblem & Seal",
        x: 20,
        y: 10,
        width: 60,
        height: 10,
        extractedText: "OFFICE OF THE SUB-DIVISIONAL MAGISTRATE",
        confidence: 0.97,
      },
      {
        id: "box-cst-2",
        field: "casteCategory",
        label: "Constitutional Category",
        x: 25,
        y: 28,
        width: 50,
        height: 7,
        extractedText: "SCHEDULED TRIBE (ST) - CONSTITUTION ORDER 1950",
        confidence: 0.99,
      },
      {
        id: "box-cst-3",
        field: "candidateName",
        label: "Candidate Name",
        x: 30,
        y: 40,
        width: 40,
        height: 6,
        extractedText: docName,
        confidence: 0.96,
      },
      {
        id: "box-cst-4",
        field: "tribalSubcaste",
        label: "Recognized Tribe",
        x: 32,
        y: 52,
        width: 36,
        height: 6,
        extractedText: `Community / Tribe: ${tribalGroup}`,
        confidence: 0.98,
      },
      {
        id: "box-cst-5",
        field: "certificateNo",
        label: "ST Certificate Number",
        x: 60,
        y: 68,
        width: 32,
        height: 6,
        extractedText: "ST/JH/2021/008432",
        confidence: 0.95,
      },
      {
        id: "box-cst-6",
        field: "seal",
        label: "Digital Digital Seal & Signature",
        x: 55,
        y: 80,
        width: 35,
        height: 12,
        extractedText: "Digitally Signed by SDM Ranchi",
        confidence: 0.98,
      },
    ];

    extractedData = {
      candidateName: docName,
      casteCategory: "Scheduled Tribe (ST)",
      tribalSubcaste: tribalGroup,
      certificateNo: "ST/JH/2021/008432",
      issuingAuthority: "Sub-Divisional Officer / Magistrate",
      issueDate: "14/08/2021",
      boundingBoxes,
    };

    if (isMismatchMock) {
      flags.push("NAME_MISMATCH");
      confidence -= 20;
    }
  } else if (docType === "MARKSHEET") {
    const score = userSubmittedData.academicScore || 78.5;
    const boundingBoxes: BoundingBox[] = [
      {
        id: "box-mrk-1",
        field: "instituteName",
        label: "University / Institute Name",
        x: 15,
        y: 10,
        width: 70,
        height: 8,
        extractedText: "JAWAHARLAL NEHRU UNIVERSITY, NEW DELHI",
        confidence: 0.97,
      },
      {
        id: "box-mrk-2",
        field: "candidateName",
        label: "Student Name",
        x: 25,
        y: 26,
        width: 45,
        height: 6,
        extractedText: userSubmittedData.candidateName,
        confidence: 0.96,
      },
      {
        id: "box-mrk-3",
        field: "degreeName",
        label: "Degree Awarded",
        x: 22,
        y: 38,
        width: 55,
        height: 6,
        extractedText: "Master of Science (M.Sc) in Environmental Sciences",
        confidence: 0.95,
      },
      {
        id: "box-mrk-4",
        field: "percentageScore",
        label: "Final Cumulative Score / CGPA",
        x: 30,
        y: 56,
        width: 40,
        height: 7,
        extractedText: `CGPA: ${(score / 10).toFixed(2)} / 10.0 (Equivalent ${score.toFixed(1)}%)`,
        confidence: 0.98,
      },
      {
        id: "box-mrk-5",
        field: "controllerOfExams",
        label: "Verification Barcode & Seal",
        x: 60,
        y: 78,
        width: 30,
        height: 12,
        extractedText: "Controller of Examinations - Verified",
        confidence: 0.94,
      },
    ];

    extractedData = {
      candidateName: userSubmittedData.candidateName,
      instituteName: "Jawaharlal Nehru University, New Delhi",
      degreeName: "Master of Science (M.Sc)",
      percentageScore: score,
      boundingBoxes,
    };

    if (score < rules.minAcademicScore) {
      flags.push("ACADEMIC_CUTOFF_NOT_MET");
      confidence -= 25;
    }
  } else if (docType === "OFFER_LETTER") {
    const univ = userSubmittedData.univName || "University of Oxford";
    const rank = userSubmittedData.univRanking || 4;
    const boundingBoxes: BoundingBox[] = [
      {
        id: "box-ofr-1",
        field: "instituteName",
        label: "Admitting Institution",
        x: 18,
        y: 12,
        width: 64,
        height: 8,
        extractedText: univ.toUpperCase(),
        confidence: 0.98,
      },
      {
        id: "box-ofr-2",
        field: "candidateName",
        label: "Offer Recipient",
        x: 24,
        y: 28,
        width: 48,
        height: 6,
        extractedText: userSubmittedData.candidateName,
        confidence: 0.97,
      },
      {
        id: "box-ofr-3",
        field: "programName",
        label: "Doctoral Program",
        x: 20,
        y: 42,
        width: 60,
        height: 6,
        extractedText: "DPhil in Anthropology / Indigenous Studies",
        confidence: 0.95,
      },
      {
        id: "box-ofr-4",
        field: "qsRanking",
        label: "Verified QS Global Rank",
        x: 30,
        y: 58,
        width: 40,
        height: 7,
        extractedText: `QS World University Rank 2026: #${rank}`,
        confidence: 0.99,
      },
      {
        id: "box-ofr-5",
        field: "acceptanceStamp",
        label: "Dean of Admissions Signature",
        x: 55,
        y: 78,
        width: 35,
        height: 12,
        extractedText: "Unconditional Offer - Academic Year 2026-27",
        confidence: 0.96,
      },
    ];

    extractedData = {
      candidateName: userSubmittedData.candidateName,
      instituteName: univ,
      qsRanking: rank,
      boundingBoxes,
    };

    if (rules.maxQsRanking && rank > rules.maxQsRanking) {
      flags.push("QS_RANK_EXCEEDED");
      confidence -= 30;
    }
  }

  const status = flags.length > 0 ? "FLAGGED" : "VALID";
  const summary = flags.length > 0
    ? `Discrepancies detected: ${flags.join(", ")}`
    : `All OCR criteria successfully matched with 0 discrepancies.`;

  return {
    docType,
    confidenceScore: Math.max(35, Math.min(99, confidence)),
    extractedData,
    flags,
    status,
    summary,
  };
}
