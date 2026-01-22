'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-primary text-white shadow-lg shadow-primary/25 border border-transparent',
    secondary: 'bg-surface/50 border border-border hover:bg-surface hover:border-text-muted/50 text-text-primary backdrop-blur-sm',
    danger: 'bg-gradient-to-r from-danger to-red-600 hover:from-red-500 hover:to-danger text-white shadow-lg shadow-danger/25',
    ghost: 'hover:bg-surface/50 text-text-secondary hover:text-text-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.02, y: props.disabled ? 0 : -1 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
