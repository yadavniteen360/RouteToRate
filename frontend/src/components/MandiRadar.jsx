import React from 'react';
import { COMMODITIES } from '../data/mandis';
import { TRANSLATIONS } from '../data/translations';
import { Trophy, Truck, AlertCircle, PhoneCall, Ticket, Fuel, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MandiRadar({
  commodity,
  setCommodity,
  quantity,
  setQuantity,
  freightRate,
  setFreightRate,
  tier,
  setTier,
  mandis = [],
  winner,
  language = 'en',
  onOpenTicket
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const bagCount = Math.round(Number(quantity) * 2);

  return (
    <div className="mandi-radar-section animate-fade-in">
      {/* Controls & Configuration Bar */}
      <div className="controls-bar glass-card" style={{ marginBottom: '1.75rem' }}>
        {/* Commodity Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div className="commodity-pills" style={{ paddingBottom: 0 }}>
            {COMMODITIES.map((item) => (
              <button
                key={item.id}
                className={`pill-btn ${commodity.toLowerCase() === item.id.toLowerCase() ? 'active' : ''}`}
                onClick={() => setCommodity(item.id)}
              >
                <span>{item.emoji}</span>
                <span>{language === 'hi' ? item.nameHi : item.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Quality Tier Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>{t.qualityTier}:</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-surface-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="standard">{t.tierStandard}</option>
              <option value="low">{t.tierLow}</option>
              <option value="premium">{t.tierPremium}</option>
            </select>
          </div>
        </div>

        {/* Sliders: Quantity and Freight Rate */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-border)'
        }}>
          {/* Quantity Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', fontWeight: 700 }}>
              <span>{t.cropQuantity}</span>
              <span style={{ color: 'var(--color-primary)' }}>
                {quantity} Quintals ({bagCount} {t.bagCount})
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
              <span>Small (10 qtl / 20 bags)</span>
              <span>Medium Truck (35 qtl / 70 bags)</span>
              <span>Heavy Hauler (100+ qtl)</span>
            </div>
          </div>

          {/* Freight Rate Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', fontWeight: 700 }}>
              <span>{t.freightRate}</span>
              <span style={{ color: 'var(--color-amber)' }}>
                ₹{freightRate} {t.perKmRoundTrip}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={freightRate}
              onChange={(e) => setFreightRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-amber)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
              <span>Tractor (₹14/km)</span>
              <span>Standard Truck (₹18/km)</span>
              <span>Commercial Freight (₹30+/km)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandis Cards Grid - Ranked by Net Take-Home Cash */}
      <div className="mandis-grid">
        {mandis.map((mandi, index) => {
          const isWinner = winner && winner.id === mandi.id;

          if (!mandi.reported) {
            return (
              <div key={mandi.id} className="mandi-card glass-card" style={{ opacity: 0.75, borderStyle: 'dashed' }}>
                <div className="mandi-header">
                  <h3 className="mandi-name" style={{ color: 'var(--color-text-muted)' }}>
                    {language === 'hi' ? mandi.nameHi : mandi.name}
                  </h3>
                  <div className="mandi-location">
                    <span>{language === 'hi' ? mandi.districtHi : mandi.district}, {mandi.state}</span>
                    <span style={{ margin: '0 4px' }}>•</span>
                    <span>{mandi.distanceKm} km (Round-trip: {mandi.roundTripKm} km)</span>
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  margin: '1rem 0'
                }}>
                  <AlertCircle size={28} color="var(--color-amber)" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-amber)' }}>
                    {language === 'hi' ? 'आज कोई भाव दर्ज नहीं' : 'No Official Prices Reported Today'}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>
                    {language === 'hi'
                      ? 'शून्य अनुमान नीति: हम कभी भी मनगढ़ंत औसत नहीं दिखाते।'
                      : 'Zero Guesswork Guarantee: We never display fabricated average rates.'}
                  </p>
                </div>

                <div className="card-footer-btns">
                  <a href={`tel:${mandi.contactNumber}`} className="action-btn" style={{ width: '100%', justifyContent: 'center' }}>
                    <PhoneCall size={14} />
                    <span>{language === 'hi' ? 'मंडी सचिव से पूछें' : 'Call APMC Desk'}</span>
                  </a>
                </div>
              </div>
            );
          }

          return (
            <div
              key={mandi.id}
              className={`mandi-card glass-card ${isWinner ? 'top-market' : ''}`}
              style={{
                boxShadow: isWinner ? '0 0 25px rgba(16, 185, 129, 0.25), 0 10px 30px rgba(0,0,0,0.5)' : undefined,
                border: isWinner ? '2px solid var(--color-primary)' : undefined
              }}
            >
              {isWinner && (
                <div className="top-badge" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff' }}>
                  🏆 #1 {t.winnerBadge}
                </div>
              )}

              <div className="mandi-header">
                <h3 className="mandi-name" style={{ fontSize: '1.25rem' }}>
                  {language === 'hi' ? mandi.nameHi : mandi.name}
                </h3>
                <div className="mandi-location">
                  <span>{language === 'hi' ? mandi.districtHi : mandi.district}, {mandi.state}</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>{mandi.distanceKm} km (Round-trip: {mandi.roundTripKm} km)</span>
                </div>
              </div>

              {/* Net Take-Home Cash - The Hero Number */}
              <div style={{
                background: isWinner ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-primary-light)', fontWeight: 800 }}>
                  {t.takeHomeProfit} (Pocket Cash)
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  ₹{mandi.netProfit.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                  Gross: ₹{mandi.grossRevenue.toLocaleString('en-IN')} − Fuel: ₹{mandi.roundTripFreight.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quoted Price and Diesel Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
                <div className="meta-item">
                  <div className="meta-title">{t.quotedPrice}</div>
                  <div className="meta-val" style={{ fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                    ₹{mandi.activePrice} / qtl
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-subtle)' }}>{mandi.variety}</div>
                </div>

                <div className="meta-item">
                  <div className="meta-title">{t.freightDeduction}</div>
                  <div className="meta-val" style={{ fontSize: '1.05rem', color: '#fca5a5' }}>
                    -₹{mandi.roundTripFreight.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-subtle)' }}>
                    {mandi.roundTripKm} km @ ₹{freightRate}/km
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-footer-btns">
                <button
                  className="truck-sim-btn"
                  onClick={() => onOpenTicket(mandi)}
                  style={{
                    background: isWinner ? 'var(--color-primary)' : 'var(--color-bg-surface-elevated)',
                    color: isWinner ? '#022c16' : 'var(--color-text-main)',
                    fontWeight: 700
                  }}
                >
                  <Ticket size={14} />
                  <span>{t.generateSlip}</span>
                </button>

                <a
                  href={`tel:${mandi.contactNumber}`}
                  className="action-btn"
                  style={{ padding: '0.6rem 0.85rem' }}
                  title="Call APMC Desk"
                >
                  <PhoneCall size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
