/**
 * RouteToRate - Mandi Dataset (Uttar Pradesh Region)
 * Baseline Reference Center: Dubagga Naveen Mandi (Lucknow)
 */

export const MANDIS_DATA = [
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
    description: 'Local baseline reference center (10 km from farm)',
    descriptionHi: 'स्थानीय संदर्भ केंद्र (खेत से मात्र 10 किमी)',
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
    isBaseline: false,
    contactNumber: '+91 5248 221 405',
    description: 'Mid-range market with steady daily trading volumes',
    descriptionHi: 'मध्यम दूरी का बाजार, स्थिर दैनिक आवक',
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
    isBaseline: false,
    isTrapCandidate: true,
    contactNumber: '+91 5862 242 110',
    description: 'Distant mandi often quoting misleading price premiums',
    descriptionHi: 'दूरस्थ मंडी, अक्सर भ्रामक अधिक भाव दर्शाती है',
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
    isBaseline: false,
    contactNumber: '+91 515 282 0441',
    description: 'Intermittent reporting APMC (Zero Guesswork Guarantee)',
    descriptionHi: 'अनियमित रिपोर्टिंग मंडी (शून्य अनुमान गारंटी)',
    prices: {
      Wheat: { modalPrice: null, minPrice: null, maxPrice: null, arrivalsTonnes: 0, variety: 'N/A', reported: false }, // Silent Skip-Day
      Potato: { modalPrice: 1390, minPrice: 1280, maxPrice: 1480, arrivalsTonnes: 250, variety: 'Local Mix', reported: true },
      Mustard: { modalPrice: 5420, minPrice: 5050, maxPrice: 5680, arrivalsTonnes: 140, variety: 'Black Bold', reported: true }
    }
  }
];

export const COMMODITIES = [
  {
    id: 'Wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूं',
    emoji: '🌾',
    defaultVariety: 'Dara / Desi',
    aliases: ['wheat', 'gehun', 'kanak', 'dara']
  },
  {
    id: 'Potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    emoji: '🥔',
    defaultVariety: 'Jyoti / Pukhraj',
    aliases: ['potato', 'aloo', 'jyoti', 'pukhraj']
  },
  {
    id: 'Mustard',
    nameEn: 'Mustard',
    nameHi: 'सरसों',
    emoji: '🌼',
    defaultVariety: 'Black / Hybrid',
    aliases: ['mustard', 'sarson', 'rai']
  }
];
