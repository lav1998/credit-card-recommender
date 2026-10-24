import { CreditCard, UserSpendProfile, CardRecommendationResult } from '../types/card';

// Helper to check if bank names match
function doesBankMatch(cardBank: string, targetBank: string): boolean {
  const cb = cardBank.toLowerCase();
  const tb = targetBank.toLowerCase();
  if (cb.includes(tb) || tb.includes(cb)) return true;
  if ((cb.includes('hdfc') && tb.includes('hdfc')) ||
      (cb.includes('sbi') && (tb.includes('sbi') || tb.includes('state bank'))) ||
      (cb.includes('icici') && tb.includes('icici')) ||
      (cb.includes('axis') && tb.includes('axis')) ||
      (cb.includes('idfc') && tb.includes('idfc')) ||
      (cb.includes('standard chartered') && tb.includes('scb')) ||
      (cb.includes('hsbc') && tb.includes('hsbc')) ||
      (cb.includes('indusind') && tb.includes('indusind')) ||
      (cb.includes('au small') && tb.includes('au'))) {
    return true;
  }
  return false;
}

export function calculateCardValue(
  card: CreditCard,
  profile: UserSpendProfile
): CardRecommendationResult {
  const annualTravel = profile.monthlyTravel * 12;
  const annualFuel = profile.monthlyFuel * 12;
  const annualOnline = profile.monthlyOnlineShopping * 12;
  const annualDining = profile.monthlyDining * 12;
  const annualGroceries = profile.monthlyGroceries * 12;
  const annualUtilities = profile.monthlyUtilities * 12;
  const annualUpi = profile.monthlyUpi * 12;
  const annualOffline = profile.monthlyOfflineOther * 12;

  const totalAnnualSpend =
    annualTravel +
    annualFuel +
    annualOnline +
    annualDining +
    annualGroceries +
    annualUtilities +
    annualUpi +
    annualOffline;

  // 1. Calculate Rewards per category
  const baseRate = card.rewards.basePercent / 100;
  
  // Travel rewards
  const travelRate = (card.rewards.travelPercent ? card.rewards.travelPercent / 100 : baseRate);
  const travelRewards = annualTravel * travelRate;

  // Fuel rewards (note: fuel surcharge waiver + accelerated points)
  let fuelRewards = 0;
  if (card.rewards.fuelPercent) {
    fuelRewards = annualFuel * (card.rewards.fuelPercent / 100);
  } else if (card.perks.fuelSurchargeWaiver && annualFuel > 0) {
    fuelRewards = Math.min(annualFuel * 0.01, 3000);
  } else {
    fuelRewards = annualFuel * baseRate;
  }

  // Online Shopping rewards
  const onlineRate = card.rewards.onlineShoppingPercent ? card.rewards.onlineShoppingPercent / 100 : baseRate;
  let onlineRewards = annualOnline * onlineRate;
  if (card.rewards.monthlyCashbackCap && card.primaryCategory === 'Cashback') {
    const annualCap = card.rewards.monthlyCashbackCap * 12;
    if (onlineRewards > annualCap) {
      onlineRewards = annualCap;
    }
  }

  // Dining rewards
  const diningRate = card.rewards.diningPercent ? card.rewards.diningPercent / 100 : baseRate;
  let diningRewards = annualDining * diningRate;

  // Groceries rewards
  const groceryRate = card.rewards.groceryPercent ? card.rewards.groceryPercent / 100 : baseRate;
  let groceryRewards = annualGroceries * groceryRate;

  // Utilities rewards
  const utilityRate = card.rewards.utilityPercent ? card.rewards.utilityPercent / 100 : baseRate;
  let utilityRewards = annualUtilities * utilityRate;

  // RuPay UPI rewards
  const upiRate = card.rewards.upiPercent ? card.rewards.upiPercent / 100 : (card.network === 'RuPay' ? baseRate : 0);
  let upiRewards = annualUpi * upiRate;

  // Offline / general rewards
  const offlineRewards = annualOffline * baseRate;

  const grossAnnualRewards = Math.round(
    travelRewards +
    fuelRewards +
    onlineRewards +
    diningRewards +
    groceryRewards +
    utilityRewards +
    upiRewards +
    offlineRewards
  );

  // 2. Milestone bonuses
  let milestoneBonusValue = 0;
  if (card.milestones && card.milestones.length > 0) {
    for (const milestone of card.milestones) {
      if (totalAnnualSpend >= milestone.spendAmount) {
        milestoneBonusValue += milestone.estimatedValueInRupees;
      }
    }
  }

  // 3. Lounge Valuation
  let loungeValue = 0;
  if (profile.travelLoungeVisitsPerYear > 0 && card.perks.domesticLoungesPerQuarter) {
    const maxDomesticAnnual =
      card.perks.domesticLoungesPerQuarter === 'Unlimited'
        ? 24
        : card.perks.domesticLoungesPerQuarter * 4;
    const utilizedDomestic = Math.min(profile.travelLoungeVisitsPerYear, maxDomesticAnnual);
    loungeValue += utilizedDomestic * 1000;
  }

  if (profile.internationalTravelPerYear > 0 && card.perks.internationalLoungesPerYear) {
    const maxIntlAnnual =
      card.perks.internationalLoungesPerYear === 'Unlimited'
        ? 12
        : card.perks.internationalLoungesPerYear;
    const utilizedIntl = Math.min(profile.internationalTravelPerYear, maxIntlAnnual);
    loungeValue += utilizedIntl * 2000;
  }

  // 4. Welcome Bonus (amortized over year 1)
  const welcomeBonusValue = card.welcomeOffer?.estimatedValueInRupees || 0;

  // 5. Bank Relationship Evaluation
  const relationshipSynergies: string[] = [];
  let salaryAccountMatch = false;
  let savingsAccountMatch = false;

  const userAccounts = profile.bankAccounts || [];
  for (const acc of userAccounts) {
    if (doesBankMatch(card.bank, acc.bank)) {
      if (acc.accountType === 'Salary Account') {
        salaryAccountMatch = true;
        relationshipSynergies.push(
          `Direct synergy with your ${acc.bank} Salary Account: High approval odds, pre-approved limit enhancements, and corporate tie-up eligibility.`
        );
      } else if (acc.accountType === 'Savings Account') {
        savingsAccountMatch = true;
        relationshipSynergies.push(
          `Backed by your ${acc.bank} Savings Account: Pre-approved offers via NetBanking/App with minimal documentation.`
        );
      } else if (acc.accountType === 'Wealth / Priority Account') {
        salaryAccountMatch = true;
        relationshipSynergies.push(
          `Privilege tier through your ${acc.bank} Wealth / Priority relationship: Eligible for premium card waivers and RM escalation.`
        );
      }
    }
  }

  // Fallback for legacy salaryBank string
  if (!salaryAccountMatch && profile.salaryBank && doesBankMatch(card.bank, profile.salaryBank)) {
    salaryAccountMatch = true;
  }

  // 6. Fee Waiver & LTF Evaluation
  let feeWaived = false;
  let ltfStatusForUser: CardRecommendationResult['ltfStatusForUser'] = 'Paid (Fee Deducted)';
  let effectiveAnnualFee = card.annualFee;

  if (card.ltfPathways.isInherentlyLtf) {
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Free Forever (LTF)';
  } else if (profile.alumniInstitute && card.ltfPathways.alumniEligible) {
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Alumni LTF Eligible';
  } else if (salaryAccountMatch && card.ltfPathways.salaryTierRequired) {
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Salary Account LTF Eligible';
  } else if (
    card.ltfPathways.spendWaiverAmount &&
    totalAnnualSpend >= card.ltfPathways.spendWaiverAmount
  ) {
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Fee Waived via Spends';
  }

  // 7. Net Annual Value & ROI Calculation
  const netAnnualValue = Math.round(
    grossAnnualRewards + milestoneBonusValue + loungeValue + welcomeBonusValue - effectiveAnnualFee
  );

  const netRoiPercent = totalAnnualSpend > 0
    ? Number(((netAnnualValue / totalAnnualSpend) * 100).toFixed(2))
    : 0;

  // 8. Existing Card Synergy & Upgrade Pathways
  const existingCardSynergies: string[] = [];
  let isUpgradePath = false;
  let upgradeDetails: string | undefined = undefined;
  const isExistingCard = (profile.existingCardIds || []).includes(card.id);

  const hasRegaliaGold = (profile.existingCardIds || []).includes('hdfc-regalia-gold');

  if (hasRegaliaGold) {
    if (card.id === 'hdfc-infinia-metal') {
      isUpgradePath = true;
      upgradeDetails =
        'Direct upgrade path from your Regalia Gold: Reach ₹7.5L+ credit limit on Regalia Gold and ₹7.5L+ spends in 6 months, then email priorityredressal.creditcards@hdfcbank.com with your HDFC Salary slips.';
      existingCardSynergies.push(
        'Ultimate upgrade from Regalia Gold: jumps rewards from 1.33% to 33.3% on SmartBuy and adds unlimited Priority Pass for add-ons.'
      );
    } else if (card.id === 'hdfc-dcb-metal') {
      isUpgradePath = true;
      upgradeDetails =
        'Upgrade path from Regalia Gold: Qualify with ₹5L+ limit on Regalia Gold or 100% LTF via the HDFC Alumni program (IIT/IIM/BITS/XLRI).';
      existingCardSynergies.push(
        'Substantial upgrade from Regalia Gold: same 33.3% SmartBuy travel power as Infinia with lower fee waiver threshold.'
      );
    } else if (card.id === 'sbi-cashback') {
      existingCardSynergies.push(
        'Fills Regalia Gold\'s biggest weakness: gives flat 5% monthly statement cashback on online shopping (where Regalia Gold gives only ~1.33%).'
      );
      if (savingsAccountMatch) {
        existingCardSynergies.push('Fast-track approval via your existing SBI Savings Account.');
      }
    } else if (card.id === 'tata-neu-infinity') {
      existingCardSynergies.push(
        'RuPay UPI powerhouse: links to UPI QR codes for 1.5% cashback (which Regalia Gold on Visa/Mastercard cannot do).'
      );
      existingCardSynergies.push(
        'As an existing HDFC customer with a salary account, you can request this as a shared-limit virtual floater card with zero additional CIBIL hit!'
      );
    } else if (card.id === 'swiggy-hdfc') {
      existingCardSynergies.push(
        '10% direct statement cashback on Swiggy & Instamart + 5% on top ecommerce apps. Can be issued as a companion floater card with HDFC.'
      );
    } else if (card.id === 'airtel-axis') {
      existingCardSynergies.push(
        'Complements Regalia Gold with 25% cashback on electricity/Wi-Fi/mobile recharge and 10% on Zomato/Swiggy/BigBasket.'
      );
    } else if (card.id === 'hsbc-live-plus') {
      existingCardSynergies.push(
        'Provides 10% flat cashback on offline dining and all grocery stores where Regalia Gold returns standard 1.33%.'
      );
    } else if (card.id === 'amazon-pay-icici') {
      existingCardSynergies.push(
        'True Lifetime Free companion for uncapped 5% Amazon shopping without paying any annual renewal fee.'
      );
    }
  }

  // 9. Dynamic Fit Reasons & Caution Flags
  const fitReasons: string[] = [];
  const cautions: string[] = [];

  if (feeWaived) {
    if (ltfStatusForUser === 'Free Forever (LTF)') {
      fitReasons.push('100% Lifetime Free card: zero joining and annual fees forever');
    } else if (ltfStatusForUser === 'Alumni LTF Eligible') {
      fitReasons.push(`Eligible for 100% LTF upgrade through your alumni status (${profile.alumniInstitute})`);
    } else if (ltfStatusForUser === 'Fee Waived via Spends') {
      fitReasons.push(`Your planned annual spend of ₹${totalAnnualSpend.toLocaleString('en-IN')} surpasses the ₹${card.ltfPathways.spendWaiverAmount?.toLocaleString('en-IN')} waiver threshold, making the card 100% free`);
    } else if (ltfStatusForUser === 'Salary Account LTF Eligible') {
      fitReasons.push(`You hold your salary account with ${card.bank}, unlocking corporate LTF eligibility`);
    }
  } else if (card.ltfPathways.spendWaiverAmount) {
    const deficit = card.ltfPathways.spendWaiverAmount - totalAnnualSpend;
    if (deficit > 0) {
      cautions.push(`Annual fee ₹${card.annualFee.toLocaleString('en-IN')} applies; spending ₹${deficit.toLocaleString('en-IN')} more will waive the fee`);
    }
  }

  if (card.rewards.onlineShoppingPercent && card.rewards.onlineShoppingPercent >= 5 && annualOnline > 0) {
    fitReasons.push(`High ${card.rewards.onlineShoppingPercent}% return on online shopping saves you ₹${Math.round(onlineRewards).toLocaleString('en-IN')} annually`);
  }

  if (card.rewards.travelPercent && card.rewards.travelPercent >= 5 && annualTravel > 0) {
    fitReasons.push(`Accelerated ${card.rewards.travelPercent}% return on flights and hotel bookings yields ₹${Math.round(travelRewards).toLocaleString('en-IN')}`);
  }

  if (card.rewards.fuelPercent && card.rewards.fuelPercent >= 4 && annualFuel > 0) {
    fitReasons.push(`Massive ${card.rewards.fuelPercent}% value back on fuel saves you ₹${Math.round(fuelRewards).toLocaleString('en-IN')} each year`);
  }

  if (card.rewards.upiPercent && card.rewards.upiPercent > 1 && annualUpi > 0) {
    fitReasons.push(`Earns ${card.rewards.upiPercent}% cashback on everyday RuPay UPI QR scans`);
  }

  if (loungeValue > 0) {
    fitReasons.push(`Complimentary airport lounge access saves ₹${loungeValue.toLocaleString('en-IN')} based on your travel habits`);
  }

  if (milestoneBonusValue > 0) {
    fitReasons.push(`Unlocked milestone rewards worth ₹${milestoneBonusValue.toLocaleString('en-IN')} at your spend level`);
  }

  if (card.perks.forexMarkupPercent === 0 && profile.internationalTravelPerYear > 0) {
    fitReasons.push('0% Forex markup saves you standard 3.5% foreign currency bank fees abroad');
  }

  // Cautions
  if (profile.userAnnualIncome < card.minAnnualIncome) {
    cautions.push(`Card officially requires annual income of ₹${(card.minAnnualIncome / 100000).toFixed(1)}L (higher than your current profile)`);
  }

  if (card.rewards.monthlyCashbackCap && (onlineRewards >= (card.rewards.monthlyCashbackCap * 12))) {
    cautions.push(`Your high online spends hit the monthly reward cap of ₹${card.rewards.monthlyCashbackCap.toLocaleString('en-IN')}`);
  }

  return {
    card,
    annualSpend: totalAnnualSpend,
    grossAnnualRewards,
    categoryBreakdown: {
      travel: Math.round(travelRewards),
      fuel: Math.round(fuelRewards),
      onlineShopping: Math.round(onlineRewards),
      dining: Math.round(diningRewards),
      groceries: Math.round(groceryRewards),
      utilities: Math.round(utilityRewards),
      upi: Math.round(upiRewards),
      offline: Math.round(offlineRewards),
    },
    milestoneBonusValue,
    loungeValue,
    welcomeBonusValue,
    feeWaived,
    effectiveAnnualFee,
    netAnnualValue,
    netRoiPercent,
    ltfStatusForUser,
    fitReasons,
    cautions,
    relationshipSynergies,
    existingCardSynergies,
    isUpgradePath,
    upgradeDetails,
    isExistingCard,
  };
}

