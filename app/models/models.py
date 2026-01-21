from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base


class RiskBucket(str, enum.Enum):
    """Risk bucket enumeration"""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class MSME(Base):
    """MSME Entity model"""
    __tablename__ = "msme"
    
    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255), nullable=False)
    pan = Column(String(10), unique=True, index=True)
    gstin = Column(String(15), unique=True, nullable=True)
    business_type = Column(String(100))
    industry = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bank_transactions = relationship("BankTransaction", back_populates="msme", cascade="all, delete-orphan")
    gst_cashflows = relationship("GSTCashflow", back_populates="msme", cascade="all, delete-orphan")
    credit_assessments = relationship("CreditAssessment", back_populates="msme", cascade="all, delete-orphan")


class BankTransaction(Base):
    """Bank Transaction model"""
    __tablename__ = "bank_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    msme_id = Column(Integer, ForeignKey("msme.id"), nullable=False)
    transaction_date = Column(DateTime, nullable=False)
    amount = Column(Float, nullable=False)
    transaction_type = Column(String(50))  # CREDIT or DEBIT
    description = Column(String(500))
    balance = Column(Float)
    category = Column(String(100))
    raw_data = Column(JSON)  # Store original AA data
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    msme = relationship("MSME", back_populates="bank_transactions")


class GSTCashflow(Base):
    """GST Cashflow model"""
    __tablename__ = "gst_cashflows"
    
    id = Column(Integer, primary_key=True, index=True)
    msme_id = Column(Integer, ForeignKey("msme.id"), nullable=False)
    period = Column(String(20))  # e.g., "2023-Q1" or "2023-01"
    gross_turnover = Column(Float)
    taxable_turnover = Column(Float)
    igst = Column(Float)
    cgst = Column(Float)
    sgst = Column(Float)
    cess = Column(Float)
    raw_data = Column(JSON)  # Store original AA data
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    msme = relationship("MSME", back_populates="gst_cashflows")


class CreditAssessment(Base):
    """Credit Assessment model"""
    __tablename__ = "credit_assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    msme_id = Column(Integer, ForeignKey("msme.id"), nullable=False)
    
    # Feature Engineering Metrics
    income_stability_score = Column(Float)
    cashflow_volatility_score = Column(Float)
    emi_affordability_ratio = Column(Float)
    average_monthly_income = Column(Float)
    average_monthly_expenses = Column(Float)
    
    # Risk Scoring
    credit_score = Column(Float)
    risk_bucket = Column(Enum(RiskBucket))
    
    # Loan Eligibility
    is_eligible = Column(Integer)  # 0 or 1
    max_loan_amount = Column(Float)
    recommended_tenure_months = Column(Integer)
    recommended_interest_rate = Column(Float)
    
    # Metadata
    assessment_date = Column(DateTime, default=datetime.utcnow)
    metadata = Column(JSON)  # Store additional assessment details
    
    # Relationships
    msme = relationship("MSME", back_populates="credit_assessments")
