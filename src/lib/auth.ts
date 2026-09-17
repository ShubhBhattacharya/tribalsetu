import { UserProfile, UserRole } from "@/types";

export const MOCK_USERS: Record<string, UserProfile> = {
  "student-birsa": {
    id: "usr_student_birsa",
    name: "Birsa Munda",
    email: "birsa.munda@scholar.in",
    role: "STUDENT",
    aadhaarHash: "XXXX-XXXX-8492",
    phone: "+91 98765 43210",
    tribalGroup: "Santhal",
    state: "Jharkhand",
    district: "Ranchi",
    annualIncome: 240000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  "student-shanti": {
    id: "usr_student_shanti",
    name: "Shanti Oraon",
    email: "shanti.oraon@scholar.in",
    role: "STUDENT",
    aadhaarHash: "XXXX-XXXX-3129",
    phone: "+91 98123 45678",
    tribalGroup: "Oraon",
    state: "Odisha",
    district: "Mayurbhanj",
    annualIncome: 180000,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  "student-arjun": {
    id: "usr_student_arjun",
    name: "Arjun Gond",
    email: "arjun.gond@scholar.in",
    role: "STUDENT",
    aadhaarHash: "XXXX-XXXX-7714",
    phone: "+91 97555 12345",
    tribalGroup: "Gond",
    state: "Madhya Pradesh",
    district: "Mandla",
    annualIncome: 320000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  "officer-rajesh": {
    id: "usr_officer_rajesh",
    name: "Dr. Rajesh Verma",
    email: "rajesh.verma@mota.gov.in",
    role: "MOTA_OFFICER",
    phone: "+91 11 2338 4123",
    state: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  "admin-sunita": {
    id: "usr_admin_sunita",
    name: "Smt. Sunita Murmu (IAS)",
    email: "sunita.murmu@mota.gov.in",
    role: "ADMIN",
    phone: "+91 11 2338 7890",
    state: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
};

export const DEFAULT_USER = MOCK_USERS["student-birsa"];

export function getRoleHomeRoute(role: UserRole): string {
  switch (role) {
    case "STUDENT":
      return "/student/dashboard";
    case "MOTA_OFFICER":
      return "/officer/scrutiny";
    case "ADMIN":
      return "/admin/analytics";
    default:
      return "/";
  }
}
