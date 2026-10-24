'use client';

import React, { useState, useMemo } from 'react';
import { 
  CreditCard as CardIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  Check, 
  Landmark, 
  X, 
  Search, 
  ExternalLink,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  Shield,
  Plane,
  ShoppingBag,
  Coins,
  Building,
  Zap,
  Info
} from 'lucide-react';
import { 
  CreditCard, 
  UserBankAccount, 
  BankAccountType 
} from '../types/card';
import { LIFESTYLE_INTERESTS, LifestyleInterest } from '../data/interests';
import { KNOWN_UPGRADES, UpgradeRecommendation } from '../data/upgrade_paths';
import ALL_CARDS_DIRECTORY from '../data/all_cards_directory.json';
import DECOMMISSIONED_CARDS from '../data/decommissioned_cards.json';

interface RecommenderToolProps {
  cards: CreditCard[];
  onSelectCard: (card: CreditCard) => void;
  onToggleCompare: (card: CreditCard) => void;
  comparedCardIds: string[];
  onNavigateToLtfHub: () => void;
}

const PRIMARY_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India (SBI)',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'IDFC FIRST Bank',
  'Federal Bank',
  'YES Bank',
  'Standard Chartered',
  'HSBC Bank India',
  'AU Small Finance Bank',
  'Bank of Baroda (BOB)'
];

const ACCOUNT_TYPES: BankAccountType[] = [
  'Salary Account',
  'Savings Account',
  'Wealth / Priority Account',
  'Current Account'
];

