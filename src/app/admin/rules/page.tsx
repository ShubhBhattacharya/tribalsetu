"use client";

import React, { useState } from "react";
import { 
  Sliders, 
  Save, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  IndianRupee, 
  Percent, 
  Calendar, 
  Award,
  Globe,
  Info
} from "lucide-react";

export default function RuleEngineConfigurator() {
  // Configurable Rules
  const [maxIncome, setMaxIncome] = useState<number>(800000);
  const [academicCutoffNFST, setAcademicCutoffNFST] = useState<number>(55);
  const [academicCutoffNOS, setAcademicCutoffNOS] = useState<number>(60);
  const [maxQsRank, setMaxQsRank] = useState<number>(500);
  const [docValidityMonths, setDocValidityMonths] = useState<number>(12);

  // Merit Weights (Total 100%)
  const [academicWeight, setAcademicWeight] = useState<number>(40);
  const [univWeight, setUnivWeight] = useState<number>(40);
  const [socioWeight, setSocioWeight] = useState<number>(20);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResults, setSimResults] = useState<{
    totalEvaluated: number;
    eligibleCount: number;
    flaggedCount: number;
    discrepancyBreakdown: { reason: string; count: number }[];
  } | null>(null);

  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Heuristic simulation based on current rules
      const total = 880;
      let flagged = 28;

      if (maxIncome < 800000) flagged += Math.round((800000 - maxIncome) / 15000);
      if (academicCutoffNFST > 55) flagged += Math.round((academicCutoffNFST - 55) * 8);
      if (academicCutoffNOS > 60) flagged += Math.round((academicCutoffNOS - 60) * 6);
      if (maxQsRank < 500) flagged += Math.round((500 - maxQsRank) / 20);
      if (docValidityMonths < 12) flagged += Math.round((12 - docValidityMonths) * 5);

      flagged = Math.min(350, Math.max(12, flagged));
      const eligible = total - flagged;

      setSimResults({
        totalEvaluated: total,
        eligibleCount: eligible,
        flaggedCount: flagged,
        discrepancyBreakdown: [
          { reason: "Income Exceeded Ceiling", count: Math.round(flagged * 0.45) },
          { reason: "Document Validity Expired", count: Math.round(flagged * 0.28) },
          { reason: "Academic Score below cutoff", count: Math.round(flagged * 0.17) },
          { reason: "QS University Rank ceiling exceeded", count: Math.round(flagged * 0.1) },
        ],
      });
      setIsSimulating(false);
    }, 800);
  };

  const handleSave = () => {
    setSaveNotice("Official Criteria successfully updated and committed to MoTA Live Rule Engine database.");
    setTimeout(() => setSaveNotice(null), 5000);
  };

  const handleReset = () => {
    setMaxIncome(800000);
    setAcademicCutoffNFST(55);
    setAcademicCutoffNOS(60);
    setMaxQsRank(500);
    setDocValidityMonths(12);
    setAcademicWeight(40);
    setUnivWeight(40);
    setSocioWeight(20);
    setSimResults(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#0a2540]" />
              <span>MoTA Dynamic Rule Engine Configurator</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
              No-Code Policy Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Define eligibility thresholds, optical document validation rules, and merit weightings without code changes
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="px-3 py-2 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Criteria
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {saveNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveNotice}</span>
          </div>
          <button onClick={() => setSaveNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            ?
          </button>
        </div>
      )}

      {/* 2. Rule Configuration Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel A: Eligibility Thresholds */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              1. Financial & Academic Eligibility Thresholds
            </h2>
            <p className="text-xs text-slate-500">Optical OCR verifies incoming certificates against these parameters</p>
          </div>

          {/* Rule 1: Max Annual Family Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                <span>Max Annual Family Income Ceiling:</span>
              </label>
              <span className="font-bold font-mono text-[#0a2540] bg-slate-100 px-2.5 py-0.5 rounded">
                ?{maxIncome.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={1500000}
              step={50000}
              value={maxIncome}
              onChange={(e) => setMaxIncome(Number(e.target.value))}
              className="w-full accent-[#0a2540] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>?3,00,000</span>
              <span>Default: ?8,00,000 (MoTA Ceiling)</span>
              <span>?15,00,000</span>
            </div>
          </div>

          {/* Rule 2: NFST Academic Cutoff */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-slate-400" />
                <span>Minimum Academic Cutoff (NFST Domestic PhD):</span>
              </label>
              <span className="font-bold font-mono text-[#0a2540] bg-slate-100 px-2.5 py-0.5 rounded">
                {academicCutoffNFST}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={75}
              step={1}
              value={academicCutoffNFST}
              onChange={(e) => setAcademicCutoffNFST(Number(e.target.value))}
              className="w-full accent-[#0a2540] cursor-pointer"
            />
          </div>

          {/* Rule 3: NOS Academic Cutoff */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-slate-400" />
                <span>Minimum Academic Cutoff (NOS Overseas):</span>
              </label>
              <span className="font-bold font-mono text-[#0a2540] bg-slate-100 px-2.5 py-0.5 rounded">
                {academicCutoffNOS}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={80}
              step={1}
              value={academicCutoffNOS}
              onChange={(e) => setAcademicCutoffNOS(Number(e.target.value))}
              className="w-full accent-[#0a2540] cursor-pointer"
            />
          </div>

          {/* Rule 4: QS Rank Threshold */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>University QS World Ranking Threshold (NOS):</span>
              </label>
              <span className="font-bold font-mono text-[#0a2540] bg-slate-100 px-2.5 py-0.5 rounded">
                Top {maxQsRank}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={maxQsRank}
              onChange={(e) => setMaxQsRank(Number(e.target.value))}
              className="w-full accent-[#0a2540] cursor-pointer"
            />
          </div>

          {/* Rule 5: Document Validity */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Income Certificate Expiry Limit:</span>
              </label>
              <span className="font-bold font-mono text-[#0a2540] bg-slate-100 px-2.5 py-0.5 rounded">
                {docValidityMonths} Months
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={24}
              step={6}
              value={docValidityMonths}
              onChange={(e) => setDocValidityMonths(Number(e.target.value))}
              className="w-full accent-[#0a2540] cursor-pointer"
            />
          </div>
        </div>

        {/* Panel B: Merit Formula Weightages */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">
                2. Merit Computation Formula Weightages
              </h2>
              <p className="text-xs text-slate-500">
                Formula: (W1 * Academic) + (W2 * NIRF/QS Rank) + (W3 * Socio-Economic)
              </p>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Weight 1 */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">Academic Score Weightage (W1):</span>
                  <span className="font-mono font-bold text-emerald-700">{academicWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={academicWeight}
                  onChange={(e) => {
                    const newAcad = Number(e.target.value);
                    setAcademicWeight(newAcad);
                    setUnivWeight(100 - newAcad - socioWeight);
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Weight 2 */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">University NIRF/QS Weightage (W2):</span>
                  <span className="font-mono font-bold text-blue-700">{univWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={univWeight}
                  onChange={(e) => {
                    const newUniv = Number(e.target.value);
                    setUnivWeight(newUniv);
                    setAcademicWeight(100 - newUniv - socioWeight);
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Weight 3 */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">Socio-Economic / Affirmative Weightage (W3):</span>
                  <span className="font-mono font-bold text-amber-700">{socioWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={40}
                  step={5}
                  value={socioWeight}
                  onChange={(e) => {
                    const newSocio = Number(e.target.value);
                    setSocioWeight(newSocio);
                    setAcademicWeight(100 - newSocio - univWeight);
                  }}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <div className="font-bold text-slate-800 mb-1">Affirmative Action Weighting Notes:</div>
                Socio-Economic criteria awards higher points to candidates with family income &lt; ?2.5 Lakhs (BPL) and candidates belonging to Particularly Vulnerable Tribal Groups (PVTGs).
              </div>
            </div>
          </div>

          {/* Simulate Action Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? "Simulating Impact Across Database..." : "Simulate Against Active Applications"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Live Simulation Results Drawer */}
      {simResults && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Simulation Impact Analysis (Evaluated on {simResults.totalEvaluated} Candidates)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Projected pass/flag distribution if current rule configurations are committed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <div className="text-2xl font-extrabold text-emerald-800">{simResults.eligibleCount}</div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5">Eligible / Instant Pass</div>
              <div className="text-[10px] text-emerald-600">
                {((simResults.eligibleCount / simResults.totalEvaluated) * 100).toFixed(1)}% of total pool
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <div className="text-2xl font-extrabold text-amber-800">{simResults.flaggedCount}</div>
              <div className="text-xs font-bold text-amber-700 mt-0.5">Deficiencies / Flags Triggered</div>
              <div className="text-[10px] text-amber-600">Requires desk review or re-upload</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-slate-800 mb-1">Primary Discrepancy Breakdown:</div>
              {simResults.discrepancyBreakdown.map((item) => (
                <div key={item.reason} className="flex justify-between text-[11px] text-slate-600">
                  <span className="truncate">{item.reason}</span>
                  <span className="font-mono font-bold text-slate-800">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
