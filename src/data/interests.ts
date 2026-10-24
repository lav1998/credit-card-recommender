export interface LifestyleInterest {
  id: string;
  name: string;
  icon: string;
  description: string;
  bestCards: string[]; // Card IDs that excel at this
}

export const LIFESTYLE_INTERESTS: LifestyleInterest[] = [
  {
    id: 'gym-fitness',
    name: 'Gym & Fitness',
    icon: '🏋️',
    description: 'Complimentary FITPASS memberships, Cult.fit discounts, smartwatch perks, and wellness benefits.',
    bestCards: ['sbi-card-pulse', 'hdfc-millennia', 'idfc-first-wealth', 'onecard-metal']
  },
  {
    id: 'golf',
    name: 'Golf Privileges',
    icon: '⛳',
    description: 'Complimentary golf rounds, green fee waivers, and golf lessons across premier Indian golf courses.',
    bestCards: ['icici-sapphiro', 'hdfc-infinia-metal', 'hdfc-diners-black-metal', 'axis-magnus-burgundy', 'pnb-rupay-select', 'indusind-legend']
  },
  {
    id: 'domestic-travel',
    name: 'Domestic Flights & Lounges',
    icon: '✈️',
    description: 'Complimentary airport lounge access, flight ticket discounts, and railway lounge perks across India.',
    bestCards: ['hdfc-regalia-gold', 'hdfc-infinia-metal', 'icici-sapphiro', 'axis-atlas', 'scapia-federal', 'idfc-first-wealth', 'au-ixigo']
  },
  {
    id: 'international-travel',
    name: 'International Travel & Zero Forex',
    icon: '🌍',
    description: '0% foreign currency markup, global airport lounge access, international concierge, and travel insurance.',
    bestCards: ['scapia-federal', 'au-ixigo', 'idfc-first-mayura', '1838-reserve-icici', 'rbl-world-safari', 'onecard-metal', 'indusind-tiger']
  },
  {
    id: 'luxury-hotels',
    name: 'Luxury Hotels & Stays',
    icon: '🏨',
    description: 'Taj Epicure memberships, Marriott Bonvoy Free Night Awards, Lohono luxury villa stays, and hotel tier upgrades.',
    bestCards: ['hdfc-infinia-metal', 'marriott-bonvoy-hdfc', '1838-reserve-icici', 'amex-platinum-travel', 'axis-atlas', 'dbs-vantage']
  },
  {
    id: 'fuel',
    name: 'Fuel & EV Charging',
    icon: '⛽',
    description: 'Fuel surcharge waivers and accelerated reward returns (4% to 7.25%) across BPCL, HPCL, and IndianOil pumps.',
    bestCards: ['bpcl-sbi-octane', 'idfc-first-hpcl-power-plus', 'indianoil-axis', 'union-uni-carbon-rupay', 'bob-hpcl-energie']
  },
  {
    id: 'online-shopping',
    name: 'Online Shopping & E-Commerce',
    icon: '🛍️',
    description: '5% flat unlimited cashback across Amazon, Flipkart, Myntra, Tata CLiQ, and top e-commerce websites.',
    bestCards: ['amazon-pay-icici', 'sbi-cashback', 'hdfc-millennia', 'flipkart-axis', 'sbi-simplyclick']
  },
  {
    id: 'dining',
    name: 'Dining & Food Delivery',
    icon: '🍽️',
    description: '10% to 25% savings on Swiggy, Zomato, EazyDiner Prime, and premier restaurants across major cities.',
    bestCards: ['swiggy-hdfc', 'hsbc-live-plus', 'indusind-eazydiner', 'airtel-axis', 'axis-ace']
  },
  {
    id: 'movies',
    name: 'Movies & Entertainment',
    icon: '🎬',
    description: 'Buy 1 Get 1 free movie tickets on BookMyShow, PVR, and INOX (up to ₹500 discount per ticket).',
    bestCards: ['icici-sapphiro', 'idfc-first-wealth', 'axis-my-zone', 'rbl-play', 'sbi-card-elite', 'yes-marquee']
  },
  {
    id: 'utilities',
    name: 'Utility Bills & Recharges',
    icon: '⚡',
    description: 'Accelerated 5% to 25% cashback on electricity, gas, broadband, water, and mobile recharges.',
    bestCards: ['airtel-axis', 'axis-ace', 'tata-neu-infinity', 'amazon-pay-icici']
  },
  {
    id: 'rupay-upi',
    name: 'UPI Payments on RuPay',
    icon: '📱',
    description: 'Link credit card to Google Pay/PhonePe/Paytm to earn cashback when scanning QR codes at local merchants.',
    bestCards: ['kiwi-axis-rupay', 'tata-neu-infinity', 'tata-neu-plus', 'icici-coral-rupay', 'bpcl-sbi-octane', 'jupiter-edge-csb']
  },
  {
    id: 'pure-cashback',
    name: 'Pure Direct Statement Cashback',
    icon: '💰',
    description: 'No complicated reward points, airline transfer charts, or redemption fees. Simple monthly statement credit.',
    bestCards: ['sbi-cashback', 'amazon-pay-icici', 'swiggy-hdfc', 'axis-ace', 'hsbc-live-plus']
  },
  {
    id: 'zero-fee-ltf',
    name: 'Zero Fee / Lifetime Free Priority',
    icon: '🛡️',
    description: 'Cards with absolutely zero joining and annual fees forever, or easy spend-waiver pathways.',
    bestCards: ['amazon-pay-icici', 'scapia-federal', 'idfc-first-wealth', 'idfc-first-select', 'onecard-metal', 'kiwi-axis-rupay', 'indusind-legend', 'au-lit']
  },
  {
    id: 'vip-concierge',
    name: 'VIP Concierge & Fast-Track',
    icon: '👑',
    description: 'Doorstep visa assistance, airport fast-track security, private club memberships, and 24/7 bespoke concierge.',
    bestCards: ['1838-reserve-icici', 'amex-centurion', 'axis-burgundy-private', 'axis-olympus', 'au-zenith-plus-metal']
  }
];
