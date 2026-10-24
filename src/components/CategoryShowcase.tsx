'use client';

import React, { useState } from 'react';
import { 
  Plane, 
  Fuel, 
  ShoppingBag, 
  Utensils, 
  QrCode, 
  Globe, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  TrendingUp,
  Percent,
  Plus,
  Check
} from 'lucide-react';
import { CreditCard, CardCategory } from '../types/card';

interface CategoryShowcaseProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
}

interface CategoryMeta {
  id: CardCategory;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  criteria: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: 'Travel',
    name: 'Travel & Lounges',
    icon: <Plane className="w-5 h-5 text-sky-400" />,
    tagline: 'Air miles, free airport lounges, and hotel conversions',
    description: 'Engineered for flyers and staycationers. Earn massive accelerated rewards on flight bookings, free domestic & international Priority Pass lounge access, and transfer points to Marriott Bonvoy or Accor hotels.',
    criteria: 'Includes cards with complimentary airport lounges, air miles, or zero forex markup.',
  },
  {
    id: 'Fuel',
    name: 'Fuel & Surcharge',
    icon: <Fuel className="w-5 h-5 text-amber-400" />,
    tagline: 'Up to 7.25% value back on petrol & diesel',
    description: 'Tired of surging fuel prices? These specialized cobranded fuel cards partner with BPCL, IndianOil, and HPCL to give you fuel surcharge waivers and direct reward points redeemable for free petrol.',
    criteria: 'Cobranded fuel partnerships offering > 4% return on fuel spends.',
  },
  {
    id: 'Cashback',
    name: 'Shopping & Cashback',
    icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
    tagline: 'Flat 5% direct cashback on Amazon, Flipkart & online spends',
    description: 'No complicated reward catalogs or point devaluations. Get cold hard cash credited directly to your credit card statement on every online checkout.',
    criteria: 'Cards offering 5% or higher statement cashback across online merchants.',
  },
  {
    id: 'Dining',
    name: 'Dining & Groceries',
    icon: <Utensils className="w-5 h-5 text-rose-400" />,
    tagline: '10% to 25% on Swiggy, Zomato, BigBasket & dining',
    description: 'Save big on weekly food orders, restaurant bills, and instant grocery delivery apps like Blinkit, Zepto, and Instamart.',
    criteria: 'Cards with accelerated 10% cash return on food and groceries.',
  },
  {
    id: 'RuPay UPI',
    name: 'RuPay UPI Payments',
    icon: <QrCode className="w-5 h-5 text-teal-400" />,
    tagline: 'Earn cashback on everyday QR scans via GPay & PhonePe',
    description: 'Link these RuPay credit cards directly to Google Pay, PhonePe, Paytm, or BHIM. Pay local vendors, chai stalls, and grocery stores while earning 1.5% to 2% cashback.',
    criteria: 'RuPay network cards with UPI cashback enablement.',
  },
  {
    id: 'Zero Forex',
    name: 'Zero Forex Markup',
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    tagline: 'Zero foreign transaction markup on international travel',
    description: 'Standard credit cards charge an exorbitant 3.5% + GST fee whenever you swipe abroad or buy in USD/EUR. These cards slash that fee to 0%, saving you thousands.',
    criteria: 'Cards with 0% foreign currency transaction markup.',
  },
];

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  cards,
  onSelectCard,
  onToggleCompare,
  comparedCardIds,
}) => {
  const [selectedCat, setSelectedCat] = useState<CardCategory>('Travel');

  const currentMeta = CATEGORIES.find((c) => c.id === selectedCat) || CATEGORIES[0];

  // Filter cards matching the category
  const filteredCards = cards.filter((card) => {
    if (selectedCat === 'Zero Forex') {
      return card.perks.forexMarkupPercent === 0;
    }
    return card.primaryCategory === selectedCat || card.categories.includes(selectedCat);
  });

  return (
    <div className="space-y-8">
      {/* Category selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  {cat.icon}
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>
                )}
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {cat.name}
                </h4>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                  {cat.tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Category Info Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <span className="p-2 rounded-xl bg-slate-800 text-amber-400">
              {currentMeta.icon}
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Best Credit Cards for {currentMeta.name}
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentMeta.description}
          </p>
        </div>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs shrink-0">
          <span className="text-slate-400 block text-[11px]">Matching Champions:</span>
          <span className="text-amber-400 font-extrabold text-base">
            {filteredCards.length} Curated Cards
          </span>
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
                {/* Header Tag & Bank */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
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

                {/* Specific Category Return Badge */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Annual Fee:</span>
                    <span className="font-bold text-white">
                      {card.annualFee === 0 ? '₹0 (Free Forever)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
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

                  {card.perks.domesticLoungesPerQuarter && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Lounge Access:</span>
                      <span className="font-semibold text-sky-400">
                        {card.perks.domesticLoungesPerQuarter} per quarter
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Forex Markup:</span>
                    <span className="font-semibold text-amber-300">
                      {card.perks.forexMarkupPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
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
                  className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 flex items-center space-x-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
