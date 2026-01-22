# Credence - Consent-Driven Credit Intelligence Platform

A modular, production-style credit intelligence platform that enables transparent, explainable credit decisions for MSMEs using consented financial data.

## 🎯 Overview

Credence is a two-sided platform serving:
- **Borrowers (MSMEs)**: Get transparent credit assessments with explainable AI
- **Lenders (Banks/NBFCs)**: Make data-driven credit decisions with portfolio analytics

## 🏗️ Architecture

### Backend (FastAPI + MongoDB)
- **API Gateway**: RESTful endpoints for borrowers and lenders
- **Core Services**: User management, financial data processing
- **Risk Analytics**: ML-powered credit scoring using Logistic Regression
- **MongoDB Models**: Flexible schemas for users, assessments, consents

### Frontend (Next.js)
- **Borrower Dashboard**: Credit assessment, explainability, metrics visualization
- **Lender Dashboard**: Portfolio analytics, borrower review, decision management
- **Dark Mode UI**: Professional FinTech design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (local or cloud)

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URL

# Run the server
python main.py
```

Backend will be available at: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with backend API URL

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:3000

## 📊 Key Features

### Credit Assessment
- **ML-Powered Scoring**: Logistic Regression model analyzing financial metrics
- **Risk Buckets**: Low, Medium, High classification
- **Explainable AI**: Clear breakdown of positive and risk factors
- **Feature Contributions**: Transparent score computation

### Financial Metrics
- Average monthly inflow
- Income stability score
- Cash flow volatility
- EMI affordability ratio
- Expense-to-income ratio
- GST filing consistency

### Decision Engine
- Automated credit scoring
- Policy-based rule evaluation
- Manual review workflow
- Audit trail and logging

## 📁 Project Structure

```
Credence/
├── backend/                    # FastAPI Backend
│   ├── api/                   # API routes (borrower, lender)
│   ├── core/                  # Database connection
│   ├── models/                # Pydantic schemas
│   ├── services/              # Business logic & ML
│   ├── config/                # Settings & configuration
│   └── main.py                # Application entry point
│
├── frontend/                   # Next.js Frontend
│   ├── app/                   # Pages & routes
│   │   ├── borrower/          # Borrower portal
│   │   └── lender/            # Lender portal
│   ├── components/            # React components
│   │   ├── borrower/          # Borrower-specific
│   │   ├── lender/            # Lender-specific
│   │   ├── layout/            # Layout components
│   │   └── shared/            # Shared UI components
│   ├── lib/                   # API config & types
│   └── utils/                 # Helper functions
│
└── docs/                      # Documentation
    ├── consent_driven_credit_intelligence_platform_prd.md
    ├── design_document_consent_driven_credit_intelligence_platform.md
    ├── technical_architecture_stack_document_credit_intelligence_platform.md
    └── technology_stack_risk_modeling_document_credit_intelligence_platform.md
```

## 🔧 Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB with Motor (async driver)
- **ML**: Scikit-learn, NumPy, Pandas
- **Validation**: Pydantic

### Frontend
- **Framework**: Next.js 14 (React, TypeScript)
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animation**: Framer Motion

## 🎨 Design System

**Dark FinTech Theme**
- Background: #0B0F14 (Midnight Charcoal)
- Surface: #141A22 (Dark Slate)
- Primary: #3B82F6 (Electric Blue)
- Positive: #22C55E (Emerald Green)
- Warning: #F59E0B (Amber)
- Danger: #EF4444 (Crimson Red)

## 📖 API Documentation

### Borrower Endpoints
- `POST /api/v1/borrower/profile` - Create borrower profile
- `POST /api/v1/borrower/financial-data` - Upload financial data
- `POST /api/v1/borrower/assess-credit` - Generate credit assessment
- `GET /api/v1/borrower/assessments/{user_id}` - Get assessment history

### Lender Endpoints
- `POST /api/v1/lender/profile` - Create lender profile
- `GET /api/v1/lender/borrowers` - List all borrowers
- `GET /api/v1/lender/borrower/{user_id}` - Get borrower details
- `POST /api/v1/lender/decision/override` - Override credit decision
- `GET /api/v1/lender/portfolio/analytics` - Get portfolio analytics

Full API documentation available at: http://localhost:8000/docs

## 🔐 Security

- Environment-based configuration
- CORS protection
- Role-based access patterns
- Input validation via Pydantic
- Secure financial data handling

## 🚢 Production Deployment

### Backend
- Dockerize FastAPI application
- Deploy to cloud (AWS, GCP, Azure)
- Use managed MongoDB (MongoDB Atlas)
- Configure environment variables

### Frontend
- Build Next.js application: `npm run build`
- Deploy to Vercel or similar platform
- Set environment variables for production API

## 📝 License

This project is built for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project showcasing:
- Clean modular architecture
- Production-ready code structure
- Comprehensive API design
- Modern frontend/backend integration
- ML-powered risk analytics

## 📧 Contact

For questions or feedback about this project, please refer to the documentation files in the repository.

---

**Built with FastAPI, Next.js, and Machine Learning for transparent credit intelligence** 🚀
