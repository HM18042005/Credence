'use client';

import React from 'react';
import { getRiskColor, getRiskBgColor } from '@/utils/formatters';

interface RiskBadgeProps {
  readonly risk: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

export default function RiskBadge({ risk, size = 'md' }: RiskBadgeProps) {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${getRiskBgColor(risk)} ${getRiskColor(risk)} ${sizeStyles[size]}`}
    >
      {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
    </span>
  );
}
