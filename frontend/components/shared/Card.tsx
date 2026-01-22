'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass-panel rounded-2xl p-6 hover:border-text-muted/30 transition-all duration-300 ${className}`}
    >
      {title && (
        <h3 className="text-lg font-bold text-text-primary mb-5 tracking-tight">{title}</h3>
      )}
      {children}
    </motion.div>
  );
}
