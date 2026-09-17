"use client";

import React from "react";
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";
import { ApplicationStage, ApplicationStatus } from "@/types";

interface StatusStepperProps {
  currentStage: ApplicationStage;
  status: ApplicationStatus;
  submissionDate?: string;
  deficiencyCount?: number;
}

const STAGES: { stage: ApplicationStage; label: string; desc: string }[] = [
  { stage: "Submitted", label: "Application Submitted", desc: "Aadhaar e-KYC & form verified" },
  { stage: "OCR Verified", label: "AI OCR Document Extraction", desc: "Automated optical extraction & seal cross-check" },
  { stage: "Scrutiny", label: "MoTA Desk Scrutiny", desc: "Officer evaluation & deficiency inspection" },
  { stage: "Selection", label: "Merit Selection Pool", desc: "Composite merit score & quota allocation" },
  { stage: "Sanctioned", label: "Sanction & Disbursal", desc: "PFMS scholarship order & direct DBT credit" },
];

export default function StatusStepper({
  currentStage,
  status,
  submissionDate = "12 May 2026",
  deficiencyCount = 0,
}: StatusStepperProps) {
  const currentIndex = STAGES.findIndex((s) => s.stage === currentStage);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span>Official Application Progress Stepper</span>
            {status === "DEFICIENT" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Action Required: Deficiency Pending
              </span>
            )}
            {status === "SANCTIONED" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Fellowship Sanctioned
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500">Tracking lifecycle across MoTA verification checkpoints</p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
          Last updated: <span className="font-semibold text-slate-700">{submissionDate}</span>
        </div>
      </div>

      <div className="relative">
        {/* Progress Bar background */}
        <div className="hidden md:block absolute top-5 left-10 right-10 h-1 bg-slate-200 -z-0">
          <div
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{
              width: `${(Math.max(0, currentIndex) / (STAGES.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {STAGES.map((s, idx) => {
            const isCompleted = idx < currentIndex || (idx === currentIndex && status === "SANCTIONED");
            const isCurrent = idx === currentIndex && status !== "SANCTIONED";
            const isDeficient = isCurrent && status === "DEFICIENT";

            return (
              <div
                key={s.stage}
                className={`flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2 p-2 rounded-lg transition ${
                  isCurrent ? "bg-slate-50/80 md:bg-transparent" : ""
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-transform shadow-sm ${
                    isCompleted
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : isDeficient
                      ? "bg-amber-500 border-amber-600 text-white animate-pulse"
                      : isCurrent
                      ? "bg-[#0a2540] border-[#0a2540] text-white ring-4 ring-blue-100"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : isDeficient ? (
                    <AlertTriangle className="w-5 h-5 text-white" />
                  ) : isCurrent ? (
                    <span>{idx + 1}</span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Step Text */}
                <div className="flex-1">
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isCompleted
                        ? "text-emerald-700"
                        : isDeficient
                        ? "text-amber-700"
                        : isCurrent
                        ? "text-[#0a2540]"
                        : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{s.desc}</div>
                  {isDeficient && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                      Discrepancy Raised
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
