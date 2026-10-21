import React from 'react';
import { Sun, Moon, Globe, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({
  isFieldMode,
  setIsFieldMode,
  language,
  setLanguage,
  isApiConnected
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const toggleFieldMode = () => {
    setIsFieldMode(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('field-mode');
      } else {
        document.body.classList.remove('field-mode');
      }
      return next;
    });
  };

  return (
    <nav className="navbar glass-card">
      <div className="brand-section">
        <div className="brand-icon">🚜</div>
        <div className="brand-text">
          <h1>RouteToRate <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, padding: '2px 6px', background: 'rgba(16,185,129,0.15)', borderRadius: '4px' }}>v2.5</span></h1>
          <p className="brand-tagline">
            {language === 'hi'
              ? 'आने-जाने का डीजल घटाएं — देखें किस मंडी में मिलेगा सर्वाधिक शुद्ध मुनाफा'
              : 'Deduct round-trip fuel & transport — see which mandi delivers the highest net take-home profit'}
          </p>
        </div>
      </div>

      <div className="nav-actions">
        <div className="status-badge" title="Data.gov.in Agmarknet Resource ID: 9ef84268-d588-465a-a308-a864a43d0070">
          <span className="status-dot"></span>
          <span>{isApiConnected ? t.liveGovBadge : t.offlineBadge}</span>
        </div>

        <button
          className="action-btn"
          onClick={toggleFieldMode}
          title="Toggle high-contrast sunlight mode for outdoors"
        >
          {isFieldMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isFieldMode ? t.sunlightMode : t.darkFieldMode}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Globe size={16} color="var(--color-text-subtle)" />
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English (Pure)</option>
            <option value="hi">हिंदी (शुद्ध)</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
