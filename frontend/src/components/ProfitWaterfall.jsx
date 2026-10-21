import React from 'react';
import { BarChart3, Fuel, Wallet, AlertCircle } from 'lucide-react';

export default function ProfitWaterfall({ mandis = [], language = 'en', commodity = 'Wheat' }) {
  const reportedMandis = mandis.filter(m => m.reported);

  // Find max gross revenue to calibrate percentage bars
  const maxGross = Math.max(...reportedMandis.map(m => m.grossRevenue || 1), 1);

  return (
    <div className="waterfall-section glass-card animate-fade-in" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <BarChart3 size={22} color="var(--color-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {language === 'hi' ? 'मुनाफा वाटरफॉल: जेब में बची नकदी बनाम रास्ते का खर्च' : 'Profit Waterfall: Net Take-Home vs Freight Erosion'}
            </h2>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {language === 'hi'
              ? 'देखें कैसे लंबी दूरी और आने-जाने का डीजल अधिक भाव वाले बाजार का सारा मुनाफा खा जाता है।'
              : 'Visualize how round-trip distance erodes quoted price premiums across competing APMCs.'}
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-primary)' }}></span>
            <span>{language === 'hi' ? 'शुद्ध मुनाफा (जेब में)' : 'Net Profit (In Pocket)'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ef4444' }}></span>
            <span>{language === 'hi' ? 'डीजल कटौती (सड़क खा गई)' : 'Diesel Freight (What Road Eats)'}</span>
          </div>
        </div>
      </div>

      {/* Waterfall Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {reportedMandis.map((mandi, idx) => {
          const netPercent = Math.max(5, ((mandi.netProfit || 0) / maxGross) * 100);
          const freightPercent = Math.max(2, ((mandi.roundTripFreight || 0) / maxGross) * 100);
          const isWinner = idx === 0;

          return (
            <div key={mandi.id} style={{
              background: isWinner ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.02)',
              border: isWinner ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: isWinner ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                    color: isWinner ? '#022c16' : 'var(--color-text-main)'
                  }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                    {language === 'hi' ? mandi.nameHi : mandi.name}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                    ({mandi.distanceKm} km one-way • {mandi.roundTripKm} km round-trip)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Quoted: <strong>₹{mandi.activePrice}/qtl</strong>
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    Net: ₹{mandi.netProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Stacked Visual Bar */}
              <div style={{
                height: '24px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '0.5rem'
              }}>
                {/* Green Net Portion */}
                <div style={{
                  width: `${netPercent}%`,
                  background: 'linear-gradient(90deg, #059669, #10b981)',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}>
                  ₹{mandi.netProfit.toLocaleString('en-IN')} (Net)
                </div>

                {/* Red Freight Portion */}
                <div style={{
                  width: `${freightPercent}%`,
                  background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '8px',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}>
                  -₹{mandi.roundTripFreight.toLocaleString('en-IN')} (Fuel)
                </div>
              </div>

              {/* Freight Erosion Micro-note */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                <span>Gross Value: ₹{mandi.grossRevenue.toLocaleString('en-IN')}</span>
                <span style={{ color: Number(mandi.freightPercentOfRevenue) > 3 ? '#fca5a5' : 'inherit' }}>
                  Road Freight eats <strong>{mandi.freightPercentOfRevenue}%</strong> of your gross crop revenue!
                </span>
              </div>
            </div>
          );
        })}

        {/* Silent Mandi Note */}
        {mandis.filter(m => !m.reported).map(silent => (
          <div key={silent.id} style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--color-text-subtle)',
            fontSize: '0.85rem'
          }}>
            <AlertCircle size={16} />
            <span>
              <strong>{language === 'hi' ? silent.nameHi : silent.name}</strong> — {language === 'hi' ? 'इस मंडी ने आज भाव नहीं दिए (शून्य अनुमान नीति लागू)' : 'Did not report prices today (Zero Guesswork Policy enforced)'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
