"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  ArrowLeft, 
  Sparkles, 
  Filter, 
  Search,
  CheckCircle2
} from "lucide-react";
import DocumentViewer from "@/components/scrutiny/DocumentViewer";
import MetadataComparison from "@/components/scrutiny/MetadataComparison";
import ActionBar from "@/components/scrutiny/ActionBar";
import { ApplicationItem, BoundingBox, DocumentItem, DocumentType } from "@/types";

const MOCK_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-shanti-nos",
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
    scheme: {
      id: "sch_nos",
      code: "NOS",
      title: "National Overseas Scholarship for ST Candidates",
      description: "Overseas studies in Top 500 QS Universities",
      type: "OVERSEAS_SCHOLARSHIP",
      eligibilityRules: {
        maxAnnualIncome: 800000,
        minAcademicScore: 60,
        maxQsRanking: 500,
        maxDocValidityMonths: 12,
        eligibleDegrees: ["Ph.D."],
      },
      deadline: "2026-10-31",
      budget: 450000000,
      totalSlots: 100,
      isActive: true,
    },
    status: "VERIFIED",
    currentStage: "Scrutiny",
    academicScore: 86.5,
    univRanking: 4,
    univName: "University of Oxford",
    degreeProgram: "DPhil in Anthropology",
    researchTopic: "Indigenous Ecological Systems and Sustainable Livelihoods in Odisha Forests",
    meritScore: 92.4,
    annualIncome: 180000,
    tribalGroup: "Oraon",
    state: "Odisha",
    flags: [],
    createdAt: "2026-05-18T09:00:00Z",
    updatedAt: "2026-09-17T12:00:00Z",
    documents: [
      {
        id: "doc-shanti-1",
        applicationId: "app-shanti-nos",
        docType: "OFFER_LETTER",
        fileName: "Oxford_DPhil_Unconditional_Offer.pdf",
        fileUrl: "#",
        verificationStatus: "VALID",
        confidenceScore: 98.5,
        flags: [],
        uploadedAt: "2026-05-18",
        ocrData: {
          candidateName: "Shanti Oraon",
          instituteName: "University of Oxford",
          qsRanking: 4,
          boundingBoxes: [
            { id: "box-1", field: "instituteName", label: "Institution", x: 15, y: 10, width: 70, height: 8, extractedText: "UNIVERSITY OF OXFORD", confidence: 0.99 },
            { id: "box-2", field: "candidateName", label: "Applicant Name", x: 24, y: 28, width: 48, height: 6, extractedText: "Shanti Oraon", confidence: 0.98 },
            { id: "box-3", field: "qsRanking", label: "QS World Rank", x: 30, y: 58, width: 40, height: 7, extractedText: "QS World University Rank 2026: #4", confidence: 0.99 },
          ],
        },
      },
      {
        id: "doc-shanti-2",
        applicationId: "app-shanti-nos",
        docType: "INCOME_CERTIFICATE",
        fileName: "Income_Cert_FY2026_Tahasildar.pdf",
        fileUrl: "#",
        verificationStatus: "VALID",
        confidenceScore: 96.0,
        flags: [],
        uploadedAt: "2026-05-18",
        ocrData: {
          candidateName: "Shanti Oraon",
          annualIncome: 180000,
          issueDate: "15/04/2026",
          issuingAuthority: "Tahasildar Mayurbhanj",
          certificateNo: "INC/2026/89412A",
          boundingBoxes: [
            { id: "box-inc-1", field: "candidateName", label: "Applicant Name", x: 28, y: 34, width: 42, height: 6, extractedText: "Shanti Oraon", confidence: 0.97 },
            { id: "box-inc-2", field: "annualIncome", label: "Annual Income", x: 35, y: 48, width: 32, height: 7, extractedText: "? 1,80,000/- (Rupees One Lakh Eighty Thousand)", confidence: 0.98 },
            { id: "box-inc-3", field: "issueDate", label: "Issue Date", x: 20, y: 62, width: 22, height: 5, extractedText: "15/04/2026", confidence: 0.95 },
          ],
        },
      },
      {
        id: "doc-shanti-3",
        applicationId: "app-shanti-nos",
        docType: "CASTE_CERTIFICATE",
        fileName: "ST_Certificate_Oraon_SDM.pdf",
        fileUrl: "#",
        verificationStatus: "VALID",
        confidenceScore: 97.5,
        flags: [],
        uploadedAt: "2026-05-18",
        ocrData: {
          candidateName: "Shanti Oraon",
          casteCategory: "Scheduled Tribe (ST)",
          tribalSubcaste: "Oraon",
          certificateNo: "ST/OD/2022/09121",
          issuingAuthority: "Sub-Divisional Magistrate",
          issueDate: "18/06/2022",
          boundingBoxes: [
            { id: "box-cst-1", field: "candidateName", label: "Applicant Name", x: 30, y: 40, width: 40, height: 6, extractedText: "Shanti Oraon", confidence: 0.98 },
            { id: "box-cst-2", field: "tribalSubcaste", label: "Recognized Tribe", x: 32, y: 52, width: 36, height: 6, extractedText: "Community: Oraon (ST)", confidence: 0.99 },
          ],
        },
      },
    ],
  },
  {
    id: "app-birsa-nfst",
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
    scheme: {
      id: "sch_nfst",
      code: "NFST",
      title: "National Fellowship for Higher Education of ST Students",
      description: "Domestic Fellowship for PhD/M.Phil",
      type: "DOMESTIC_FELLOWSHIP",
      eligibilityRules: {
        maxAnnualIncome: 800000,
        minAcademicScore: 55,
        maxDocValidityMonths: 12,
        eligibleDegrees: ["M.Phil", "Ph.D."],
      },
      deadline: "2026-11-30",
      budget: 650000000,
      totalSlots: 750,
      isActive: true,
    },
    status: "DEFICIENT",
    currentStage: "Scrutiny",
    academicScore: 78.5,
    univRanking: 12,
    univName: "Jawaharlal Nehru University, New Delhi",
    degreeProgram: "Ph.D. in Environmental Anthropology",
    researchTopic: "Indigenous Forest Conservation Practices in Chota Nagpur Plateau",
    meritScore: 82.4,
    annualIncome: 240000,
    tribalGroup: "Santhal",
    state: "Jharkhand",
    flags: ["EXPIRED_DOCUMENT"],
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
    documents: [
      {
        id: "doc-birsa-1",
        applicationId: "app-birsa-nfst",
        docType: "INCOME_CERTIFICATE",
        fileName: "Income_Cert_Expired_2024_Old.pdf",
        fileUrl: "#",
        verificationStatus: "FLAGGED",
        confidenceScore: 68.0,
        flags: ["EXPIRED_DOCUMENT"],
        uploadedAt: "2026-05-12",
        ocrData: {
          candidateName: "Birsa Munda",
          annualIncome: 240000,
          issueDate: "12/03/2024",
          issuingAuthority: "Tahasildar Ranchi",
          certificateNo: "INC/2024/00142B",
          boundingBoxes: [
            { id: "box-b-1", field: "candidateName", label: "Applicant Name", x: 28, y: 34, width: 42, height: 6, extractedText: "Birsa Munda", confidence: 0.96 },
            { id: "box-b-2", field: "annualIncome", label: "Annual Income", x: 35, y: 48, width: 32, height: 7, extractedText: "? 2,40,000/- (Rupees Two Lakh Forty Thousand)", confidence: 0.95 },
            { id: "box-b-3", field: "issueDate", label: "Issue Date (Expired)", x: 20, y: 62, width: 22, height: 5, extractedText: "12/03/2024", confidence: 0.94 },
          ],
        },
      },
      {
        id: "doc-birsa-2",
        applicationId: "app-birsa-nfst",
        docType: "CASTE_CERTIFICATE",
        fileName: "ST_Certificate_Santhal.pdf",
        fileUrl: "#",
        verificationStatus: "VALID",
        confidenceScore: 97.0,
        flags: [],
        uploadedAt: "2026-05-12",
        ocrData: {
          candidateName: "Birsa Munda",
          casteCategory: "Scheduled Tribe (ST)",
          tribalSubcaste: "Santhal",
          certificateNo: "ST/JH/2021/008432",
          issuingAuthority: "Sub-Divisional Magistrate",
          issueDate: "14/08/2021",
          boundingBoxes: [
            { id: "box-b-c1", field: "candidateName", label: "Applicant Name", x: 30, y: 40, width: 40, height: 6, extractedText: "Birsa Munda", confidence: 0.98 },
            { id: "box-b-c2", field: "tribalSubcaste", label: "Recognized Tribe", x: 32, y: 52, width: 36, height: 6, extractedText: "Community: Santhal (ST)", confidence: 0.98 },
          ],
        },
      },
    ],
  },
];

