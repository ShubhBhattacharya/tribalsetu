"use client";

import React, { useState } from "react";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  RefreshCw, 
  Sparkles,
  ShieldAlert,
  ExternalLink,
  Trash2
} from "lucide-react";
import { DocumentType } from "@/types";
import { simulateOCRExtraction, OCRVerificationResult } from "@/lib/ocr-simulator";

interface DocumentVaultProps {
  candidateName: string;
  annualIncome: number;
  tribalGroup: string;
  academicScore: number;
  univName?: string;
  univRanking?: number;
  onDocumentsChange?: (docs: Record<DocumentType, UploadedDocState>) => void;
}

export interface UploadedDocState {
  file: { name: string; size: string; url: string };
  ocrResult?: OCRVerificationResult;
  isProcessing?: boolean;
}

const DOC_CONFIGS: {
  type: DocumentType;
  title: string;
  requiredFor: string;
  description: string;
  validFormat: string;
  mockValidName: string;
  mockFlaggedName: string;
}[] = [
  {
    type: "CASTE_CERTIFICATE",
    title: "Scheduled Tribe (ST) Certificate",
    requiredFor: "Mandatory for all ST Schemes",
    description: "Issued by Sub-Divisional Officer / District Magistrate under Constitution Order 1950",
    validFormat: "PDF/JPEG up to 5MB",
    mockValidName: "ST_Certificate_Verified_SDM.pdf",
    mockFlaggedName: "ST_Cert_Name_Mismatch_Kumar.pdf",
  },
  {
    type: "INCOME_CERTIFICATE",
    title: "Annual Family Income Certificate",
    requiredFor: "Eligibility ceiling check (<= ?8,00,000)",
    description: "Issued by competent Revenue Authority / Tahasildar for current Financial Year",
    validFormat: "PDF/JPEG issued within last 12 months",
    mockValidName: "Income_Cert_FY2026_Tahasildar.pdf",
    mockFlaggedName: "Income_Cert_Expired_2024_Old.pdf",
  },
  {
    type: "MARKSHEET",
    title: "Qualifying Degree Marksheet / Transcript",
    requiredFor: "Academic Merit Evaluation (NFST: >=55%, NOS: >=60%)",
    description: "Official consolidated marksheet or degree certificate showing percentage / CGPA",
    validFormat: "PDF/JPEG with University Registrar seal",
    mockValidName: "Master_Degree_Transcript_82pct.pdf",
    mockFlaggedName: "Provisional_Marksheet_Cutoff_Low.pdf",
  },
  {
    type: "OFFER_LETTER",
    title: "University Admission / Offer Letter",
    requiredFor: "Institutional ranking verification (NOS: QS <= 500)",
    description: "Unconditional offer letter from recognized Indian or Overseas University",
    validFormat: "Official Letterhead with Academic Intake",
    mockValidName: "Oxford_DPhil_Unconditional_Offer.pdf",
    mockFlaggedName: "Foreign_Offer_Unranked_College.pdf",
  },
];

