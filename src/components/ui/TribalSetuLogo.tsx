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
    sm: { icon: 38, text: "text-base", sub: "text-[10px]" },
    md: { icon: 50, text: "text-xl", sub: "text-[11px]" },
    lg: { icon: 68, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 92, text: "text-3xl", sub: "text-sm" },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-3 group select-none">
      {/* Official TribalSetu Circular Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-full shadow-md transition-transform duration-200 group-hover:scale-105 overflow-hidden ring-2 ring-amber-400/60 bg-white"
        style={{ width: dim.icon, height: dim.icon }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="TribalSetu MoTA Official Emblem"
          className="w-full h-full object-cover rounded-full"
        />
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
