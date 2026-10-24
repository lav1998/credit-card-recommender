export interface LtfStrategy {
  id: string;
  title: string;
  summary: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  successRate: '95%+' | '75% - 90%' | '50% - 70%';
  tag: string;
  description: string;
  steps: string[];
  eligibleCards: {
    name: string;
    bank: string;
    normalFee: string;
    condition: string;
  }[];
  insiderTips: string[];
}

export interface AlumniProgramDetails {
  bank: string;
  programName: string;
  cardsOffered: {
    cardName: string;
    normalFee: string;
    alumniBenefit: string;
    tier: 'Tier 1' | 'Tier 2';
  }[];
  eligibleColleges: {
    category: string;
    colleges: string[];
  }[];
  applicationMethod: string;
  documentsNeeded: string[];
}

export const LTF_STRATEGIES: LtfStrategy[] = [
  {
    id: 'inherent-ltf',
    title: '1. Choose Inherently Lifetime Free Cards',
    summary: 'Zero joining fee, zero annual fee, zero spend conditions forever by design.',
    difficulty: 'Easy',
    successRate: '95%+',
    tag: 'Guaranteed Free',
    description: 'Several top-tier fintech and bank partnership cards are engineered to be 100% Lifetime Free without any tricky spend milestones or waiver criteria. These make the best "anchor" cards for beginners and credit score builders.',
    steps: [
      'Identify your primary spend requirement (e.g. Amazon shopping, international travel, or UPI).',
      'Apply online via the direct bank portal or partner application (e.g., Amazon app for Amazon Pay ICICI, Scapia app for Federal Scapia, Kiwi for Axis RuPay).',
      'Complete instant Video-KYC (Aadhaar & PAN card required).',
      'Virtual card is generated within 24 hours, physical card dispatched in 3-5 days.',
    ],
    eligibleCards: [
      { name: 'Amazon Pay ICICI', bank: 'ICICI Bank', normalFee: '₹0 (LTF)', condition: 'Zero conditions, 5% Amazon cashback for Prime' },
      { name: 'Scapia Federal', bank: 'Federal Bank', normalFee: '₹0 (LTF)', condition: 'Zero forex markup, free domestic lounges on ₹5k/mo spend' },
      { name: 'IDFC FIRST Wealth / Select', bank: 'IDFC FIRST Bank', normalFee: '₹0 (LTF)', condition: 'Free airport lounges, low 1.5% forex, zero fee forever' },
      { name: 'OneCard Metal', bank: 'SBM / Federal / BoB', normalFee: '₹0 (LTF)', condition: 'Metal card, fractional rewards, zero fees' },
      { name: 'Kiwi Axis RuPay', bank: 'Axis Bank', normalFee: '₹0 (LTF)', condition: 'Virtual RuPay card for 2% UPI cashback' },
      { name: 'AU LIT', bank: 'AU Small Finance Bank', normalFee: '₹0 (LTF)', condition: 'Customizable base card with zero annual fee' },
    ],
    insiderTips: [
      'Amazon Pay ICICI has no minimum spend requirement and is one of the highest credit-limit grantors for salaried professionals.',
      'IDFC FIRST Bank cards are inherently LTF across all tiers (Classic, Millennia, Select, Wealth). If you meet the income criteria, apply directly for Wealth or Select to get complimentary airport lounge access.',
      'Scapia gives 0% forex markup, making it superior to paid forex travel cards for international trips.',
    ],
  },
  {
    id: 'alumni-program',
    title: '2. Elite Alumni Programs (HDFC & ICICI)',
    summary: 'Graduate from premier engineering, management, medical, or law schools? Get premium cards (ICICI Sapphiro, HDFC DCB) 100% LTF.',
    difficulty: 'Moderate',
    successRate: '95%+',
    tag: 'Highest Value',
    description: 'Major banks have dedicated Alumni Programs. If you hold a degree from listed premier Indian institutions (IITs, IIMs, BITS, XLRI, NITs, AIIMS, top NLUs, etc.), you qualify for super-premium cards with zero joining and renewal fees for life.',
    steps: [
      'Check if your college/institute is on the official bank Alumni eligibility list.',
      'For ICICI: Visit the ICICI Alumni Program portal or contact any branch manager with your final degree/provisional certificate + salary slip.',
      'For HDFC: Reach out to your company’s HDFC Corporate Relationship Manager (RM) or email the HDFC Corporate Card Desk with your college degree certificate.',
      'Request the specific alumni variant (e.g. ICICI Sapphiro Dual variant or HDFC Diners Club Black / Regalia Gold).',
      'The card will be sanctioned with Lifetime Free endorsement in the approval letter.',
    ],
    eligibleCards: [
      { name: 'ICICI Sapphiro (Dual Card)', bank: 'ICICI Bank', normalFee: '₹6,500 joining / ₹3,500 annual', condition: '100% LTF under ICICI Alumni Program (BOGO BookMyShow, 16 lounges/yr)' },
      { name: 'HDFC Diners Club Black Metal', bank: 'HDFC Bank', normalFee: '₹10,000 annual', condition: 'Offered LTF or First Year Free for Tier-1 IIM/IIT alumni with min salary credit' },
      { name: 'HDFC Regalia Gold', bank: 'HDFC Bank', normalFee: '₹2,500 annual', condition: 'Widely issued LTF for top 50 NIRF engineering and management colleges' },
      { name: 'ICICI Rubyx', bank: 'ICICI Bank', normalFee: '₹3,000 joining / ₹2,000 annual', condition: '100% LTF for Tier-2 engineering/management colleges' },
    ],
    insiderTips: [
      'The ICICI Alumni offer does NOT require an existing ICICI bank account or salary account! You just need your graduation degree certificate and income proof.',
      'ICICI Sapphiro under alumni gives you 2 separate cards (Mastercard + Amex) which share limits and give you 2 separate BOGO BookMyShow quotas.',
      'Even if you graduated 10+ years ago, your degree remains valid for the Alumni program forever.',
    ],
  },
  {
    id: 'salary-corporate-relationship',
    title: '3. Corporate Salary Account & Banking Relationship',
    summary: 'Leverage your employer’s corporate salary tier to convert cards to LTF via your Branch RM.',
    difficulty: 'Moderate',
    successRate: '75% - 90%',
    tag: 'Corporate Perk',
    description: 'Banks classify employers into corporate salary tiers (Super A, Tier A, Tier B, Tier C). If you work at an MNC, IT major, consulting firm, or Fortune 500 company, you can unlock premium cards as LTF through corporate salary tie-ups.',
    steps: [
      'Check which bank manages your company’s corporate salary accounts (HDFC, ICICI, Axis, or Kotak).',
      'Check your company intranet or internal portal for "Bank Corporate Offers" or reach out to the dedicated on-campus bank representative.',
      'If you have an existing paid card from the same bank, request the Corporate Desk to convert it to an LTF Corporate Salary variant.',
      'Upgrade your salary account tier (e.g. HDFC Classic -> Preferred -> Imperia, or Axis Priority -> Burgundy) to unlock higher card tiers for free.',
    ],
    eligibleCards: [
      { name: 'HDFC Millennia / Regalia Gold', bank: 'HDFC Bank', normalFee: '₹1,000 - ₹2,500', condition: 'Offered LTF for Category Super-A / Tier-A corporate salary accounts' },
      { name: 'Tata Neu Infinity HDFC', bank: 'HDFC Bank', normalFee: '₹1,499', condition: 'Offered LTF during internal corporate drives' },
      { name: 'Axis Select / Privilege', bank: 'Axis Bank', normalFee: '₹1,500 - ₹3,000', condition: 'Offered LTF with Axis Burgundy / Priority salary account' },
      { name: 'ICICI Coral / Rubx', bank: 'ICICI Bank', normalFee: '₹500 - ₹2,000', condition: 'Issued LTF with ICICI Corporate Salary accounts' },
    ],
    insiderTips: [
      'Whenever joining a new company, negotiate credit card LTF status during the new salary account onboarding kit setup.',
      'Branch Managers and Corporate RMs have monthly targets. Applying towards the end of the quarter (March, June, September, December) dramatically increases your chances of getting fee waivers approved.',
    ],
  },
  {
    id: 'spend-based-waiver',
    title: '4. De-Facto LTF via Spend Milestones',
    summary: 'Hit the bank’s pre-defined annual spend threshold to trigger 100% automated renewal fee reversal.',
    difficulty: 'Easy',
    successRate: '95%+',
    tag: 'Automated',
    description: 'Almost all top cashback and rewards cards have an automated spend-waiver clause embedded in their terms. If your planned everyday expenses (groceries, utilities, shopping, insurance, travel) exceed this threshold, the card is practically 100% free.',
    steps: [
      'Map your recurring annual expenses (Insurance premiums, Groceries, Flight bookings, Utilities).',
      'Consolidate your spends on 1 or 2 primary cards instead of scattering small spends across 5 different cards.',
      'Track your annual spend progress inside the mobile banking app.',
      'Once the spend milestone is crossed, the annual fee is either not billed at all or instantly credited back on the anniversary statement.',
    ],
    eligibleCards: [
      { name: 'IndianOil Axis', bank: 'Axis Bank', normalFee: '₹500', condition: 'Spend just ₹50,000/year to waive fee' },
      { name: 'HDFC Millennia', bank: 'HDFC Bank', normalFee: '₹1,000', condition: 'Spend ₹1,00,000/year to waive fee' },
      { name: 'AU Ixigo', bank: 'AU Small Finance Bank', normalFee: '₹999', condition: 'Spend ₹1,00,000/year to waive fee' },
      { name: 'SBI Cashback', bank: 'SBI Card', normalFee: '₹999', condition: 'Spend ₹2,00,000/year to waive fee' },
      { name: 'Airtel Axis', bank: 'Axis Bank', normalFee: '₹500', condition: 'Spend ₹2,00,000/year to waive fee' },
      { name: 'HDFC Regalia Gold', bank: 'HDFC Bank', normalFee: '₹2,500', condition: 'Spend ₹4,00,000/year to waive fee' },
      { name: 'HDFC Infinia Metal', bank: 'HDFC Bank', normalFee: '₹12,500', condition: 'Spend ₹10,00,000/year to waive fee' },
    ],
    insiderTips: [
      'Pay your term insurance and health insurance premiums using your credit card to easily reach ₹50k - ₹1L spend milestones in one go.',
      'Even if you miss the spend waiver by a small margin (e.g. spent ₹1.8L on SBI Cashback instead of ₹2L), call customer care right before the anniversary date and ask for an exception waiver.',
    ],
  },
  {
    id: 'retention-call-strategy',
    title: '5. Retention Negotiations & Retention Offers',
    summary: 'Call the bank customer helpline right when the annual fee is levied and request fee reversal or reward point compensation.',
    difficulty: 'Moderate',
    successRate: '75% - 90%',
    tag: 'Secret Weapon',
    description: 'Banks spend ₹3,000 - ₹8,000 in customer acquisition costs to acquire a good cardholder. When an active user threatens to cancel due to an annual fee, customer retention desks are authorized to offer fee waivers, bonus points, or convert the card to LTF.',
    steps: [
      'Wait for the annual fee charge to appear on your statement (do NOT pay it immediately).',
      'Call customer care and choose the option "Card Cancellation" or "Closure". This routes you to the Retention / Escalation Team, not general support.',
      'Politely explain: "I enjoy using this card, but I have other cards like Amazon Pay ICICI / IDFC which are Lifetime Free. I cannot justify paying an annual fee of ₹X, so I would like to close this card unless the fee can be waived or converted to LTF."',
      'Listen to their counter-offer. They will typically offer: (A) Direct fee reversal against ₹10k-20k spend in the next 30 days, (B) Bonus reward points equivalent to the fee, or (C) Permanent conversion to Lifetime Free.',
    ],
    eligibleCards: [
      { name: 'SBI Card (SimplyCLICK, Prime, Cashback)', bank: 'SBI Card', normalFee: '₹499 - ₹2,999', condition: 'SBI frequently offers 2,000-5,000 bonus reward points or spends target to waive fee' },
      { name: 'American Express (MRCC, Plat Travel)', bank: 'American Express', normalFee: '₹1,500 - ₹5,000', condition: 'Amex retention offers 10,000 - 15,000 MR points or 50-100% fee waiver' },
      { name: 'HDFC Bank Cards', bank: 'HDFC Bank', normalFee: '₹500 - ₹2,500', condition: 'Spend-based reversal or LTF conversion for active users' },
      { name: 'Axis Bank Cards', bank: 'Axis Bank', normalFee: '₹500 - ₹5,000', condition: 'Edge reward points compensation or fee reversal' },
    ],
    insiderTips: [
      'Always remain courteous and firm. The retention agent has an incentive to retain you as an active customer.',
      'Make sure your card has seen consistent usage over the last 6-12 months before making the call; completely dormant cards with zero spends have lower retention success rates.',
    ],
  },
  {
    id: 'promotional-c2c',
    title: '6. Card-to-Card (C2C) & Festive Promotional Banners',
    summary: 'Get pre-approved LTF offers inside bank mobile apps during festive quarters (Diwali, New Year) or via C2C.',
    difficulty: 'Easy',
    successRate: '75% - 90%',
    tag: 'Pre-Approved',
    description: 'Banks launch aggressive pre-approved LTF campaigns inside their mobile banking apps (e.g. HDFC PayZapp, ICICI iMobile, Axis Open, Swiggy app, Tata Neu app) to acquire new users during festival sales and quarter-end targets.',
    steps: [
      'Keep checking the "Cards" or "Pre-approved Offers" section of your primary mobile banking app around August-November (festive season).',
      'Check cobrand partner apps: Swiggy app banner for Swiggy HDFC LTF, Tata Neu app for Neu Infinity LTF, Ixigo app for AU Ixigo LTF.',
      'If you have a high credit limit (> ₹2 Lakhs) on one bank’s card, use Card-to-Card (C2C) application mode at another bank branch to request matching limit and LTF status.',
    ],
    eligibleCards: [
      { name: 'Swiggy HDFC Card', bank: 'HDFC Bank', normalFee: '₹500', condition: 'Banner offer inside Swiggy app offering 100% Lifetime Free' },
      { name: 'Tata Neu Plus / Infinity', bank: 'HDFC Bank', normalFee: '₹499 / ₹1,499', condition: 'Special LTF banner for frequent Tata Neu users' },
      { name: 'IndusInd Legend', bank: 'IndusInd Bank', normalFee: '₹9,999 joining', condition: 'Frequently promoted online as 100% Lifetime Free' },
      { name: 'Kotak League / Zen', bank: 'Kotak Mahindra Bank', normalFee: '₹500 - ₹1,500', condition: 'Pre-approved LTF in Kotak 811 / mobile app' },
    ],
    insiderTips: [
      'Maintaining a credit score above 770 triggers automatic pre-approved LTF card banners in netbanking.',
      'Never apply through unverified third-party telemarketers; always apply directly through the official app banner where "Lifetime Free" is explicitly stated.',
    ],
  },
];

