'use client';

import React from 'react';
import Link from 'next/link';
import RiskBadge from '../shared/RiskBadge';
import { formatDate } from '@/utils/formatters';
import { getDecisionLabel, getDecisionColor } from '@/utils/formatters';
import { BorrowerListItem } from '@/lib/types';

interface BorrowerTableProps {
  borrowers: BorrowerListItem[];
}

export default function BorrowerTable({ borrowers }: BorrowerTableProps) {
  if (borrowers.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No borrowers found
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Business</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Category</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Risk</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Assessed</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map((borrower) => (
            <tr 
              key={borrower.user_id} 
              className="border-b border-border hover:bg-surface/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-text-primary">{borrower.name}</p>
                  <p className="text-sm text-text-muted">{borrower.email}</p>
                </div>
              </td>
              <td className="py-4 px-4 text-text-secondary">
                {borrower.business_name || '-'}
              </td>
              <td className="py-4 px-4 text-text-secondary">
                {borrower.business_category || '-'}
              </td>
              <td className="py-4 px-4">
                {borrower.latest_assessment?.risk_bucket ? (
                  <RiskBadge risk={borrower.latest_assessment.risk_bucket} size="sm" />
                ) : (
                  <span className="text-text-muted">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                {borrower.latest_assessment?.decision_status ? (
                  <span className={`font-medium ${getDecisionColor(borrower.latest_assessment.decision_status)}`}>
                    {getDecisionLabel(borrower.latest_assessment.decision_status)}
                  </span>
                ) : (
                  <span className="text-text-muted">-</span>
                )}
              </td>
              <td className="py-4 px-4 text-text-secondary text-sm">
                {borrower.latest_assessment?.assessed_at 
                  ? formatDate(borrower.latest_assessment.assessed_at)
                  : '-'
                }
              </td>
              <td className="py-4 px-4">
                <Link 
                  href={`/lender/borrower/${borrower.user_id}`}
                  className="text-primary hover:text-primary-hover font-medium text-sm"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
