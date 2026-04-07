# Credence - Consent-Driven Credit Intelligence Platform

Credence is a full-stack platform for transparent, explainable credit decisioning for MSMEs using consented financial data.

## Current Project State

The repository is currently organized as an end-to-end monorepo with:
- **Backend**: FastAPI + MongoDB services for borrower/lender workflows and risk analytics
- **Frontend**: Next.js 14 + TypeScript dashboards for borrowers and lenders
- **Project Documentation**: Architecture, setup, security, PRD, and technology docs at repository root

## Repository Snapshot

### Root-level modules
- `backend/` — backend APIs, models, services, configuration
- `frontend/` — web application (App Router), components, shared UI, API integration
- `.github/` — repository automation/configuration

### Core root documentation
- `ARCHITECTURE.md`
- `PROJECT_SUMMARY.md`
- `SETUP_GUIDE.md`
- `SECURITY.md`
- `consent_driven_credit_intelligence_platform_prd.md`
- `design_document_consent_driven_credit_intelligence_platform.md`
- `technical_architecture_stack_document_credit_intelligence_platform.md`
- `technology_stack_risk_modeling_document_credit_intelligence_platform.md`

## High-Level Architecture

### Backend (FastAPI)
- API routes for borrower and lender flows
- Business services for scoring and analytics
- MongoDB-backed data storage
- Config-driven setup with environment variables

### Frontend (Next.js)
- Borrower and lender dashboards
- Reusable components and typed API integration
- Tailwind-based dark FinTech UI

## Technology Mix (Current)

- TypeScript: **60.5%**
- Python: **34.9%**
- CSS: **2.9%**
- Other: **1.7%**

## Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python main.py
```

Backend default URL: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend default URL: `http://localhost:3000`

## Available APIs (summary)

### Borrower
- `POST /api/v1/borrower/profile`
- `POST /api/v1/borrower/financial-data`
- `POST /api/v1/borrower/assess-credit`
- `GET /api/v1/borrower/assessments/{user_id}`

### Lender
- `POST /api/v1/lender/profile`
- `GET /api/v1/lender/borrowers`
- `GET /api/v1/lender/borrower/{user_id}`
- `POST /api/v1/lender/decision/override`
- `GET /api/v1/lender/portfolio/analytics`

## Notes

- This project is structured as a production-style demonstration platform.
- For deeper setup and architecture details, refer to the root documentation files listed above.

---

**Status as of 2026-04-07: Repository includes working backend/frontend modules and comprehensive architecture/setup documentation.**