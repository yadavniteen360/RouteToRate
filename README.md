# KisanApp 🌾

> **The buyer across the table knows today's rate. The seller frequently does not.**

A farmer decides which mandi to take a truck to, and at what price to let the crop go, largely on hearsay — a neighbour's rumour, a trader's word, a number from three days ago.

Daily mandi arrivals and modal prices for hundreds of commodities across hundreds of markets are published as open government data. It is simply not in a form anyone standing in a field can use.

**KisanApp** changes that.

---

## What It Does

- 📊 **Live Mandi Prices** — Today's modal price for any commodity at any mandi, sourced directly from [data.gov.in](https://data.gov.in/), displayed in plain language.
- 🗺️ **Market Comparison** — Compare prices across nearby mandis to decide where to sell before loading the truck.
- 📈 **Price Trends** — Historical price charts so farmers can spot patterns and time their sales.
- 🔔 **Price Alerts** — Set a target price for a crop; get notified when a mandi crosses it.
- 🌐 **Works on Low Bandwidth** — Designed to be fast and usable on entry-level Android devices and slow mobile connections.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MongoDB |
| Data Source | [Agmarknet / data.gov.in Open API](https://data.gov.in/resource/daily-market-prices-data-horticulture) |

---


---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- A free API key from [data.gov.in](https://data.gov.in/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kisanapp.git
cd kisanapp

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kisanapp
DATA_GOV_API_KEY=your_api_key_here
```

### Run Locally

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## The Problem, In Plain Terms

Mandi prices are published daily by the government. But they live in spreadsheets and API responses that require a laptop, an internet connection, and some technical literacy to read. A farmer with a smartphone gets none of this.

KisanApp is a thin, fast interface between that data and the person who needs it most — at the moment they need it most

---
