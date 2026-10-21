// src/data/mandis.js
// Offline-first regional Uttar Pradesh Mandi dataset and normalization logic

export const REFERENCE_LOCATION = {
  nameHi: "लखनऊ ग्रामीण संदर्भ केंद्र (दुबग्गा क्षेत्र)",
  nameEn: "Lucknow Rural Reference Hub (Dubagga Zone)",
  district: "Lucknow",
  state: "Uttar Pradesh",
};

export const VEHICLE_PRESETS = [
  {
    id: "tata_ace",
    nameHi: "छोटा हाथी / पिकअप",
    nameEn: "Pickup Truck (Tata Ace)",
    capacity: 15,
    ratePerKm: 12,
    descHi: "15 क्विंटल क्षमता • ₹12/किमी",
    descEn: "15 Quintals • ₹12/km",
    icon: "Truck",
  },
  {
    id: "tractor",
    nameHi: "ट्रैक्टर-ट्रॉली (मानक)",
    nameEn: "Tractor-Trolley (Standard)",
    capacity: 35,
    ratePerKm: 18,
    descHi: "35 क्विंटल क्षमता • ₹18/किमी (मानक)",
    descEn: "35 Quintals • ₹18/km (Standard)",
    icon: "Tractor",
    isDefault: true,
  },
  {
    id: "mini_truck",
    nameHi: "आयशर / मिनी ट्रक",
    nameEn: "Medium Truck (Eicher)",
    capacity: 80,
    ratePerKm: 26,
    descHi: "80 क्विंटल क्षमता • ₹26/किमी",
    descEn: "80 Quintals • ₹26/km",
    icon: "Boxes",
  },
];

export const COMMODITIES = [
  {
    id: "wheat",
    nameHi: "गेहूं",
    nameEn: "Wheat",
    unitHi: "क्विंटल (100 किग्रा)",
    unitEn: "Quintal (100 kg)",
    aliases: ["wheat", "wheat(desi)", "gehun", "kanak", "gehun desi", "dara", "गेहूं", "कनक"],
    emoji: "🌾",
    standardVarietyHi: "देसी / दड़ा",
    standardVarietyEn: "Desi / Dara",
  },
  {
    id: "potato",
    nameHi: "आलू",
    nameEn: "Potato",
    unitHi: "क्विंटल (100 किग्रा)",
    unitEn: "Quintal (100 kg)",
    aliases: ["potato", "aloo", "desi aloo", "jyoti", "pukhraj", "alu", "आलू"],
    emoji: "🥔",
    standardVarietyHi: "पुखराज / ज्योति",
    standardVarietyEn: "Pukhraj / Jyoti",
  },
  {
    id: "mustard",
    nameHi: "सरसों",
    nameEn: "Mustard",
    unitHi: "क्विंटल (100 किग्रा)",
    unitEn: "Quintal (100 kg)",
    aliases: ["mustard", "sarson", "rai", "mustard seed", "kali sarson", "peeli sarson", "सरसों", "राई"],
    emoji: "🌼",
    standardVarietyHi: "काली / हाइब्रिड",
    standardVarietyEn: "Black / Hybrid",
  },
];

// Commodity spelling normalizer to handle messy Gov API / local trader variations
export function normalizeCommodity(input) {
  if (!input) return "wheat";
  const cleaned = input.trim().toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, "");
  for (const c of COMMODITIES) {
    if (c.id === cleaned || c.nameHi === cleaned || c.nameEn.toLowerCase() === cleaned) return c.id;
    for (const alias of c.aliases) {
      const cleanAlias = alias.replace(/[^a-z0-9\u0900-\u097F]/g, "");
      if (cleaned.includes(cleanAlias) || cleanAlias.includes(cleaned)) {
        return c.id;
      }
    }
  }
  return "wheat";
}

