'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X,
  CreditCard as CardIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Archive,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CreditCard } from '../types/card';
import ALL_CARDS_DIRECTORY from '../data/all_cards_directory.json';
import DECOMMISSIONED_CARDS from '../data/decommissioned_cards.json';

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
  const [activeCatalogView, setActiveCatalogView] = useState<'active' | 'decommissioned'>('active');

  // Search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLtf, setSelectedLtf] = useState<string>('All');
  const [onlyWatchlist, setOnlyWatchlist] = useState<boolean>(false);

  // Extract unique banks
  const activeBanks = useMemo(() => {
    const list = Array.from(new Set(ALL_CARDS_DIRECTORY.map((c: any) => c.bank)));
    return ['All', ...list.sort()];
  }, []);

  const categories = [
    'All', 
    'Super Premium', 
    'Premium', 
    'Travel', 
    'Cashback', 
    'UPI', 
    'Fuel', 
    'Dining', 
    'Shopping', 
    'Rewards', 
    'Secured'
  ];

  // Filtered active cards
  const filteredActiveCards = useMemo(() => {
    return ALL_CARDS_DIRECTORY.filter((card: any) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.keyHighlights.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.devaluationWatch && card.devaluationWatch.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesBank = selectedBank === 'All' || card.bank === selectedBank;
      const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;

      const matchesLtf =
        selectedLtf === 'All' ||
        (selectedLtf === 'LTF' && card.ltfStatus === 'LTF') ||
        (selectedLtf === 'PAID' && card.ltfStatus !== 'LTF');

      const matchesWatchlist = !onlyWatchlist || Boolean(card.devaluationWatch);

      return matchesSearch && matchesBank && matchesCategory && matchesLtf && matchesWatchlist;
    });
  }, [searchTerm, selectedBank, selectedCategory, selectedLtf, onlyWatchlist]);

  // Filtered decommissioned cards
  const filteredDecommissionedCards = useMemo(() => {
    return DECOMMISSIONED_CARDS.filter((card: any) => {
      return (
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.reasonForDelisting.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.upgradePath.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center sm:text-left space-y-2 border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Master Directory
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-editorial">
          Complete Indian credit card registry.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Access verified MITC terms, schedules of charges, and devaluation notices for all active and retired credit cards across India.
        </p>

        {/* Tab Switcher */}
        <div className="pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCatalogView('active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCatalogView === 'active'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Active Cards ({ALL_CARDS_DIRECTORY.length})
          </button>

          <button
            onClick={() => setActiveCatalogView('decommissioned')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCatalogView === 'decommissioned'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Delisted / Retired ({DECOMMISSIONED_CARDS.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={
              activeCatalogView === 'active'
                ? "Filter cards by name, bank, or perk (e.g. '1838', 'Infinia', 'Lounge', 'Amex')..."
                : "Filter delisted cards (e.g. 'Regalia First', 'Citi PremierMiles', 'Manhattan')..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {activeCatalogView === 'active' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {activeBanks.map((b: any) => (
                <option key={b} value={b}>{b === 'All' ? 'All Banks' : b}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            <select
              value={selectedLtf}
              onChange={(e) => setSelectedLtf(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Fee Types</option>
              <option value="LTF">100% Free Forever</option>
              <option value="PAID">Annual Fee Charged</option>
            </select>

            <button
              onClick={() => setOnlyWatchlist(!onlyWatchlist)}
              className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center space-x-1.5 ${
                onlyWatchlist
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{onlyWatchlist ? 'Watchlist Only' : 'Devaluation Watch'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* ACTIVE CARDS VIEW */}
      {/* ===================================================================== */}
      {activeCatalogView === 'active' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 flex justify-between items-center">
            <span>Displaying {filteredActiveCards.length} cards matching filters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActiveCards.map((card: any) => {
              const fullCardObj = cards.find(c => c.id === card.id);
              const isCompared = comparedCardIds.includes(card.id);

              return (
                <div
                  key={card.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all p-5 space-y-3.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          {card.bank} · {card.network}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                          card.ltfStatus === 'LTF'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {card.ltfStatus === 'LTF' ? 'Free Forever' : `₹${card.annualFee.toLocaleString('en-IN')}/yr`}
                        </span>
                      </div>
                      <h3
                        onClick={() => fullCardObj && onSelectCard(fullCardObj)}
                        className="text-base font-semibold text-white hover:text-amber-400 cursor-pointer transition-colors mt-0.5"
                      >
                        {card.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 shrink-0">
                      {card.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {card.keyHighlights}
                  </p>

                  {card.devaluationWatch && (
                    <div className="flex items-start space-x-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{card.devaluationWatch}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {fullCardObj ? (
                      <button
                        onClick={() => onToggleCompare(fullCardObj)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                          isCompared
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {isCompared ? 'In Compare' : '+ Compare'}
                      </button>
                    ) : <div />}

                    <div className="flex items-center space-x-3">
                      {card.officialProductUrl && (
                        <a
                          href={card.officialProductUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-400 hover:text-white inline-flex items-center space-x-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {fullCardObj && (
                        <button
                          onClick={() => onSelectCard(fullCardObj)}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                        >
                          MITC Terms
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* DECOMMISSIONED / DELISTED CARDS VIEW */}
      {/* ===================================================================== */}
      {activeCatalogView === 'decommissioned' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Cards delisted or migrated by issuers in India. If you hold any of these cards, check the upgrade recommendation.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDecommissionedCards.map((card: any) => (
              <div
                key={card.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3"
              >
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">{card.bank}</span>
                    <h3 className="text-base font-semibold text-white">{card.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Delisted {card.decommissionedDate}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Delisting Context</span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">
                      {card.reasonForDelisting}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Recommended Upgrade Target</span>
                    <span className="text-amber-400 font-medium mt-0.5 block">
                      {card.upgradePath}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
