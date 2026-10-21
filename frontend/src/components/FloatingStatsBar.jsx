import React from 'react';
import { Trophy, Ticket, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function FloatingStatsBar({
  winner,
  onOpenTicket,
  language = 'en',
  commodity = 'Wheat',
  quantity = 35
}) {
  if (!winner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1060px',
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1.5px solid var(--color-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '0.85rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 20px var(--color-primary-glow)',
      zIndex: 900,
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)'
        }}>
          <Trophy size={20} />
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', fontWeight: 800 }}>
            {language === 'hi' ? 'सर्वोत्तम शुद्ध मुनाफा विजेता' : '#1 HIGHEST PROFIT APMC'}
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff' }}>
            {language === 'hi' ? winner.nameHi : winner.name}
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-subtle)', marginLeft: '6px' }}>
              ({quantity} qtl {commodity})
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)', textTransform: 'uppercase', fontWeight: 600 }}>
            {language === 'hi' ? 'शुद्ध नकदी (डीजल कटने के बाद)' : 'Net Cash (After Round-Trip Fuel)'}
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1.1 }}>
            ₹{winner.netProfit.toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={onOpenTicket}
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px var(--color-primary-glow)',
            whiteSpace: 'nowrap'
          }}
        >
          <Ticket size={16} />
          <span>{language === 'hi' ? 'डिजिटल पर्ची निकालें' : 'Generate APMC Slip'}</span>
        </button>
      </div>
    </div>
  );
}
