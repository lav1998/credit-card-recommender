'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RecommenderTool } from '../components/RecommenderTool';
import { LtfHub } from '../components/LtfHub';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { CardCatalog } from '../components/CardCatalog';
import { CardDetailModal } from '../components/CardDetailModal';
import { ComparisonModal } from '../components/ComparisonModal';
import { CREDIT_CARDS } from '../data/cards';
import { CreditCard } from '../types/card';
import { GitCompare, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'recommender' | 'ltf-hub' | 'categories' | 'catalog'>('recommender');
  const [selectedCardForModal, setSelectedCardForModal] = useState<CreditCard | null>(null);
  const [comparedCardIds, setComparedCardIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Toggle card in comparison list (max 4)
  const handleToggleCompare = (card: CreditCard) => {
    setComparedCardIds((prev) => {
      if (prev.includes(card.id)) {
        return prev.filter((id) => id !== card.id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 cards at once. Please remove one to add another.');
        return prev;
      }
      return [...prev, card.id];
    });
  };

  const handleRemoveCompare = (cardId: string) => {
    setComparedCardIds((prev) => prev.filter((id) => id !== cardId));
  };

  const handleClearCompare = () => {
    setComparedCardIds([]);
  };

  const comparedCards = CREDIT_CARDS.filter((c) => comparedCardIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        comparisonCount={comparedCardIds.length}
        onOpenComparison={() => setIsCompareModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'recommender' && (
          <RecommenderTool
            cards={CREDIT_CARDS}
            onSelectCard={(card) => setSelectedCardForModal(card)}
            onToggleCompare={handleToggleCompare}
            comparedCardIds={comparedCardIds}
            onNavigateToLtfHub={() => setActiveTab('ltf-hub')}
          />
        )}

        {activeTab === 'ltf-hub' && (
          <LtfHub
            cards={CREDIT_CARDS}
            onSelectCard={(card) => setSelectedCardForModal(card)}
            onToggleCompare={handleToggleCompare}
            comparedCardIds={comparedCardIds}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryShowcase
            cards={CREDIT_CARDS}
            onSelectCard={(card) => setSelectedCardForModal(card)}
            onToggleCompare={handleToggleCompare}
            comparedCardIds={comparedCardIds}
          />
        )}

        {activeTab === 'catalog' && (
          <CardCatalog
            cards={CREDIT_CARDS}
            onSelectCard={(card) => setSelectedCardForModal(card)}
            onToggleCompare={handleToggleCompare}
            comparedCardIds={comparedCardIds}
          />
        )}
      </main>

      {/* Floating Compare Drawer Pill */}
      {comparedCardIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-xl rounded-full px-4 py-2 flex items-center space-x-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-mono font-bold text-[10px] flex items-center justify-center">
              {comparedCardIds.length}
            </span>
            <span className="text-xs font-medium text-slate-200 hidden sm:inline">
              Selected
            </span>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3.5 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs shadow-sm transition-all flex items-center space-x-1.5"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>

          <button
            onClick={handleClearCompare}
            className="text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      {/* Detailed Card Modal */}
      <CardDetailModal
        card={selectedCardForModal}
        onClose={() => setSelectedCardForModal(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedCardForModal ? comparedCardIds.includes(selectedCardForModal.id) : false}
      />

      {/* Side-by-Side Comparison Modal */}
      <ComparisonModal
        cards={comparedCards}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveCard={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 text-slate-500 text-xs py-8 mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">CardSmart India</span>
            <span className="text-slate-600">/</span>
            <span>Independent Credit Card Intelligence</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
            <span>Spend Analytics</span>
            <span>·</span>
            <span>Alumni Waivers</span>
            <span>·</span>
            <span>MITC Registry</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
