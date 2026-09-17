"use client";

import React, { useState, useMemo } from "react";
import { 
  Award, 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  Building2, 
  IndianRupee,
  Search,
  Filter
} from "lucide-react";
import { computeCompositeMerit } from "@/lib/merit-calculator";

interface MeritCandidate {
  id: string;
  rank: number;
  name: string;
  applicationNo: string;
  scheme: "NFST" | "NOS";
  tribalGroup: string;
  state: string;
  academicScore: number;
  univName: string;
  univRanking: number;
  annualIncome: number;
  status: "APPROVED" | "SANCTIONED" | "SELECTED";
}

const INITIAL_CANDIDATES: Omit<MeritCandidate, "rank">[] = [
  {
    id: "c-1",
    name: "Shanti Oraon",
    applicationNo: "NOS-2026-0118",
    scheme: "NOS",
    tribalGroup: "Oraon",
    state: "Odisha",
    academicScore: 86.5,
    univName: "University of Oxford",
    univRanking: 4,
    annualIncome: 180000,
    status: "APPROVED",
  },
  {
    id: "c-2",
    name: "Arjun Gond",
    applicationNo: "NFST-2026-0419",
    scheme: "NFST",
    tribalGroup: "Gond",
    state: "Madhya Pradesh",
    academicScore: 81.2,
    univName: "IIT Delhi",
    univRanking: 2,
    annualIncome: 320000,
    status: "SANCTIONED",
  },
  {
    id: "c-3",
    name: "Rani Khasi",
    applicationNo: "NOS-2026-0095",
    scheme: "NOS",
    tribalGroup: "Khasi",
    state: "Meghalaya",
    academicScore: 79.0,
    univName: "Imperial College London",
    univRanking: 6,
    annualIncome: 450000,
    status: "SELECTED",
  },
  {
    id: "c-4",
    name: "Birsa Munda",
    applicationNo: "NFST-2026-0842",
    scheme: "NFST",
    tribalGroup: "Santhal",
    state: "Jharkhand",
    academicScore: 78.5,
    univName: "Jawaharlal Nehru University",
    univRanking: 12,
    annualIncome: 240000,
    status: "APPROVED",
  },
  {
    id: "c-5",
    name: "Kartik Bhil",
    applicationNo: "NFST-2026-0921",
    scheme: "NFST",
    tribalGroup: "Bhil",
    state: "Rajasthan",
    academicScore: 74.0,
    univName: "Banaras Hindu University (BHU)",
    univRanking: 5,
    annualIncome: 210000,
    status: "SELECTED",
  },
];

