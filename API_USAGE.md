# API Usage Guide

## Credence MSME Creditworthiness Engine - API Examples

### Base URL
```
http://localhost:8000/api/v1
```

---

## 1. Create MSME Entity

Create a new MSME business entity in the system.

**Endpoint:** `POST /api/v1/msme`

**Request Body:**
```json
{
  "business_name": "TechStartup Solutions Pvt Ltd",
  "pan": "ABCDE1234F",
  "gstin": "29ABCDE1234F1Z5",
  "business_type": "Private Limited",
  "industry": "Information Technology"
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/msme" \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "TechStartup Solutions Pvt Ltd",
    "pan": "ABCDE1234F",
    "gstin": "29ABCDE1234F1Z5",
    "business_type": "Private Limited",
    "industry": "Information Technology"
  }'
```

**Response:**
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

---

## 2. Ingest Bank Transactions

Ingest bank transaction data in Account Aggregator format.

**Endpoint:** `POST /api/v1/ingest/bank-transactions`

**Request Body:**
```json
{
  "msme_id": 1,
  "transactions": [
    {
      "transaction_date": "2024-01-15T10:30:00",
      "amount": 150000.00,
      "transaction_type": "CREDIT",
      "description": "Customer payment received",
      "balance": 450000.00,
      "category": "REVENUE"
    },
    {
      "transaction_date": "2024-01-18T14:20:00",
      "amount": 50000.00,
      "transaction_type": "DEBIT",
      "description": "Salary payment",
      "balance": 400000.00,
      "category": "SALARY"
    }
  ],
  "account_number": "1234567890",
  "ifsc": "SBIN0001234"
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/ingest/bank-transactions" \
  -H "Content-Type: application/json" \
  -d @sample_data/bank_transactions.json
```

**Response:**
```json
{
  "message": "Bank transactions ingested successfully",
  "msme_id": 1,
  "transactions_count": 10
}
```

---

## 3. Ingest GST Cashflows

Ingest GST return data for business turnover analysis.

**Endpoint:** `POST /api/v1/ingest/gst-cashflows`

**Request Body:**
```json
{
  "msme_id": 1,
  "cashflows": [
    {
      "period": "2023-10",
      "gross_turnover": 500000.00,
      "taxable_turnover": 480000.00,
      "igst": 24000.00,
      "cgst": 0.00,
      "sgst": 0.00,
      "cess": 0.00
    },
    {
      "period": "2023-11",
      "gross_turnover": 550000.00,
      "taxable_turnover": 530000.00,
      "igst": 26500.00,
      "cgst": 0.00,
      "sgst": 0.00,
      "cess": 0.00
    }
  ],
  "gstin": "29ABCDE1234F1Z5"
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/ingest/gst-cashflows" \
  -H "Content-Type: application/json" \
  -d @sample_data/gst_cashflows.json
```

**Response:**
```json
{
  "message": "GST cashflows ingested successfully",
  "msme_id": 1,
  "cashflows_count": 5
}
```

---

## 4. Assess Loan Eligibility

Perform comprehensive credit assessment and loan eligibility check.

**Endpoint:** `POST /api/v1/assess/loan-eligibility`

**Request Body:**
```json
{
  "msme_id": 1,
  "requested_loan_amount": 500000
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/assess/loan-eligibility" \
  -H "Content-Type: application/json" \
  -d '{
    "msme_id": 1,
    "requested_loan_amount": 500000
  }'
```

**Response:**
```json
{
  "msme_id": 1,
  "is_eligible": true,
  "credit_score": 887.28,
  "risk_bucket": "LOW",
  "max_loan_amount": 1181644.62,
  "recommended_tenure_months": 24,
  "recommended_interest_rate": 10.5,
  "eligibility_reason": "Eligible for loan",
  "feature_metrics": {
    "income_stability_score": 95.17,
    "cashflow_volatility_score": 89.97,
    "emi_affordability_ratio": 123.36,
    "average_monthly_income": 178000.0,
    "average_monthly_expenses": 41000.0
  }
}
```

