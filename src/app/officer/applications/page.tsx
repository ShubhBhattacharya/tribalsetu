"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileCheck2, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap
} from "lucide-react";
import { ApplicationItem, ApplicationStatus } from "@/types";

const ALL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-1",
    applicationNo: "NFST-2026-0842",
    userId: "usr_student_birsa",
    user: {
      id: "usr_student_birsa",
      name: "Birsa Munda",
      email: "birsa.munda@scholar.in",
      role: "STUDENT",
      tribalGroup: "Santhal",
      state: "Jharkhand",
      annualIncome: 240000,
    },
    schemeId: "sch_nfst",
    scheme: {
      id: "sch_nfst",
      code: "NFST",
      title: "National Fellowship for Higher Education of ST Students",
      description: "Domestic PhD/M.Phil",
      type: "DOMESTIC_FELLOWSHIP",
      eligibilityRules: { maxAnnualIncome: 800000, minAcademicScore: 55, maxDocValidityMonths: 12, eligibleDegrees: ["Ph.D."] },
      deadline: "2026-11-30",
      budget: 650000000,
      totalSlots: 750,
      isActive: true,
    },
    status: "DEFICIENT",
    currentStage: "Scrutiny",
    academicScore: 78.5,
    univRanking: 12,
    univName: "Jawaharlal Nehru University, New Delhi",
    degreeProgram: "Ph.D. in Environmental Anthropology",
    annualIncome: 240000,
    tribalGroup: "Santhal",
    state: "Jharkhand",
    meritScore: 82.4,
    flags: ["EXPIRED_DOCUMENT"],
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
  },
  {
    id: "app-2",
    applicationNo: "NOS-2026-0118",
    userId: "usr_student_shanti",
    user: {
      id: "usr_student_shanti",
      name: "Shanti Oraon",
      email: "shanti.oraon@scholar.in",
      role: "STUDENT",
      tribalGroup: "Oraon",
      state: "Odisha",
      annualIncome: 180000,
    },
    schemeId: "sch_nos",
    scheme: {
      id: "sch_nos",
      code: "NOS",
      title: "National Overseas Scholarship for ST Candidates",
      description: "Overseas PhD in Top 500 QS Universities",
      type: "OVERSEAS_SCHOLARSHIP",
      eligibilityRules: { maxAnnualIncome: 800000, minAcademicScore: 60, maxQsRanking: 500, maxDocValidityMonths: 12, eligibleDegrees: ["Ph.D."] },
      deadline: "2026-10-31",
      budget: 450000000,
      totalSlots: 100,
      isActive: true,
    },
    status: "VERIFIED",
    currentStage: "Scrutiny",
    academicScore: 86.5,
    univRanking: 4,
    univName: "University of Oxford",
    degreeProgram: "DPhil in Anthropology",
    annualIncome: 180000,
    tribalGroup: "Oraon",
    state: "Odisha",
    meritScore: 92.4,
    flags: [],
    createdAt: "2026-05-18T09:00:00Z",
    updatedAt: "2026-09-17T12:00:00Z",
  },
  {
    id: "app-3",
    applicationNo: "NFST-2026-0419",
    userId: "usr_student_arjun",
    user: {
      id: "usr_student_arjun",
      name: "Arjun Gond",
      email: "arjun.gond@scholar.in",
      role: "STUDENT",
      tribalGroup: "Gond",
      state: "Madhya Pradesh",
      annualIncome: 320000,
    },
    schemeId: "sch_nfst",
    scheme: {
      id: "sch_nfst",
      code: "NFST",
      title: "National Fellowship for Higher Education of ST Students",
      description: "Domestic PhD/M.Phil",
      type: "DOMESTIC_FELLOWSHIP",
      eligibilityRules: { maxAnnualIncome: 800000, minAcademicScore: 55, maxDocValidityMonths: 12, eligibleDegrees: ["Ph.D."] },
      deadline: "2026-11-30",
      budget: 650000000,
      totalSlots: 750,
      isActive: true,
    },
    status: "SANCTIONED",
    currentStage: "Sanctioned",
    academicScore: 81.2,
    univRanking: 2,
    univName: "IIT Delhi",
    degreeProgram: "Ph.D. in Renewable Energy",
    annualIncome: 320000,
    tribalGroup: "Gond",
    state: "Madhya Pradesh",
    meritScore: 88.48,
    flags: [],
    createdAt: "2026-04-10T08:00:00Z",
    updatedAt: "2026-09-15T14:30:00Z",
  },
  {
    id: "app-4",
    applicationNo: "NOS-2026-0095",
    userId: "usr_student_rani",
    user: {
      id: "usr_student_rani",
      name: "Rani Khasi",
      email: "rani.khasi@scholar.in",
      role: "STUDENT",
      tribalGroup: "Khasi",
      state: "Meghalaya",
      annualIncome: 450000,
    },
    schemeId: "sch_nos",
    scheme: {
      id: "sch_nos",
      code: "NOS",
      title: "National Overseas Scholarship for ST Candidates",
      description: "Overseas PhD",
      type: "OVERSEAS_SCHOLARSHIP",
      eligibilityRules: { maxAnnualIncome: 800000, minAcademicScore: 60, maxQsRanking: 500, maxDocValidityMonths: 12, eligibleDegrees: ["Master's Degree"] },
      deadline: "2026-10-31",
      budget: 450000000,
      totalSlots: 100,
      isActive: true,
    },
    status: "SUBMITTED",
    currentStage: "OCR Verified",
    academicScore: 79.0,
    univRanking: 6,
    univName: "Imperial College London",
    degreeProgram: "MSc in Environmental Engineering",
    annualIncome: 450000,
    tribalGroup: "Khasi",
    state: "Meghalaya",
    meritScore: 85.2,
    flags: [],
    createdAt: "2026-06-01T11:00:00Z",
    updatedAt: "2026-09-16T16:00:00Z",
  },
  {
    id: "app-5",
    applicationNo: "NFST-2026-0921",
    userId: "usr_student_kartik",
    user: {
      id: "usr_student_kartik",
      name: "Kartik Bhil",
      email: "kartik.bhil@scholar.in",
      role: "STUDENT",
      tribalGroup: "Bhil",
      state: "Rajasthan",
      annualIncome: 210000,
    },
    schemeId: "sch_nfst",
    scheme: {
      id: "sch_nfst",
      code: "NFST",
      title: "National Fellowship for Higher Education of ST Students",
      description: "Domestic PhD",
      type: "DOMESTIC_FELLOWSHIP",
      eligibilityRules: { maxAnnualIncome: 800000, minAcademicScore: 55, maxDocValidityMonths: 12, eligibleDegrees: ["Ph.D."] },
      deadline: "2026-11-30",
      budget: 650000000,
      totalSlots: 750,
      isActive: true,
    },
    status: "APPROVED",
    currentStage: "Selection",
    academicScore: 74.0,
    univRanking: 5,
    univName: "Banaras Hindu University (BHU)",
    degreeProgram: "Ph.D. in Botany",
    annualIncome: 210000,
    tribalGroup: "Bhil",
    state: "Rajasthan",
    meritScore: 81.1,
    flags: [],
    createdAt: "2026-05-20T14:10:00Z",
    updatedAt: "2026-09-14T09:45:00Z",
  },
];