export default function AdminMeritPage() {
  const [schemeFilter, setSchemeFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sanctionNotice, setSanctionNotice] = useState<string | null>(null);

  // Dynamic Weights
  const [wAcademic, setWAcademic] = useState(0.4);
  const [wUniv, setWUniv] = useState(0.4);
  const [wSocio, setWSocio] = useState(0.2);

  // Compute composite merit scores and sort ranking
  const rankedCandidates = useMemo(() => {
    const list = INITIAL_CANDIDATES.map((cand) => {
      const result = computeCompositeMerit(
        cand.academicScore,
        cand.univRanking,
        cand.annualIncome,
        cand.scheme,
        cand.tribalGroup,
        {
          academicWeight: wAcademic,
          universityWeight: wUniv,
          socioEconomicWeight: wSocio,
        }
      );

      return {
        ...cand,
        meritScore: result.meritScore,
        breakdown: result.breakdown,
      };
    });

    // Sort by meritScore descending
    list.sort((a, b) => b.meritScore - a.meritScore);

    return list.map((cand, idx) => ({
      ...cand,
      rank: idx + 1,
    }));
  }, [wAcademic, wUniv, wSocio]);

  const filteredCandidates = rankedCandidates.filter((cand) => {
    const matchesScheme = schemeFilter === "ALL" || cand.scheme === schemeFilter;
    const matchesSearch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.tribalGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesScheme && matchesSearch;
  });

  const exportCSV = () => {
    const headers = "Rank,ApplicationNo,Name,Scheme,Tribe,State,AcademicScore,University,AnnualIncome,MeritScore,Status\n";
    const rows = filteredCandidates
      .map(
        (c) =>
          `${c.rank},${c.applicationNo},"${c.name}",${c.scheme},${c.tribalGroup},${c.state},${c.academicScore}%,"${c.univName}",${c.annualIncome},${c.meritScore},${c.status}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `MoTA_Official_Merit_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSanctionAll = () => {
    setSanctionNotice("Top ranked eligible candidates have been queued for Direct Benefit Transfer (DBT) sanction via PFMS Treasury.");
    setTimeout(() => setSanctionNotice(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>MoTA Merit Computation Engine & Selection Gazette</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Formula: (0.4 × Acad) + (0.4 × Univ) + (0.2 × Socio)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent algorithmic ranking based on Academic Excellence, Institution Global Tier, and Affirmative Socio-Economic Criteria
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Gazette</span>
          </button>
          <button
            onClick={handleSanctionAll}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sanction Top Pool</span>
          </button>
        </div>
      </div>

      {/* Sanction Alert */}
      {sanctionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{sanctionNotice}</span>
          </div>
          <button onClick={() => setSanctionNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            ?
          </button>
        </div>
      )}

      {/* Filter and Formula Weightage Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search candidate name, App ID, tribe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Scheme filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-medium">Scheme:</span>
          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg bg-white font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Schemes</option>
            <option value="NFST">NFST (India PhD)</option>
            <option value="NOS">NOS (Overseas)</option>
          </select>
        </div>

        {/* Dynamic Weight Indicators */}
        <div className="hidden lg:flex items-center space-x-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px]">
          <span className="text-slate-400 font-medium">Active Formula:</span>
          <span className="text-emerald-700 font-bold">Acad: {Math.round(wAcademic * 100)}%</span>
          <span className="text-blue-700 font-bold">Univ: {Math.round(wUniv * 100)}%</span>
          <span className="text-amber-700 font-bold">Socio: {Math.round(wSocio * 100)}%</span>
        </div>
      </div>

      {/* Merit Leaderboard Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#0a2540] text-white text-[11px] font-bold">
              <tr>
                <th className="text-center p-3.5 w-16">Rank</th>
                <th className="text-left p-3.5">Candidate Name</th>
                <th className="text-left p-3.5">Scheme</th>
                <th className="text-left p-3.5">Tribe & Domicile</th>
                <th className="text-left p-3.5">University & Tier</th>
                <th className="text-left p-3.5">Score Breakdown</th>
                <th className="text-center p-3.5">Composite Merit</th>
                <th className="text-right p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((cand) => {
                const isTopRank = cand.rank === 1;
                const isSecond = cand.rank === 2;
                const isThird = cand.rank === 3;

                return (
                  <tr key={cand.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 text-center font-bold">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono ${
                          isTopRank
                            ? "bg-amber-400 text-amber-950 ring-2 ring-amber-300 font-extrabold"
                            : isSecond
                            ? "bg-slate-200 text-slate-800 font-bold"
                            : isThird
                            ? "bg-amber-100 text-amber-800 font-bold"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        #{cand.rank}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{cand.name}</span>
                        {isTopRank && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold border border-amber-300">
                            ? State Topper
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">{cand.applicationNo}</div>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          cand.scheme === "NOS"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {cand.scheme}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{cand.tribalGroup} Tribe</div>
                      <div className="text-[11px] text-slate-500">{cand.state}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{cand.univName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {cand.scheme === "NOS" ? `QS World Rank #${cand.univRanking}` : `NIRF India Rank #${cand.univRanking}`}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <div>Acad ({cand.academicScore}%): <strong className="text-slate-800">{cand.breakdown.academicPoints} pts</strong></div>
                        <div>Univ Rank: <strong className="text-slate-800">{cand.breakdown.univPoints} pts</strong></div>
                        <div>Socio-Econ: <strong className="text-slate-800">{cand.breakdown.socioPoints} pts</strong></div>
                      </div>
                    </td>

                    <td className="p-3.5 text-center">
                      <div className="text-base font-extrabold text-emerald-700 font-mono">
                        {cand.meritScore}
                      </div>
                      <div className="text-[10px] text-slate-400">/ 100.0 pts</div>
                    </td>

                    <td className="p-3.5 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          cand.status === "SANCTIONED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : cand.status === "APPROVED"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}
                      >
                        {cand.status}
                      </span>
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
