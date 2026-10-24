export interface UpgradeRecommendation {
  existingCardName: string;
  bank: string;
  isDecommissioned?: boolean;
  decommissionedNote?: string;
  recommendedCardId: string;
  recommendedCardName: string;
  recommendedCardBank: string;
  whyUpgrade: string;
  upgradeRequirement: string;
}

export const KNOWN_UPGRADES: Record<string, UpgradeRecommendation[]> = {
  // HDFC BANK
  'hdfc-regalia-first': [
    {
      existingCardName: 'HDFC Regalia First',
      bank: 'HDFC Bank',
      isDecommissioned: true,
      decommissionedNote: 'HDFC Regalia First is officially delisted & decommissioned. It has low reward rates and outdated lounge rules.',
      recommendedCardId: 'hdfc-regalia-gold',
      recommendedCardName: 'HDFC Bank Regalia Gold',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'Direct modern successor with 12 domestic airport lounges, 6 international Priority Pass visits, and ₹1,500 quarterly milestone vouchers.',
      upgradeRequirement: 'Request upgrade via NetBanking or your HDFC Relationship Manager (minimum ₹1L/month salary or ₹3L existing credit limit).'
    },
    {
      existingCardName: 'HDFC Regalia First',
      bank: 'HDFC Bank',
      isDecommissioned: true,
      decommissionedNote: 'HDFC Regalia First is officially delisted & decommissioned.',
      recommendedCardId: 'hdfc-millennia',
      recommendedCardName: 'HDFC Bank Millennia',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'If your priority is online shopping and food delivery, Millennia gives flat 5% cashback on Amazon, Flipkart, Swiggy, and Zomato.',
      upgradeRequirement: 'Available pre-approved for HDFC account holders or via HDFC MyCards portal.'
    }
  ],
  'hdfc-regalia-gold': [
    {
      existingCardName: 'HDFC Regalia Gold',
      bank: 'HDFC Bank',
      recommendedCardId: 'hdfc-infinia-metal',
      recommendedCardName: 'HDFC Bank Infinia Metal Edition',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'The holy grail of Indian credit cards. Jumps reward returns to 33.3% on flights and hotels via SmartBuy, unlimited global airport lounge access for primary & add-on members with zero spend conditions.',
      upgradeRequirement: 'Requires minimum ₹8-10 Lakhs annual spend on Regalia Gold, existing credit limit of ₹8 Lakhs+, and net monthly salary > ₹2.75 Lakhs.'
    },
    {
      existingCardName: 'HDFC Regalia Gold',
      bank: 'HDFC Bank',
      recommendedCardId: 'tata-neu-infinity',
      recommendedCardName: 'Tata Neu Infinity HDFC Bank (RuPay)',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'Regalia Gold lacks UPI rewards. Add Tata Neu Infinity as a complementary float card to earn 1.5% back on all UPI QR payments and 10% on Tata brands.',
      upgradeRequirement: 'Instant floater card sharing your existing Regalia Gold credit limit via Tata Neu app.'
    }
  ],
  'hdfc-millennia': [
    {
      existingCardName: 'HDFC Millennia',
      bank: 'HDFC Bank',
      recommendedCardId: 'hdfc-regalia-gold',
      recommendedCardName: 'HDFC Bank Regalia Gold',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'Millennia caps cashback at ₹1,000/month and requires ₹1L quarterly spend for lounge access. Regalia Gold provides higher credit limits and 12 guaranteed lounge visits.',
      upgradeRequirement: 'Upgrade via NetBanking when credit limit reaches ₹3 Lakhs.'
    }
  ],
  'hdfc-moneyback-plus': [
    {
      existingCardName: 'HDFC MoneyBack+',
      bank: 'HDFC Bank',
      recommendedCardId: 'hdfc-millennia',
      recommendedCardName: 'HDFC Bank Millennia',
      recommendedCardBank: 'HDFC Bank',
      whyUpgrade: 'MoneyBack+ gives only 3.3% return with low reward value. Millennia upgrades you to flat 5% direct cashback on Amazon, Flipkart, and Swiggy.',
      upgradeRequirement: 'Check HDFC MyCards portal for pre-approved limit increase and upgrade.'
    }
  ],

  // ICICI BANK
  'icici-coral': [
    {
      existingCardName: 'ICICI Bank Coral / Coral RuPay',
      bank: 'ICICI Bank',
      recommendedCardId: 'icici-sapphiro',
      recommendedCardName: 'ICICI Bank Sapphiro',
      recommendedCardBank: 'ICICI Bank',
      whyUpgrade: 'Coral offers minimal rewards and restrictive lounge spend rules. Sapphiro provides Buy 1 Get 1 free movie tickets up to ₹500 twice a month, DreamFolks DragonPass, and is widely available Lifetime Free under the ICICI Alumni Program.',
      upgradeRequirement: 'Apply via ICICI Alumni Program (if graduate of tier-1 institute) or through iMobile pre-approved offers.'
    },
    {
      existingCardName: 'ICICI Bank Coral / Coral RuPay',
      bank: 'ICICI Bank',
      recommendedCardId: 'amazon-pay-icici',
      recommendedCardName: 'Amazon Pay ICICI Credit Card',
      recommendedCardBank: 'ICICI Bank',
      whyUpgrade: 'Lifetime Free forever with unlimited 5% cashback on Amazon shopping and 2% on bill payments, with zero annual maintenance fees.',
      upgradeRequirement: 'Instant approval via Amazon app for existing ICICI cardholders.'
    }
  ],
  'icici-platinum-chip': [
    {
      existingCardName: 'ICICI Bank Platinum Chip',
      bank: 'ICICI Bank',
      recommendedCardId: 'amazon-pay-icici',
      recommendedCardName: 'Amazon Pay ICICI Credit Card',
      recommendedCardBank: 'ICICI Bank',
      whyUpgrade: 'Platinum Chip earns negligible ~0.5% return. Amazon Pay ICICI is also Lifetime Free but provides 5% cashback on Amazon and 2% on bills.',
      upgradeRequirement: 'Apply directly via Amazon Pay dashboard.'
    }
  ],

  // AXIS BANK
  'axis-my-zone': [
    {
      existingCardName: 'Axis Bank My Zone',
      bank: 'Axis Bank',
      recommendedCardId: 'airtel-axis',
      recommendedCardName: 'Airtel Axis Bank Credit Card',
      recommendedCardBank: 'Axis Bank',
      whyUpgrade: 'Airtel Axis delivers 25% cashback on Airtel mobile/broadband recharges, 10% on utility bills, and 10% on Swiggy/Zomato, generating ₹6,000+ net savings annually.',
      upgradeRequirement: 'Apply via Airtel Thanks app or Axis Bank portal.'
    },
    {
      existingCardName: 'Axis Bank My Zone',
      bank: 'Axis Bank',
      recommendedCardId: 'axis-atlas',
      recommendedCardName: 'Axis Bank Atlas',
      recommendedCardBank: 'Axis Bank',
      whyUpgrade: 'If your annual spends exceed ₹3 Lakhs, Atlas gives ~10% return on airline tickets and hotel bookings, making it India’s premier mid-tier travel card.',
      upgradeRequirement: 'Available for cardholders with existing Axis limit > ₹2.5 Lakhs.'
    }
  ],
  'axis-neo': [
    {
      existingCardName: 'Axis Bank Neo',
      bank: 'Axis Bank',
      recommendedCardId: 'axis-ace',
      recommendedCardName: 'Axis Bank ACE',
      recommendedCardBank: 'Axis Bank',
      whyUpgrade: 'Upgrade to flat 5% cashback on utility bills via Google Pay and 1.5% unlimited offline cashback.',
      upgradeRequirement: 'Check Google Pay or Axis Mobile app for upgrade.'
    }
  ],

  // SBI CARD
  'sbi-simplyclick': [
    {
      existingCardName: 'SimplyCLICK SBI Card',
      bank: 'SBI Card',
      recommendedCardId: 'sbi-cashback',
      recommendedCardName: 'Cashback SBI Card',
      recommendedCardBank: 'SBI Card',
      whyUpgrade: 'SimplyCLICK restricts accelerated points to partner merchants. Cashback SBI gives 5% flat unlimited cashback on ALL online shopping portals up to ₹5,000/month.',
      upgradeRequirement: 'Apply via SBI Card portal or convert existing card limit.'
    }
  ],
  'sbi-simplysave': [
    {
      existingCardName: 'SimplySAVE SBI Card',
      bank: 'SBI Card',
      recommendedCardId: 'sbi-cashback',
      recommendedCardName: 'Cashback SBI Card',
      recommendedCardBank: 'SBI Card',
      whyUpgrade: 'SimplySAVE provides only ~0.25% return on general spends. Cashback SBI increases your return to 5.0% on all online spends with zero category restrictions.',
      upgradeRequirement: 'Apply via sbicard.com.'
    }
  ],

  // LEGACY CITI CARDS
  'citi-premiermiles': [
    {
      existingCardName: 'Citi PremierMiles (Decommissioned)',
      bank: 'Citibank India / Axis Bank',
      isDecommissioned: true,
      decommissionedNote: 'Citi PremierMiles was sunsetted following the Axis Bank acquisition.',
      recommendedCardId: 'axis-horizon',
      recommendedCardName: 'Axis Bank Horizon Credit Card',
      recommendedCardBank: 'Axis Bank',
      whyUpgrade: 'Direct migration card preserving 1:1 airline miles transfer ratio and evergreen points validity.',
      upgradeRequirement: 'Automatic migration handled by Axis Bank.'
    }
  ]
};
