import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function MetricCard({ 
  label, 
  value, 
  icon, 
  trend,
  className = '' 
}: MetricCardProps) {
  return (
    <div className={`bg-surface rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-text-secondary text-sm mb-1">{label}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {trend && (
            <div className={`text-sm mt-2 ${trend.isPositive ? 'text-positive' : 'text-danger'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