export const RecommenderTool: React.FC<RecommenderToolProps> = ({
  cards,
  onSelectCard,
  onToggleCompare,
  comparedCardIds,
  onNavigateToLtfHub,
}) => {
  // Active Configuration Step (1: Banks, 2: Held Cards, 3: Priorities, 'all': summary view)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // User Profile Inputs
  const [bankAccounts, setBankAccounts] = useState<UserBankAccount[]>([
    { bank: 'HDFC Bank', accountType: 'Salary Account' }
  ]);
  const [selectedBankToAdd, setSelectedBankToAdd] = useState<string>('ICICI Bank');
  const [selectedAccTypeToAdd, setSelectedAccTypeToAdd] = useState<BankAccountType>('Savings Account');

  // Input 2: Existing Credit Cards
  const [existingCardIds, setExistingCardIds] = useState<string[]>([
    'hdfc-regalia-gold'
  ]);
  const [cardSearchQuery, setCardSearchQuery] = useState<string>('');

  // Input 3: Selected Interests
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([
    'domestic-travel',
    'online-shopping',
    'dining'
  ]);

  // Input 4: Spend Tier
  const [spendTier, setSpendTier] = useState<'low' | 'medium' | 'high' | 'luxury'>('medium');

  // Recommendation Results Filter
  const [resultFilter, setResultFilter] = useState<'all' | 'upgrades' | 'new-cards'>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'ltf' | 'under1500' | 'premium'>('all');

  // Master card search list (Active + Decommissioned)
  const allSelectableCards = useMemo(() => {
    const list: { id: string; name: string; bank: string; isDecommissioned?: boolean }[] = [];
    
    ALL_CARDS_DIRECTORY.forEach((c: any) => {
      list.push({ id: c.id, name: c.name, bank: c.bank, isDecommissioned: false });
    });

    DECOMMISSIONED_CARDS.forEach((d: any) => {
      if (!list.some(item => item.id === d.id)) {
        list.push({ id: d.id, name: d.name, bank: d.bank, isDecommissioned: true });
      }
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filtered card search suggestions
  const filteredSearchableCards = useMemo(() => {
    if (!cardSearchQuery.trim()) return [];
    const q = cardSearchQuery.toLowerCase();
    return allSelectableCards
      .filter(c => !existingCardIds.includes(c.id))
      .filter(c => c.name.toLowerCase().includes(q) || c.bank.toLowerCase().includes(q))
      .slice(0, 5);
  }, [allSelectableCards, existingCardIds, cardSearchQuery]);

  // Bank Account Handlers
  const handleAddBankAccount = () => {
    if (!bankAccounts.some(a => a.bank === selectedBankToAdd && a.accountType === selectedAccTypeToAdd)) {
      setBankAccounts([...bankAccounts, { bank: selectedBankToAdd, accountType: selectedAccTypeToAdd }]);
    }
  };

  const handleRemoveBankAccount = (index: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  // Card Handlers
  const handleAddCard = (cardId: string) => {
    if (!existingCardIds.includes(cardId)) {
      setExistingCardIds([...existingCardIds, cardId]);
      setCardSearchQuery('');
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setExistingCardIds(existingCardIds.filter(id => id !== cardId));
  };

  // Interest Handlers
  const handleToggleInterest = (id: string) => {
    setSelectedInterestIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Reset to neutral defaults
  const handleReset = () => {
    setBankAccounts([]);
    setExistingCardIds([]);
    setSelectedInterestIds([]);
    setSpendTier('medium');
    setActiveStep(1);
  };

  // =========================================================================
  // RECOMMENDATION ENGINE LOGIC
  // =========================================================================

  // 1. Upgrades for Held Cards
  const upgradeRecommendations = useMemo(() => {
    const list: UpgradeRecommendation[] = [];

    existingCardIds.forEach(id => {
      const upgrades = KNOWN_UPGRADES[id];
      if (upgrades && upgrades.length > 0) {
        upgrades.forEach(u => list.push(u));
      } else {
        const decom = DECOMMISSIONED_CARDS.find((d: any) => d.id === id);
        if (decom) {
          list.push({
            existingCardName: decom.name,
            bank: decom.bank,
            isDecommissioned: true,
            decommissionedNote: decom.reasonForDelisting,
            recommendedCardId: 'hdfc-regalia-gold',
            recommendedCardName: decom.upgradePath || 'Modern Replacement Portfolio Card',
            recommendedCardBank: decom.bank,
            whyUpgrade: `Delisted by issuer on ${decom.decommissionedDate}. Modern cards offer higher spend rewards and compliant airport lounge rules.`,
            upgradeRequirement: 'Call bank customer care or check the upgrades section in your netbanking portal.'
          });
        }
      }
    });

    return list;
  }, [existingCardIds]);

  // 2. Good-to-Have New Cards matching Interests & Bank accounts
  const recommendedNewCards = useMemo(() => {
    const available = cards.filter(c => !existingCardIds.includes(c.id));

    const scored = available.map(card => {
      let score = 0;
      const matchedInterests: LifestyleInterest[] = [];

      selectedInterestIds.forEach(intId => {
        const interest = LIFESTYLE_INTERESTS.find(i => i.id === intId);
        if (interest && interest.bestCards.includes(card.id)) {
          score += 4;
          matchedInterests.push(interest);
        }
      });

      // Primary category weight
      selectedInterestIds.forEach(intId => {
        if (
          (intId === 'online-shopping' && card.primaryCategory === 'Cashback') ||
          (intId === 'dining' && card.primaryCategory === 'Dining') ||
          (intId === 'fuel' && card.primaryCategory === 'Fuel') ||
          (intId === 'domestic-travel' && card.primaryCategory === 'Travel') ||
          (intId === 'international-travel' && card.categories.includes('Zero Forex')) ||
          (intId === 'rupay-upi' && card.network === 'RuPay') ||
          (intId === 'zero-fee-ltf' && card.ltfStatus === 'LTF')
        ) {
          score += 2;
        }
      });

      // Bank account relationship synergy
      const hasSalaryWithBank = bankAccounts.some(
        a => a.accountType === 'Salary Account' && card.bank.toLowerCase().includes(a.bank.toLowerCase().slice(0, 4))
      );
      const hasSavingsWithBank = bankAccounts.some(
        a => a.accountType === 'Savings Account' && card.bank.toLowerCase().includes(a.bank.toLowerCase().slice(0, 4))
      );
      const hasWealthWithBank = bankAccounts.some(
        a => a.accountType === 'Wealth / Priority Account' && card.bank.toLowerCase().includes(a.bank.toLowerCase().slice(0, 4))
      );

      let bankAdvantage = '';
      if (hasSalaryWithBank) {
        score += 3;
        bankAdvantage = `High pre-approval & LTF waiver odds via your ${card.bank} Salary Account`;
      } else if (hasWealthWithBank) {
        score += 3;
        bankAdvantage = `Premium fee waiver eligible via your Wealth / Priority status`;
      } else if (hasSavingsWithBank) {
        score += 1;
        bankAdvantage = `Instant digital KYC approval via your existing Savings Account`;
      }

      return {
        card,
        score,
        matchedInterests,
        bankAdvantage,
      };
    });

    // Filter by fee tab if active
    let filtered = scored;
    if (feeFilter === 'ltf') {
      filtered = filtered.filter(item => item.card.ltfStatus === 'LTF');
    } else if (feeFilter === 'under1500') {
      filtered = filtered.filter(item => item.card.annualFee <= 1500);
    } else if (feeFilter === 'premium') {
      filtered = filtered.filter(item => item.card.annualFee > 2500);
    }

    filtered.sort((a, b) => b.score - a.score);
    return filtered.filter(item => item.score > 0).slice(0, 6);
  }, [cards, existingCardIds, selectedInterestIds, bankAccounts, feeFilter]);

  // Grouped Interests for cleaner navigation
  const groupedInterests = useMemo(() => {
    return [
      {
        title: 'Travel & Mobility',
        items: LIFESTYLE_INTERESTS.filter(i => ['domestic-travel', 'international-travel', 'luxury-hotels', 'fuel'].includes(i.id))
      },
      {
        title: 'Daily Spending & Lifestyle',
        items: LIFESTYLE_INTERESTS.filter(i => ['online-shopping', 'dining', 'movies', 'pure-cashback', 'utilities'].includes(i.id))
      },
      {
        title: 'Financial & Privileges',
        items: LIFESTYLE_INTERESTS.filter(i => ['zero-fee-ltf', 'rupay-upi', 'golf', 'gym-fitness', 'vip-concierge'].includes(i.id))
      }
    ];
  }, []);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center sm:text-left space-y-2 border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Card Recommendation Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-editorial">
          Card intelligence tailored to your banking & lifestyle.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Input your bank relationships, held cards, and spending priorities. We surface direct upgrade paths for existing cards and optimal new additions to maximize your net return.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* STEPPING CONTROLS: SERENE, UNCLUTTERED PROGRESSIVE DISCLOSURE */}
      {/* ===================================================================== */}
      <div className="space-y-4">
        {/* Step Navigation Pill Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all ${
                activeStep === 1
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-mono">1</span>
              <span>Banks ({bankAccounts.length})</span>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all ${
                activeStep === 2
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-mono">2</span>
              <span>Held Cards ({existingCardIds.length})</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all ${
                activeStep === 3
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-mono">3</span>
              <span>Priorities ({selectedInterestIds.length})</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* STEP 1 PANEL: BANKING RELATIONSHIPS */}
        {/* =================================================================== */}
        {activeStep === 1 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Where do you hold bank accounts?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Indian banks reserve their best pre-approved lifetime-free offers and higher credit limits for salary and wealth account holders.
              </p>
            </div>

            {/* Current Active Bank Badges */}
            <div className="flex flex-wrap gap-2.5">
              {bankAccounts.map((acc, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                >
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium text-white">{acc.bank}</span>
                  <span className="text-[11px] text-slate-400 font-mono">({acc.accountType.replace(' Account', '')})</span>
                  <button
                    onClick={() => handleRemoveBankAccount(idx)}
                    className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {bankAccounts.length === 0 && (
                <div className="text-xs text-slate-500 py-2">
                  No bank accounts specified yet. Select below to add your primary bank.
                </div>
              )}
            </div>

            {/* Add Bank Form: Clean, uncluttered layout */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <select
                value={selectedBankToAdd}
                onChange={(e) => setSelectedBankToAdd(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {PRIMARY_BANKS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <select
                value={selectedAccTypeToAdd}
                onChange={(e) => setSelectedAccTypeToAdd(e.target.value as BankAccountType)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {ACCOUNT_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <button
                onClick={handleAddBankAccount}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center space-x-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Account</span>
              </button>

              <button
                onClick={() => setActiveStep(2)}
                className="sm:ml-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Next: Held Cards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 2 PANEL: HELD CREDIT CARDS */}
        {/* =================================================================== */}
        {activeStep === 2 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Which credit cards do you already hold?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                We use this to identify pending card upgrades, flag decommissioned/delisted cards, and avoid suggesting duplicates.
              </p>
            </div>

            {/* Held Cards Pills */}
            <div className="flex flex-wrap gap-2">
              {existingCardIds.map(cardId => {
                const cardObj = allSelectableCards.find(c => c.id === cardId);
                const isDecom = cardObj?.isDecommissioned;

                return (
                  <div
                    key={cardId}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs ${
                      isDecom 
                        ? 'bg-amber-500/10 border-amber-400/40 text-amber-200' 
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  >
                    <CardIcon className={`w-3.5 h-3.5 ${isDecom ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span className="font-medium">{cardObj ? cardObj.name : cardId}</span>
                    {isDecom && (
                      <span className="text-[10px] font-mono px-1 rounded bg-amber-400/20 text-amber-300">
                        Delisted
                      </span>
                    )}
                    <button
                      onClick={() => handleRemoveCard(cardId)}
                      className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {existingCardIds.length === 0 && (
                <div className="text-xs text-slate-500 py-2">
                  No cards added yet. If you have no cards, skip ahead to priorities.
                </div>
              )}
            </div>

            {/* Search Input for Cards */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="relative max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search your card (e.g. Regalia Gold, Coral, My Zone, SBI Cashback)..."
                  value={cardSearchQuery}
                  onChange={(e) => setCardSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                {filteredSearchableCards.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 z-30 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                    {filteredSearchableCards.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleAddCard(c.id)}
                        className="px-3.5 py-2 text-xs hover:bg-slate-800 cursor-pointer flex items-center justify-between border-b border-slate-800/60 last:border-0"
                      >
                        <div>
                          <span className="font-medium text-white">{c.name}</span>
                          <span className="text-[10px] text-slate-400 ml-2 font-mono">({c.bank})</span>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                <span className="text-[11px] text-slate-500">Popular:</span>
                {[
                  { id: 'hdfc-regalia-gold', name: 'HDFC Regalia Gold' },
                  { id: 'hdfc-regalia-first', name: 'Regalia First (Delisted)' },
                  { id: 'amazon-pay-icici', name: 'Amazon Pay ICICI' },
                  { id: 'sbi-cashback', name: 'SBI Cashback' },
                  { id: 'axis-ace', name: 'Axis Ace' }
                ].filter(item => !existingCardIds.includes(item.id)).map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddCard(item.id)}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
                  >
                    + {item.name}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveStep(1)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Banks
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
                >
                  <span>Next: Spending Priorities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 3 PANEL: SPENDING PRIORITIES */}
        {/* =================================================================== */}
        {activeStep === 3 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                What perks and spending categories matter most to you?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your top spending habits. We match cards engineered specifically for these merchant categories.
              </p>
            </div>

            {/* Categorized Priority Cards */}
            <div className="space-y-4">
              {groupedInterests.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    {group.title}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {group.items.map(interest => {
                      const isSelected = selectedInterestIds.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => handleToggleInterest(interest.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-400 text-white shadow-sm'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-base">{interest.icon}</span>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-amber-400 text-slate-950' : 'border border-slate-700'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold block leading-snug">
                              {interest.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Spend Level */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-medium text-white block">Monthly Spend Level</span>
                <span className="text-[11px] text-slate-400">Helps match milestone fee waivers</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {[
                  { key: 'low', label: '< ₹25k' },
                  { key: 'medium', label: '₹25k - ₹75k' },
                  { key: 'high', label: '₹75k - ₹2L' },
                  { key: 'luxury', label: '₹2L+ (Luxury)' }
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setSpendTier(t.key as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      spendTier === t.key
                        ? 'bg-slate-800 text-white border-slate-600 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* RECOMMENDATION RESULTS: CRISP EDITORIAL PRESENTATION */}
      {/* ===================================================================== */}
      <div className="space-y-6 pt-4 border-t border-slate-800/80">
        
        {/* Section Header & Clean Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-white font-editorial">
              Recommended for your profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Found {upgradeRecommendations.length} upgrade pathway{upgradeRecommendations.length === 1 ? '' : 's'} and {recommendedNewCards.length} high-synergy card{recommendedNewCards.length === 1 ? '' : 's'}.
            </p>
          </div>

          {/* Clean Segmented Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setResultFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                resultFilter === 'all'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Picks
            </button>
            <button
              onClick={() => setResultFilter('upgrades')}
              className={`px-3 py-1 rounded-lg transition-all ${
                resultFilter === 'upgrades'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upgrades ({upgradeRecommendations.length})
            </button>
            <button
              onClick={() => setResultFilter('new-cards')}
              className={`px-3 py-1 rounded-lg transition-all ${
                resultFilter === 'new-cards'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              New Additions ({recommendedNewCards.length})
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SUB-SECTION 1: UPGRADE PATHWAYS (For held cards) */}
        {/* =================================================================== */}
        {(resultFilter === 'all' || resultFilter === 'upgrades') && upgradeRecommendations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Direct Upgrades for Cards You Currently Hold
              </span>
            </div>

            <div className="space-y-3">
              {upgradeRecommendations.map((upgrade, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3.5 hover:border-slate-700 transition-colors"
                >
                  {/* Delisted Advisory Callout if applicable */}
                  {upgrade.isDecommissioned && (
                    <div className="flex items-start space-x-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-amber-300">Delisted / Legacy Card Notice</span>
                        <p className="mt-0.5 text-amber-200/90 leading-relaxed">
                          {upgrade.decommissionedNote}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-xs text-slate-400">
                        Current: <strong className="text-slate-200 font-medium">{upgrade.existingCardName}</strong>
                      </span>
                      <h3 className="text-base font-semibold text-white flex items-center space-x-2 mt-0.5">
                        <span>Upgrade to:</span>
                        <span className="text-amber-400">{upgrade.recommendedCardName}</span>
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {upgrade.recommendedCardBank}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                        Upgrade Rationale
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {upgrade.whyUpgrade}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                        Action Checklist
                      </span>
                      <p className="text-emerald-400 font-medium mt-0.5">
                        {upgrade.upgradeRequirement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUB-SECTION 2: GOOD-TO-HAVE COMPLEMENTARY CARDS */}
        {/* =================================================================== */}
        {(resultFilter === 'all' || resultFilter === 'new-cards') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Curated New Cards for Your Portfolio
                </span>
              </div>

              {/* Fee filter chips */}
              <div className="flex items-center space-x-1.5 text-xs">
                {[
                  { key: 'all', label: 'All Fees' },
                  { key: 'ltf', label: '100% Free' },
                  { key: 'under1500', label: '≤ ₹1,500' },
                  { key: 'premium', label: 'Premium' }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFeeFilter(f.key as any)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] transition-colors border ${
                      feeFilter === f.key
                        ? 'bg-slate-800 text-white border-slate-600 font-medium'
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {recommendedNewCards.length > 0 ? (
              <div className="space-y-4">
                {recommendedNewCards.map(({ card, matchedInterests, bankAdvantage }) => {
                  const isCompared = comparedCardIds.includes(card.id);

                  return (
                    <div
                      key={card.id}
                      className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all p-5 sm:p-6 space-y-4 shadow-sm"
                    >
                      {/* Header: Bank & Card Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                              {card.bank} · {card.network}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                              card.ltfStatus === 'LTF'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}>
                              {card.ltfStatus === 'LTF' ? 'Lifetime Free' : `₹${card.annualFee.toLocaleString('en-IN')}/yr`}
                            </span>
                          </div>
                          <h3
                            onClick={() => onSelectCard(card)}
                            className="text-lg font-semibold text-white hover:text-amber-400 cursor-pointer transition-colors mt-0.5"
                          >
                            {card.name}
                          </h3>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center space-x-2 self-start sm:self-auto">
                          <button
                            onClick={() => onToggleCompare(card)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
                              isCompared
                                ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold'
                                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            {isCompared ? 'In Comparison' : '+ Compare'}
                          </button>

                          <button
                            onClick={() => onSelectCard(card)}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800 text-xs font-medium transition-colors"
                          >
                            View MITC
                          </button>
                        </div>
                      </div>

                      {/* Superpower Highlight */}
                      <div className="text-xs text-slate-300 leading-relaxed font-sans">
                        <strong className="text-amber-400 font-medium">Core Value Proposition: </strong>
                        {card.standoutFeature || card.highlight}
                      </div>

                      {/* 3 Metric Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">Reward Engine</span>
                          <span className="font-medium text-slate-200 mt-0.5 block truncate">
                            {card.rewards.onlineShoppingPercent 
                              ? `${card.rewards.onlineShoppingPercent}% Online` 
                              : `${card.rewards.basePercent}% Base`}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">Lounge Privileges</span>
                          <span className="font-medium text-slate-200 mt-0.5 block truncate">
                            {card.perks.domesticLoungesPerQuarter ? `${card.perks.domesticLoungesPerQuarter} Dom/qtr` : 'No Lounges'}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">Fee Waiver Target</span>
                          <span className="font-medium text-slate-200 mt-0.5 block truncate">
                            {card.ltfPathways.spendWaiverAmount 
                              ? `₹${(card.ltfPathways.spendWaiverAmount / 100000).toFixed(1)}L / year`
                              : card.ltfStatus === 'LTF' ? 'No Waiver Needed (Free)' : 'No spend waiver'}
                          </span>
                        </div>
                      </div>

                      {/* Synergy with User's Bank Account */}
                      {bankAdvantage && (
                        <div className="flex items-center space-x-2 text-xs px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{bankAdvantage}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <p className="text-xs text-slate-400">
                  No cards matched the currently selected fee filter. Switch to &ldquo;All Fees&rdquo; to view recommendations.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
