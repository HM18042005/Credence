#!/bin/bash

# Test script for Credence MSME Creditworthiness Engine
# This script demonstrates the complete workflow

echo "================================================"
echo "Credence MSME Creditworthiness Engine - Test"
echo "================================================"
echo ""

BASE_URL="http://localhost:8000/api/v1"

# 1. Health Check
echo "1. Health Check..."
curl -s http://localhost:8000/health | python -m json.tool
echo ""
echo ""

# 2. Create MSME
echo "2. Creating MSME entity..."
MSME_RESPONSE=$(curl -s -X POST "$BASE_URL/msme" \
  -H "Content-Type: application/json" \
  -d @sample_data/msme_create.json)
echo "$MSME_RESPONSE" | python -m json.tool
MSME_ID=$(echo "$MSME_RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin)['id'])")
echo "Created MSME with ID: $MSME_ID"
echo ""
echo ""

# 3. Ingest Bank Transactions
echo "3. Ingesting bank transactions..."
curl -s -X POST "$BASE_URL/ingest/bank-transactions" \
  -H "Content-Type: application/json" \
  -d @sample_data/bank_transactions.json | python -m json.tool
echo ""
echo ""

# 4. Ingest GST Cashflows
echo "4. Ingesting GST cashflows..."
curl -s -X POST "$BASE_URL/ingest/gst-cashflows" \
  -H "Content-Type: application/json" \
  -d @sample_data/gst_cashflows.json | python -m json.tool
echo ""
echo ""

# 5. Assess Loan Eligibility
echo "5. Assessing loan eligibility for ₹5,00,000..."
curl -s -X POST "$BASE_URL/assess/loan-eligibility" \
  -H "Content-Type: application/json" \
  -d "{\"msme_id\": $MSME_ID, \"requested_loan_amount\": 500000}" | python -m json.tool
echo ""
echo ""

# 6. Get Assessment History
echo "6. Getting assessment history..."
curl -s "$BASE_URL/assessments/$MSME_ID" | python -m json.tool
echo ""
echo ""

echo "================================================"
echo "Test completed successfully!"
echo "================================================"
