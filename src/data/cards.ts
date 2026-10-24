import { CreditCard } from '../types/card';

export const CREDIT_CARDS: CreditCard[] = [
  // --- INHERENTLY LIFETIME FREE CARDS ---
  {
    id: 'amazon-pay-icici',
    name: 'Amazon Pay ICICI Credit Card',
    bank: 'ICICI Bank',
    network: 'Visa',
    primaryCategory: 'Cashback',
    categories: ['Cashback', 'Shopping'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: '100% Lifetime Free with no joining or annual fees for all approved applicants.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      onlineShoppingPercent: 5.0, // 5% for Prime, 3% for Non-Prime
      diningPercent: 1.0,
      utilityPercent: 2.0, // via Amazon Pay recharge & bill payments
      rewardPointValueInRupees: 1.0, // 1 reward point = 1 Rupee directly credited to Amazon Pay Balance
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: '5% unlimited direct cashback on Amazon for Prime members with zero annual fee forever.',
    pros: [
      'Truly Lifetime Free (no annual fee, no minimum spend conditions)',
      'Unlimited 5% cashback on Amazon shopping (for Prime members)',
      '2% cashback on 100+ Amazon Pay partner merchants (Swiggy, Uber, BookMyShow, etc.)',
      'Direct monthly cashback credited as Amazon Pay Balance (no redemption fees or expiry)',
    ],
    cons: [
      'No airport lounge access',
      'Standard 3.5% forex markup fee',
      'Offline general spend return is standard 1%',
    ],
    welcomeOffer: {
      description: 'Up to Rs. 2,000 in Amazon Pay cashback coupons on first transaction & Prime activation',
      estimatedValueInRupees: 1500,
    },
  },
  {
    id: 'scapia-federal',
    name: 'Scapia Federal Credit Card',
    bank: 'Federal Bank',
    network: 'Visa',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Zero Forex', 'Cashback'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Lifetime Free by default with no hidden maintenance fees.',
    },
    perks: {
      domesticLoungesPerQuarter: 'Unlimited',
      loungeSpendRequirement: 'Requires minimum Rs. 5,000 spend in the previous billing cycle for lounge access',
      internationalLoungesPerYear: 0,
      forexMarkupPercent: 0.0, // Zero forex markup
      fuelSurchargeWaiver: false,
    },
    rewards: {
      basePercent: 2.0, // 10% Scapia coins = 2% travel redemption
      travelPercent: 4.0, // 20% Scapia coins on flights & hotels booked on Scapia app
      rewardPointValueInRupees: 0.20,
    },
    minAnnualIncome: 360000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'Zero Forex markup credit card with domestic lounge access and zero annual fee.',
    pros: [
      'Zero forex markup on all international online and physical POS spends',
      'Unlimited domestic airport lounge access with a low threshold of just Rs. 5,000 spend/mo',
      'Truly Lifetime Free with instant virtual card approval via app',
      'Scapia coins redeemable directly for flights and hotel bookings at 100% value',
    ],
    cons: [
      'Federal Bank strict cooldown / approval rules if already holding other Federal cards',
      'Coins are only redeemable on the Scapia travel portal',
      'No international airport lounge access',
    ],
  },
  {
    id: 'idfc-first-wealth',
    name: 'IDFC FIRST Wealth Credit Card',
    bank: 'IDFC FIRST Bank',
    network: 'Visa',
    primaryCategory: 'Premium / Luxury',
    categories: ['Premium / Luxury', 'Travel', 'Dining'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Inherently Lifetime Free super-premium card for high earners or existing Wealth savings account holders.',
    },
    perks: {
      domesticLoungesPerQuarter: 4,
      internationalLoungesPerYear: 4,
      loungeSpendRequirement: 'Requires Rs. 20,000 monthly spend in previous billing cycle',
      forexMarkupPercent: 1.5,
      fuelSurchargeWaiver: true,
      bogoMovies: true, // Buy 1 Get 1 up to Rs. 500 on Paytm Movies twice a month
      golfRoundsPerYear: 8,
    },
    rewards: {
      basePercent: 0.75, // 3x points on offline spends
      onlineShoppingPercent: 1.5, // 6x points on online spends
      rewardPointValueInRupees: 0.25,
      // 10x points (2.5% return) on spends above Rs. 30,000/month or on birthday
    },
    minAnnualIncome: 3600000,
    idealSpendLevel: 'High (50k-1.5L/mo)',
    highlight: 'Lifetime Free luxury card with free domestic & international lounges, golf, and 1.5% low forex markup.',
    pros: [
      '100% Lifetime Free luxury card with zero joining and annual fees',
      '4 complimentary domestic and 4 international airport lounges + airport spa visits per quarter',
      'Low 1.5% forex markup fee for international travelers',
      'BOGO movie ticket discount up to Rs. 500 twice a month via Paytm Movies',
      'Reward points never expire and zero redemption fees',
    ],
    cons: [
      'High income requirement (Rs. 36 Lakhs ITR or IDFC Wealth relationship)',
      'Base reward rate under Rs. 30,000 spend is modest (0.75% offline)',
      'Recent spend criteria introduced to unlock lounge access',
    ],
  },
  {
    id: 'idfc-first-select',
    name: 'IDFC FIRST Select Credit Card',
    bank: 'IDFC FIRST Bank',
    network: 'Visa',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Cashback'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Truly Lifetime Free with zero annual fees forever.',
    },
    perks: {
      domesticLoungesPerQuarter: 2,
      loungeSpendRequirement: 'Requires Rs. 20,000 spend in preceding billing month',
      internationalLoungesPerYear: 0,
      forexMarkupPercent: 1.99,
      fuelSurchargeWaiver: true,
      bogoMovies: true, // Up to Rs. 250 twice a month
    },
    rewards: {
      basePercent: 0.75,
      onlineShoppingPercent: 1.5,
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 1200000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'Lifetime Free card with domestic airport and railway lounge access, BOGO movies, and low 1.99% forex.',
    pros: [
      'Zero annual fee, zero joining fee for life',
      '2 free domestic airport lounges per quarter and 4 railway lounge visits per quarter',
      'BOGO movie tickets up to Rs. 250 on Paytm Movies twice a month',
      'Low forex markup of 1.99% compared to typical 3.5% bank cards',
      'Points never expire',
    ],
    cons: [
      'Rs. 20k spend per month needed to unlock next month lounge visits',
      'Modest base rewards on non-milestone spends',
    ],
  },
  {
    id: 'onecard-metal',
    name: 'OneCard Metal Credit Card',
    bank: 'Federal / SBM / South Indian / BoB Financial',
    network: 'Visa',
    primaryCategory: 'Cashback',
    categories: ['Cashback', 'Shopping'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Lifetime Free metal card with no joining or annual fee.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 1.0, // Low 1% forex
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 0.2,
      onlineShoppingPercent: 1.0, // 5x on top 2 spend categories every month
      rewardPointValueInRupees: 0.10,
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: 'Sleek metal credit card with 1% low forex markup and 5x rewards on top categories.',
    pros: [
      'Completely Lifetime Free metal credit card',
      'Fractional rewards on every single rupee spent',
      '5X rewards automatically applied to your top 2 spending categories each month',
      'Low 1% forex markup on international purchases',
      'App offers "Around You" hyper-local offers with up to 10-20% valueback',
    ],
    cons: [
      'Base reward rate is relatively low (0.2%)',
      'No airport lounge access included',
    ],
  },
  {
    id: 'kiwi-axis-rupay',
    name: 'Kiwi Axis Bank RuPay Credit Card',
    bank: 'Axis Bank',
    network: 'RuPay',
    primaryCategory: 'RuPay UPI',
    categories: ['RuPay UPI', 'Cashback'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Virtual RuPay card issue is 100% Lifetime Free via the Kiwi App.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: false,
    },
    rewards: {
      basePercent: 0.5,
      upiPercent: 2.0, // Flat 1-2% cashback as "Kiwi Kwiks" on merchant UPI scan and pay
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: 'Best dedicated RuPay credit card on UPI with up to 2% flat cashback on everyday QR scans.',
    pros: [
      'Lifetime Free virtual credit card',
      'Seamless UPI payments directly through Kiwi app or BHIM',
      'Up to 2% real cashback credited directly to bank account on UPI merchant spends',
      'Fast 100% digital KYC approval process',
    ],
    cons: [
      'Only merchant UPI transactions earn accelerated rewards (P2P / friend transfers do not count)',
      'No airport lounge access or travel perks',
    ],
  },

  // --- CASHBACK & SHOPPING HEAVYWEIGHTS ---
  {
    id: 'sbi-cashback',
    name: 'Cashback SBI Card',
    bank: 'SBI Card',
    network: 'Visa',
    primaryCategory: 'Cashback',
    categories: ['Cashback', 'Shopping'],
    joiningFee: 999,
    annualFee: 999,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 200000,
      notes: 'Annual fee of Rs. 999 is waived off on spending Rs. 2,00,000 or more in the preceding anniversary year. Highly lucrative payback pays for fee within 1 month.',
      retentionTips: 'Call SBI Card helpline before annual fee statement. If spends exceed Rs. 1.2L, they often offer spend milestones or bonus reward points to offset the fee.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      onlineShoppingPercent: 5.0, // Flat 5% online on Amazon, Flipkart, Myntra, Nykaa, etc.
      diningPercent: 5.0, // 5% online on Swiggy, Zomato, etc.
      monthlyCashbackCap: 5000, // Rs. 5000 cashback cap per month = Rs. 1 Lakh online spend
      rewardPointValueInRupees: 1.0,
    },
    minAnnualIncome: 400000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'The undisputed cashback champion in India: flat 5% cashback on almost all online platforms up to Rs. 5,000/mo.',
    pros: [
      '5% flat cashback across all online merchants without merchant restrictions (Amazon, Flipkart, Blinkit, Uber, MakeMyTrip, etc.)',
      'No merchant coupon codes or complicated reward catalogues; cashback auto-credited to statement',
      'High monthly cap of Rs. 5,000 cashback (translating to Rs. 60,000 potential cashback/year)',
      'Spend waiver at Rs. 2,00,000/year makes it virtually free',
    ],
    cons: [
      'No airport lounge access',
      'Excludes rent, wallet reloads, fuel, school fees, and utility payments from 5% cashback',
      'Offline in-store spends earn standard 1% cashback',
    ],
  },
  {
    id: 'hdfc-millennia',
    name: 'HDFC Millennia Credit Card',
    bank: 'HDFC Bank',
    network: 'Mastercard',
    primaryCategory: 'Cashback',
    categories: ['Cashback', 'Shopping', 'Dining'],
    joiningFee: 1000,
    annualFee: 1000,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 100000,
      alumniEligible: true,
      alumniColleges: ['IITs', 'IIMs', 'NITs', 'BITS Pilani', 'Top Tier 1 Engineering & Management'],
      salaryTierRequired: 'Tier A',
      notes: 'Fee waived on spending Rs. 1,00,000 annually. Frequently offered Lifetime Free to corporate salary account holders and alumni of listed institutes.',
      retentionTips: 'HDFC corporate desk provides LTF conversion forms for salary accounts maintaining salary credit > Rs. 40,000/mo.',
    },
    perks: {
      domesticLoungesPerQuarter: 1,
      loungeSpendRequirement: 'Requires Rs. 1 Lakh spend in previous calendar quarter',
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      onlineShoppingPercent: 5.0, // 5% CashPoints on Amazon, Flipkart, Swiggy, Zomato, Tata Neu, Cult.fit, Myntra, Uber, BookMyShow
      diningPercent: 5.0,
      monthlyCashbackCap: 1000, // Max 1000 CashPoints per month for 5% category
      rewardPointValueInRupees: 1.0,
    },
    milestones: [
      {
        spendAmount: 100000,
        rewardDescription: 'Rs. 1,000 gift voucher every calendar quarter on spending Rs. 1 Lakh',
        estimatedValueInRupees: 4000,
      },
    ],
    minAnnualIncome: 420000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: '5% cashback on 10 top merchant giants plus Rs. 1,000 quarterly milestone vouchers and domestic lounge.',
    pros: [
      '5% CashPoints on 10 top partners: Amazon, Flipkart, Swiggy, Zomato, Myntra, Tata Neu, Uber, BookMyShow, Cult.fit, Sony LIV',
      '1 CashPoint = Rs. 1 against statement credit (redemption via NetBanking)',
      'Quarterly milestone voucher of Rs. 1,000 on spending Rs. 1,00,000 (adds 1% extra returns)',
      'Low spend waiver threshold of just Rs. 1 Lakh/year',
    ],
    cons: [
      'Monthly cap of 1,000 CashPoints on 5% accelerated category',
      'Lounge access now has a quarterly spend barrier of Rs. 1 Lakh',
    ],
    welcomeOffer: {
      description: '1,000 CashPoints upon realization of joining fee',
      estimatedValueInRupees: 1000,
    },
  },
  {
    id: 'airtel-axis',
    name: 'Airtel Axis Bank Credit Card',
    bank: 'Axis Bank',
    network: 'Mastercard',
    primaryCategory: 'Dining',
    categories: ['Dining', 'Cashback', 'Shopping'],
    joiningFee: 500,
    annualFee: 500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 200000,
      notes: 'Annual fee waived on spending Rs. 2,00,000/yr. The insane cashback returns of 25% and 10% easily recover the Rs. 500 fee within the first 2 months.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      utilityPercent: 10.0, // 10% on Electricity, Gas, Water via Airtel Thanks app (cap Rs 250/mo)
      diningPercent: 10.0, // 10% on Swiggy, Zomato, BigBasket (cap Rs 500/mo)
      onlineShoppingPercent: 10.0,
      rewardPointValueInRupees: 1.0,
    },
    minAnnualIncome: 360000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: 'King of utility & food cashback: 25% on Airtel recharges/bills, 10% on Swiggy, Zomato, BigBasket, and 10% on utilities.',
    pros: [
      '25% cashback on Airtel Mobile, Broadband, WiFi, and DTH bill payments (up to Rs. 250/mo)',
      '10% cashback on Swiggy, Zomato, and BigBasket (up to Rs. 500/mo)',
      '10% cashback on utility bills (Electricity, Gas, Water) paid through Airtel Thanks App (up to Rs. 250/mo)',
      'Net guaranteed annual cashback of over Rs. 10,000+ for regular households',
    ],
    cons: [
      'Sub-limits/caps apply to each category monthly',
      'No airport lounge access',
      'Airtel 25% requires recharges to be done through the Airtel Thanks App',
    ],
    welcomeOffer: {
      description: 'Amazon voucher worth Rs. 500 on first transaction within 30 days',
      estimatedValueInRupees: 500,
    },
  },
  {
    id: 'tata-neu-infinity',
    name: 'Tata Neu Infinity HDFC Credit Card',
    bank: 'HDFC Bank',
    network: 'RuPay',
    primaryCategory: 'RuPay UPI',
    categories: ['RuPay UPI', 'Shopping', 'Travel'],
    joiningFee: 1499,
    annualFee: 1499,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 300000,
      salaryTierRequired: 'Tier A',
      notes: 'Fee waived on spending Rs. 3 Lakhs in anniversary year. Regularly offered LTF or First Year Free via Tata Neu app promotional campaigns to active NeuPass users.',
      retentionTips: 'Check the Tata Neu app homepage frequently; pre-approved LTF banners are shown to users with good CIBIL scores.',
    },
    perks: {
      domesticLoungesPerQuarter: 2,
      internationalLoungesPerYear: 4,
      forexMarkupPercent: 2.0,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.5,
      onlineShoppingPercent: 10.0, // 5% card + 5% NeuPass on Tata brands (BigBasket, 1mg, Croma, Air India Express, IHCL Hotels, Tata CLiQ)
      travelPercent: 10.0, // Air India / Air India Express & IHCL Taj bookings on Tata Neu
      groceryPercent: 10.0, // BigBasket
      upiPercent: 1.5, // 1.5% NeuCoins on RuPay UPI merchant spends
      rewardPointValueInRupees: 1.0, // 1 NeuCoin = 1 Rupee on Tata Neu app
    },
    minAnnualIncome: 700000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'The ultimate RuPay UPI & Tata ecosystem powerhouse: 1.5% UPI cashback and 10% NeuCoins on BigBasket, Croma, and Air India.',
    pros: [
      '1.5% NeuCoins on all RuPay UPI QR scan & pay transactions',
      '10% total NeuCoins on Tata Neu brands (BigBasket, Croma, 1mg, Air India Express, Westside, Titan, Taj Hotels)',
      '2 domestic airport lounges per quarter and 4 international lounges per year via Priority Pass',
      '1 NeuCoin = Rs. 1 direct redemption without loss of value',
    ],
    cons: [
      'NeuCoins expire within 1 year from the date of credit',
      'Maximum value extracted if you frequently buy from Tata ecosystem brands',
    ],
    welcomeOffer: {
      description: '1,499 NeuCoins upon realization of joining fee and first transaction',
      estimatedValueInRupees: 1499,
    },
  },
  {
    id: 'swiggy-hdfc',
    name: 'Swiggy HDFC Bank Credit Card',
    bank: 'HDFC Bank',
    network: 'Mastercard',
    primaryCategory: 'Dining',
    categories: ['Dining', 'Cashback', 'Shopping'],
    joiningFee: 500,
    annualFee: 500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 200000,
      notes: 'Annual fee waived on spending Rs. 2,00,000/yr. Frequently rolled out as Lifetime Free inside the Swiggy mobile app under pre-approved banners.',
      retentionTips: 'Apply directly via the Swiggy app banner when "Lifetime Free" special promotion tag is displayed.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: false,
    },
    rewards: {
      basePercent: 1.0,
      diningPercent: 10.0, // 10% on Swiggy Food, Instamart, Dineout, Genie (cap Rs. 1500/mo)
      onlineShoppingPercent: 5.0, // 5% on Amazon, Flipkart, Myntra, Nykaa, Uber, Nike, Zara etc. (cap Rs. 1500/mo)
      groceryPercent: 10.0, // Swiggy Instamart
      monthlyCashbackCap: 3000,
      rewardPointValueInRupees: 1.0,
    },
    minAnnualIncome: 360000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: '10% direct statement cashback on Swiggy food orders & Instamart groceries + 5% on online shopping.',
    pros: [
      '10% direct statement cashback on Swiggy (Food orders, Instamart, Dineout)',
      '5% cashback on top online merchants including Amazon, Flipkart, Myntra, Uber, Nykaa',
      'Cashback automatically credited directly to the credit card statement (no voucher conversion hassle)',
      'Attractive low annual fee of Rs. 500 (frequently issued LTF via Swiggy app)',
    ],
    cons: [
      'No airport lounge access',
      'No fuel surcharge waiver',
    ],
    welcomeOffer: {
      description: 'Complimentary 3-month Swiggy One membership',
      estimatedValueInRupees: 700,
    },
  },
  {
    id: 'hsbc-live-plus',
    name: 'HSBC Live+ Credit Card',
    bank: 'HSBC Bank',
    network: 'Visa',
    primaryCategory: 'Dining',
    categories: ['Dining', 'Cashback', 'Shopping'],
    joiningFee: 999,
    annualFee: 999,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 200000,
      notes: 'Spend Rs. 2,00,000 in a year to waive the annual renewal fee.',
    },
    perks: {
      domesticLoungesPerQuarter: 1,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
      bogoMovies: false,
    },
    rewards: {
      basePercent: 1.5,
      diningPercent: 10.0, // 10% on dining, food delivery, and groceries (cap Rs. 1,000/mo)
      groceryPercent: 10.0,
      monthlyCashbackCap: 1000,
      rewardPointValueInRupees: 1.0,
    },
    minAnnualIncome: 480000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: '10% accelerated cashback on all dining, food delivery apps (Zomato/Swiggy), and grocery supermarket bills.',
    pros: [
      '10% cashback on all dining and food delivery spends up to Rs. 1,000/month',
      '10% cashback on grocery stores and supermarket checkouts (offline DMart, Nature Basket + online Instamart/Blinkit)',
      'Unlimited 1.5% cashback on all other eligible spends',
      '1 complimentary domestic airport lounge visit per quarter',
    ],
    cons: [
      'Monthly cap of Rs. 1,000 on the 10% category',
      'High dining/food spenders may exhaust the monthly cap quickly',
    ],
    welcomeOffer: {
      description: 'Rs. 1,000 cashback on spending Rs. 20,000 in first 30 days',
      estimatedValueInRupees: 1000,
    },
  },

  // --- TRAVEL & LUXURY KINGS ---
  {
    id: 'axis-atlas',
    name: 'Axis Bank Atlas Credit Card',
    bank: 'Axis Bank',
    network: 'Visa',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Premium / Luxury'],
    joiningFee: 5000,
    annualFee: 5000,
    ltfStatus: 'Strictly Paid',
    ltfPathways: {
      isInherentlyLtf: false,
      notes: 'Strictly paid card, but annual fee of Rs. 5,000 is compensated by 2,500 renewal Edge Miles (worth Rs. 5,000 at Accor Hotels or 2,500 air miles).',
      retentionTips: 'Never close this card over the fee; the 2,500 renewal Edge Miles mathematically offset the entire fee when transferred to Accor (1:2 ratio = 5,000 Accor points worth Rs. 9,000 in hotel stays).',
    },
    perks: {
      domesticLoungesPerQuarter: 'Unlimited',
      internationalLoungesPerYear: 8,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 4.0, // 2 Edge Miles per Rs 100 (1 EM = 2 Accor points = ~Rs 3.60 return = 3.6% - 4%)
      travelPercent: 10.0, // 5 Edge Miles per Rs 100 direct airline/hotel spends = up to 10% return
      rewardPointValueInRupees: 2.0, // Accor hotel conversion 1:2
    },
    milestones: [
      {
        spendAmount: 300000,
        rewardDescription: 'Gold Tier + 2,500 bonus Edge Miles',
        estimatedValueInRupees: 5000,
      },
      {
        spendAmount: 750000,
        rewardDescription: 'Platinum Tier + 5,000 bonus Edge Miles',
        estimatedValueInRupees: 10000,
      },
      {
        spendAmount: 1500000,
        rewardDescription: '10,000 bonus Edge Miles on reaching Rs. 15 Lakh spend',
        estimatedValueInRupees: 20000,
      },
    ],
    minAnnualIncome: 1200000,
    idealSpendLevel: 'High (50k-1.5L/mo)',
    highlight: 'The reigning travel king of India: 5 Edge Miles on direct travel, 1:2 transfer to Accor hotels (up to 10% return), and milestone tier bonuses.',
    pros: [
      'Industry-best travel rewards: 5 Edge Miles per Rs. 100 spent on direct airline websites and hotel bookings',
      'Edge Miles transfer to international airline partners (Singapore KrisFlyer, Qatar, Turkish) and hotel programs (Accor 1:2 ratio)',
      'Generous milestone tier benefits yielding tens of thousands of extra miles',
      'Complimentary airport lounge access for primary & guest passengers',
    ],
    cons: [
      'Rs. 5,000 annual fee is not waivable via spend',
      'Recent exclusions on rent, utilities, and jewelry spends',
    ],
    welcomeOffer: {
      description: '5,000 Edge Miles upon realization of joining fee (worth Rs. 9,000+ at Accor)',
      estimatedValueInRupees: 9000,
    },
  },
  {
    id: 'hdfc-infinia-metal',
    name: 'HDFC Bank Infinia Metal Edition',
    bank: 'HDFC Bank',
    network: 'Visa',
    primaryCategory: 'Premium / Luxury',
    categories: ['Premium / Luxury', 'Travel', 'Dining'],
    joiningFee: 12500,
    annualFee: 12500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 1000000,
      salaryTierRequired: 'Wealth Account',
      notes: 'Annual fee waived on spending Rs. 10 Lakhs in a year. Invite-only card, but high-net-worth salary accounts (Net take home > Rs. 3L/mo) or alumni with strong HDFC relationship can request RM approval.',
      retentionTips: 'If spend reaches Rs. 8-10L, HDFC Relationship Managers easily waive the fee or issue bonus reward points matching the fee.',
    },
    perks: {
      domesticLoungesPerQuarter: 'Unlimited',
      internationalLoungesPerYear: 'Unlimited',
      forexMarkupPercent: 2.0,
      fuelSurchargeWaiver: true,
      golfRoundsPerYear: 'Unlimited',
    },
    rewards: {
      basePercent: 3.33, // 5 reward points per Rs 150 = 3.33%
      travelPercent: 33.33, // Up to 10x points (33.3% return) on SmartBuy Flights and Hotels
      diningPercent: 6.66,
      rewardPointValueInRupees: 1.0, // 1 RP = Rs. 1 on SmartBuy flights, Apple products, Tanishq vouchers
    },
    minAnnualIncome: 3600000,
    idealSpendLevel: 'Super High (> 1.5L/mo)',
    highlight: 'The holy grail of Indian credit cards: 33.3% return on flights & hotels via SmartBuy, unlimited global lounges for cardholder & add-on.',
    pros: [
      'Unmatched 33.3% reward rate on flights and hotels via HDFC SmartBuy portal',
      'Unlimited domestic and international airport lounge access worldwide with Priority Pass (including complimentary guest access)',
      'Unlimited complimentary golf games and lessons in India and abroad',
      '1 Reward Point = Flat Rs. 1.00 on flights, hotels, and Apple store',
      'Low 2% forex markup fee and metal card build',
    ],
    cons: [
      'Very strict invite-only eligibility criteria (Rs. 3.5 Lakhs net monthly salary or Rs. 7.5L existing card limit with heavy spends)',
      'Rs. 10 Lakh annual spend needed for fee waiver',
      'SmartBuy daily and monthly reward point caps apply',
    ],
    welcomeOffer: {
      description: '12,500 Reward Points upon realization of joining fee',
      estimatedValueInRupees: 12500,
    },
  },
  {
    id: 'hdfc-diners-black-metal',
    name: 'HDFC Diners Club Black Metal Edition',
    bank: 'HDFC Bank',
    network: 'Diners Club',
    primaryCategory: 'Premium / Luxury',
    categories: ['Premium / Luxury', 'Travel', 'Dining'],
    joiningFee: 10000,
    annualFee: 10000,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 800000,
      alumniEligible: true,
      alumniColleges: ['IITs (Bombay, Delhi, Madras, Kharagpur, Roorkee, Kanpur, BHU)', 'IIMs (A, B, C, L, K, I)', 'XLRI', 'ISB', 'BITS Pilani', 'FMS', 'SPJIMR', 'NLSIU Bangalore'],
      salaryTierRequired: 'Super A',
      notes: 'Fee waived on spending Rs. 8 Lakhs/year. Famous HDFC Alumni Program allows graduates of elite institutions to get this card LTF or First Year Free via corporate desk.',
      retentionTips: 'Alumni can submit their degree certificate and salary slip to the HDFC corporate alumni desk to request an LTF upgrade from Regalia/Millennia.',
    },
    perks: {
      domesticLoungesPerQuarter: 'Unlimited',
      internationalLoungesPerYear: 'Unlimited',
      forexMarkupPercent: 2.0,
      fuelSurchargeWaiver: true,
      golfRoundsPerYear: 24,
    },
    rewards: {
      basePercent: 3.33,
      travelPercent: 33.33,
      diningPercent: 6.66,
      rewardPointValueInRupees: 1.0,
    },
    milestones: [
      {
        spendAmount: 400000,
        rewardDescription: 'Complimentary memberships: Marriott Bonvoy, Club Marriott, Amazon Prime, Swiggy One on spending Rs. 4 Lakhs',
        estimatedValueInRupees: 5000,
      },
    ],
    minAnnualIncome: 2400000,
    idealSpendLevel: 'Super High (> 1.5L/mo)',
    highlight: 'HDFC Alumni favorite: 33.3% SmartBuy travel rewards, unlimited airport lounges globally, and elite alumni LTF route.',
    pros: [
      'Huge 33.3% return on flights and hotel bookings via SmartBuy',
      'Eligible under HDFC Alumni Program for Lifetime Free status for premier college graduates',
      'Unlimited airport lounge access globally for both primary and add-on cardholders',
      'Low 2% forex markup fee',
      '1 Reward Point = Rs. 1 for flight/hotel bookings',
    ],
    cons: [
      'Diners Club network acceptance offline in smaller merchant terminals is slightly lower than Visa/Mastercard',
      'Rs. 8 Lakh spend waiver threshold',
    ],
    welcomeOffer: {
      description: '10,000 Reward Points upon realization of joining fee',
      estimatedValueInRupees: 10000,
    },
  },
  {
    id: 'hdfc-regalia-gold',
    name: 'HDFC Regalia Gold Credit Card',
    bank: 'HDFC Bank',
    network: 'Visa',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Shopping'],
    joiningFee: 2500,
    annualFee: 2500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 400000,
      alumniEligible: true,
      alumniColleges: ['IITs', 'IIMs', 'NITs', 'BITS', 'Top 50 NIRF Engineering and B-Schools'],
      salaryTierRequired: 'Tier A',
      notes: 'Spend Rs. 4,00,000 in a year to waive the renewal fee. Widely issued as Lifetime Free under HDFC Alumni campaigns and Corporate Salary tie-ups.',
      retentionTips: 'If your corporate salary account is with HDFC, speak to your corporate RM. They have approval matrices to convert Regalia Gold to LTF.',
    },
    perks: {
      domesticLoungesPerQuarter: 3,
      internationalLoungesPerYear: 6,
      forexMarkupPercent: 2.0,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.33, // 4 reward points per Rs 150 = 1.33%
      travelPercent: 6.66, // 5x on Marks & Spencer, Myntra, Nykaa, Reliance Digital + SmartBuy
      onlineShoppingPercent: 6.66,
      rewardPointValueInRupees: 0.50, // 1 RP = Rs. 0.50 for flight/hotel redemption via SmartBuy
    },
    milestones: [
      {
        spendAmount: 150000,
        rewardDescription: 'Rs. 1,500 voucher on Marks & Spencer / Myntra / Reliance Digital on quarterly spend of Rs. 1.5 Lakhs',
        estimatedValueInRupees: 6000,
      },
      {
        spendAmount: 500000,
        rewardDescription: 'Flight voucher worth Rs. 5,000 on spending Rs. 5 Lakhs annually',
        estimatedValueInRupees: 5000,
      },
    ],
    minAnnualIncome: 1200000,
    idealSpendLevel: 'High (50k-1.5L/mo)',
    highlight: 'Popular premium card with 12 domestic & 6 international lounges, low 2% forex, and high milestone vouchers.',
    pros: [
      '12 complimentary domestic airport lounges (3 per quarter) and 6 international lounges with Priority Pass',
      'Low 2% forex markup fee for international spends',
      'Lucrative milestone vouchers (Rs. 1,500 every quarter + Rs. 5,000 flight voucher at Rs. 5L spend)',
      'High approval rate via HDFC Alumni program and Corporate salary accounts',
    ],
    cons: [
      'Base reward rate is 1.33%, which is lower than pure cashback cards for everyday shopping',
      'Flight redemption value is Rs. 0.50 per point (versus Rs. 1.00 on Infinia/DCB)',
    ],
    welcomeOffer: {
      description: 'Club Vistara Silver tier + M&S / Nykaa vouchers worth Rs. 2,500',
      estimatedValueInRupees: 2500,
    },
  },
  {
    id: 'amex-platinum-travel',
    name: 'American Express Platinum Travel Credit Card',
    bank: 'American Express',
    network: 'American Express',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Shopping'],
    joiningFee: 3500,
    annualFee: 5000,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 400000,
      notes: 'While not formally LTF, hitting exactly Rs. 4 Lakhs spend yields 48,000 MR points + Rs. 10,000 Taj Voucher = over Rs. 38,000 in hotel/travel value, yielding an insane 8.5% net return after paying the Rs. 5,000 fee.',
      retentionTips: 'Amex retention offers are among the best in India: calling customer care before renewal frequently yields 10,000 - 15,000 MR points retention bonus.',
    },
    perks: {
      domesticLoungesPerQuarter: 2,
      internationalLoungesPerYear: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      rewardPointValueInRupees: 0.50, // 1 MR Point = ~0.50 to 0.70 via Marriott Bonvoy transfer
    },
    milestones: [
      {
        spendAmount: 190000,
        rewardDescription: '15,000 bonus Membership Rewards points',
        estimatedValueInRupees: 9000,
      },
      {
        spendAmount: 400000,
        rewardDescription: '25,000 bonus MR points + Rs. 10,000 Taj Hotels voucher',
        estimatedValueInRupees: 25000,
      },
    ],
    minAnnualIncome: 600000,
    idealSpendLevel: 'High (50k-1.5L/mo)',
    highlight: 'The ultimate 4-Lakh milestone weapon: Rs. 35,000+ luxury travel & Taj hotel value on spending exactly Rs. 4 Lakhs/yr.',
    pros: [
      'Unmatched milestone return: hitting Rs. 4,00,000 annual spend grants 48,000 MR points + Rs. 10,000 Taj stay voucher',
      '1:1 point transfer to Marriott Bonvoy gives 4-5 nights of free 5-star hotel stays across India & Southeast Asia',
      'World-class American Express 24x7 customer service and fraud protection',
      '8 complimentary domestic airport lounge visits per year',
    ],
    cons: [
      'Rewards drop sharply if you spend less than Rs. 1.9 Lakhs or more than Rs. 4 Lakhs (ideal sweet spot is exactly Rs. 4L)',
      'Annual fee of Rs. 5,000 is charged after year 1',
      'No international airport lounges',
    ],
    welcomeOffer: {
      description: '10,000 Membership Rewards points on spending Rs. 15,000 within 90 days',
      estimatedValueInRupees: 5000,
    },
  },
  {
    id: 'au-ixigo',
    name: 'AU Ixigo Credit Card',
    bank: 'AU Small Finance Bank',
    network: 'Visa',
    primaryCategory: 'Travel',
    categories: ['Travel', 'Zero Forex'],
    joiningFee: 999,
    annualFee: 999,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 100000,
      notes: 'Annual fee waived on spending Rs. 1 Lakh/year. Frequently issued with Lifetime Free offer directly on the Ixigo flight booking app.',
      retentionTips: 'Apply when Ixigo displays the "Lifetime Free Special Edition" banner inside the app.',
    },
    perks: {
      domesticLoungesPerQuarter: 2,
      internationalLoungesPerYear: 1,
      forexMarkupPercent: 0.0, // Zero forex markup
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.25,
      travelPercent: 5.0, // 10% instant discount on flights/buses via Ixigo + reward points
      onlineShoppingPercent: 2.5,
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 400000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'Zero forex markup, 16 railway + 8 airport lounges per year, and 10% instant discounts on flight bookings.',
    pros: [
      'Zero forex markup fee on all international spends',
      '8 complimentary domestic airport lounges + 16 complimentary railway lounges per year',
      '1 international airport lounge visit per year via Priority Pass',
      '10% instant discount on flight, train, and bus bookings on Ixigo',
      'Low spend waiver threshold of just Rs. 1 Lakh',
    ],
    cons: [
      'AU Bank serviceability is restricted to specific cities and pincodes',
    ],
    welcomeOffer: {
      description: '1,000 reward points + Rs. 1,000 Ixigo travel vouchers',
      estimatedValueInRupees: 1250,
    },
  },

  // --- FUEL CARDS ---
  {
    id: 'bpcl-sbi-octane',
    name: 'BPCL SBI Card Octane',
    bank: 'SBI Card',
    network: 'Visa',
    primaryCategory: 'Fuel',
    categories: ['Fuel', 'Cashback'],
    joiningFee: 1499,
    annualFee: 1499,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 200000,
      notes: 'Annual fee waived on annual spend of Rs. 2,00,000. For high fuel consumers (> Rs. 4,000/mo), the fuel savings outweigh the fee multiple times over.',
    },
    perks: {
      domesticLoungesPerQuarter: 1,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 0.25,
      fuelPercent: 7.25, // 25x reward points = 6.25% valueback + 1% fuel surcharge waiver = 7.25% at BPCL outlets
      groceryPercent: 2.5, // 10x points at supermarkets & dining
      diningPercent: 2.5,
      monthlyCashbackCap: 2500, // fuel cap 2500 points per billing cycle (approx Rs 10k fuel)
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 360000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: 'The reigning champion of fuel credit cards: massive 7.25% value back on Bharat Petroleum fuel spends.',
    pros: [
      'Huge 7.25% valueback (6.25% reward points + 1% fuel surcharge waiver) on BPCL petrol, diesel, and Speed',
      '4 complimentary domestic airport lounge visits per year (1 per quarter)',
      '10X Reward Points (2.5% return) on Groceries, Supermarkets, Dining, and Movie tickets',
      'Reward points easily redeemable for free fuel directly at BPCL petrol pumps via POS machine',
    ],
    cons: [
      'Accelerated 7.25% rewards are exclusive to BPCL outlets only (IndianOil/HPCL earn standard rate)',
      'Monthly cap of 2,500 reward points on fuel (approx. Rs. 10,000 monthly fuel spend)',
    ],
    welcomeOffer: {
      description: '6,000 bonus reward points (worth Rs. 1,500 fuel) upon fee payment',
      estimatedValueInRupees: 1500,
    },
  },
  {
    id: 'indianoil-axis',
    name: 'IndianOil Axis Bank Credit Card',
    bank: 'Axis Bank',
    network: 'RuPay',
    primaryCategory: 'Fuel',
    categories: ['Fuel', 'RuPay UPI'],
    joiningFee: 500,
    annualFee: 500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 50000,
      notes: 'Super low annual spend waiver threshold: spending just Rs. 50,000/year makes this card 100% free.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 0.2,
      fuelPercent: 4.0, // 20 Edge points per Rs 100 at IOCL outlets (4% valueback) + 1% surcharge waiver
      onlineShoppingPercent: 1.0,
      upiPercent: 1.0, // RuPay UPI fuel & general
      rewardPointValueInRupees: 0.20,
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: '4% value back on IndianOil fuel with a super easy spend waiver of just Rs. 50,000/year and RuPay UPI support.',
    pros: [
      '4% value back on fuel purchases at IndianOil petrol pumps',
      'Available on RuPay network (link with UPI for everyday scan and pay)',
      'Super easy spend waiver: just Rs. 50,000 annual spend required to make it free',
      '1% fuel surcharge waiver up to Rs. 50/month',
    ],
    cons: [
      'No airport lounge access',
      'Accelerated rewards valid only at authorized IOCL outlets',
    ],
    welcomeOffer: {
      description: '100% cashback up to Rs. 250 on first fuel transaction within 30 days',
      estimatedValueInRupees: 250,
    },
  },
  {
    id: 'icici-sapphiro',
    name: 'ICICI Bank Sapphiro Credit Card',
    bank: 'ICICI Bank',
    network: 'Mastercard',
    primaryCategory: 'Premium / Luxury',
    categories: ['Premium / Luxury', 'Travel', 'Dining'],
    joiningFee: 6500,
    annualFee: 3500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 600000,
      alumniEligible: true,
      alumniColleges: [
        'IITs', 'IIMs', 'BITS Pilani', 'XLRI', 'ISB', 'FMS Delhi', 'SPJIMR', 'MDI Gurgaon',
        'NIT Trichy, Surathkal, Warangal', 'DTU', 'IIIT Hyderabad & Allahabad',
        'Top National Law Universities (NLUs)', 'AIIMS', 'Armed Forces Colleges'
      ],
      salaryTierRequired: 'Super A',
      notes: 'Famously available as 100% Lifetime Free (LTF) under the ICICI Alumni Program for graduates of over 80+ top institutions in India with zero joining and annual fees forever.',
      retentionTips: 'Alumni can apply directly via the ICICI Alumni link or show their degree to any ICICI branch manager to get the Sapphiro Dual card (Mastercard + Amex) 100% LTF.',
    },
    perks: {
      domesticLoungesPerQuarter: 4, // 2 per card on dual variant
      internationalLoungesPerYear: 2,
      loungeSpendRequirement: 'Requires Rs. 5,000 spend in previous calendar quarter',
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
      bogoMovies: true, // Buy 1 Get 1 up to Rs. 500 on BookMyShow twice a month
      golfRoundsPerYear: 4,
    },
    rewards: {
      basePercent: 0.5,
      travelPercent: 1.0,
      onlineShoppingPercent: 1.0,
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 1500000,
    idealSpendLevel: 'High (50k-1.5L/mo)',
    highlight: 'Flagship Alumni favorite: 100% Lifetime Free for top college graduates with BookMyShow BOGO (up to Rs. 500) and 16 lounges/year.',
    pros: [
      '100% Lifetime Free for graduates of 80+ elite institutes under the ICICI Alumni Offer',
      'Buy 1 Get 1 Free movie tickets on BookMyShow up to Rs. 500 twice every month (save up to Rs. 12,000/year on cinema)',
      'Up to 16 complimentary domestic airport lounge visits per year and 2 international lounge visits',
      'Complimentary golf games and spa access',
      'Comes as a dual card combo (Mastercard + American Express or Visa)',
    ],
    cons: [
      'Reward rate for general shopping is very low (0.5% - 1%)',
      'High default joining fee if you do not qualify through the Alumni / Wealth route',
    ],
    welcomeOffer: {
      description: 'Welcome vouchers worth Rs. 9,000+ across shopping and travel (for paid variant)',
      estimatedValueInRupees: 9000,
    },
  },
  {
    id: 'au-lit',
    name: 'AU LIT Credit Card',
    bank: 'AU Small Finance Bank',
    network: 'Visa',
    primaryCategory: 'Cashback',
    categories: ['Cashback', 'Shopping'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Inherently Lifetime Free base card. Users can toggle and pay micro-subscriptions only for the specific features they want (e.g. 5% cashback or lounge) for 30/90 days.',
    },
    perks: {
      domesticLoungesPerQuarter: 0, // customizable via app
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 0.5,
      onlineShoppingPercent: 5.0, // when 5% cashback rider is active
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: 'India’s first customizable credit card: Lifetime Free base card where you turn features and cashback riders on/off at will.',
    pros: [
      'Truly Lifetime Free base card forever',
      'Unique modular concept: activate 5% cashback or airport lounge only when traveling or during festive shopping',
      'Full control through AU 0101 mobile banking app',
    ],
    cons: [
      'Base features without paid riders are very minimal',
      'Requires active management to turn on and turn off feature packs',
    ],
  },
  {
    id: 'amex-mrcc',
    name: 'American Express Membership Rewards Credit Card (MRCC)',
    bank: 'American Express',
    network: 'American Express',
    primaryCategory: 'Shopping',
    categories: ['Shopping', 'Cashback'],
    joiningFee: 1000,
    annualFee: 4500,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 150000,
      notes: 'Annual fee 100% waived on annual spend of Rs. 1,50,000 (50% fee waiver on Rs. 90,000 spend). Retention desk frequently provides fee waivers or bonus points for active users.',
      retentionTips: 'Call Amex customer support before annual fee renewal; they consistently offer bonus MR points or spend milestone waivers.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 1.0,
      rewardPointValueInRupees: 0.50, // 1 MR Point = ~0.50 via Marriott Bonvoy transfer
    },
    milestones: [
      {
        spendAmount: 240000,
        rewardDescription: '1,000 bonus MR points/mo for 4x Rs. 1,000 spends + 1,000 bonus points/mo for Rs. 20k spend = 24,000 bonus MR points/yr',
        estimatedValueInRupees: 12000,
      },
    ],
    minAnnualIncome: 600000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'The ultimate monthly milestone card: earn 24,000+ bonus MR points per year with just Rs. 20k monthly spend.',
    pros: [
      '1,000 bonus MR points every month on making 4 transactions of Rs. 1,000+',
      '1,000 additional bonus MR points every month on reaching Rs. 20,000 monthly spend',
      'Points transfer 1:1 to Marriott Bonvoy for free luxury hotel stays',
      '50% fee waiver at Rs. 90,000 and 100% fee waiver at Rs. 1,50,000 annual spend',
    ],
    cons: [
      'No airport lounge access included',
      'Value drops significantly if you do not hit the monthly Rs. 20k or 4x Rs. 1,000 milestones',
    ],
    welcomeOffer: {
      description: '4,000 bonus MR points on spending Rs. 15,000 within 90 days',
      estimatedValueInRupees: 2000,
    },
  },
  {
    id: 'idfc-first-hpcl-power-plus',
    name: 'IDFC FIRST HPCL Power+ Credit Card',
    bank: 'IDFC FIRST Bank',
    network: 'RuPay',
    primaryCategory: 'Fuel',
    categories: ['Fuel', 'RuPay UPI'],
    joiningFee: 499,
    annualFee: 499,
    ltfStatus: 'LTF Available via Pathways',
    ltfPathways: {
      isInherentlyLtf: false,
      spendWaiverAmount: 150000,
      notes: 'Annual fee waived on spending Rs. 1,50,000/yr. Available on RuPay network for UPI payments.',
    },
    perks: {
      domesticLoungesPerQuarter: 0,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
    },
    rewards: {
      basePercent: 0.5,
      fuelPercent: 6.5, // 5% rewards via HP Pay app + 1.5% surcharge waiver
      groceryPercent: 5.0, // 5% rewards on grocery & utility bills via app
      utilityPercent: 5.0,
      upiPercent: 1.0,
      rewardPointValueInRupees: 0.25,
    },
    minAnnualIncome: 300000,
    idealSpendLevel: 'Low (< 15k/mo)',
    highlight: '6.5% savings on HPCL fuel via HP Pay app, 5% on Fastag & groceries, with RuPay UPI support.',
    pros: [
      'Up to 6.5% savings on fuel at HPCL petrol pumps using the HP Pay app QR',
      '5% savings on IDFC FIRST Fastag recharges and utility bills',
      'RuPay credit card enabled for everyday UPI merchant scan & pay',
      'Reward points never expire',
    ],
    cons: [
      'Full 6.5% fuel return requires loading HP Pay wallet or scanning HP Pay QR at pump',
      'No airport lounge access',
    ],
    welcomeOffer: {
      description: 'Rs. 500 cashback on first HPCL fuel transaction of Rs. 500+',
      estimatedValueInRupees: 500,
    },
  },
  {
    id: 'indusind-legend',
    name: 'IndusInd Legend Credit Card',
    bank: 'IndusInd Bank',
    network: 'Visa',
    primaryCategory: 'Shopping',
    categories: ['Shopping', 'Travel'],
    joiningFee: 0,
    annualFee: 0,
    ltfStatus: 'LTF',
    ltfPathways: {
      isInherentlyLtf: true,
      notes: 'Widely issued as 100% Lifetime Free (LTF) under ongoing online promotional campaigns.',
    },
    perks: {
      domesticLoungesPerQuarter: 1,
      forexMarkupPercent: 3.5,
      fuelSurchargeWaiver: true,
      bogoMovies: true, // Buy 1 Get 1 free on BookMyShow up to Rs. 200 thrice a month
    },
    rewards: {
      basePercent: 0.75, // 1 reward point per Rs. 100 on weekdays (1 RP = Rs. 0.75 on cash)
      onlineShoppingPercent: 1.5, // 2 reward points per Rs. 100 on weekends
      rewardPointValueInRupees: 0.75,
    },
    minAnnualIncome: 600000,
    idealSpendLevel: 'Medium (15k-50k/mo)',
    highlight: 'Lifetime Free card with BookMyShow BOGO movie tickets (up to 3x/mo) and complimentary domestic airport lounge access.',
    pros: [
      'Frequently available as 100% Lifetime Free with zero annual maintenance fees',
      'Buy 1 Get 1 Free movie tickets on BookMyShow up to Rs. 200 thrice every month (save up to Rs. 7,200/year on cinema)',
      '1 complimentary domestic airport lounge visit per quarter',
      'Double reward points on weekend transactions',
    ],
    cons: [
      'Base weekday reward rate is low (0.75%)',
      'High default joining fee if you apply without the Lifetime Free promotional offer',
    ],
  },
];
