'use client';

import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Gift, 
  Plane, 
  Coins, 
  TrendingUp, 
  GraduationCap, 
  Building2, 
  PhoneCall,
  ExternalLink,
  Plus,
  Check
} from 'lucide-react';
import { CreditCard } from '../types/card';

interface CardDetailModalProps {
  card: CreditCard | null;
  onClose: () => void;
  onToggleCompare: (card: CreditCard) => void;
  isCompared: boolean;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  onClose,
  onToggleCompare,
  isCompared,
}) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              card.ltfStatus === 'LTF'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : card.ltfStatus === 'LTF Available via Pathways'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {card.ltfStatus}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {card.bank} • {card.network}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Card Title & Highlight */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{card.name}</h2>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">{card.highlight}</p>
          </div>

          {/* Pricing & Fee Waiver Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Joining Fee</span>
              <span className="text-base font-bold text-white">
                {card.joiningFee === 0 ? '₹0 (Free)' : `₹${card.joiningFee.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Annual Renewal Fee</span>
              <span className="text-base font-bold text-white">
                {card.annualFee === 0 ? '₹0 (Free Forever)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Spend to Waive Fee</span>
              <span className="text-base font-bold text-emerald-400">
                {card.ltfPathways.spendWaiverAmount
                  ? `₹${card.ltfPathways.spendWaiverAmount.toLocaleString('en-IN')} / year`
                  : card.ltfPathways.isInherentlyLtf
                  ? 'Always Free'
                  : 'Fee Not Waivable'}
              </span>
            </div>
          </div>

          {/* LTF Pathways Section */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Ways to Get This Card Lifetime Free (LTF)</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              {card.ltfPathways.isInherentlyLtf ? (
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                  <span><strong>100% Lifetime Free By Design:</strong> This card has zero joining and zero annual fee forever without any spend conditions.</span>
                </div>
              ) : (
                <>
                  {card.ltfPathways.spendWaiverAmount && (
                    <div className="flex items-start">
                      <Coins className="w-4 h-4 text-amber-400 mr-2 shrink-0 mt-0.5" />
                      <span><strong>Spend Milestone Waiver:</strong> Spend ₹{card.ltfPathways.spendWaiverAmount.toLocaleString('en-IN')} within the 12-month card anniversary year and the annual fee is 100% reversed.</span>
                    </div>
                  )}

                  {card.ltfPathways.alumniEligible && (
                    <div className="flex items-start">
                      <GraduationCap className="w-4 h-4 text-indigo-400 mr-2 shrink-0 mt-0.5" />
                      <span><strong>Alumni Program Route:</strong> Eligible for Lifetime Free conversion under the bank&apos;s alumni initiative for graduates of premier institutions (IITs, IIMs, BITS, NITs, etc.).</span>
                    </div>
                  )}

                  {card.ltfPathways.salaryTierRequired && (
                    <div className="flex items-start">
                      <Building2 className="w-4 h-4 text-blue-400 mr-2 shrink-0 mt-0.5" />
                      <span><strong>Corporate Salary Tie-Up:</strong> Hold a corporate salary account with {card.bank} ({card.ltfPathways.salaryTierRequired} or higher) to request an LTF upgrade from your Relationship Manager.</span>
                    </div>
                  )}

                  {card.ltfPathways.retentionTips && (
                    <div className="flex items-start">
                      <PhoneCall className="w-4 h-4 text-rose-400 mr-2 shrink-0 mt-0.5" />
                      <span><strong>Retention Negotiation Strategy:</strong> {card.ltfPathways.retentionTips}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Reward Rate Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Reward Rates Across Categories</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Base Spends</span>
                <span className="text-base font-bold text-white">{card.rewards.basePercent}%</span>
              </div>

              {card.rewards.onlineShoppingPercent && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Online Shopping</span>
                  <span className="text-base font-bold text-emerald-400">{card.rewards.onlineShoppingPercent}%</span>
                </div>
              )}

              {card.rewards.travelPercent && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Travel (Flights/Hotels)</span>
                  <span className="text-base font-bold text-sky-400">{card.rewards.travelPercent}%</span>
                </div>
              )}

              {card.rewards.fuelPercent && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Fuel Valueback</span>
                  <span className="text-base font-bold text-amber-400">{card.rewards.fuelPercent}%</span>
                </div>
              )}

              {card.rewards.diningPercent && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Dining / Food Apps</span>
                  <span className="text-base font-bold text-rose-400">{card.rewards.diningPercent}%</span>
                </div>
              )}

              {card.rewards.upiPercent && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">RuPay UPI Scan</span>
                  <span className="text-base font-bold text-teal-400">{card.rewards.upiPercent}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Travel & Lounge Access */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Travel Perks & Airport Lounges</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Domestic Lounges:</span>
                <span className="font-semibold text-white">
                  {card.perks.domesticLoungesPerQuarter
                    ? `${card.perks.domesticLoungesPerQuarter} per quarter`
                    : 'None'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">International Lounges:</span>
                <span className="font-semibold text-white">
                  {card.perks.internationalLoungesPerYear
                    ? `${card.perks.internationalLoungesPerYear} per year`
                    : 'None'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Forex Markup Fee:</span>
                <span className="font-semibold text-amber-400">
                  {card.perks.forexMarkupPercent === 0
                    ? '0% (Zero Forex)'
                    : `${card.perks.forexMarkupPercent}% + GST`}
                </span>
              </div>
            </div>
            {card.perks.loungeSpendRequirement && (
              <p className="text-[11px] text-amber-300/90 pt-1">
                ⚠️ {card.perks.loungeSpendRequirement}
              </p>
            )}
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Top Advantages
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {card.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                Watch Out For (Cons)
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {card.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 mr-2 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onToggleCompare(card)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-2 ${
              isCompared
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Comparison</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Comparison</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
