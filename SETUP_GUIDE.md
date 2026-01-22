# Setup & Usage Guide

## Quick Start (5 minutes)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Credence
```

### Step 2: Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and configure:
- MongoDB URL (default: `mongodb://localhost:27017`)
- Database name
- API port (default: 8000)
- CORS origins

#### Start MongoDB (if running locally)
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
# https://www.mongodb.com/docs/manual/installation/
```

#### Run Backend Server
```bash
python main.py
```

Backend is now running at: **http://localhost:8000**

- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Step 3: Frontend Setup

#### Install Node Dependencies
```bash
cd ../frontend
npm install
```

#### Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Run Frontend Development Server
```bash
npm run dev
```

Frontend is now running at: **http://localhost:3000**

## Usage Guide

### 1. Landing Page
Navigate to http://localhost:3000 to see the platform homepage.

**Available Options:**
- **Borrower Portal** - For MSMEs seeking credit assessment
- **Lender Portal** - For banks/NBFCs reviewing applications

### 2. Borrower Flow

#### Access Borrower Dashboard
Click "Borrower Portal" or navigate to: http://localhost:3000/borrower/dashboard

#### Generate Credit Assessment
1. Click the "Assess Credit" button
2. The system will use sample financial data to generate:
   - Credit risk score (0-100)
   - Risk bucket classification (Low/Medium/High)
   - Recommended credit limit
   - Suggested tenure
   - Positive and risk factors
   - Financial metrics breakdown

#### View Assessment Results
The dashboard displays:
- **Risk Score Gauge**: Visual representation of credit risk
- **Decision Card**: Approval/rejection status with credit limit
- **Explainability Panel**: 
  - ✓ Positive factors contributing to approval
  - ⚠ Risk factors affecting the decision
- **Financial Metrics**: 
  - Monthly income
  - Income stability
  - EMI affordability
  - Cash flow volatility
  - Expense ratios

### 3. Lender Flow

#### Access Lender Dashboard
Click "Lender Portal" or navigate to: http://localhost:3000/lender/dashboard

#### View Portfolio Analytics
The dashboard shows:
- **Total Borrowers**: Number of assessed applications
- **Total Exposure**: Sum of approved credit limits
- **Approval/Rejection Counts**
- **Risk Distribution Chart**: Visual breakdown by risk buckets
- **Decision Statistics**: 
  - Approval rate
  - Manual review queue
  - Average credit limit

#### Review Borrower Applications
1. Scroll to "Recent Borrowers" table
2. View borrower details:
   - Name and business information
   - Risk bucket classification
   - Decision status
   - Assessment date
3. Click "View Details" to see full borrower profile

## API Testing with cURL

### Create Borrower Profile
```bash
curl -X POST "http://localhost:8000/api/v1/borrower/profile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "name": "John Doe",
    "business_name": "ABC Enterprises",
    "business_category": "Retail"
  }'
```

### Assess Credit
```bash
curl -X POST "http://localhost:8000/api/v1/borrower/assess-credit" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "your-user-id",
    "financial_data": {
      "transactions": [
        {"date": "2024-01-01", "amount": 75000, "type": "credit"},
        {"date": "2024-01-15", "amount": 25000, "type": "debit"}
      ],
      "emi_obligations": 15000,
      "gst_filing_consistency": 0.85
    }
  }'
```

### Get Portfolio Analytics (Lender)
```bash
curl -X GET "http://localhost:8000/api/v1/lender/portfolio/analytics"
```

### List Borrowers (Lender)
```bash
curl -X GET "http://localhost:8000/api/v1/lender/borrowers?limit=10"
```

## Features Deep Dive

### Risk Analytics Engine

**Algorithm**: Logistic Regression

**Input Features**:
1. Average Monthly Inflow
2. Income Stability Score (coefficient of variation)
3. Cash Flow Volatility
4. EMI Affordability Ratio
5. Expense-to-Income Ratio

**Output**:
- Probability of default (0-1)
- Risk score (0-100)
- Risk bucket: Low (<30), Medium (30-60), High (>60)

**Policy Rules**:
- Minimum income threshold
- Maximum expense ratio
- GST filing consistency checks
- Borderline score manual review triggers

### Explainability

Every credit decision includes:
- **Feature Contributions**: Quantified impact of each metric
- **Positive Factors**: What helped the application
- **Risk Factors**: What caused concerns
- **Human-Readable Explanations**: Plain language descriptions

### Data Model

**Collections**:
- `users` - Borrower and lender profiles
- `financial_statements` - Uploaded financial data
- `credit_assessments` - Assessment results and history
- `consents` - Data usage consent tracking
- `audit_logs` - System action audit trail

## Production Deployment

### Backend

1. **Environment Variables**
   ```bash
   MONGODB_URL=mongodb+srv://your-cluster.mongodb.net/
   DATABASE_NAME=credence_prod
   SECRET_KEY=generate-secure-key
   CORS_ORIGINS=https://yourdomain.com
   ```

2. **Docker Deployment**
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

3. **Cloud Deployment**
   - AWS: Elastic Beanstalk, ECS, or Lambda
   - GCP: Cloud Run or App Engine
   - Azure: App Service
   - Use MongoDB Atlas for managed database

### Frontend

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Or Deploy Manually**
   ```bash
   npm run build
   npm run start
   ```

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Check if MongoDB is running:
- Docker: docker ps | grep mongo
- Local: check MongoDB service status
- Update MONGODB_URL in .env
```

**Module Import Errors**
```bash
pip install -r requirements.txt
```

**Port Already in Use**
```bash
# Change API_PORT in .env
# Or kill process: lsof -ti:8000 | xargs kill
```

### Frontend Issues

**Build Errors**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**API Connection Errors**
```bash
# Verify backend is running
curl http://localhost:8000/health

# Check NEXT_PUBLIC_API_URL in .env.local
```

**Blank Dashboard**
```
Ensure backend API is running and accessible
Check browser console for errors
Verify CORS is configured correctly in backend
```

## Development Tips

### Backend

- Use `DEBUG=True` in .env for detailed error messages
- Access API docs at `/docs` for interactive testing
- Use MongoDB Compass to view database collections
- Run with `--reload` for auto-restart on changes

### Frontend

- Use browser DevTools to inspect API calls
- Check Network tab for failed requests
- React DevTools for component debugging
- TypeScript strict mode catches errors early

## Next Steps

### Enhancements
- Add authentication and authorization
- Implement file upload for bank statements
- Add PDF parsing for financial documents
- Build what-if scenario simulator
- Add advanced ML models (XGBoost, Neural Networks)
- Implement drift detection and monitoring
- Add real-time notifications
- Build mobile applications

### Integration
- Integrate with Account Aggregators
- Connect to credit bureaus
- Add payment gateway integration
- Implement e-KYC verification

## Support

For issues or questions:
1. Check documentation files in the repository
2. Review API documentation at `/docs`
3. Examine console/browser logs
4. Verify all dependencies are installed

---

**Built with FastAPI, Next.js, and Machine Learning** 🚀
