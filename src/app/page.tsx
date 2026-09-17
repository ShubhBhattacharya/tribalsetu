"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Building2, 
  FileCheck2, 
  Sliders, 
  Award, 
  Users, 
  IndianRupee,
  Layers,
  FileSearch,
  ExternalLink
} from "lucide-react";
import { MOCK_USERS } from "@/lib/auth";

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#0a2540] via-[#0d3154] to-[#0a2540] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ministry of Tribal Affairs • Government of India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Tribal<span className="text-emerald-400">Setu</span>: Unified AI-Enabled Scholarship & Fellowship Management System
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Empowering Scheduled Tribe researchers and students across India and abroad with automated optical document verification, transparent merit ranking, and swift direct DBT disbursals.
          </p>

          {/* Quick Persona Launchpads for Evaluator */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
              Fast Evaluator Quick-Access Roles:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/student/dashboard"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left backdrop-blur-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300">1. Student Applicant</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-white mt-1">Birsa Munda</div>
                <div className="text-[11px] text-slate-300">Has Flagged Deficiency • Stepper</div>
              </Link>

              <Link
                href="/officer/scrutiny"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left backdrop-blur-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">2. MoTA Officer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-white mt-1">Dr. Rajesh Verma</div>
                <div className="text-[11px] text-slate-300">Split-Screen Scrutiny Workbench</div>
              </Link>

              <Link
                href="/admin/analytics"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left backdrop-blur-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">3. MoTA Admin</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-white mt-1">Smt. Sunita Murmu</div>
                <div className="text-[11px] text-slate-300">Rule Engine & Merit Engine</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Key Performance Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">880+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applications</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Across 22 States</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">?48.6 Cr</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sanctioned Disbursals</div>
            <div className="text-[11px] text-slate-500 font-medium">Direct DBT into Aadhaar bank</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">850</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Scheme Slots</div>
            <div className="text-[11px] text-slate-500 font-medium">750 NFST + 100 NOS</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-700">97.4%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">OCR Accuracy Rate</div>
            <div className="text-[11px] text-slate-500 font-medium">Zero Manual Transcription</div>
          </div>
        </div>
      </section>

      {/* 3. Core Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Flagship Programs</span>
          <h2 className="text-2xl font-bold text-slate-900">MoTA Higher Education Fellowship Schemes</h2>
          <p className="text-xs text-slate-500">Fully digital application and optical verification pipelines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scheme 1: NFST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                  Domestic Fellowship • NFST
                </span>
                <span className="text-xs text-slate-500 font-medium">750 Slots / Year</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                National Fellowship for Higher Education of ST Students
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supports Scheduled Tribe scholars pursuing regular and full-time M.Phil. and Ph.D. degrees in Sciences, Humanities, Social Sciences, and Engineering in Indian Universities, IITs, and Central Institutes.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div><strong>Stipend:</strong> ?38,800/month JRF (?42,000/month SRF) + HRA</div>
                <div><strong>Contingency:</strong> ?10,000 - ?20,500/year</div>
                <div><strong>Eligibility:</strong> ST Category, &le; ?8 Lakh Family Income, &ge; 55% in Post-Graduation</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/student/apply"
                className="text-xs font-bold text-[#0a2540] hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Apply for NFST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400">Deadline: 30 Nov 2026</span>
            </div>
          </div>

          {/* Scheme 2: NOS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">
                  Overseas Scholarship • NOS
                </span>
                <span className="text-xs text-slate-500 font-medium">100 Slots / Year</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                National Overseas Scholarship for ST Candidates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides financial assistance to selected ST candidates for pursuing Master&apos;s level courses, Ph.D., and Post-Doctoral research in accredited institutions ranked within the Top 500 in QS World University Rankings.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div><strong>Coverage:</strong> 100% Tuition Fees + Visa & Economy Airfare</div>
                <div><strong>Living Allowance:</strong> £9,900 / $15,400 per annum</div>
                <div><strong>Eligibility:</strong> ST Category, &le; ?8 Lakh Family Income, &ge; 60% in qualifying degree, Top 500 QS Rank</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/student/apply"
                className="text-xs font-bold text-[#0a2540] hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Apply for NOS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400">Deadline: 31 Oct 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features & Technology Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Architecture & Capabilities</span>
          <h2 className="text-2xl font-bold text-slate-900">Enterprise AI GovTech Workflow</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">AI Optical OCR Pipeline</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Extracts revenue authority seals, candidate name, date of issue, and income figures with optical bounding box visualization.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Split-Screen Scrutiny Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Interactive split pane comparing original PDF certificates alongside AI extracted metadata with instant discrepancy template triggers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Dynamic Rule Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Define income caps, cutoff percentages, and validity limits dynamically with real-time pass/flag database simulation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Composite Merit Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Algorithmic scoring `(0.4 × Academics) + (0.4 × QS/NIRF) + (0.2 × Socio-Economic)` producing exportable gazette rankings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
