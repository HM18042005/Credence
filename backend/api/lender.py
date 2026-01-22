from fastapi import APIRouter, HTTPException, status, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from models import User, UserRole, DecisionStatus, RiskBucket
from core import db

router = APIRouter(prefix="/lender", tags=["Lender"])


class LenderProfileCreate(BaseModel):
    """Request model for creating lender profile."""
    email: str
    name: str
    organization_name: str


class DecisionOverride(BaseModel):
    """Request model for lender decision override."""
    assessment_id: str
    new_decision: DecisionStatus
    analyst_notes: str
    credit_limit_override: Optional[float] = None


@router.post("/profile", status_code=status.HTTP_201_CREATED)
async def create_lender_profile(profile: LenderProfileCreate):
    """
    Create a new lender profile.
    
    This endpoint allows banks/NBFCs to onboard.
    """
    users_collection = db.get_collection("users")
    existing_user = await users_collection.find_one({"email": profile.email})
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    user = User(
        email=profile.email,
        name=profile.name,
        role=UserRole.LENDER,
        organization_name=profile.organization_name
    )
    
    result = await users_collection.insert_one(user.model_dump(by_alias=True, exclude=["id"]))
    user.id = str(result.inserted_id)
    
    return {
        "message": "Lender profile created successfully",
        "user_id": user.id,
        "email": user.email,
        "organization_name": user.organization_name
    }


@router.get("/borrowers")
async def list_borrowers(
    risk_bucket: Optional[RiskBucket] = Query(None, description="Filter by risk bucket"),
    business_category: Optional[str] = Query(None, description="Filter by business category"),
    limit: int = Query(50, le=100, description="Maximum number of results")
):
    """
    List all borrowers with their latest assessments.
    
    Lenders can filter borrowers by risk level and business category.
    """
    # Get all borrowers
    users_collection = db.get_collection("users")
    assessments_collection = db.get_collection("credit_assessments")
    
    borrower_query = {"role": UserRole.BORROWER.value}
    if business_category:
        borrower_query["business_category"] = business_category
    
    cursor = users_collection.find(borrower_query).limit(limit)
    
    borrowers = []
    async for user in cursor:
        user_id = str(user["_id"])
        
        # Get latest assessment
        latest_assessment = await assessments_collection.find_one(
            {"user_id": user_id},
            sort=[("assessed_at", -1)]
        )
        
        if latest_assessment:
            # Apply risk bucket filter if specified
            if risk_bucket and latest_assessment.get("risk_bucket") != risk_bucket.value:
                continue
            
            borrowers.append({
                "user_id": user_id,
                "name": user.get("name"),
                "email": user.get("email"),
                "business_name": user.get("business_name"),
                "business_category": user.get("business_category"),
                "latest_assessment": {
                    "assessment_id": str(latest_assessment["_id"]),
                    "risk_score": latest_assessment.get("risk_score"),
                    "risk_bucket": latest_assessment.get("risk_bucket"),
                    "decision_status": latest_assessment.get("decision_status"),
                    "assessed_at": latest_assessment.get("assessed_at")
                }
            })
    
    return {
        "total": len(borrowers),
        "borrowers": borrowers
    }


@router.get("/borrower/{user_id}")
async def get_borrower_details(user_id: str):
    """
    Get detailed borrower profile and credit assessment.
    
    Provides complete view for lender decision-making.
    """
    users_collection = db.get_collection("users")
    assessments_collection = db.get_collection("credit_assessments")
    
    # Get borrower
    borrower = await users_collection.find_one({"_id": user_id})
    if not borrower or borrower.get("role") != UserRole.BORROWER.value:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Borrower not found"
        )
    
    # Get latest assessment
    latest_assessment = await assessments_collection.find_one(
        {"user_id": user_id},
        sort=[("assessed_at", -1)]
    )
    
    borrower_data = {
        "user_id": user_id,
        "name": borrower.get("name"),
        "email": borrower.get("email"),
        "business_name": borrower.get("business_name"),
        "business_category": borrower.get("business_category"),
        "created_at": borrower.get("created_at")
    }
    
    if latest_assessment:
        latest_assessment["assessment_id"] = str(latest_assessment.pop("_id"))
        borrower_data["assessment"] = latest_assessment
    
    return borrower_data


@router.post("/decision/override")
async def override_decision(override: DecisionOverride):
    """
    Override automated credit decision.
    
    Allows lenders to manually review and change decisions.
    """
    assessments_collection = db.get_collection("credit_assessments")
    
    # Find assessment
    assessment = await assessments_collection.find_one({"_id": override.assessment_id})
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    
    # Update decision
    update_data = {
        "decision_status": override.new_decision.value,
        "analyst_notes": override.analyst_notes,
        "manual_override": True,
        "override_timestamp": datetime.utcnow()
    }
    
    if override.credit_limit_override:
        update_data["recommended_credit_limit"] = override.credit_limit_override
    
    await assessments_collection.update_one(
        {"_id": override.assessment_id},
        {"$set": update_data}
    )
    
    return {
        "message": "Decision overridden successfully",
        "assessment_id": override.assessment_id,
        "new_decision": override.new_decision.value
    }


@router.get("/portfolio/analytics")
async def get_portfolio_analytics():
    """
    Get portfolio-level risk analytics.
    
    Provides aggregate metrics for lender's portfolio.
    """
    assessments_collection = db.get_collection("credit_assessments")
    
    # Get all assessments
    cursor = assessments_collection.find({})
    
    total = 0
    risk_distribution = {
        RiskBucket.LOW.value: 0,
        RiskBucket.MEDIUM.value: 0,
        RiskBucket.HIGH.value: 0
    }
    decision_distribution = {
        DecisionStatus.APPROVED.value: 0,
        DecisionStatus.REJECTED.value: 0,
        DecisionStatus.MANUAL_REVIEW.value: 0,
        DecisionStatus.PENDING.value: 0
    }
    
    total_exposure = 0.0
    
    async for assessment in cursor:
        total += 1
        
        risk_bucket = assessment.get("risk_bucket")
        if risk_bucket in risk_distribution:
            risk_distribution[risk_bucket] += 1
        
        decision = assessment.get("decision_status")
        if decision in decision_distribution:
            decision_distribution[decision] += 1
        
        credit_limit = assessment.get("recommended_credit_limit", 0)
        if credit_limit and decision == DecisionStatus.APPROVED.value:
            total_exposure += credit_limit
    
    return {
        "total_assessments": total,
        "risk_distribution": risk_distribution,
        "decision_distribution": decision_distribution,
        "total_approved_exposure": total_exposure,
        "average_credit_limit": total_exposure / max(decision_distribution[DecisionStatus.APPROVED.value], 1)
    }


@router.get("/profile/{user_id}")
async def get_lender_profile(user_id: str):
    """Get lender profile details."""
    users_collection = db.get_collection("users")
    user = await users_collection.find_one({"_id": user_id})
    
    if not user or user.get("role") != UserRole.LENDER.value:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lender not found"
        )
    
    user["id"] = str(user.pop("_id"))
    return user
