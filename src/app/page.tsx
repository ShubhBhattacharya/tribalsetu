"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Building2, 
  FileCheck2, 
  Sliders, 
  Award, 
  Users, 
  IndianRupee,
  Layers,
  FileSearch,
  ChevronLeft,
  ChevronRight,
  Bell,
  Check,
  Landmark,
  BadgeAlert,
  HelpCircle,
  ExternalLink
} from "lucide-react";

const HERO_SLIDES = [
  {
    eyebrow: "MINISTRY OF TRIBAL AFFAIRS • GOVERNMENT OF INDIA",
    title: "TribalSetu 🌉",
    subtitle: "Empowering Tribal Scholars with Intelligent Digital Governance & Optical AI",
    desc: "Direct digital fellowship pipeline from Indian tribal districts to top national & global universities.",
    bg: "from-[#0a2540] via-[#0d3154] to-[#046a38]",
  },
  {
    eyebrow: "NATIONAL FELLOWSHIP SCHEME (NFST)",
    title: "750 Doctoral Fellowships",
    subtitle: "Regular M.Phil & Ph.D. in Central Universities, IITs & Premier Institutes",
    desc: "₹38,800/month JRF stipend + contingency grant + direct Aadhaar DBT via PFMS treasury.",
    bg: "from-[#0a2540] via-[#163c66] to-[#0f345c]",
  },
  {
    eyebrow: "NATIONAL OVERSEAS SCHOLARSHIP (NOS)",
    title: "Global Education for ST Talent",
    subtitle: "100% Tuition Fees & Living Allowances in Top 500 QS World Universities",
    desc: "Oxford, Cambridge, Imperial, MIT and Harvard research programs supported by MoTA.",
    bg: "from-[#06182a] via-[#0f2e5a] to-[#044e2b]",
  },
];

const AGRI_NEWS = [
  {
    category: "fellowships",
    tag: "🏛️ MoTA Policy",
    title: "Cabinet Approves Higher Contingency Allowances for ST Doctoral Scholars",
    summary: "Annual contingency grant raised to ₹20,500 for STEM scholars and ₹12,000 for Humanities under NFST guidelines.",
    source: "PIB जनजातीय कार्य मंत्रालय (Ministry of Tribal Affairs)",
    time: "Today, 10:30 AM",
  },
  {
    category: "nos",
    tag: "🌐 Overseas Studies",
    title: "NOS 2026-27 Intake Open for Top 500 QS Universities Across 15 Countries",
    summary: "Applications invited from Scheduled Tribe students with 60% qualifying score and unconditional admission offers.",
    source: "Overseas Education Section",
    time: "3 hours ago",
  },
  {
    category: "dbt",
    tag: "💰 Direct DBT Disbursal",
    title: "100% Scholarship Disbursals Transitioned to Aadhaar-Seeded PFMS Gateway",
    summary: "Zero manual delay: Fellowship stipends credited on the 1st of every calendar month directly into scholar accounts.",
    source: "PFMS Treasury Bulletin",
    time: "Yesterday",
  },
  {
    category: "ai",
    tag: "💡 AI Optical Verification",
    title: "Optical OCR Verifies Revenue Seals Across 22 State ST Lists within Seconds",
    summary: "Instant verification of Tahasildar seals and family income certificates cuts scrutiny turnaround from 6 months to 2 days.",
    source: "Digital India MoTA Lab",
    time: "2 days ago",
  },
];

