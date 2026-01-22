import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from typing import Dict, List, Tuple
from models.schemas import FinancialMetrics, RiskBucket


class RiskAnalyticsService:
    """
    Risk analytics service using Logistic Regression for credit scoring.
    
    This service computes financial metrics, applies ML scoring,
    and generates explainable credit decisions.
    """
    
    def __init__(self):
        """Initialize the risk analytics service."""
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = [
            'average_monthly_inflow',
            'income_stability_score',
            'cash_flow_volatility',
            'emi_affordability_ratio',
            'expense_to_income_ratio'
        ]
        self._initialize_model()
    
    def _initialize_model(self):
        """
        Initialize a pre-trained logistic regression model.
        In production, this would load a trained model from storage.
        For demo purposes, we create a model with reasonable coefficients.
        """
        self.model = LogisticRegression()
        
        # Set pre-defined coefficients for demo
        # In logistic regression, positive coefficients increase probability of positive class (default)
        # Negative coefficients decrease probability of default (reduce risk)
        self.model.coef_ = np.array([[
            -0.3,  # average_monthly_inflow (higher income = lower default risk, negative coeff)
            -0.4,  # income_stability_score (higher stability = lower default risk)
            0.5,   # cash_flow_volatility (higher volatility = higher default risk, positive coeff)
            -0.35, # emi_affordability_ratio (higher affordability = lower default risk)
            0.4    # expense_to_income_ratio (higher ratio = higher default risk)
        ]])
        self.model.intercept_ = np.array([0.1])
        self.model.classes_ = np.array([0, 1])
        
        # Fit scaler with reasonable ranges
        sample_data = np.array([
            [50000, 0.8, 0.2, 0.6, 0.5],
            [100000, 0.9, 0.1, 0.8, 0.3],
            [30000, 0.5, 0.4, 0.4, 0.7]
        ])
        self.scaler.fit(sample_data)
    
    def compute_financial_metrics(self, financial_data: dict) -> FinancialMetrics:
        """
        Compute financial metrics from raw financial data.
        
        Args:
            financial_data: Raw financial data from uploaded statements
            
        Returns:
            FinancialMetrics object with computed metrics
        """
        # Extract transaction data
        transactions = financial_data.get('transactions', [])
        
        if not transactions:
            # Return default metrics for empty data
            return FinancialMetrics(
                average_monthly_inflow=0.0,
                income_stability_score=0.0,
                cash_flow_volatility=1.0,
                emi_affordability_ratio=0.0,
                expense_to_income_ratio=1.0,
                gst_filing_consistency=0.0
            )
        
        # Calculate monthly inflows (credits)
        inflows = [t['amount'] for t in transactions if t.get('type') == 'credit']
        outflows = [t['amount'] for t in transactions if t.get('type') == 'debit']
        
        avg_inflow = np.mean(inflows) if inflows else 0.0
        avg_outflow = np.mean(outflows) if outflows else 0.0
        
        # Income stability (coefficient of variation inverse)
        income_stability = 1.0 - (np.std(inflows) / avg_inflow if avg_inflow > 0 else 1.0)
        income_stability = max(0.0, min(1.0, income_stability))
        
        # Cash flow volatility
        all_amounts = inflows + outflows
        cash_flow_volatility = np.std(all_amounts) / np.mean(all_amounts) if all_amounts else 0.5
        cash_flow_volatility = min(1.0, cash_flow_volatility)
        
        # EMI affordability (assuming EMI info in data)
        emi_payments = financial_data.get('emi_obligations', 0.0)
        emi_affordability = 1.0 - (emi_payments / avg_inflow if avg_inflow > 0 else 1.0)
        emi_affordability = max(0.0, min(1.0, emi_affordability))
        
        # Expense to income ratio
        expense_to_income = avg_outflow / avg_inflow if avg_inflow > 0 else 1.0
        expense_to_income = min(1.0, expense_to_income)
        
        # GST filing consistency (if available)
        gst_consistency = financial_data.get('gst_filing_consistency', 0.8)
        
        return FinancialMetrics(
            average_monthly_inflow=float(avg_inflow),
            income_stability_score=float(income_stability),
            cash_flow_volatility=float(cash_flow_volatility),
            emi_affordability_ratio=float(emi_affordability),
            expense_to_income_ratio=float(expense_to_income),
            gst_filing_consistency=float(gst_consistency)
        )
    
    def calculate_risk_score(self, metrics: FinancialMetrics) -> Tuple[float, float, RiskBucket]:
        """
        Calculate risk score using logistic regression.
        
        Args:
            metrics: Computed financial metrics
            
        Returns:
            Tuple of (probability_of_default, risk_score, risk_bucket)
        """
        # Prepare features
        features = np.array([[
            metrics.average_monthly_inflow / 100000,  # Normalize
            metrics.income_stability_score,
            metrics.cash_flow_volatility,
            metrics.emi_affordability_ratio,
            metrics.expense_to_income_ratio
        ]])
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict probability of default
        prob_default = self.model.predict_proba(features_scaled)[0][1]
        
        # Convert to risk score (0-100, higher = riskier)
        risk_score = float(prob_default * 100)
        
        # Classify into risk bucket
        if risk_score < 30:
            risk_bucket = RiskBucket.LOW
        elif risk_score < 60:
            risk_bucket = RiskBucket.MEDIUM
        else:
            risk_bucket = RiskBucket.HIGH
        
        return float(prob_default), risk_score, risk_bucket
    
    def generate_explanations(
        self, 
        metrics: FinancialMetrics
    ) -> Tuple[List[str], List[str], Dict[str, float]]:
        """
        Generate explainable insights for the credit decision.
        
        Args:
            metrics: Financial metrics
            
        Returns:
            Tuple of (positive_factors, risk_factors, feature_contributions)
        """
        positive_factors = []
        risk_factors = []
        contributions = {}
        
        # Analyze income
        if metrics.average_monthly_inflow > 50000:
            positive_factors.append(f"Strong monthly income: ₹{metrics.average_monthly_inflow:,.0f}")
            contributions['income'] = 0.25
        else:
            risk_factors.append(f"Low monthly income: ₹{metrics.average_monthly_inflow:,.0f}")
            contributions['income'] = -0.15
        
        # Analyze stability
        if metrics.income_stability_score > 0.7:
            positive_factors.append(f"High income stability: {metrics.income_stability_score:.1%}")
            contributions['stability'] = 0.20
        else:
            risk_factors.append(f"Inconsistent income pattern: {metrics.income_stability_score:.1%}")
            contributions['stability'] = -0.20
        
        # Analyze volatility
        if metrics.cash_flow_volatility < 0.3:
            positive_factors.append("Low cash flow volatility indicates stable finances")
            contributions['volatility'] = 0.15
        else:
            risk_factors.append(f"High cash flow volatility: {metrics.cash_flow_volatility:.1%}")
            contributions['volatility'] = -0.18
        
        # Analyze EMI affordability
        if metrics.emi_affordability_ratio > 0.6:
            positive_factors.append("Good EMI affordability with comfortable headroom")
            contributions['emi'] = 0.18
        else:
            risk_factors.append("Limited EMI affordability capacity")
            contributions['emi'] = -0.15
        
        # Analyze expenses
        if metrics.expense_to_income_ratio < 0.5:
            positive_factors.append("Healthy expense-to-income ratio")
            contributions['expenses'] = 0.12
        else:
            risk_factors.append(f"High expense ratio: {metrics.expense_to_income_ratio:.1%}")
            contributions['expenses'] = -0.12
        
        return positive_factors, risk_factors, contributions
    
    def apply_policy_rules(
        self, 
        metrics: FinancialMetrics, 
        risk_score: float
    ) -> Tuple[bool, str]:
        """
        Apply business policy rules on top of ML scoring.
        
        Args:
            metrics: Financial metrics
            risk_score: ML-generated risk score
            
        Returns:
            Tuple of (needs_manual_review, reason)
        """
        # Rule 1: Very low income requires review
        if metrics.average_monthly_inflow < 20000:
            return True, "Income below minimum threshold"
        
        # Rule 2: Very high expense ratio
        if metrics.expense_to_income_ratio > 0.9:
            return True, "Expense ratio exceeds safe limits"
        
        # Rule 3: Borderline risk score
        if 45 < risk_score < 55:
            return True, "Risk score in manual review range"
        
        # Rule 4: Missing GST data for certain categories
        if metrics.gst_filing_consistency is not None and metrics.gst_filing_consistency < 0.5:
            return True, "Inconsistent GST filing history"
        
        return False, ""
    
    def determine_credit_limit(
        self, 
        metrics: FinancialMetrics, 
        risk_bucket: RiskBucket
    ) -> Tuple[float, int]:
        """
        Determine recommended credit limit and tenure.
        
        Args:
            metrics: Financial metrics
            risk_bucket: Risk classification
            
        Returns:
            Tuple of (credit_limit, tenure_months)
        """
        base_income = metrics.average_monthly_inflow
        
        # Calculate multiplier based on risk
        if risk_bucket == RiskBucket.LOW:
            multiplier = 5.0
            tenure = 24
        elif risk_bucket == RiskBucket.MEDIUM:
            multiplier = 3.0
            tenure = 18
        else:
            multiplier = 1.5
            tenure = 12
        
        # Adjust for affordability
        affordability_factor = metrics.emi_affordability_ratio
        credit_limit = base_income * multiplier * (0.5 + 0.5 * affordability_factor)
        
        return float(credit_limit), tenure


# Global instance
risk_analytics_service = RiskAnalyticsService()
