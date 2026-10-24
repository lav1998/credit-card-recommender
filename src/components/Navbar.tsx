'use client';

import React from 'react';
import { CreditCard, Sparkles, Gift, Layers, Compass, GitCompare, GraduationCap } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('recommender')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                CardSmart<span className="text-amber-400">.in</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                India Credit Cards & LTF
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('recommender')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'recommender'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Smart Recommender</span>
            </button>

            <button
              onClick={() => setActiveTab('ltf-hub')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'ltf-hub'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>LTF Cards & Guide</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                Free
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'categories'
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Category Picks</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'catalog'
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>All 30+ Cards</span>
            </button>
          </nav>

          {/* Right Action: Comparison Drawer Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenComparison}
              className={`relative flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                comparisonCount > 0
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/25 hover:brightness-110'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare</span>
              {comparisonCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-300 text-xs flex items-center justify-center font-bold">
                  {comparisonCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab('recommender')}
            className={`py-1 px-2 rounded ${activeTab === 'recommender' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            Recommender
          </button>
          <button
            onClick={() => setActiveTab('ltf-hub')}
            className={`py-1 px-2 rounded ${activeTab === 'ltf-hub' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            LTF Hub
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-1 px-2 rounded ${activeTab === 'categories' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-1 px-2 rounded ${activeTab === 'catalog' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}
          >
            All Cards
          </button>
        </div>
      </div>
    </header>
  );
};
