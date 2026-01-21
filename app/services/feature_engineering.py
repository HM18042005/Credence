import numpy as np
from typing import List, Tuple
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import BankTransaction, GSTCashflow


# Constants for EMI calculation
DEFAULT_INTEREST_RATE = 0.12  # 12% annual interest
DEFAULT_TENURE_MONTHS = 12


class FeatureEngineeringService:
    """Service for feature engineering from financial data"""
    
    @staticmethod
    def calculate_income_stability(transactions: List[BankTransaction]) -> float:
        """
        Calculate income stability score (0-100)
        Higher score = more stable income
        """
        if not transactions:
            return 0.0
        
        # Filter credit transactions (income)
        credits = [t for t in transactions if t.transaction_type == "CREDIT"]
        if len(credits) < 2:
            return 50.0  # Insufficient data, return neutral score
        
        # Calculate monthly income
        amounts = [t.amount for t in credits]
        
        # Calculate coefficient of variation (CV)
        mean_income = np.mean(amounts)
        std_income = np.std(amounts)
        
        if mean_income == 0:
            return 0.0
        
        cv = std_income / mean_income
        
        # Convert CV to stability score (lower CV = higher stability)
        # CV of 0 = 100, CV of 1 = 50, CV > 2 = 0
        stability_score = max(0, min(100, 100 - (cv * 50)))
        
        return round(stability_score, 2)
    
    @staticmethod
    def calculate_cashflow_volatility(transactions: List[BankTransaction]) -> float:
        """
        Calculate cashflow volatility score (0-100)
        Lower score = higher volatility (more risky)
        """
        if not transactions:
            return 0.0
        
        # Calculate daily net cashflow
        daily_balances = [t.balance for t in transactions if t.balance is not None]
        
        if len(daily_balances) < 2:
            return 50.0  # Insufficient data
        
        # Calculate balance changes
        balance_changes = [abs(daily_balances[i] - daily_balances[i-1]) 
                          for i in range(1, len(daily_balances))]
        
        if not balance_changes:
            return 50.0
        
        # Calculate volatility (standard deviation of changes)
        volatility = np.std(balance_changes)
        mean_balance = np.mean(daily_balances)
        
        if mean_balance == 0:
            return 0.0
        
        # Normalize volatility relative to mean balance
        normalized_volatility = volatility / mean_balance
        
        # Convert to score (lower volatility = higher score)
        volatility_score = max(0, min(100, 100 - (normalized_volatility * 100)))
        
        return round(volatility_score, 2)
    
    @staticmethod
    def calculate_emi_affordability(
        transactions: List[BankTransaction],
        requested_loan: float = None
    ) -> Tuple[float, float, float]:
        """
        Calculate EMI affordability ratio
        Returns: (affordability_ratio, avg_income, avg_expenses)
        """
        if not transactions:
            return 0.0, 0.0, 0.0
        
        # Separate credits and debits
        credits = [t.amount for t in transactions if t.transaction_type == "CREDIT"]
        debits = [t.amount for t in transactions if t.transaction_type == "DEBIT"]
        
        avg_monthly_income = np.mean(credits) if credits else 0.0
        avg_monthly_expenses = np.mean(debits) if debits else 0.0
        
        # Calculate disposable income
        disposable_income = avg_monthly_income - avg_monthly_expenses
        
        if disposable_income <= 0:
            return 0.0, avg_monthly_income, avg_monthly_expenses
        
        # EMI affordability: Maximum safe EMI is 40% of disposable income
        max_safe_emi = disposable_income * 0.4
        
        # If loan amount is provided, calculate actual EMI
        if requested_loan:
            monthly_interest = DEFAULT_INTEREST_RATE / 12
            n_months = DEFAULT_TENURE_MONTHS
            emi = requested_loan * monthly_interest * (1 + monthly_interest) ** n_months / \
                  ((1 + monthly_interest) ** n_months - 1)
            
            affordability_ratio = (max_safe_emi / emi) * 100 if emi > 0 else 0
        else:
            # Return ratio based on disposable income
            affordability_ratio = min(100, (disposable_income / avg_monthly_income) * 100)
        
        return (
            round(affordability_ratio, 2),
            round(avg_monthly_income, 2),
            round(avg_monthly_expenses, 2)
        )
    
    @staticmethod
    def calculate_gst_trend(gst_cashflows: List[GSTCashflow]) -> float:
        """
        Calculate GST turnover trend score (0-100)
        Higher score = growing business
        """
        if len(gst_cashflows) < 2:
            return 50.0  # Insufficient data
        
        # Sort by period
        sorted_cashflows = sorted(gst_cashflows, key=lambda x: x.period)
        turnovers = [cf.gross_turnover for cf in sorted_cashflows]
        
        # Calculate trend (simple linear growth)
        growth_rates = []
        for i in range(1, len(turnovers)):
            if turnovers[i-1] > 0:
                growth_rate = ((turnovers[i] - turnovers[i-1]) / turnovers[i-1]) * 100
                growth_rates.append(growth_rate)
        
        if not growth_rates:
            return 50.0
        
        avg_growth = np.mean(growth_rates)
        
        # Convert growth to score
        # 10% growth = 100, 0% = 50, -10% = 0
        trend_score = max(0, min(100, 50 + (avg_growth * 5)))
        
        return round(trend_score, 2)
