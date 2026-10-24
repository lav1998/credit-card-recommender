'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Gift, 
  Layers, 
  Compass, 
  GitCompare, 
  Sun, 
  Moon,
  CreditCard as CardIcon
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'recommender' | 'ltf-hub' | 'categories' | 'catalog';
  setActiveTab: (tab: 'recommender' | 'ltf-hub' | 'categories' | 'catalog') => void;
  comparisonCount: number;
  onOpenComparison: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  comparisonCount,
  onOpenComparison,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('cardsmart-theme') as 'dark' | 'light' | null;
    if (saved === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('cardsmart-theme', nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const navItems = [
    { id: 'recommender', label: 'Recommender', icon: Sparkles },
    { id: 'ltf-hub', label: 'LTF Hub', icon: Gift, badge: 'Free' },
    { id: 'categories', label: 'Categories', icon: Compass },
    { id: 'catalog', label: 'Card Directory', icon: Layers },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Editorial Logo */}
          <button 
            onClick={() => setActiveTab('recommender')}
            className="flex items-center space-x-2.5 text-left group transition-opacity hover:opacity-90"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 transition-colors">
              <CardIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-base tracking-tight text-white">
                  CardSmart
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  IN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal hidden sm:block -mt-0.5">
                India Credit Card Intelligence
              </p>
            </div>
          </button>

          {/* Segmented Minimalist Navigation */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {'badge' in item && item.badge && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Compare & Light/Dark Theme Switch */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center space-x-1.5"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[11px] font-medium text-slate-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline text-[11px] font-medium text-slate-600">Dark</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenComparison}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                comparisonCount > 0
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare</span>
              {comparisonCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 px-2.5 rounded-lg text-xs transition-colors ${
                  isActive ? 'text-amber-400 font-semibold bg-amber-400/10' : 'text-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
