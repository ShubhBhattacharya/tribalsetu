"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  Award, 
  IndianRupee, 
  Smartphone, 
  Building2, 
  Download, 
  Search, 
  Zap, 
  Check, 
  Clock,
  Landmark,
  BadgeCheck,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TribalSetuLogo from "@/components/ui/TribalSetuLogo";

export default function WorkflowHubPage() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Stage 1 State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(true);

  // Stage 2 State
  const [deficiencyFixed, setDeficiencyFixed] = useState<boolean>(false);
  const [isReuploading, setIsReuploading] = useState<boolean>(false);

  // Stage 3 State
  const [isOfficerApproved, setIsOfficerApproved] = useState<boolean>(false);

  // Stage 4 State
  const [meritCalculated, setMeritCalculated] = useState<boolean>(false);

  // Stage 5 State
  const [dbtDisbursed, setDbtDisbursed] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        if (currentStep < 5) {
          handleNext();
        } else {
          setIsAutoPlaying(false);
        }
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStep]);

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setDeficiencyFixed(true);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsOfficerApproved(true);
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setMeritCalculated(true);
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setDbtDisbursed(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsScanning(false);
    setScanComplete(true);
    setDeficiencyFixed(false);
    setIsOfficerApproved(false);
    setMeritCalculated(false);
    setDbtDisbursed(false);
    setIsAutoPlaying(false);
  };

  const triggerScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1500);
  };

  const triggerFixDeficiency = () => {
    setIsReuploading(true);
    setTimeout(() => {
      setIsReuploading(false);
      setDeficiencyFixed(true);
    }, 1200);
  };

  const steps = [
    { num: 1, title: "1. AI Document Scan", sub: "Laser OCR & Tehsildar Seal" },
    { num: 2, title: "2. Deficiency Resolution", sub: "12-Month Rule Auto-Check" },
    { num: 3, title: "3. Scrutiny Desk", sub: "Side-by-Side Official Stamp" },
    { num: 4, title: "4. AI Merit Engine", sub: "National Ranking & Gazette" },
    { num: 5, title: "5. Direct DBT Transfer", sub: "Aadhaar / PFMS ₹38,800 Credit" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 space-y-8">
      {/* Top Breadcrumb & Actions Strip */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Workflow Simulator</span>
            </div>
          </div>

          {/* Controls: Play, Next, Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isAutoPlaying
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-[#0a2540] hover:bg-[#123960] text-white"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAutoPlaying ? "Auto-Playing..." : "Auto-Play Lifecycle"}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <Link
              href="/mobile"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Switch to Mobile App 📱</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#0a2540] via-[#0d3b66] to-[#046a38] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              ⚡ Live End-to-End Governance Engine
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              TribalSetu 5-Stage Scholarship Workflow
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Experience the complete digital journey of a tribal scholar — from high-speed AI optical seal extraction to instant deficiency resolution, desk scrutiny, and direct Aadhaar bank credit.
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 5-Stage Stepper Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`p-3 rounded-xl text-left transition flex items-start space-x-2.5 cursor-pointer ${
                    isActive
                      ? "bg-[#0a2540] text-white shadow-md ring-2 ring-emerald-500/50"
                      : isPast
                      ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : isPast
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}>
                    {isPast ? "✓" : s.num}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{s.title}</div>
                    <div className={`text-[10px] truncate ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                      {s.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STAGE 1: AI DOCUMENT SCAN & TEHSILDAR SEAL */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                  Stage 1 of 5 • Scholar Intake
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Optical AI Certificate Scrutiny & Seal Detection
                </h2>
                <p className="text-xs text-slate-500">
                  Applicant <strong>Birsa Munda (Santhal Tribe, Khunti, Jharkhand)</strong> uploads Revenue Caste Certificate.
                </p>
              </div>

              <button
                onClick={triggerScan}
                disabled={isScanning}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{isScanning ? "Scanning Optical Grid..." : "Re-Scan Document (OCR)"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left: Certificate Preview with Simulated Laser */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-4 aspect-4/3 flex flex-col items-center justify-center text-center">
                {/* Certificate Mockup Canvas */}
                <div className="w-full h-full bg-amber-50/90 rounded-xl p-6 text-slate-900 font-serif relative shadow-inner flex flex-col justify-between select-none">
                  {/* Laser Scanning Animation Beam */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce z-20"></div>
                  )}

                  <div className="border-b-2 border-slate-400 pb-2 text-center">
                    <div className="text-[10px] font-bold text-slate-600 uppercase">Government of Jharkhand • Revenue Department</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">SCHEDULED TRIBE CERTIFICATE (प्रमाण-पत्र)</div>
                    <div className="text-[9px] text-slate-500 font-mono">Ref: JH/REV/KHU/2024/098124</div>
                  </div>

                  <div className="text-left space-y-1.5 text-xs">
                    <div>This is to certify that <strong>Shri Birsa Munda</strong>, son of Shri Sugana Munda, resident of Khunti District, Jharkhand, belongs to the <strong>Santhal Scheduled Tribe</strong>.</div>
                    <div className="text-[11px] text-slate-600">Annual Family Income: <strong>₹2,40,000/-</strong> (Within MoTA ceiling).</div>
                    <div className="text-[11px] text-slate-600">Date of Issue: <strong>14-Aug-2024</strong>.</div>
                  </div>

                  {/* Red Tehsildar Seal Watermark */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-300">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-red-700 text-red-700 font-bold text-[8px] uppercase text-center p-1 transform -rotate-12 ring-2 ring-red-200">
                      ★ TEHSILDAR SEAL ★ KHUNTI REVENUE
                    </div>
                    <div className="text-right text-[10px]">
                      <div className="font-bold">Sub-Divisional Magistrate</div>
                      <div className="text-slate-500">Khunti Sub-Division</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Extracted OCR Telemetry */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Optical Confidence Score</span>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full border border-emerald-300">
                      99.4% Valid
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[99.4%]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Applicant Name</span>
                    <p className="font-extrabold text-slate-900 flex items-center gap-1">
                      <span>Birsa Munda</span> <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Recognized Tribe</span>
                    <p className="font-extrabold text-slate-900 flex items-center gap-1">
                      <span>Santhal (ST)</span> <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Tehsildar Seal</span>
                    <p className="font-extrabold text-emerald-700 flex items-center gap-1">
                      <span>Authenticated</span> <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Annual Income</span>
                    <p className="font-extrabold text-slate-900">₹2,40,000 / annum</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>Optical OCR Step 1 Verified</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Revenue seal, Aadhaar matching hash, and tribal schedule cross-referenced with MoTA 22 State Master Registry.
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-[#0a2540] hover:bg-[#123960] text-white rounded-xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Proceed to Stage 2: Deficiency Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: DEFICIENCY RESOLUTION (12-MONTH RULE) */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                  Stage 2 of 5 • Smart Objection Handling
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  12-Month Rule Validity Check & Instant Resolution
                </h2>
                <p className="text-xs text-slate-500">
                  MoTA Rule: Income certificates must be issued within the preceding 12 calendar months.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  ‹ Back
                </button>
              </div>
            </div>

            {!deficiencyFixed ? (
              <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-amber-950">
                      Deficiency Detected: Certificate Validity Exceeded 12 Months
                    </h3>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      The uploaded Income Certificate was issued on <strong>14-Aug-2024</strong>, which is beyond the 12-month validity window for FY 2026-27 fellowship intake.
                    </p>
                    <div className="pt-2 text-xs font-semibold text-emerald-900">
                      ✨ <strong>Zero-Rejection Guarantee</strong>: The application is NOT rejected. The scholar can upload a fresh valid certificate right now without restarting the process.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 font-medium">
                    Upload new certificate issued by Tehsildar / Revenue Inspector for FY 2026.
                  </div>
                  <button
                    onClick={triggerFixDeficiency}
                    disabled={isReuploading}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isReuploading ? "Verifying Fresh Upload..." : "Simulate Instant Re-Upload & OCR (नवीन प्रमाण-पत्र)"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-400 space-y-4 animate-in zoom-in-95">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-emerald-950">
                      Deficiency Cleared! Fresh Certificate Accepted (FY 2026-27)
                    </h3>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Fresh Income Certificate (Issued: <strong>10-Jan-2026</strong>, Valid for 12 months) verified by Optical OCR engine in <strong>1.1 seconds</strong>.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-[#0a2540] hover:bg-[#123960] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>Proceed to Stage 3: Scrutiny Officer Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STAGE 3: SCRUTINY OFFICER DESK APPROVAL */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                  Stage 3 of 5 • MoTA Officer Scrutiny Desk
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Desk Officer Dual-Screen Inspection & Approval Stamp
                </h2>
                <p className="text-xs text-slate-500">
                  Logged in Officer: <strong>Dr. Rajesh Verma (Senior Scrutiny Officer, MoTA)</strong>
                </p>
              </div>

              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                ‹ Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Document with Bounding Boxes */}
              <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-5 text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400">Green Bounding Boxes: AI Authenticated Regions</span>
                  <span className="text-[10px] text-slate-400">Resolution: 300 DPI</span>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 text-slate-900 font-serif relative space-y-3 shadow-inner">
                  {/* Bounding Box 1 */}
                  <div className="border-2 border-emerald-500 bg-emerald-500/10 p-1.5 rounded relative">
                    <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[9px] font-sans px-1.5 py-0.2 rounded font-bold">
                      Match: Birsa Munda (99.8%)
                    </span>
                    <p className="text-xs font-bold">Applicant: Birsa Munda S/O Sugana Munda</p>
                  </div>

                  {/* Bounding Box 2 */}
                  <div className="border-2 border-emerald-500 bg-emerald-500/10 p-1.5 rounded relative">
                    <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[9px] font-sans px-1.5 py-0.2 rounded font-bold">
                      Valid ST List: Santhal Tribe
                    </span>
                    <p className="text-xs font-bold">Category: Scheduled Tribe (Jharkhand State List #18)</p>
                  </div>

                  {/* Bounding Box 3 */}
                  <div className="border-2 border-emerald-500 bg-emerald-500/10 p-1.5 rounded relative">
                    <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[9px] font-sans px-1.5 py-0.2 rounded font-bold">
                      Seal Verified: SDM Khunti
                    </span>
                    <p className="text-xs font-bold">Official Seal: Sub-Divisional Officer, Khunti (Revenue)</p>
                  </div>
                </div>

                {/* Stamped Indicator */}
                {isOfficerApproved && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center animate-in zoom-in-75">
                    <div className="border-4 border-emerald-500 text-emerald-400 font-black text-2xl uppercase tracking-widest px-8 py-4 rounded-2xl transform -rotate-12 bg-slate-950/90 shadow-2xl">
                      ✓ APPROVED BY MOTA
                    </div>
                  </div>
                )}
              </div>

              {/* Officer Decision Panel */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Scrutiny Checklist</div>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Name matches Aadhaar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ST Tribe listed in 22 State Master</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Family income under ₹6,00,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Admission confirmed at JNU Ph.D.</span>
                    </div>
                  </div>
                </div>

                {!isOfficerApproved ? (
                  <button
                    onClick={() => setIsOfficerApproved(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve & Sign with Digital Key</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-200">
                      Officer Approval Logged into Immutable Audit Trail #LOG-9824
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-[#0a2540] hover:bg-[#123960] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <span>Proceed to Stage 4: Merit Engine</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: AI MERIT ENGINE & GAZETTE GENERATION */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
                  Stage 4 of 5 • National Merit Engine
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Automated Merit Calculation & Official Gazette Notification
                </h2>
                <p className="text-xs text-slate-500">
                  Formula: Marks (40%) + University Rank (30%) + PVTG Vulnerability (20%) + Research Proposal (10%)
                </p>
              </div>

              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                ‹ Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Merit Score Breakdown */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 uppercase">Applicant Rank</span>
                  <span className="text-2xl font-black text-emerald-700">#14 Nationally</span>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  88.6 <span className="text-sm font-semibold text-slate-500">/ 100 Merit Score</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Post-Graduation Marks (78.5%)</span>
                    <span className="font-bold text-slate-900">31.4 / 40</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">NIRF Tier-1 University (JNU)</span>
                    <span className="font-bold text-slate-900">28.0 / 30</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">PVTG / Tribal Vulnerability Index</span>
                    <span className="font-bold text-slate-900">20.0 / 20</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">Research Synopsis Quality</span>
                    <span className="font-bold text-slate-900">9.2 / 10</span>
                  </div>
                </div>
              </div>

              {/* Gazette Notification Certificate Card */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border-2 border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
                <div className="text-center space-y-1">
                  <div className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">
                    THE GAZETTE OF INDIA • EXTRAORDINARY
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    Ministry of Tribal Affairs Sanction Order 2026
                  </h3>
                  <div className="text-[10px] text-slate-500 font-mono">
                    MoTA/NFST/2026/SL-0842 • New Delhi
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed text-center p-3 bg-white/80 rounded-xl border border-amber-200">
                  The President of India is pleased to sanction the <strong>National Fellowship (NFST)</strong> to <strong>Birsa Munda</strong> for doctoral research at JNU with direct Aadhaar-linked stipend.
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-[#0a2540] hover:bg-[#123960] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Authorize Stage 5: PFMS Aadhaar DBT Disbursal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: DIRECT DBT DISBURSAL VIA AADHAAR / PFMS */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                  Stage 5 of 5 • Final Treasury Payout
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  PFMS Treasury Direct DBT Disbursal & Bank Credit
                </h2>
                <p className="text-xs text-slate-500">
                  Zero manual intermediary: ₹38,800 monthly fellowship credited via Aadhaar-linked PFMS gateway.
                </p>
              </div>

              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                ‹ Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Realistic Mobile Phone SMS Screen */}
              <div className="max-w-sm mx-auto w-full bg-slate-900 rounded-3xl p-3 shadow-2xl border-4 border-slate-800">
                <div className="w-full bg-white rounded-2xl p-4 space-y-3 min-h-[300px] flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[10px] text-slate-500 font-bold">
                    <span>💬 Messages • Government DBT</span>
                    <span>10:30 AM</span>
                  </div>

                  {/* SMS Bubble */}
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2 text-xs shadow-xs animate-in zoom-in-90">
                    <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-emerald-700" />
                      <span>Aadhaar DBT Credit Alert</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-mono text-[11px]">
                      Dear BIRSA MUNDA, your account **4029 at Bank of India is credited with <strong>INR 38,800.00</strong> on 18-Sep-2026 towards MoTA NFST Fellowship Month #1 via PFMS (UTR: 98234812).
                    </p>
                    <div className="text-[10px] text-emerald-800 font-bold">
                      Status: Transferred Directly • Zero Deduction
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-slate-400">
                    National Payments Corporation of India (NPCI) Gateway
                  </div>
                </div>
              </div>

              {/* Success Celebration Card */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Full Fellowship Lifecycle Successfully Completed!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  From instant optical OCR verification to deficiency resolution and direct bank transfer, TribalSetu has eliminated months of paperwork into minutes of intelligent digital governance.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    🔄 Run Simulation Again
                  </button>

                  <Link
                    href="/mobile"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Try Mobile App Version 📱</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
