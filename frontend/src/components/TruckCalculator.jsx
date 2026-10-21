import React, { useState, useEffect } from 'react';
import { Truck, Fuel, DollarSign, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TruckCalculator({
  mandis = [],
  initialTargetMandi = null,
  commodity = 'Onion'
}) {
  const [tonnage, setTonnage] = useState(5); // 5 Tonnes default
  const [originMandiId, setOriginMandiId] = useState('');
  const [targetMandiId, setTargetMandiId] = useState('');
  const [fuelRatePerKm, setFuelRatePerKm] = useState(30); // ₹30/km diesel + toll

  // Initialize selected mandis when mandis list changes
  useEffect(() => {
    if (mandis.length >= 2) {
      if (!originMandiId) {
        // Pick the lowest price or nearest mandi as origin
        const sorted = [...mandis].sort((a, b) => a.modalPrice - b.modalPrice);
        setOriginMandiId(sorted[0].id);
      }
      if (initialTargetMandi) {
        setTargetMandiId(initialTargetMandi.id);
      } else if (!targetMandiId) {
        // Pick the highest price mandi as target
        const sorted = [...mandis].sort((a, b) => b.modalPrice - a.modalPrice);
        setTargetMandiId(sorted[0].id);
      }
    }
  }, [mandis, initialTargetMandi]);

  const originMandi = mandis.find(m => m.id === originMandiId) || mandis[1] || mandis[0];
  const targetMandi = mandis.find(m => m.id === targetMandiId) || mandis[0];

  const quintals = Number(tonnage) * 10; // 1 Tonne = 10 Quintals
  const originPrice = originMandi?.modalPrice || 0;
  const targetPrice = targetMandi?.modalPrice || 0;
  const priceSpread = targetPrice - originPrice;

  const grossOriginRevenue = originPrice * quintals;
  const grossTargetRevenue = targetPrice * quintals;
  const grossExtraRevenue = grossTargetRevenue - grossOriginRevenue;

  // Extra distance calculation
  const extraDistanceKm = Math.max(0, (targetMandi?.distanceKm || 0) - (originMandi?.distanceKm || 0));
  const estimatedFuelCost = Math.round(extraDistanceKm * Number(fuelRatePerKm));
  const netProfit = grossExtraRevenue - estimatedFuelCost;

  const isProfitable = netProfit > 0;

  return (
    <div className="calculator-card glass-card animate-fade-in">
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Truck size={22} color="var(--color-primary)" />
          <h2 style={{ fontSize: '1.35rem' }}>Truck Route & Arbitrage Calculator</h2>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Calculate whether taking your truck to a further mandi covers diesel costs and leaves more net profit in your pocket.
        </p>
      </div>

      <div className="calc-grid">
        {/* Left: Inputs */}
        <div className="calc-inputs">
          {/* Payload Tonnage */}
          <div className="input-group">
            <div className="tonnage-display">
              <label>Truck Payload Weight</label>
              <span>{tonnage} Tonnes ({quintals} Quintals)</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={tonnage}
              onChange={(e) => setTonnage(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
              <span>Mini Truck (1T / 10 qtl)</span>
              <span>Medium Truck (5T / 50 qtl)</span>
              <span>Heavy Hauler (16T+ / 160 qtl)</span>
            </div>
          </div>

          {/* Origin Mandi */}
          <div className="input-group">
            <label>1. Origin / Local Mandi (Base Offer)</label>
            <select
              value={originMandiId}
              onChange={(e) => setOriginMandiId(e.target.value)}
            >
              {mandis.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — ₹{m.modalPrice}/qtl ({m.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          {/* Destination Mandi */}
          <div className="input-group">
            <label>2. Destination Mandi (Higher Rate Candidate)</label>
            <select
              value={targetMandiId}
              onChange={(e) => setTargetMandiId(e.target.value)}
            >
              {mandis.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — ₹{m.modalPrice}/qtl ({m.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          {/* Transport Cost Rate */}
          <div className="input-group">
            <label>Estimated Transport Expense Rate (Diesel + Driver + Toll)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="number"
                min="10"
                max="80"
                value={fuelRatePerKm}
                onChange={(e) => setFuelRatePerKm(Number(e.target.value))}
                style={{ width: '100px', padding: '0.5rem', background: 'var(--color-bg-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-main)' }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>₹ per kilometer</span>
            </div>
          </div>
        </div>

        {/* Right: Output Breakdown */}
        <div className="calc-results-panel">
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
              Financial Comparison Breakdown
            </h3>

            <div className="result-row">
              <span>Price at {originMandi?.name}</span>
              <span className="res-val">₹{originPrice} / quintal</span>
            </div>

            <div className="result-row">
              <span>Price at {targetMandi?.name}</span>
              <span className="res-val" style={{ color: 'var(--color-primary)' }}>
                ₹{targetPrice} / quintal ({priceSpread >= 0 ? `+₹${priceSpread}` : `-₹${Math.abs(priceSpread)}`})
              </span>
            </div>

            <div className="result-row">
              <span>Gross Revenue at Local Mandi</span>
              <span className="res-val">₹{grossOriginRevenue.toLocaleString('en-IN')}</span>
            </div>

            <div className="result-row">
              <span>Gross Revenue at Destination Mandi</span>
              <span className="res-val">₹{grossTargetRevenue.toLocaleString('en-IN')}</span>
            </div>

            <div className="result-row">
              <span>Extra Gross Earnings</span>
              <span className="res-val" style={{ color: priceSpread > 0 ? 'var(--color-primary)' : 'inherit' }}>
                +₹{grossExtraRevenue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="result-row">
              <span>Estimated Extra Diesel & Toll ({extraDistanceKm} km)</span>
              <span className="res-val" style={{ color: 'var(--color-amber)' }}>
                -₹{estimatedFuelCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Big Net Result Callout */}
          <div className="net-profit-box" style={{
            background: isProfitable
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(4, 120, 87, 0.3))'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(185, 28, 28, 0.25))',
            borderColor: isProfitable ? 'var(--color-primary)' : 'var(--color-danger)'
          }}>
            <div className="net-profit-title">
              {isProfitable ? 'Net Extra Profit in Your Pocket' : 'Loss from Transport Distance'}
            </div>
            <div className="net-profit-number" style={{ color: isProfitable ? 'var(--color-primary)' : 'var(--color-danger)' }}>
              {isProfitable ? `+₹${netProfit.toLocaleString('en-IN')}` : `-₹${Math.abs(netProfit).toLocaleString('en-IN')}`}
            </div>
            <p style={{ fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--color-text-main)' }}>
              {isProfitable
                ? `✔️ Recommendation: Route truck to ${targetMandi?.name}. Transport is easily covered.`
                : `⚠️ Recommendation: Sell locally at ${originMandi?.name}. Extra diesel outweighs the price difference.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
