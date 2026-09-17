"use client";

import React from "react";
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { ApplicationStage, ApplicationStatus } from "@/types";

interface StatusStepperProps {
  currentStage: ApplicationStage;
  status: ApplicationStatus;
  submissionDate?: string;
  deficiencyCount?: number;
}

const STAGES: { stage: ApplicationStage; label: string; office: string; desc: string }[] = [
  { 
    stage: "Submitted", 
    label: "Application Submitted", 
    office: "Citizen Portal",
    desc: "Aadhaar e-KYC verified & digital signature logged" 
  },
  { 
    stage: "OCR Verified", 
    label: "AI Document OCR Extraction", 
    office: "MoTA AI Engine",
    desc: "Optical extraction & state revenue seal cross-checked" 
  },
  { 
    stage: "Scrutiny", 
    label: "MoTA Desk Scrutiny", 
    office: "Scrutiny Desk New Delhi",
    desc: "Verification officer review & discrepancy inspection" 
  },
  { 
    stage: "Selection", 
    label: "Merit Selection Pool", 
    office: "National Selection Board",
    desc: "Algorithmic composite ranking & quota reservation" 
  },
  { 
    stage: "Sanctioned", 
    label: "PFMS Grant Sanction", 
    office: "Central Treasury / PFMS",
    desc: "Scholarship sanction order issued & DBT credit enabled" 
  },
];

export default function StatusStepper({
  currentStage,
  status,
  submissionDate = "12 May 2026",
  deficiencyCount = 0,
}: StatusStepperProps) {
  const currentIndex = STAGES.findIndex((s) => s.stage === currentStage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Live Fellowship Verification Checkpoints
            </h3>
            {status === "DEFICIENT" ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Action Required: Deficiency Pending
              </span>
            ) : status === "SANCTIONED" ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Grant Sanctioned
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                Under Active Processing
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Multi-tier verification tracking across Ministry of Tribal Affairs inspection desks
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
          Registered: <span className="font-bold text-slate-800">{submissionDate}</span>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="relative">
        {/* Desktop Progress Connector Line */}
        <div className="hidden lg:block absolute top-6 left-12 right-12 h-1 bg-slate-200/80 -z-0 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 transition-all duration-700 rounded-full"
            style={{
              width: `${(Math.max(0, currentIndex) / (STAGES.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
          {STAGES.map((s, idx) => {
            const isCompleted = idx < currentIndex || (idx === currentIndex && status === "SANCTIONED");
            const isCurrent = idx === currentIndex && status !== "SANCTIONED";
            const isDeficient = isCurrent && status === "DEFICIENT";

            return (
              <div
                key={s.stage}
                className={`flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-3.5 p-3 rounded-2xl transition-all duration-200 ${
                  isCurrent
                    ? "bg-slate-50/90 border border-slate-200 lg:border-transparent lg:bg-transparent"
                    : "opacity-90"
                }`}
              >
                {/* Circle Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-all shadow-sm ${
                    isCompleted
                      ? "bg-emerald-600 text-white shadow-emerald-600/20"
                      : isDeficient
                      ? "bg-amber-500 text-white ring-4 ring-amber-400/20 animate-pulse shadow-amber-500/20"
                      : isCurrent
                      ? "bg-[#0a2540] text-white ring-4 ring-blue-500/20 shadow-slate-900/20"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : isDeficient ? (
                    <AlertTriangle className="w-6 h-6 text-white" />
                  ) : isCurrent ? (
                    <span className="font-extrabold text-sm">{idx + 1}</span>
                  ) : (
                    <span className="font-bold text-sm">{idx + 1}</span>
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 lg:mt-1">
                  <div
                    className={`text-xs font-extrabold leading-tight tracking-tight ${
                      isCompleted
                        ? "text-emerald-800"
                        : isDeficient
                        ? "text-amber-800"
                        : isCurrent
                        ? "text-[#0a2540]"
                        : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {s.office}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                    {s.desc}
                  </div>

                  {isDeficient && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300">
                      <span>Action Required</span>
                    </div>
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
