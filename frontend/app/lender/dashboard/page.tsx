'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricCard from '@/components/shared/MetricCard';
import PortfolioCharts from '@/components/lender/PortfolioCharts';
import BorrowerTable from '@/components/lender/BorrowerTable';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  RefreshCw
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { API_ENDPOINTS } from '@/lib/api-config';
import { BorrowerListItem, PortfolioAnalytics } from '@/lib/types';

export default function LenderDashboard() {
  const [borrowers, setBorrowers] = useState<BorrowerListItem[]>([]);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Load borrowers
      const borrowersResponse = await fetch(API_ENDPOINTS.lender.listBorrowers);
      if (borrowersResponse.ok) {
        const borrowersData = await borrowersResponse.json();
        setBorrowers(borrowersData.borrowers || []);
      }
      
      // Load analytics
      const analyticsResponse = await fetch(API_ENDPOINTS.lender.getPortfolioAnalytics);
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout 
        role="lender" 
        title="Portfolio Dashboard" 
        subtitle="Monitor and manage credit decisions"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-text-secondary">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout 
      role="lender" 
      title="Portfolio Dashboard" 
      subtitle="Monitor and manage credit decisions"
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Portfolio Overview</h2>
              <p className="text-text-secondary mt-1">
                Real-time insights into your lending portfolio
              </p>
            </div>
            <Button 
              onClick={loadDashboardData}
              variant="secondary"
            >
              <RefreshCw size={18} className="mr-2 inline" />
              Refresh
            </Button>
          </div>
        </Card>
        
        {analytics ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Total Borrowers"
                value={analytics.total_assessments}
                icon={<Users size={24} />}
              />
              <MetricCard
                label="Total Exposure"
                value={formatCurrency(analytics.total_approved_exposure)}
                icon={<TrendingUp size={24} />}
              />
              <MetricCard
                label="Approved"
                value={analytics.decision_distribution.approved}
                icon={<CheckCircle size={24} />}
              />
              <MetricCard
                label="Rejected"
                value={analytics.decision_distribution.rejected}
                icon={<XCircle size={24} />}
              />
            </div>
            
            {/* Charts and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution Chart */}
              <PortfolioCharts
                riskDistribution={analytics.risk_distribution}
                totalAssessments={analytics.total_assessments}
              />
              
              {/* Decision Stats */}
              <Card title="Decision Statistics">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <p className="text-text-secondary text-sm">Approval Rate</p>
                      <p className="text-2xl font-bold text-positive">
                        {analytics.total_assessments > 0 
                          ? ((analytics.decision_distribution.approved / analytics.total_assessments) * 100).toFixed(1)
                          : 0
                        }%
                      </p>
                    </div>
                    <CheckCircle size={32} className="text-positive" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <p className="text-text-secondary text-sm">Manual Review</p>
                      <p className="text-2xl font-bold text-warning">
                        {analytics.decision_distribution.manual_review}
                      </p>
                    </div>
                    <Users size={32} className="text-warning" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <p className="text-text-secondary text-sm">Average Credit Limit</p>
                      <p className="text-xl font-bold text-text-primary">
                        {formatCurrency(analytics.average_credit_limit)}
                      </p>
                    </div>
                    <TrendingUp size={32} className="text-primary" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Borrowers Table */}
            <Card title="Recent Borrowers">
              <BorrowerTable borrowers={borrowers} />
            </Card>
          </>
        ) : (
          <Card>
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Data Available
              </h3>
              <p className="text-text-secondary">
                No borrower assessments have been created yet
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