const INDIAN_LANGUAGES = [
  { code: "hi", name: "हिन्दी", sub: "Hindi" },
  { code: "en", name: "English", sub: "English" },
  { code: "sat", name: "संथाली", sub: "Santhali (Ol Chiki)" },
  { code: "gon", name: "गोंडी", sub: "Gondi" },
  { code: "bn", name: "বাংলা", sub: "Bengali" },
  { code: "or", name: "ଓଡ଼ିଆ", sub: "Odia" },
  { code: "mr", name: "मराठी", sub: "Marathi" },
  { code: "te", name: "తెలుగు", sub: "Telugu" },
  { code: "gu", name: "ગુજરાતી", sub: "Gujarati" },
  { code: "as", name: "অসমীয়া", sub: "Assamese" },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("all");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("हिन्दी");

  // Auto carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = selectedNewsCategory === "all" 
    ? AGRI_NEWS 
    : AGRI_NEWS.filter(n => n.category === selectedNewsCategory);

  return (
    <div className="space-y-12 pb-20 bg-slate-50">
      {/* ================= 1. ROTATING HERO BANNER WITH STATE EMBLEM ================= */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center justify-center rounded-3xl mx-auto max-w-7xl w-[96%] mt-4 shadow-xl border border-slate-700/30">
        {/* Background Slide with Transition */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-1000 ${
              currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Ambient Lighting & Geometric Watermark */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
          </div>
        ))}

        {/* Top-Right Circular National Emblem Badge */}
        <div className="absolute top-5 right-6 z-20 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white shadow-xl border-3 border-amber-400 p-1 flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <span className="text-xs font-black text-[#0a2540] block leading-none">सत्यमेव</span>
            <span className="text-xs font-black text-[#0a2540] block leading-none">जयते</span>
            <span className="text-[8px] font-bold text-amber-700 block mt-0.5">MoTA • GOI</span>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition border border-white/30 text-lg font-bold"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length)}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition border border-white/30 text-lg font-bold"
        >
          ›
        </button>

        {/* Hero Content Locked Dead-Center */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-14 space-y-4 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{HERO_SLIDES[currentSlide].eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-md">
            {HERO_SLIDES[currentSlide].title}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-amber-200 tracking-wide">
            {HERO_SLIDES[currentSlide].subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {HERO_SLIDES[currentSlide].desc}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/student/apply"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950/40 transition hover:scale-105 flex items-center gap-2"
            >
              <span>Apply for Fellowship (आवेदन करें)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student/login"
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-xl text-xs font-black backdrop-blur-md transition"
            >
              <span>Scholar Login (छात्र लॉगिन)</span>
            </Link>
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? "w-8 bg-amber-400" : "w-2 bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* ================= 2. SELECT SERVICE PORTAL (अपनी भूमिका चुनें) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-full text-xs font-extrabold tracking-wide">
            ✨ डिजिटल जनजातीय सेवाएं (Digital MoTA Services)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            अपनी भूमिका चुनें (Select Service Portal)
          </h2>
          <p className="text-xs text-slate-500">
            Dedicated role-based portals for students, scrutiny officers, and ministry administrators
          </p>
        </div>

        {/* Role Services Grid (Exact Kisan Route Architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Student / Scholar */}
          <Link
            href="/student/login"
            className="group p-5 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold border border-emerald-200 group-hover:scale-110 transition-transform">
                🎓
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  छात्र / शोधार्थी (Scholar)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  छात्रवृत्ति आवेदन, लाइव स्टेटस ट्रैकर, ओसीआर दस्तावेज अपलोड व त्रुटि निवारण।
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Enter Student Portal</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </Link>

          {/* Card 2: Scrutiny Officer */}
          <Link
            href="/officer/login"
            className="group p-5 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-amber-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold border border-amber-200 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                  संवीक्षा अधिकारी (Officer)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  स्प्लिट-स्क्रीन ओसीआर दस्तावेज़ जांच, राजस्व मुहर मिलान व त्वरित आपत्ति दर्ज।
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Desk Workbench</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </Link>

          {/* Card 3: Ministry Administrator */}
          <Link
            href="/admin/login"
            className="group p-5 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-purple-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold border border-purple-200 group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                  मंत्रालय प्रशासक (Admin)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  डायनामिक नियम इंजन (No-code criteria), लाइव कोटा केपीआई व मेरिट सूची राजपत्र।
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Command Center</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </Link>

          {/* Card 4: Institution / Verifier */}
          <Link
            href="/student/apply"
            className="group p-5 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold border border-blue-200 group-hover:scale-110 transition-transform">
                🏫
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  संस्थान सत्यापन (Registrar)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  विश्वविद्यालय प्रवेश पत्र सत्यापन, NIRF/QS रैंकिंग प्रमाणीकरण व शोध प्रस्ताव जांच।
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Start Application</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= 3. WIDE LANDSCAPE PROBLEM & AI SOLUTION PANEL ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-l-6 border-emerald-600 border border-slate-200/80 p-6 sm:p-8 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0a2540]">
              पारंपरिक छात्रवृत्ति सत्यापन की चुनौतियां एवं डिजिटल समाधान (The Problem & AI Solution)
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              Digital India MoTA Initiative
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-red-700 uppercase tracking-wide text-[11px] block">
                ❌ पूर्व प्रणाली में चुनौतियां (Legacy Bottlenecks):
              </span>
              <p>
                दूरदराज के जनजातीय क्षेत्रों (जैसे झारखंड, ओडिशा, मध्य प्रदेश, पूर्वोत्तर) के छात्रों को आय और जाति प्रमाण पत्र भौतिक रूप से डाक द्वारा भेजने पड़ते थे। सत्यापन में 6 से 9 माह का समय लगता था और छोटी सी अस्पष्टता पर संपूर्ण आवेदन निरस्त हो जाता था।
              </p>
            </div>
            <div className="space-y-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="font-black text-emerald-800 uppercase tracking-wide text-[11px] block">
                ✓ जनजातीय सेतु समाधान (The TribalSetu AI Advantage):
              </span>
              <p>
                ऑप्टिकल एआई इंजन (Optical OCR) 5 सेकंड में डिजिटल मुहर, जारी करने की तिथि व आय सीमा की जांच करता है। किसी भी कमी पर छात्र को तत्काल पोर्टल पर आपत्ति दिखाई देती है तथा केवल संबंधित दस्तावेज को पुनः अपलोड करके संवीक्षा जारी रखी जा सकती है।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. LIVE MOTA INTELLIGENCE & NEWS FEED ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              📰 आधिकारिक अधिसूचनाएं व समाचार (MoTA News Feed)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Latest Fellowship Announcements & Circulars
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-emerald-100/80 text-emerald-900 px-3 py-1 rounded-full font-bold border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <span>Live Circular Feed</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: "all", label: "🌾 All Updates (सभी समाचार)" },
            { id: "fellowships", label: "🏛️ NFST Domestic" },
            { id: "nos", label: "🌐 NOS Overseas" },
            { id: "dbt", label: "💰 PFMS DBT Disbursals" },
            { id: "ai", label: "💡 AI Verification" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedNewsCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                selectedNewsCategory === cat.id
                  ? "bg-[#0a2540] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map((news, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {news.tag}
                </span>
                <span className="text-slate-400 font-medium">{news.time}</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                {news.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {news.summary}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{news.source}</span>
                <span className="font-bold text-[#0a2540] hover:underline cursor-pointer">
                  Read Gazette Circular →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. NATIONAL PERFORMANCE STATISTICS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0a2540] via-[#0e3b66] to-[#046a38] text-white rounded-3xl p-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-1 mb-8">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              National Portal Metrics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              MoTA Higher Education Fellowship Ledger (FY 2026-27)
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-300">880+</div>
              <div className="text-xs font-bold text-slate-300 uppercase">Total Applications</div>
              <div className="text-[11px] text-emerald-300 font-semibold">Across 22 Tribal States</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">₹48.6 Cr</div>
              <div className="text-xs font-bold text-slate-300 uppercase">Sanctioned Disbursals</div>
              <div className="text-[11px] text-slate-300">Direct DBT via Aadhaar / PFMS</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-blue-300">850</div>
              <div className="text-xs font-bold text-slate-300 uppercase">Annual Scheme Slots</div>
              <div className="text-[11px] text-slate-300">750 NFST + 100 NOS</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-purple-300">98.2%</div>
              <div className="text-xs font-bold text-slate-300 uppercase">OCR Accuracy Rate</div>
              <div className="text-[11px] text-slate-300">Zero Manual Transcription</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FLOATING MULTI-LANGUAGE SELECTOR PILL ================= */}
      <button
        type="button"
        onClick={() => setIsLangModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-[#0a2540] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl border border-white/30 hover:scale-105 transition-all"
        title="Change Portal Language"
      >
        <span className="text-sm">🌐</span>
        <span>{selectedLang} (भाषा चुनें)</span>
      </button>

      {/* Multi-Language Modal Overlay */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  भाषा का चयन करें (Select Portal Language)
                </h3>
                <p className="text-xs text-slate-500">
                  Multilingual accessibility under National Language Translation Mission
                </p>
              </div>
              <button
                onClick={() => setIsLangModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1">
              {INDIAN_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.name);
                    setIsLangModalOpen(false);
                  }}
                  className={`p-3 text-left rounded-xl border transition flex flex-col justify-between ${
                    selectedLang === lang.name
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs"
                      : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <span className="text-sm font-black">{lang.name}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{lang.sub}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Selected language applies to all notices, application forms, and scheme guidelines.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
