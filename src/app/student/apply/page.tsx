"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  GraduationCap, 
  FileText, 
  Sparkles, 
  AlertCircle,
  Building,
  Globe,
  IndianRupee,
  Send
} from "lucide-react";
import DocumentVault, { UploadedDocState } from "@/components/student/DocumentVault";
import { DocumentType } from "@/types";

const TRIBAL_COMMUNITIES = [
  "Santhal", "Gond", "Bhil", "Oraon", "Munda", "Khasi", "Bodo", "Mizo", "Garo", "Chenchu", "Toda", "Meena", "Tharu", "Baiga", "Other ST"
];

const INDIAN_STATES = [
  "Jharkhand", "Odisha", "Madhya Pradesh", "Chhattisgarh", "Rajasthan", "Gujarat", "Maharashtra", "Meghalaya", "Assam", "Arunachal Pradesh", "Andhra Pradesh", "Telangana", "West Bengal"
];

export default function ApplicationWizard() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  // Form State
  const [personalDetails, setPersonalDetails] = useState({
    name: "Birsa Munda",
    email: "birsa.munda@scholar.in",
    phone: "+91 98765 43210",
    aadhaar: "8492-4912-7731",
    aadhaarVerified: true,
    tribalGroup: "Santhal",
    state: "Jharkhand",
    district: "Ranchi",
    annualIncome: 240000,
  });

  const [schemeDetails, setSchemeDetails] = useState({
    schemeCode: "NFST" as "NFST" | "NOS",
    degreeProgram: "Ph.D. in Tribal Heritage & Ecology",
    instituteName: "Jawaharlal Nehru University, New Delhi",
    univRanking: 12,
    academicScore: 78.5,
    researchTopic: "Eco-Cultural Preservation & Forest Tenure Rights of Chota Nagpur",
  });

  const [documentsState, setDocumentsState] = useState<Record<DocumentType, UploadedDocState> | null>(null);

  const handleSchemeToggle = (code: "NFST" | "NOS") => {
    if (code === "NOS") {
      setSchemeDetails({
        schemeCode: "NOS",
        degreeProgram: "Ph.D. in Anthropology & Indigenous Governance",
        instituteName: "University of Oxford",
        univRanking: 4,
        academicScore: 82.0,
        researchTopic: "Comparative Study of Indigenous Customary Laws in Commonwealth Jurisdictions",
      });
    } else {
      setSchemeDetails({
        schemeCode: "NFST",
        degreeProgram: "Ph.D. in Tribal Heritage & Ecology",
        instituteName: "Jawaharlal Nehru University, New Delhi",
        univRanking: 12,
        academicScore: 78.5,
        researchTopic: "Eco-Cultural Preservation & Forest Tenure Rights of Chota Nagpur",
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedNo = `${schemeDetails.schemeCode}-2026-${randomSuffix}`;
      setSubmittedAppNo(generatedNo);
      setIsSubmitting(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Header Banner */}
      <div className="mb-6">
        <Link
          href="/student/dashboard"
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              MoTA Higher Education Scholarship Application Wizard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Academic Session 2026-27 • Automated Optical e-KYC Enabled
            </p>
          </div>
          <div className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> AI Pre-Validation
          </div>
        </div>
      </div>

      {/* 2. Wizard Step Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: "Personal Details" },
            { num: 2, label: "Scheme & Academic" },
            { num: 3, label: "Document Vault" },
            { num: 4, label: "Review & Submit" },
          ].map((s) => (
            <div
              key={s.num}
              className={`p-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                step === s.num
                  ? "bg-[#0a2540] text-white"
                  : step > s.num
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step > s.num ? "bg-emerald-600 text-white" : "border border-current"
                }`}
              >
                {step > s.num ? "?" : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Details */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0a2540]" />
              <span>Step 1: Personal & Tribal Profile</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aadhaar-seeded identification and constitutional ST classification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name (as per Aadhaar)</label>
              <input
                type="text"
                value={personalDetails.name}
                onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Aadhaar Mock e-KYC Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={personalDetails.aadhaar}
                  disabled
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-600 font-mono"
                />
                <span className="absolute right-2.5 top-2.5 text-emerald-600 flex items-center gap-1 font-bold text-[11px]">
                  <ShieldCheck className="w-4 h-4" /> e-KYC Verified
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Scheduled Tribe (ST) Community</label>
              <select
                value={personalDetails.tribalGroup}
                onChange={(e) => setPersonalDetails({ ...personalDetails, tribalGroup: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium bg-white"
              >
                {TRIBAL_COMMUNITIES.map((tribe) => (
                  <option key={tribe} value={tribe}>
                    {tribe} Tribe
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Domicile State</label>
              <select
                value={personalDetails.state}
                onChange={(e) => setPersonalDetails({ ...personalDetails, state: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium bg-white"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Home District</label>
              <input
                type="text"
                value={personalDetails.district}
                onChange={(e) => setPersonalDetails({ ...personalDetails, district: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Gross Annual Family Income (INR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={personalDetails.annualIncome}
                  onChange={(e) =>
                    setPersonalDetails({ ...personalDetails, annualIncome: Number(e.target.value) })
                  }
                  className="w-full p-2.5 pl-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                />
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
              </div>
              <span className="text-[10px] text-emerald-700 mt-1 block">
                ? Below ?8,00,000 threshold (Eligible for full 100% MoTA grant)
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <span>Next: Scheme & Academic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Scheme & Academic Details */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0a2540]" />
              <span>Step 2: Scheme Selection & Academic Credentials</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose domestic fellowship (NFST) or overseas scholarship (NOS)
            </p>
          </div>

          {/* Scheme Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => handleSchemeToggle("NFST")}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                schemeDetails.schemeCode === "NFST"
                  ? "border-[#0a2540] bg-blue-50/50 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#0a2540] flex items-center gap-1.5">
                  <Building className="w-4 h-4" /> NFST (India Fellowship)
                </span>
                <input
                  type="radio"
                  name="scheme"
                  checked={schemeDetails.schemeCode === "NFST"}
                  onChange={() => handleSchemeToggle("NFST")}
                  className="accent-[#0a2540]"
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                For pursuing M.Phil/Ph.D. in recognized Indian Central Universities & IITs. Stipend: ?38,800/month + contingency.
              </p>
            </div>

            <div
              onClick={() => handleSchemeToggle("NOS")}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                schemeDetails.schemeCode === "NOS"
                  ? "border-emerald-700 bg-emerald-50/50 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-700" /> NOS (Overseas Scholarship)
                </span>
                <input
                  type="radio"
                  name="scheme"
                  checked={schemeDetails.schemeCode === "NOS"}
                  onChange={() => handleSchemeToggle("NOS")}
                  className="accent-emerald-700"
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                For Master&apos;s/Ph.D. abroad in Top 500 QS Universities. 100% Tuition + Living Stipend (£9,900 / $15,400).
              </p>
            </div>
          </div>

          {/* Academic inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {schemeDetails.schemeCode === "NOS" ? "Overseas University" : "Indian University / Institute"}
              </label>
              <input
                type="text"
                value={schemeDetails.instituteName}
                onChange={(e) => setSchemeDetails({ ...schemeDetails, instituteName: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {schemeDetails.schemeCode === "NOS" ? "QS World Rank (Ceiling: Top 500)" : "NIRF Ranking"}
              </label>
              <input
                type="number"
                value={schemeDetails.univRanking}
                onChange={(e) =>
                  setSchemeDetails({ ...schemeDetails, univRanking: Number(e.target.value) })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree / Course Enrolled</label>
              <input
                type="text"
                value={schemeDetails.degreeProgram}
                onChange={(e) => setSchemeDetails({ ...schemeDetails, degreeProgram: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Qualifying Degree Percentage / CGPA (Min {schemeDetails.schemeCode === "NOS" ? "60%" : "55%"})
              </label>
              <input
                type="number"
                step="0.1"
                value={schemeDetails.academicScore}
                onChange={(e) =>
                  setSchemeDetails({ ...schemeDetails, academicScore: Number(e.target.value) })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Research Proposal Topic / Summary</label>
              <textarea
                rows={2}
                value={schemeDetails.researchTopic}
                onChange={(e) => setSchemeDetails({ ...schemeDetails, researchTopic: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-5 py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <span>Next: Document Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Document Vault with OCR */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0a2540]" />
                <span>Step 3: Document Vault & Instant Optical AI Verification</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload certificates for automated field extraction and seal validation
              </p>
            </div>
          </div>

          <DocumentVault
            candidateName={personalDetails.name}
            annualIncome={personalDetails.annualIncome}
            tribalGroup={personalDetails.tribalGroup}
            academicScore={schemeDetails.academicScore}
            univName={schemeDetails.instituteName}
            univRanking={schemeDetails.univRanking}
            onDocumentsChange={(docs) => setDocumentsState(docs)}
          />

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                <span>Submitting to MoTA Portal...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Submission Confirmation */}
      {step === 4 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Application Successfully Registered
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Ministry of Tribal Affairs Acknowledgement
            </h2>
            <div className="mt-3 inline-block font-mono text-sm font-bold bg-slate-100 text-[#0a2540] px-4 py-2 rounded-lg border border-slate-300">
              Reference Application ID: {submittedAppNo}
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your application has completed instant AI Optical Document Verification and has entered the 
            <strong> MoTA Scrutiny Desk Queue</strong>. SMS and email confirmations have been dispatched.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/student/dashboard"
              className="px-5 py-2.5 bg-[#0a2540] text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
            >
              Go to Student Dashboard
            </Link>
            <Link
              href="/officer/scrutiny"
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition"
            >
              View in Officer Scrutiny Workbench
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