export default function OfficerScrutinyPage() {
  const [appIndex, setAppIndex] = useState(0);
  const [activeDocType, setActiveDocType] = useState<DocumentType>("OFFER_LETTER");
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const application = MOCK_APPLICATIONS[appIndex];
  const documents = application.documents || [];

  // Ensure activeDocType exists in current application
  const effectiveDocType = documents.some((d) => d.docType === activeDocType)
    ? activeDocType
    : documents[0]?.docType || "INCOME_CERTIFICATE";

  const currentDoc = documents.find((d) => d.docType === effectiveDocType) || documents[0];

  const handleApprove = () => {
    setActionNotice(`Application ${application.applicationNo} has been APPROVED by Scrutiny Desk and routed to the Merit Selection Pool.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleRaiseDeficiency = (reason: string, details: string) => {
    setActionNotice(`Deficiency raised on ${application.applicationNo}: "${reason}". Applicant has been notified via SMS/Portal.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleReject = (reason: string) => {
    setActionNotice(`Application ${application.applicationNo} marked REJECTED. Official notice generated.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* 1. Scrutiny Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-3">
          <Link
            href="/officer/applications"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            title="Back to Applications Queue"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>MoTA Scrutiny Workbench (Split-Screen)</span>
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0a2540] text-white px-2.5 py-0.5 rounded">
                {application.applicationNo}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Applicant: <strong>{application.user?.name}</strong> • Tribe: <strong>{application.tribalGroup}</strong> ({application.state}) • Scheme: <strong>{application.scheme?.code}</strong>
            </p>
          </div>
        </div>

        {/* Quick App Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Switch Candidate:</span>
          {MOCK_APPLICATIONS.map((app, idx) => (
            <button
              key={app.id}
              onClick={() => {
                setAppIndex(idx);
                setSelectedBox(null);
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition ${
                appIndex === idx
                  ? "bg-[#0a2540] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {app.user?.name.split(" ")[0]} ({app.scheme?.code})
            </button>
          ))}
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-200 hover:text-white">
            ?
          </button>
        </div>
      )}

      {/* 2. Main Split-Screen Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden bg-slate-100">
        {/* Left Side: Uploaded PDF Document Viewer with interactive bounding boxes */}
        <div className="h-full overflow-hidden">
          <DocumentViewer
            documents={documents}
            activeDocType={effectiveDocType}
            onSelectDocType={(type) => {
              setActiveDocType(type);
              setSelectedBox(null);
            }}
            selectedBoxId={selectedBox?.id}
            onSelectBox={(box) => setSelectedBox(box)}
          />
        </div>

        {/* Right Side: AI-extracted metadata side-by-side with user-entered values */}
        <div className="h-full overflow-hidden">
          <MetadataComparison
            application={application}
            currentDoc={currentDoc}
            selectedBox={selectedBox}
          />
        </div>
      </div>

      {/* 3. Bottom Action Bar */}
      <div className="shrink-0">
        <ActionBar
          application={application}
          onApprove={handleApprove}
          onRaiseDeficiency={handleRaiseDeficiency}
          onReject={handleReject}
          onNavigateNext={() => setAppIndex((appIndex + 1) % MOCK_APPLICATIONS.length)}
          onNavigatePrev={() =>
            setAppIndex((appIndex - 1 + MOCK_APPLICATIONS.length) % MOCK_APPLICATIONS.length)
          }
        />
      </div>
    </div>
  );
}
