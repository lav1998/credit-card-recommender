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
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
              card.ltfStatus === 'LTF'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {card.ltfStatus === 'LTF' ? 'Lifetime Free' : card.ltfStatus}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {card.bank} · {card.network}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Card Title & Highlight */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white tracking-tight font-editorial">
              {card.name}
            </h2>
            
            {/* Standout Feature Callout */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                Primary Superpower
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                {card.standoutFeature || card.highlight}
              </p>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{card.highlight}</p>
          </div>

          {/* Pricing & Fee Waiver Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Joining Fee</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">
                {card.joiningFee === 0 ? '₹0 (Free)' : `₹${card.joiningFee.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Annual Renewal Fee</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">
                {card.annualFee === 0 ? '₹0 (Free Forever)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Spend to Waive Fee</span>
              <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">
                {card.ltfPathways.spendWaiverAmount
                  ? `₹${card.ltfPathways.spendWaiverAmount.toLocaleString('en-IN')} / year`
                  : card.ltfPathways.isInherentlyLtf
                  ? 'Always Free'
                  : 'Fee Not Waivable'}
              </span>
            </div>
          </div>

          {/* LTF Pathways Section */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>Lifetime Free (LTF) Pathways</span>
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
                      <Building2 className="w-4 h-4 text-sky-400 mr-2 shrink-0 mt-0.5" />
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
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Reward Rates Across Categories</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] font-mono uppercase">Base Spends</span>
                <span className="text-sm font-semibold text-white mt-0.5 block">{card.rewards.basePercent}%</span>
              </div>

              {card.rewards.onlineShoppingPercent && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] font-mono uppercase">Online Shopping</span>
                  <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">{card.rewards.onlineShoppingPercent}%</span>
                </div>
              )}

              {card.rewards.travelPercent && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] font-mono uppercase">Travel Spends</span>
                  <span className="text-sm font-semibold text-sky-400 mt-0.5 block">{card.rewards.travelPercent}%</span>
                </div>
              )}

              {card.rewards.fuelPercent && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] font-mono uppercase">Fuel Valueback</span>
                  <span className="text-sm font-semibold text-amber-400 mt-0.5 block">{card.rewards.fuelPercent}%</span>
                </div>
              )}

              {card.rewards.diningPercent && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] font-mono uppercase">Dining / Delivery</span>
                  <span className="text-sm font-semibold text-rose-400 mt-0.5 block">{card.rewards.diningPercent}%</span>
                </div>
              )}

              {card.rewards.upiPercent && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] font-mono uppercase">RuPay UPI</span>
                  <span className="text-sm font-semibold text-teal-400 mt-0.5 block">{card.rewards.upiPercent}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Travel & Lounge Access */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-semibold text-white flex items-center space-x-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>Airport Lounges & Forex</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-slate-300">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Domestic Lounges:</span>
                <span className="font-medium text-white">
                  {card.perks.domesticLoungesPerQuarter
                    ? `${card.perks.domesticLoungesPerQuarter} visits / quarter`
                    : 'None'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">International Lounges:</span>
                <span className="font-medium text-white">
                  {card.perks.internationalLoungesPerYear
                    ? `${card.perks.internationalLoungesPerYear} visits / year`
                    : 'None'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Forex Markup Fee:</span>
                <span className="font-medium text-amber-400">
                  {card.perks.forexMarkupPercent === 0 ? '0% (Zero Forex)' : `${card.perks.forexMarkupPercent}% + GST`}
                </span>
              </div>
            </div>
          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-mono uppercase text-[11px] tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Distinct Advantages</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {card.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-emerald-400 mr-2 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-mono uppercase text-[11px] tracking-wider text-rose-400 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Trade-offs & Exclusions</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {card.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-rose-400 mr-2 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <button
            onClick={() => onToggleCompare(card)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isCompared
                ? 'bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isCompared ? 'Card Added to Compare' : '+ Add to Compare'}
          </button>

          {card.applyUrl && (
            <a
              href={card.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white font-medium"
            >
              <span>Official Bank MITC & T&C</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
