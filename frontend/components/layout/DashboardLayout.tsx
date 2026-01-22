'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'borrower' | 'lender';
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({ 
  children, 
  role, 
  title, 
  subtitle 
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} />
      
      <div className="flex-1 ml-64">
        <Header title={title} subtitle={subtitle} />
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
