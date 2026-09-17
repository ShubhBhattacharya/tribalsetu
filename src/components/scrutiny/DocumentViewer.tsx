"use client";

import React, { useState } from "react";
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2,
  Eye,
  Layers,
  Sparkles
} from "lucide-react";
import { BoundingBox, DocumentItem, DocumentType } from "@/types";

interface DocumentViewerProps {
  documents: DocumentItem[];
  activeDocType: DocumentType;
  onSelectDocType: (type: DocumentType) => void;
  selectedBoxId?: string | null;
  onSelectBox?: (box: BoundingBox | null) => void;
}

export default function DocumentViewer({
  documents,
  activeDocType,
  onSelectDocType,
  selectedBoxId,
  onSelectBox,
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);

  const currentDoc = documents.find((d) => d.docType === activeDocType) || documents[0];
  const boundingBoxes = currentDoc?.ocrData?.boundingBoxes || [];

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-md">
      {/* 1. Top Document Tab Switcher */}
      <div className="bg-slate-800 border-b border-slate-700 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {documents.map((doc) => {
            const isActive = doc.docType === activeDocType;
            const isFlagged = doc.verificationStatus === "FLAGGED";
            const labelMap: Record<DocumentType, string> = {
              CASTE_CERTIFICATE: "Caste Certificate",
              INCOME_CERTIFICATE: "Income Certificate",
              MARKSHEET: "Degree Marksheet",
              OFFER_LETTER: "Offer Letter",
            };

            return (
              <button
                key={doc.id}
                onClick={() => onSelectDocType(doc.docType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{labelMap[doc.docType]}</span>
                {isFlagged && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" title="Flagged discrepancy"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Viewer Controls */}
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 border ${
              showBoxes
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-600"
                : "bg-slate-700 text-slate-400 border-slate-600"
            }`}
            title="Toggle AI Bounding Box Overlays"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI Overlays</span>
          </button>

          <div className="flex items-center bg-slate-700 rounded px-1">
            <button
              onClick={() => setZoom(Math.max(70, zoom - 15))}
              className="p-1 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] px-1 font-mono">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(140, zoom + 15))}
              className="p-1 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Document Canvas Area with Interactive Bounding Boxes */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/70">
        <div
          className="relative bg-white text-slate-900 shadow-2xl rounded transition-transform origin-top border border-slate-200"
          style={{
            width: "580px",
            minHeight: "750px",
            transform: `scale(${zoom / 100})`,
          }}
        >
          {/* Simulated Official Document Content */}
          <div className="p-8 select-none relative font-serif">
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-64 h-64 rounded-full border-8 border-slate-900 flex items-center justify-center text-4xl font-bold">
                MoTA / GOI
              </div>
            </div>

            {/* Document Specific Simulated Layout */}
            {activeDocType === "INCOME_CERTIFICATE" && (
              <div className="space-y-6 text-center">
                <div className="border-b-2 border-slate-900 pb-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
                    Department of Revenue & Land Reforms
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    CERTIFICATE OF ANNUAL FAMILY INCOME
                  </h2>
                  <div className="text-[10px] text-slate-500">
                    Form VII (Rule 14-A) • Government of India / State Revenue Portal
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-700">
                  <div>Certificate No: <strong>{currentDoc.ocrData?.certificateNo || "INC/2026/89412A"}</strong></div>
                  <div>Dated: <strong>{currentDoc.ocrData?.issueDate || "15/04/2026"}</strong></div>
                </div>

                <div className="text-left text-xs leading-relaxed space-y-4 font-sans text-slate-800 pt-2">
                  <p>
                    This is to certify that upon due inquiry and verification of revenue records, 
                    <strong> {currentDoc.ocrData?.candidateName || "Birsa Munda"}</strong>, 
                    resident of Village & Post: Khunti, District: Ranchi, Jharkhand, belongs to the Scheduled Tribe category.
                  </p>
                  <p>
                    The gross total annual income of the candidate and their family from all sources 
                    (including agriculture, business, and employment) for the assessment year is verified to be:
                  </p>
                  <div className="text-center p-3 bg-slate-50 border border-slate-300 rounded font-bold text-sm text-slate-900">
                    ? {currentDoc.ocrData?.annualIncome?.toLocaleString("en-IN") || "2,40,000"} /- 
                    <span className="block text-[11px] font-normal text-slate-600">(Rupees Two Lakh Forty Thousand Only)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">
                    This certificate is valid for scholarship and educational grant purposes under Ministry of Tribal Affairs guidelines.
                  </p>
                </div>

                {/* Seal and Signatures */}
                <div className="pt-12 flex justify-between items-end text-[10px] font-sans">
                  <div className="text-left border border-slate-300 p-2 rounded w-36 bg-slate-50">
                    <div className="font-bold">Digital QR Seal</div>
                    <div className="w-16 h-16 bg-slate-300 mx-auto my-1 flex items-center justify-center text-[9px] text-slate-600">
                      [QR CODE]
                    </div>
                    <div className="text-[9px] text-slate-500 text-center">Verify at edistrict.gov.in</div>
                  </div>

                  <div className="text-center w-48">
                    <div className="font-serif italic text-blue-800 text-xs mb-1">Digitally Verified</div>
                    <div className="border-t border-slate-800 pt-1 font-bold">
                      {currentDoc.ocrData?.issuingAuthority || "Tahasildar & Executive Magistrate"}
                    </div>
                    <div className="text-slate-500">Revenue Sub-Division Ranchi</div>
                  </div>
                </div>
              </div>
            )}

            {activeDocType === "CASTE_CERTIFICATE" && (
              <div className="space-y-6 text-center">
                <div className="border-b-2 border-slate-900 pb-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
                    Office of the Sub-Divisional Magistrate
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    SCHEDULED TRIBE (ST) COMMUNITY CERTIFICATE
                  </h2>
                  <div className="text-[10px] text-slate-500">
                    Under the Scheduled Castes & Scheduled Tribes Orders (Amendment) Act
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-700">
                  <div>Registration No: <strong>{currentDoc.ocrData?.certificateNo || "ST/JH/2021/008432"}</strong></div>
                  <div>Issued Date: <strong>{currentDoc.ocrData?.issueDate || "14/08/2021"}</strong></div>
                </div>

                <div className="text-left text-xs leading-relaxed space-y-4 font-sans text-slate-800 pt-2">
                  <p>
                    This is to certify that <strong>{currentDoc.ocrData?.candidateName || "Birsa Munda"}</strong>, 
                    is recognized as belonging to the <strong>{currentDoc.ocrData?.tribalSubcaste || "Santhal"}</strong> tribe, 
                    which is designated as a <strong>Scheduled Tribe (ST)</strong> under the Constitution Order 1950.
                  </p>
                  <p>
                    The candidate ordinarily resides with their family in District Ranchi of the State of Jharkhand.
                  </p>
                </div>

                <div className="pt-16 flex justify-between items-end text-[10px] font-sans">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-700 flex items-center justify-center text-emerald-800 font-bold text-center text-[9px] p-2 rotate-[-8deg]">
                    ? GOVT OF JHARKHAND ? REVENUE SEAL
                  </div>

                  <div className="text-center w-52">
                    <div className="border-t border-slate-800 pt-1 font-bold">
                      Sub-Divisional Officer (SDM)
                    </div>
                    <div className="text-slate-500">Authorized Issuing Authority</div>
                  </div>
                </div>
              </div>
            )}

            {activeDocType === "MARKSHEET" && (
              <div className="space-y-5 text-center">
                <div className="border-b-2 border-slate-900 pb-3">
                  <h2 className="text-base font-bold text-slate-900">
                    {currentDoc.ocrData?.instituteName || "JAWAHARLAL NEHRU UNIVERSITY, NEW DELHI"}
                  </h2>
                  <div className="text-xs font-semibold text-slate-700 mt-1">
                    CONSOLIDATED GRADE TRANSCRIPT & MARKSHEET
                  </div>
                </div>

                <div className="text-left text-xs space-y-2 font-sans pt-2">
                  <div>Candidate Name: <strong>{currentDoc.ocrData?.candidateName || "Birsa Munda"}</strong></div>
                  <div>Degree Awarded: <strong>{currentDoc.ocrData?.degreeName || "Master of Science (M.Sc)"}</strong></div>
                  <div>Cumulative Score: <strong>{currentDoc.ocrData?.percentageScore || 82.5}%</strong> (First Division with Distinction)</div>
                </div>

                <table className="w-full text-[11px] font-sans border-collapse border border-slate-300 mt-4">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-1.5">Semester</th>
                      <th className="border border-slate-300 p-1.5">Credits</th>
                      <th className="border border-slate-300 p-1.5">SGPA</th>
                      <th className="border border-slate-300 p-1.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-slate-300 p-1">Semester I</td><td className="border border-slate-300 p-1">24</td><td className="border border-slate-300 p-1">8.4</td><td className="border border-slate-300 p-1 text-emerald-700 font-bold">PASS</td></tr>
                    <tr><td className="border border-slate-300 p-1">Semester II</td><td className="border border-slate-300 p-1">24</td><td className="border border-slate-300 p-1">8.1</td><td className="border border-slate-300 p-1 text-emerald-700 font-bold">PASS</td></tr>
                    <tr><td className="border border-slate-300 p-1">Semester III</td><td className="border border-slate-300 p-1">24</td><td className="border border-slate-300 p-1">8.5</td><td className="border border-slate-300 p-1 text-emerald-700 font-bold">PASS</td></tr>
                    <tr><td className="border border-slate-300 p-1">Semester IV</td><td className="border border-slate-300 p-1">28</td><td className="border border-slate-300 p-1">8.8</td><td className="border border-slate-300 p-1 text-emerald-700 font-bold">PASS</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeDocType === "OFFER_LETTER" && (
              <div className="space-y-6 text-left font-sans">
                <div className="border-b border-slate-300 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {currentDoc.ocrData?.instituteName || "UNIVERSITY OF OXFORD"}
                    </h2>
                    <div className="text-[11px] text-slate-500">Graduate Admissions Office • Oxford, United Kingdom</div>
                  </div>
                  <div className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                    QS Rank #4
                  </div>
                </div>

                <div className="text-xs space-y-3 leading-relaxed text-slate-800">
                  <p>Dear <strong>{currentDoc.ocrData?.candidateName || "Shanti Oraon"}</strong>,</p>
                  <p>
                    We are delighted to offer you admission to the <strong>Doctor of Philosophy (DPhil)</strong> program 
                    for the academic session commencing October 2026.
                  </p>
                  <p>
                    This is a formal unconditional offer letter required for MoTA National Overseas Scholarship (NOS) processing.
                  </p>
                </div>
              </div>
            )}

            {/* Interactive OCR Bounding Box Overlays */}
            {showBoxes &&
              boundingBoxes.map((box) => {
                const isSelected = selectedBoxId === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectBox) onSelectBox(isSelected ? null : box);
                    }}
                    className={`absolute cursor-pointer transition-all border-2 rounded ${
                      isSelected
                        ? "bg-amber-400/30 border-amber-600 ring-4 ring-amber-300/60 z-30"
                        : "bg-emerald-400/15 border-emerald-500 hover:bg-emerald-400/30 hover:border-emerald-600 z-20"
                    }`}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                    }}
                    title={`${box.label}: ${box.extractedText} (${Math.round(box.confidence * 100)}% confidence)`}
                  >
                    <span
                      className={`absolute -top-4 left-0 text-[9px] font-bold px-1 py-0.2 rounded shadow-xs whitespace-nowrap pointer-events-none ${
                        isSelected ? "bg-amber-600 text-white" : "bg-emerald-700 text-white"
                      }`}
                    >
                      {box.label}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>File: <strong className="text-slate-200">{currentDoc.fileName}</strong></span>
          <span>•</span>
          <span>OCR Confidence: <strong className="text-emerald-400">{currentDoc.confidenceScore}%</strong></span>
        </div>
        <div className="text-[11px]">
          Click any green highlighted box to inspect OCR metadata cross-check
        </div>
      </div>
    </div>
  );
}
