# Credence - Consent-Driven Credit Intelligence Platform

Consent-driven credit intelligence platform for transparent, explainable credit decisioning for MSMEs using consented financial data.

## What this repository contains

- Full-stack monorepo with a FastAPI backend and Next.js frontend
- Risk analytics service with explainable scoring and policy rules
- Borrower and lender dashboards with portfolio analytics
- Production-style documentation and setup guides at the repo root

## Architecture

See ARCHITECTURE.md for the full system and data-flow diagrams.

## Tech stack

Backend
- FastAPI, Pydantic, Uvicorn
- MongoDB with Motor
- Scikit-learn, NumPy, Pandas

Frontend
- Next.js 16 (App Router), React 19
- TypeScript, Tailwind CSS 4
- Recharts, Lucide React, Framer Motion

## Repository layout

```
Credence/
	backend/              FastAPI API, models, services, config
	frontend/             Next.js app, UI components, utilities
	ARCHITECTURE.md       System architecture and data flow
	PROJECT_SUMMARY.md    Project overview and feature summary
	SETUP_GUIDE.md        Detailed setup and usage instructions
	SECURITY.md           Security guidance
```

## Quick start

Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (local or Docker)

Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Windows PowerShell: Copy-Item .env.example .env
python main.py
```

Frontend
```bash
cd frontend
npm install
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
npm run dev
```

Default URLs
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## Environment variables

Backend (.env)
```ini
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=credence_db
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

Frontend (.env.local)
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Docker

```bash
docker-compose up --build
```

Services
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## API endpoints

Borrower
- POST /api/v1/borrower/profile
- POST /api/v1/borrower/financial-data
- POST /api/v1/borrower/assess-credit
- GET /api/v1/borrower/assessments/{user_id}

Lender
- POST /api/v1/lender/profile
- GET /api/v1/lender/borrowers
- GET /api/v1/lender/borrower/{user_id}
- POST /api/v1/lender/decision/override
- GET /api/v1/lender/portfolio/analytics

API docs
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing and quality

Backend
```bash
python -m pytest backend
python -m ruff check backend
```

Frontend
```bash
cd frontend
npm test
npm run lint
```

## Makefile targets

If you use Make on your system, these helpers are available:
- make install
- make test
- make run-dev
- make docker-build
- make docker-up
- make clean

## Documentation

- ARCHITECTURE.md
- PROJECT_SUMMARY.md
- SETUP_GUIDE.md
- SECURITY.md
- consent_driven_credit_intelligence_platform_prd.md
- design_document_consent_driven_credit_intelligence_platform.md
- technical_architecture_stack_document_credit_intelligence_platform.md
- technology_stack_risk_modeling_document_credit_intelligence_platform.md
