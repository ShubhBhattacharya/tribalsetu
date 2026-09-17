"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink
} from "lucide-react";
import StatusStepper from "@/components/student/StatusStepper";
import { ApplicationItem, ApplicationStage, ApplicationStatus } from "@/types";

export default function StudentDashboard() {
  const [activeApplication, setActiveApplication] = useState<ApplicationItem>({
    id: "app-1",
    applicationNo: "NFST-2026-0842",
    userId: "usr_student_birsa",
    schemeId: "sch_nfst",
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
  });

  const [hasDeficiency, setHasDeficiency] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Welcome & Domicile Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0a2540] to-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300">
            BM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Welcome, Birsa Munda</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                Verified ST Scholar
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tribe: <strong className="text-slate-700">Santhal</strong> • Domicile: <strong className="text-slate-700">Jharkhand</strong> • Aadhaar: <span className="font-mono">XXXX-XXXX-8492</span>
            </p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/student/apply"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply for New Scheme</span>
          </Link>
        </div>
      </div>

      {/* 2. Urgent Deficiency Alert Banner (if any) */}
      {hasDeficiency && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Deficiency Action Required for Application {activeApplication.applicationNo}
                </h3>
                <p className="text-xs text-amber-800 mt-1 max-w-2xl leading-relaxed">
                  The MoTA Scrutiny Officer flagged an issue during Optical Document Verification: 
                  <strong> &quot;Income certificate older than 1 year - Re-upload valid PDF for current Financial Year 2026-27.&quot;</strong>
                </p>
                <div className="mt-2 text-[11px] text-amber-700 font-medium">
                  Please submit the rectified document to resume scrutiny. No penalty applied.
                </div>
              </div>
            </div>

            <Link
              href="/student/deficiencies"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>Resolve Deficiency Now</span>
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

      {/* 4. Active Application Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Active Application
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              National Fellowship for Higher Education of ST Students (NFST)
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs bg-slate-100 px-3 py-1 rounded-md font-bold text-slate-700 border border-slate-200">
              Ref: {activeApplication.applicationNo}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                activeApplication.status === "DEFICIENT"
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {activeApplication.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 text-xs">
            <div className="text-slate-400 font-medium">Institution & Program</div>
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>{activeApplication.univName}</span>
            </div>
            <div className="text-slate-600 pl-5">{activeApplication.degreeProgram}</div>
            <div className="text-[11px] text-slate-400 pl-5">NIRF Ranking: #{activeApplication.univRanking}</div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="text-slate-400 font-medium">Research Topic</div>
            <div className="font-medium text-slate-800 italic">
              &quot;{activeApplication.researchTopic}&quot;
            </div>
          </div>

          <div className="space-y-1 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-medium">Estimated Fellowship Entitlement</div>
            <div className="text-base font-extrabold text-emerald-700 flex items-center">
              <IndianRupee className="w-4 h-4" /> 38,800 / month
            </div>
            <div className="text-[10px] text-slate-500">
              + Contingency ?10,000 - ?20,500/year + HRA (Direct DBT via PFMS)
            </div>
          </div>
        </div>
      </div>

      {/* 5. Available MoTA Schemes Overview */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#0a2540]" />
          <span>MoTA Higher Education Schemes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scheme 1: NFST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                Domestic Fellowship
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Deadline: 30 Nov 2026
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              National Fellowship for Higher Education of ST Students (NFST)
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Provides 750 annual fellowships for Scheduled Tribe scholars pursuing M.Phil & Ph.D. degrees in top Indian universities, IITs, NITs, and Central Universities.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Monthly JRF Stipend:</span>
                <div className="font-bold text-slate-800">?38,800 + HRA</div>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                Currently Enrolled
              </span>
            </div>
          </div>

          {/* Scheme 2: NOS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                Overseas Fellowship
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Deadline: 31 Oct 2026
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              National Overseas Scholarship for ST Candidates (NOS)
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Supports 100 meritorious ST students per year for Master&apos;s, Ph.D., and Post-Doctoral studies in top 500 QS world-ranked foreign universities.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Total Coverage:</span>
                <div className="font-bold text-slate-800">100% Tuition + £9,900/yr Living</div>
              </div>
              <Link
                href="/student/apply"
                className="text-xs text-[#0a2540] hover:text-emerald-700 font-bold flex items-center gap-1"
              >
                Apply for NOS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