export default function DocumentVault({
  candidateName,
  annualIncome,
  tribalGroup,
  academicScore,
  univName = "University of Oxford",
  univRanking = 4,
  onDocumentsChange,
}: DocumentVaultProps) {
  const [docStates, setDocStates] = useState<Record<DocumentType, UploadedDocState>>({
    CASTE_CERTIFICATE: {
      file: { name: "ST_Certificate_Verified_SDM.pdf", size: "1.4 MB", url: "#" },
      ocrResult: simulateOCRExtraction(
        "CASTE_CERTIFICATE",
        "ST_Certificate_Verified_SDM.pdf",
        { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
        { maxAnnualIncome: 800000, minAcademicScore: 55, maxQsRanking: 500, maxDocValidityMonths: 12 }
      ),
    },
    INCOME_CERTIFICATE: {
      file: { name: "Income_Cert_FY2026_Tahasildar.pdf", size: "980 KB", url: "#" },
      ocrResult: simulateOCRExtraction(
        "INCOME_CERTIFICATE",
        "Income_Cert_FY2026_Tahasildar.pdf",
        { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
        { maxAnnualIncome: 800000, minAcademicScore: 55, maxQsRanking: 500, maxDocValidityMonths: 12 }
      ),
    },
    MARKSHEET: {
      file: { name: "Master_Degree_Transcript_82pct.pdf", size: "2.1 MB", url: "#" },
      ocrResult: simulateOCRExtraction(
        "MARKSHEET",
        "Master_Degree_Transcript_82pct.pdf",
        { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
        { maxAnnualIncome: 800000, minAcademicScore: 55, maxQsRanking: 500, maxDocValidityMonths: 12 }
      ),
    },
    OFFER_LETTER: {
      file: { name: "Oxford_DPhil_Unconditional_Offer.pdf", size: "1.8 MB", url: "#" },
      ocrResult: simulateOCRExtraction(
        "OFFER_LETTER",
        "Oxford_DPhil_Unconditional_Offer.pdf",
        { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
        { maxAnnualIncome: 800000, minAcademicScore: 55, maxQsRanking: 500, maxDocValidityMonths: 12 }
      ),
    },
  });

  const [previewDoc, setPreviewDoc] = useState<DocumentType | null>(null);

  const handleSimulateUpload = (type: DocumentType, fileName: string, sizeStr = "1.6 MB") => {
    // Set processing
    setDocStates((prev) => ({
      ...prev,
      [type]: {
        file: { name: fileName, size: sizeStr, url: "#" },
        isProcessing: true,
      },
    }));

    setTimeout(() => {
      const ocrResult = simulateOCRExtraction(
        type,
        fileName,
        { candidateName, annualIncome, tribalGroup, academicScore, univName, univRanking },
        { maxAnnualIncome: 800000, minAcademicScore: 55, maxQsRanking: 500, maxDocValidityMonths: 12 }
      );

      setDocStates((prev) => {
        const next = {
          ...prev,
          [type]: {
            file: { name: fileName, size: sizeStr, url: "#" },
            ocrResult,
            isProcessing: false,
          },
        };
        if (onDocumentsChange) onDocumentsChange(next);
        return next;
      });
    }, 600);
  };

  const removeDoc = (type: DocumentType) => {
    setDocStates((prev) => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900">
          <p className="font-bold">Real-time MoTA AI Document Vault & OCR Verification</p>
          <p className="text-emerald-700 mt-0.5">
            Uploaded files undergo optical character recognition, digital seal verification, and automated cross-checking against Aadhaar and Revenue records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DOC_CONFIGS.map((cfg) => {
          const docState = docStates[cfg.type];
          const hasDoc = !!docState?.file;
          const isProcessing = docState?.isProcessing;
          const ocr = docState?.ocrResult;
          const isFlagged = ocr?.status === "FLAGGED";

          return (
            <div
              key={cfg.type}
              className={`border rounded-xl p-4 bg-white transition shadow-sm ${
                isFlagged
                  ? "border-amber-300 ring-1 ring-amber-200"
                  : hasDoc
                  ? "border-emerald-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0a2540]" />
                    <span>{cfg.title}</span>
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">{cfg.requiredFor}</span>
                </div>
                {hasDoc && !isProcessing && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isFlagged
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {isFlagged ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Flagged ({ocr?.flags.length})
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> OCR Verified ({ocr?.confidenceScore}%)
                      </>
                    )}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mb-3">{cfg.description}</p>

              {/* Upload or Current Doc Box */}
              {hasDoc ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  {isProcessing ? (
                    <div className="flex items-center justify-center py-4 space-x-2 text-xs text-slate-600">
                      <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>Simulating MoTA Optical AI Inspection...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded bg-blue-100 text-[#0a2540] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold text-slate-800 truncate">
                              {docState.file.name}
                            </div>
                            <div className="text-[10px] text-slate-500">{docState.file.size} • PDF Document</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(previewDoc === cfg.type ? null : cfg.type)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded"
                            title="Inspect OCR & Bounding Boxes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeDoc(cfg.type)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Remove Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* OCR Bounding Box Preview Drawer */}
                      {previewDoc === cfg.type && ocr && (
                        <div className="mt-3 pt-3 border-t border-slate-200 text-xs">
                          <div className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                            <span>Detected Text & Metadata:</span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              Confidence: <strong>{ocr.confidenceScore}%</strong>
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200 space-y-1 text-[11px]">
                            {ocr.extractedData.candidateName && (
                              <div>Name: <span className="font-semibold text-slate-800">{ocr.extractedData.candidateName}</span></div>
                            )}
                            {ocr.extractedData.casteCategory && (
                              <div>Category: <span className="font-semibold text-slate-800">{ocr.extractedData.casteCategory} ({ocr.extractedData.tribalSubcaste})</span></div>
                            )}
                            {ocr.extractedData.annualIncome !== undefined && (
                              <div>Annual Income: <span className="font-semibold text-slate-800">?{ocr.extractedData.annualIncome.toLocaleString("en-IN")}</span></div>
                            )}
                            {ocr.extractedData.issueDate && (
                              <div>Issue Date: <span className="font-semibold text-slate-800">{ocr.extractedData.issueDate}</span></div>
                            )}
                            {ocr.extractedData.instituteName && (
                              <div>Institution: <span className="font-semibold text-slate-800">{ocr.extractedData.instituteName}</span></div>
                            )}
                            {ocr.extractedData.percentageScore && (
                              <div>Academic Score: <span className="font-semibold text-slate-800">{ocr.extractedData.percentageScore}%</span></div>
                            )}
                          </div>

                          {ocr.flags.length > 0 && (
                            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[11px]">
                              <div className="font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Discrepancies Flagged:
                              </div>
                              <ul className="list-disc list-inside mt-0.5 text-[10px]">
                                {ocr.flags.map((flag) => (
                                  <li key={flag} className="font-medium">{flag}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* Drag-and-drop placeholder */
                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-lg p-4 text-center bg-slate-50/50 transition">
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700">Drag & drop document here</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{cfg.validFormat}</p>
                </div>
              )}

              {/* Quick Mock Document Loaders for fast testing */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[10px]">
                <span className="text-slate-400 font-medium">Quick Test Files:</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleSimulateUpload(cfg.type, cfg.mockValidName)}
                    className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold border border-emerald-200"
                  >
                    + Valid Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateUpload(cfg.type, cfg.mockFlaggedName)}
                    className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold border border-amber-200"
                  >
                    + Flagged Sample
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
