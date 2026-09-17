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

  // If not authenticated, render Professional GovTech Security Gate
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-100/70 text-slate-800">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Clean Lock Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-sm">
              <Lock className="w-8 h-8 text-emerald-700" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>सुरक्षित प्रमाणीकरण • Secure Authentication</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                प्रवेश आवश्यक (Login Required)
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                जनजातीय कार्य मंत्रालय (MoTA) के इस अनुभाग तक पहुँचने के लिए कृपया अपने क्रेडेंशियल्स के साथ लॉगिन करें।
              </p>
            </div>

            {/* Security Protocol Info */}
            <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">सुरक्षा प्रोटोकॉल</span>
                <span className="text-slate-800 font-semibold">256-Bit SSL / TLS 1.3</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">सत्र सुरक्षा</span>
                <span className="text-emerald-700 font-semibold">Auto-Timeout Active</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">लक्षित पोर्टल</span>
                <span className="text-blue-700 font-semibold">{roleTitle}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">प्रमाणीकरण विधि</span>
                <span className="text-slate-800 font-semibold">ID / Password / 2FA</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <Link
                href={`/${targetPortal}/login`}
                className="w-full py-3 bg-[#0F2F1F] hover:bg-[#16422c] text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-4 h-4 text-emerald-300" />
                <span>सुरक्षित लॉगिन करें ({roleTitle} Login)</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </Link>

              <button
                type="button"
                onClick={handleQuickClearance}
                disabled={isAuthorizing}
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300/80 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {isAuthorizing ? 'प्रमाणीकरण जारी है... (Authenticating...)' : '⚡ त्वरित डेमो एक्सेस (Instant Demo Access)'}
                </span>
              </button>
            </div>

            <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
              राष्ट्रीय सूचना विज्ञान केंद्र (NIC), जनजातीय कार्य मंत्रालय, भारत सरकार
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
