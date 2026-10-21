/**
 * RouteToRate - Bilingual Dictionary (English & Pure Hindi)
 */

export const TRANSLATIONS = {
  en: {
    appName: 'RouteToRate',
    tagline: 'Deduct round-trip fuel & transport — see which mandi delivers the highest net take-home profit.',
    liveGovBadge: 'Agmarknet Live Sync',
    offlineBadge: 'Offline Verified Mode',
    sunlightMode: 'Sunlight Mode',
    darkFieldMode: 'Field Dark',
    
    // Problem & Hero
    heroHeadline: 'The buyer across the table knows today’s rate.',
    heroSubline: 'Deduct the road. Keep the profit.',
    heroProblem1: 'A farmer hears "Sitapur Mandi is paying ₹45 more per quintal for wheat" — and drives 84 km with a full truckload.',
    heroProblem2: 'After deducting the 168 km round-trip fuel (₹3,024), he realizes Dubagga Mandi (10 km away) would have saved ₹1,089 more in net take-home profit.',
    heroFormula: 'Net Profit = (Modal Price × Quintals) − (Distance × 2 × Freight/km)',

    // Tabs
    tabRankings: '🏆 Net Profit Rankings',
    tabWaterfall: '📊 Profit Waterfall',
    tabSimulation: '🧪 Judge Simulation Lab',
    tabAdvisor: '🤖 AI Mandi Advisor',
    tabProjections: '📈 Macro Demand Data',

    // Controls
    selectCrop: 'Select Crop',
    cropQuantity: 'Crop Quantity',
    bagCount: 'bags (50kg each)',
    freightRate: 'Freight Cost',
    perKmRoundTrip: '₹/km (round-trip)',
    qualityTier: 'Quality Tier',
    tierStandard: 'Standard (Modal)',
    tierLow: 'Fair (Min Rate)',
    tierPremium: 'Super (Max Rate)',

    // Rankings & Winner
    winnerTitle: '#1 HIGHEST NET TAKE-HOME MANDI',
    winnerBadge: 'Top Profit Winner',
    takeHomeProfit: 'Net Take-Home Cash',
    quotedPrice: 'Quoted APMC Rate',
    grossRevenue: 'Gross Crop Value',
    freightDeduction: 'Round-Trip Fuel Deduction',
    distanceLabel: 'One-Way Distance',
    roundTripLabel: 'Round-Trip Distance',
    generateSlip: 'Get Official APMC Slip',
    silentMandi: 'Mandi Did Not Report Prices Today (Zero Guesswork Policy)',

    // False Economy Trap Alert
    trapAlertTitle: '⚠️ FALSE ECONOMY TRAP DETECTED (धोखा अलर्ट)',
    trapAlertPrefix: 'Beware of the illusion!',
    trapAlertSuffix: 'is quoting higher prices, but after round-trip freight, going there causes a direct loss of',
    stayLocalAdvice: 'Selling at Dubagga delivers MORE actual cash in your pocket.',

    // Waterfall
    waterfallTitle: 'Profit Waterfall: Gross Revenue vs Freight Erosion',
    waterfallSub: 'See exactly how distance eats your crop revenue across competing markets.',
    legendNet: 'Net Take-Home Cash (Stays in Pocket)',
    legendFuel: 'Round-Trip Fuel & Tolls (Eaten by Road)',

    // Receipt Modal
    receiptTitle: 'DIGITAL APMC MANDI SLIP',
    receiptCert: 'UP-APMC-CERT-2026',
    receiptVerified: 'OFFICIALLY VERIFIED',
    receiptFarmerCopy: 'Farmer Accounting Passbook',
    shareWhatsapp: 'Share via WhatsApp',
    closeModal: 'Close Ticket',
    voiceReadout: 'Listen to Audio Verdict',

    // Simulation Lab
    simTitle: '🧪 Live Simulation Lab (Judge Demo Presets)',
    simSub: 'Click any scenario below to observe real-time profit re-ranking and trap triggers:',
    simBaseline: '1. Standard Baseline Rates',
    simSitapurSurge: '2. Sitapur Price Surge (+₹160) [Triggers Trap]',
    simUnnaoReports: '3. Unnao Reports Today (₹2,310) [Silent Mandi Active]',
    simDieselHike: '4. Diesel Rate Hike (+₹8/km) [Distant Mandi Plummets]',
    simTicker: '5. Live 10s Auction Ticker [Simulate Fluctuations]',

    // Stats Bar
    bottomBest: 'Recommended Winner:',
    bottomGain: 'Take-Home Advantage:',
    quickTicket: 'Print Ticket'
  },
  hi: {
    appName: 'रूट-टू-रेट (RouteToRate)',
    tagline: 'आने-जाने का डीजल घटाएं — जानें किस मंडी में मिलेगा सबसे ज्यादा शुद्ध मुनाफा।',
    liveGovBadge: 'सरकारी एगमार्कनेट लाइव',
    offlineBadge: 'ऑफ़लाइन प्रमाणित मोड',
    sunlightMode: 'धूप मोड (तेज रोशनी)',
    darkFieldMode: 'खेत डार्क मोड',

    // Problem & Hero
    heroHeadline: 'टेबल के सामने बैठा आढ़ती आज का भाव जानता है।',
    heroSubline: 'रास्ते का खर्च घटाएं। पूरा मुनाफा घर लाएं।',
    heroProblem1: 'किसान सुनता है "सीतापुर मंडी में गेहूं ₹45 अधिक बिक रहा है" — और 84 किमी दूर ट्रैक्टर लेकर निकल पड़ता है।',
    heroProblem2: 'लेकिन 168 किमी आने-जाने का ₹3,024 डीजल कटने के बाद, मात्र 10 किमी दूर दुबग्गा मंडी में ₹1,089 अधिक शुद्ध मुनाफा बचता!',
    heroFormula: 'शुद्ध मुनाफा = (मंडी भाव × कुल क्विंटल) − (दूरी × 2 × भाड़ा/किमी)',

    // Tabs
    tabRankings: '🏆 शुद्ध मुनाफा रैंकिंग',
    tabWaterfall: '📊 मुनाफा बनाम डीजल चार्ट',
    tabSimulation: '🧪 जज सिमुलेशन लैब',
    tabAdvisor: '🤖 एआई मंडी सलाहकार',
    tabProjections: '📈 राष्ट्रीय मांग डेटा',

    // Controls
    selectCrop: 'फसल चुनें',
    cropQuantity: 'कुल फसल मात्रा',
    bagCount: 'बोरी (50 किग्रा प्रत्येक)',
    freightRate: 'डीजल व भाड़ा दर',
    perKmRoundTrip: '₹/किमी (आना-जाना)',
    qualityTier: 'गुणवत्ता श्रेणी',
    tierStandard: 'मानक (मॉडल भाव)',
    tierLow: 'साधारण (न्यूनतम)',
    tierPremium: 'सुपर (उच्चतम)',

    // Rankings & Winner
    winnerTitle: '#1 सर्वाधिक शुद्ध मुनाफा देने वाली मंडी',
    winnerBadge: 'विजेता मंडी (घर लाएं सबसे ज्यादा पैसा)',
    takeHomeProfit: 'शुद्ध जेब में आने वाला पैसा',
    quotedPrice: 'मंडी में बोला गया भाव',
    grossRevenue: 'फसल का कुल मूल्य',
    freightDeduction: 'आने-जाने का कुल डीजल खर्च',
    distanceLabel: 'एक तरफ की दूरी',
    roundTripLabel: 'आने-जाने की कुल दूरी',
    generateSlip: 'आधिकारिक मंडी पर्ची बनाएं',
    silentMandi: 'इस मंडी ने आज भाव नहीं दिए (शून्य अनुमान गारंटी)',

    // False Economy Trap Alert
    trapAlertTitle: '⚠️ धोखा अलर्ट: झूठे मुनाफे से बचें (FALSE ECONOMY TRAP)',
    trapAlertPrefix: 'दिखावे के अधिक भाव से सावधान!',
    trapAlertSuffix: 'भाव अधिक बता रही है, लेकिन 168 किमी आने-जाने का डीजल काटने के बाद यहां बेचने पर सीधा नुकसान होगा:',
    stayLocalAdvice: 'दुबग्गा मंडी में बेचने पर आपको अधिक शुद्ध नकदी बचेगी।',

    // Waterfall
    waterfallTitle: 'मुनाफा वाटरफॉल: कुल मूल्य बनाम रास्ते का खर्च',
    waterfallSub: 'देखें कैसे दूरी अधिक भाव वाले बाजार का सारा मुनाफा खा जाती है।',
    legendNet: 'शुद्ध बचत (जो आपकी जेब में रहेगी)',
    legendFuel: 'आने-जाने का डीजल (जो सड़क खा गई)',

    // Receipt Modal
    receiptTitle: 'डिजिटल एपीएमसी मंडी पर्ची',
    receiptCert: 'UP-APMC-CERT-2026',
    receiptVerified: 'आधिकारिक डिजिटल मुहर',
    receiptFarmerCopy: 'किसान पासबुक रसीद',
    shareWhatsapp: 'व्हाट्सएप पर भेजें',
    closeModal: 'पर्ची बंद करें',
    voiceReadout: 'आवाज में फैसला सुनें',

    // Simulation Lab
    simTitle: '🧪 लाइव सिमुलेशन लैब (जज महोदय के प्रदर्शन हेतु)',
    simSub: 'नीचे दिए गए किसी भी परिदृश्य पर क्लिक करें और तुरंत देखें रैंकिंग और धोखे का अलर्ट:',
    simBaseline: '1. प्रमाणित मानक भाव',
    simSitapurSurge: '2. सीतापुर में भाव उछाल (+₹160) [धोखा अलर्ट सक्रिय]',
    simUnnaoReports: '3. उन्नाव ने आज भाव दर्ज किए (₹2,310) [मंडी सक्रिय]',
    simDieselHike: '4. डीजल महंगा हुआ (+₹8/किमी) [दूर की मंडियां फेल]',
    simTicker: '5. 10-सेकंड लाइव बोली टिकर [उतार-चढ़ाव सिमुलेशन]',

    // Stats Bar
    bottomBest: 'सर्वोत्तम मंडी:',
    bottomGain: 'अतिरिक्त बचत:',
    quickTicket: 'पर्ची निकालें'
  }
};
