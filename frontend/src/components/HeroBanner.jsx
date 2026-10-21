import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { TrendingDown, ShieldAlert, Fuel, ArrowRight } from 'lucide-react';

export default function HeroBanner({ language = 'en', metrics = {} }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <section className="hero-banner glass-card animate-fade-in" style={{ borderLeft: '4px solid #f59e0b' }}>
      <div className="hero-quote-mark">“</div>
      <div className="hero-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            background: 'rgba(245, 158, 11, 0.2)',
            color: 'var(--color-amber)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            THE FALSE ECONOMY TRAP • झूठे मुनाफे का जाल
          </span>
        </div>

        <h2 className="hero-title">
          {t.heroHeadline} <br />
          <span className="highlight" style={{ background: 'linear-gradient(120deg, #f59e0b, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.heroSubline}
          </span>
        </h2>

        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '1.25rem',
          maxWidth: '960px'
        }}>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            {t.heroProblem1}
          </p>
          <p style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.6 }}>
            {t.heroProblem2}
          </p>
        </div>

        {/* Formula Banner */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--color-primary-light)',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          <span>📐 {t.heroFormula}</span>
        </div>

        <div className="hero-metrics">
          <div className="metric-card">
            <div className="metric-label">{language === 'hi' ? 'ट्रैक्टर राउंड-ट्रिप' : 'Freight Calculation'}</div>
            <div className="metric-val accent">
              Distance × 2
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">{language === 'hi' ? 'सीतापुर बनाम दुबग्गा अंतर' : 'Sitapur Trap Margin'}</div>
            <div className="metric-val amber">
              -₹1,089 Loss
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">{language === 'hi' ? 'अनुमान नीति' : 'Reporting Policy'}</div>
            <div className="metric-val">
              Zero Guesswork
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">{language === 'hi' ? 'सरकारी डेटा' : 'Government Feed'}</div>
            <div className="metric-val accent">
              UP-Agmarknet Live
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
