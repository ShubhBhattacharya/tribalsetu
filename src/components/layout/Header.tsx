"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  UserCircle, 
  GraduationCap, 
  Sliders, 
  BarChart3, 
  FileCheck2, 
  AlertCircle, 
  ChevronDown, 
  Award, 
  Sparkles,
  Layers,
  Sun,
  Moon,
  Volume2
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
    // Load persisted user or default
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
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* 1. Indian Tricolor Accent Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF671F]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#046A38]"></div>
      </div>

      {/* 2. Official GovTech Top Bar */}
      <div className="bg-[#0a2540] text-slate-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-medium tracking-wide">???? ????? | Government of India</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200">??????? ????? ???????? | Ministry of Tribal Affairs</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <span className="text-slate-400">Accessibility:</span>
            <button 
              onClick={() => adjustFontSize(-1)} 
              title="Decrease Font Size"
              className="px-1.5 hover:text-amber-400 font-bold"
            >A-</button>
            <button 
              onClick={() => adjustFontSize(0)} 
              title="Reset Font Size"
              className="px-1.5 hover:text-amber-400 font-bold"
            >A</button>
            <button 
              onClick={() => adjustFontSize(1)} 
              title="Increase Font Size"
              className="px-1.5 hover:text-amber-400 font-bold"
            >A+</button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={toggleContrast}
              title="High Contrast Mode" 
              className="px-1 hover:text-amber-400"
            >
              {highContrast ? "Normal" : "High Contrast"}
            </button>
          </div>
          <span className="text-emerald-400 flex items-center gap-1 font-medium text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            MoTA AI Engine Active
          </span>
        </div>
      </div>

      {/* 3. Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0a2540] to-[#047857] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#0a2540]">
                Tribal<span className="text-emerald-600">Setu</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" /> AI-Enabled
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Unified Scholarship & Fellowship System • MoTA
            </p>
          </div>
        </Link>

        {/* Dynamic Role Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {currentUser.role === "STUDENT" && (
            <>
              <Link
                href="/student/dashboard"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/student/dashboard"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <Link
                href="/student/apply"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/student/apply"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Apply Wizard
              </Link>
              <Link
                href="/student/deficiencies"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/student/deficiencies"
                    ? "bg-amber-600 text-white"
                    : "text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> 
                <span>Deficiencies</span>
                <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px]">1</span>
              </Link>
            </>
          )}

          {currentUser.role === "MOTA_OFFICER" && (
            <>
              <Link
                href="/officer/scrutiny"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/officer/scrutiny")
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Scrutiny Workbench
              </Link>
              <Link
                href="/officer/applications"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/officer/applications"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> All Applications
              </Link>
            </>
          )}

          {currentUser.role === "ADMIN" && (
            <>
              <Link
                href="/admin/analytics"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/admin/analytics"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" /> Command Center
              </Link>
              <Link
                href="/admin/rules"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/admin/rules"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Rule Engine
              </Link>
              <Link
                href="/admin/merit"
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/admin/merit"
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Merit Engine
              </Link>
            </>
          )}
        </nav>

        {/* Role Switcher & User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center space-x-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg transition text-left"
            title="Switch User Role & Persona"
          >
            <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold overflow-hidden border border-slate-400">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                {currentUser.name}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                  currentUser.role === "STUDENT" ? "bg-blue-600" :
                  currentUser.role === "MOTA_OFFICER" ? "bg-amber-600" : "bg-purple-600"
                }`}></span>
                {currentUser.role === "STUDENT" ? "Student Applicant" :
                 currentUser.role === "MOTA_OFFICER" ? "MoTA Scrutiny Officer" : "MoTA Administrator"}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
          </button>

          {/* Persona Switcher Dropdown */}
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-2 py-1.5 border-b border-slate-100 mb-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Select Role & Persona
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 px-2 pt-1 uppercase">Students</div>
                <button
                  onClick={() => handleRoleChange("student-birsa")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                    currentUser.id === "usr_student_birsa"
                      ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div>
                    <div>Birsa Munda (Santhal, JH)</div>
                    <div className="text-[10px] text-amber-600 font-medium">Has Flagged Deficiency</div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-semibold">STUDENT</span>
                </button>

                <button
                  onClick={() => handleRoleChange("student-shanti")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                    currentUser.id === "usr_student_shanti"
                      ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div>
                    <div>Shanti Oraon (Oraon, OD)</div>
                    <div className="text-[10px] text-slate-400">NOS Abroad Applicant (Oxford)</div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-semibold">STUDENT</span>
                </button>

                <div className="text-[10px] font-bold text-slate-400 px-2 pt-2 uppercase border-t border-slate-100">MoTA Officials</div>
                <button
                  onClick={() => handleRoleChange("officer-rajesh")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                    currentUser.role === "MOTA_OFFICER"
                      ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div>
                    <div>Dr. Rajesh Verma</div>
                    <div className="text-[10px] text-slate-400">Senior Scrutiny Officer</div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-semibold">OFFICER</span>
                </button>

                <button
                  onClick={() => handleRoleChange("admin-sunita")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                    currentUser.role === "ADMIN"
                      ? "bg-purple-50 text-purple-900 font-bold border border-purple-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div>
                    <div>Smt. Sunita Murmu (IAS)</div>
                    <div className="text-[10px] text-slate-400">Joint Secretary & Scheme Admin</div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] rounded font-semibold">ADMIN</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
