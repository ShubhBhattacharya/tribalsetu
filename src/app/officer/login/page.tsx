"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileCheck2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  UserCheck, 
  Building2, 
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function OfficerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [govEmail, setGovEmail] = useState("rajesh.verma@mota.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userKey: string = "officer-rajesh") => {
    setIsLoading(true);
    const success = await login(userKey);
    if (success) {
      setTimeout(() => {
        setIsLoading(false);
        router.push("/officer/scrutiny");
      }, 400);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full space-y-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ (Back to Home)</span>
          </Link>

          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
            <span>Desk Scrutiny Level-4</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0a2540] via-[#1a3c61] to-[#b45309] text-white p-7 text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-md">
              <FileCheck2 className="w-7 h-7 text-amber-300" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
              MoTA Desk Scrutiny Division
            </span>
            <h1 className="text-2xl font-black tracking-tight mt-1 text-white">
              संवीक्षा अधिकारी लॉगिन (Officer Desk)
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Government of India Single Sign-On (Jan Parichay / NIC)
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {/* Military Cyber Defense Chip */}
            <div className="p-3 bg-slate-900 rounded-2xl text-slate-200 text-xs border border-red-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono font-bold text-red-300">BLACK CAT COMMANDO CYBER DEFENSE</div>
                  <div className="text-[10px] text-slate-400">Restricted Officer Workbench (Zero Leak Guarantee)</div>
                </div>
              </div>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-700">AES-256</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Email ID (@mota.gov.in / @nic.in)
                </label>
                <input
                  type="email"
                  value={govEmail}
                  onChange={(e) => setGovEmail(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Security Token / Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium"
                />
              </div>

              <button
                type="button"
                onClick={() => handleLogin("officer-rajesh")}
                disabled={isLoading}
                className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] cursor-pointer"
              >
                {isLoading ? (
                  <span>Generating Officer Clearance Token...</span>
                ) : (
                  <>
                    <span>Enter Scrutiny Workbench</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                त्वरित अधिकारी लॉगिन (Demo Official Access):
              </div>
              <button
                type="button"
                onClick={() => handleLogin("officer-rajesh")}
                className="w-full p-3 text-left rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 transition cursor-pointer"
              >
                <div className="text-xs font-black text-amber-950">Dr. Rajesh Verma</div>
                <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                  Senior Scrutiny Officer • Higher Education Section
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
