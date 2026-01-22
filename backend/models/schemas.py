from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    """User role types."""
    BORROWER = "borrower"
    LENDER = "lender"


class RiskBucket(str, Enum):
    """Risk classification buckets."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class DecisionStatus(str, Enum):
    """Credit decision status."""
    APPROVED = "approved"
    REJECTED = "rejected"
    MANUAL_REVIEW = "manual_review"
    PENDING = "pending"


class PyObjectId(str):
    """Custom type for MongoDB ObjectId."""
    
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not isinstance(v, str):
            raise TypeError('string required')
        return v


class User(BaseModel):
    """User model for borrowers and lenders."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    email: str
    name: str
    role: UserRole
    business_name: Optional[str] = None
    business_category: Optional[str] = None
    organization_name: Optional[str] = None  # For lenders
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "email": "borrower@example.com",
                "name": "John Doe",
                "role": "borrower",
                "business_name": "ABC Enterprises",
                "business_category": "Retail"
            }
        }
    )


class FinancialStatement(BaseModel):
    """Financial data uploaded by borrowers."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: str
    statement_type: str  # "bank_statement", "gst_data"
    file_name: str
    upload_date: datetime = Field(default_factory=datetime.utcnow)
    data: dict  # Processed financial data
    metadata: Optional[dict] = None
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )


class FinancialMetrics(BaseModel):
    """Computed financial metrics."""
    
    average_monthly_inflow: float
    income_stability_score: float
    cash_flow_volatility: float
    emi_affordability_ratio: float
    expense_to_income_ratio: float
    gst_filing_consistency: Optional[float] = None


class CreditAssessment(BaseModel):
    """Credit risk assessment results."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: str
    application_id: Optional[str] = None
    
    # Financial metrics
    metrics: FinancialMetrics
    
    # Risk scoring
    probability_of_default: float
    risk_score: float  # 0-100
    risk_bucket: RiskBucket
    
    # Decision
    decision_status: DecisionStatus
    recommended_credit_limit: Optional[float] = None
    suggested_tenure_months: Optional[int] = None
    
    # Explainability
    positive_factors: List[str] = []
    risk_factors: List[str] = []
    feature_contributions: dict = {}
    
    # Metadata
    assessed_at: datetime = Field(default_factory=datetime.utcnow)
    model_version: str = "logistic_regression_v1"
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )


class Consent(BaseModel):
    """Data consent tracking."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: str
    consent_id: str
    data_scope: List[str]  # Types of data consented
    purpose: str
    granted_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
    is_active: bool = True
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )


class AuditLog(BaseModel):
    """Audit trail for decisions and actions."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: str
    action: str
    resource_type: str
    resource_id: Optional[str] = None
    details: dict = {}
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )
