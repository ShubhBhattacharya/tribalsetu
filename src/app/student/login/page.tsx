"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Globe, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ChevronDown
} from "lucide-react";
import TribalSetuLogo from "@/components/ui/TribalSetuLogo";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_INDIAN_LANGUAGES } from "@/lib/chatbotKnowledge";

export default function StudentLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [identifier, setIdentifier] = useState("849249127731");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showLangPicker, setShowLangPicker] = useState(false);

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("Please enter your Phone / Aadhaar or Email");
      return;
    }

    setIsLoading(true);
    let resolvedKey = "student-birsa";
    if (identifier.includes("shanti") || identifier.includes("9921")) {
      resolvedKey = "student-shanti";
    }

    const success = await login({
      identifier,
      password,
      role: "STUDENT",
      userKey: resolvedKey
    });

    if (success) {
      router.push("/student/dashboard");
    } else {
      setErrorMsg("Authentication failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const handle1ClickDemo = async (key: string = "student-birsa") => {
    setErrorMsg("");
    setIsLoading(true);
    if (key === "student-shanti") {
      setIdentifier("992155124412");
    } else {
      setIdentifier("849249127731");
    }
    setPassword("123456");

    const success = await login(key);
    if (success) {
      router.push("/student/dashboard");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-[#FEF08A] via-[#FDE047] to-[#F59E0B]">
      {/* Warm Golden Harvest / Sunlit Ambient Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200/90 via-amber-300/70 to-yellow-600/60 pointer-events-none"></div>
      
      {/* Decorative Warm Sunlight Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-400/50 blur-3xl pointer-events-none"></div>

      {/* Top Left Home Back Link */}
      <div className="absolute top-5 left-5 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 hover:bg-white text-xs font-bold text-[#1C3C28] shadow-sm backdrop-blur-md transition border border-white/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>

      {/* Main Neat & Clean Card (Matching Uploaded Screenshot Style) */}
      <div className="relative z-10 max-w-md w-full my-8 bg-white/90 sm:bg-white/95 backdrop-blur-xl rounded-[36px] p-7 sm:p-9 shadow-2xl border border-white/80 transition-all">
        
        {/* Website Logo Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="mb-2">
            <TribalSetuLogo size="lg" showText={false} />
          </div>
          <div className="text-xs font-black tracking-wider uppercase text-amber-900/80">
            Ministry of Tribal Affairs • Government of India
          </div>
        </div>

        {/* Title: Serif Typography matching Screenshot */}
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#1C3C28] text-center tracking-tight mb-5">
          Scholar login
        </h1>

        {/* 💡 Quick Demo Access Box (Exact Replica from Screenshot) */}
        <div className="bg-[#EBF6ED] border border-[#C2E7C8] rounded-2xl p-4 text-center space-y-2 mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#1C3C28]">
            <span>💡</span>
            <span>Quick Demo Access (Birsa Munda)</span>
          </div>
          <div className="text-[11px] text-[#225732] font-semibold">
            Demo Number: <strong className="font-mono text-[#1C3C28]">849249127731</strong> | Password: <strong className="font-mono text-[#1C3C28]">123456</strong>
          </div>
          <button
            type="button"
            onClick={() => handle1ClickDemo("student-birsa")}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#236A3A] hover:bg-[#1C552E] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>⚡</span>
            <span>1-Click Demo Login (सीधे लॉगिन करें)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Form Fields: Pill-Shaped Inputs */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C3C28] mb-1.5 pl-1">
              Phone number / Aadhaar number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full py-3.5 px-5 bg-[#F0F3F1] border border-[#D6DFD8] rounded-full focus:bg-white focus:border-[#236A3A] focus:ring-2 focus:ring-[#236A3A]/20 text-xs text-slate-800 font-medium placeholder:text-slate-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C3C28] mb-1.5 pl-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full py-3.5 px-5 pr-12 bg-[#F0F3F1] border border-[#D6DFD8] rounded-full focus:bg-white focus:border-[#236A3A] focus:ring-2 focus:ring-[#236A3A]/20 text-xs text-slate-800 font-medium placeholder:text-slate-400 outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary CTA Button: Pill Shape */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-[#1C3C28] hover:bg-[#122A1C] active:scale-[0.99] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Logging in...</span>
              </span>
            ) : (
              <span>Log in</span>
            )}
          </button>
        </form>

        {/* Bottom Link (Exact text from screenshot) */}
        <div className="text-center mt-5">
          <Link
            href="/student/apply"
            className="text-xs font-bold text-[#236A3A] hover:underline hover:text-[#122A1C] transition"
          >
            New here? Create a scholar account
          </Link>
        </div>
      </div>

      {/* Floating Bottom-Left Language Button (Matching Screenshot) */}
      <div className="fixed bottom-6 left-6 z-30">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLangPicker(!showLangPicker)}
            className="flex items-center gap-2 bg-[#236A3A] hover:bg-[#1A522C] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl border border-white/30 transition hover:scale-105 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{language.nativeName} / Language</span>
            <ChevronDown className="w-3 h-3 text-emerald-200" />
          </button>

          {showLangPicker && (
            <div className="absolute bottom-12 left-0 w-64 max-h-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2 overflow-y-auto z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 border-b border-slate-100 font-bold text-xs text-slate-700">
                भाषा चुनें (Select Language)
              </div>
              <div className="divide-y divide-slate-100 mt-1">
                {ALL_INDIAN_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l);
                      setShowLangPicker(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition cursor-pointer ${
                      language.code === l.code
                        ? "bg-emerald-50 text-[#1C3C28] font-bold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
