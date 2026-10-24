'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Check, 
  X,
  CreditCard as CardIcon
} from 'lucide-react';
import { CreditCard, CardCategory, CardNetwork } from '../types/card';

interface CardCatalogProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
}

export const CardCatalog: React.FC<CardCatalogProps> = ({
  cards,
  onSelectCard,
  onToggleCompare,
  comparedCardIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLtf, setSelectedLtf] = useState<string>('All');

  // Extract unique banks
  const banks = useMemo(() => {
    const list = Array.from(new Set(cards.map((c) => c.bank)));
    return ['All', ...list.sort()];
  }, [cards]);

  const categories = ['All', 'Cashback', 'Travel', 'Fuel', 'Dining', 'RuPay UPI', 'Premium / Luxury'];

  // Filtered list
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.highlight.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBank = selectedBank === 'All' || card.bank === selectedBank;

      const matchesCategory =
        selectedCategory === 'All' ||
        card.primaryCategory === selectedCategory ||
        card.categories.includes(selectedCategory as CardCategory);

      const matchesLtf =
        selectedLtf === 'All' ||
        (selectedLtf === 'Inherently LTF' && card.ltfPathways.isInherentlyLtf) ||
        (selectedLtf === 'Spend Waiver' && !card.ltfPathways.isInherentlyLtf && card.ltfPathways.spendWaiverAmount) ||
        (selectedLtf === 'Alumni Eligible' && card.ltfPathways.alumniEligible);

      return matchesSearch && matchesBank && matchesCategory && matchesLtf;
    });
  }, [cards, searchTerm, selectedBank, selectedCategory, selectedLtf]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search cards by name, bank, or perks (e.g. 'Infinia', 'Cashback', 'Forex', 'Lounge')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>Showing <strong className="text-amber-400">{filteredCards.length}</strong> of {cards.length} cards</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Bank / Issuer</label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">LTF Pathway</label>
            <select
              value={selectedLtf}
              onChange={(e) => setSelectedLtf(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Pricing Types</option>
              <option value="Inherently LTF">100% Free Forever (Inherently LTF)</option>
              <option value="Spend Waiver">Spend-Based Fee Waiver</option>
              <option value="Alumni Eligible">Alumni Offer Eligible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const isCompared = comparedCardIds.includes(card.id);

          return (
            <div
              key={card.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all p-5 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    card.ltfStatus === 'LTF'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : card.ltfStatus === 'LTF Available via Pathways'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {card.ltfStatus}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {card.bank}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectCard(card)}
                  className="text-lg font-bold text-white group-hover:text-amber-400 cursor-pointer transition-colors"
                >
                  {card.name}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                  {card.highlight}
                </p>

                {/* Specs Box */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Joining / Annual Fee:</span>
                    <span className="font-bold text-white">
                      {card.annualFee === 0 ? '₹0 (Free)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  {card.ltfPathways.spendWaiverAmount && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Fee Waiver Spend:</span>
                      <span className="font-semibold text-emerald-400">
                        ₹{card.ltfPathways.spendWaiverAmount.toLocaleString('en-IN')}/yr
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Lounges:</span>
                    <span className="font-semibold text-sky-400">
                      {card.perks.domesticLoungesPerQuarter
                        ? `${card.perks.domesticLoungesPerQuarter}/qtr domestic`
                        : 'None'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Forex Markup:</span>
                    <span className="font-semibold text-amber-300">
                      {card.perks.forexMarkupPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleCompare(card)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    isCompared
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  {isCompared ? 'Compared' : '+ Compare'}
                </button>
                <button
                  onClick={() => onSelectCard(card)}
                  className="text-xs px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all"
                >
                  Full Specs
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
