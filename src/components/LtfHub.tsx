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
  BookOpen
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

  // Filter inherently LTF cards
  const inherentlyLtfCards = cards.filter((c) => c.ltfPathways.isInherentlyLtf);

  // Cards with spend waiver thresholds
  const spendWaiverCards = cards.filter(
    (c) => !c.ltfPathways.isInherentlyLtf && c.ltfPathways.spendWaiverAmount
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 p-6 sm:p-10 border border-emerald-800/40 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>Lifetime Free (LTF) Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            All About <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Lifetime Free (LTF)</span> Credit Cards
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Never pay an annual fee again. Discover cards that are 100% free by default, learn insider bank strategies to convert premium paid cards into LTF, and check alumni/corporate eligibility.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubTab('catalog')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'catalog'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Inherently LTF Cards ({inherentlyLtfCards.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('playbook')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'playbook'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ways to Make Cards LTF (Playbook)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('alumni-checker')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'alumni-checker'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Alumni LTF Offer Checker</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: INHERENTLY LTF CARDS CATALOG */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>100% Lifetime Free Cards (Zero Annual Fee Forever)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                These cards come with guaranteed zero joining fee and zero annual maintenance fee for life without any spend conditions.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 w-fit">
              {inherentlyLtfCards.length} Cards Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inherentlyLtfCards.map((card) => {
              const isCompared = comparedCardIds.includes(card.id);
              return (
                <div
                  key={card.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all p-5 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge and Network */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        100% Free Forever
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {card.network} • {card.bank}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectCard(card)}
                      className="text-lg font-bold text-white group-hover:text-emerald-400 cursor-pointer transition-colors"
                    >
                      {card.name}
                    </h3>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      {card.highlight}
                    </p>

                    {/* Quick Highlights */}
                    <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Primary Category:</span>
                        <span className="font-semibold text-white">{card.primaryCategory}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Domestic Lounges:</span>
                        <span className="font-semibold text-emerald-400">
                          {card.perks.domesticLoungesPerQuarter
                            ? `${card.perks.domesticLoungesPerQuarter} / quarter`
                            : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Forex Markup:</span>
                        <span className="font-semibold text-amber-300">
                          {card.perks.forexMarkupPercent === 0
                            ? '0% (Zero Forex)'
                            : `${card.perks.forexMarkupPercent}%`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
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
                      className="text-xs px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold transition-all"
                    >
                      View Perks
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spend Waiver Table */}
          <div className="mt-10 bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Coins className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                De-Facto Free: Spend Waiver Milestones
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              These premium cards charge a nominal fee upfront, but 100% waive it if you achieve the annual spend threshold:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Card Name</th>
                    <th className="py-2.5 px-3">Bank</th>
                    <th className="py-2.5 px-3">Normal Fee</th>
                    <th className="py-2.5 px-3">Annual Spend for 100% Fee Waiver</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {spendWaiverCards.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">{c.name}</td>
                      <td className="py-3 px-3 text-slate-400">{c.bank}</td>
                      <td className="py-3 px-3 text-rose-300 font-medium">₹{c.annualFee.toLocaleString('en-IN')}/yr</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">
                        ₹{c.ltfPathways.spendWaiverAmount?.toLocaleString('en-IN')} / year
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => onSelectCard(c)}
                          className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: WAYS TO MAKE CARDS LTF (PLAYBOOK) */}
      {activeSubTab === 'playbook' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>The Complete Blueprint: 6 Ways to Make Any Credit Card LTF</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Experienced credit card enthusiasts in India rarely pay annual fees. Here are the 6 proven channels to secure Lifetime Free status or fee reversals.
            </p>
          </div>

          <div className="space-y-6">
            {LTF_STRATEGIES.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                      {strategy.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{strategy.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{strategy.summary}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                      Difficulty: <strong className="text-white">{strategy.difficulty}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                      Success Rate: <strong className="text-emerald-400">{strategy.successRate}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {strategy.description}
                </p>

                {/* Step by step */}
                <div className="mt-4 bg-slate-950/70 rounded-xl p-4 border border-slate-800/80">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Actionable Steps
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {strategy.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center justify-center mr-2 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insider tips */}
                <div className="mt-3 bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-xs text-amber-200">
                  <span className="font-bold flex items-center mb-1">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Pro Tip
                  </span>
                  <p className="text-slate-300">{strategy.insiderTips[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: ALUMNI OFFER CHECKER */}
      {activeSubTab === 'alumni-checker' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Premier Institute Alumni LTF Program</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Are you an alumnus of an IIT, IIM, BITS Pilani, XLRI, ISB, NIT, or top law/medical school? You are eligible to receive flagship cards like ICICI Sapphiro (Mastercard + Amex) and HDFC Regalia Gold / DCB 100% Lifetime Free.
            </p>

            {/* College search input */}
            <div className="mt-4 relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search your college (e.g. IIT Delhi, BITS, IIM, NIT Trichy)..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ALUMNI_PROGRAMS.map((program) => (
              <div
                key={program.bank}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{program.bank}</h3>
                      <span className="text-xs text-indigo-400 font-medium">{program.programName}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      Alumni Offer
                    </span>
                  </div>

                  {/* Cards offered */}
                  <div className="mt-4 space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Cards Offered Lifetime Free
                    </span>
                    {program.cardsOffered.map((card, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white">{card.cardName}</h4>
                          <span className="text-[10px] text-rose-300 line-through">
                            {card.normalFee}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                          {card.alumniBenefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Eligible Colleges List */}
                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Eligible Institutes
                    </span>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 text-xs">
                      {program.eligibleColleges.map((cat, idx) => {
                        const filteredColleges = collegeSearch
                          ? cat.colleges.filter((c) =>
                              c.toLowerCase().includes(collegeSearch.toLowerCase())
                            )
                          : cat.colleges;

                        if (collegeSearch && filteredColleges.length === 0) return null;

                        return (
                          <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                            <span className="font-semibold text-slate-300 block mb-1 text-[11px]">
                              {cat.category}:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {filteredColleges.map((college, cIdx) => (
                                <span
                                  key={cIdx}
                                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                    collegeSearch &&
                                    college.toLowerCase().includes(collegeSearch.toLowerCase())
                                      ? 'bg-amber-400 text-slate-950 font-bold'
                                      : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  {college}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-xs space-y-2">
                  <div className="text-slate-400">
                    <strong className="text-slate-200">How to Apply: </strong>
                    {program.applicationMethod}
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
