'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Users,
  Settings,
  LogOut,
  CreditCard,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  readonly role: 'borrower' | 'lender';
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
}

export default function Sidebar({ role, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const borrowerLinks = [
    { href: '/borrower/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/borrower/assessment', icon: CreditCard, label: 'Credit Assessment' },
    { href: '/borrower/history', icon: FileText, label: 'History' },
    { href: '/borrower/settings', icon: Settings, label: 'Settings' },
  ];

  const lenderLinks = [
    { href: '/lender/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/lender/borrowers', icon: Users, label: 'Borrowers' },
    { href: '/lender/portfolio', icon: TrendingUp, label: 'Portfolio' },
    { href: '/lender/settings', icon: Settings, label: 'Settings' },
  ];

  const links = role === 'borrower' ? borrowerLinks : lenderLinks;

  return (
    <>
      <aside
        className={`
          w-64 h-screen fixed left-0 top-0 flex flex-col z-40 
          glass-panel border-r border-border/50 bg-surface/95 md:bg-surface/80
          transition-transform duration-300 ease-in-out md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="p-8 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">Credence</h1>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                {role === 'borrower' ? 'Borrower Portal' : 'Lender Portal'}
              </p>
            </div>
          </div>

          {/* Close Button Mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-text-secondary hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose} // Auto close on mobile nav
                className="block relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative z-10 ${isActive
                  ? 'text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/50'
                  }`}>
                  <Icon size={20} className={isActive ? "text-primary stroke-[2.5px]" : "stroke-[1.5px]"} />
                  <span className="text-sm">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border/40 mb-2">
          <div className="p-4 rounded-xl bg-surface/50 border border-border/30 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-border flex items-center justify-center text-xs font-bold text-white">
                {role === 'borrower' ? 'BP' : 'LP'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-text-primary truncate">{role === 'borrower' ? 'Borrower User' : 'Lender Admin'}</p>
                <p className="text-xs text-text-secondary truncate">user@example.com</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors w-full group">
            <LogOut size={18} className="group-hover:stroke-danger transition-colors" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
