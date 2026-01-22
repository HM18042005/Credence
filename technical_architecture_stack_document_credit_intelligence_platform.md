# Technical Architecture & Technology Stack Document

## 1. Overview

This document defines the technical architecture, technology stack, and system-level design choices for the **Consent-Driven Credit Intelligence Platform**. The stack is optimized for rapid development, scalability, and clarity while aligning with modern FinTech engineering practices.

The platform is a **two-sided web application** serving Borrowers (MSMEs) and Lenders (Banks/NBFCs), supported by a centralized risk analytics engine and API-driven architecture.

---

## 2. High-Level Architecture

The system follows a **client–server architecture** with clear separation of concerns:

- Frontend: User interfaces for Borrowers and Lenders
- Backend API: Business logic, risk computation, decisioning
- ML Layer: Credit risk modeling and feature computation
- Database: Persistent storage for users, financial data, and decisions

Communication is handled via RESTful APIs.

---

## 3. Frontend Stack

### Framework
- **Next.js (React)**
  - Server-side rendering and client-side routing
  - Role-based dashboards (Borrower / Lender)

### Styling & UI
- **Tailwind CSS**
  - Utility-first styling
  - Centralized theme tokens for dark mode
- **CSS Variables**
  - Color palette, spacing, and typography consistency

### Animation & Interaction
- **Framer Motion**
  - Page transitions
  - State-based animations

### Data Visualization
- **Recharts**
  - Risk score charts
  - Portfolio analytics
  - Cash-flow visualizations

### Icons & UI Assets
- **Lucide-react**
  - Consistent, lightweight iconography

### Frontend Responsibilities
- User input validation
- Data visualization and explainability rendering
- Scenario simulation UI
- API consumption and state management

---

## 4. Backend Stack

### API Framework
- **Python – FastAPI**
  - High-performance async APIs
  - Automatic OpenAPI documentation

### Backend Responsibilities
- User and role management
- Financial data ingestion
- Feature engineering
- Credit scoring and eligibility computation
- Rule-based policy evaluation
- Decision orchestration

### API Design
- RESTful endpoints
- JSON-based request/response format
- Clear separation between borrower and lender APIs

---

## 5. Machine Learning & Risk Analytics

### Language & Libraries
- **Python**
- **Scikit-learn** (Logistic Regression, preprocessing)
- **XGBoost / LightGBM** (advanced scoring models)
- **NumPy / Pandas** (feature computation)

### Risk Pipeline
1. Raw financial data ingestion
2. Feature engineering
3. Model scoring
4. Policy rule evaluation
5. Final decision generation

### Explainability
- Feature contribution calculation
- Human-readable reason codes

---

## 6. Database & Storage

### Primary Database
- **MongoDB**
  - Flexible schema for financial data
  - Stores users, statements, risk outputs, decisions

### Data Entities
- Users (Borrower / Lender)
- Financial statements
- Credit assessments
- Consent records
- Decision logs

---

## 7. Consent & Audit Framework

### Consent Management
- Consent ID generation
- Data scope and duration
- Consent lifecycle tracking

### Audit Logging
- Access logs
- Decision logs
- Timestamped system events

---

## 8. Security & Access Control

- Role-based access control (RBAC)
- API-level authorization
- Secure handling of financial data
- Environment-based configuration

---

## 9. DevOps & Deployment

### Hosting
- **Frontend:** Vercel
- **Backend:** Dockerized FastAPI service

### Environment Management
- `.env` based configuration
- Separate environments for development and demo

### CI/CD (Optional)
- GitHub Actions for linting and build checks

---

## 10. Scalability & Extensibility

- Modular service design
- Ability to add new lenders without schema changes
- Extendable risk rules and models
- API-first architecture for future integrations

---

## 11. Development & Collaboration Tools

- **Version Control:** GitHub
- **Design:** Figma
- **Documentation:** Markdown / OpenAPI
- **Testing:** Pytest (Backend), basic frontend testing

---

## 12. Design Principles Guiding the Stack

- Clarity over complexity
- Explainability over black-box decisions
- Modularity for future growth
- FinTech-grade data handling

---

## 13. Summary

This technology stack balances speed of development with architectural credibility, enabling the platform to demonstrate real-world FinTech system design while remaining flexible for future expansion.

