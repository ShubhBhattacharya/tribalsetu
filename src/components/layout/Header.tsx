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
  CheckCircle2,
  Globe,
  Search,
  Check,
  Lock,
  LogOut,
  BookOpen,
  ShieldAlert,
  Clock
} from "lucide-react";
import { MOCK_USERS, DEFAULT_USER, getRoleHomeRoute } from "@/lib/auth";
import { UserProfile, UserRole } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ALL_INDIAN_LANGUAGES } from "@/lib/chatbotKnowledge";
import TribalSetuLogo from "@/components/ui/TribalSetuLogo";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { 
    session, 
    isAuthenticated, 
    currentUser: authUser, 
    sessionRemaining, 
    login, 
    logout, 
    setShowTour 
  } = useAuth();

  const currentUser = authUser || DEFAULT_USER;
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [langSearch, setLangSearch] = useState("");
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const handleRoleChange = async (key: string) => {
    const selected = MOCK_USERS[key];
    if (selected) {
      await login(key);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* 1. Official National Tricolor Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF671F]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#046A38]"></div>
      </div>

      {/* 2. Official Government of India Top Banner */}
      <div className="bg-[#0a2540] text-slate-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-2.5 text-[11px] sm:text-xs">
          <span className="font-bold tracking-wide text-amber-300">{t('govIndia')}</span>
          <span className="text-slate-500">•</span>
          <span className="font-semibold text-slate-200">Government of India</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-bold text-amber-200 hidden sm:inline">{t('mota')}</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden md:inline">Ministry of Tribal Affairs</span>
        </div>

        <div className="flex items-center space-x-2.5 flex-wrap">
          {/* Black Cat Commando Security Status Chip */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/40 text-red-300 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="hidden sm:inline">NSG LEVEL-4 SECURE:</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {formatTime(sessionRemaining)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>सुरक्षा स्तर: अन-ऑथराइज्ड (सार्वजनिक दृश्य)</span>
            </div>
          )}

          {/* Interactive Portal Guide Button */}
          <button
            type="button"
            onClick={() => setShowTour(true)}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-bold border border-blue-400/40 transition shadow-2xs cursor-pointer"
            title="ओपन पोर्टल गाइड (Open Interactive Guide)"
          >
            <BookOpen className="w-3 h-3 text-amber-300" />
            <span>📖 गाइड (Guide)</span>
          </button>

          {/* Official Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-900 to-slate-800 hover:from-emerald-800 hover:to-slate-700 text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold border border-emerald-500/40 transition shadow-xs cursor-pointer"
              title="Change Website Language / भाषा बदलें"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{language.nativeName}</span>
              <span className="text-[10px] text-slate-400">({language.name})</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 top-8 z-50 w-72 max-h-80 bg-white text-slate-900 border border-slate-300 rounded-xl shadow-2xl p-2 flex flex-col">
                <div className="text-[11px] font-bold text-slate-700 px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                  <span>पोर्टल भाषा चुनें (Select Language)</span>
                  <span className="text-[9px] text-emerald-700 font-normal">32+ Languages</span>
                </div>
                <div className="relative my-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full pl-8 pr-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-emerald-600 text-slate-900"
                  />
                </div>
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100 pr-1 text-xs">
                  {ALL_INDIAN_LANGUAGES.filter(
                    (l) =>
                      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
                      l.nativeName.toLowerCase().includes(langSearch.toLowerCase())
                  ).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between transition cursor-pointer ${
                        language.code === lang.code
                          ? "bg-emerald-50 text-emerald-900 font-bold"
                          : "hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{lang.nativeName}</div>
                        <div className="text-[10px] text-slate-500">{lang.name}</div>
                      </div>
                      {language.code === lang.code && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accessibility controls */}
          <div className="hidden md:flex items-center space-x-1 text-[11px] bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">
            <span className="text-slate-400 font-medium mr-1">Text:</span>
            <button 
              onClick={() => adjustFontSize(-1)} 
              title="Decrease Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition cursor-pointer"
            >A-</button>
            <button 
              onClick={() => adjustFontSize(0)} 
              title="Reset Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition cursor-pointer"
            >A</button>
            <button 
              onClick={() => adjustFontSize(1)} 
              title="Increase Font Size"
              className="px-1 text-slate-300 hover:text-amber-400 font-bold transition cursor-pointer"
            >A+</button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={toggleContrast}
              title="Toggle High Contrast" 
              className="px-1 text-slate-300 hover:text-amber-400 transition text-[10px] font-semibold cursor-pointer"
            >
              {highContrast ? "Normal" : "Contrast"}
            </button>
          </div>

          {/* Logout Action if authenticated */}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white px-2 py-0.5 rounded-md text-[10px] font-bold border border-red-500 transition cursor-pointer"
              title="सुरक्षित लॉगआउट करें (End Session)"
            >
              <LogOut className="w-2.5 h-2.5" />
              <span>लॉगआउट</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Emblem */}
        <Link href="/" className="flex items-center space-x-3 group">
          <TribalSetuLogo size="md" textColor="dark" showText={true} />
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
                <Layers className="w-3.5 h-3.5" /> {t('navDashboard')}
              </Link>
              <Link
                href="/student/apply"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/student/apply"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" /> {t('navApply')}
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
                <span>{t('navDeficiencies')}</span>
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
                <FileCheck2 className="w-3.5 h-3.5" /> {t('navScrutiny')}
              </Link>
              <Link
                href="/officer/applications"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/officer/applications"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> {t('navApplications')}
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
                <BarChart3 className="w-3.5 h-3.5" /> {t('navAnalytics')}
              </Link>
              <Link
                href="/admin/rules"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/admin/rules"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> {t('navRules')}
              </Link>
              <Link
                href="/admin/merit"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  pathname === "/admin/merit"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" /> {t('navMerit')}
              </Link>
            </>
          )}
        </nav>

        {/* User Role Switcher & Login CTA */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>प्रवेश करें (Login)</span>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 px-3 py-1.5 rounded-xl transition-all shadow-xs text-left cursor-pointer"
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
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
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
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
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
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
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
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
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
          )}
        </div>
      </div>
    </header>
  );
}
