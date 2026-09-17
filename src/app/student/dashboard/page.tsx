"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Calendar, 
  IndianRupee, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Download,
  CreditCard,
  Landmark,
  BadgeCheck,
  ChevronRight
} from "lucide-react";
import StatusStepper from "@/components/student/StatusStepper";
import { ApplicationItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const isShanti = currentUser?.id === "usr_student_shanti";

  const [activeApplication, setActiveApplication] = useState<ApplicationItem>({
    id: isShanti ? "app-2" : "app-1",
    applicationNo: isShanti ? "NOS-2026-0042" : "NFST-2026-0842",
    userId: isShanti ? "usr_student_shanti" : "usr_student_birsa",
    schemeId: isShanti ? "sch_nos" : "sch_nfst",
    status: isShanti ? "APPROVED" : "DEFICIENT",
    currentStage: isShanti ? "Sanctioned" : "Scrutiny",
    academicScore: isShanti ? 91.2 : 78.5,
    univRanking: isShanti ? 3 : 12,
    univName: isShanti ? "University of Oxford, United Kingdom" : "Jawaharlal Nehru University, New Delhi",
    degreeProgram: isShanti ? "Ph.D. in Genomic Epidemiology of Endemic Diseases" : "Ph.D. in Environmental Anthropology",
    researchTopic: isShanti ? "Genetic Markers of Sickle Cell Trait in Central Indian Tribes" : "Indigenous Forest Conservation Practices in Chota Nagpur Plateau",
    meritScore: isShanti ? 94.6 : 82.4,
    annualIncome: isShanti ? 380000 : 240000,
    tribalGroup: isShanti ? "Oraon" : "Santhal",
    state: isShanti ? "Odisha" : "Jharkhand",
    flags: isShanti ? [] : ["EXPIRED_DOCUMENT"],
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
  });

  const [hasDeficiency, setHasDeficiency] = useState(!isShanti);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Hero Scholar Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#046a38] text-white p-7 sm:p-9 shadow-xl border border-slate-700/30">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/2 -top-16 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            {/* Avatar Pill with Gold Border */}
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-[#0a2540] flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-white/20">
                {isShanti ? "SO" : "BM"}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0a2540] flex items-center justify-center text-white text-xs" title="Verified Scholar">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {isShanti ? "Shanti Oraon" : "Birsa Munda"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-300" />
                  {t('verifiedScholar')}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                <span>{t('recognizedTribe')}: <strong className="text-white">{isShanti ? "Oraon" : "Santhal"}</strong></span>
                <span>•</span>
                <span>{t('stateDomicile')}: <strong className="text-white">{isShanti ? "Odisha" : "Jharkhand"}</strong></span>
                <span>•</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px] text-slate-200">
                  Aadhaar: {isShanti ? "XXXX-XXXX-9921" : "XXXX-XXXX-8492"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/student/apply"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-xs font-extrabold transition shadow-lg shadow-emerald-900/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t('applyNewScheme')}</span>
            </Link>
          </div>
        </div>

        {/* Financial Grant Summary Chips */}
        <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 font-bold">
              ₹
            </div>
            <div>
              <div className="text-[11px] text-slate-300 font-medium">{t('monthlyStipend')}</div>
              <div className="text-base font-black text-white">₹38,800 <span className="text-[11px] font-normal text-emerald-300">/ month + HRA</span></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 font-bold">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-300 font-medium">{t('annualContingency')}</div>
              <div className="text-base font-black text-white">₹20,500 <span className="text-[11px] font-normal text-amber-300">/ year</span></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 shrink-0 font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[11px] text-slate-300 font-medium">{t('researchInstitution')}</div>
              <div className="text-sm font-bold text-white truncate">JNU New Delhi (NIRF #12)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. High-Impact Deficiency Action Center Banner */}
      {hasDeficiency && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-amber-50/90 to-amber-100/70 border-2 border-amber-400/80 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30 mt-0.5 ring-4 ring-amber-200/60">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-amber-950 uppercase tracking-wide">
                    {t('deficiencyActionTitle')}
                  </h3>
                  <span className="font-mono text-[11px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    App: {activeApplication.applicationNo}
                  </span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {t('deficiencyOfficerNote')}{' '}
                  <span className="font-bold text-slate-950 bg-amber-200/80 px-1.5 py-0.5 rounded ml-1 border border-amber-300">
                    {t('deficiencyReasonText')}
                  </span>
                </p>
                <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1.5 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('deficiencyDeadlineNote')}</span>
                </div>
              </div>
            </div>

            <Link
              href="/student/deficiencies"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-900/25 flex items-center gap-2.5 shrink-0 hover:scale-[1.03] active:scale-[0.98] border border-amber-500/40"
            >
              <span>{t('resolveButtonText')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* 3. Live Application Status Stepper */}
      <StatusStepper
        currentStage={activeApplication.currentStage}
        status={activeApplication.status}
        submissionDate="12 May 2026"
        deficiencyCount={hasDeficiency ? 1 : 0}
      />

      {/* 4. Active Application Details & Direct Benefit Transfer Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fellowship Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Active Scholarship Award
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                National Fellowship for Higher Education of ST Students (NFST)
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs bg-slate-100 px-3 py-1 rounded-lg font-bold text-slate-700 border border-slate-200">
                {activeApplication.applicationNo}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                {activeApplication.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Academic Discipline</span>
              <div className="font-extrabold text-slate-800">{activeApplication.degreeProgram}</div>
              <div className="text-slate-500 text-[11px]">{activeApplication.univName}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Doctoral Research Topic</span>
              <div className="font-bold text-slate-800 italic line-clamp-2">
                &quot;{activeApplication.researchTopic}&quot;
              </div>
            </div>
          </div>
        </div>

        {/* DBT PFMS Banking Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>{t('dbtTrackerTitle')}</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {t('aadhaarLinkedBank')}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Bank Name:</span>
                <strong className="text-slate-800">State Bank of India</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Account Number:</span>
                <strong className="font-mono text-slate-800">XXXX-XXXX-4109</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IFSC Code:</span>
                <strong className="font-mono text-slate-800">SBIN0001042</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>PFMS Beneficiary ID:</span>
                <strong className="font-mono text-emerald-700">JH_ST_98129</strong>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Digital Scholar ID Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Available MoTA Higher Education Schemes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#0a2540]" />
              <span>MoTA Higher Education Fellowship Schemes</span>
            </h2>
            <p className="text-xs text-slate-500">Official Ministry of Tribal Affairs Fellowship Programs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scheme 1: NFST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                Domestic Fellowship (India PhD)
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Deadline: 30 Nov 2026
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                National Fellowship for Higher Education of ST Students (NFST)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                750 annual fellowships for Scheduled Tribe scholars pursuing M.Phil. & Ph.D. degrees in premier Indian universities, IITs, and Central Institutes.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Monthly JRF Stipend:</span>
                <div className="font-black text-slate-900">₹38,800 + HRA</div>
              </div>
              <span className="text-xs text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                Currently Enrolled
              </span>
            </div>
          </div>

          {/* Scheme 2: NOS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-purple-50 text-purple-800 border border-purple-200">
                Overseas Scholarship (Abroad Studies)
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Deadline: 31 Oct 2026
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                National Overseas Scholarship for ST Candidates (NOS)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                100 annual scholarships for Master&apos;s, Ph.D., and Post-Doctoral studies in accredited foreign universities ranked within the Top 500 QS World Rankings.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Coverage:</span>
                <div className="font-black text-slate-900">100% Tuition + £9,900/yr Living</div>
              </div>
              <Link
                href="/student/apply"
                className="text-xs text-[#0a2540] hover:text-emerald-700 font-extrabold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                <span>Apply for NOS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
