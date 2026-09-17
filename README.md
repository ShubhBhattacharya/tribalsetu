# TribalSetu 🌉 (जनजातीय सेतु)
### Unified AI-Enabled Scholarship & Fellowship Management System
**Ministry of Tribal Affairs (MoTA) • Government of India**

> **Empowering Tribal Talent with Intelligent Digital Governance**

![Next.js](https://img.shields.io/badge/Next.js-14.2-0a2540?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-059669?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![GovTech](https://img.shields.io/badge/India_Stack-Digital_India-FF671F?style=for-the-badge)

---

## 📌 Executive Summary

**TribalSetu** is an AI-enabled, unified digital scholarship and fellowship management platform designed for the **Ministry of Tribal Affairs (MoTA)**. It streamlines schemes such as the National Fellowship for Higher Education of ST Students (NFST) and National Overseas Scholarship (NOS) by replacing slow, manual document scrutiny with automated OCR intelligence, configurable eligibility workflows, and transparent merit-based selection.

---

## 🎯 Target Schemes

1. **NFST (National Fellowship for Higher Education of ST Students)**: 750 annual fellowships for regular M.Phil. & Ph.D. scholars in Indian Universities and IITs (₹38,800/mo JRF + contingency + HRA).
2. **NOS (National Overseas Scholarship for ST Candidates)**: 100 annual scholarships for Master’s & Ph.D. degrees in Top 500 QS World Universities (100% Tuition Fees + £9,900 / $15,400 per annum living stipend + airfare).

---

## 🚀 Key Modules & Capabilities

### 1. Student Portal (`/student/*`)
- **Lifecycle Stepper**: Live 5-stage progress indicator (`Submitted` ➔ `OCR Verified` ➔ `Scrutiny` ➔ `Selection` ➔ `Sanctioned`).
- **Application Wizard (`/student/apply`)**: Multi-step interactive form with Aadhaar mock e-KYC instant verification, constitutional ST classification (Santhal, Gond, Bhil, Oraon, Munda, Khasi, etc.), and fellowship selection.
- **AI Document Vault**: Drag-and-drop file upload for Caste Certificate, Income Certificate, Marksheets, and Offer Letter with real-time preview and instant simulated optical OCR analysis.
- **Deficiency Resolver (`/student/deficiencies`)**: Real-time notification panel displaying officer/AI discrepancy queries (e.g. *"Income certificate older than 1 year - Re-upload valid PDF"*) with single-file replacement upload and automatic review resumption.

### 2. Officer Scrutiny Workbench (`/officer/*`)
- **Split-Screen Workbench (`/officer/scrutiny`)**:
  - **Left Pane**: Certificate viewer with **interactive highlighted bounding boxes** over extracted optical fields (Applicant Name, Caste Category, Gross Income, Issue Date, Issuing Authority seal).
  - **Right Pane**: Side-by-side metadata cross-check (Candidate Form vs OCR Extraction) with confidence score percentage (e.g. 98%) and discrepancy flags (`EXPIRED_DOCUMENT`, `INCOME_LIMIT_EXCEEDED`, `NAME_MISMATCH`).
  - **Action Bar**: Instant `Approve & Verify`, `Raise Deficiency` (with pre-built templates), or `Reject`.
- **Master Applications Queue (`/officer/applications`)**: Multi-criteria search and filterable table by scheme and verification status.

### 3. MoTA Admin Command Center (`/admin/*`)
- **Analytics Overview (`/admin/analytics`)**: Interactive KPI cards (Total Applications, Pending Scrutiny, Deficiencies, Sanctioned Amount) with Recharts visualizations (State-wise bar chart, Quota capacity donut, and stage distribution).
- **Dynamic Rule Engine Configurator (`/admin/rules`)**: No-code interface allowing policy administrators to dynamically update Max Income Ceiling (₹8,00,000), Academic Cutoffs, QS Ranking thresholds, and document validity limits with real-time pass/flag database simulation.
- **Composite Merit Engine (`/admin/merit`)**:
  - Algorithmic ranking formula:
    $$\text{Merit Score} = (0.4 \times \text{Academic Score}) + (0.4 \times \text{University Tier/QS Rank}) + (0.2 \times \text{Socio-Economic Criteria})$$
  - Auto-ranked leaderboard with affirmative action weightings for Particularly Vulnerable Tribal Groups (PVTGs).
  - One-click **Export to CSV**, **Print MoTA Official Gazette**, and **Direct DBT Sanction Trigger**.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Next.js Route Handlers with Prisma ORM.
- **Database**: Relational SQLite schema (`dev.db`) initialized with realistic GovTech seed data (fully compatible with PostgreSQL via `DATABASE_URL`).
- **Authentication & RBAC**: Role-Based Access Control supporting `STUDENT`, `MOTA_OFFICER`, and `ADMIN` with an instant top-bar persona switcher.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShubhBhattacharya/tribalsetu.git
   cd tribalsetu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```

4. **Initialize & Seed Database**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Personas for Quick Evaluation

Use the top-right **Role Switcher** in the header to instantaneously test each role:

| Role | Name | Description | Default Route |
|---|---|---|---|
| **Student** | Birsa Munda | Has flagged deficiency (Income certificate expired) | `/student/dashboard` |
| **Student** | Shanti Oraon | High merit applicant (Oxford NOS fellowship) | `/student/dashboard` |
| **Officer** | Dr. Rajesh Verma | MoTA Scrutiny Officer | `/officer/scrutiny` |
| **Admin** | Smt. Sunita Murmu | MoTA Joint Secretary & Scheme Admin | `/admin/analytics` |

---

## 🏛 License & Attribution
Designed for the **Ministry of Tribal Affairs (MoTA), Government of India**.
Compliant with Digital India and WCAG 2.1 AA accessibility guidelines.
