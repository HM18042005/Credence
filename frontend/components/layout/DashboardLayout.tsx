'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PageTransition from '@/components/shared/PageTransition';

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
  readonly role: 'borrower' | 'lender';
  readonly title: string;
  readonly subtitle?: string;
}

export default function DashboardLayout({
  children,
  role,
  title,
  subtitle
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Determine gradient based on role for subtle personalization
  const gradientOverlay = role === 'borrower'
    ? 'fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0'
    : 'fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent z-0';

  return (
    <div className="flex min-h-screen bg-transparent relative overflow-hidden">
      <div className={gradientOverlay} />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 md:ml-64 z-10 flex flex-col min-h-screen w-full transition-all duration-300">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
