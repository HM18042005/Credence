# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACES                          │
├─────────────────────┬───────────────────────────────────────────┤
│   Borrower Portal   │           Lender Portal                   │
│  (Next.js + React)  │        (Next.js + React)                  │
└──────────┬──────────┴────────────────┬──────────────────────────┘
           │                           │
           │      REST API (JSON)      │
           │                           │
┌──────────▼───────────────────────────▼──────────────────────────┐
│                      API GATEWAY                                 │
│                     (FastAPI Routes)                             │
├──────────────────────┬──────────────────────────────────────────┤
│  Borrower Endpoints  │         Lender Endpoints                 │
│  - Profile           │         - Portfolio Analytics            │
│  - Upload Data       │         - List Borrowers                 │
│  - Assess Credit     │         - Borrower Details               │
│  - Get History       │         - Decision Override              │
└──────────┬───────────┴────────────────┬─────────────────────────┘
           │                            │
           │       Service Layer        │
           │                            │
┌──────────▼────────────────────────────▼─────────────────────────┐
│                    BUSINESS LOGIC                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Risk Analytics Service                       │    │
│  ├────────────────────────────────────────────────────────┤    │
│  │  1. Feature Engineering                                │    │
│  │     → Compute financial metrics                        │    │
│  │  2. ML Model (Logistic Regression)                     │    │
│  │     → Calculate probability of default                 │    │
│  │  3. Risk Classification                                │    │
│  │     → Assign risk bucket (Low/Medium/High)             │    │
│  │  4. Policy Rules Engine                                │    │
│  │     → Apply business rules                             │    │
│  │  5. Explainability                                     │    │
│  │     → Generate feature contributions                   │    │
│  │  6. Decision Generation                                │    │
│  │     → Approved/Rejected/Manual Review                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               │ Async Operations
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                        DATA LAYER                                │
│                         (MongoDB)                                │
├──────────────────────────────────────────────────────────────────┤
│  Collections:                                                    │
│  • users              → Borrower & Lender profiles               │
│  • financial_statements → Bank & GST data                        │
│  • credit_assessments → Risk scores & decisions                  │
│  • consents           → Data usage consents                      │
│  • audit_logs         → System activity tracking                 │
└──────────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend Architecture

```
frontend/
│
├── app/                           # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── borrower/dashboard/       # Borrower portal
│   └── lender/dashboard/         # Lender portal
│
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Sidebar              → Navigation menu
│   │   ├── Header               → Search & notifications
│   │   └── DashboardLayout      → Main wrapper
│   │
│   ├── shared/                   # Reusable UI
│   │   ├── Card                 → Container component
│   │   ├── MetricCard           → Metric display
│   │   ├── Button               → Action buttons
│   │   └── RiskBadge            → Risk indicators
│   │
│   ├── borrower/                 # Borrower-specific
│   │   ├── RiskScoreGauge       → Circular gauge chart
│   │   ├── ExplainabilityPanel  → Factor breakdown
│   │   └── CreditDecisionCard   → Decision display
│   │
│   └── lender/                   # Lender-specific
│       ├── PortfolioCharts      → Risk distribution
│       └── BorrowerTable        → Borrower list
│
├── lib/
│   ├── api-config.ts            # API endpoint definitions
│   └── types.ts                 # TypeScript interfaces
│
└── utils/
    └── formatters.ts            # Helper functions
```

### Backend Architecture

```
backend/
│
├── api/                          # API Gateway Layer
│   ├── borrower.py              → Borrower endpoints
│   ├── lender.py                → Lender endpoints
│   └── __init__.py              → Route aggregation
│
├── services/                     # Business Logic Layer
│   └── risk_analytics.py        → ML & risk scoring
│       ├── compute_metrics()
│       ├── calculate_risk_score()
│       ├── generate_explanations()
│       ├── apply_policy_rules()
│       └── determine_credit_limit()
│
├── models/                       # Data Models Layer
│   └── schemas.py               → Pydantic models
│       ├── User
│       ├── FinancialStatement
│       ├── CreditAssessment
│       ├── Consent
│       └── AuditLog
│
├── core/                         # Infrastructure Layer
│   └── database.py              → MongoDB connection
│
├── config/                       # Configuration
│   └── settings.py              → Environment settings
│
└── main.py                      # Application entry point
```

