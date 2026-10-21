import React from 'react';
import { FlaskConical, Play, RotateCcw, AlertTriangle, Zap, Fuel, Activity } from 'lucide-react';

export default function SimulationLab({
  activePreset,
  setActivePreset,
  isTickerRunning,
  setIsTickerRunning,
  language = 'en'
}) {
  const presets = [
    {
      id: 'baseline',
      icon: <RotateCcw size={16} />,
      labelEn: '1. Standard Baseline Rates',
      labelHi: '1. प्रमाणित मानक भाव',
      descEn: 'Official certified prices from Agmarknet UP feed',
      descHi: 'एगमार्कनेट यूपी से प्रमाणित मानक भाव'
    },
    {
      id: 'sitapur_surge',
      icon: <AlertTriangle size={16} color="#ef4444" />,
      labelEn: '2. Sitapur Price Surge (+₹160)',
      labelHi: '2. सीतापुर में भाव उछाल (+₹160)',
      descEn: 'Triggers the False Economy Trap (Dhokha Alert)',
      descHi: 'धोखा अलर्ट को सक्रिय करता है (दिखावे का अधिक भाव)'
    },
    {
      id: 'unnao_reports',
      icon: <Zap size={16} color="var(--color-primary)" />,
      labelEn: '3. Unnao Reports Today (₹2,310)',
      labelHi: '3. उन्नाव ने आज भाव दर्ज किए (₹2,310)',
      descEn: 'Silent mandi comes online (Zero Guesswork Policy)',
      descHi: 'मंडी सक्रिय हो जाती है (शून्य अनुमान गारंटी)'
    },
    {
      id: 'diesel_hike',
      icon: <Fuel size={16} color="var(--color-amber)" />,
      labelEn: '4. Diesel Rate Hike (+₹8/km)',
      labelHi: '4. डीजल दर में बढ़ोतरी (+₹8/किमी)',
      descEn: 'Watch distant mandis plummet in net profit',
      descHi: 'देखें कैसे दूर की मंडियों का मुनाफा गिर जाता है'
    }
  ];

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--color-amber), var(--color-amber-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000'
          }}>
            <FlaskConical size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
              {language === 'hi' ? '🧪 लाइव सिमुलेशन लैब (जज महोदय के प्रदर्शन हेतु)' : '🧪 Live Simulation Lab (Judge Demo Presets)'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
              {language === 'hi' ? 'एक क्लिक से वास्तविक समय में रैंकिंग और धोखे के अलर्ट देखें' : 'One-click scenarios to demonstrate dynamic re-ranking & trap triggers in real time'}
            </p>
          </div>
        </div>

        {/* 10-Second Live Auction Ticker Toggle */}
        <button
          onClick={() => setIsTickerRunning(!isTickerRunning)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: isTickerRunning ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)',
            color: isTickerRunning ? '#fca5a5' : 'var(--color-primary)',
            border: isTickerRunning ? '1px solid #ef4444' : '1px solid var(--color-primary)',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer'
          }}
        >
          <Activity size={14} className={isTickerRunning ? 'pulse-anim' : ''} />
          <span>{isTickerRunning ? (language === 'hi' ? 'टिकर चालू है' : '10s Ticker Active') : (language === 'hi' ? '5. 10s ऑक्शन टिकर चालू करें' : '5. Start 10s Auction Ticker')}</span>
        </button>
      </div>

      {/* Preset Buttons Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(4, 120, 87, 0.35))' : 'var(--color-bg-surface-elevated)',
                border: isActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 15px var(--color-primary-glow)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.2rem' }}>
                {preset.icon}
                <span>{language === 'hi' ? preset.labelHi : preset.labelEn}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                {language === 'hi' ? preset.descHi : preset.descEn}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
