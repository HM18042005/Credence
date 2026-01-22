'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PageTransition from '@/components/shared/PageTransition';

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
  // Determine gradient based on role for subtle personalization
  const gradientOverlay = role === 'borrower'
    ? 'fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0'
    : 'fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent z-0';

  return (
    <div className="flex min-h-screen bg-transparent relative overflow-hidden">
      <div className={gradientOverlay} />

      <Sidebar role={role} />

      <div className="flex-1 ml-64 z-10 flex flex-col min-h-screen">
        <Header title={title} subtitle={subtitle} />

        <main className="flex-1 p-8 overflow-y-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
