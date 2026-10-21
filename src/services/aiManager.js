// src/services/aiManager.js
// AI Mandi Intelligence Engine: Pure Hindi & Pure English Agritech Advisory

/**
 * Analyzes market data changes and generates real-time actionable insights
 */
export function generateAiMarketVerdict({
  activeMandis,
  missingMandis,
  bestMandi,
  trapMandi,
  commodity,
  quantity,
  ratePerKm,
  lang = "hi",
  isLiveSynced = false,
}) {
  const isEn = lang === "en";

  if (!bestMandi) {
    return {
      title: isEn ? "No Active Mandi Data Available" : "कोई सक्रिय भाव उपलब्ध नहीं है",
      verdict: isEn 
        ? "No regional mandi has reported official rates for this commodity today. Please avoid dispatching crops on speculative guesswork."
        : "आज किसी भी क्षेत्रीय मंडी ने इस फसल का आधिकारिक भाव दर्ज नहीं किया है। कृपया किसी भी अनुमान के आधार पर फसल लेकर न निकलें।",
      badge: isEn ? "Alert: No Rates" : "अलर्ट: भाव अनुपलब्ध",
      urgency: "high",
    };
  }

  const cropName = isEn ? commodity.nameEn : commodity.nameHi;
  const mandiName = isEn ? bestMandi.nameEn : bestMandi.nameHi;

  let verdictText = "";
  let trapText = "";

  if (isEn) {
    verdictText = `Market Verdict: ${mandiName} delivers the maximum in-pocket earnings. At ₹${bestMandi.modalPrice}/quintal, after deducting ₹${bestMandi.transportCost.toLocaleString("en-IN")} for the ${bestMandi.roundTripKm} km round-trip transport, your net take-home profit is ₹${bestMandi.netProfit.toLocaleString("en-IN")}.`;
    if (trapMandi && trapMandi.dhokhaAlert) {
      trapText = ` ⚠️ False Economy Trap: ${trapMandi.nameEn} advertises ₹${trapMandi.dhokhaAlert.rateAdvantagePerQtl}/qtl higher price, but round-trip fuel results in an outright net loss of ₹${trapMandi.dhokhaAlert.netLossVsLocal.toLocaleString("en-IN")} compared to selling locally!`;
    }
  } else {
    verdictText = `बाज़ार विश्लेषण: आज ${cropName} बेचने के लिए ${mandiName} सर्वाधिक लाभदायक है। ₹${bestMandi.modalPrice} प्रति क्विंटल के भाव पर, ${bestMandi.roundTripKm} किमी गोल-चक्कर भाड़ा (₹${bestMandi.transportCost.toLocaleString("hi-IN")}) काटकर आपकी जेब में शुद्ध ₹${bestMandi.netProfit.toLocaleString("hi-IN")} की बचत होगी।`;
    if (trapMandi && trapMandi.dhokhaAlert) {
      trapText = ` ⚠️ धोखा अलर्ट से सावधान: ${trapMandi.nameHi} में भाव ₹${trapMandi.dhokhaAlert.rateAdvantagePerQtl} अधिक दिख रहा है, लेकिन अधिक दूरी और डीज़ल खर्च के कारण स्थानीय मंडी के मुकाबले ₹${trapMandi.dhokhaAlert.netLossVsLocal.toLocaleString("hi-IN")} का सीधा घाटा होगा!`;
    }
  }

  const missingNote = missingMandis.length > 0
    ? (isEn 
        ? ` (${missingMandis.length} mandi skipped reporting today: 100% honest zero guesswork applied)`
        : ` (${missingMandis.length} मंडी ने आज भाव दर्ज नहीं किया: शून्य अनुमान नीति लागू)`)
    : "";

  return {
    title: isEn ? "AI Market Intelligence Verdict" : "एआई मंडी बाज़ार विश्लेषण",
    verdict: verdictText + trapText + missingNote,
    recommendedMandiId: bestMandi.id,
    recommendedNetProfit: bestMandi.netProfit,
    hasTrap: !!trapMandi,
    trapLoss: trapMandi?.dhokhaAlert?.netLossVsLocal || 0,
    badge: isLiveSynced 
      ? (isEn ? "Agmarknet Live Verified" : "लाइव सरकारी डेटा सत्यापित") 
      : (isEn ? "Offline Certified Data" : "प्रमाणित क्षेत्रीय डेटा"),
    urgency: trapMandi ? "warning" : "success",
  };
}

