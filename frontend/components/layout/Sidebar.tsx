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
  LogOut
} from 'lucide-react';

interface SidebarProps {
  role: 'borrower' | 'lender';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  const borrowerLinks = [
    { href: '/borrower/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/borrower/assessment', icon: TrendingUp, label: 'Credit Assessment' },
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
    <aside className="w-64 bg-surface border-r border-border h-screen fixed left-0 top-0 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Credence</h1>
        <p className="text-xs text-text-secondary mt-1">
          {role === 'borrower' ? 'Borrower Portal' : 'Lender Portal'}
        </p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:bg-border hover:text-text-primary'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-border hover:text-text-primary transition-colors w-full">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
