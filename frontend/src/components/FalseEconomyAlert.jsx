import React from 'react';
import { AlertTriangle, TrendingDown, ArrowRight, ShieldAlert } from 'lucide-react';

export default function FalseEconomyAlert({ trap, language = 'en' }) {
  if (!trap || !trap.detected) return null;

  return (
    <div className="trap-alert-card animate-fade-in" style={{
      border: '2px solid #ef4444',
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(185, 28, 28, 0.28))',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1.5rem',
      marginBottom: '1.75rem',
      boxShadow: '0 0 25px rgba(239, 68, 68, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          flexShrink: 0,
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
        }}>
          <AlertTriangle size={24} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              letterSpacing: '0.05em'
            }}>
              DHOKHA ALERT • धोखा अलर्ट
            </span>
            <h3 style={{ fontSize: '1.15rem', color: '#fca5a5', fontWeight: 800 }}>
              {language === 'hi' ? 'झूठे मुनाफे का भ्रम (False Economy Trap)' : 'False Economy Trap Detected!'}
            </h3>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#fecaca', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {language === 'hi' ? trap.messageHi : trap.messageEn}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            padding: '0.75rem 1rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 600 }}>
                {language === 'hi' ? 'दिखावे का अधिक भाव' : 'Quoted Premium'}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fca5a5' }}>
                +₹{trap.quotedPremium} / qtl
              </div>
            </div>

            <ArrowRight size={18} color="#fca5a5" />

            <div>
              <div style={{ fontSize: '0.7rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 600 }}>
                {language === 'hi' ? 'डीजल कटने के बाद सीधा नुकसान' : 'Actual Direct Loss After Diesel'}
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', textShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}>
                -₹{trap.directRupeeLoss.toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
              {language === 'hi'
                ? `✔️ सलाह: ${trap.baselineMandiNameHi || 'दुबग्गा'} में ही बेचें और ₹${trap.directRupeeLoss.toLocaleString('en-IN')} बचाएं!`
                : `✔️ Verdict: Stay at ${trap.baselineMandiName || 'Dubagga'} & save ₹${trap.directRupeeLoss.toLocaleString('en-IN')}!`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
