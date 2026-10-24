'use client';

import React, { useState, useMemo } from 'react';
import { 
  CreditCard as CardIcon, 
  Sparkles, 
  Plane, 
  Fuel, 
  ShoppingBag, 
  Utensils, 
  ShoppingCart, 
  Zap, 
  QrCode, 
  Store, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Percent,
  Plus,
  Check
} from 'lucide-react';
import { CreditCard, UserSpendProfile, CardRecommendationResult } from '../types/card';
import { rankCardsForUser } from '../lib/calculator';

interface RecommenderToolProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
  onNavigateToLtfHub: () => void;
}

const PRESETS: { name: string; icon: string; profile: Partial<UserSpendProfile> }[] = [
  {
    name: 'Young Professional',
    icon: '💼',
    profile: {
      monthlyTravel: 2500,
      monthlyFuel: 2000,
      monthlyOnlineShopping: 8000,
      monthlyDining: 4000,
      monthlyGroceries: 3500,
      monthlyUtilities: 2500,
      monthlyUpi: 4000,
      monthlyOfflineOther: 3000,
      travelLoungeVisitsPerYear: 2,
      internationalTravelPerYear: 0,
      userAnnualIncome: 900000,
    },
  },
  {
    name: 'Frequent Flyer / Jetsetter',
    icon: '✈️',
    profile: {
      monthlyTravel: 25000,
      monthlyFuel: 4000,
      monthlyOnlineShopping: 15000,
      monthlyDining: 8000,
      monthlyGroceries: 6000,
      monthlyUtilities: 5000,
      monthlyUpi: 5000,
      monthlyOfflineOther: 10000,
      travelLoungeVisitsPerYear: 12,
      internationalTravelPerYear: 3,
      userAnnualIncome: 2500000,
    },
  },
  {
    name: 'Family Spender',
    icon: '👨‍👩‍👧',
    profile: {
      monthlyTravel: 4000,
      monthlyFuel: 6000,
      monthlyOnlineShopping: 12000,
      monthlyDining: 6000,
      monthlyGroceries: 12000,
      monthlyUtilities: 7000,
      monthlyUpi: 8000,
      monthlyOfflineOther: 8000,
      travelLoungeVisitsPerYear: 4,
      internationalTravelPerYear: 1,
      userAnnualIncome: 1800000,
    },
  },
  {
    name: 'College Student / Starter',
    icon: '🎓',
    profile: {
      monthlyTravel: 500,
      monthlyFuel: 1000,
      monthlyOnlineShopping: 3500,
      monthlyDining: 2500,
      monthlyGroceries: 1000,
      monthlyUtilities: 1000,
      monthlyUpi: 3000,
      monthlyOfflineOther: 1000,
      travelLoungeVisitsPerYear: 1,
      internationalTravelPerYear: 0,
      userAnnualIncome: 350000,
      prefersLtfOnly: true,
    },
  },
];

