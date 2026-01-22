'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  readonly label: string;
  readonly value: string | number;
  readonly icon?: React.ReactNode;
  readonly trend?: {
    readonly value: number;
    readonly isPositive: boolean;
  };
  readonly className?: string;
}

export default function MetricCard({
  label,
  value,
  icon,
  trend,
  className = ''
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
      transition={{ duration: 0.3 }}
      className={`glass-panel rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-text-secondary text-sm font-medium mb-1.5 uppercase tracking-wide opacity-80">{label}</p>
          <p className="text-3xl font-bold text-text-primary bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{value}</p>
          {trend && (
            <div className={`text-xs font-semibold mt-3 inline-flex items-center px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-positive/10 text-positive' : 'bg-danger/10 text-danger'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary p-3 bg-primary/10 rounded-xl">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
