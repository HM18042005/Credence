'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricCard from '@/components/shared/MetricCard';
import RiskScoreGauge from '@/components/borrower/RiskScoreGauge';
import CreditDecisionCard from '@/components/borrower/CreditDecisionCard';
import ExplainabilityPanel from '@/components/borrower/ExplainabilityPanel';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Upload
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { API_ENDPOINTS } from '@/lib/api-config';

export default function BorrowerDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  
  // Mock user ID - in production, this would come from auth
  const userId = 'mock-user-123';
  
  // Sample financial data for demo
  const sampleFinancialData = {
    transactions: [
      { date: '2024-01-01', amount: 75000, type: 'credit' as const, description: 'Business income' },
      { date: '2024-01-05', amount: 25000, type: 'debit' as const, description: 'Rent payment' },
      { date: '2024-01-10', amount: 82000, type: 'credit' as const, description: 'Sales revenue' },
      { date: '2024-01-15', amount: 15000, type: 'debit' as const, description: 'Utilities' },
      { date: '2024-01-20', amount: 78000, type: 'credit' as const, description: 'Client payment' },
      { date: '2024-01-25', amount: 30000, type: 'debit' as const, description: 'Supplies' },
      { date: '2024-02-01', amount: 85000, type: 'credit' as const, description: 'Business income' },
      { date: '2024-02-05', amount: 25000, type: 'debit' as const, description: 'Rent payment' },
    ],
    emi_obligations: 15000,
    gst_filing_consistency: 0.85
  };
  
  const handleAssessCredit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.borrower.assessCredit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          financial_data: sampleFinancialData
        }),
      });
      
      if (!response.ok) {
        throw new Error('Assessment failed');
      }
      
      const data = await response.json();
      setAssessmentData(data);
    } catch (error) {
      console.error('Error assessing credit:', error);
      alert('Failed to assess credit. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout 
      role="borrower" 
      title="Dashboard" 
      subtitle="View your credit profile and assessment"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Credit Assessment</h2>
              <p className="text-text-secondary mt-1">
                Upload your financial data to get an instant credit assessment
              </p>
            </div>
            <Button 
              onClick={handleAssessCredit}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                'Assessing...'
              ) : (
                <>
                  <Upload size={18} className="mr-2 inline" />
                  Assess Credit
                </>
              )}
            </Button>
          </div>
        </Card>
        
        {assessmentData ? (
          <>
            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Monthly Income"
                value={formatCurrency(assessmentData.metrics.average_monthly_inflow)}
                icon={<DollarSign size={24} />}
              />
              <MetricCard
                label="Income Stability"
                value={formatPercentage(assessmentData.metrics.income_stability_score)}
                icon={<TrendingUp size={24} />}
              />
              <MetricCard
                label="EMI Affordability"
                value={formatPercentage(assessmentData.metrics.emi_affordability_ratio)}
                icon={<CreditCard size={24} />}
              />
              <MetricCard
                label="Cash Flow Volatility"
                value={formatPercentage(assessmentData.metrics.cash_flow_volatility)}
                icon={<TrendingDown size={24} />}
              />
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Risk Score */}
                <Card title="Risk Assessment">
                  <RiskScoreGauge 
                    score={assessmentData.risk_score} 
                    riskBucket={assessmentData.risk_bucket}
                  />
                </Card>
                
                {/* Decision */}
                <CreditDecisionCard
                  status={assessmentData.decision_status}
                  creditLimit={assessmentData.recommended_credit_limit}
                  tenure={assessmentData.suggested_tenure_months}
                  riskScore={assessmentData.risk_score}
                />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Explainability */}
                <ExplainabilityPanel
                  positiveFactors={assessmentData.positive_factors}
                  riskFactors={assessmentData.risk_factors}
                />
                
                {/* Additional Metrics */}
                <Card title="Financial Metrics">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Expense to Income</span>
                      <span className="font-semibold text-text-primary">
                        {formatPercentage(assessmentData.metrics.expense_to_income_ratio)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">GST Filing Consistency</span>
                      <span className="font-semibold text-text-primary">
                        {formatPercentage(assessmentData.metrics.gst_filing_consistency || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Model Version</span>
                      <span className="font-semibold text-text-primary">
                        Logistic Regression v1
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <Card>
            <div className="text-center py-12">
              <Upload size={48} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Assessment Yet
              </h3>
              <p className="text-text-secondary mb-6">
                Click "Assess Credit" to generate your credit assessment
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
