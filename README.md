# RouteToRate (असली मुनाफ़ा) 🌾

> **Farmer Price Transparency & Real Take-Home Net Profit Calculator**
> 
> A specialized agritech decision engine for Uttar Pradesh farmers comparing regional APMC mandis (Dubagga Lucknow, Barabanki, Sitapur Krishi, Unnao Ganj) across key crops (Wheat, Potato, Mustard).

---

## 💡 The Core Problem: False Economy ("धोखा अलर्ट")
A farmer often decides where to sell based on hearsay or raw modal rates. A trader 60–80 km away might offer ₹40–50/quintal more, but after deducting two-way diesel and tractor transport costs, the farmer actually incurs a net financial loss.

**RouteToRate** solves this by calculating true take-home earnings:
$$\text{Gross Earning} = \text{Modal Rate (₹/qtl)} \times \text{Quantity (qtl)}$$
$$\text{Round-Trip Transport Cost} = \text{Distance (km)} \times 2 \times \text{Diesel Rate (₹/km)}$$
$$\text{Net Profit (शुद्ध बचत)} = \text{Gross Earning} - \text{Transport Cost}$$

---

## 🛡️ Strict Farmer Protection Principles
1. **Never Interpolate Missing Data**: If a mandi skips reporting on a given day (e.g., Unnao Wheat or Barabanki Mustard), the app shows an honest warning badge (`"आज का भाव दर्ज नहीं हुआ / No Rate Reported"`). It **never** fabricates an average price.
2. **False Trap Warning ("धोखा अलर्ट")**: Highlights when a distant mandi quotes higher prices but results in net economic losses.
3. **Round-Trip Factoring**: Mandi trips require fuel both ways; distances are always multiplied by 2.
4. **100% Offline Uptime & Real-time Gov Sync**: Live integration with official Data.gov.in Agmarknet API with guaranteed instant fallback to bundled verified regional data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd RouteToRate

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System
- **Fonts**: Plus Jakarta Sans & Noto Sans Devanagari
- **Icons**: Lucide React
- **Data Source**: Data.gov.in (Agmarknet Live API) + UP APMC Verified Regional Dataset
