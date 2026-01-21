from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class RiskBucketEnum(str, Enum):
    """Risk bucket enumeration"""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


# MSME Schemas
class MSMECreate(BaseModel):
    """Schema for creating MSME entity"""
    business_name: str = Field(..., min_length=1, max_length=255)
    pan: str = Field(..., min_length=10, max_length=10)
    gstin: Optional[str] = Field(None, min_length=15, max_length=15)
    business_type: Optional[str] = None
    industry: Optional[str] = None


class MSMEResponse(BaseModel):
    """Schema for MSME response"""
    id: int
    business_name: str
    pan: str
    gstin: Optional[str]
    business_type: Optional[str]
    industry: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


# Bank Transaction Schemas
class BankTransactionItem(BaseModel):
    """Individual bank transaction in AA format"""
    transaction_date: datetime
    amount: float
    transaction_type: str  # CREDIT or DEBIT
    description: Optional[str] = None
    balance: Optional[float] = None
    category: Optional[str] = None


class BankTransactionIngest(BaseModel):
    """Schema for ingesting bank transactions"""
    msme_id: int
    transactions: List[BankTransactionItem]
    account_number: Optional[str] = None
    ifsc: Optional[str] = None


# GST Cashflow Schemas
class GSTCashflowItem(BaseModel):
    """Individual GST cashflow record"""
    period: str  # e.g., "2023-Q1" or "2023-01"
    gross_turnover: float
    taxable_turnover: float
    igst: Optional[float] = 0.0
    cgst: Optional[float] = 0.0
    sgst: Optional[float] = 0.0
    cess: Optional[float] = 0.0


class GSTCashflowIngest(BaseModel):
    """Schema for ingesting GST cashflows"""
    msme_id: int
    cashflows: List[GSTCashflowItem]
    gstin: Optional[str] = None


# Feature Engineering Response
class FeatureEngineering(BaseModel):
    """Schema for feature engineering results"""
    income_stability_score: float
    cashflow_volatility_score: float
    emi_affordability_ratio: float
    average_monthly_income: float
    average_monthly_expenses: float


# Credit Assessment Schemas
class CreditAssessmentResponse(BaseModel):
    """Schema for credit assessment response"""
    id: int
    msme_id: int
    
    # Feature Engineering Metrics
    income_stability_score: float
    cashflow_volatility_score: float
    emi_affordability_ratio: float
    average_monthly_income: float
    average_monthly_expenses: float
    
    # Risk Scoring
    credit_score: float
    risk_bucket: RiskBucketEnum
    
    # Loan Eligibility
    is_eligible: int
    max_loan_amount: float
    recommended_tenure_months: int
    recommended_interest_rate: float
    
    assessment_date: datetime
    
    class Config:
        from_attributes = True


class LoanEligibilityRequest(BaseModel):
    """Schema for loan eligibility request"""
    msme_id: int
    requested_loan_amount: Optional[float] = None


class LoanEligibilityResponse(BaseModel):
    """Schema for loan eligibility response"""
    msme_id: int
    is_eligible: bool
    credit_score: float
    risk_bucket: RiskBucketEnum
    max_loan_amount: float
    recommended_tenure_months: int
    recommended_interest_rate: float
    eligibility_reason: str
    feature_metrics: FeatureEngineering
