"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  FileText, 
  FolderLock, 
  IndianRupee, 
  User, 
  Camera, 
  Wifi, 
  Battery, 
  Signal, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  Globe, 
  PhoneCall, 
  Mic, 
  Zap, 
  Check, 
  X,
  RefreshCw,
  QrCode,
  Layers,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import TribalSetuLogo from "@/components/ui/TribalSetuLogo";

export default function MobileAppPage() {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, login } = useAuth();

  const [activeTab, setActiveTab] = useState<"home" | "apply" | "vault" | "dbt" | "profile">("home");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraScanned, setCameraScanned] = useState<boolean>(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState<boolean>(false);
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState<boolean>(true);

  const isShanti = currentUser?.id === "usr_student_shanti";

  const handleCapturePhoto = () => {
    setCameraScanned(true);
    setTimeout(() => {
      setIsCameraOpen(false);
      setCameraScanned(false);
      setActiveTab("vault");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 px-2 sm:px-4 flex flex-col items-center justify-start space-y-4">
      
      {/* Top Banner with Desktop Back & Screen Mode Controls */}
      <div className="max-w-md w-full flex items-center justify-between px-2 text-xs">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Mobile App (वेब पोर्टल)</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/workflow"
            className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900 font-bold transition flex items-center gap-1 text-[11px]"
          >
            <Sparkles className="w-3 h-3" />
            <span>Workflow Hub</span>
          </Link>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title={isFullScreen ? "Smartphone Frame View" : "Full-Screen View"}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Smartphone Device Mockup Shell */}
      <div 
        className={`w-full bg-black rounded-[44px] border-[7px] border-slate-700/80 shadow-2xl overflow-hidden transition-all duration-300 relative flex flex-col ${
          isFullScreen 
            ? "max-w-2xl min-h-[92vh]" 
            : "max-w-[390px] h-[810px]"
        }`}
      >
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
          <div className="w-2 h-2 rounded-full bg-blue-950"></div>
        </div>

        {/* 1. Android/iOS Status Bar */}
        <div className="bg-[#0a2540] text-slate-300 px-6 pt-3 pb-2 text-[11px] font-semibold flex items-center justify-between z-30 select-none">
          <span className="font-bold text-white tracking-wider">10:30 AM</span>
          <div className="flex items-center space-x-2">
            <span className="text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-400 rounded font-mono font-bold">5G</span>
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <span className="text-[9px]">98%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 2. Official App Header Bar */}
        <div className="bg-[#0a2540] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 z-20">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-amber-400 bg-white flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-black text-sm leading-none flex items-center gap-1">
                <span>Tribal</span><span className="text-amber-400">Setu</span>
              </div>
              <div className="text-[9px] text-amber-200 uppercase font-semibold mt-0.5 tracking-wider">
                MoTA • Government of India
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Quick Lang Switch */}
            <button 
              onClick={() => {
                const nextLang = language.code === 'hi' 
                  ? { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India' }
                  : { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'National' };
                setLanguage(nextLang as any);
              }}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md text-[10px] font-bold text-amber-300 border border-white/20 transition cursor-pointer"
            >
              🌐 {language.code === 'hi' ? 'EN' : 'हिन्दी'}
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 relative transition cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-200" />
              <span className="absolute 0 top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Notification Drawer Popover */}
        {showNotificationDrawer && (
          <div className="absolute top-20 inset-x-2 z-50 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-black text-xs text-[#0a2540]">Recent Official Alerts</span>
              <button 
                onClick={() => setShowNotificationDrawer(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
                <div className="font-bold text-emerald-900 flex items-center justify-between">
                  <span>💰 Stipend Credited</span>
                  <span className="text-[10px] text-emerald-700">Today</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  ₹38,800 successfully credited to Bank of India A/c via PFMS DBT.
                </p>
              </div>
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 space-y-0.5">
                <div className="font-bold text-blue-900 flex items-center justify-between">
                  <span>📜 Tahasildar Seal Verified</span>
                  <span className="text-[10px] text-blue-700">Yesterday</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Income Certificate authenticated by Optical OCR engine.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Scrollable App Viewport */}
        <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto pb-20">
          
          {/* TAB 1: HOME DASHBOARD */}
          {activeTab === "home" && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              {/* Scholar Digital ID Card */}
              <div className="bg-gradient-to-r from-[#0a2540] to-emerald-900 text-white rounded-2xl p-4 shadow-md space-y-3 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center shadow-sm">
                      {isShanti ? "SO" : "BM"}
                    </div>
                    <div>
                      <h2 className="font-extrabold text-sm leading-tight">
                        {isShanti ? "Shanti Oraon" : "Birsa Munda"}
                      </h2>
                      <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                        {isShanti ? "Oraon Tribe • Odisha" : "Santhal Tribe • Jharkhand"}
                      </div>
                      <div className="text-[10px] text-slate-300 mt-0.5">
                        {isShanti ? "NOS-2026-0042 (Oxford PhD)" : "NFST-2026-0842 (JNU PhD)"}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full text-[10px] font-bold">
                    Active Scholar
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Monthly Stipend</span>
                    <span className="font-black text-amber-300 text-sm">₹38,800</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[9px] uppercase">Direct DBT Status</span>
                    <span className="font-bold text-emerald-400">Aadhaar PFMS Active</span>
                  </div>
                </div>
              </div>

              {/* 5-Stage Compact Status Strip */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Application Pipeline</span>
                  <span className="font-black text-emerald-700 text-[11px]">Stage 4 of 5 (Selection)</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  <div className="h-1.5 rounded-full bg-emerald-600"></div>
                  <div className="h-1.5 rounded-full bg-emerald-600"></div>
                  <div className="h-1.5 rounded-full bg-emerald-600"></div>
                  <div className="h-1.5 rounded-full bg-emerald-600 animate-pulse"></div>
                  <div className="h-1.5 rounded-full bg-slate-200"></div>
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Applied</span>
                  <span>OCR</span>
                  <span>Scrutiny</span>
                  <span className="font-bold text-emerald-700">Merit</span>
                  <span>Disbursed</span>
                </div>
              </div>

              {/* Quick Actions 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="p-3 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-200 text-left transition space-y-2 shadow-xs group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Scan Certificate</div>
                    <div className="text-[10px] text-slate-500">Camera OCR Scanner</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("dbt")}
                  className="p-3 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 text-left transition space-y-2 shadow-xs group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">DBT Passbook</div>
                    <div className="text-[10px] text-slate-500">View Bank Credits</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("vault")}
                  className="p-3 bg-white hover:bg-blue-50 rounded-2xl border border-slate-200 text-left transition space-y-2 shadow-xs group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                    <FolderLock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Document Vault</div>
                    <div className="text-[10px] text-slate-500">DigiLocker Synced</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("apply")}
                  className="p-3 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 text-left transition space-y-2 shadow-xs group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">New Application</div>
                    <div className="text-[10px] text-slate-500">NFST / NOS 2026</div>
                  </div>
                </button>
              </div>

              {/* Offline Sync Banner (Tribal Area Connectivity) */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></div>
                  <div>
                    <span className="font-bold text-emerald-950">Offline Remote Mode</span>
                    <p className="text-[10px] text-emerald-800">Forms save locally in poor signal</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-mono text-[9px] font-bold">
                  Synced ✓
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: APPLY (MOBILE SCANNER WIZARD) */}
          {activeTab === "apply" && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="text-base font-black text-slate-900">Fellowship Application Wizard</h2>
                <p className="text-xs text-slate-500">Direct mobile submission for Scheduled Tribe scholars</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Scholarship Scheme</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800">
                    <option>NFST - National Fellowship for Higher Education</option>
                    <option>NOS - National Overseas Scholarship (Top 500 QS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">University / Institute</label>
                  <input 
                    type="text" 
                    defaultValue={isShanti ? "University of Oxford" : "Jawaharlal Nehru University (JNU)"}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Document Capture</label>
                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="w-full p-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-dashed border-emerald-400 rounded-xl flex items-center justify-center gap-2 text-emerald-800 font-bold cursor-pointer transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera Scanner (कैमरा स्कैन)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("vault")}
                  className="w-full py-3 bg-[#0a2540] hover:bg-[#123960] text-white font-extrabold rounded-xl text-xs transition cursor-pointer shadow-sm"
                >
                  Submit Application (आवेदन जमा करें)
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENT VAULT */}
          {activeTab === "vault" && (
            <div className="p-4 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Scholar Document Vault</h2>
                  <p className="text-xs text-slate-500">DigiLocker & Revenue Department Linked</p>
                </div>
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan</span>
                </button>
              </div>

              {/* Document Cards */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      📜
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">ST Caste Certificate</div>
                      <div className="text-[10px] text-slate-500">Tehsildar Khunti • Match: 99.8%</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                    Verified ✓
                  </span>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      💰
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Income Certificate (FY26)</div>
                      <div className="text-[10px] text-slate-500">Valid: 10-Jan-2026 (12-Mo Rule)</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                    Valid ✓
                  </span>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      🏫
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">University Offer Letter</div>
                      <div className="text-[10px] text-slate-500">{isShanti ? "Oxford Univ (QS #4)" : "JNU New Delhi (NIRF #2)"}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">
                    Confirmed ✓
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DBT PASSBOOK */}
          {activeTab === "dbt" && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="text-base font-black text-slate-900">Direct DBT Treasury Ledger</h2>
                <p className="text-xs text-slate-500">Live Aadhaar-seeded PFMS Disbursals</p>
              </div>

              {/* Balance Card */}
              <div className="p-4 bg-gradient-to-r from-emerald-800 to-[#0a2540] text-white rounded-2xl space-y-3 shadow-md">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Sanctioned Annual Allowance</span>
                  <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 rounded text-[10px] font-bold">100% Gov Funded</span>
                </div>
                <div className="text-2xl font-black text-amber-300">₹4,65,600 / yr</div>
                <div className="text-[11px] text-slate-300 border-t border-white/10 pt-2 flex justify-between">
                  <span>₹38,800 Monthly JRF</span>
                  <span>Bank of India **4029</span>
                </div>
              </div>

              {/* Transaction History */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Transaction History</div>
                
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                  <div>
                    <div className="font-bold text-slate-900">Month #1 Fellowship Stipend</div>
                    <div className="text-[10px] text-slate-500">18-Sep-2026 • UTR: 98234812</div>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">+ ₹38,800</span>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                  <div>
                    <div className="font-bold text-slate-900">Contingency Annual Grant</div>
                    <div className="text-[10px] text-slate-500">18-Sep-2026 • STEM Grant</div>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">+ ₹20,500</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === "profile" && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-2 py-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-md">
                  {isShanti ? "SO" : "BM"}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{isShanti ? "Shanti Oraon" : "Birsa Munda"}</h3>
                  <p className="text-xs text-slate-500">{isShanti ? "Oraon ST • Sundargarh, Odisha" : "Santhal ST • Khunti, Jharkhand"}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs shadow-xs">
                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Aadhaar Biometric Match</span>
                  <span className="font-bold text-emerald-700">FaceRD Verified ✓</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Tribal PVTG Category</span>
                  <span className="font-bold text-slate-900">Priority Tier-1</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Offline Remote Sync</span>
                  <button 
                    onClick={() => setOfflineSyncEnabled(!offlineSyncEnabled)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                      offlineSyncEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {offlineSyncEnabled ? "Enabled ✓" : "Disabled"}
                  </button>
                </div>
              </div>

              {/* Demo Persona Switcher */}
              <div className="p-3 bg-slate-100 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-slate-700">Switch Demo Scholar</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => login("student-birsa")}
                    className={`p-2 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      !isShanti ? "bg-[#0a2540] text-white" : "bg-white text-slate-700"
                    }`}
                  >
                    Birsa (NFST)
                  </button>
                  <button
                    onClick={() => login("student-shanti")}
                    className={`p-2 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      isShanti ? "bg-[#0a2540] text-white" : "bg-white text-slate-700"
                    }`}
                  >
                    Shanti (NOS)
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 4. Camera Document Scanner Simulation Overlay */}
        {isCameraOpen && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-white text-xs pt-4 px-2">
              <span className="font-mono text-emerald-400">● AI CAMERA SCANNER</span>
              <button 
                onClick={() => setIsCameraOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Viewfinder Target */}
            <div className="relative aspect-3/4 max-h-[380px] w-full border-2 border-emerald-500/80 rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-slate-950">
              {/* Corner Targets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-3 border-l-3 border-emerald-400"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-3 border-r-3 border-emerald-400"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-3 border-l-3 border-emerald-400"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-3 border-r-3 border-emerald-400"></div>

              {cameraScanned ? (
                <div className="text-center space-y-2 text-white animate-in zoom-in-90">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mx-auto text-xl shadow-lg">
                    ✓
                  </div>
                  <div className="font-bold text-sm text-emerald-300">Tehsildar Seal Detected!</div>
                  <div className="text-[11px] text-slate-300">Confidence: 99.6% • Saving to Vault...</div>
                </div>
              ) : (
                <div className="text-center space-y-2 text-slate-400 p-4">
                  <Camera className="w-10 h-10 mx-auto text-emerald-400 animate-pulse" />
                  <div className="text-xs font-bold text-slate-200">Align Certificate within Box</div>
                  <div className="text-[10px]">Auto-detects Revenue Seal & Date</div>
                </div>
              )}
            </div>

            {/* Shutter Button */}
            <div className="text-center pb-6">
              <button
                onClick={handleCapturePhoto}
                disabled={cameraScanned}
                className="w-16 h-16 rounded-full border-4 border-white bg-emerald-600 hover:bg-emerald-500 shadow-2xl transition cursor-pointer mx-auto flex items-center justify-center text-white"
              >
                <div className="w-12 h-12 rounded-full bg-white/20"></div>
              </button>
            </div>
          </div>
        )}

        {/* 5. Native Bottom Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition cursor-pointer ${
              activeTab === "home" ? "text-emerald-700" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab("apply")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition cursor-pointer ${
              activeTab === "apply" ? "text-emerald-700" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Apply</span>
          </button>

          {/* Floating Camera Button */}
          <button
            onClick={() => setIsCameraOpen(true)}
            className="w-11 h-11 -mt-5 rounded-full bg-gradient-to-tr from-[#0a2540] to-emerald-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-2 border-white ring-2 ring-emerald-500/20"
            title="Scan Document"
          >
            <Camera className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab("dbt")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition cursor-pointer ${
              activeTab === "dbt" ? "text-emerald-700" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <IndianRupee className="w-5 h-5" />
            <span>DBT</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition cursor-pointer ${
              activeTab === "profile" ? "text-emerald-700" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>

      </div>

    </div>
  );
}
