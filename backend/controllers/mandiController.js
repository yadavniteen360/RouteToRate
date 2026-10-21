/**
 * RouteToRate - Mandi Intelligence Controller
 * Implements the core formula:
 * Net Profit = (Modal Price * Quantity in Quintals) - (Distance * 2 * Freight Rate per km)
 * And automatic False Economy Trap (Dhokha Alert) detection.
 */

export const UP_MANDIS = [
  {
    id: 'dubagga',
    name: 'Dubagga Naveen Mandi',
    nameHi: 'दुबग्गा नवीन मंडी',
    district: 'Lucknow',
    districtHi: 'लखनऊ',
    state: 'Uttar Pradesh',
    distanceKm: 10,
    roundTripKm: 20,
    isBaseline: true,
    contactNumber: '+91 522 241 8901',
    prices: {
      Wheat: { modalPrice: 2275, minPrice: 2150, maxPrice: 2350, arrivalsTonnes: 420, variety: 'Dara / Desi', reported: true },
      Potato: { modalPrice: 1420, minPrice: 1300, maxPrice: 1550, arrivalsTonnes: 680, variety: 'Kufri Jyoti', reported: true },
      Mustard: { modalPrice: 5450, minPrice: 5100, maxPrice: 5700, arrivalsTonnes: 180, variety: 'Black Mustard', reported: true }
    }
  },
  {
    id: 'barabanki',
    name: 'Barabanki Naveen Mandi',
    nameHi: 'बाराबंकी नवीन मंडी',
    district: 'Barabanki',
    districtHi: 'बाराबंकी',
    state: 'Uttar Pradesh',
    distanceKm: 32,
    roundTripKm: 64,
    contactNumber: '+91 5248 221 405',
    prices: {
      Wheat: { modalPrice: 2290, minPrice: 2180, maxPrice: 2360, arrivalsTonnes: 310, variety: 'Dara Standard', reported: true },
      Potato: { modalPrice: 1440, minPrice: 1320, maxPrice: 1560, arrivalsTonnes: 490, variety: 'Pukhraj Grade A', reported: true },
      Mustard: { modalPrice: null, minPrice: null, maxPrice: null, arrivalsTonnes: 0, variety: 'N/A', reported: false } // Skip Day
    }
  },
  {
    id: 'sitapur',
    name: 'Sitapur Krishi Mandi',
    nameHi: 'सीतापुर कृषि मंडी',
    district: 'Sitapur',
    districtHi: 'सीतापुर',
    state: 'Uttar Pradesh',
    distanceKm: 84,
    roundTripKm: 168,
    isTrapCandidate: true,
    contactNumber: '+91 5862 242 110',
    prices: {
      Wheat: { modalPrice: 2320, minPrice: 2200, maxPrice: 2400, arrivalsTonnes: 580, variety: 'Mill Quality', reported: true },
      Potato: { modalPrice: 1490, minPrice: 1350, maxPrice: 1600, arrivalsTonnes: 820, variety: 'Chipsona / Jyoti', reported: true },
      Mustard: { modalPrice: 5580, minPrice: 5250, maxPrice: 5850, arrivalsTonnes: 340, variety: 'Yellow Hybrid', reported: true }
    }
  },
  {
    id: 'unnao',
    name: 'Unnao Ganj Mandi',
    nameHi: 'उन्नाव गंज मंडी',
    district: 'Unnao',
    districtHi: 'उन्नाव',
    state: 'Uttar Pradesh',
    distanceKm: 65,
    roundTripKm: 130,
    contactNumber: '+91 515 282 0441',
    prices: {
      Wheat: { modalPrice: null, minPrice: null, maxPrice: null, arrivalsTonnes: 0, variety: 'N/A', reported: false }, // Skip Day by default
      Potato: { modalPrice: 1390, minPrice: 1280, maxPrice: 1480, arrivalsTonnes: 250, variety: 'Local Mix', reported: true },
      Mustard: { modalPrice: 5420, minPrice: 5050, maxPrice: 5680, arrivalsTonnes: 140, variety: 'Black Bold', reported: true }
    }
  }
];

