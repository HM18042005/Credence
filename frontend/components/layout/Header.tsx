'use client';

import React from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

interface HeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly onMenuClick?: () => void;
}

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 px-4 md:px-8 py-4 md:py-5 transition-all duration-200 backdrop-blur-md bg-background/50 border-b border-white/5">
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-surface text-text-secondary md:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">{title}</h1>
            {subtitle && (
              <p className="hidden md:block text-sm text-text-secondary mt-1 font-medium opacity-80">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="relative group hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-surface/80 border border-border/50 rounded-full flex items-center px-4 py-2 w-64 focus-within:w-80 focus-within:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <Search className="text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none focus:ring-0 text-sm text-text-primary placeholder-text-muted w-full ml-3"
              />
            </div>
          </div>

          <div className="h-6 w-px bg-border/50 mx-2 hidden md:block"></div>

          <ThemeToggle />

          <button className="hidden md:block relative p-2.5 rounded-full hover:bg-surface hover:text-primary text-text-secondary transition-all duration-200">
            <HelpCircle size={20} />
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-full hover:bg-surface hover:text-primary text-text-secondary transition-all duration-200 group">
            <Bell size={20} className="group-hover:animate-pulse" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-gradient-to-r from-danger to-orange-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
