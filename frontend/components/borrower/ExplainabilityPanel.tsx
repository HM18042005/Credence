'use client';

import React from 'react';
import Card from '../shared/Card';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface ExplainabilityPanelProps {
  positiveFactors: string[];
  riskFactors: string[];
}

export default function ExplainabilityPanel({ 
  positiveFactors, 
  riskFactors 
}: ExplainabilityPanelProps) {
  return (
    <Card title="Decision Explanation">
      <div className="space-y-6">
        {/* Positive Factors */}
        {positiveFactors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-positive" />
              <h4 className="font-semibold text-positive">Positive Factors</h4>
            </div>
            <ul className="space-y-2">
              {positiveFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-positive mt-1">✓</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Risk Factors */}
        {riskFactors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-warning" />
              <h4 className="font-semibold text-warning">Risk Factors</h4>
            </div>
            <ul className="space-y-2">
              {riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-warning mt-1">⚠</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