## Data Flow

### Credit Assessment Flow

```
1. USER INPUT
   └─→ Financial Data (transactions, EMI, GST)

2. API GATEWAY
   └─→ POST /api/v1/borrower/assess-credit

3. RISK ANALYTICS SERVICE
   │
   ├─→ Feature Engineering
   │   ├─ Average Monthly Inflow
   │   ├─ Income Stability Score
   │   ├─ Cash Flow Volatility
   │   ├─ EMI Affordability Ratio
   │   └─ Expense-to-Income Ratio
   │
   ├─→ ML Model (Logistic Regression)
   │   └─ Probability of Default → Risk Score (0-100)
   │
   ├─→ Risk Classification
   │   └─ Low (<30) | Medium (30-60) | High (>60)
   │
   ├─→ Policy Rules Engine
   │   ├─ Min income check
   │   ├─ Expense ratio limit
   │   └─ GST consistency check
   │
   ├─→ Explainability
   │   ├─ Positive Factors
   │   ├─ Risk Factors
   │   └─ Feature Contributions
   │
   └─→ Decision Generation
       ├─ Approved
       ├─ Rejected
       └─ Manual Review

4. DATABASE
   └─→ Store CreditAssessment

5. API RESPONSE
   └─→ JSON with complete assessment

6. UI RENDERING
   ├─→ Risk Score Gauge
   ├─→ Decision Card
   ├─→ Explainability Panel
   └─→ Financial Metrics
```

## Technology Stack

### Backend Stack
```
┌─────────────────────────────────────┐
│  FastAPI (Web Framework)            │
│  ├─ Async support                   │
│  ├─ Auto API docs                   │
│  └─ Request validation              │
├─────────────────────────────────────┤
│  Motor (MongoDB Async Driver)       │
│  └─ Async database operations       │
├─────────────────────────────────────┤
│  Pydantic (Data Validation)         │
│  └─ Type-safe models                │
├─────────────────────────────────────┤
│  Scikit-learn (Machine Learning)    │
│  ├─ Logistic Regression             │
│  └─ Feature scaling                 │
├─────────────────────────────────────┤
│  NumPy/Pandas (Data Processing)     │
│  └─ Metric computation              │
└─────────────────────────────────────┘
```

### Frontend Stack
```
┌─────────────────────────────────────┐
│  Next.js 14 (React Framework)       │
│  ├─ App Router                      │
│  ├─ Server Components               │
│  └─ Client Components               │
├─────────────────────────────────────┤
│  TypeScript (Type Safety)           │
│  └─ Full type coverage              │
├─────────────────────────────────────┤
│  Tailwind CSS 4 (Styling)           │
│  └─ Dark mode theme                 │
├─────────────────────────────────────┤
│  Recharts (Data Visualization)      │
│  ├─ Gauge charts                    │
│  └─ Bar charts                      │
├─────────────────────────────────────┤
│  Lucide React (Icons)               │
│  └─ Consistent iconography          │
└─────────────────────────────────────┘
```

## Security & Best Practices

### Backend
- ✅ Environment-based configuration
- ✅ CORS protection
- ✅ Input validation (Pydantic)
- ✅ Async operations for scalability
- ✅ Error handling and logging

### Frontend
- ✅ Type-safe API calls
- ✅ Client-side validation
- ✅ Secure environment variables
- ✅ Production build optimization
- ✅ Responsive design

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION                              │
├─────────────────────┬───────────────────────────────────────┤
│  Frontend           │  Backend                              │
│  (Vercel)           │  (Docker Container)                   │
│  ├─ Static Assets   │  ├─ FastAPI App                       │
│  ├─ SSR Pages       │  ├─ Uvicorn Server                    │
│  └─ API Calls       │  └─ ML Models                         │
└──────────┬──────────┴────────────┬──────────────────────────┘
           │                       │
           │                       │
           └───────────┬───────────┘
                       │
                       ▼
           ┌───────────────────────┐
           │   MongoDB Atlas        │
           │   (Managed Database)   │
           └───────────────────────┘
```

---

**Built for scalability, maintainability, and production readiness** 🚀
