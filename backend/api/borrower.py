from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from models import User, UserRole, FinancialStatement, CreditAssessment, DecisionStatus
from services import risk_analytics_service
from core import db

USER_NOT_FOUND = "User not found"

router = APIRouter(prefix="/borrower", tags=["Borrower"])


class BorrowerProfileCreate(BaseModel):
    """Request model for creating borrower profile."""
    email: str
    name: str
    business_name: str
    business_category: str


class FinancialDataUpload(BaseModel):
    """Request model for uploading financial data."""
    statement_type: str = Field(..., description="Type: bank_statement or gst_data")
    file_name: str
    data: dict = Field(..., description="Processed financial data")


class AssessmentRequest(BaseModel):
    """Request model for credit assessment."""
    user_id: str
    financial_data: dict


@router.post("/profile", status_code=status.HTTP_201_CREATED)
async def create_borrower_profile(profile: BorrowerProfileCreate):
    """
    Create a new borrower profile.
    
    This endpoint allows MSMEs to onboard and create their profile.
    """
    # Check if user exists
    users_collection = db.get_collection("users")
    existing_user = await users_collection.find_one({"email": profile.email})
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create new user
    user = User(
        email=profile.email,
        name=profile.name,
        role=UserRole.BORROWER,
        business_name=profile.business_name,
        business_category=profile.business_category
    )
    
    result = await users_collection.insert_one(user.model_dump(by_alias=True, exclude=["id"]))
    user.id = str(result.inserted_id)
    
    return {
        "message": "Borrower profile created successfully",
        "user_id": user.id,
        "email": user.email,
        "name": user.name
    }


@router.post("/financial-data")
async def upload_financial_data(upload: FinancialDataUpload, user_id: str):
    """
    Upload financial data (bank statements, GST data).
    
    This endpoint accepts processed financial data from borrowers.
    """
    # Verify user exists
    users_collection = db.get_collection("users")
    user = await users_collection.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=USER_NOT_FOUND
        )
    
    # Store financial data
    financial_collection = db.get_collection("financial_statements")
    statement = FinancialStatement(
        user_id=user_id,
        statement_type=upload.statement_type,
        file_name=upload.file_name,
        data=upload.data
    )
    
    result = await financial_collection.insert_one(
        statement.model_dump(by_alias=True, exclude=["id"])
    )
    
    return {
        "message": "Financial data uploaded successfully",
        "statement_id": str(result.inserted_id),
        "statement_type": upload.statement_type
    }


@router.post("/assess-credit")
async def assess_credit(request: AssessmentRequest):
    """
    Generate credit risk assessment for a borrower.
    
    This endpoint:
    1. Computes financial metrics
    2. Applies ML risk scoring
    3. Evaluates policy rules
    4. Generates explainable decision
    """
    # Verify user
    users_collection = db.get_collection("users")
    user = await users_collection.find_one({"_id": request.user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=USER_NOT_FOUND
        )
    
    # Compute financial metrics
    metrics = risk_analytics_service.compute_financial_metrics(request.financial_data)
    
    # Calculate risk score
    prob_default, risk_score, risk_bucket = risk_analytics_service.calculate_risk_score(metrics)
    
    # Generate explanations
    positive_factors, risk_factors, contributions = risk_analytics_service.generate_explanations(
        metrics
    )
    
    # Apply policy rules
    needs_review, review_reason = risk_analytics_service.apply_policy_rules(metrics, risk_score)
    
    # Determine decision status
    if needs_review:
        decision_status = DecisionStatus.MANUAL_REVIEW
    elif risk_score < 30:
        decision_status = DecisionStatus.APPROVED
    elif risk_score > 60:
        decision_status = DecisionStatus.REJECTED
    else:
        decision_status = DecisionStatus.MANUAL_REVIEW
    
    # Calculate credit limit
    credit_limit, tenure = risk_analytics_service.determine_credit_limit(metrics, risk_bucket)
    
    # Create assessment record
    assessment = CreditAssessment(
        user_id=request.user_id,
        metrics=metrics,
        probability_of_default=prob_default,
        risk_score=risk_score,
        risk_bucket=risk_bucket,
        decision_status=decision_status,
        recommended_credit_limit=credit_limit if decision_status != DecisionStatus.REJECTED else None,
        suggested_tenure_months=tenure if decision_status != DecisionStatus.REJECTED else None,
        positive_factors=positive_factors,
        risk_factors=risk_factors,
        feature_contributions=contributions
    )
    
    # Store assessment
    assessments_collection = db.get_collection("credit_assessments")
    result = await assessments_collection.insert_one(
        assessment.model_dump(by_alias=True, exclude=["id"])
    )
    
    return {
        "assessment_id": str(result.inserted_id),
        "risk_score": risk_score,
        "risk_bucket": risk_bucket.value,
        "decision_status": decision_status.value,
        "recommended_credit_limit": credit_limit if decision_status != DecisionStatus.REJECTED else None,
        "suggested_tenure_months": tenure if decision_status != DecisionStatus.REJECTED else None,
        "positive_factors": positive_factors,
        "risk_factors": risk_factors,
        "metrics": metrics.model_dump(),
        "review_reason": review_reason if needs_review else None
    }


@router.get("/assessments/{user_id}")
async def get_borrower_assessments(user_id: str):
    """
    Get all credit assessments for a borrower.
    
    Returns assessment history to track creditworthiness over time.
    """
    assessments_collection = db.get_collection("credit_assessments")
    cursor = assessments_collection.find({"user_id": user_id}).sort("assessed_at", -1)
    
    assessments = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        assessments.append(doc)
    
    return {
        "user_id": user_id,
        "total_assessments": len(assessments),
        "assessments": assessments
    }


@router.get("/profile/{user_id}")
async def get_borrower_profile(user_id: str):
    """Get borrower profile details."""
    users_collection = db.get_collection("users")
    user = await users_collection.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=USER_NOT_FOUND
        )
    
    user["id"] = str(user.pop("_id"))
    return user
