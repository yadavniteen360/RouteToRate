// src/services/agmarknetApi.js
// Real-time integration and diagnostic tester for Data.gov.in / Agmarknet Mandi Daily Price API

export const DEFAULT_GOV_API_KEY = "579b464db66ec23bdd0000011e18303118464d0b45ec568b67d5a98c";
export const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

// District to Mandi ID mapping
const DISTRICT_TO_MANDI_ID = {
  lucknow: "dubagga_lucknow",
  barabanki: "barabanki_naveen",
  sitapur: "sitapur_krishi",
  unnao: "unnao_ganj",
};

// Commodity Name Normalizer for Agmarknet API records
export function mapApiCommodityToId(commodityStr) {
  if (!commodityStr) return null;
  const c = commodityStr.trim().toLowerCase();
  if (c.includes("wheat") || c.includes("gehun") || c.includes("kanak") || c.includes("dara")) {
    return "wheat";
  }
  if (c.includes("potato") || c.includes("aloo") || c.includes("alu")) {
    return "potato";
  }
  if (c.includes("mustard") || c.includes("sarson") || c.includes("rai")) {
    return "mustard";
  }
  return null;
}

/**
 * Diagnostic tool to test Data.gov.in connection, measure latency, and extract live records
 */
export async function testAgmarknetConnection(apiKey = DEFAULT_GOV_API_KEY) {
  const startTime = performance.now();
  const cleanKey = apiKey.trim();
  const proxyUrl = `/api/agmarknet?api-key=${cleanKey}&format=json&filters%5Bstate.keyword%5D=Uttar%20Pradesh&limit=250`;
  const directUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${cleanKey}&format=json&filters%5Bstate.keyword%5D=Uttar%20Pradesh&limit=250`;

  let usedRoute = "Vite Proxy (/api/agmarknet)";
  let res = null;
  let rawJson = null;
  let isCors = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    res = await fetch(proxyUrl, { signal: controller.signal }).catch(() => null);

    if (!res || !res.ok) {
      usedRoute = "Direct (api.data.gov.in)";
      res = await fetch(directUrl, { signal: controller.signal }).catch(() => {
        isCors = true;
        return null;
      });
    }
    clearTimeout(timeout);

    if (res) {
      rawJson = await res.json().catch(() => null);
    }
  } catch (err) {
    console.warn("Connection test error:", err);
  }

  const latency = Math.round(performance.now() - startTime);

  if (rawJson && rawJson.status === "ok") {
    const records = rawJson.records || [];
    const matchedRecords = records.filter((r) =>
      ["lucknow", "barabanki", "sitapur", "unnao"].some(
        (d) => r.district && r.district.toLowerCase().includes(d)
      )
    );

    return {
      success: true,
      apiKeyValid: true,
      httpStatus: 200,
      latencyMs: latency,
      routeUsed: usedRoute,
      totalUpRecords: rawJson.total || records.length,
      matchedCount: matchedRecords.length,
      matchedRecords,
      sampleRecords: records.slice(0, 4),
      diagnostic: `✅ आपकी API Key 100% सक्रिय एवं कार्यशील है! Data.gov.in ने HTTP 200 OK के साथ आज UP से ${rawJson.total || records.length} रिकॉर्ड्स भेजे।`,
    };
  }

  return {
    success: false,
    apiKeyValid: false,
    httpStatus: res ? res.status : 0,
    latencyMs: latency,
    routeUsed: usedRoute,
    isCors,
    diagnostic: isCors
      ? "ब्राउज़र सुरक्षा (CORS): सरकारी सर्वर सीधे वेब ब्राउज़र से कॉल ब्लॉक करता है। ऐप का प्रॉक्सी रूट इसे ठीक कर रहा है।"
      : "सरकारी पोर्टल अनुपलब्ध: स्वचालित 100% ऑफलाइन सुरक्षा सक्रिय है।",
  };
}

/**
 * Fetch real-time Mandi records from Data.gov.in using user's API key
 */
export async function fetchLiveAgmarknetRates(apiKey = DEFAULT_GOV_API_KEY) {
  const cleanKey = apiKey.trim();
  const proxyUrl = `/api/agmarknet?api-key=${cleanKey}&format=json&filters%5Bstate.keyword%5D=Uttar%20Pradesh&limit=250`;
  const directUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${cleanKey}&format=json&filters%5Bstate.keyword%5D=Uttar%20Pradesh&limit=250`;

  let responseData = null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let res = await fetch(proxyUrl, { signal: controller.signal }).catch(() => null);

    if (!res || !res.ok) {
      res = await fetch(directUrl, { signal: controller.signal }).catch(() => null);
    }
    clearTimeout(timeout);

    if (res && res.ok) {
      responseData = await res.json();
    }
  } catch (err) {
    console.warn("Agmarknet live fetch error:", err);
  }

  if (!responseData || !responseData.records) {
    return {
      success: false,
      message: "सरकारी सर्वर ऑफलाइन है। स्थानीय प्रमाणित डेटा सक्रिय है।",
      timestamp: new Date().toISOString(),
      recordsCount: 0,
      matchedRates: {},
    };
  }

  const records = responseData.records;
  const matchedRates = {};
  const matchedLiveList = [];

  records.forEach((rec) => {
    const dist = rec.district ? rec.district.trim().toLowerCase() : "";
    const mandiId = DISTRICT_TO_MANDI_ID[dist];
    if (!mandiId) return;

    const commodityId = mapApiCommodityToId(rec.commodity);
    if (!commodityId) return;

    const modalPrice = Math.round(Number(rec.modal_price));
    const minPrice = Math.round(Number(rec.min_price));
    const maxPrice = Math.round(Number(rec.max_price));

    if (!modalPrice || isNaN(modalPrice)) return;

    if (!matchedRates[mandiId]) {
      matchedRates[mandiId] = {};
    }

    const rateEntry = {
      modal_price: modalPrice,
      min_price: minPrice || modalPrice,
      max_price: maxPrice || modalPrice,
      reported_date: rec.arrival_date || new Date().toISOString().split("T")[0],
      variety: rec.variety || "FAQ",
      market_name: rec.market,
      source: "Data.gov.in (Agmarknet Live)",
    };

    matchedRates[mandiId][commodityId] = rateEntry;
    matchedLiveList.push({
      mandiId,
      district: rec.district,
      market: rec.market,
      commodity: rec.commodity,
      modal_price: modalPrice,
      arrival_date: rec.arrival_date,
    });
  });

  return {
    success: true,
    message: `लाइव सिंक सफल: आपकी API Key से UP के ${responseData.total || records.length} रिकॉर्ड्स लोड हुए।`,
    timestamp: new Date().toISOString(),
    totalUpRecords: responseData.total || records.length,
    matchedMandisCount: Object.keys(matchedRates).length,
    matchedRates,
    matchedLiveList,
    recordsSample: records.slice(0, 5),
  };
}
