"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  UserCheck, 
  ArrowRight,
  Fingerprint,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import { MOCK_USERS } from "@/lib/auth";

export default function StudentLoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"aadhaar" | "credentials">("aadhaar");
  const [aadhaarNumber, setAadhaarNumber] = useState("8492-4912-7731");
  const [email, setEmail] = useState("birsa.munda@scholar.in");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (userKey: string = "student-birsa") => {
    setIsLoading(true);
    localStorage.setItem("tribalsetu_user_key", userKey);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/student/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ (Back to Home)</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#046a38] text-white p-7 text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-md">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
              Ministry of Tribal Affairs • जनजातीय कार्य मंत्रालय
            </span>
            <h1 className="text-2xl font-black tracking-tight mt-1 text-white">
              छात्र / शोधार्थी लॉगिन (Scholar Portal)
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              National Fellowship for ST Students (NFST) & National Overseas Scholarship (NOS)
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Auth Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode("aadhaar")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === "aadhaar"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Fingerprint className="w-4 h-4 text-emerald-600" />
                <span>आधार OTP e-KYC</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("credentials")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === "credentials"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span>Application ID / Email</span>
              </button>
            </div>

            {/* Form */}
            {authMode === "aadhaar" ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    12-Digit Aadhaar Number (UIDAI)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full p-3 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold"
                    />
                    <span className="absolute right-3 top-3 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      e-KYC Ready
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    OTP will be sent to the mobile number registered with your Aadhaar.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLogin("student-birsa")}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <span>Verifying e-KYC Credentials...</span>
                  ) : (
                    <>
                      <span>Generate OTP & Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registered Email / App No</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleLogin("student-birsa")}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                >
                  <span>Login to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Demo Test Access */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                त्वरित डेमो लॉगिन (One-Click Test Scholars):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleLogin("student-birsa")}
                  className="p-3 text-left rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 transition"
                >
                  <div className="text-xs font-black text-amber-950">Birsa Munda (Santhal)</div>
                  <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                    Has Flagged Income Certificate
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleLogin("student-shanti")}
                  className="p-3 text-left rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 transition"
                >
                  <div className="text-xs font-black text-emerald-950">Shanti Oraon (Oraon)</div>
                  <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                    NOS Oxford University Candidate
                  </div>
                </button>
              </div>
            </div>

            {/* Footer Registration Link */}
            <div className="pt-2 text-center text-xs text-slate-500">
              New applicant?{" "}
              <Link href="/student/apply" className="font-bold text-[#0a2540] hover:text-emerald-700 underline">
                Apply for Fellowship Scheme Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