export const ALUMNI_PROGRAMS: AlumniProgramDetails[] = [
  {
    bank: 'ICICI Bank',
    programName: 'ICICI Bank Premier Institute Alumni Offer',
    cardsOffered: [
      {
        cardName: 'ICICI Bank Sapphiro Credit Card (Dual Variant)',
        normalFee: 'Joining: ₹6,500 | Annual: ₹3,500',
        alumniBenefit: '100% Lifetime Free (Zero joining fee + Zero annual fee forever)',
        tier: 'Tier 1',
      },
      {
        cardName: 'ICICI Bank Rubyx Credit Card',
        normalFee: 'Joining: ₹3,000 | Annual: ₹2,000',
        alumniBenefit: '100% Lifetime Free (Zero joining fee + Zero annual fee forever)',
        tier: 'Tier 2',
      },
    ],
    eligibleColleges: [
      {
        category: 'Engineering / Technology (Tier 1)',
        colleges: [
          'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Kanpur', 'IIT BHU',
          'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT Gandhinagar', 'IIT Ropar', 'IIT Mandi',
          'BITS Pilani (Pilani, Goa, Hyderabad)', 'IISc Bangalore', 'IIIT Hyderabad', 'IIIT Allahabad',
          'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'DTU Delhi', 'NSUT Delhi', 'Jadavpur University'
        ],
      },
      {
        category: 'Management / B-Schools (Tier 1)',
        colleges: [
          'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode', 'IIM Indore',
          'IIM Shillong', 'IIM Ranchi', 'IIM Raipur', 'IIM Rohtak', 'IIM Udaipur', 'IIM Trichy',
          'XLRI Jamshedpur', 'ISB (Hyderabad & Mohali)', 'FMS Delhi', 'SPJIMR Mumbai', 'MDI Gurgaon',
          'IIFT Delhi', 'NMIMS Mumbai', 'JBIMS Mumbai', 'TISS Mumbai', 'Symbiosis SIBM Pune'
        ],
      },
      {
        category: 'Law, Medical & Others',
        colleges: [
          'NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'NLU Delhi', 'NLIU Bhopal',
          'AIIMS Delhi & top AIIMS', 'Armed Forces Medical College (AFMC)', 'CMC Vellore',
          'National Defence Academy (NDA)', 'Indian Military Academy (IMA)'
        ],
      },
    ],
    applicationMethod: 'Apply directly via the ICICI Alumni Link or visit any ICICI branch with your degree certificate and PAN card. No prior ICICI relationship is required.',
    documentsNeeded: [
      'Graduation / Post-Graduation Degree Certificate or Convocation Certificate',
      'PAN Card & Aadhaar Card',
      'Latest 3 months salary slips or ITR acknowledgment',
      'Work email ID verification or employee ID card',
    ],
  },
  {
    bank: 'HDFC Bank',
    programName: 'HDFC Bank Alumni & Premier Institutions Program',
    cardsOffered: [
      {
        cardName: 'HDFC Diners Club Black Metal Edition',
        normalFee: 'Joining: ₹10,000 | Annual: ₹10,000',
        alumniBenefit: 'Offered Lifetime Free (LTF) or First Year Free via Corporate Alumni Desk with salary criteria',
        tier: 'Tier 1',
      },
      {
        cardName: 'HDFC Regalia Gold Credit Card',
        normalFee: 'Joining: ₹2,500 | Annual: ₹2,500',
        alumniBenefit: '100% Lifetime Free for alumni of over 50+ NIRF engineering & management institutions',
        tier: 'Tier 1',
      },
      {
        cardName: 'HDFC Millennia Credit Card',
        normalFee: 'Joining: ₹1,000 | Annual: ₹1,000',
        alumniBenefit: 'Lifetime Free for Tier-2 college graduates and corporate employees',
        tier: 'Tier 2',
      },
    ],
    eligibleColleges: [
      {
        category: 'Tier 1 Institutes (Eligible for DCB / Regalia Gold)',
        colleges: [
          'All Indian Institutes of Technology (IITs)',
          'All Indian Institutes of Management (IIMs)',
          'BITS Pilani, Goa, Hyderabad',
          'Indian School of Business (ISB)',
          'XLRI Jamshedpur & Delhi',
          'FMS Delhi, SPJIMR Mumbai, MDI Gurgaon',
          'Top 10 NITs (Trichy, Surathkal, Warangal, Calicut, Rourkela, etc.)',
          'Top 5 National Law Universities',
          'AIIMS New Delhi'
        ],
      },
    ],
    applicationMethod: 'Contact your company’s HDFC Corporate Relationship Manager or write to the HDFC Corporate Card Desk with degree verification. Can also be requested during salary account opening.',
    documentsNeeded: [
      'College Degree Certificate / Passing Certificate',
      'Latest 2 months salary slip showing employer name',
      'KYC documents (PAN, Aadhaar)',
    ],
  },
];
