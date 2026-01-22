# Backend - Consent-Driven Credit Intelligence Platform

A production-style FastAPI backend for credit risk assessment using consented financial data.

## Architecture

The backend follows a modular architecture with clear separation of concerns:

```
backend/
├── api/              # API Gateway & Route Handlers
│   ├── borrower.py   # Borrower endpoints
│   └── lender.py     # Lender endpoints
├── core/             # Core infrastructure
│   └── database.py   # MongoDB connection
├── models/           # Data models & schemas
│   └── schemas.py    # Pydantic models
├── services/         # Business logic
│   └── risk_analytics.py  # ML & risk scoring
├── config/           # Configuration
│   └── settings.py   # Application settings
└── main.py          # FastAPI application entry point
```

## Key Features

### API Gateway
- RESTful API design
- Automatic OpenAPI documentation
- Request/response validation
- CORS configuration

### Core Services
1. **Risk Analytics Service**
   - Logistic Regression-based credit scoring
   - Feature engineering from financial data
   - Explainable AI with feature contributions
   - Policy-based rule evaluation

2. **User Management**
   - Borrower and Lender profiles
   - Role-based access patterns

3. **Assessment Pipeline**
   - Financial data ingestion
   - Metric computation
   - ML scoring
   - Decision generation

### MongoDB Models
- Users (Borrowers & Lenders)
- Financial Statements
- Credit Assessments
- Consent Records
- Audit Logs

## Setup

### Prerequisites
- Python 3.9+
- MongoDB (local or cloud)

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB URL and other settings
```

3. Run the application:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Borrower APIs

#### Create Profile
```
POST /api/v1/borrower/profile
```

#### Upload Financial Data
```
POST /api/v1/borrower/financial-data?user_id={user_id}
```

#### Assess Credit
```
POST /api/v1/borrower/assess-credit
```

#### Get Assessments
```
GET /api/v1/borrower/assessments/{user_id}
```

### Lender APIs

#### Create Profile
```
POST /api/v1/lender/profile
```

#### List Borrowers
```
GET /api/v1/lender/borrowers?risk_bucket={bucket}&business_category={category}
```

#### Get Borrower Details
```
GET /api/v1/lender/borrower/{user_id}
```

#### Override Decision
```
POST /api/v1/lender/decision/override
```

#### Portfolio Analytics
```
GET /api/v1/lender/portfolio/analytics
```

## API Documentation

Once the server is running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Risk Analytics

### Model Architecture
- **Algorithm**: Logistic Regression
- **Features**:
  - Average monthly inflow
  - Income stability score
  - Cash flow volatility
  - EMI affordability ratio
  - Expense-to-income ratio

### Risk Classification
- **Low Risk**: Score < 30
- **Medium Risk**: Score 30-60
- **High Risk**: Score > 60

### Decision Logic
1. Compute financial metrics from raw data
2. Apply ML model for risk scoring
3. Evaluate policy-based rules
4. Generate explainable decision
5. Determine credit limit and tenure

## Explainability

The platform provides transparent credit decisions through:
- Feature contribution breakdown
- Positive and negative factor lists
- Human-readable explanations
- Decision trace logging

## Security

- Environment-based configuration
- CORS protection
- Input validation via Pydantic
- MongoDB connection security

## Testing

Run with sample data:
```bash
curl -X POST "http://localhost:8000/api/v1/borrower/profile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "borrower@example.com",
    "name": "John Doe",
    "business_name": "ABC Enterprises",
    "business_category": "Retail"
  }'
```

## Extensibility

The modular design allows easy extension:
- Add new ML models in `services/`
- Add new endpoints in `api/`
- Add new data sources
- Integrate external services

## Technology Stack

- **Framework**: FastAPI
- **Database**: MongoDB with Motor (async)
- **ML**: Scikit-learn, NumPy, Pandas
- **Validation**: Pydantic
- **Server**: Uvicorn
