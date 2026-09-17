"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BarChart3, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [adminEmail, setAdminEmail] = useState("sunita.murmu@mota.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!adminEmail.trim()) {
      setErrorMsg("कृपया सचिवालय ईमेल दर्ज करें (Please enter secretariat email)");
      return;
    }

    setIsLoading(true);
    const success = await login({
      identifier: adminEmail,
      password,
      role: "ADMIN",
      userKey: "admin-sunita",
    });

    if (success) {
      router.push("/admin/analytics");
    } else {
      setErrorMsg("प्रशासक प्रमाणीकरण विफल (Invalid Admin Credentials)");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setErrorMsg("");
    setIsLoading(true);
    const success = await login("admin-sunita");
    if (success) {
      router.push("/admin/analytics");
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
          <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            <ShieldCheck className="w-3 h-3 text-purple-600" />
            <span>MoTA सचिवालय कमांड</span>
          </div>
        </div>

        {/* Clean Admin Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0a2540] via-[#24174d] to-[#7c3aed] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-2.5 shadow-sm">
              <BarChart3 className="w-6 h-6 text-purple-300" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300 block">
              कार्यकारी सचिवालय • जनजातीय कार्य मंत्रालय
            </span>
            <h1 className="text-xl font-black tracking-tight text-white mt-0.5">
              मंत्रालय प्रशासक लॉगिन (Command Center)
            </h1>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Policy, Rule Engine & Merit List Gazette
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  सचिवालय ईमेल ID (@mota.gov.in)
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin.secretary@mota.gov.in"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">
                    प्रशासक पासकोड / 2FA पिन (Passcode)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? "छिपाएं" : "दिखाएं"}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-hidden font-medium text-slate-900 transition text-xs"
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
                    <span>कमांड सेंटर लोड हो रहा है...</span>
                  </span>
                ) : (
                  <>
                    <span>कमांड सेंटर में प्रवेश करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                त्वरित प्रशासक लॉगिन (1-Click Test Access):
              </span>
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full p-2.5 text-left rounded-xl bg-slate-50 hover:bg-purple-50/80 border border-slate-200 hover:border-purple-300 transition cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-800 text-xs group-hover:text-purple-950">
                    Smt. Sunita Murmu (IAS)
                  </div>
                  <div className="text-[10px] text-purple-700 font-semibold">
                    Joint Secretary & Scheme Administrator
                  </div>
                </div>
                <span className="text-purple-700 font-bold text-xs">लॉगिन करें →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
