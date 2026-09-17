"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  FileCheck2, 
  BarChart3, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type RoleTab = "STUDENT" | "MOTA_OFFICER" | "ADMIN";

export default function UnifiedLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<RoleTab>("STUDENT");
  const [identifier, setIdentifier] = useState("8492-4912-7731");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTabChange = (tab: RoleTab) => {
    setActiveTab(tab);
    setErrorMsg("");
    if (tab === "STUDENT") {
      setIdentifier("8492-4912-7731");
      setPassword("••••••••");
    } else if (tab === "MOTA_OFFICER") {
      setIdentifier("rajesh.verma@mota.gov.in");
      setPassword("••••••••••••");
    } else {
      setIdentifier("sunita.murmu@mota.gov.in");
      setPassword("••••••••••••");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("कृपया अपनी आईडी दर्ज करें (Please enter ID / Email)");
      return;
    }

    setIsLoading(true);

    let userKey = "student-birsa";
    let redirectPath = "/student/dashboard";

    if (activeTab === "STUDENT") {
      if (identifier.toLowerCase().includes("shanti") || identifier.includes("9921")) {
        userKey = "student-shanti";
      }
      redirectPath = "/student/dashboard";
    } else if (activeTab === "MOTA_OFFICER") {
      userKey = "officer-rajesh";
      redirectPath = "/officer/scrutiny";
    } else {
      userKey = "admin-sunita";
      redirectPath = "/admin/analytics";
    }

    const success = await login({
      identifier,
      password,
      role: activeTab,
      userKey,
    });

    if (success) {
      router.push(redirectPath);
    } else {
      setErrorMsg("प्रमाणीकरण विफल। कृपया विवरण जांचें। (Authentication failed)");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (key: string, path: string) => {
    setErrorMsg("");
    setIsLoading(true);
    const success = await login(key);
    if (success) {
      router.push(path);
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
            <span>MoTA Single Sign-On</span>
          </div>
        </div>

        {/* Clean Unified Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#046a38] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-2 shadow-sm">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
              जनजातीय कार्य मंत्रालय • भारत सरकार
            </span>
            <h1 className="text-xl font-black tracking-tight text-white mt-0.5">
              TribalSetu पोर्टल लॉगिन
            </h1>
            <p className="text-[11px] text-slate-300 mt-0.5">
              अपनी भूमिका का चयन करके केवल आवश्यक विवरण दर्ज करें
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* Simple Role Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleTabChange("STUDENT")}
                className={`py-2 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                  activeTab === "STUDENT"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>🎓 छात्र</span>
                <span className="text-[9px] font-normal text-slate-400">Scholar</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("MOTA_OFFICER")}
                className={`py-2 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                  activeTab === "MOTA_OFFICER"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>🔍 अधिकारी</span>
                <span className="text-[9px] font-normal text-slate-400">Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("ADMIN")}
                className={`py-2 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                  activeTab === "ADMIN"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>⚙️ प्रशासक</span>
                <span className="text-[9px] font-normal text-slate-400">Admin</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Essential Inputs Only */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {activeTab === "STUDENT"
                    ? "आधार संख्या या ईमेल (Aadhaar or Email)"
                    : activeTab === "MOTA_OFFICER"
                    ? "आधिकारिक ईमेल ID (@mota.gov.in / @nic.in)"
                    : "सचिवालय ईमेल ID (@mota.gov.in)"}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">
                    {activeTab === "STUDENT"
                      ? "पासवर्ड / पिन (Password)"
                      : activeTab === "MOTA_OFFICER"
                      ? "सुरक्षा टोकन (Security PIN)"
                      : "प्रशासक पासकोड (Passcode)"}
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
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 active:scale-[0.99] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>प्रवेश हो रहा है...</span>
                  </span>
                ) : (
                  <>
                    <span>सुरक्षित लॉगिन करें (Login)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Fast Test */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                त्वरित 1-क्लिक टेस्ट एक्सेस:
              </span>
              {activeTab === "STUDENT" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("student-birsa", "/student/dashboard")}
                    className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-800">Birsa Munda</div>
                    <div className="text-[10px] text-amber-600">NFST Scholar</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("student-shanti", "/student/dashboard")}
                    className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-800">Shanti Oraon</div>
                    <div className="text-[10px] text-emerald-600">NOS Oxford</div>
                  </button>
                </div>
              )}

              {activeTab === "MOTA_OFFICER" && (
                <button
                  type="button"
                  onClick={() => handleQuickLogin("officer-rajesh", "/officer/scrutiny")}
                  className="w-full p-2.5 text-left rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-800">Dr. Rajesh Verma</div>
                    <div className="text-[10px] text-amber-700">Senior Scrutiny Officer</div>
                  </div>
                  <span className="text-amber-700 font-bold text-xs">प्रवेश करें →</span>
                </button>
              )}

              {activeTab === "ADMIN" && (
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin-sunita", "/admin/analytics")}
                  className="w-full p-2.5 text-left rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-800">Smt. Sunita Murmu (IAS)</div>
                    <div className="text-[10px] text-purple-700">Joint Secretary & Admin</div>
                  </div>
                  <span className="text-purple-700 font-bold text-xs">प्रवेश करें →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