**Key Metrics Explained:**
- **credit_score**: Credit score from 300-900 (higher is better)
- **risk_bucket**: LOW, MEDIUM, or HIGH risk classification
- **max_loan_amount**: Maximum loan amount eligible (in ₹)
- **income_stability_score**: 0-100 (higher = more stable income)
- **cashflow_volatility_score**: 0-100 (higher = less volatile)
- **emi_affordability_ratio**: Percentage of affordability (>100 = very affordable)

---

## 5. Get Assessment History

Retrieve all credit assessments for an MSME.

**Endpoint:** `GET /api/v1/assessments/{msme_id}`

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/assessments/1"
```

**Response:**
```json
[
  {
    "id": 1,
    "msme_id": 1,
    "income_stability_score": 95.17,
    "cashflow_volatility_score": 89.97,
    "emi_affordability_ratio": 123.36,
    "average_monthly_income": 178000.0,
    "average_monthly_expenses": 41000.0,
    "credit_score": 887.28,
    "risk_bucket": "LOW",
    "is_eligible": 1,
    "max_loan_amount": 1181644.62,
    "recommended_tenure_months": 24,
    "recommended_interest_rate": 10.5,
    "assessment_date": "2024-01-21T10:30:00"
  }
]
```

---

## 6. List All MSMEs

Get a list of all registered MSMEs.

**Endpoint:** `GET /api/v1/msme`

**Query Parameters:**
- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum number of records (default: 100)

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/msme?skip=0&limit=10"
```

---

## 7. Get MSME by ID

Retrieve details of a specific MSME.

**Endpoint:** `GET /api/v1/msme/{msme_id}`

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/msme/1"
```

---

## Complete Workflow Example

Here's a complete Python example using the `requests` library:

```python
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

# 1. Create MSME
msme_data = {
    "business_name": "TechStartup Solutions Pvt Ltd",
    "pan": "ABCDE1234F",
    "gstin": "29ABCDE1234F1Z5",
    "business_type": "Private Limited",
    "industry": "Information Technology"
}
response = requests.post(f"{BASE_URL}/msme", json=msme_data)
msme = response.json()
msme_id = msme["id"]
print(f"Created MSME with ID: {msme_id}")

# 2. Ingest Bank Transactions
with open("sample_data/bank_transactions.json") as f:
    bank_data = json.load(f)
response = requests.post(f"{BASE_URL}/ingest/bank-transactions", json=bank_data)
print(f"Ingested {response.json()['transactions_count']} transactions")

# 3. Ingest GST Cashflows
with open("sample_data/gst_cashflows.json") as f:
    gst_data = json.load(f)
response = requests.post(f"{BASE_URL}/ingest/gst-cashflows", json=gst_data)
print(f"Ingested {response.json()['cashflows_count']} GST records")

# 4. Assess Loan Eligibility
assessment_data = {
    "msme_id": msme_id,
    "requested_loan_amount": 500000
}
response = requests.post(f"{BASE_URL}/assess/loan-eligibility", json=assessment_data)
result = response.json()

print(f"\n--- Assessment Results ---")
print(f"Eligible: {result['is_eligible']}")
print(f"Credit Score: {result['credit_score']}")
print(f"Risk Bucket: {result['risk_bucket']}")
print(f"Max Loan Amount: ₹{result['max_loan_amount']:,.2f}")
print(f"Interest Rate: {result['recommended_interest_rate']}%")
print(f"Tenure: {result['recommended_tenure_months']} months")
```

---

## Health Check

Check if the service is running.

**Endpoint:** `GET /health`

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/health"
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Credence MSME Creditworthiness Engine"
}
```

---

## Interactive Documentation

For interactive API documentation with a UI where you can test endpoints:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation error)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

**Example Error Response:**
```json
{
  "detail": "MSME not found"
}
```

---

## Notes

1. All amounts are in Indian Rupees (₹)
2. Date/time fields use ISO 8601 format
3. The API uses SQLite by default, but supports PostgreSQL via environment configuration
4. Sample data files are available in the `sample_data/` directory
