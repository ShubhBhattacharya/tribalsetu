"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Send, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileWarning
} from "lucide-react";
import { ApplicationItem } from "@/types";

interface ActionBarProps {
  application: ApplicationItem;
  onApprove: () => void;
  onRaiseDeficiency: (reason: string, details: string) => void;
  onReject: (reason: string) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  isSubmitting?: boolean;
}

const DEFICIENCY_TEMPLATES = [
  {
    title: "Income Certificate Expired (> 1 Year)",
    reason: "Income certificate older than 1 year - Re-upload valid PDF for current Financial Year",
    details: "The submitted income certificate was issued prior to FY 2025-26. Under MoTA fellowship rules, an updated certificate issued by the competent Tahasildar is required.",
  },
  {
    title: "Caste Certificate Seal Unclear",
    reason: "Caste certificate issuing authority seal or digital signature unclear",
    details: "The digital revenue seal is illegible or missing QR verification code. Please upload a clear scanned copy of the original ST certificate.",
  },
  {
    title: "Name Mismatch with Aadhaar",
    reason: "Candidate name on marksheet / degree differs from Aadhaar database",
    details: "Please provide an affidavit or gazette notification certifying name change, or upload the corrected degree certificate.",
  },
  {
    title: "University Admission / Ranking Clarification",
    reason: "University offer letter requires unconditional status confirmation",
    details: "The overseas offer letter is currently conditional upon language scores. Please provide the unconditional offer letter.",
  },
];

export default function ActionBar({
  application,
  onApprove,
  onRaiseDeficiency,
  onReject,
  onNavigateNext,
  onNavigatePrev,
  isSubmitting = false,
}: ActionBarProps) {
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(0);
  const [customReason, setCustomReason] = useState(DEFICIENCY_TEMPLATES[0].reason);
  const [customDetails, setCustomDetails] = useState(DEFICIENCY_TEMPLATES[0].details);
  const [rejectReason, setRejectReason] = useState("Does not satisfy minimum scheme eligibility criteria.");

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplate(idx);
    setCustomReason(DEFICIENCY_TEMPLATES[idx].reason);
    setCustomDetails(DEFICIENCY_TEMPLATES[idx].details);
  };

  const handleConfirmDeficiency = () => {
    onRaiseDeficiency(customReason, customDetails);
    setShowDeficiencyModal(false);
  };

  const handleConfirmReject = () => {
    onReject(rejectReason);
    setShowRejectModal(false);
  };

  return (
    <>
      <div className="bg-white border-t border-slate-200 p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
        {/* Navigation queue */}
        <div className="flex items-center space-x-2">
          {onNavigatePrev && (
            <button
              onClick={onNavigatePrev}
              className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1 font-semibold"
              title="Previous Application"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Prev
            </button>
          )}
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
            {application.applicationNo}
          </span>
          {onNavigateNext && (
            <button
              onClick={onNavigateNext}
              className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1 font-semibold"
              title="Next Application"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Current status pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="text-slate-400">Current Status:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
              application.status === "APPROVED"
                ? "bg-emerald-100 text-emerald-800"
                : application.status === "DEFICIENT"
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {application.status}
          </span>
        </div>

        {/* Scrutiny Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Reject */}
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={isSubmitting}
            className="px-3 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4 text-red-600" />
            <span>Reject</span>
          </button>

          {/* Raise Deficiency */}
          <button
            onClick={() => setShowDeficiencyModal(true)}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Raise Deficiency</span>
          </button>

          {/* Approve */}
          <button
            onClick={onApprove}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Verify</span>
          </button>
        </div>
      </div>

      {/* Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileWarning className="w-5 h-5 text-amber-700" />
                <h3 className="text-sm font-bold text-amber-900">
                  Raise Application Deficiency Request
                </h3>
              </div>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ?
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Discrepancy Template:
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {DEFICIENCY_TEMPLATES.map((tmpl, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectTemplate(idx)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer transition ${
                        selectedTemplate === idx
                          ? "bg-amber-50 border-amber-400 text-amber-950 font-semibold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold">{tmpl.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{tmpl.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Deficiency Reason (Sent to Student):
                </label>
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Instructions for Student Re-upload:
                </label>
                <textarea
                  rows={3}
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-500 border border-slate-200">
                Notice: Raising a deficiency pauses this application and sends an instant SMS & portal alert to <strong>{application.user?.name}</strong> with a single-file re-upload trigger.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeficiency}
                className="px-4 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded font-bold shadow-sm"
              >
                Send Deficiency Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="p-4 bg-red-50 border-b border-red-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-red-900">Confirm Application Rejection</h3>
              </div>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ?
              </button>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-600">
                Are you sure you want to formally reject application <strong>{application.applicationNo}</strong>?
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Rejection:
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
