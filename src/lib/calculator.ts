import { CreditCard, UserSpendProfile, CardRecommendationResult } from '../types/card';

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
    // Standard 1% fuel surcharge waiver up to Rs. 250/mo = Rs 3000/yr
    fuelRewards = Math.min(annualFuel * 0.01, 3000);
  } else {
    fuelRewards = annualFuel * baseRate;
  }

  // Online Shopping rewards
  const onlineRate = card.rewards.onlineShoppingPercent ? card.rewards.onlineShoppingPercent / 100 : baseRate;
  let onlineRewards = annualOnline * onlineRate;
  if (card.rewards.monthlyCashbackCap && card.primaryCategory === 'Cashback') {
    // If there's a monthly cashback cap (e.g. SBI Cashback Rs. 5000/mo, Swiggy Rs. 1500/mo)
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
  const upiRewards = annualUpi * upiRate;

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
  // Estimated economic value: Domestic lounge = Rs. 1,000, International = Rs. 2,000
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

  // 5. Fee Waiver & LTF Evaluation
  let feeWaived = false;
  let ltfStatusForUser: CardRecommendationResult['ltfStatusForUser'] = 'Paid (Fee Deducted)';
  let effectiveAnnualFee = card.annualFee;

  if (card.ltfPathways.isInherentlyLtf) {
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Free Forever (LTF)';
  } else if (
    profile.alumniInstitute &&
    card.ltfPathways.alumniEligible
  ) {
    // User is alumnus of an eligible institution
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Alumni LTF Eligible';
  } else if (
    profile.salaryBank &&
    card.bank.toLowerCase().includes(profile.salaryBank.toLowerCase()) &&
    card.ltfPathways.salaryTierRequired
  ) {
    // User's salary account is with the card issuing bank
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Salary Account LTF Eligible';
  } else if (
    card.ltfPathways.spendWaiverAmount &&
    totalAnnualSpend >= card.ltfPathways.spendWaiverAmount
  ) {
    // Met the annual spend waiver threshold
    feeWaived = true;
    effectiveAnnualFee = 0;
    ltfStatusForUser = 'Fee Waived via Spends';
  }

  // 6. Net Annual Value & ROI Calculation
  const netAnnualValue = Math.round(
    grossAnnualRewards + milestoneBonusValue + loungeValue + welcomeBonusValue - effectiveAnnualFee
  );

  const netRoiPercent = totalAnnualSpend > 0
    ? Number(((netAnnualValue / totalAnnualSpend) * 100).toFixed(2))
    : 0;

  // 7. Dynamic Fit Reasons & Caution Flags
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
    cautions.push(`Annual fee ₹${card.annualFee.toLocaleString('en-IN')} applies; spending ₹${deficit.toLocaleString('en-IN')} more will waive the fee`);
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
  };
}

export function rankCardsForUser(
  cards: CreditCard[],
  profile: UserSpendProfile
): CardRecommendationResult[] {
  let filtered = [...cards];

  // If user strictly requested LTF only
  if (profile.prefersLtfOnly) {
    filtered = filtered.filter(
      (c) =>
        c.ltfPathways.isInherentlyLtf ||
        (profile.alumniInstitute && c.ltfPathways.alumniEligible) ||
        (profile.salaryBank && c.bank.toLowerCase().includes(profile.salaryBank.toLowerCase()) && c.ltfPathways.salaryTierRequired) ||
        (c.ltfPathways.spendWaiverAmount &&
          (profile.monthlyTravel +
            profile.monthlyFuel +
            profile.monthlyOnlineShopping +
            profile.monthlyDining +
            profile.monthlyGroceries +
            profile.monthlyUtilities +
            profile.monthlyUpi +
            profile.monthlyOfflineOther) *
            12 >=
            c.ltfPathways.spendWaiverAmount)
    );
  }

  // Calculate scores for all cards
  const results = filtered.map((c) => calculateCardValue(c, profile));

  // Sort primarily by Net Annual Value descending
  results.sort((a, b) => b.netAnnualValue - a.netAnnualValue);

  return results;
}