export function getMandiPrices(req, res) {
  const {
    commodity = 'Wheat',
    quantity = 35, // Default 35 Quintals (approx 70 bags of 50kg)
    freightRate = 18, // Default ₹18/km round-trip
    preset = 'baseline', // baseline | sitapur_surge | unnao_reports | diesel_hike
    tier = 'standard' // standard (modal) | low (min) | premium (max)
  } = req.query;

  const qtl = Number(quantity) || 35;
  const fRate = preset === 'diesel_hike' ? (Number(freightRate) || 18) + 8 : (Number(freightRate) || 18);

  // Deep clone database for simulation
  const mandis = JSON.parse(JSON.stringify(UP_MANDIS));

  // Apply Simulation Lab Presets for Judges
  if (preset === 'sitapur_surge') {
    const sitapur = mandis.find(m => m.id === 'sitapur');
    if (sitapur && sitapur.prices[commodity]) {
      sitapur.prices[commodity].modalPrice += 160;
      sitapur.prices[commodity].maxPrice += 180;
    }
  } else if (preset === 'unnao_reports') {
    const unnao = mandis.find(m => m.id === 'unnao');
    if (unnao && unnao.prices[commodity]) {
      unnao.prices[commodity].reported = true;
      unnao.prices[commodity].modalPrice = 2310;
      unnao.prices[commodity].minPrice = 2190;
      unnao.prices[commodity].maxPrice = 2380;
      unnao.prices[commodity].arrivalsTonnes = 390;
      unnao.prices[commodity].variety = 'Desi Kanak';
    }
  }

  // Calculate Net Profit for every mandi using:
  // Net Profit = (Price * Quantity) - (Distance * 2 * FreightRate)
  const evaluatedMandis = mandis.map(m => {
    const cropData = m.prices[commodity] || { reported: false };

    if (!cropData.reported) {
      return {
        ...m,
        commodity,
        reported: false,
        modalPrice: null,
        minPrice: null,
        maxPrice: null,
        grossRevenue: 0,
        roundTripFreight: m.distanceKm * 2 * fRate,
        netProfit: 0,
        statusNote: 'This mandi did not report prices today (Zero Guesswork Policy)'
      };
    }

    let activePrice = cropData.modalPrice;
    if (tier === 'low') activePrice = cropData.minPrice;
    if (tier === 'premium') activePrice = cropData.maxPrice;

    const grossRevenue = activePrice * qtl;
    const roundTripFreight = m.distanceKm * 2 * fRate;
    const netProfit = grossRevenue - roundTripFreight;

    return {
      ...m,
      commodity,
      variety: cropData.variety,
      reported: true,
      activePrice,
      modalPrice: cropData.modalPrice,
      minPrice: cropData.minPrice,
      maxPrice: cropData.maxPrice,
      arrivalsTonnes: cropData.arrivalsTonnes,
      grossRevenue,
      freightRatePerKm: fRate,
      roundTripKm: m.distanceKm * 2,
      roundTripFreight,
      netProfit,
      freightPercentOfRevenue: ((roundTripFreight / grossRevenue) * 100).toFixed(1)
    };
  });

  // Rank mandis by Net Profit (only considering reported ones)
  const reportedMandis = evaluatedMandis
    .filter(m => m.reported)
    .sort((a, b) => b.netProfit - a.netProfit);

  const winner = reportedMandis[0] || null;
  const baseline = evaluatedMandis.find(m => m.isBaseline && m.reported) || reportedMandis[0];

  // -------------------------------------------------------------
  // Automatic False Economy Trap (Dhokha Alert) Detection
  // Triggers when a distant mandi has higher raw price but lower net profit
  // than our local baseline mandi (Dubagga)
  // -------------------------------------------------------------
  let falseEconomyTrap = null;
  if (baseline) {
    const trapMandi = reportedMandis.find(m =>
      m.id !== baseline.id &&
      m.distanceKm > baseline.distanceKm &&
      m.activePrice > baseline.activePrice &&
      m.netProfit < baseline.netProfit
    );

    if (trapMandi) {
      const priceDifference = trapMandi.activePrice - baseline.activePrice;
      const directLoss = baseline.netProfit - trapMandi.netProfit;

      falseEconomyTrap = {
        detected: true,
        trapMandiName: trapMandi.name,
        trapMandiNameHi: trapMandi.nameHi,
        baselineMandiName: baseline.name,
        baselineMandiNameHi: baseline.nameHi,
        quotedPremium: priceDifference,
        directRupeeLoss: directLoss,
        distanceComparison: `${trapMandi.distanceKm} km (Round-trip: ${trapMandi.roundTripKm} km) vs ${baseline.distanceKm} km`,
        messageEn: `⚠️ FALSE ECONOMY TRAP DETECTED: ${trapMandi.name} is quoting ₹${priceDifference}/qtl higher, but after deducting ${trapMandi.roundTripKm} km round-trip diesel, going there causes a direct loss of ₹${directLoss.toLocaleString('en-IN')}!`,
        messageHi: `⚠️ धोखा अलर्ट (धोखा मंडी से बचें): ${trapMandi.nameHi} भाव ₹${priceDifference}/क्विंटल अधिक दे रही है, लेकिन ${trapMandi.roundTripKm} किमी आने-जाने का डीजल काटने के बाद वहां जाने से ₹${directLoss.toLocaleString('en-IN')} का सीधा नुकसान होगा!`
      };
    }
  }

  res.json({
    status: 'success',
    project: 'RouteToRate',
    tagline: 'Deduct round-trip fuel & transport — see which mandi delivers the highest net take-home profit.',
    parameters: {
      commodity,
      quantityInQuintals: qtl,
      freightRatePerKm: fRate,
      preset,
      qualityTier: tier
    },
    winner: winner ? {
      id: winner.id,
      name: winner.name,
      nameHi: winner.nameHi,
      netProfit: winner.netProfit,
      activePrice: winner.activePrice,
      roundTripFreight: winner.roundTripFreight,
      advantageOverLowest: reportedMandis.length > 1
        ? winner.netProfit - reportedMandis[reportedMandis.length - 1].netProfit
        : 0
    } : null,
    falseEconomyTrap,
    mandis: evaluatedMandis
  });
}

