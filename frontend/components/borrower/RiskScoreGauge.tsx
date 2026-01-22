'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RiskScoreGaugeProps {
  score: number;
  riskBucket: string;
}

export default function RiskScoreGauge({ score, riskBucket }: RiskScoreGaugeProps) {
  // Create gauge data
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];
  
  // Color based on risk
  const getColor = () => {
    if (riskBucket === 'low') return '#22C55E';
    if (riskBucket === 'medium') return '#F59E0B';
    return '#EF4444';
  };
  
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
            dataKey="value"
          >
            <Cell fill={getColor()} />
            <Cell fill="#1F2937" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Score Display - positioned in center of gauge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
        <div className="text-4xl font-bold text-text-primary">{score.toFixed(0)}</div>
        <div className="text-sm text-text-secondary mt-1">Risk Score</div>
      </div>
    </div>
  );
}
