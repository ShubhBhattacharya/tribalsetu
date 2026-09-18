"use client";

import React from "react";
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { ApplicationStage, ApplicationStatus } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface StatusStepperProps {
  currentStage: ApplicationStage;
  status: ApplicationStatus;
  submissionDate?: string;
  deficiencyCount?: number;
}

export default function StatusStepper({
  currentStage,
  status,
  submissionDate = "12 May 2026",
  deficiencyCount = 0,
}: StatusStepperProps) {
  const { t } = useLanguage();

  const STAGES: { stage: ApplicationStage; label: string; office: string; desc: string }[] = [
    { 
      stage: "Submitted", 
      label: t('stageSubmitted') || "आवेदन जमा (Submitted)", 
      office: "नागरिक पोर्टल",
      desc: "आधार ई-केवाईसी द्वारा डिजिटल रूप से सत्यापित एवं पंजीकृत।" 
    },
    { 
      stage: "OCR Verified", 
      label: t('stageOcr') || "एआई ओसीआर (AI Verified)", 
      office: "MoTA AI इंजन",
      desc: "ऑप्टिकल निष्कर्षण द्वारा राजस्व मुहर एवं आय सीमा की स्वतः जांच पूर्ण।" 
    },
    { 
      stage: "Scrutiny", 
      label: t('stageScrutiny') || "अधिकारी संवीक्षा (Scrutiny)", 
      office: "संवीक्षा डेस्क, नई दिल्ली",
      desc: "सत्यापन अधिकारी द्वारा दस्तावेज़ों एवं पात्रता की गहन जांच।" 
    },
    { 
      stage: "Selection", 
      label: t('stageSelection') || "मेरिट चयन (Merit Board)", 
      office: "राष्ट्रीय चयन मंडल",
      desc: "अकादमिक स्कोर व विश्वविद्यालय रैंकिंग के आधार पर मेरिट गणना।" 
    },
    { 
      stage: "Sanctioned", 
      label: t('stageSanctioned') || "स्वीकृत व संवितरित (Sanctioned)", 
      office: "केंद्रीय कोषागार / PFMS",
      desc: "छात्रवृत्ति स्वीकृति आदेश निर्गत एवं बैंक खाते में डीबीटी सक्रिय।" 
    },
  ];

  const currentIndex = STAGES.findIndex((s) => s.stage === currentStage);
  const activeStep = STAGES[currentIndex] || STAGES[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            आवेदन प्रगति स्थिति (Application Progress)
          </span>
        </div>

        <div>
          {status === "DEFICIENT" ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>कमियां लंबित (Action Required)</span>
            </span>
          ) : status === "SANCTIONED" ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>स्वीकृत एवं संवितरित (Sanctioned)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>प्रक्रियाधीन (In Scrutiny)</span>
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Visual Stepper */}
      <div className="relative pt-2 pb-1">
        {/* Track Line */}
        <div className="absolute top-6 left-8 right-8 h-1 bg-slate-100 rounded-full hidden sm:block">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
            style={{
              width: `${(Math.max(0, currentIndex) / (STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* 5 Step Icons */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 relative z-10 text-center">
          {STAGES.map((s, idx) => {
            const isCompleted = idx < currentIndex || (idx === currentIndex && status === "SANCTIONED");
            const isCurrent = idx === currentIndex && status !== "SANCTIONED";
            const isDeficient = isCurrent && status === "DEFICIENT";

            return (
              <div key={s.stage} className="flex flex-col items-center group">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white shadow-emerald-500/20"
                      : isDeficient
                      ? "bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse"
                      : isCurrent
                      ? "bg-[#0a2540] text-white ring-4 ring-slate-200"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isDeficient ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <span
                  className={`text-[11px] sm:text-xs font-bold mt-2 truncate max-w-full px-1 ${
                    isCompleted
                      ? "text-emerald-700 font-semibold"
                      : isCurrent
                      ? "text-slate-900 font-bold"
                      : "text-slate-400 font-normal"
                  }`}
                >
                  {s.label.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Highlight Card */}
      <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-xs sm:text-sm">
              वर्तमान चरण: {activeStep.label}
            </span>
            <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-medium">
              {activeStep.office}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs max-w-2xl">
            {activeStep.desc}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-slate-400 block text-[10px]">पंजीकरण तिथि</span>
          <span className="font-bold text-slate-800">{submissionDate}</span>
        </div>
      </div>
    </div>
  );
}