export function rankCardsForUser(
  cards: CreditCard[],
  profile: UserSpendProfile
): CardRecommendationResult[] {
  let filtered = [...cards];

  // If user strictly requested LTF only
  if (profile.prefersLtfOnly) {
    filtered = filtered.filter((c) => {
      const isBankSalaryMatch = (profile.bankAccounts || []).some(
        (a) => a.accountType === 'Salary Account' && doesBankMatch(c.bank, a.bank)
      );
      const isLegacySalaryMatch = profile.salaryBank && doesBankMatch(c.bank, profile.salaryBank);
      
      const totalSpend =
        (profile.monthlyTravel +
          profile.monthlyFuel +
          profile.monthlyOnlineShopping +
          profile.monthlyDining +
          profile.monthlyGroceries +
          profile.monthlyUtilities +
          profile.monthlyUpi +
          profile.monthlyOfflineOther) *
        12;

      return (
        c.ltfPathways.isInherentlyLtf ||
        (profile.alumniInstitute && c.ltfPathways.alumniEligible) ||
        ((isBankSalaryMatch || isLegacySalaryMatch) && c.ltfPathways.salaryTierRequired) ||
        (c.ltfPathways.spendWaiverAmount && totalSpend >= c.ltfPathways.spendWaiverAmount)
      );
    });
  }

  // Calculate scores for all cards
  const results = filtered.map((c) => calculateCardValue(c, profile));

  // Sort primarily by Net Annual Value descending, but give slight boost to high-synergy / non-redundant cards
  results.sort((a, b) => {
    // If one is already owned, put it slightly lower so new recommendations take priority unless user explicitly checks it
    if (a.isExistingCard && !b.isExistingCard) return 1;
    if (!a.isExistingCard && b.isExistingCard) return -1;

    // Upgrades or high synergies get elevated
    const aBonus = (a.relationshipSynergies.length > 0 ? 500 : 0) + (a.isUpgradePath ? 1000 : 0);
    const bBonus = (b.relationshipSynergies.length > 0 ? 500 : 0) + (b.isUpgradePath ? 1000 : 0);

    return (b.netAnnualValue + bBonus) - (a.netAnnualValue + aBonus);
  });

  return results;
}

