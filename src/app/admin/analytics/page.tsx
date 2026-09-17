"use client";

import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { 
  BarChart3, 
  Users, 
  FileCheck2, 
  AlertTriangle, 
  IndianRupee, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Download,
  Calendar,
  Layers
} from "lucide-react";

const STATE_DATA = [
  { state: "Jharkhand", applications: 248, sanctioned: 180, deficient: 18 },
  { state: "Odisha", applications: 215, sanctioned: 165, deficient: 12 },
  { state: "Madhya Pradesh", applications: 190, sanctioned: 140, deficient: 14 },
  { state: "Rajasthan", applications: 120, sanctioned: 95, deficient: 9 },
  { state: "Meghalaya", applications: 95, sanctioned: 78, deficient: 5 },
  { state: "Chhattisgarh", applications: 110, sanctioned: 82, deficient: 11 },
];

const SCHEME_PIE_DATA = [
  { name: "NFST (Domestic PhD)", value: 750, color: "#0a2540" },
  { name: "NOS (Overseas PhD)", value: 100, color: "#059669" },
];

const STATUS_BREAKDOWN = [
  { name: "Approved / Sanctioned", count: 480, fill: "#059669" },
  { name: "Desk Scrutiny", count: 215, fill: "#2563eb" },
  { name: "OCR Verified", count: 125, fill: "#0891b2" },
  { name: "Deficiencies Pending", count: 28, fill: "#d97706" },
  { name: "Rejected / Ineligible", count: 32, fill: "#dc2626" },
];

const AUDIT_LOGS = [
  { id: "log-1", actor: "Dr. Rajesh Verma", role: "MOTA_OFFICER", action: "APPROVED", appNo: "NOS-2026-0118", time: "10 mins ago" },
  { id: "log-2", actor: "MoTA Optical AI Engine", role: "SYSTEM", action: "DEFICIENCY_FLAGGED", appNo: "NFST-2026-0842", time: "25 mins ago" },
  { id: "log-3", actor: "Smt. Sunita Murmu", role: "ADMIN", action: "RULE_UPDATED", appNo: "MAX_INCOME_CEILING", time: "2 hours ago" },
  { id: "log-4", actor: "PFMS Central Treasury", role: "DIRECT_DBT", action: "DISBURSED", appNo: "NFST-2026-0419", time: "4 hours ago" },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("FY 2026-27");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              MoTA Command Center & AI Intelligence Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Live Data Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time optical OCR audit, quota allocation, and DBT disbursement metrics
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-xs font-semibold p-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden"
          >
            <option value="FY 2026-27">Financial Year 2026-27</option>
            <option value="FY 2025-26">Financial Year 2025-26</option>
            <option value="All Time">All Recorded Batches</option>
          </select>
        </div>
      </div>

      {/* 2. Interactive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Applications
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">880</div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% YoY ST Student Intake
            </div>
          </div>
        </div>

        {/* Pending Scrutiny */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Scrutiny
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">142</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Avg desk turnaround: <strong className="text-slate-700">1.8 Days</strong>
            </div>
          </div>
        </div>

        {/* Auto-flagged Fraud / Deficiencies */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              AI Deficiencies / Flags
            </span>
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">28</div>
            <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
              <span>96.4% resolved within 7 days</span>
            </div>
          </div>
        </div>

        {/* Sanctioned Amount */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sanctioned Amount
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-800">?48.6 Cr</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Budget Utilisation: <strong className="text-slate-700">74.8%</strong> of ?65 Cr
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State-wise Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                State-wise Tribal Scholarship Applications & Sanctions
              </h2>
              <p className="text-xs text-slate-500">Distribution across major ST population states</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="state" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a2540",
                    borderColor: "#0a2540",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Bar dataKey="applications" name="Applications Received" fill="#0a2540" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sanctioned" name="Sanctioned Grants" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deficient" name="Deficiencies Rectified" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scheme Slot Distribution Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Scheme Quota Capacity
            </h2>
            <p className="text-xs text-slate-500">Annual Slot Distribution</p>
          </div>
          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SCHEME_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SCHEME_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a2540",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0a2540]"></span>
                <span>NFST (India PhD)</span>
              </span>
              <span className="font-bold text-slate-900">750 Slots</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                <span>NOS (Abroad)</span>
              </span>
              <span className="font-bold text-slate-900">100 Slots</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Status Breakdown Progress & Live Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown Bar */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Pipeline Stage Distribution
          </h2>
          <div className="space-y-3">
            {STATUS_BREAKDOWN.map((sb) => {
              const total = 880;
              const pct = ((sb.count / total) * 100).toFixed(1);
              return (
                <div key={sb.name} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700">{sb.name}</span>
                    <span className="font-bold text-slate-900">{sb.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: sb.fill }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Audit Log Stream */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              MoTA Compliance Audit Log
            </h2>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Encrypted</span>
          </div>

          <div className="space-y-3 text-xs">
            {AUDIT_LOGS.map((log) => (
              <div key={log.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{log.actor}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Action: <strong>{log.action}</strong></span>
                  <span className="font-mono text-slate-500">{log.appNo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
