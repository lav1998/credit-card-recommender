'use client';

import React from 'react';
import { X, Check, Minus, GitCompare, Sparkles, ShieldCheck } from 'lucide-react';
import { CreditCard } from '../types/card';

interface ComparisonModalProps {
  cards: CreditCard[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCard: (cardId: string) => void;
  onClearAll: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  cards,
  isOpen,
  onClose,
  onRemoveCard,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Side-by-Side Card Comparison</h2>
              <p className="text-xs text-slate-400">Comparing {cards.length} cards (max 4)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {cards.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto max-h-[80vh]">
          {cards.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <p>No cards added to compare yet.</p>
              <p className="text-xs text-slate-500 mt-1">
                Click &quot;+ Compare&quot; on any card from the Recommender, LTF Hub, or Categories view.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="py-4 px-3 w-44 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                      Metric
                    </th>
                    {cards.map((card) => (
                      <th key={card.id} className="py-4 px-4 align-top">
                        <div className="relative bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                          <button
                            onClick={() => onRemoveCard(card.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 shadow-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 block w-fit">
                            {card.bank}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-snug">{card.name}</h4>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border inline-block ${
                            card.ltfStatus === 'LTF'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}>
                            {card.ltfStatus}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {/* Annual Fee */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Annual Renewal Fee</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-bold text-white">
                        {c.annualFee === 0 ? (
                          <span className="text-emerald-400">₹0 (Free Forever)</span>
                        ) : (
                          `₹${c.annualFee.toLocaleString('en-IN')}`
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Fee Waiver Spend */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Fee Waiver Spend</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4">
                        {c.ltfPathways.spendWaiverAmount ? (
                          <span className="font-semibold text-emerald-400">
                            ₹{c.ltfPathways.spendWaiverAmount.toLocaleString('en-IN')} / year
                          </span>
                        ) : c.ltfPathways.isInherentlyLtf ? (
                          <span className="text-emerald-400">Inherently Free</span>
                        ) : (
                          <span className="text-slate-500">Not Waivable</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* What Makes It Stand Out */}
                  <tr className="bg-amber-500/5">
                    <td className="py-3 px-3 font-bold text-amber-400">What Makes It Stand Out</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-medium text-slate-200">
                        {c.standoutFeature || c.highlight}
                      </td>
                    ))}
                  </tr>

                  {/* Key Pros */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-emerald-400">Key Pros</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 align-top">
                        <ul className="space-y-1">
                          {c.pros.slice(0, 3).map((p, idx) => (
                            <li key={idx} className="text-slate-300 flex items-start text-[11px]">
                              <span className="text-emerald-400 mr-1 shrink-0">✓</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons & Caveats */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-amber-400">Cons & Caveats</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 align-top">
                        <ul className="space-y-1">
                          {c.cons.slice(0, 2).map((con, idx) => (
                            <li key={idx} className="text-slate-400 flex items-start text-[11px]">
                              <span className="text-amber-400 mr-1 shrink-0">⚠️</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Primary Category */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Primary Strength</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-semibold text-amber-300">
                        {c.primaryCategory}
                      </td>
                    ))}
                  </tr>


                  {/* Base Reward Rate */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Base Reward Rate</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-medium text-white">
                        {c.rewards.basePercent}%
                      </td>
                    ))}
                  </tr>

                  {/* Online Shopping Return */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Online Shopping</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-bold text-emerald-400">
                        {c.rewards.onlineShoppingPercent ? `${c.rewards.onlineShoppingPercent}%` : `${c.rewards.basePercent}%`}
                      </td>
                    ))}
                  </tr>

                  {/* Travel Return */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Travel Return</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-bold text-sky-400">
                        {c.rewards.travelPercent ? `${c.rewards.travelPercent}%` : `${c.rewards.basePercent}%`}
                      </td>
                    ))}
                  </tr>

                  {/* Fuel Return */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Fuel Valueback</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-bold text-amber-400">
                        {c.rewards.fuelPercent ? `${c.rewards.fuelPercent}%` : c.perks.fuelSurchargeWaiver ? '1% Surcharge Waiver' : 'None'}
                      </td>
                    ))}
                  </tr>

                  {/* Domestic Lounges */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Domestic Lounges</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-medium">
                        {c.perks.domesticLoungesPerQuarter
                          ? `${c.perks.domesticLoungesPerQuarter} per quarter`
                          : 'None'}
                      </td>
                    ))}
                  </tr>

                  {/* International Lounges */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Intl Lounges</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-medium">
                        {c.perks.internationalLoungesPerYear
                          ? `${c.perks.internationalLoungesPerYear} / year`
                          : 'None'}
                      </td>
                    ))}
                  </tr>

                  {/* Forex Markup */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Forex Markup Fee</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-bold">
                        {c.perks.forexMarkupPercent === 0 ? (
                          <span className="text-emerald-400">0% (Zero Forex)</span>
                        ) : (
                          `${c.perks.forexMarkupPercent}%`
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Alumni Offer */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400">Alumni LTF Eligible</td>
                    {cards.map((c) => (
                      <td key={c.id} className="py-3 px-4">
                        {c.ltfPathways.alumniEligible ? (
                          <span className="text-emerald-400 font-bold flex items-center">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Yes (Premier Colleges)
                          </span>
                        ) : (
                          <span className="text-slate-500">No</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
