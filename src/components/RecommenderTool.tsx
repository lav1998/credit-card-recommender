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
  Check,
  Star,
  Wallet,
  Landmark,
  X,
  Layers,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { 
  CreditCard, 
  UserSpendProfile, 
  CardRecommendationResult, 
  UserBankAccount, 
  BankAccountType,
  CardTier 
} from '../types/card';
import { rankCardsForUser } from '../lib/calculator';

interface RecommenderToolProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
  onNavigateToLtfHub: () => void;
}

const AVAILABLE_BANKS = [
  'HDFC Bank',
  'State Bank of India (SBI)',
  'ICICI Bank',
  'Axis Bank',
  'IDFC FIRST Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'HSBC Bank',
  'Standard Chartered',
  'Federal Bank',
  'AU Small Finance Bank',
];

const ACCOUNT_TYPES: BankAccountType[] = [
  'Salary Account',
  'Savings Account',
  'Wealth / Priority Account',
  'Current Account',
];

const PRESETS: { 
  name: string; 
  icon: string; 
  subtitle: string;
  profile: Partial<UserSpendProfile>; 
}[] = [
  {
    name: 'My Setup (HDFC Salary + SBI Savings + Regalia Gold)',
    icon: '🎯',
    subtitle: 'User scenario: HDFC Salary + SBI Savings + Regalia Gold',
    profile: {
      bankAccounts: [
        { bank: 'HDFC Bank', accountType: 'Salary Account' },
        { bank: 'State Bank of India (SBI)', accountType: 'Savings Account' },
      ],
      existingCardIds: ['hdfc-regalia-gold'],
      monthlyTravel: 5000,
      monthlyFuel: 3000,
      monthlyOnlineShopping: 12000,
      monthlyDining: 6000,
      monthlyGroceries: 6000,
      monthlyUtilities: 4000,
      monthlyUpi: 5000,
      monthlyOfflineOther: 4000,
      travelLoungeVisitsPerYear: 4,
      internationalTravelPerYear: 1,
      userAnnualIncome: 1500000,
      primaryPreference: 'All-Rounder',
    },
  },
  {
    name: 'Young Professional / Salaried',
    icon: '💼',
    subtitle: 'Urban salaried with high online shopping & dining',
    profile: {
      bankAccounts: [
        { bank: 'HDFC Bank', accountType: 'Salary Account' },
      ],
      existingCardIds: [],
      monthlyTravel: 2500,
      monthlyFuel: 2000,
      monthlyOnlineShopping: 8000,
      monthlyDining: 4500,
      monthlyGroceries: 4000,
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
    subtitle: 'High travel & international spending',
    profile: {
      bankAccounts: [
        { bank: 'HDFC Bank', accountType: 'Salary Account' },
        { bank: 'Axis Bank', accountType: 'Savings Account' },
      ],
      existingCardIds: ['hdfc-regalia-gold'],
      monthlyTravel: 30000,
      monthlyFuel: 4000,
      monthlyOnlineShopping: 15000,
      monthlyDining: 8000,
      monthlyGroceries: 6000,
      monthlyUtilities: 5000,
      monthlyUpi: 5000,
      monthlyOfflineOther: 10000,
      travelLoungeVisitsPerYear: 12,
      internationalTravelPerYear: 3,
      userAnnualIncome: 2800000,
    },
  },
  {
    name: 'Strict 100% Free / LTF Hunter',
    icon: '🆓',
    subtitle: 'Wants zero annual fees ever',
    profile: {
      bankAccounts: [
        { bank: 'State Bank of India (SBI)', accountType: 'Savings Account' },
      ],
      existingCardIds: [],
      prefersLtfOnly: true,
      monthlyTravel: 1000,
      monthlyFuel: 2000,
      monthlyOnlineShopping: 5000,
      monthlyDining: 3000,
      monthlyGroceries: 3000,
      monthlyUtilities: 2000,
      monthlyUpi: 4000,
      monthlyOfflineOther: 2000,
      travelLoungeVisitsPerYear: 1,
      internationalTravelPerYear: 0,
      userAnnualIncome: 600000,
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
  // Main profile state
  const [profile, setProfile] = useState<UserSpendProfile>({
    monthlyTravel: 5000,
    monthlyFuel: 3000,
    monthlyOnlineShopping: 12000,
    monthlyDining: 6000,
    monthlyGroceries: 6000,
    monthlyUtilities: 4000,
    monthlyUpi: 5000,
    monthlyOfflineOther: 4000,
    prefersLtfOnly: false,
    primaryPreference: 'All-Rounder',
    travelLoungeVisitsPerYear: 4,
    internationalTravelPerYear: 1,
    userAnnualIncome: 1500000,
    alumniInstitute: '',
    salaryBank: 'HDFC',
    // Default preloaded with user's scenario: HDFC Salary + SBI Savings
    bankAccounts: [
      { bank: 'HDFC Bank', accountType: 'Salary Account' },
      { bank: 'State Bank of India (SBI)', accountType: 'Savings Account' },
    ],
    // Default preloaded with user's scenario: HDFC Regalia Gold
    existingCardIds: ['hdfc-regalia-gold'],
  });

  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);
  const [newBank, setNewBank] = useState(AVAILABLE_BANKS[0]);
  const [newAccountType, setNewAccountType] = useState<BankAccountType>('Salary Account');
  const [isAddingBank, setIsAddingBank] = useState(false);

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

  // Add a bank account
  const handleAddBankAccount = () => {
    const exists = profile.bankAccounts.some(
      (b) => b.bank === newBank && b.accountType === newAccountType
    );
    if (!exists) {
      setProfile((prev) => ({
        ...prev,
        bankAccounts: [...prev.bankAccounts, { bank: newBank, accountType: newAccountType }],
      }));
    }
    setIsAddingBank(false);
  };

  // Remove a bank account
  const handleRemoveBankAccount = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index),
    }));
  };

  // Toggle existing card
  const handleToggleExistingCard = (cardId: string) => {
    setProfile((prev) => {
      const exists = prev.existingCardIds.includes(cardId);
      return {
        ...prev,
        existingCardIds: exists
          ? prev.existingCardIds.filter((id) => id !== cardId)
          : [...prev.existingCardIds, cardId],
      };
    });
  };

  // Check if user has HDFC Regalia Gold
  const hasRegaliaGold = profile.existingCardIds.includes('hdfc-regalia-gold');

  const getTierBadge = (tier?: CardTier) => {
    switch (tier) {
      case 'S-Tier':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'A-Tier':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'B-Tier':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'C-Tier':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-10 border border-slate-700/60 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bank Relationships & Portfolio Synergy Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Credit Card Recommender for <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Your Banking Relationship & Spends</span>
          </h1>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Personalized for your exact bank accounts (Salary & Savings) and existing credit card portfolio. Uncovers pre-approved card offers, corporate Lifetime Free (LTF) tie-ups, portfolio blindspots, and upgrade pathways.
          </p>

          {/* Quick Presets */}
          <div className="mt-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
              Quick Setup Presets:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset.profile)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 hover:border-amber-400/50 transition-all shadow-sm"
                >
                  <span className="text-base">{preset.icon}</span>
                  <span className="font-semibold text-white">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spending, Bank Accounts & Existing Cards Form */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SECTION 1: BANK ACCOUNTS RELATIONSHIP (User's specific requirement) */}
          <div className="bg-slate-900/95 rounded-2xl border-2 border-indigo-500/40 p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Landmark className="w-5 h-5 text-indigo-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Your Bank Accounts</h2>
                  <p className="text-[11px] text-slate-400">Affects card eligibility, pre-approvals & LTF waivers</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingBank(!isAddingBank)}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bank</span>
              </button>
            </div>

            {/* Active Bank Accounts List */}
            <div className="space-y-2">
              {profile.bankAccounts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No bank accounts added yet. Add your accounts to unlock corporate LTF and pre-approved offers.</p>
              ) : (
                profile.bankAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        account.accountType === 'Salary Account'
                          ? 'bg-emerald-400 ring-2 ring-emerald-400/20'
                          : 'bg-blue-400'
                      }`} />
                      <div>
                        <span className="text-xs font-bold text-white block">{account.bank}</span>
                        <span className={`text-[10px] font-semibold ${
                          account.accountType === 'Salary Account' ? 'text-emerald-300' : 'text-slate-400'
                        }`}>
                          {account.accountType}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBankAccount(index)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Inline Add Bank Form */}
            {isAddingBank && (
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-indigo-500/50 space-y-3 animate-in fade-in duration-150">
                <span className="text-xs font-bold text-white block">Add Bank Relationship</span>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-300 block mb-1">Select Bank</label>
                    <select
                      value={newBank}
                      onChange={(e) => setNewBank(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
                    >
                      {AVAILABLE_BANKS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-300 block mb-1">Account Type</label>
                    <select
                      value={newAccountType}
                      onChange={(e) => setNewAccountType(e.target.value as BankAccountType)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
                    >
                      {ACCOUNT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    onClick={() => setIsAddingBank(false)}
                    className="text-xs px-2.5 py-1 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddBankAccount}
                    className="text-xs px-3 py-1 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg transition-colors"
                  >
                    Confirm Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: EXISTING CREDIT CARDS & PORTFOLIO SYNERGY (User's specific requirement) */}
          <div className="bg-slate-900/95 rounded-2xl border-2 border-amber-500/40 p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Your Current Credit Cards</h2>
                  <p className="text-[11px] text-slate-400">Select what you currently have in your wallet</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                {profile.existingCardIds.length} Owned
              </span>
            </div>

            {/* Quick Toggle for HDFC Regalia Gold */}
            <div className="space-y-2">
              <div 
                onClick={() => handleToggleExistingCard('hdfc-regalia-gold')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  hasRegaliaGold
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    hasRegaliaGold
                      ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                      : 'border-slate-600 bg-slate-800'
                  }`}>
                    {hasRegaliaGold && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block">HDFC Regalia Gold Credit Card</span>
                    <span className="text-[10px] text-slate-400">Visa/Mastercard • Travel Mid-Luxury</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  hasRegaliaGold ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {hasRegaliaGold ? 'In Wallet' : '+ Add to Wallet'}
                </span>
              </div>

              {/* Other popular cards you can toggle */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Add other existing cards:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'amazon-pay-icici', label: 'Amazon Pay ICICI' },
                    { id: 'sbi-cashback', label: 'SBI Cashback' },
                    { id: 'tata-neu-infinity', label: 'Tata Neu Infinity' },
                    { id: 'axis-atlas', label: 'Axis Atlas' },
                  ].map((cardOption) => {
                    const isSelected = profile.existingCardIds.includes(cardOption.id);
                    return (
                      <button
                        key={cardOption.id}
                        onClick={() => handleToggleExistingCard(cardOption.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isSelected ? `✓ ${cardOption.label}` : `+ ${cardOption.label}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* DEDICATED SYNERGY & GAP ANALYSIS FOR REGALIA GOLD */}
            {hasRegaliaGold && (
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/70 to-slate-950 border border-indigo-500/40 space-y-2 text-xs">
                <div className="flex items-center space-x-1.5 text-indigo-300 font-extrabold uppercase text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analysis for your HDFC Regalia Gold</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Your <strong className="text-white">Regalia Gold</strong> gives you 12 domestic + 6 international Priority Pass lounges and ₹5k flight milestone vouchers.
                </p>
                <div className="space-y-1 text-[11px] text-slate-300 pt-1 border-t border-indigo-500/20">
                  <div className="flex items-start text-amber-300">
                    <span className="mr-1.5 font-bold">⚠️ Gap 1:</span>
                    <span>Online Shopping cashback is only 1.33%. You need <strong>SBI Cashback</strong> for flat 5% returns.</span>
                  </div>
                  <div className="flex items-start text-teal-300">
                    <span className="mr-1.5 font-bold">⚠️ Gap 2:</span>
                    <span>No UPI QR payments on Visa. You can get <strong>Tata Neu Infinity RuPay</strong> as a shared-limit HDFC floater card!</span>
                  </div>
                  <div className="flex items-start text-purple-300">
                    <span className="mr-1.5 font-bold">🚀 Upgrade:</span>
                    <span>With your <strong>HDFC Salary Account</strong>, you can upgrade to <strong>Infinia Metal</strong> once your limit reaches ₹7.5L+.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: MONTHLY SPENDS CALCULATOR */}
          <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Your Monthly Spends</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Total Monthly Spend</span>
                <span className="text-sm font-extrabold text-amber-400">
                  ₹{totalMonthlySpend.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Category Input Rows */}
            <div className="space-y-4">
              {/* Online Shopping */}
              <div className="space-y-1">
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
                  max="60000"
                  step="1000"
                  value={profile.monthlyOnlineShopping}
                  onChange={(e) => updateSpend('monthlyOnlineShopping', Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Flights & Hotels */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <Plane className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                    Flights & Hotels (Airlines, MMT, SmartBuy)
                  </span>
                  <span className="text-white font-semibold">₹{profile.monthlyTravel.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80000"
                  step="1000"
                  value={profile.monthlyTravel}
                  onChange={(e) => updateSpend('monthlyTravel', Number(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Dining & Food Delivery */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <Utensils className="w-3.5 h-3.5 mr-1.5 text-rose-400" />
                    Dining & Food Apps (Swiggy, Zomato, Restaurants)
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

              {/* Groceries & Instant Delivery */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Groceries & Quick Commerce (Blinkit, Instamart, Zepto)
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

              {/* Fuel */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <Fuel className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    Fuel & Gas (Petrol, Diesel, CNG)
                  </span>
                  <span className="text-white font-semibold">₹{profile.monthlyFuel.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="500"
                  value={profile.monthlyFuel}
                  onChange={(e) => updateSpend('monthlyFuel', Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Utility Bills */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                    Utility Bills (Electricity, Wi-Fi, Mobile, DTH)
                  </span>
                  <span className="text-white font-semibold">₹{profile.monthlyUtilities.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="500"
                  value={profile.monthlyUtilities}
                  onChange={(e) => updateSpend('monthlyUtilities', Number(e.target.value))}
                  className="w-full accent-yellow-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* RuPay UPI */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <QrCode className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                    RuPay UPI QR Scan & Pay (GPay, PhonePe, Paytm)
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

              {/* Offline POS / Other */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-slate-300 font-medium">
                    <Store className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                    General Offline / In-Store Purchases
                  </span>
                  <span className="text-white font-semibold">₹{profile.monthlyOfflineOther.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40000"
                  step="500"
                  value={profile.monthlyOfflineOther}
                  onChange={(e) => updateSpend('monthlyOfflineOther', Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Income & Travel Frequency */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Annual Income</label>
                  <select
                    value={profile.userAnnualIncome}
                    onChange={(e) => setProfile((p) => ({ ...p, userAnnualIncome: Number(e.target.value) }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={400000}>₹4 Lakhs / yr</option>
                    <option value={800000}>₹8 Lakhs / yr</option>
                    <option value={1500000}>₹15 Lakhs / yr</option>
                    <option value={2500000}>₹25 Lakhs / yr</option>
                    <option value={4000000}>₹40+ Lakhs / yr</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Domestic Lounges Needed</label>
                  <select
                    value={profile.travelLoungeVisitsPerYear}
                    onChange={(e) => setProfile((p) => ({ ...p, travelLoungeVisitsPerYear: Number(e.target.value) }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={0}>0 visits</option>
                    <option value={2}>2 visits / yr</option>
                    <option value={4}>4 visits / yr</option>
                    <option value={8}>8 visits / yr</option>
                    <option value={16}>16+ visits / yr</option>
                  </select>
                </div>
              </div>

              {/* Strict LTF Filter */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-white block">Strictly Lifetime Free (LTF) Only</span>
                  <span className="text-[10px] text-slate-400">Show only cards that are 100% free forever or waived</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.prefersLtfOnly}
                  onChange={(e) => setProfile((p) => ({ ...p, prefersLtfOnly: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ranked Recommendations Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Summary Stats */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400">Total Annual Spend Evaluated</span>
              <p className="text-xl font-black text-white">₹{totalAnnualSpend.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Cards Ranked</span>
              <p className="text-xl font-black text-amber-400">{rankedResults.length} Cards</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Top Potential Net Value</span>
              <p className="text-xl font-black text-emerald-400">
                +₹{topCard ? topCard.netAnnualValue.toLocaleString('en-IN') : 0} / yr
              </p>
            </div>
          </div>

          {/* List of Ranked Cards with Standout Highlights, Pros, Cons & Synergies */}
          <div className="space-y-5">
            {rankedResults.map((result, index) => {
              const isExpanded = expandedBreakdownId === result.card.id;
              const isCompared = comparedCardIds.includes(result.card.id);
              const tierBadgeClass = getTierBadge(result.card.tier);

              return (
                <div
                  key={result.card.id}
                  className={`bg-slate-900/95 rounded-2xl border transition-all p-5 shadow-xl space-y-4 ${
                    result.isExistingCard
                      ? 'border-slate-700 bg-slate-950/60 opacity-90'
                      : index === 0
                      ? 'border-2 border-amber-400/80 shadow-amber-500/10'
                      : result.isUpgradePath
                      ? 'border-2 border-purple-500/60 shadow-purple-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Badges & Status Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-200 font-black text-xs flex items-center justify-center border border-slate-700">
                        #{index + 1}
                      </span>
                      
                      {result.card.tier && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${tierBadgeClass}`}>
                          {result.card.tier}
                        </span>
                      )}

                      {result.isExistingCard && (
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                          💳 In Your Wallet (Current Baseline)
                        </span>
                      )}

                      {result.isUpgradePath && (
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-500/25 text-purple-200 border border-purple-400 animate-pulse">
                          🚀 Direct Upgrade Path from Regalia Gold
                        </span>
                      )}

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        result.feeWaived
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {result.ltfStatusForUser}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Net Annual Value</span>
                      <span className="text-lg font-black text-emerald-400">
                        +₹{result.netAnnualValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Basic Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3
                        onClick={() => onSelectCard(result.card)}
                        className="text-xl font-black text-white hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {result.card.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {result.card.bank} • {result.card.network} • {result.card.primaryCategory} • Annual Fee: {result.effectiveAnnualFee === 0 ? '₹0 (Waived/Free)' : `₹${result.effectiveAnnualFee.toLocaleString('en-IN')}`}
                      </p>
                    </div>
                  </div>

                  {/* STANDOUT HIGHLIGHT (The Killer Feature) */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-slate-900 border-l-4 border-amber-400">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>What Makes It Stand Out</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {result.card.standoutFeature || result.card.highlight}
                    </p>
                  </div>

                  {/* BANK RELATIONSHIP & PORTFOLIO SYNERGIES */}
                  {(result.relationshipSynergies.length > 0 || result.existingCardSynergies.length > 0 || result.upgradeDetails) && (
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5 text-xs">
                      {result.relationshipSynergies.map((synergy, sIdx) => (
                        <div key={sIdx} className="flex items-start text-indigo-300">
                          <Landmark className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 text-indigo-400" />
                          <span className="font-medium">{synergy}</span>
                        </div>
                      ))}
                      {result.existingCardSynergies.map((syn, cIdx) => (
                        <div key={cIdx} className="flex items-start text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 text-emerald-400" />
                          <span className="font-medium">{syn}</span>
                        </div>
                      ))}
                      {result.upgradeDetails && (
                        <div className="flex items-start text-purple-300 pt-1 border-t border-indigo-500/20">
                          <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 text-purple-400" />
                          <span className="font-semibold">{result.upgradeDetails}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* PROS & CONS GRID (Directly requested) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Pros */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                        👍 Standout Pros
                      </span>
                      <ul className="space-y-1">
                        {result.card.pros.slice(0, 2).map((pro, pIdx) => (
                          <li key={pIdx} className="flex items-start text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                        👎 Cons / Watch Outs
                      </span>
                      <ul className="space-y-1">
                        {result.card.cons.slice(0, 2).map((con, cIdx) => (
                          <li key={cIdx} className="flex items-start text-xs text-slate-400">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Category Breakdown Expander */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs animate-in fade-in duration-200">
                      <span className="font-bold text-white block">Annual Category Return Breakdown:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Online Shopping</span>
                          <span className="font-bold text-emerald-400">₹{result.categoryBreakdown.onlineShopping.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Travel (Flights/Hotels)</span>
                          <span className="font-bold text-sky-400">₹{result.categoryBreakdown.travel.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">Dining & Delivery</span>
                          <span className="font-bold text-rose-400">₹{result.categoryBreakdown.dining.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block">RuPay UPI Scan</span>
                          <span className="font-bold text-teal-400">₹{result.categoryBreakdown.upi.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Footer */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setExpandedBreakdownId(isExpanded ? null : result.card.id)}
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'Hide' : 'View'} Reward Math</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleCompare(result.card)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                          isCompared
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                        }`}
                      >
                        {isCompared ? 'Compared' : '+ Compare'}
                      </button>
                      <button
                        onClick={() => onSelectCard(result.card)}
                        className="text-xs px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-sm"
                      >
                        Full Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
