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
  ChevronRight
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
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: 'Travel',
    name: 'Travel & Lounges',
    icon: <Plane className="w-4 h-4 text-sky-400" />,
    tagline: 'Air miles, free airport lounges, and hotel conversions',
    description: 'Engineered for frequent flyers. Accelerate points on flight bookings, complimentary domestic and international Priority Pass lounges, and seamless 1:1 point transfers to global airline & hotel partners.',
  },
  {
    id: 'Fuel',
    name: 'Fuel & Commute',
    icon: <Fuel className="w-4 h-4 text-amber-400" />,
    tagline: 'Up to 7.25% value back on petrol & diesel',
    description: 'Specialized co-branded fuel cards in partnership with BPCL, IndianOil, and HPCL offering 1% fuel surcharge waivers and reward points redeemable for fuel vouchers.',
  },
  {
    id: 'Cashback',
    name: 'Shopping & Cashback',
    icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
    tagline: 'Flat 5% direct cashback on Amazon, Flipkart & online checkouts',
    description: 'Direct statement credits with zero conversion fees or expiring point charts. The simplest way to monetize regular household e-commerce spends.',
  },
  {
    id: 'Dining',
    name: 'Dining & Groceries',
    icon: <Utensils className="w-4 h-4 text-rose-400" />,
    tagline: '10% to 25% savings on Swiggy, Zomato & restaurants',
    description: 'Exclusive accelerated return on weekend dining, food deliveries, and instant grocery apps like Blinkit, Zepto, and Instamart.',
  },
  {
    id: 'RuPay UPI',
    name: 'RuPay on UPI',
    icon: <QrCode className="w-4 h-4 text-teal-400" />,
    tagline: 'Earn rewards on scanning merchant QR codes',
    description: 'Link seamlessly to Google Pay, PhonePe, and Paytm to earn 1.5% to 2% cashback when paying neighborhood merchants and daily transactions via UPI.',
  },
  {
    id: 'Zero Forex',
    name: 'Zero Forex Markup',
    icon: <Globe className="w-4 h-4 text-indigo-400" />,
    tagline: '0% foreign currency markup for overseas swipes',
    description: 'Standard credit cards charge 3.5% + GST on foreign currency transactions. These travel cards slash this fee to 0%, saving hundreds on international travel and online USD payments.',
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

  const filteredCards = cards.filter((card) => {
    if (selectedCat === 'Zero Forex') {
      return card.perks.forexMarkupPercent === 0;
    }
    return card.primaryCategory === selectedCat || card.categories.includes(selectedCat);
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center sm:text-left space-y-2 border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Category Briefing
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-editorial">
          Specialized cards for targeted spend habits.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Instead of an all-rounder with mediocre returns, combine 2–3 specialized cards to achieve peak return across travel, fuel, groceries, and dining.
        </p>
      </div>

      {/* Segmented Category Pill Switcher */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                isSelected
                  ? 'bg-slate-800 text-white border-slate-700 shadow-sm font-semibold'
                  : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Category Brief Box */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-1.5">
        <h2 className="text-base font-semibold text-white tracking-tight">
          {currentMeta.name} — {currentMeta.tagline}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {currentMeta.description}
        </p>
      </div>

      {/* Cards List in Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => {
          const isCompared = comparedCardIds.includes(card.id);
          return (
            <div
              key={card.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {card.ltfStatus === 'LTF' ? 'Lifetime Free' : `₹${card.annualFee.toLocaleString('en-IN')}/yr`}
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

                <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Key Reward:</span>
                    <span className="font-medium text-slate-200 truncate ml-2">
                      {card.rewards.onlineShoppingPercent 
                        ? `${card.rewards.onlineShoppingPercent}% Online` 
                        : `${card.rewards.basePercent}% Base`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Lounges:</span>
                    <span className="font-medium text-emerald-400">
                      {card.perks.domesticLoungesPerQuarter 
                        ? `${card.perks.domesticLoungesPerQuarter} / Qtr` 
                        : 'None'}
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
                  <span>Full MITC</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
