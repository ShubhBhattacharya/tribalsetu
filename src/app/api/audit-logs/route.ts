import { NextRequest, NextResponse } from "next/server";

const SYSTEM_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-09-17T17:15:00Z",
    actorName: "Dr. Rajesh Verma",
    actorRole: "MOTA_OFFICER",
    action: "DEFICIENT_FLAGGED",
    applicationNo: "NFST-2026-0842",
    details: "Income certificate flagged: validity > 12 months. Requested renewed FY 2026-27 document.",
  },
  {
    id: "log-2",
    timestamp: "2026-09-17T16:45:00Z",
    actorName: "Optical OCR Engine v4.9",
    actorRole: "AI_SYSTEM",
    action: "OCR_VERIFIED",
    applicationNo: "NOS-2026-0118",
    details: "Tahasildar seal and ST classification verified across 22-state ST registry with 99.1% confidence.",
  },
  {
    id: "log-3",
    timestamp: "2026-09-17T15:20:00Z",
    actorName: "Smt. Sunita Murmu (IAS)",
    actorRole: "ADMIN",
    action: "RULE_CONFIG_UPDATED",
    applicationNo: "ALL",
    details: "Adjusted NOS eligibility cutoff to QS World Rank 500 and NIRF Top 50.",
  },
  {
    id: "log-4",
    timestamp: "2026-09-17T14:10:00Z",
    actorName: "PFMS Central Treasury Gateway",
    actorRole: "SYSTEM",
    action: "DBT_DISBURSAL_BATCH",
    applicationNo: "BATCH-2026-09A",
    details: "Disbursed monthly fellowship allowances for 748 verified scholars. UTR generated.",
  }
];

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    total: SYSTEM_AUDIT_LOGS.length,
    data: SYSTEM_AUDIT_LOGS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName: body.actorName || "System Actor",
      actorRole: body.actorRole || "USER",
      action: body.action || "SYSTEM_EVENT",
      applicationNo: body.applicationNo || "N/A",
      details: body.details || "No details specified",
    };

    SYSTEM_AUDIT_LOGS.unshift(newLog);

    return NextResponse.json({
      success: true,
      data: newLog,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
