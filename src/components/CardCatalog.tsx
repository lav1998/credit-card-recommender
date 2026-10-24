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
  CreditCard as CardIcon,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Star,
  ExternalLink
} from 'lucide-react';
import { CreditCard, CardCategory, CardTier } from '../types/card';

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
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedLtf, setSelectedLtf] = useState<string>('All');

  // Extract unique banks
  const banks = useMemo(() => {
    const list = Array.from(new Set(cards.map((c) => c.bank)));
    return ['All', ...list.sort()];
  }, [cards]);

  const categories = ['All', 'Cashback', 'Travel', 'Fuel', 'Dining', 'RuPay UPI', 'Premium / Luxury', 'Zero Forex'];
  const tiers = ['All', 'S-Tier', 'A-Tier', 'B-Tier', 'C-Tier'];

  // Filtered list
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.highlight.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.standoutFeature && card.standoutFeature.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesBank = selectedBank === 'All' || card.bank === selectedBank;

      const matchesCategory =
        selectedCategory === 'All' ||
        card.primaryCategory === selectedCategory ||
        card.categories.includes(selectedCategory as CardCategory);

      const matchesTier =
        selectedTier === 'All' ||
        card.tier === selectedTier ||
        (!card.tier && selectedTier === 'B-Tier');

      const matchesLtf =
        selectedLtf === 'All' ||
        (selectedLtf === 'Inherently LTF' && card.ltfPathways.isInherentlyLtf) ||
        (selectedLtf === 'Spend Waiver' && !card.ltfPathways.isInherentlyLtf && card.ltfPathways.spendWaiverAmount) ||
        (selectedLtf === 'Alumni Eligible' && card.ltfPathways.alumniEligible);

      return matchesSearch && matchesBank && matchesCategory && matchesTier && matchesLtf;
    });
  }, [cards, searchTerm, selectedBank, selectedCategory, selectedTier, selectedLtf]);

  const getTierBadge = (tier?: CardTier) => {
    switch (tier) {
      case 'S-Tier':
        return {
          label: 'S-Tier (Holy Grail)',
          classes: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/10',
        };
      case 'A-Tier':
        return {
          label: 'A-Tier (Category Killer)',
          classes: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10',
        };
      case 'B-Tier':
        return {
          label: 'B-Tier (Solid All-Rounder)',
          classes: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/10',
        };
      case 'C-Tier':
        return {
          label: 'C-Tier (Core / True LTF)',
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10',
        };
      default:
        return {
          label: 'Recommended',
          classes: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Master Catalog ({cards.length} Cards)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Every Popular Credit Card in India: Standouts, Pros & Cons
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curated from community consensus on r/CreditCardsIndia, official bank schedules, and real-world cardholder experiences. Filter by bank, category, reward tier, or Lifetime Free pathway.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs text-slate-400">Showing:</span>
            <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black">
              {filteredCards.length} Cards
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search cards by name, bank, or perk (e.g. 'Infinia', 'Cashback', 'Regalia', 'Lounge', 'Fuel')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
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
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Community Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>
                  {t}
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
          const tierInfo = getTierBadge(card.tier);

          return (
            <div
              key={card.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all p-5 shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Header row with Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center space-x-1.5">
                    {card.tier && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm ${tierInfo.classes}`}>
                        {card.tier}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      card.ltfStatus === 'LTF'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : card.ltfStatus === 'LTF Available via Pathways'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {card.ltfStatus}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {card.bank}
                  </span>
                </div>

                {/* Card Title & Network */}
                <div>
                  <h3
                    onClick={() => onSelectCard(card)}
                    className="text-lg font-black text-white group-hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                  >
                    {card.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {card.network} Network • {card.primaryCategory}
                  </p>
                </div>

                {/* STANDOUT HIGHLIGHT BOX - WHAT MAKES IT STAND OUT */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-l-4 border-amber-400 text-xs">
                  <div className="flex items-center space-x-1 text-amber-400 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>What Makes It Stand Out</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed font-medium">
                    {card.standoutFeature || card.highlight}
                  </p>
                </div>

                {/* PROS & CONS PREVIEW */}
                <div className="space-y-3 pt-1 border-t border-slate-800/80">
                  {/* Pros */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block mb-1">
                      👍 Key Pros
                    </span>
                    <ul className="space-y-1">
                      {card.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block mb-1">
                      👎 Watch Outs / Cons
                    </span>
                    <ul className="space-y-1">
                      {card.cons.slice(0, 2).map((con, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-slate-400">
                          <AlertCircle className="w-3 h-3 text-amber-400 mr-1.5 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Fee & Specs Strip */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Joining / Annual Fee:</span>
                    <span className="font-bold text-white text-[11px]">
                      {card.annualFee === 0 ? '₹0 (Free Forever)' : `₹${card.annualFee.toLocaleString('en-IN')} + GST`}
                    </span>
                  </div>

                  {card.ltfPathways.spendWaiverAmount && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Spend Waiver:</span>
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
                        : 'No free lounge'}
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
                  className="text-xs px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-sm"
                >
                  Full Specs & Pros/Cons
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
