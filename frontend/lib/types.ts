// Type definitions for API requests and responses

export interface User {
  id?: string;
  email: string;
  name: string;
  role: 'borrower' | 'lender';
  business_name?: string;
  business_category?: string;
  organization_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FinancialMetrics {
  average_monthly_inflow: number;
  income_stability_score: number;
  cash_flow_volatility: number;
  emi_affordability_ratio: number;
  expense_to_income_ratio: number;
  gst_filing_consistency?: number;
}

export interface CreditAssessment {
  assessment_id?: string;
  id?: string;
  user_id: string;
  application_id?: string;
  metrics: FinancialMetrics;
  probability_of_default: number;
  risk_score: number;
  risk_bucket: 'low' | 'medium' | 'high';
  decision_status: 'approved' | 'rejected' | 'manual_review' | 'pending';
  recommended_credit_limit?: number;
  suggested_tenure_months?: number;
  positive_factors: string[];
  risk_factors: string[];
  feature_contributions: Record<string, number>;
  assessed_at?: string;
  model_version?: string;
}

export interface FinancialData {
  transactions: Transaction[];
  emi_obligations?: number;
  gst_filing_consistency?: number;
}

export interface Transaction {
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description?: string;
}

export interface BorrowerProfile {
  email: string;
  name: string;
  business_name: string;
  business_category: string;
}

export interface LenderProfile {
  email: string;
  name: string;
  organization_name: string;
}

export interface BorrowerListItem {
  user_id: string;
  name: string;
  email: string;
  business_name?: string;
  business_category?: string;
  latest_assessment?: {
    assessment_id: string;
    risk_score: number;
    risk_bucket: string;
    decision_status: string;
    assessed_at: string;
  };
}

export interface PortfolioAnalytics {
  total_assessments: number;
  risk_distribution: {
    low: number;
    medium: number;
    high: number;
  };
  decision_distribution: {
    approved: number;
    rejected: number;
    manual_review: number;
    pending: number;
  };
  total_approved_exposure: number;
  average_credit_limit: number;
}