export default function OfficerApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [schemeFilter, setSchemeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApps = ALL_APPLICATIONS.filter((app) => {
    const matchesSearch =
      app.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tribalGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesScheme = schemeFilter === "ALL" || app.scheme?.code === schemeFilter;
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;

    return matchesSearch && matchesScheme && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <span>MoTA Scrutiny Desk: Master Application Queue</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time scrutiny status, OCR anomaly tracking, and verification routing
          </p>
        </div>

        <Link
          href="/officer/scrutiny"
          className="px-4 py-2 bg-[#0a2540] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1.5"
        >
          <span>Open Split-Screen Workbench</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search candidate name, App ID, tribe, state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Scheme filter */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Scheme:</span>
          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg bg-white font-medium focus:outline-hidden"
          >
            <option value="ALL">All Schemes</option>
            <option value="NFST">NFST (India PhD)</option>
            <option value="NOS">NOS (Overseas)</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg bg-white font-medium focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="VERIFIED">OCR Verified</option>
            <option value="DEFICIENT">Deficient / Flagged</option>
            <option value="APPROVED">Approved</option>
            <option value="SANCTIONED">Sanctioned</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="text-left p-3.5">Application No</th>
                <th className="text-left p-3.5">Candidate & Tribe</th>
                <th className="text-left p-3.5">Scheme & University</th>
                <th className="text-left p-3.5">Income (INR)</th>
                <th className="text-left p-3.5">Academic / Merit</th>
                <th className="text-left p-3.5">Status & AI Flags</th>
                <th className="text-right p-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => {
                const isDeficient = app.status === "DEFICIENT";
                const isApproved = app.status === "APPROVED" || app.status === "SANCTIONED";

                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 font-mono font-bold text-slate-800">
                      {app.applicationNo}
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{app.user?.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {app.tribalGroup} Tribe • {app.state}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <span className="font-bold text-[#0a2540]">{app.scheme?.code}:</span>
                        <span className="truncate max-w-[200px]">{app.univName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                        {app.degreeProgram}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      ?{app.annualIncome.toLocaleString("en-IN")}
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{app.academicScore}% Score</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        Merit: {app.meritScore} pts
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            isDeficient
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : isApproved
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {app.status}
                        </span>

                        {app.flags && app.flags.length > 0 && (
                          <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                            Flag: {app.flags[0]}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <Link
                        href="/officer/scrutiny"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0a2540] hover:bg-slate-800 text-white rounded text-xs font-bold transition shadow-xs"
                      >
                        <span>Scrutinize</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
