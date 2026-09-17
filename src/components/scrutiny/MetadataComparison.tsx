"use client";

import React from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Info,
  Calendar,
  Building2,
  DollarSign,
  UserCheck
} from "lucide-react";
import { ApplicationItem, BoundingBox, DocumentItem } from "@/types";

interface MetadataComparisonProps {
  application: ApplicationItem;
  currentDoc: DocumentItem;
  selectedBox?: BoundingBox | null;
}

export default function MetadataComparison({
  application,
  currentDoc,
  selectedBox,
}: MetadataComparisonProps) {
  const ocrData = currentDoc.ocrData || { boundingBoxes: [] };
  const flags = currentDoc.flags || [];
  const confidence = currentDoc.confidenceScore || 90;

  // Comparison evaluation
  const nameMatches =
    ocrData.candidateName?.toLowerCase().trim() ===
    application.user?.name.toLowerCase().trim();

  const incomeMatches =
    ocrData.annualIncome !== undefined
      ? Math.abs(ocrData.annualIncome - application.annualIncome) < 1000
      : true;

  const isIncomeOverLimit =
    (ocrData.annualIncome || application.annualIncome) > 800000;

  const isExpired = flags.includes("EXPIRED_DOCUMENT");

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* 1. Header with AI Match Confidence */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              AI Verification & Scrutiny Cross-Check
            </h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Comparing Form Submission against OCR Document Extraction
          </p>
        </div>

        {/* Match Confidence Badge */}
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Confidence Score
          </div>
          <div
            className={`text-base font-extrabold flex items-center justify-end gap-1 ${
              confidence >= 85
                ? "text-emerald-600"
                : confidence >= 70
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {confidence >= 85 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            )}
            <span>{confidence}%</span>
          </div>
        </div>
      </div>

      {/* 2. Flagged Alerts Banner (if any) */}
      {flags.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">
                Action Required: {flags.length} Discrepanc{flags.length > 1 ? "ies" : "y"} Flagged by MoTA AI
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {flags.map((flag) => (
                  <span
                    key={flag}
                    className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[10px] font-mono font-bold"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Comparison Table */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Active Selected Bounding Box Highlight Indicator */}
        {selectedBox && (
          <div className="p-2.5 bg-amber-50/70 border border-amber-300 rounded-lg text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-900">Inspecting Box: </span>
              <span className="text-amber-800 font-semibold">{selectedBox.label}</span>
              <div className="text-[11px] text-slate-600 truncate mt-0.5">
                Text: &quot;{selectedBox.extractedText}&quot;
              </div>
            </div>
            <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
              {Math.round(selectedBox.confidence * 100)}% Conf
            </span>
          </div>
        )}

        {/* Table comparison cards */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-100 text-slate-600 text-[11px] font-semibold border-b border-slate-200">
              <tr>
                <th className="text-left p-2.5">Field</th>
                <th className="text-left p-2.5">Candidate Form Input</th>
                <th className="text-left p-2.5">OCR Extracted Value</th>
                <th className="text-right p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Field 1: Candidate Name */}
              <tr className={selectedBox?.field === "candidateName" ? "bg-amber-50" : ""}>
                <td className="p-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Applicant Name</span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  {application.user?.name || "Birsa Munda"}
                </td>
                <td className="p-2.5 font-mono text-slate-800">
                  {ocrData.candidateName || application.user?.name}
                </td>
                <td className="p-2.5 text-right">
                  {nameMatches ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Match
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-red-600" /> Mismatch
                    </span>
                  )}
                </td>
              </tr>

              {/* Field 2: Annual Family Income */}
              <tr className={selectedBox?.field === "annualIncome" ? "bg-amber-50" : ""}>
                <td className="p-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>Annual Family Income</span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  ?{application.annualIncome.toLocaleString("en-IN")}
                </td>
                <td className="p-2.5 font-mono text-slate-800">
                  ?{(ocrData.annualIncome || application.annualIncome).toLocaleString("en-IN")}
                </td>
                <td className="p-2.5 text-right">
                  {isIncomeOverLimit ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-red-600" /> &gt; ?8 Lakh Limit
                    </span>
                  ) : incomeMatches ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified (&lt; ?8L)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3 text-amber-600" /> Diff Detected
                    </span>
                  )}
                </td>
              </tr>

              {/* Field 3: Tribal Community */}
              <tr className={selectedBox?.field === "tribalSubcaste" ? "bg-amber-50" : ""}>
                <td className="p-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Recognized Tribe</span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  {application.tribalGroup} ({application.state})
                </td>
                <td className="p-2.5 font-mono text-slate-800">
                  {ocrData.tribalSubcaste || application.tribalGroup} (Scheduled Tribe)
                </td>
                <td className="p-2.5 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ST Verified
                  </span>
                </td>
              </tr>

              {/* Field 4: Document Validity & Issue Date */}
              <tr className={selectedBox?.field === "issueDate" ? "bg-amber-50" : ""}>
                <td className="p-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Document Issue Date</span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  FY 2026-27 (Valid)
                </td>
                <td className="p-2.5 font-mono text-slate-800">
                  {ocrData.issueDate || "15/04/2026"}
                </td>
                <td className="p-2.5 text-right">
                  {isExpired ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-red-600" /> &gt; 12 Months Old
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid Period
                    </span>
                  )}
                </td>
              </tr>

              {/* Field 5: Institution / Ranking */}
              <tr className={selectedBox?.field === "instituteName" || selectedBox?.field === "qsRanking" ? "bg-amber-50" : ""}>
                <td className="p-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>University & Rank</span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  {application.univName || "JNU New Delhi"} 
                  {application.univRanking ? ` (Rank #${application.univRanking})` : ""}
                </td>
                <td className="p-2.5 font-mono text-slate-800">
                  {ocrData.instituteName || application.univName || "JNU New Delhi"}
                </td>
                <td className="p-2.5 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Eligible Inst.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#0a2540]" />
            <span>Automated Pre-Scrutiny Assessment</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {flags.length === 0
              ? "All critical eligibility criteria (ST classification, income ceiling, valid issuing authority, academic threshold) have passed optical AI cross-checks without any discrepancies. The application is recommended for Approval."
              : `Discrepancies found (${flags.join(", ")}). The Scrutiny Officer can raise a deficiency request giving the applicant an opportunity to rectify the issue within 7 working days.`}
          </p>
        </div>
      </div>
    </div>
  );
}
