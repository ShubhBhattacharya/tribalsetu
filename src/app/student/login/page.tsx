"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function StudentLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();

  // Simple, essential state only
  const [identifier, setIdentifier] = useState("8492-4912-7731"); // Aadhaar or Email
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("कृपया आधार संख्या या ईमेल दर्ज करें (Please enter Aadhaar or Email)");
      return;
    }

    setIsLoading(true);
    // Resolve demo account if entered
    let userKey = "student-birsa";
    if (identifier.toLowerCase().includes("shanti") || identifier.includes("9921")) {
      userKey = "student-shanti";
    }

    const success = await login({
      identifier,
      password,
      role: "STUDENT",
      userKey,
    });

    if (success) {
      router.push("/student/dashboard");
    } else {
      setErrorMsg("लॉगिन विफल। कृपया पुनः प्रयास करें। (Authentication failed)");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (key: string, demoId: string) => {
    setIdentifier(demoId);
    setErrorMsg("");
    setIsLoading(true);
    const success = await login(key);
    if (success) {
      router.push("/student/dashboard");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full space-y-4">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>होम (Back to Home)</span>
          </Link>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>सुरक्षित GovTech पोर्टल</span>
          </div>
        </div>

        {/* Clean, Simple Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Official Emblem Banner */}
          <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#046a38] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-2.5 shadow-sm">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
              जनजातीय कार्य मंत्रालय • भारत सरकार
            </span>
            <h1 className="text-xl font-black tracking-tight text-white mt-0.5">
              छात्रवृत्ति लॉगिन (Scholar Login)
            </h1>
            <p className="text-[11px] text-slate-300 mt-0.5">
              National Fellowship (NFST) & Overseas Scholarship (NOS)
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Essential Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  आधार संख्या या पंजीकृत ईमेल ID (Aadhaar or Email)
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX या scholar@email.com"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">
                    पासवर्ड / सुरक्षा पिन (Password / PIN)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? "छिपाएं" : "दिखाएं"}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 active:scale-[0.99] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>प्रमाणीकरण हो रहा है...</span>
                  </span>
                ) : (
                  <>
                    <span>लॉगिन करें (Secure Login)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Demo Accounts (Fast & Simple) */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                त्वरित डेमो लॉगिन (1-Click Test Scholars):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("student-birsa", "8492-4912-7731")}
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition cursor-pointer group"
                >
                  <div className="font-bold text-slate-800 text-xs group-hover:text-emerald-900">
                    Birsa Munda
                  </div>
                  <div className="text-[10px] text-amber-600 font-semibold">
                    NFST (कमी निवारण)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("student-shanti", "9921-5512-4412")}
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition cursor-pointer group"
                >
                  <div className="font-bold text-slate-800 text-xs group-hover:text-emerald-900">
                    Shanti Oraon
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    NOS (Oxford PhD)
                  </div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[11px] text-slate-500 pt-1">
              नया शोधार्थी?{" "}
              <Link href="/student/apply" className="font-bold text-[#0a2540] hover:text-emerald-700 underline">
                योजना के लिए नया आवेदन करें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
