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
  ChevronRight,
  UploadCloud,
  FileCheck,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import StatusStepper from "@/components/student/StatusStepper";
import { ApplicationItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { t } = useLanguage();
  const { currentUser, login } = useAuth();

  const isShanti = currentUser?.id === "usr_student_shanti";
  const [activeTab, setActiveTab] = useState<"status" | "documents" | "dbt" | "schemes">("status");
  const [isUploading, setIsUploading] = useState(false);
  const [isResolvedLocally, setIsResolvedLocally] = useState(false);

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
    degreeProgram: isShanti ? "Ph.D. in Genomic Epidemiology" : "Ph.D. in Environmental Anthropology",
    researchTopic: isShanti ? "Genetic Markers of Sickle Cell Trait in Central Indian Tribes" : "Indigenous Forest Conservation Practices in Chota Nagpur Plateau",
    meritScore: isShanti ? 94.6 : 82.4,
    annualIncome: isShanti ? 380000 : 240000,
    tribalGroup: isShanti ? "Oraon" : "Santhal",
    state: isShanti ? "Odisha" : "Jharkhand",
    flags: isShanti ? [] : ["EXPIRED_DOCUMENT"],
    createdAt: "2026-05-12T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
  });

  const hasDeficiency = !isShanti && !isResolvedLocally;

  const handleSimulatedReUpload = async () => {
    setIsUploading(true);
    // Simulate OCR re-verification
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsUploading(false);
    setIsResolvedLocally(true);
    setActiveApplication(prev => ({
      ...prev,
      status: "VERIFIED",
      flags: []
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* 1. Clean Scholar Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Left: Avatar & Scholar Details */}
          <div className="flex items-center space-x-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-center justify-center font-bold text-xl shadow-xs">
                {isShanti ? "SO" : "BM"}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white text-[10px]" title="सत्यापित छात्र">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {isShanti ? "Shanti Oraon (शांति उरांव)" : "Birsa Munda (बिरसा मुंडा)"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MoTA सत्यापित शोधार्थी</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                  समुदाय: {isShanti ? "Oraon (उरांव)" : "Santhal (संथाल)"}
                </span>
                <span>•</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                  राज्य: {isShanti ? "Odisha" : "Jharkhand"}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-500">
                  आधार: {isShanti ? "XXXX-XXXX-9921" : "XXXX-XXXX-8492"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Demo Switcher */}
            <button
              onClick={() => login(isShanti ? "student-birsa" : "student-shanti")}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="परीक्षण हेतु छात्र बदलें"
            >
              🔄 स्विच: {isShanti ? "बिरसा मुंडा (कमियां लंबित)" : "शांति उरांव (स्वीकृत)"}
            </button>

            <Link
              href="/student/apply"
              className="px-4 py-2 bg-[#0F2F1F] hover:bg-[#16422c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>नया आवेदन (New Apply)</span>
            </Link>
          </div>
        </div>

        {/* 3 Key Metrics Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
              ₹
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">मासिक छात्रवृत्ति (JRF Stipend)</span>
              <span className="text-base font-bold text-slate-900">
                {isShanti ? "£1,800/माह" : "₹38,800/माह"}
                <span className="text-xs text-slate-500 font-normal"> (+ HRA)</span>
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center text-sm shrink-0">
              <Landmark className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">वार्षिक आकस्मिक अनुदान (Contingency)</span>
              <span className="text-base font-bold text-slate-900">
                {isShanti ? "£9,900/वर्ष" : "₹20,500/वर्ष"}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-blue-800 flex items-center justify-center text-sm shrink-0">
              <Building2 className="w-4 h-4 text-blue-700" />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-500 block font-medium">संबद्ध शोध संस्थान (University)</span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {isShanti ? "Oxford Univ (QS #3)" : "JNU New Delhi (NIRF #12)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Statutory 12-Month Rule Deficiency Banner (Clean & Polite) */}
      {hasDeficiency && (
        <div className="bg-amber-50/80 rounded-2xl border border-amber-300/90 p-5 shadow-xs flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-amber-950">
                  कार्रवाई आवश्यक: आय प्रमाण पत्र का नवीनीकरण (Document Action Required)
                </h2>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono font-semibold">
                  12-Month Statutory Rule
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                सत्यापन अधिकारी ने पाया है कि आपका आय प्रमाण पत्र 1 वर्ष से अधिक पुराना है। जनजातीय कार्य मंत्रालय के <strong>12-महीने के नियम</strong> के अंतर्गत आपका आवेदन निरस्त नहीं हुआ है। कृपया <strong>328 दिनों के भीतर</strong> चालू वित्तीय वर्ष का प्रमाण पत्र अपलोड करें।
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulatedReUpload}
            disabled={isUploading}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>एआई सत्यापन जारी...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>नया प्रमाण पत्र अपलोड करें</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Success Banner if just resolved */}
      {isResolvedLocally && (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-300 p-4 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>सफलतापूर्वक सत्यापित:</strong> नया आय प्रमाण-पत्र (FY 2026-27) एआई ऑप्टिकल इंजन द्वारा मान्य पाया गया। आपका आवेदन संवीक्षा अधिकारी को अग्रसारित कर दिया गया है।
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            100% OCR Match
          </span>
        </div>
      )}

      {/* 3. Segmented Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs sm:text-sm font-semibold">
          {[
            { id: "status", label: "📊 आवेदन स्थिति (Application Status)" },
            { id: "documents", label: "📁 दस्तावेज़ रिपॉजिटरी (Documents)" },
            { id: "dbt", label: "💳 डीबीटी संवितरण पासबुक (DBT Passbook)" },
            { id: "schemes", label: "🏛️ उपलब्ध योजनाएं (Schemes)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition relative cursor-pointer ${
                activeTab === tab.id
                  ? "text-[#0F2F1F] font-bold border-b-2 border-emerald-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 4. Tab Content Area */}

      {/* TAB 1: APPLICATION STATUS & STEPPER */}
      {activeTab === "status" && (
        <div className="space-y-6">
          <StatusStepper
            currentStage={activeApplication.currentStage}
            status={activeApplication.status}
            submissionDate="12 May 2026"
            deficiencyCount={hasDeficiency ? 1 : 0}
          />

          {/* Academic & Fellowship Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  सक्रिय छात्रवृत्ति योजना
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {isShanti 
                    ? "राष्ट्रीय प्रवासी छात्रवृत्ति (National Overseas Scholarship - NOS)" 
                    : "राष्ट्रीय जनजातीय उच्च शिक्षा फेलोशिप (National Fellowship Scheme - NFST)"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-semibold border border-slate-200">
                  {activeApplication.applicationNo}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                  activeApplication.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : activeApplication.status === "DEFICIENT"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}>
                  {activeApplication.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">पाठ्यक्रम एवं संस्थान</span>
                <div className="font-bold text-slate-800">{activeApplication.degreeProgram}</div>
                <div className="text-slate-500 text-[11px]">{activeApplication.univName}</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">शोध प्रबंध का शीर्षक (Research Topic)</span>
                <div className="font-medium text-slate-800 italic line-clamp-2">
                  &quot;{activeApplication.researchTopic}&quot;
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex gap-4">
                <span>अकादमिक स्कोर: <strong className="text-slate-800">{activeApplication.academicScore}%</strong></span>
                <span>मेरिट स्कोर: <strong className="text-slate-800">{activeApplication.meritScore}/100</strong></span>
              </div>
              <span className="text-[11px]">अंतिम अद्यतन: 17 सितंबर 2026, 11:15 AM</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENT REPOSITORY */}
      {activeTab === "documents" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                अपलोड किए गए डिजिटल प्रमाण-पत्र (Verified Documents Vault)
              </h3>
              <p className="text-xs text-slate-500">
                ऑप्टिकल एआई सत्यापन एवं तहसीलदार डिजिटल मुहर युक्त प्रमाण-पत्र
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              {
                name: "अनुसूचित जनजाति (ST) प्रमाण पत्र",
                file: "ST_Certificate_Santhal_Verified.pdf",
                issuer: "उप-विभागीय दंडाधिकारी (SDM), देवघर",
                status: "VERIFIED",
                date: "14 Jan 2024",
                size: "1.4 MB"
              },
              {
                name: "वार्षिक पारिवारिक आय प्रमाण पत्र",
                file: hasDeficiency ? "Income_Certificate_Expired_2024.pdf" : "Income_Certificate_FY2026_Tahasildar.pdf",
                issuer: "अंचल अधिकारी / तहसीलदार",
                status: hasDeficiency ? "ACTION_NEEDED" : "VERIFIED",
                date: hasDeficiency ? "10 March 2024 (पुराना)" : "12 June 2026 (वैध)",
                size: "1.1 MB"
              },
              {
                name: "स्नातकोत्तर डिग्री अंकपत्र (PG Marksheet)",
                file: "MA_Anthropology_Transcript_82pct.pdf",
                issuer: "परीक्षा नियंत्रक, रांची विश्वविद्यालय",
                status: "VERIFIED",
                date: "22 June 2025",
                size: "2.3 MB"
              },
              {
                name: "विश्वविद्यालय प्रवेश पत्र (Admission Letter)",
                file: "JNU_PhD_Admission_Confirmation.pdf",
                issuer: "रजिस्ट्रार कार्यालय, जेएनयू",
                status: "VERIFIED",
                date: "05 May 2026",
                size: "1.8 MB"
              }
            ].map((doc, idx) => (
              <div key={idx} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{doc.name}</div>
                    <div className="text-[11px] text-slate-500">
                      जारीकर्ता: {doc.issuer} • जारी तिथि: {doc.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {doc.status === "VERIFIED" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> मान्य
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <AlertTriangle className="w-3 h-3" /> नवीनीकरण आवश्यक
                    </span>
                  )}

                  <button className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition cursor-pointer">
                    देखें (View)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DBT PASSBOOK */}
      {activeTab === "dbt" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>डीबीटी फेलोशिप संवितरण पासबुक (Direct Benefit Transfer Ledger)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                आधार-संबद्ध बैंक खाते में सीधे कोषागार से क्रेडिट की गई राशि का विवरण
              </p>
            </div>

            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              PFMS Treasury ID: JH_ST_98129
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">क्रेडिट तिथि</th>
                  <th className="py-2.5 px-3">माह / अवधि</th>
                  <th className="py-2.5 px-3">विवरण</th>
                  <th className="py-2.5 px-3">PFMS ट्रांजैक्शन ID</th>
                  <th className="py-2.5 px-3">राशि</th>
                  <th className="py-2.5 px-3 text-right">स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  { date: "01 Sep 2026", month: "August 2026", desc: "NFST Doctoral JRF + HRA", pfms: "PFMS-2026-JH-88192", amount: "₹38,800", status: "सफल (Credited)" },
                  { date: "01 Aug 2026", month: "July 2026", desc: "NFST Doctoral JRF + HRA", pfms: "PFMS-2026-JH-77401", amount: "₹38,800", status: "सफल (Credited)" },
                  { date: "01 Jul 2026", month: "Annual Grant", desc: "STEM Annual Contingency Grant", pfms: "PFMS-2026-JH-66299", amount: "₹20,500", status: "सफल (Credited)" },
                  { date: "01 Jul 2026", month: "June 2026", desc: "NFST Doctoral JRF + HRA", pfms: "PFMS-2026-JH-66112", amount: "₹38,800", status: "सफल (Credited)" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-medium text-slate-900">{row.date}</td>
                    <td className="py-3 px-3 text-slate-600">{row.month}</td>
                    <td className="py-3 px-3">{row.desc}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{row.pfms}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{row.amount}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AVAILABLE SCHEMES */}
      {activeTab === "schemes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* NFST Scheme Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                घरेलू फेलोशिप (India Ph.D.)
              </span>
              <span className="text-xs text-slate-400 font-medium">अंतिम तिथि: 30 Nov 2026</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                राष्ट्रीय फेलोशिप योजना (NFST for Higher Education)
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                भारतीय विश्वविद्यालयों व राष्ट्रीय महत्व के संस्थानों (IITs, NITs) में नियमित एम.फिल. व पी.एच.डी. करने वाले 750 जनजातीय शोधार्थियों को पूर्ण वित्तीय सहायता।
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">मासिक मानदेय</span>
                <span className="font-bold text-slate-900">₹38,800/माह + HRA</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                सक्रिय रूप से नामांकित
              </span>
            </div>
          </div>

          {/* NOS Scheme Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                विदेशी छात्रवृत्ति (Overseas Ph.D.)
              </span>
              <span className="text-xs text-slate-400 font-medium">अंतिम तिथि: 31 Oct 2026</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                राष्ट्रीय प्रवासी छात्रवृत्ति (National Overseas Scholarship - NOS)
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                शीर्ष 500 QS विश्व रैंकिंग विश्वविद्यालयों में मास्टर, पी.एच.डी. व पोस्ट-डॉक्टोरल अध्ययन हेतु 100 मेधावी जनजातीय छात्रों को शत-प्रतिशत शिक्षण शुल्क व जीवन-यापन भत्ता।
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">कवरेज</span>
                <span className="font-bold text-slate-900">100% फीस + £9,900/वर्ष</span>
              </div>
              <Link
                href="/student/apply"
                className="text-xs text-[#0F2F1F] font-bold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                <span>आवेदन करें →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
