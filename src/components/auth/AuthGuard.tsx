'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Fingerprint, 
  ArrowRight, 
  AlertTriangle,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { UserRole } from '@/types';

interface AuthGuardProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, isAuthenticated, currentUser, login } = useAuth();
  const { t } = useLanguage();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // If path is a login page, bypass guard
  const isLoginPage = pathname.endsWith('/login');

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Determine portal target for login redirect
  let targetPortal: 'student' | 'officer' | 'admin' = 'student';
  let defaultDemoKey = 'student-birsa';
  let roleTitle = 'छात्र शोधार्थी (ST Scholar)';

  if (pathname.startsWith('/officer')) {
    targetPortal = 'officer';
    defaultDemoKey = 'officer-rajesh';
    roleTitle = 'संवीक्षा अधिकारी (Scrutiny Officer)';
  } else if (pathname.startsWith('/admin')) {
    targetPortal = 'admin';
    defaultDemoKey = 'admin-sunita';
    roleTitle = 'मंत्रालय प्रशासक (MoTA Admin)';
  }

  // Fast demo clearance unlock
  const handleQuickClearance = async () => {
    setIsAuthorizing(true);
    await login(defaultDemoKey);
    setIsAuthorizing(false);
  };

  // If not authenticated, render NSG Black Cat Commando Security Clearance Gate
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 sm:p-6 bg-[#040e1a] text-slate-100 selection:bg-red-500 selection:text-white">
        <div className="max-w-xl w-full bg-slate-900/90 border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60 text-center relative overflow-hidden backdrop-blur-md">
          {/* Ambient Security Watermark */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Black Cat Commando Shield Crest */}
          <div className="relative z-10 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-red-600 via-red-800 to-black p-0.5 shadow-xl shadow-red-950/70 border border-red-400/40 flex items-center justify-center">
              <div className="w-full h-full bg-[#071322] rounded-[22px] flex flex-col items-center justify-center">
                <Lock className="w-8 h-8 text-red-400 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-[11px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>NSG Black Cat Cyber Shield • Level-4 Restricted</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                सुरक्षा अनुमति आवश्यक (Security Clearance Required)
              </h1>
              <p className="text-xs text-slate-300 font-semibold max-w-md mx-auto leading-relaxed">
                जनजातीय कार्य मंत्रालय (MoTA) का यह खंड अत्यधिक गोपनीय व सुरक्षित है। डेटा सुरक्षा नीति (Data Leakage Risk &lt; 0.000001%) के अंतर्गत प्रवेश हेतु पूर्व सत्यापन अनिवार्य है।
              </p>
            </div>

            {/* Cryptographic Clearance Metrics */}
            <div className="grid grid-cols-2 gap-2 text-left bg-black/40 p-3 rounded-2xl border border-slate-800 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Enclave Architecture</span>
                <span className="text-emerald-400 font-bold">AES-256-GCM Hardware HSM</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Leak Risk Tolerance</span>
                <span className="text-amber-400 font-bold">0.000001% Zero-Tolerance</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Sector Requested</span>
                <span className="text-blue-400 font-bold">{pathname}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Identity Verification</span>
                <span className="text-red-400 font-bold">Aadhaar / Jan Parichay 2FA</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <Link
                href={`/${targetPortal}/login`}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-700 to-rose-800 hover:from-red-500 hover:to-rose-700 text-white rounded-xl text-xs font-black shadow-lg shadow-red-950/70 transition flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-4 h-4" />
                <span>सुरक्षित लॉगिन करें ({roleTitle} Login)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleQuickClearance}
                disabled={isAuthorizing}
                className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isAuthorizing ? 'Generating NSG Military Token...' : `त्वरित अधिकृत टेस्ट क्लीयरेंस (Instant Demo Pass)`}
                </span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
              राष्ट्रीय सूचना विज्ञान केंद्र (NIC) एवं डिजिटल सुरक्षा कमांड, जनजातीय कार्य मंत्रालय, भारत सरकार।
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check role authorization if restricted
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 bg-slate-900 text-white">
        <div className="max-w-md w-full bg-slate-800/90 border border-amber-500/40 rounded-3xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">अनुमति प्रतिबंध (Role Unauthorized)</h2>
          <p className="text-xs text-slate-300">
            आपका वर्तमान सत्र <strong className="text-amber-300">{currentUser.name}</strong> ({currentUser.role}) के रूप में सक्रिय है। इस पृष्ठ के लिए अधिकृत भूमिका: {allowedRoles.join(', ')}।
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleQuickClearance}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              उपयुक्त भूमिका में स्विच करें (Switch Role)
            </button>
            <Link
              href="/"
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold transition"
            >
              मुख्य पृष्ठ पर जाएं (Back to Home)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
