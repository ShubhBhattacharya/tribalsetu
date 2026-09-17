"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  RefreshCw,
  Calendar,
  ShieldCheck,
  Check
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DeficiencyResolver() {
  const { t } = useLanguage();
  const [isResolved, setIsResolved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleReupload = (sampleFileName = "Income_Certificate_FY2026_Tahasildar_Signed.pdf") => {
    setIsUploading(true);
    setTimeout(() => {
      setUploadedFile(sampleFileName);
      setIsUploading(false);
      setIsResolved(true);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/student/dashboard"
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>MoTA Deficiency Resolution Center</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Rectify document discrepancies flagged by AI Verification and Desk Officers
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-100 px-3 py-1 rounded font-bold text-slate-700 border border-slate-200">
            App ID: NFST-2026-0842
          </div>
        </div>
      </div>

      {/* Deficiency Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isResolved
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs">
            {isResolved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Deficiency Successfully Rectified & Resubmitted</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Action Required: 1 Document Discrepancy Flagged</span>
              </>
            )}
          </div>
          <span className="text-[11px] font-semibold">
            {isResolved ? "Status: Scrutiny Resumed" : "Deadline: 7 Days Remaining"}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Flagged issue explanation */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Flagged Document Item
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0a2540]" />
              <span>Annual Family Income Certificate (Form VII)</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800">Officer Scrutiny Remark:</span>
                <p className="text-slate-700 mt-1 font-medium leading-relaxed">
                  &quot;Income certificate older than 1 year - Re-upload valid PDF for current Financial Year 2026-27.&quot;
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                14 Sep 2026 • 15:42
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-600">
              <strong className="text-slate-800">MoTA Rule Criteria: </strong>
              Under fellowship guidelines, income certificates must be issued within 12 months prior to application submission. The previously submitted document (issued 12 March 2024) is beyond the validity window.
            </div>
          </div>

          {/* Re-upload Box */}
          {isResolved ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-emerald-900">
                Fresh Document Uploaded & Optical OCR Verified!
              </h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                File: <strong>{uploadedFile}</strong>
                <br />
                Issue Date: <strong>15 April 2026 (Valid)</strong> • Match Confidence: <strong>97.8%</strong>
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/student/dashboard"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Return to Dashboard
                </Link>
                <Link
                  href="/officer/scrutiny"
                  className="px-4 py-2 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-50 transition"
                >
                  Review in Officer Workbench
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-800">
                Upload Rectified Document (Issued for FY 2026-27):
              </div>

              {/* Upload trigger zone */}
              <div className="border-2 border-dashed border-amber-300 hover:border-emerald-500 rounded-xl p-6 text-center bg-amber-50/30 transition">
                {isUploading ? (
                  <div className="py-4 flex flex-col items-center justify-center space-y-2 text-xs text-slate-600">
                    <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin" />
                    <span className="font-bold text-slate-800">Executing Optical AI Verification on New Document...</span>
                    <span className="text-[11px] text-slate-400">Verifying Tahasildar seal, date & income amount</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      Drag and drop your updated Income Certificate here
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Supports PDF / JPG / PNG (Max 5MB)
                    </p>

                    {/* Quick Demo Upload Button */}
                    <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-center gap-2">
                      <span className="text-[11px] text-slate-500">Quick Test:</span>
                      <button
                        type="button"
                        onClick={() => handleReupload()}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simulate Upload Valid FY2026 Certificate</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