export const RecommenderTool: React.FC<RecommenderToolProps> = ({
  cards,
  onSelectCard,
  onToggleCompare,
  comparedCardIds,
  onNavigateToLtfHub,
}) => {
  const [profile, setProfile] = useState<UserSpendProfile>({
    monthlyTravel: 4000,
    monthlyFuel: 3000,
    monthlyOnlineShopping: 10000,
    monthlyDining: 4500,
    monthlyGroceries: 5000,
    monthlyUtilities: 3000,
    monthlyUpi: 4000,
    monthlyOfflineOther: 3500,
    prefersLtfOnly: false,
    primaryPreference: 'All-Rounder',
    travelLoungeVisitsPerYear: 4,
    internationalTravelPerYear: 1,
    userAnnualIncome: 1200000,
    alumniInstitute: '',
    salaryBank: '',
  });

  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);

  const totalMonthlySpend =
    profile.monthlyTravel +
    profile.monthlyFuel +
    profile.monthlyOnlineShopping +
    profile.monthlyDining +
    profile.monthlyGroceries +
    profile.monthlyUtilities +
    profile.monthlyUpi +
    profile.monthlyOfflineOther;

  const totalAnnualSpend = totalMonthlySpend * 12;

  // Rank cards with real-time recalculation
  const rankedResults = useMemo(() => {
    return rankCardsForUser(cards, profile);
  }, [cards, profile]);

  const topCard = rankedResults[0];

  const updateSpend = (key: keyof UserSpendProfile, value: number) => {
    setProfile((prev) => ({ ...prev, [key]: Math.max(0, value) }));
  };

  const applyPreset = (presetProfile: Partial<UserSpendProfile>) => {
    setProfile((prev) => ({ ...prev, ...presetProfile }));
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-10 border border-slate-700/60 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI & Rules Engine Recommender</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Find the <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Exact Best Credit Card</span> For Your Spends in India
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Enter your monthly expenses below. Our engine computes the exact reward points, lounge valuations, fuel waivers, and checks whether you qualify to get the card <strong className="text-emerald-400 font-semibold">100% Lifetime Free (LTF)</strong> via alumni programs, salary tie-ups, or spend thresholds.
          </p>

          {/* Quick Presets */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Quick Presets:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.profile)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shadow-sm"
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spending Calculator Form */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Your Monthly Spends</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Monthly Spend</span>
              <span className="text-base font-extrabold text-amber-400">
                ₹{totalMonthlySpend.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Category Input Rows */}
          <div className="space-y-4">
            {/* Online Shopping */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  Online Shopping (Amazon, Flipkart, Myntra)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyOnlineShopping.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={profile.monthlyOnlineShopping}
                onChange={(e) => updateSpend('monthlyOnlineShopping', Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Travel: Flights & Hotels */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <Plane className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                  Flights & Hotels (Direct, MakeMyTrip, Cleartrip)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyTravel.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={profile.monthlyTravel}
                onChange={(e) => updateSpend('monthlyTravel', Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Fuel */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <Fuel className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Fuel (Petrol, Diesel at BPCL, IOCL, HPCL)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyFuel.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="500"
                value={profile.monthlyFuel}
                onChange={(e) => updateSpend('monthlyFuel', Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Dining & Food Delivery */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <Utensils className="w-3.5 h-3.5 mr-1.5 text-rose-400" />
                  Dining & Food Delivery (Zomato, Swiggy, Dineout)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyDining.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={profile.monthlyDining}
                onChange={(e) => updateSpend('monthlyDining', Number(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Groceries & Supermarkets */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Groceries (Blinkit, Instamart, Zepto, DMart)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyGroceries.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40000"
                step="500"
                value={profile.monthlyGroceries}
                onChange={(e) => updateSpend('monthlyGroceries', Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Utility Bills & Mobile Recharges */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                  Utilities (Electricity, WiFi, Mobile, Gas)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyUtilities.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="500"
                value={profile.monthlyUtilities}
                onChange={(e) => updateSpend('monthlyUtilities', Number(e.target.value))}
                className="w-full accent-yellow-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* RuPay UPI Merchant Payments */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <QrCode className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                  RuPay UPI Scan & Pay (Local stores, Chai, Veggies)
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyUpi.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={profile.monthlyUpi}
                onChange={(e) => updateSpend('monthlyUpi', Number(e.target.value))}
                className="w-full accent-teal-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* General Offline / POS */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-300 font-medium">
                  <Store className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                  General In-Store / Offline POS Purchases
                </span>
                <span className="text-white font-semibold">₹{profile.monthlyOfflineOther.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={profile.monthlyOfflineOther}
                onChange={(e) => updateSpend('monthlyOfflineOther', Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* LTF & Profile Unlockers */}
          <div className="border-t border-slate-800 pt-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Profile & LTF Qualification Triggers
            </h3>

            {/* Strict LTF Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div>
                <span className="text-xs font-semibold text-white block">Strictly Lifetime Free (LTF) Only</span>
                <span className="text-[11px] text-slate-400">Show only cards that are free forever or fee-waived</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.prefersLtfOnly}
                  onChange={(e) => setProfile((p) => ({ ...p, prefersLtfOnly: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Alumni Dropdown */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span className="flex items-center">
                  <GraduationCap className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  Premier Institute Alumnus (Unlocks ICICI/HDFC LTF)
                </span>
              </label>
              <select
                value={profile.alumniInstitute || ''}
                onChange={(e) => setProfile((p) => ({ ...p, alumniInstitute: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">None / Other College</option>
                <option value="IITs">Indian Institute of Technology (IITs)</option>
                <option value="IIMs">Indian Institute of Management (IIMs)</option>
                <option value="BITS Pilani">BITS Pilani (Pilani, Goa, Hyderabad)</option>
                <option value="XLRI / ISB">XLRI Jamshedpur / ISB Hyderabad & Mohali</option>
                <option value="NITs">Top National Institutes of Technology (NITs)</option>
                <option value="Top Tier 1">Other Tier-1 Institutes (AIIMS, NLSIU, FMS)</option>
              </select>
            </div>

            {/* Salary Bank */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span className="flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Your Corporate Salary Account Bank
                </span>
              </label>
              <select
                value={profile.salaryBank || ''}
                onChange={(e) => setProfile((p) => ({ ...p, salaryBank: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">Other / No Salary Account</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="SBI">State Bank of India (SBI)</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
                <option value="IDFC">IDFC FIRST Bank</option>
              </select>
            </div>

            {/* Lounge & Travel Frequency */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Domestic Lounges / Year</label>
                <select
                  value={profile.travelLoungeVisitsPerYear}
                  onChange={(e) => setProfile((p) => ({ ...p, travelLoungeVisitsPerYear: Number(e.target.value) }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value={0}>0 visits</option>
                  <option value={2}>2 visits</option>
                  <option value={4}>4 visits</option>
                  <option value={8}>8 visits</option>
                  <option value={12}>12+ visits</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Intl Flights / Year</label>
                <select
                  value={profile.internationalTravelPerYear}
                  onChange={(e) => setProfile((p) => ({ ...p, internationalTravelPerYear: Number(e.target.value) }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value={0}>0 trips</option>
                  <option value={1}>1 trip</option>
                  <option value={2}>2 trips</option>
                  <option value={4}>4+ trips</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ranked Recommendations Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Summary Stats */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400">Total Annual Spends Evaluated</span>
              <p className="text-xl font-black text-white">₹{totalAnnualSpend.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Eligible Cards Ranked</span>
              <p className="text-xl font-black text-amber-400">{rankedResults.length} Cards</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Top Potential Savings</span>
              <p className="text-xl font-black text-emerald-400">
                ₹{topCard ? topCard.netAnnualValue.toLocaleString('en-IN') : 0} / yr
              </p>
            </div>
          </div>

          {/* Top Winner Card Feature Box */}
          {topCard && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border-2 border-amber-500/50 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>#1 Best Overall Match</span>
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  topCard.feeWaived
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {topCard.ltfStatusForUser}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">{topCard.card.name}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {topCard.card.bank} • {topCard.card.network} Network • {topCard.card.primaryCategory}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Estimated Net Annual Savings</span>
                  <span className="text-3xl font-black text-emerald-400">
                    +₹{topCard.netAnnualValue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 block font-semibold">
                    ({topCard.netRoiPercent}% net return on spends)
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm mt-3 border-t border-slate-800/80 pt-3">
                {topCard.card.highlight}
              </p>

              {/* Fit Reasons Bullets */}
              <div className="mt-4 space-y-1.5">
                {topCard.fitReasons.slice(0, 3).map((reason, idx) => (
                  <div key={idx} className="flex items-start text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectCard(topCard.card)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                >
                  <span>Full Card Details & Perks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onToggleCompare(topCard.card)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                    comparedCardIds.includes(topCard.card.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {comparedCardIds.includes(topCard.card.id) ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Comparison</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Compare</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* List of Other Ranked Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center justify-between">
              <span>All Recommended Cards (Ranked by Value)</span>
              <span className="text-xs text-slate-500 font-normal">Sorted by Net Annual Savings</span>
            </h3>

            {rankedResults.map((result, index) => {
              const isExpanded = expandedBreakdownId === result.card.id;
              const isCompared = comparedCardIds.includes(result.card.id);

              return (
                <div
                  key={result.card.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 p-5 transition-all shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <h4 
                            onClick={() => onSelectCard(result.card)}
                            className="text-base font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                          >
                            {result.card.name}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            result.feeWaived
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {result.ltfStatusForUser}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {result.card.bank} • {result.card.primaryCategory} • Fee: ₹{result.effectiveAnnualFee.toLocaleString('en-IN')}/yr
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right pl-10 sm:pl-0">
                      <span className="text-xs text-slate-400 block">Net Annual Value</span>
                      <span className="text-xl font-extrabold text-emerald-400">
                        +₹{result.netAnnualValue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        ({result.netRoiPercent}% net return)
                      </span>
                    </div>
                  </div>

                  {/* Highlights and Fit Bullets */}
                  <div className="mt-3 pl-10 space-y-1 text-xs text-slate-300">
                    {result.fitReasons.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                    {result.cautions.length > 0 && (
                      <div className="flex items-start text-amber-300/90 text-[11px] mt-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0 mt-0.5" />
                        <span>{result.cautions[0]}</span>
                      </div>
                    )}
                  </div>

                  {/* Mathematical Breakdown Toggle */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between pl-10 flex-wrap gap-2">
                    <button
                      onClick={() => setExpandedBreakdownId(isExpanded ? null : result.card.id)}
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'Hide Reward Math' : 'View Reward Math'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleCompare(result.card)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          isCompared
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                        }`}
                      >
                        {isCompared ? 'Compared' : '+ Compare'}
                      </button>
                      <button
                        onClick={() => onSelectCard(result.card)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Expanded Math Section */}
                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 text-slate-300 pl-4 sm:pl-6">
                      <div className="font-bold text-white mb-2 flex items-center space-x-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Detailed Annual Mathematical Valuation Breakdown</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Shopping Cashback</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.onlineShopping.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Travel Rewards</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.travel.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Fuel Savings</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.fuel.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Dining & Food</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.dining.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Groceries</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.groceries.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">RuPay UPI Cashback</span>
                          <span className="font-bold text-white">₹{result.categoryBreakdown.upi.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Lounge Value</span>
                          <span className="font-bold text-white">₹{result.loungeValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Milestones Unlocked</span>
                          <span className="font-bold text-white">₹{result.milestoneBonusValue.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
                        <span className="text-slate-400">
                          Gross Rewards (₹{result.grossAnnualRewards.toLocaleString('en-IN')}) + Perks (₹{(result.loungeValue + result.milestoneBonusValue).toLocaleString('en-IN')}) - Fee (₹{result.effectiveAnnualFee.toLocaleString('en-IN')})
                        </span>
                        <span className="font-black text-emerald-400 text-sm">
                          = Net ₹{result.netAnnualValue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
