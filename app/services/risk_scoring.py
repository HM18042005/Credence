import numpy as np
from typing import Tuple
from app.models.models import RiskBucket


class RiskScoringService:
    """Service for ML-based risk scoring and bucket assignment"""
    
    # Weights for different features in credit score calculation
    WEIGHTS = {
        'income_stability': 0.25,
        'cashflow_volatility': 0.20,
        'emi_affordability': 0.30,
        'gst_trend': 0.15,
        'account_age': 0.10
    }
    
    @staticmethod
    def calculate_credit_score(
        income_stability: float,
        cashflow_volatility: float,
        emi_affordability: float,
        gst_trend: float = 50.0,
        account_age_months: int = 12
    ) -> float:
        """
        Calculate credit score (300-900 range, similar to CIBIL)
        Based on weighted combination of features
        """
        # Normalize account age (0-100 scale)
        account_age_score = min(100, (account_age_months / 24) * 100)
        
        # Calculate weighted score (0-100)
        weighted_score = (
            income_stability * RiskScoringService.WEIGHTS['income_stability'] +
            cashflow_volatility * RiskScoringService.WEIGHTS['cashflow_volatility'] +
            emi_affordability * RiskScoringService.WEIGHTS['emi_affordability'] +
            gst_trend * RiskScoringService.WEIGHTS['gst_trend'] +
            account_age_score * RiskScoringService.WEIGHTS['account_age']
        )
        
        # Convert to 300-900 scale
        credit_score = 300 + (weighted_score / 100 * 600)
        
        return round(credit_score, 2)
    
    @staticmethod
    def assign_risk_bucket(credit_score: float) -> RiskBucket:
        """
        Assign risk bucket based on credit score
        """
        if credit_score >= 700:
            return RiskBucket.LOW
        elif credit_score >= 550:
            return RiskBucket.MEDIUM
        else:
            return RiskBucket.HIGH
    
    @staticmethod
    def calculate_loan_eligibility(
        credit_score: float,
        avg_monthly_income: float,
        avg_monthly_expenses: float,
        emi_affordability: float
    ) -> Tuple[bool, float, int, float]:
        """
        Calculate loan eligibility and terms
        Returns: (is_eligible, max_loan_amount, tenure_months, interest_rate)
        """
        risk_bucket = RiskScoringService.assign_risk_bucket(credit_score)
        
        # Check basic eligibility
        disposable_income = avg_monthly_income - avg_monthly_expenses
        
        # Minimum criteria
        if credit_score < 500 or disposable_income < 10000 or emi_affordability < 30:
            return False, 0.0, 0, 0.0
        
        # Calculate max loan amount based on income
        # Rule: Max EMI should be 40% of disposable income
        max_emi = disposable_income * 0.4
        
        # Interest rate based on risk bucket
        interest_rates = {
            RiskBucket.LOW: 10.5,
            RiskBucket.MEDIUM: 12.5,
            RiskBucket.HIGH: 15.0
        }
        interest_rate = interest_rates[risk_bucket]
        
        # Tenure based on risk bucket
        tenures = {
            RiskBucket.LOW: 24,
            RiskBucket.MEDIUM: 18,
            RiskBucket.HIGH: 12
        }
        tenure_months = tenures[risk_bucket]
        
        # Calculate max loan amount using EMI formula
        # EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        monthly_interest = interest_rate / 12 / 100
        n = tenure_months
        
        # Reverse calculate principal (P) from EMI
        if monthly_interest > 0:
            denominator = monthly_interest * (1 + monthly_interest) ** n
            numerator = (1 + monthly_interest) ** n - 1
            max_loan_amount = max_emi * numerator / denominator
        else:
            max_loan_amount = max_emi * tenure_months
        
        # Cap maximum loan based on risk
        caps = {
            RiskBucket.LOW: 5000000,   # 50 lakhs
            RiskBucket.MEDIUM: 2000000, # 20 lakhs
            RiskBucket.HIGH: 1000000    # 10 lakhs
        }
        max_loan_amount = min(max_loan_amount, caps[risk_bucket])
        
        return True, round(max_loan_amount, 2), tenure_months, interest_rate
