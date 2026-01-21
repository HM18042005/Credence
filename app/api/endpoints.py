from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.core.database import get_db
from app.models.models import MSME, BankTransaction, GSTCashflow, CreditAssessment
from app.schemas.schemas import (
    MSMECreate, MSMEResponse,
    BankTransactionIngest, GSTCashflowIngest,
    LoanEligibilityRequest, LoanEligibilityResponse,
    CreditAssessmentResponse, FeatureEngineering
)
from app.services.feature_engineering import FeatureEngineeringService
from app.services.risk_scoring import RiskScoringService

router = APIRouter()


# MSME Endpoints
@router.post("/msme", response_model=MSMEResponse)
def create_msme(msme: MSMECreate, db: Session = Depends(get_db)):
    """Create a new MSME entity"""
    # Check if PAN already exists
    existing = db.query(MSME).filter(MSME.pan == msme.pan).first()
    if existing:
        raise HTTPException(status_code=400, detail="MSME with this PAN already exists")
    
    db_msme = MSME(**msme.dict())
    db.add(db_msme)
    db.commit()
    db.refresh(db_msme)
    return db_msme


@router.get("/msme/{msme_id}", response_model=MSMEResponse)
def get_msme(msme_id: int, db: Session = Depends(get_db)):
    """Get MSME details by ID"""
    msme = db.query(MSME).filter(MSME.id == msme_id).first()
    if not msme:
        raise HTTPException(status_code=404, detail="MSME not found")
    return msme


