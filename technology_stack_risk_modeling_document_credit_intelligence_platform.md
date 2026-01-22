# Technology Stack & Risk Modeling Document

## 1. Purpose

This document defines the **technology stack**, **risk modeling approach**, and **engineering rationale** for the Consent-Driven Credit Intelligence Platform. It complements the System Design document by detailing *what technologies are used and why*, with an emphasis on modularity, explainability, and future extensibility.

---

## 2. Architectural Alignment

The technology stack aligns with the modular system design and supports:
- Clear ownership across frontend, backend, and analytics teams
- Independent evolution of services
- Explainable and auditable credit decisioning

---

## 3. Frontend Technology Stack

### Framework
- **Next.js (React)**
  - Component-based architecture
  - Role-based routing for Borrower and Lender dashboards
  - Optimized rendering and routing

### Styling & Design System
- **Tailwind CSS**
  - Utility-first styling
  - Centralized design tokens for dark mode
- **CSS Variables**
  - Theme control (colors, typography, spacing)

### Animations & Interaction
- **Framer Motion**
  - Page transitions
  - State-change animations (loading, score updates)

### Data Visualization
- **Recharts**
  - Risk score gauges
  - Cash-flow trend charts
  - Portfolio distribution visuals

### Icons
- **Lucide-react**
  - Lightweight, consistent iconography

### Frontend Responsibilities
- User interaction and validation
- Visualization of risk metrics and explanations
- Scenario simulation interface
- API consumption and state handling

---

## 4. Backend Technology Stack

### API Framework
- **Python – FastAPI**
  - High-performance asynchronous APIs
  - Built-in request validation
  - Auto-generated OpenAPI documentation

### Backend Responsibilities
- User and role management
- Financial data ingestion and normalization
- Credit application orchestration
- Rule-based policy evaluation
- Integration with risk analytics layer

### API Design
- RESTful endpoints
- JSON-based contracts
- Separation between Borrower and Lender APIs

---

## 5. Risk Modeling & Analytics Stack

### Programming Language
- **Python**

### Core Libraries
- **Scikit-learn**
  - Logistic Regression
  - Feature scaling and preprocessing
- **NumPy / Pandas**
  - Financial feature computation
  - Time-series aggregation

---

### Model Choice: Logistic Regression

**Primary Risk Model:** Logistic Regression

#### Rationale
- High interpretability (coefficients map directly to risk factors)
- Suitable for limited or synthetic datasets
- Widely accepted baseline in credit risk systems
- Easy to explain to lenders, auditors, and regulators

---

### Model Inputs (Features)
- Average monthly inflow
- Income stability score
- Cash-flow volatility
- EMI affordability ratio
- Expense-to-income ratio
- GST filing consistency indicators

---

### Model Outputs
- Probability of default (PD)
- Normalized risk score (0–100)
- Risk bucket classification:
  - Low Risk
  - Medium Risk
  - High Risk

---

### Risk Decision Pipeline
1. Raw financial data ingestion
2. Feature engineering and normalization
3. Logistic regression scoring
4. Policy rule evaluation
5. Final credit decision generation

---

### Explainability Approach
- Direct interpretation of model coefficients
- Feature-level contribution indicators
- Human-readable reason codes surfaced in the UI

---

## 6. Policy Rule Engine

### Purpose
Augment statistical risk scoring with deterministic business rules.

### Examples
- EMI burden exceeding threshold → downgrade risk
- Missing GST filings → manual review
- High income stability → risk uplift

Rules are configurable and evaluated after model scoring.

---

## 7. Database & Storage

### Primary Database
- **MongoDB**

### Core Collections
- Users
- FinancialStatements
- CreditApplications
- CreditAssessments
- Consents
- AuditLogs

### Storage Principles
- Flexible schemas for evolving data sources
- Versioned assessment records
- Immutable audit trails

---

## 8. Security & Access Control

- Role-Based Access Control (RBAC)
- API-level authorization
- Environment-based configuration
- Secure handling of financial data

---

## 9. Deployment & DevOps

### Hosting
- **Frontend:** Vercel
- **Backend:** Dockerized FastAPI service

### Configuration
- `.env` based environment variables

### CI/CD (Optional)
- GitHub Actions for linting and build checks

---

## 10. Extensibility & Future Readiness

- Swap Logistic Regression with advanced models if needed
- Add new policy rules without retraining models
- Integrate additional data sources via Financial Data Service
- Support mobile or partner applications via existing APIs

---

## 11. Summary

This technology stack prioritizes **clarity, explainability, and modularity**, making it suitable for hackathon delivery while remaining credible for real-world FinTech system evolution.
