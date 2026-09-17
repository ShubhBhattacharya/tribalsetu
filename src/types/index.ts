export type UserRole = "STUDENT" | "MOTA_OFFICER" | "ADMIN";

export type ApplicationStatus = 
  | "SUBMITTED" 
  | "DEFICIENT" 
  | "VERIFIED" 
  | "APPROVED" 
  | "SANCTIONED" 
  | "REJECTED";

export type ApplicationStage = 
  | "Submitted" 
  | "OCR Verified" 
  | "Scrutiny" 
  | "Selection" 
  | "Sanctioned";

export type DocumentType = 
  | "CASTE_CERTIFICATE" 
  | "INCOME_CERTIFICATE" 
  | "MARKSHEET" 
  | "OFFER_LETTER";

export type VerificationStatus = "VALID" | "FLAGGED" | "PENDING";

export interface BoundingBox {
  id: string;
  field: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  height: number; // percentage
  extractedText: string;
  confidence: number;
}

export interface ExtractedOCRData {
  candidateName?: string;
  fatherName?: string;
  casteCategory?: string;
  tribalSubcaste?: string;
  annualIncome?: number;
  issueDate?: string;
  issuingAuthority?: string;
  certificateNo?: string;
  instituteName?: string;
  degreeName?: string;
  percentageScore?: number;
  qsRanking?: number;
  nirfRanking?: number;
  boundingBoxes: BoundingBox[];
  rawText?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  aadhaarHash?: string;
  phone?: string;
  tribalGroup?: string;
  state?: string;
  district?: string;
  annualIncome?: number;
  avatar?: string;
}

export interface SchemeRuleConfig {
  maxAnnualIncome: number;
  minAcademicScore: number;
  maxQsRanking?: number;
  maxDocValidityMonths: number;
  eligibleDegrees: string[];
}

export interface SchemeItem {
  id: string;
  code: "NFST" | "NOS";
  title: string;
  description: string;
  type: string;
  eligibilityRules: SchemeRuleConfig;
  deadline: string;
  budget: number;
  totalSlots: number;
  stipendDetails?: string;
  isActive: boolean;
}

export interface DocumentItem {
  id: string;
  applicationId: string;
  docType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize?: string;
  ocrData?: ExtractedOCRData;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  flags?: string[];
  uploadedAt: string;
}

export interface DeficiencyItem {
  id: string;
  applicationId: string;
  docId?: string;
  reason: string;
  details?: string;
  resolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  document?: DocumentItem;
}

export interface AuditLogItem {
  id: string;
  applicationId?: string;
  userId?: string;
  actorName: string;
  actorRole: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface ApplicationItem {
  id: string;
  applicationNo: string;
  userId: string;
  user?: UserProfile;
  schemeId: string;
  scheme?: SchemeItem;
  status: ApplicationStatus;
  currentStage: ApplicationStage;
  academicScore: number;
  univRanking?: number;
  univName?: string;
  degreeProgram?: string;
  researchTopic?: string;
  meritScore?: number;
  meritRank?: number;
  annualIncome: number;
  tribalGroup: string;
  state: string;
  flags?: string[];
  createdAt: string;
  updatedAt: string;
  documents?: DocumentItem[];
  deficiencies?: DeficiencyItem[];
  auditLogs?: AuditLogItem[];
}

export interface RuleConfigItem {
  id: string;
  ruleKey: string;
  title: string;
  description: string;
  schemeCode?: string;
  value: string;
  unit?: string;
  isEditable: boolean;
  updatedBy?: string;
  updatedAt: string;
}