@router.get("/msme", response_model=List[MSMEResponse])
def list_msme(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all MSMEs"""
    msmes = db.query(MSME).offset(skip).limit(limit).all()
    return msmes


# Data Ingestion Endpoints
@router.post("/ingest/bank-transactions")
def ingest_bank_transactions(data: BankTransactionIngest, db: Session = Depends(get_db)):
    """Ingest bank transactions in AA format"""
    # Verify MSME exists
    msme = db.query(MSME).filter(MSME.id == data.msme_id).first()
    if not msme:
        raise HTTPException(status_code=404, detail="MSME not found")
    
    # Create transaction records
    transactions_created = 0
    for txn in data.transactions:
        db_txn = BankTransaction(
            msme_id=data.msme_id,
            transaction_date=txn.transaction_date,
            amount=txn.amount,
            transaction_type=txn.transaction_type.upper(),
            description=txn.description,
            balance=txn.balance,
            category=txn.category,
            raw_data={
                "account_number": data.account_number,
                "ifsc": data.ifsc
            }
        )
        db.add(db_txn)
        transactions_created += 1
    
    db.commit()
    
    return {
        "message": "Bank transactions ingested successfully",
        "msme_id": data.msme_id,
        "transactions_count": transactions_created
    }


@router.post("/ingest/gst-cashflows")
def ingest_gst_cashflows(data: GSTCashflowIngest, db: Session = Depends(get_db)):
    """Ingest GST cashflows in AA format"""
    # Verify MSME exists
    msme = db.query(MSME).filter(MSME.id == data.msme_id).first()
    if not msme:
        raise HTTPException(status_code=404, detail="MSME not found")
    
    # Create cashflow records
    cashflows_created = 0
    for cf in data.cashflows:
        db_cf = GSTCashflow(
            msme_id=data.msme_id,
            period=cf.period,
            gross_turnover=cf.gross_turnover,
            taxable_turnover=cf.taxable_turnover,
            igst=cf.igst,
            cgst=cf.cgst,
            sgst=cf.sgst,
            cess=cf.cess,
            raw_data={"gstin": data.gstin}
        )
        db.add(db_cf)
        cashflows_created += 1
    
    db.commit()
    
    return {
        "message": "GST cashflows ingested successfully",
        "msme_id": data.msme_id,
        "cashflows_count": cashflows_created
    }


# Assessment Endpoints
@router.post("/assess/loan-eligibility", response_model=LoanEligibilityResponse)
def assess_loan_eligibility(request: LoanEligibilityRequest, db: Session = Depends(get_db)):
    """Assess loan eligibility for MSME"""
    # Verify MSME exists
    msme = db.query(MSME).filter(MSME.id == request.msme_id).first()
    if not msme:
        raise HTTPException(status_code=404, detail="MSME not found")
    
    # Get financial data
    transactions = db.query(BankTransaction)\
        .filter(BankTransaction.msme_id == request.msme_id)\
        .order_by(BankTransaction.transaction_date.desc())\
        .all()
    
    gst_cashflows = db.query(GSTCashflow)\
        .filter(GSTCashflow.msme_id == request.msme_id)\
        .order_by(GSTCashflow.period.desc())\
        .all()
    
    if not transactions:
        raise HTTPException(status_code=400, detail="No bank transactions found for this MSME")
    
    # Feature Engineering
    fe_service = FeatureEngineeringService()
    
    income_stability = fe_service.calculate_income_stability(transactions)
    cashflow_volatility = fe_service.calculate_cashflow_volatility(transactions)
    emi_affordability, avg_income, avg_expenses = fe_service.calculate_emi_affordability(
        transactions, request.requested_loan_amount
    )
    gst_trend = fe_service.calculate_gst_trend(gst_cashflows) if gst_cashflows else 50.0
    
    # Risk Scoring
    rs_service = RiskScoringService()
    
    credit_score = rs_service.calculate_credit_score(
        income_stability=income_stability,
        cashflow_volatility=cashflow_volatility,
        emi_affordability=emi_affordability,
        gst_trend=gst_trend
    )
    
    risk_bucket = rs_service.assign_risk_bucket(credit_score)
    
    # Loan Eligibility
    is_eligible, max_loan, tenure, interest_rate = rs_service.calculate_loan_eligibility(
        credit_score=credit_score,
        avg_monthly_income=avg_income,
        avg_monthly_expenses=avg_expenses,
        emi_affordability=emi_affordability
    )
    
    # Save assessment to database
    assessment = CreditAssessment(
        msme_id=request.msme_id,
        income_stability_score=income_stability,
        cashflow_volatility_score=cashflow_volatility,
        emi_affordability_ratio=emi_affordability,
        average_monthly_income=avg_income,
        average_monthly_expenses=avg_expenses,
        credit_score=credit_score,
        risk_bucket=risk_bucket,
        is_eligible=1 if is_eligible else 0,
        max_loan_amount=max_loan,
        recommended_tenure_months=tenure,
        recommended_interest_rate=interest_rate,
        additional_data={
            "gst_trend": gst_trend,
            "requested_amount": request.requested_loan_amount
        }
    )
    db.add(assessment)
    db.commit()
    
    # Prepare response
    eligibility_reason = "Eligible for loan" if is_eligible else "Not eligible - insufficient creditworthiness"
    
    return LoanEligibilityResponse(
        msme_id=request.msme_id,
        is_eligible=is_eligible,
        credit_score=credit_score,
        risk_bucket=risk_bucket,
        max_loan_amount=max_loan,
        recommended_tenure_months=tenure,
        recommended_interest_rate=interest_rate,
        eligibility_reason=eligibility_reason,
        feature_metrics=FeatureEngineering(
            income_stability_score=income_stability,
            cashflow_volatility_score=cashflow_volatility,
            emi_affordability_ratio=emi_affordability,
            average_monthly_income=avg_income,
            average_monthly_expenses=avg_expenses
        )
    )


@router.get("/assessments/{msme_id}", response_model=List[CreditAssessmentResponse])
def get_assessments(msme_id: int, db: Session = Depends(get_db)):
    """Get credit assessments for an MSME"""
    assessments = db.query(CreditAssessment)\
        .filter(CreditAssessment.msme_id == msme_id)\
        .order_by(CreditAssessment.assessment_date.desc())\
        .all()
    return assessments