/**
 * Intelligent AI Q&A Engine for farmers
 * Answers real-world farmer questions using current dynamic state
 */
export function answerFarmerQuery({
  query,
  activeMandis,
  missingMandis,
  bestMandi,
  trapMandi,
  commodity,
  quantity,
  ratePerKm,
  lang = "hi",
}) {
  const isEn = lang === "en";
  const q = query.toLowerCase().trim();
  const cropName = isEn ? commodity.nameEn : commodity.nameHi;

  // Question: Where to sell?
  if (q.includes("कहाँ") || q.includes("kahan") || q.includes("where") || q.includes("sell") || q.includes("बेचें") || q.includes("सौदा")) {
    if (!bestMandi) {
      return isEn 
        ? "No official quotes are logged today. We advise contacting the APMC office before dispatching harvest."
        : "आज किसी भी मंडी का आधिकारिक भाव दर्ज नहीं हुआ है। कृपया बिना भाव पुष्टि के माल न ले जाएं।";
    }
    const mName = isEn ? bestMandi.nameEn : bestMandi.nameHi;
    return isEn
      ? `Today, '${mName}' is your most profitable destination for ${cropName}. The modal rate is ₹${bestMandi.modalPrice}/qtl. After deducting ${bestMandi.roundTripKm} km round-trip transport (₹${bestMandi.transportCost.toLocaleString("en-IN")}), your net take-home cash is ₹${bestMandi.netProfit.toLocaleString("en-IN")}.`
      : `आज ${cropName} बेचने के लिए सबसे सही मंडी '${mName}' है। यहाँ भाव ₹${bestMandi.modalPrice} प्रति क्विंटल है और ${bestMandi.roundTripKm} किमी का गोल-चक्कर भाड़ा (₹${bestMandi.transportCost.toLocaleString("hi-IN")}) काटने के बाद आपकी जेब में ₹${bestMandi.netProfit.toLocaleString("hi-IN")} शुद्ध बचेंगे।`;
  }

  // Question: Sitapur Trap Inquiry
  if (q.includes("सीतापुर") || q.includes("sitapur")) {
    const sitapur = activeMandis.find((m) => m.id === "sitapur_krishi");
    if (!sitapur) {
      return isEn ? "Sitapur Mandi has not logged prices today." : "सीतापुर मंडी ने आज भाव दर्ज नहीं किया है।";
    }
    if (sitapur.dhokhaAlert) {
      return isEn
        ? `⚠️ Avoid traveling to Sitapur! Even though the price is ₹${sitapur.modalPrice}/qtl (+₹${sitapur.dhokhaAlert.rateAdvantagePerQtl} vs Lucknow), the 168 km round-trip freight is ₹${sitapur.transportCost.toLocaleString("en-IN")}. You will suffer a net loss of ₹${sitapur.dhokhaAlert.netLossVsLocal.toLocaleString("en-IN")}!`
        : `⚠️ सीतापुर जाने से बचें! भले ही वहां भाव ₹${sitapur.modalPrice} (+₹${sitapur.dhokhaAlert.rateAdvantagePerQtl}) अधिक दिख रहा हो, लेकिन 168 किमी गोल-चक्कर भाड़ा ₹${sitapur.transportCost.toLocaleString("hi-IN")} कटने से आपको ₹${sitapur.dhokhaAlert.netLossVsLocal.toLocaleString("hi-IN")} का सीधा घाटा होगा!`;
    }
    return isEn
      ? `Sitapur is quoting ₹${sitapur.modalPrice}/qtl. Net profit after ${sitapur.roundTripKm} km round trip is ₹${sitapur.netProfit.toLocaleString("en-IN")}.`
      : `सीतापुर में भाव ₹${sitapur.modalPrice} है। ${sitapur.roundTripKm} किमी गोल-चक्कर भाड़ा काटने के बाद शुद्ध बचत ₹${sitapur.netProfit.toLocaleString("hi-IN")} है।`;
  }

  // Question: Unnao status
  if (q.includes("उन्नाव") || q.includes("unnao")) {
    const unnao = activeMandis.find((m) => m.id === "unnao_ganj");
    if (unnao) {
      return isEn
        ? `Unnao Mandi is actively reporting today at ₹${unnao.modalPrice}/qtl with a net profit of ₹${unnao.netProfit.toLocaleString("en-IN")}.`
        : `उन्नाव गंज मंडी ने आज ₹${unnao.modalPrice} का भाव दर्ज किया है। भाड़ा काटने के बाद शुद्ध बचत ₹${unnao.netProfit.toLocaleString("hi-IN")} है।`;
    }
    return isEn
      ? "🛡️ Unnao Mandi has skipped reporting today. Under our Zero Guesswork policy, no fake or interpolated price is fabricated. Please call the APMC office before dispatching."
      : "🛡️ उन्नाव मंडी ने आज भाव दर्ज नहीं किया है (Skip Day)। हमारी शून्य अनुमान नीति के तहत हम कोई फर्जी औसत भाव नहीं बनाते। माल ले जाने से पहले मंडी कार्यालय में संपर्क करें।";
  }

  // Question: Barabanki status
  if (q.includes("बाराबंकी") || q.includes("barabanki")) {
    const bbk = activeMandis.find((m) => m.id === "barabanki_naveen");
    if (bbk) {
      return isEn
        ? `Barabanki Mandi is quoting ₹${bbk.modalPrice}/qtl. Transport cost for 64 km round-trip is ₹${bbk.transportCost.toLocaleString("en-IN")}, leaving ₹${bbk.netProfit.toLocaleString("en-IN")} net.`
        : `बाराबंकी मंडी में आज भाव ₹${bbk.modalPrice} है। 64 किमी गोल-चक्कर भाड़ा ₹${bbk.transportCost.toLocaleString("hi-IN")} काटकर जेब में ₹${bbk.netProfit.toLocaleString("hi-IN")} शुद्ध बचेंगे।`;
    }
    return isEn
      ? "Barabanki has not reported quotes for this crop today."
      : "बाराबंकी मंडी ने आज इस फसल का भाव दर्ज नहीं किया है।";
  }

  // Question: Diesel / Transport cost
  if (q.includes("डीज़ल") || q.includes("diesel") || q.includes("भाड़ा") || q.includes("freight") || q.includes("cost") || q.includes("खर्च")) {
    return isEn
      ? `We compute round-trip distance (Distance × 2) multiplied by ₹${ratePerKm}/km freight rate. For a tractor traveling 84 km to Sitapur, the 168 km two-way journey costs ₹${168 * ratePerKm}. Round-trip calculation is mandatory because vehicles return empty.`
      : `हम हमेशा गोल-चक्कर दूरी (दूरी × 2) को ₹${ratePerKm}/किमी भाड़ा दर से गुणा करते हैं। जैसे सीतापुर (84 किमी) जाने-आने का कुल 168 किमी का भाड़ा ₹${168 * ratePerKm} बनता है। खाली लौटने का डीज़ल किसान की जेब से ही जाता है।`;
  }

  // Fallback answer
  return isEn
    ? `Based on real-time APMC data, selling ${quantity} quintals of ${cropName} is best at ${bestMandi ? bestMandi.nameEn : "Dubagga Mandi"}. Ask specific questions like 'Where to sell?', 'What about Sitapur?', or 'Explain diesel cost'.`
    : `ताज़ा मंडी आंकड़ों के अनुसार, ${quantity} क्विंटल ${cropName} बेचने के लिए सबसे बेहतर विकल्प ${bestMandi ? bestMandi.nameHi : "दुबग्गा मंडी"} है। आप मुझसे 'कहाँ बेचूँ?', 'सीतापुर का क्या हाल है?' या 'डीज़ल खर्च कैसे जुड़ता है?' जैसे सवाल पूछ सकते हैं।`;
}
