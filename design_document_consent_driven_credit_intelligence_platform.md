# Design Document: Consent-Driven Credit Intelligence Platform (Dark Mode)

## 1. Project Overview

The goal of this project is to design a high-fidelity, data-driven FinTech web application that enables **borrowers (MSMEs)** and **lenders (banks/NBFCs)** to assess creditworthiness using consented financial data. The interface prioritizes **trust, explainability, and clarity**, while maintaining a modern, premium **Night/Dark Mode** aesthetic suitable for financial decision-making.

The platform provides transparent risk assessment, interactive insights, and portfolio-level analytics through dedicated dashboards for each user type.

---

## 2. Visual Identity & UI Style

The design follows a **Dark FinTech + Subtle Glassmorphism** approach to balance sophistication with readability for dense financial data.

### Color Palette
- **Primary Background:** Midnight Charcoal (#0B0F14)
- **Surface / Cards:** Dark Slate (#141A22) with soft borders
- **Glass Panels:** Translucent dark surfaces with backdrop blur
- **Primary Accent:** Electric Blue (#3B82F6) – actions, highlights
- **Positive Indicators:** Emerald Green (#22C55E)
- **Risk / Warning Indicators:** Amber (#F59E0B)
- **Negative / High Risk:** Crimson Red (#EF4444)
- **Text Primary:** Soft White (#E5E7EB)
- **Text Secondary:** Muted Gray (#9CA3AF)

### Typography
- **Primary Font:** Inter (Sans-serif)
- **Usage:**
  - Headings: Semi-bold / Bold
  - Body & Data Labels: Regular / Medium
  - Numeric Emphasis: Tabular numbers for financial values

### Visual Language
- Rounded corners (12–16px radius)
- Subtle gradients on primary action buttons
- High-contrast charts with muted gridlines
- Minimal shadows to maintain depth without distraction

---

## 3. Layout & Navigation Structure

### 3.1 Sidebar Navigation

Persistent left-side navigation for desktop, collapsible for mobile.

- **Brand Logo** (top)
- **Navigation Links:**
  - Dashboard
  - Credit Assessment
  - Portfolio (Lender only)
  - Applications / History
  - Insights
  - Settings
- **User Switch / Profile:**
  - Borrower / Lender role indicator
  - Logout & account actions

---

### 3.2 Header Section

- **Global Search:** Borrower ID / Application ID
- **Contextual Info:**
  - Current assessment status
  - Portfolio summary (for lenders)
- **Notifications:**
  - Risk alerts
  - Decision updates
- **Theme Toggle:**
  - Night Dark Mode (default)

---

## 4. Core Screens & Functional Components

### 4.1 Borrower Dashboard

#### Financial Snapshot
- Total monthly income
- Active EMI obligations
- Current risk bucket
- Eligibility status

#### Credit Score Visualization
- Gauge / Dial showing risk score
- Color-coded risk bands
- Confidence indicator

#### Key Metrics Cards
- Income stability score
- Cash-flow volatility
- EMI affordability ratio

---

### 4.2 Financial Data Upload & Management

- Drag-and-drop upload zone (Bank statements, GST data)
- File type indicators & validation status
- Upload history with timestamps
- Data completeness warnings

---

### 4.3 Credit Decision & Explainability

#### Decision Summary Card
- Approved / Review / Rejected status
- Recommended credit limit
- Suggested tenure

#### Explainability Panel
- Top positive contributors
- Top risk factors
- Simple, human-readable explanations

#### Visual Aids
- Bar charts for inflow vs outflow
- Monthly cash-flow trends

---

### 4.4 What-If Simulation Panel

Interactive controls allowing borrowers to:
- Increase/decrease income
- Adjust EMI values
- Simulate loan removal/addition

Live recalculation of:
- Risk score
- Eligibility status
- Credit limit

---

### 4.5 Lender Dashboard

#### Portfolio Overview
- Total borrowers
- Risk distribution (Low / Medium / High)
- Approval vs rejection ratio

#### Borrower List Table
- Borrower name / ID
- Industry
- Risk bucket
- Requested amount
- Decision status

Sortable and filterable views.

---

### 4.6 Borrower Profile (Lender View)

- Financial summary
- Risk score & breakdown
- Decision trace:
  - Model score
  - Applied policy rules
  - Final outcome

- Analyst notes & override option

---

## 5. Data Visualization Principles

- Use **Recharts** for consistency and performance
- Muted gridlines, high-contrast data lines
- Tooltips for all data points
- Animations only on state change (no continuous motion)

---

## 6. Responsiveness & Accessibility

- Mobile-first layout
- Sidebar collapses to bottom navigation on mobile
- WCAG-compliant color contrast
- Keyboard-accessible components

---

## 7. Technical Design Considerations

- Component-based UI architecture
- Centralized theme tokens (CSS variables)
- Separation of presentation and business logic
- Scalable layout for future features

---

## 8. Development Tooling

- **Design & Prototyping:** Figma (Free)
- **Frontend:** Next.js + Tailwind CSS
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide-react
- **Backend:** FastAPI (API-driven UI)

---

## 9. Design Goals Summary

- Build trust through clarity and explainability
- Maintain premium FinTech aesthetics
- Enable fast decision-making for lenders
- Empower borrowers with transparency and guidance

---

This design document defines a scalable, professional UI system aligned with real-world FinTech products, optimized for dark-mode usage and complex financial workflows.