// 4 Regional Uttar Pradesh Mandis
// Strict data integrity:
// - rates.mustard.today = null for Barabanki (Simulates realistic skip-day)
// - rates.wheat.today = null for Unnao (Simulates realistic skip-day)
export const MANDIS_DATA = [
  {
    id: "dubagga_lucknow",
    nameHi: "दुबग्गा नवीन मंडी, लखनऊ",
    nameEn: "Dubagga Naveen Mandi, Lucknow",
    districtHi: "लखनऊ",
    districtEn: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    distanceKm: 10,
    isLocalBaseline: true,
    operatingHours: "05:00 - 13:00",
    phone: "+91 522 2419800",
    contactPerson: "मंडी सचिव कार्यालय (APMC Office)",
    rates: {
      wheat: {
        today: {
          modal_price: 2275,
          min_price: 2150,
          max_price: 2350,
          reported_date: "2026-10-21",
          arrival_qtl: 420,
        },
        previous: {
          modal_price: 2230,
        },
        history: [
          { date: "2026-10-21", modal: 2275, min: 2150, max: 2350 },
          { date: "2026-10-20", modal: 2230, min: 2120, max: 2310 },
          { date: "2026-10-19", modal: 2210, min: 2100, max: 2290 },
          { date: "2026-10-18", modal: 2240, min: 2140, max: 2320 },
        ],
      },
      potato: {
        today: {
          modal_price: 1420,
          min_price: 1250,
          max_price: 1550,
          reported_date: "2026-10-21",
          arrival_qtl: 850,
        },
        previous: {
          modal_price: 1450,
        },
        history: [
          { date: "2026-10-21", modal: 1420, min: 1250, max: 1550 },
          { date: "2026-10-20", modal: 1450, min: 1280, max: 1580 },
          { date: "2026-10-19", modal: 1480, min: 1300, max: 1600 },
          { date: "2026-10-18", modal: 1440, min: 1260, max: 1560 },
        ],
      },
      mustard: {
        today: {
          modal_price: 5450,
          min_price: 5100,
          max_price: 5700,
          reported_date: "2026-10-21",
          arrival_qtl: 180,
        },
        previous: {
          modal_price: 5380,
        },
        history: [
          { date: "2026-10-21", modal: 5450, min: 5100, max: 5700 },
          { date: "2026-10-20", modal: 5380, min: 5050, max: 5640 },
          { date: "2026-10-19", modal: 5400, min: 5080, max: 5650 },
          { date: "2026-10-18", modal: 5350, min: 5000, max: 5600 },
        ],
      },
    },
  },
  {
    id: "barabanki_naveen",
    nameHi: "बाराबंकी नवीन मंडी",
    nameEn: "Barabanki Naveen Mandi",
    districtHi: "बाराबंकी",
    districtEn: "Barabanki",
    district: "Barabanki",
    state: "Uttar Pradesh",
    distanceKm: 32,
    isLocalBaseline: false,
    operatingHours: "05:00 - 13:00",
    phone: "+91 5248 221040",
    contactPerson: "मंडी कंट्रोल रूम (Control Room)",
    rates: {
      wheat: {
        today: {
          modal_price: 2290,
          min_price: 2180,
          max_price: 2360,
          reported_date: "2026-10-21",
          arrival_qtl: 310,
        },
        previous: {
          modal_price: 2260,
        },
        history: [
          { date: "2026-10-21", modal: 2290, min: 2180, max: 2360 },
          { date: "2026-10-20", modal: 2260, min: 2150, max: 2320 },
          { date: "2026-10-19", modal: 2250, min: 2140, max: 2300 },
          { date: "2026-10-18", modal: 2235, min: 2120, max: 2280 },
        ],
      },
      potato: {
        today: {
          modal_price: 1490,
          min_price: 1320,
          max_price: 1600,
          reported_date: "2026-10-21",
          arrival_qtl: 1100,
        },
        previous: {
          modal_price: 1460,
        },
        history: [
          { date: "2026-10-21", modal: 1490, min: 1320, max: 1600 },
          { date: "2026-10-20", modal: 1460, min: 1300, max: 1570 },
          { date: "2026-10-19", modal: 1430, min: 1280, max: 1550 },
          { date: "2026-10-18", modal: 1410, min: 1250, max: 1520 },
        ],
      },
      mustard: {
        // Intentionally null for testing honest missing-data state!
        today: null,
        previous: {
          modal_price: 5410,
        },
        history: [
          { date: "2026-10-20", modal: 5410, min: 5120, max: 5650 },
          { date: "2026-10-19", modal: 5390, min: 5100, max: 5600 },
          { date: "2026-10-17", modal: 5360, min: 5050, max: 5580 },
        ],
      },
    },
  },
  {
    id: "sitapur_krishi",
    nameHi: "सीतापुर कृषि उत्पादन मंडी",
    nameEn: "Sitapur Krishi Utpadan Mandi",
    districtHi: "सीतापुर",
    districtEn: "Sitapur",
    district: "Sitapur",
    state: "Uttar Pradesh",
    distanceKm: 84,
    isLocalBaseline: false,
    operatingHours: "05:00 - 13:00",
    phone: "+91 5862 243122",
    contactPerson: "मंडी हेल्पडेस्क (Helpdesk)",
    rates: {
      wheat: {
        // Quotes ₹45 higher than Dubagga (2320 vs 2275), but 84km distance causes net loss!
        today: {
          modal_price: 2320,
          min_price: 2200,
          max_price: 2400,
          reported_date: "2026-10-21",
          arrival_qtl: 560,
        },
        previous: {
          modal_price: 2340,
        },
        history: [
          { date: "2026-10-21", modal: 2320, min: 2200, max: 2400 },
          { date: "2026-10-20", modal: 2340, min: 2220, max: 2420 },
          { date: "2026-10-19", modal: 2330, min: 2210, max: 2410 },
          { date: "2026-10-18", modal: 2315, min: 2190, max: 2390 },
        ],
      },
      potato: {
        today: {
          modal_price: 1460,
          min_price: 1300,
          max_price: 1580,
          reported_date: "2026-10-21",
          arrival_qtl: 720,
        },
        previous: {
          modal_price: 1430,
        },
        history: [
          { date: "2026-10-21", modal: 1460, min: 1300, max: 1580 },
          { date: "2026-10-20", modal: 1430, min: 1280, max: 1550 },
          { date: "2026-10-19", modal: 1445, min: 1290, max: 1560 },
          { date: "2026-10-18", modal: 1420, min: 1270, max: 1530 },
        ],
      },
      mustard: {
        today: {
          modal_price: 5520,
          min_price: 5250,
          max_price: 5850,
          reported_date: "2026-10-21",
          arrival_qtl: 290,
        },
        previous: {
          modal_price: 5560,
        },
        history: [
          { date: "2026-10-21", modal: 5520, min: 5250, max: 5850 },
          { date: "2026-10-20", modal: 5560, min: 5290, max: 5890 },
          { date: "2026-10-19", modal: 5510, min: 5240, max: 5840 },
          { date: "2026-10-18", modal: 5490, min: 5200, max: 5800 },
        ],
      },
    },
  },
  {
    id: "unnao_ganj",
    nameHi: "उन्नाव गंज मंडी",
    nameEn: "Unnao Ganj Mandi",
    districtHi: "उन्नाव",
    districtEn: "Unnao",
    district: "Unnao",
    state: "Uttar Pradesh",
    distanceKm: 65,
    isLocalBaseline: false,
    operatingHours: "05:00 - 13:00",
    phone: "+91 515 2820311",
    contactPerson: "मंडी सचिव कार्यालय (Office)",
    rates: {
      wheat: {
        // Intentionally null for testing honest missing-data state!
        today: null,
        previous: {
          modal_price: 2250,
        },
        history: [
          { date: "2026-10-20", modal: 2250, min: 2130, max: 2320 },
          { date: "2026-10-19", modal: 2240, min: 2120, max: 2300 },
          { date: "2026-10-18", modal: 2260, min: 2140, max: 2330 },
        ],
      },
      potato: {
        today: {
          modal_price: 1440,
          min_price: 1280,
          max_price: 1540,
          reported_date: "2026-10-21",
          arrival_qtl: 910,
        },
        previous: {
          modal_price: 1450,
        },
        history: [
          { date: "2026-10-21", modal: 1440, min: 1280, max: 1540 },
          { date: "2026-10-20", modal: 1450, min: 1290, max: 1560 },
          { date: "2026-10-19", modal: 1420, min: 1270, max: 1530 },
          { date: "2026-10-18", modal: 1400, min: 1250, max: 1510 },
        ],
      },
      mustard: {
        today: {
          modal_price: 5480,
          min_price: 5200,
          max_price: 5750,
          reported_date: "2026-10-21",
          arrival_qtl: 140,
        },
        previous: {
          modal_price: 5420,
        },
        history: [
          { date: "2026-10-21", modal: 5480, min: 5200, max: 5750 },
          { date: "2026-10-20", modal: 5420, min: 5150, max: 5690 },
          { date: "2026-10-19", modal: 5440, min: 5170, max: 5710 },
          { date: "2026-10-18", modal: 5390, min: 5120, max: 5650 },
        ],
      },
    },
  },
];

// Helper to determine if Regional Morning Auction is open (5:00 AM to 1:00 PM)
export function isAuctionOpen(now = new Date()) {
  const hours = now.getHours();
  return hours >= 5 && hours < 13;
}
