# Product Requirements Document (PRD)

## 1. Product Overview

### Product Name
Consent-Driven Credit Intelligence Platform

### Product Vision
Enable lenders to make accurate, explainable, and inclusive credit decisions for MSMEs using consented financial data instead of traditional collateral-heavy credit scoring methods.

### Problem Statement
Traditional credit scoring models fail to assess MSMEs with irregular cash flows, limited credit history, or informal income patterns. Lenders lack visibility into real financial behavior, while borrowers lack transparency into why they are approved or rejected.

### Solution
A two-sided platform that ingests consented financial data (bank transactions, GST cash flows), applies risk analytics and machine learning, and produces explainable credit decisions for lenders while offering transparency and improvement guidance to borrowers.

---

## 2. Target Users & Personas

### Borrower (MSME)
- Small business owners seeking loans
- Limited or non-traditional credit history
- Needs clarity, fairness, and guidance

### Lender (Bank / NBFC / Credit Analyst)
- Credit analysts and risk teams
- Require consistent, auditable decisions
- Need portfolio-level risk visibility

---

## 3. Core User Journeys

### Borrower Journey
1. Provide consent and upload financial data
2. View credit assessment and eligibility
3. Understand reasons behind decisions
4. Explore ways to improve creditworthiness

### Lender Journey
1. Review borrower profiles
2. Analyze risk and explanations
3. Approve, reject, or flag for review
4. Monitor portfolio risk

---

## 4. Functional Requirements

### 4.1 Borrower Features

#### A. Onboarding & Profile Management
- Create borrower profile with business details
- Select business category and operating scale
- Accept data usage consent

#### B. Financial Data Management
- Upload bank statements (CSV / JSON / PDF)
- Upload GST cash-flow data
- Store and manage historical financial records
- Validate data completeness and consistency

#### C. Credit Assessment
- Generate credit risk score
- Assign risk bucket (Low / Medium / High)
- Compute financial metrics:
  - Monthly income
  - Income stability
  - Cash-flow volatility
  - EMI affordability

#### D. Credit Outcome
- Loan eligibility status
- Recommended credit limit
- Suggested tenure range

#### E. Explainability & Insights
- Display top contributing factors to decision
- Highlight positive and negative indicators
- Visual breakdown of financial metrics

#### F. Scenario Simulation
- Adjust income or liabilities
- Recalculate risk score dynamically
- Observe eligibility impact

#### G. History & Reporting
- View past assessments
- Track score changes over time
- Download assessment summary

---

### 4.2 Lender Features

#### A. Lender Profile & Configuration
- Create lender organization profile
- Define lending preferences
- Configure basic risk appetite

#### B. Borrower Review Dashboard
- View list of borrowers
- Filter by risk bucket, industry, loan size
- Access detailed borrower profiles

#### C. Credit Decision Engine
- View ML-generated risk score
- Apply rule-based credit policies
- Generate final decision:
  - Approve
  - Reject
  - Manual Review

#### D. Decision Explainability
- Feature contribution breakdown
- Decision trace (score → rules → outcome)
- Reason codes for decisions

#### E. Portfolio Analytics
- Risk distribution overview
- Approval vs rejection metrics
- Industry-wise exposure

#### F. Manual Review & Overrides
- Add analyst notes
- Override automated decisions
- Maintain decision history

---

### 4.3 Shared Platform Capabilities

#### Consent Management
- Generate consent identifiers
- Define data scope and duration
- Track consent lifecycle

#### Risk Analytics Pipeline
- Data ingestion
- Feature engineering
- Model scoring
- Rule evaluation
- Decision generation

#### Audit & Traceability
- Decision logs
- Access logs
- Time-stamped events

---

## 5. Non-Functional Requirements

### Performance
- Credit assessment response within acceptable latency
- Support concurrent users

### Security
- Secure data storage
- Role-based access control
- Data isolation between users

### Scalability
- Modular architecture
- Support addition of new lenders and borrowers

### Reliability
- Graceful handling of incomplete data
- Clear error reporting

---

## 6. Technology Stack

### Frontend
- Next.js
- Tailwind CSS
- Framer Motion
- Recharts

### Backend
- Python (FastAPI)
- REST APIs

### Database
- MongoDB

### Machine Learning
- Python-based models (Logistic Regression / Gradient Boosting)

---

## 7. Success Metrics

### Borrower Metrics
- Assessment completion rate
- Improvement in eligibility over time

### Lender Metrics
- Decision consistency
- Risk bucket accuracy
- Portfolio risk visibility

---

## 8. Risks & Constraints

- Limited availability of real financial data
- Regulatory complexity in real-world deployment
- Model bias and data quality challenges

---

## 9. Future Enhancements

- Advanced explainability dashboards
- Multi-model orchestration
- Drift detection and monitoring
- Integration with real AA providers

---

## 10. Summary

This platform delivers a transparent, explainable, and consent-driven credit intelligence system designed to improve MSME access to finance while empowering lenders with data-driven risk insights.

