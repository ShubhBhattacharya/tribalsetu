import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TribalSetu | MoTA AI-Enabled Scholarship & Fellowship Portal",
  description: "Unified AI-Enabled Scholarship & Fellowship Management System for the Ministry of Tribal Affairs (MoTA), Government of India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        <Header />
        <main className="flex-1">{children}</main>
        
        {/* Official GovTech India Footer */}
        <footer className="bg-[#06182a] text-slate-400 text-xs mt-auto border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Col 1 */}
              <div className="space-y-3 md:col-span-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center font-bold text-white text-sm">
                    TS
                  </div>
                  <span className="text-base font-bold text-white tracking-tight">
                    Tribal<span className="text-emerald-400">Setu</span>
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Unified AI-Enabled Higher Education Scholarship & Fellowship System. An initiative under the Ministry of Tribal Affairs, Government of India.
                </p>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Version 1.0.4-PROD • Digital India Certified
                </div>
              </div>

              {/* Col 2 */}
              <div className="space-y-2 text-[11px]">
                <div className="font-bold text-slate-200 text-xs uppercase tracking-wider">MoTA Schemes</div>
                <ul className="space-y-1.5">
                  <li><span className="hover:text-white">National Fellowship for ST Students (NFST)</span></li>
                  <li><span className="hover:text-white">National Overseas Scholarship (NOS)</span></li>
                  <li><span className="hover:text-white">Post Matric Scholarship for ST Students</span></li>
                  <li><span className="hover:text-white">Pre-Matric Scholarship for ST Students</span></li>
                  <li><span className="hover:text-white">Eklavya Model Residential Schools (EMRS)</span></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="space-y-2 text-[11px]">
                <div className="font-bold text-slate-200 text-xs uppercase tracking-wider">Citizen Services</div>
                <ul className="space-y-1.5">
                  <li><span className="hover:text-white">Aadhaar e-KYC Verification Support</span></li>
                  <li><span className="hover:text-white">CPGRAMS Grievance Redressal</span></li>
                  <li><span className="hover:text-white">Tribal Research Institutes Directory</span></li>
                  <li><span className="hover:text-white">Public Financial Management System (PFMS)</span></li>
                  <li><span className="hover:text-white">Direct Benefit Transfer (DBT) Tracker</span></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="space-y-2 text-[11px]">
                <div className="font-bold text-slate-200 text-xs uppercase tracking-wider">Ministry Secretariat</div>
                <p className="text-slate-400 leading-relaxed">
                  Ministry of Tribal Affairs<br />
                  Shastri Bhawan, Dr. Rajendra Prasad Road,<br />
                  New Delhi - 110001, India<br />
                  Toll-Free Helpline: <strong className="text-white">1800-11-7777</strong>
                </p>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
              <div>
                © 2026 Ministry of Tribal Affairs (MoTA), Government of India. All Rights Reserved.
              </div>
              <div className="flex items-center space-x-4">
                <span>Designed for Accessibility (WCAG 2.1 AA)</span>
                <span>•</span>
                <span>Powered by AI Optical Inspection Engine</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