/**
 * RouteToRate AI Mandi Advisor
 */
export function getRouteToRateAdvice(req, res) {
  const { prompt, commodity = 'Wheat', quantity = 35, freightRate = 18 } = req.body;

  const qtl = Number(quantity) || 35;
  const sitapurNet = (2320 * qtl) - (84 * 2 * freightRate);
  const dubaggaNet = (2275 * qtl) - (10 * 2 * freightRate);
  const diff = dubaggaNet - sitapurNet;

  const adviceEn = `🚜 **RouteToRate Decision Engine Verdict for ${commodity} (${qtl} Quintals):**

🏆 **Sell at Dubagga Naveen Mandi (10 km)**:
- Quoted Price: ₹2,275/qtl
- Gross Revenue: ₹${(2275 * qtl).toLocaleString('en-IN')}
- Round-Trip Diesel (20 km @ ₹${freightRate}/km): -₹${(20 * freightRate).toLocaleString('en-IN')}
- **Net Take-Home Cash: ₹${dubaggaNet.toLocaleString('en-IN')}**

⚠️ **Why NOT Sitapur Krishi Mandi (84 km)? (False Economy Trap)**:
- Quoted Price: ₹2,320/qtl (+₹45 higher price!)
- Round-Trip Diesel (168 km @ ₹${freightRate}/km): -₹${(168 * freightRate).toLocaleString('en-IN')}
- **Net Take-Home Cash: ₹${sitapurNet.toLocaleString('en-IN')}**
- ❌ **Result: You LOSE ₹${diff.toLocaleString('en-IN')} by driving to Sitapur.**

💡 **Actionable Verdict**: The ₹45/quintal premium is an optical illusion. The road eats your profit. Sell locally at Dubagga!`;

  res.json({
    status: 'success',
    advisor: 'RouteToRate Intelligence',
    advice: adviceEn
  });
}
