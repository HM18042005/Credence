'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../shared/Card';

interface RiskDistribution {
  readonly low: number;
  readonly medium: number;
  readonly high: number;
}

interface PortfolioChartsProps {
  readonly riskDistribution: RiskDistribution;
  readonly totalAssessments: number;
}

export default function PortfolioCharts({ riskDistribution, totalAssessments }: PortfolioChartsProps) {
  const data = [
    { name: 'Low Risk', count: riskDistribution.low, fill: '#22C55E' },
    { name: 'Medium Risk', count: riskDistribution.medium, fill: '#F59E0B' },
    { name: 'High Risk', count: riskDistribution.high, fill: '#EF4444' },
  ];

  return (
    <Card title="Risk Distribution">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141A22',
                border: '1px solid #1F2937',
                borderRadius: '8px',
                color: '#E5E7EB'
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-text-secondary">
          Total Assessments: <span className="font-semibold text-text-primary">{totalAssessments}</span>
        </p>
      </div>
    </Card>
  );
}
