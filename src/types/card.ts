export type CardNetwork = 'Visa' | 'Mastercard' | 'RuPay' | 'American Express' | 'Diners Club';

export type CardCategory = 
  | 'Travel'
  | 'Fuel'
  | 'Shopping'
  | 'Dining'
  | 'Cashback'
  | 'RuPay UPI'
  | 'Premium / Luxury'
  | 'Zero Forex';

export type CardTier = 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';

export type LtfType = 
  | 'Inherently LTF' // Completely free forever with no condition
  | 'Spend Waiver'   // Free if spend threshold achieved
  | 'Alumni Offer'   // LTF for graduates of elite colleges
  | 'Salary / Corporate' // LTF with company salary account / bank relationship
  | 'Conditional Promo'; // LTF via special seasonal or app promo

export interface LtfPathways {
  isInherentlyLtf: boolean;
  spendWaiverAmount?: number; // annual spend to waive fee
  alumniEligible?: boolean;
  alumniColleges?: string[];
  salaryTierRequired?: 'Super A' | 'Tier A' | 'Tier B' | 'Wealth Account';
  retentionTips?: string;
  notes?: string;
}

export interface CardPerks {
  domesticLoungesPerQuarter?: number | 'Unlimited';
  internationalLoungesPerYear?: number | 'Unlimited';
  loungeSpendRequirement?: string; // e.g., "Rs. 5,000 spend in previous month"
  forexMarkupPercent: number; // e.g., 3.5, 2.0, 0.99, 0.0
  fuelSurchargeWaiver: boolean;
  bogoMovies?: boolean;
  golfRoundsPerYear?: number | 'Unlimited';
}

export interface RewardRateStructure {
  basePercent: number; // general spends return %
  travelPercent?: number; // flights, hotels, portals
  fuelPercent?: number; // fuel return %
  onlineShoppingPercent?: number; // Amazon, Flipkart, etc.
  diningPercent?: number; // dining & food delivery
  groceryPercent?: number; // supermarkets, instant delivery
  utilityPercent?: number; // electricity, phone, gas
  upiPercent?: number; // RuPay UPI scan and pay
  rewardPointValueInRupees?: number; // 1 RP = Rs. 0.20, 0.50, 1.00
  monthlyCashbackCap?: number; // Rs max cashback per month
}

export interface MilestoneBenefit {
  spendAmount: number;
  rewardDescription: string;
  estimatedValueInRupees: number;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  tier?: CardTier;
  imageUrl?: string;
  network: CardNetwork;
  primaryCategory: CardCategory;
  categories: CardCategory[];
  joiningFee: number;
  annualFee: number;
  
  // LTF Details
  ltfStatus: 'LTF' | 'LTF Available via Pathways' | 'Strictly Paid';
  ltfPathways: LtfPathways;

  // Benefits & Rewards
  perks: CardPerks;
  rewards: RewardRateStructure;
  milestones?: MilestoneBenefit[];
  welcomeOffer?: {
    description: string;
    estimatedValueInRupees: number;
  };

  // Eligibility & Target audience
  minAnnualIncome: number; // in Rupees
  idealSpendLevel: 'Low (< 15k/mo)' | 'Medium (15k-50k/mo)' | 'High (50k-1.5L/mo)' | 'Super High (> 1.5L/mo)';
  
  // Editorial analysis
  highlight: string;
  standoutFeature?: string; // What makes it stand out in 1-2 punchy sentences
  pros: string[];
  cons: string[];
  applyUrl?: string;

  // Synergy & Upgrade paths
  upgradeFromCardIds?: string[]; // e.g., ['hdfc-regalia-gold', 'hdfc-millennia']
  upgradeDetails?: string;
  bankSynergyNotes?: string;
}

export type BankAccountType = 
  | 'Salary Account' 
  | 'Savings Account' 
  | 'Wealth / Priority Account' 
  | 'Current Account';

export interface UserBankAccount {
  bank: string; // e.g. 'HDFC Bank', 'State Bank of India (SBI)', 'ICICI Bank', 'Axis Bank'
  accountType: BankAccountType;
}

export interface UserSpendProfile {
  monthlyTravel: number; // Flights & Hotels
  monthlyFuel: number;
  monthlyOnlineShopping: number; // Amazon, Flipkart, etc.
  monthlyDining: number; // Swiggy, Zomato, Restaurants
  monthlyGroceries: number; // Instamart, Blinkit, Supermarkets
  monthlyUtilities: number; // Bills, Mobile, DTH
  monthlyUpi: number; // UPI Scan & Pay
  monthlyOfflineOther: number; // General POS spends
  
  // Preferences
  prefersLtfOnly: boolean;
  primaryPreference: 'Maximum Cashback' | 'Travel & Lounges' | 'Fuel Savings' | 'RuPay UPI' | 'All-Rounder' | 'Zero Forex';
  travelLoungeVisitsPerYear: number;
  internationalTravelPerYear: number;
  userAnnualIncome: number;
  alumniInstitute?: string;
  salaryBank?: string;

  // Bank Relationship & Existing Cards
  bankAccounts: UserBankAccount[];
  existingCardIds: string[];
}

export interface CardRecommendationResult {
  card: CreditCard;
  annualSpend: number;
  grossAnnualRewards: number;
  categoryBreakdown: {
    travel: number;
    fuel: number;
    onlineShopping: number;
    dining: number;
    groceries: number;
    utilities: number;
    upi: number;
    offline: number;
  };
  milestoneBonusValue: number;
  loungeValue: number;
  welcomeBonusValue: number;
  feeWaived: boolean;
  effectiveAnnualFee: number;
  netAnnualValue: number; // Gross rewards + Perks - Effective Fee
  netRoiPercent: number; // (Net Annual Value / Annual Spend) * 100
  ltfStatusForUser: 'Free Forever (LTF)' | 'Fee Waived via Spends' | 'Alumni LTF Eligible' | 'Salary Account LTF Eligible' | 'Paid (Fee Deducted)';
  fitReasons: string[];
  cautions: string[];
  
  // Bank Relationship & Portfolio Synergy
  relationshipSynergies: string[];
  existingCardSynergies: string[];
  isUpgradePath: boolean;
  upgradeDetails?: string;
  isExistingCard: boolean;
}

