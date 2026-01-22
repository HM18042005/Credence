'use client';

import React from 'react';
import Card from '../shared/Card';
import { formatCurrency, getDecisionColor, getDecisionLabel } from '@/utils/formatters';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface CreditDecisionCardProps {
  readonly status: string;
  readonly creditLimit?: number;
  readonly tenure?: number;
  readonly riskScore: number;
}

export default function CreditDecisionCard({
  status,
  creditLimit,
  tenure,
  riskScore
}: CreditDecisionCardProps) {
  const getIcon = () => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle size={32} className="text-positive" />;
      case 'rejected':
        return <XCircle size={32} className="text-danger" />;
      default:
        return <Clock size={32} className="text-warning" />;
    }
  };

  return (
    <Card>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {getIcon()}
        </div>

        <div>
          <h3 className={`text-2xl font-bold ${getDecisionColor(status)}`}>
            {getDecisionLabel(status)}
          </h3>
          <p className="text-text-secondary mt-1">Credit Assessment Result</p>
        </div>

        {status.toLowerCase() === 'approved' && creditLimit && (
          <div className="pt-4 border-t border-border space-y-3">
            <div>
              <p className="text-sm text-text-secondary">Recommended Credit Limit</p>
              <p className="text-3xl font-bold text-text-primary mt-1">
                {formatCurrency(creditLimit)}
              </p>
            </div>

            {tenure && (
              <div>
                <p className="text-sm text-text-secondary">Suggested Tenure</p>
                <p className="text-xl font-semibold text-text-primary mt-1">
                  {tenure} months
                </p>
              </div>
            )}
          </div>
        )}

        {status.toLowerCase() === 'manual_review' && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-4">
            <p className="text-sm text-warning">
              Your application requires additional review. Our team will get back to you shortly.
            </p>
          </div>
        )}

        {status.toLowerCase() === 'rejected' && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 mt-4">
            <p className="text-sm text-danger">
              Your application was not approved at this time. Review the risk factors below to understand why.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
