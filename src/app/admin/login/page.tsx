"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Lock,
  Sliders,
  Award,
  BarChart3
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("sunita.murmu@mota.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    localStorage.setItem("tribalsetu_user_key", "admin-sunita");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/analytics");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ (Back to Home)</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0a2540] via-[#24174d] to-[#7c3aed] text-white p-7 text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-md">
              <BarChart3 className="w-7 h-7 text-purple-300" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
              MoTA Executive Secretariat
            </span>
            <h1 className="text-2xl font-black tracking-tight mt-1 text-white">
              मंत्रालय प्रशासक कमांड सेंटर
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Ministry Policy, Rule Engine & Merit List Gazette
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Secretariat Email ID (@mota.gov.in)
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Passcode / 2FA Token</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden font-medium"
                />
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
              >
                {isLoading ? (
                  <span>Accessing Command Center...</span>
                ) : (
                  <>
                    <span>Enter MoTA Command Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                त्वरित प्रशासक लॉगिन (Demo Administrator):
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full p-3 text-left rounded-xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200 transition"
              >
                <div className="text-xs font-black text-purple-950">Smt. Sunita Murmu (IAS)</div>
                <div className="text-[10px] text-purple-800 font-semibold mt-0.5">
                  Joint Secretary & Scheme Administrator
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
