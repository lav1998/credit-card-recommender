'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  PhoneCall, 
  Coins, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  Award,
  BookOpen,
  Info
} from 'lucide-react';
import { CreditCard } from '../types/card';
import { LTF_STRATEGIES, ALUMNI_PROGRAMS } from '../data/ltfPlaybook';

interface LtfHubProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
}

export const LtfHub: React.FC<LtfHubProps> = ({
  cards,
  onSelectCard,
  onToggleCompare,
  comparedCardIds,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'playbook' | 'alumni-checker'>('catalog');
  const [collegeSearch, setCollegeSearch] = useState('');

  // Inherently LTF cards
  const inherentlyLtfCards = cards.filter((c) => c.ltfPathways.isInherentlyLtf);

  // Filter alumni institutions
  const filteredColleges = ALUMNI_PROGRAMS.flatMap((prog) =>
    prog.eligibleColleges.flatMap((cat) =>
      cat.colleges
        .filter((inst) => inst.toLowerCase().includes(collegeSearch.toLowerCase()))
        .map((inst) => ({
          institution: inst,
          bank: prog.bank,
          cardName: prog.cardsOffered.map((c) => c.cardName).join(' & '),
          category: cat.category,
          method: prog.applicationMethod,
        }))
    )
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center sm:text-left space-y-2 border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400">
          <Gift className="w-3.5 h-3.5" />
          <span>Lifetime Free Command Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-editorial">
          Never pay an unnecessary annual fee again.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Explore cards that are 100% free forever by default, verify alumni and corporate eligibility, and learn tested bank strategies to convert existing paid cards into lifetime-free accounts.
        </p>

        {/* Clean Sub-navigation Segmented Control */}
        <div className="pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSubTab === 'catalog'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Default Free Cards ({inherentlyLtfCards.length})
          </button>

          <button
            onClick={() => setActiveSubTab('playbook')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSubTab === 'playbook'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            How to Make Cards Free (Playbook)
          </button>

          <button
            onClick={() => setActiveSubTab('alumni-checker')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSubTab === 'alumni-checker'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Alumni & Corporate Checker
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: INHERENTLY LTF CARDS */}
      {/* ===================================================================== */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Guaranteed zero joining fee and zero annual fee forever.</span>
            <span className="font-mono text-emerald-400">{inherentlyLtfCards.length} Cards Found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inherentlyLtfCards.map((card) => {
              const isCompared = comparedCardIds.includes(card.id);
              return (
                <div
                  key={card.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        100% Free Forever
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {card.bank}
                      </span>
                    </div>

                    <div>
                      <h3 
                        onClick={() => onSelectCard(card)}
                        className="text-base font-semibold text-white group-hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {card.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {card.highlight}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Network:</span>
                        <span className="font-mono text-slate-300">{card.network}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Lounge Access:</span>
                        <span className="text-emerald-400 font-medium">
                          {card.perks.domesticLoungesPerQuarter ? `${card.perks.domesticLoungesPerQuarter} / Qtr` : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Forex Markup:</span>
                        <span className="font-mono text-amber-400">
                          {card.perks.forexMarkupPercent === 0 ? '0% (Zero Forex)' : `${card.perks.forexMarkupPercent}%`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onToggleCompare(card)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                        isCompared
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {isCompared ? 'In Compare' : '+ Compare'}
                    </button>

                    <button
                      onClick={() => onSelectCard(card)}
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      <span>Full Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: PLAYBOOK FOR MAKING CARDS LTF */}
      {/* ===================================================================== */}
      {activeSubTab === 'playbook' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Field-tested strategies utilized by Indian credit card enthusiasts to waive annual fees or convert cards to Lifetime Free status.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LTF_STRATEGIES.map((strat) => (
              <div
                key={strat.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{strat.title}</h3>
                    <span className="text-[10px] font-mono text-slate-400">{strat.summary}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {strat.successRate}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {strat.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Eligible Sample Cards:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {strat.eligibleCards.map((c, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                        {c.name} ({c.bank})
                      </span>
                    ))}
                  </div>
                </div>

                {strat.insiderTips.length > 0 && (
                  <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                    <strong className="text-emerald-300">Insider Tip: </strong>
                    {strat.insiderTips[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: ALUMNI OFFER CHECKER */}
      {/* ===================================================================== */}
      {activeSubTab === 'alumni-checker' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search your college (e.g. IIT Delhi, IIM Ahmedabad, BITS, NIT)..."
              value={collegeSearch}
              onChange={(e) => setCollegeSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredColleges.slice(0, 12).map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{item.institution}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.category}
                  </span>
                </div>
                <div className="text-slate-400">
                  Card: <span className="text-amber-400 font-medium">{item.cardName}</span> ({item.bank})
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Method: {item.method}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
