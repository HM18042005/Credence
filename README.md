# 🏦 Credence - MSME Creditworthiness Engine

A production-style MSME (Micro, Small & Medium Enterprises) creditworthiness assessment engine inspired by India's Account Aggregator ecosystem. This FastAPI-based backend system ingests consented financial data, performs sophisticated feature engineering, executes ML-based risk scoring, and provides loan eligibility decisions with intelligent credit limits.

## 🌟 Features

### Data Ingestion
- **Bank Transactions**: Ingest AA-style bank transaction JSON with real-time processing
- **GST Cashflows**: Process GST return data for business turnover analysis
- **Consent-based Data**: Follows Account Aggregator principles for secure data handling

### Feature Engineering
- **Income Stability Score**: Analyzes income consistency using coefficient of variation
- **Cash-flow Volatility**: Measures financial stability through balance fluctuation analysis
- **EMI Affordability Ratio**: Calculates safe EMI limits based on disposable income
- **GST Trend Analysis**: Evaluates business growth trajectory from GST data

### Risk Scoring & Assessment
- **Credit Score**: 300-900 range scoring (similar to CIBIL) using weighted feature combination
- **Risk Buckets**: Automatic classification into LOW, MEDIUM, or HIGH risk categories
- **ML-based Algorithms**: Statistical models for accurate credit risk prediction

### Loan Eligibility
- **Automated Eligibility**: Intelligent loan approval decisions based on comprehensive metrics
- **Dynamic Credit Limits**: Calculated max loan amounts based on income and risk profile
- **Customized Terms**: Risk-adjusted interest rates and tenure recommendations

## 🏗️ Architecture

```
credence/
├── app/
│   ├── api/              # API endpoints
│   ├── core/             # Core config and database
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic services
│   ├── static/           # Static files
│   ├── templates/        # HTML templates
│   └── main.py           # FastAPI application
├── sample_data/          # Sample JSON files
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker configuration
└── docker-compose.yml   # Docker Compose setup
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 15+ (or use Docker Compose)
- pip

### Installation

#### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/HM18042005/Credence.git
cd Credence

# Start services
docker-compose up -d

# Access the application
open http://localhost:8000
```

#### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/HM18042005/Credence.git
cd Credence

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the application
python -m uvicorn app.main:app --reload

# Access the application
open http://localhost:8000
```

## 📖 API Usage

### 1. Create MSME Entity

```bash
curl -X POST "http://localhost:8000/api/v1/msme" \
  -H "Content-Type: application/json" \
  -d @sample_data/msme_create.json
```

Response:
```json
{
  "id": 1,
  "business_name": "TechStartup Solutions Pvt Ltd",
  "pan": "ABCDE1234F",
  "gstin": "29ABCDE1234F1Z5",
  "business_type": "Private Limited",
  "industry": "Information Technology",
  "created_at": "2024-01-21T10:00:00"
}
```

### 2. Ingest Bank Transactions

```bash
curl -X POST "http://localhost:8000/api/v1/ingest/bank-transactions" \
  -H "Content-Type: application/json" \
  -d @sample_data/bank_transactions.json
```

### 3. Ingest GST Cashflows

```bash
curl -X POST "http://localhost:8000/api/v1/ingest/gst-cashflows" \
  -H "Content-Type: application/json" \
  -d @sample_data/gst_cashflows.json
```

### 4. Assess Loan Eligibility

```bash
curl -X POST "http://localhost:8000/api/v1/assess/loan-eligibility" \
  -H "Content-Type: application/json" \
  -d '{
    "msme_id": 1,
    "requested_loan_amount": 500000
  }'
```

Response:
```json
{
  "msme_id": 1,
  "is_eligible": true,
  "credit_score": 742.5,
  "risk_bucket": "LOW",
  "max_loan_amount": 2500000.00,
  "recommended_tenure_months": 24,
  "recommended_interest_rate": 10.5,
  "eligibility_reason": "Eligible for loan",
  "feature_metrics": {
    "income_stability_score": 85.5,
    "cashflow_volatility_score": 78.3,
    "emi_affordability_ratio": 65.2,
    "average_monthly_income": 175000.00,
    "average_monthly_expenses": 45000.00
  }
}
```

### 5. Get Assessment History

```bash
curl -X GET "http://localhost:8000/api/v1/assessments/1"
```

## 🔍 API Documentation

Access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧮 Risk Scoring Methodology

### Credit Score Calculation (300-900)

The credit score is calculated using a weighted combination of features:

| Feature | Weight | Description |
|---------|--------|-------------|
| Income Stability | 25% | Consistency of income (lower CV = higher score) |
| Cashflow Volatility | 20% | Balance fluctuation analysis |
| EMI Affordability | 30% | Disposable income vs EMI capacity |
| GST Trend | 15% | Business growth trajectory |
| Account Age | 10% | Historical data availability |

### Risk Buckets

- **LOW Risk**: Credit Score ≥ 700
  - Max Loan: ₹50 lakhs
  - Interest Rate: 10.5%
  - Tenure: 24 months

- **MEDIUM Risk**: Credit Score 550-699
  - Max Loan: ₹20 lakhs
  - Interest Rate: 12.5%
  - Tenure: 18 months

- **HIGH Risk**: Credit Score < 550
  - Max Loan: ₹10 lakhs
  - Interest Rate: 15.0%
  - Tenure: 12 months

### Eligibility Criteria

Minimum requirements:
- Credit Score ≥ 500
- Disposable Income ≥ ₹10,000/month
- EMI Affordability Ratio ≥ 30%

## 🗄️ Database Schema

### Tables

1. **msme**: Business entity information
2. **bank_transactions**: Bank transaction records
3. **gst_cashflows**: GST return data
4. **credit_assessments**: Assessment results and scores

## 🔧 Configuration

Environment variables (`.env` file):

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/credence_db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

## 🧪 Testing

Sample data files are provided in `sample_data/` directory for testing:
- `msme_create.json`: Create a new MSME entity
- `bank_transactions.json`: Sample bank transaction data
- `gst_cashflows.json`: Sample GST cashflow data

## 📊 Dashboard

Access the web dashboard at `http://localhost:8000` to view:
- System overview
- Feature engineering capabilities
- Risk scoring methodology
- API endpoints documentation

## 🛡️ Security Considerations

- All financial data is stored securely in PostgreSQL
- Follows consent-based data access principles
- API endpoints use proper validation and error handling
- Production deployment should use HTTPS and proper authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by India's Account Aggregator framework
- Built with FastAPI, SQLAlchemy, and modern Python tools
- Risk scoring methodology based on industry best practices

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for the MSME ecosystem in India**