"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textColor?: "dark" | "light";
}

export default function TribalSetuLogo({
  size = "md",
  showText = true,
  textColor = "dark"
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 32, text: "text-base", sub: "text-[9px]" },
    md: { icon: 42, text: "text-xl", sub: "text-[10px]" },
    lg: { icon: 56, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 72, text: "text-3xl", sub: "text-sm" },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-3 group select-none">
      {/* Handcrafted Golden Sun & Tribal Bridge Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-2xl shadow-md transition-transform duration-200 group-hover:scale-105"
        style={{ width: dim.icon, height: dim.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Background: Warm Golden Radial Gradient */}
          <defs>
            <linearGradient id="yellowGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" /> {/* Bright Yellow */}
              <stop offset="50%" stopColor="#F59E0B" /> {/* Amber */}
              <stop offset="100%" stopColor="#D97706" /> {/* Deep Gold */}
            </linearGradient>
            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803D" /> {/* Forest Green */}
              <stop offset="100%" stopColor="#0F2F1F" /> {/* Deep Pine */}
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Rounded Shield / Circle */}
          <rect width="100" height="100" rx="26" fill="url(#yellowGoldGrad)" />

          {/* Radiating Tribal Sun Rays */}
          <circle cx="50" cy="46" r="32" stroke="#FEF3C7" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

          {/* Rising Golden Sun */}
          <circle cx="50" cy="44" r="16" fill="#FFFBEB" filter="url(#glow)" />
          <circle cx="50" cy="44" r="12" fill="#FDE047" />

          {/* Arch Bridge ("Setu" 🌉) connecting Tribal Heritage to Higher Education */}
          <path
            d="M18 68 C34 50, 66 50, 82 68"
            stroke="url(#forestGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Bridge Pillars */}
          <path d="M32 62 L32 74" stroke="url(#forestGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 56 L50 74" stroke="url(#forestGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M68 62 L68 74" stroke="url(#forestGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Scholar Mortarboard / Graduation Cap atop Sun */}
          <path
            d="M50 25 L66 32 L50 39 L34 32 Z"
            fill="#0F2F1F"
            stroke="#FEF3C7"
            strokeWidth="1.5"
          />
          {/* Cap tassel */}
          <path d="M60 35 L62 44" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="62" cy="45" r="1.5" fill="#FEF08A" />

          {/* Water / Soil Waves at Base */}
          <path
            d="M20 78 Q35 74 50 78 T80 78"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${dim.text} ${
              textColor === "light" ? "text-white" : "text-[#0F2F1F]"
            }`}>
              Tribal<span className="text-[#EAB308]">Setu</span>
            </span>
          </div>
          <span className={`font-bold tracking-wider uppercase mt-1 ${dim.sub} ${
            textColor === "light" ? "text-amber-200" : "text-amber-800"
          }`}>
            जनजातीय कार्य मंत्रालय • MoTA
          </span>
        </div>
      )}
    </div>
  );
}
