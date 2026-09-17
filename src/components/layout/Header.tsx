"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  GraduationCap, 
  Sliders, 
  BarChart3, 
  FileCheck2, 
  AlertCircle, 
  ChevronDown, 
  Award, 
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";
import { MOCK_USERS, DEFAULT_USER, getRoleHomeRoute } from "@/lib/auth";
import { UserProfile, UserRole } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    const savedRoleKey = localStorage.getItem("tribalsetu_user_key");
    if (savedRoleKey && MOCK_USERS[savedRoleKey]) {
      setCurrentUser(MOCK_USERS[savedRoleKey]);
    }
  }, []);

  const handleRoleChange = (key: string) => {
    const selected = MOCK_USERS[key];
    if (selected) {
      setCurrentUser(selected);
      localStorage.setItem("tribalsetu_user_key", key);
      setShowRoleDropdown(false);
      const homeRoute = getRoleHomeRoute(selected.role);
      router.push(homeRoute);
    }
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };

  const adjustFontSize = (delta: number) => {
    const next = Math.max(-1, Math.min(1, fontSizeLevel + delta));
    setFontSizeLevel(next);
    const htmlEl = document.documentElement;
    if (next === -1) htmlEl.style.fontSize = "14px";
    else if (next === 1) htmlEl.style.fontSize = "18px";
    else htmlEl.style.fontSize = "16px";
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* 1. Official National Tricolor Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF671F]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#046A38]"></div>
      </div>

      {/* 2. Official Government of India Top Banner */}
      <div className="bg-[#0a2540] text-slate-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-2.5 text-[11px] sm:text-xs">
          <span className="font-bold tracking-wide text-amber-300">भारत सरकार</span>
          <span className="text-slate-500">•</span>
          <span className="font-semibold text-slate-200">Government of India</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-bold text-amber-200 hidden sm:inline">जनजातीय कार्य मंत्रालय</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden md:inline">Ministry of Tribal Affairs</span>
        </div>
        <div className="flex items-center space-x-3">
          {/* Accessibility controls */}
          <div className="flex items-center space-x-1 text-[11px] bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">
            <span className="text-slate-400 font-medium mr-1">Text:</span>
            <button 
              onClick={() => adjustFontSize(-1)} 
              title="Decrease Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition"
            >A-</button>
            <button 
              onClick={() => adjustFontSize(0)} 
              title="Reset Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition"
            >A</button>
            <button 
              onClick={() => adjustFontSize(1)} 
              title="Increase Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition"
            >A+</button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={toggleContrast}
              title="Toggle High Contrast" 
              className="px-1 text-slate-300 hover:text-amber-400 transition text-[10px] font-semibold"
            >
              {highContrast ? "Normal" : "Contrast"}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MoTA Optical AI Active</span>
          </div>
        </div>
      </div>

      {/* 3. Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Emblem */}
        <Link href="/" className="flex items-center space-x-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a2540] via-[#0e3b66] to-[#047857] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200 border border-slate-700/20">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-[#0a2540]">
                Tribal<span className="text-emerald-600">Setu</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                <Sparkles className="w-3 h-3 text-emerald-600" /> AI-Enabled
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
              Unified Scholarship & Fellowship Portal • MoTA
            </p>
          </div>
        </Link>

        {/* Dynamic Role Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          {currentUser.role === "STUDENT" && (
            <>
              <Link
                href="/student/dashboard"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/student/dashboard"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <Link
                href="/student/apply"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/student/apply"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Apply Fellowship
              </Link>
              <Link
                href="/student/deficiencies"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/student/deficiencies"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/70"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> 
                <span>Deficiencies</span>
                <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-mono font-bold">1</span>
              </Link>
            </>
          )}

          {currentUser.role === "MOTA_OFFICER" && (
            <>
              <Link
                href="/officer/scrutiny"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname.startsWith("/officer/scrutiny")
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Scrutiny Workbench
              </Link>
              <Link
                href="/officer/applications"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/officer/applications"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Master Queue
              </Link>
            </>
          )}

          {currentUser.role === "ADMIN" && (
            <>
              <Link
                href="/admin/analytics"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/admin/analytics"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" /> Command Center
              </Link>
              <Link
                href="/admin/rules"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/admin/rules"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Rule Engine
              </Link>
              <Link
                href="/admin/merit"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/admin/merit"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Merit Gazette
              </Link>
            </>
          )}
        </nav>

        {/* User Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 px-3 py-1.5 rounded-xl transition-all shadow-xs text-left"
            title="Switch User Role"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0a2540] to-emerald-700 text-white flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-white">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-extrabold text-slate-800 leading-tight flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  currentUser.role === "STUDENT" ? "bg-blue-500" :
                  currentUser.role === "MOTA_OFFICER" ? "bg-amber-500" : "bg-purple-600"
                }`}></span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                {currentUser.role === "STUDENT" ? "Student Scholar" :
                 currentUser.role === "MOTA_OFFICER" ? "MoTA Officer" : "Administrator"}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
          </button>

          {/* Persona Switcher Dropdown */}
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold">
                  Switch Demo Persona
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Instant Role Switch</span>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 px-2 pt-1 uppercase tracking-wider">Student Applicants</div>
                
                <button
                  onClick={() => handleRoleChange("student-birsa")}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    currentUser.id === "usr_student_birsa"
                      ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-2xs"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">BM</div>
                    <div>
                      <div className="font-bold text-slate-900">Birsa Munda</div>
                      <div className="text-[10px] text-amber-600 font-semibold">Has Flagged Deficiency (NFST)</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] rounded font-extrabold">STUDENT</span>
                </button>

                <button
                  onClick={() => handleRoleChange("student-shanti")}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    currentUser.id === "usr_student_shanti"
                      ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-2xs"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">SO</div>
                    <div>
                      <div className="font-bold text-slate-900">Shanti Oraon</div>
                      <div className="text-[10px] text-slate-500">NOS Oxford PhD Candidate</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] rounded font-extrabold">STUDENT</span>
                </button>

                <div className="text-[10px] font-bold text-slate-400 px-2 pt-2 uppercase tracking-wider border-t border-slate-100">MoTA Officials</div>
                
                <button
                  onClick={() => handleRoleChange("officer-rajesh")}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    currentUser.role === "MOTA_OFFICER"
                      ? "bg-amber-50 text-amber-950 font-bold border border-amber-200 shadow-2xs"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">RV</div>
                    <div>
                      <div className="font-bold text-slate-900">Dr. Rajesh Verma</div>
                      <div className="text-[10px] text-slate-500">Senior Scrutiny Officer</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] rounded font-extrabold">OFFICER</span>
                </button>

                <button
                  onClick={() => handleRoleChange("admin-sunita")}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    currentUser.role === "ADMIN"
                      ? "bg-purple-50 text-purple-950 font-bold border border-purple-200 shadow-2xs"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">SM</div>
                    <div>
                      <div className="font-bold text-slate-900">Smt. Sunita Murmu (IAS)</div>
                      <div className="text-[10px] text-slate-500">Joint Secretary & Admin</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[9px] rounded font-extrabold">ADMIN</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
