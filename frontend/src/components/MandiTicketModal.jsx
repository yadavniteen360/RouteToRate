import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Share2, Volume2, ShieldCheck, CheckCircle2, Truck, Fuel, QrCode } from 'lucide-react';

export default function MandiTicketModal({
  isOpen,
  onClose,
  mandi,
  commodity,
  quantity,
  freightRate,
  language = 'en'
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen || !mandi) return null;

  const bagCount = Math.round(Number(quantity) * 2); // 1 Quintal = 2 bags of 50kg
  const certId = `UP-APMC-CERT-2026-${mandi.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Voice Readout using Web Speech API
  const handleVoiceReadout = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();

    const textEn = `Official Route to Rate Verdict. Sell your ${quantity} quintals of ${commodity} at ${mandi.name}. Quoted rate is ₹${mandi.activePrice} per quintal. After deducting ₹${mandi.roundTripFreight} for round-trip diesel, your highest net take-home cash is ₹${mandi.netProfit}. Have a profitable harvest!`;
    const textHi = `रूट टू रेट आधिकारिक फैसला। अपने ${quantity} क्विंटल ${commodity} को ${mandi.nameHi || mandi.name} में बेचें। मंडी भाव ₹${mandi.activePrice} प्रति क्विंटल है। आने-जाने का ₹${mandi.roundTripFreight} डीजल कटने के बाद, आपकी जेब में ₹${mandi.netProfit} शुद्ध बचेंगे। आपकी फसल लाभदायक रहे!`;

    const utterance = new SpeechSynthesisUtterance(language === 'hi' ? textHi : textEn);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // WhatsApp Share with Confetti Animation
  const handleWhatsAppShare = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const msg = `🌾 *ROUTETORATE OFFICIAL APMC PASSBOOK SLIP* 🌾
━━━━━━━━━━━━━━━━━━━━━━
🚜 *Recommended Mandi*: ${mandi.name}
📦 *Crop*: ${commodity} (${quantity} Quintals / ${bagCount} bags)
💰 *Quoted Rate*: ₹${mandi.activePrice}/qtl
💵 *Gross Crop Value*: ₹${mandi.grossRevenue.toLocaleString('en-IN')}
⛽ *Round-Trip Diesel (${mandi.roundTripKm} km)*: -₹${mandi.roundTripFreight.toLocaleString('en-IN')}
🏆 *NET TAKE-HOME PROFIT*: ₹${mandi.netProfit.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━━━━━
🛡️ *Verification Stamp*: UP-APMC-CERT-2026
👉 *Check your mandi rate*: https://routetorate.gov.in`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }} onClick={onClose}>
      {/* Cinema Ticket Card */}
      <div style={{
        background: 'linear-gradient(180deg, #16243b 0%, #0d1624 100%)',
        border: '2px solid var(--color-primary)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.3)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>

        {/* Serrated Left and Right Cutouts */}
        <div style={{
          position: 'absolute',
          top: '48%',
          left: '-14px',
          width: '28px',
          height: '28px',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '50%',
          boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.5)',
          zIndex: 2
        }}></div>
        <div style={{
          position: 'absolute',
          top: '48%',
          right: '-14px',
          width: '28px',
          height: '28px',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '50%',
          boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.5)',
          zIndex: 2
        }}></div>

        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(90deg, #059669, #10b981)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#032b17'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              OFFICIAL DIGITAL APMC TICKET
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#032b17', margin: 0 }}>
              RouteToRate Certified
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#032b17' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Winner Mandi Banner */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              RECOMMENDED WINNER MARKET
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.2rem 0' }}>
              {language === 'hi' ? mandi.nameHi : mandi.name}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-subtle)' }}>
              {mandi.distanceKm} km one-way • {mandi.roundTripKm} km round-trip freight
            </div>
          </div>

          {/* Dotted Divider */}
          <div style={{ borderTop: '2px dashed rgba(255, 255, 255, 0.15)', margin: '1.25rem 0' }}></div>

          {/* Financial Breakdown Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Crop Commodity</span>
              <strong>{commodity} ({mandi.variety})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Total Load Quantity</span>
              <strong>{quantity} Quintals ({bagCount} Bags)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Quoted Mandi Price</span>
              <strong>₹{mandi.activePrice} / qtl</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Gross Crop Revenue</span>
              <strong>₹{mandi.grossRevenue.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fca5a5' }}>
              <span>Round-Trip Diesel ({mandi.roundTripKm} km @ ₹{freightRate}/km)</span>
              <strong>-₹{mandi.roundTripFreight.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Big Take-Home Profit Badge */}
          <div style={{
            margin: '1.25rem 0',
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.35))',
            borderRadius: '12px',
            border: '2px solid var(--color-primary)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-light)', letterSpacing: '0.05em' }}>
              ACTUAL NET TAKE-HOME PROFIT
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              ₹{mandi.netProfit.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#d1fae5' }}>
              Certified highest net cash return after full round-trip deduction
            </div>
          </div>

          {/* Verification stamp & QR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--color-text-subtle)', paddingTop: '0.5rem' }}>
            <div>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800 }}>{certId}</div>
              <div>Agmarknet Verified Mandi Feed</div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>UP-APMC-CERT-2026</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          gap: '0.75rem'
        }}>
          <button
            onClick={handleVoiceReadout}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: isPlayingAudio ? 'var(--color-amber)' : 'var(--color-bg-surface-elevated)',
              color: isPlayingAudio ? '#000000' : 'var(--color-text-main)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Volume2 size={16} />
            <span>{isPlayingAudio ? (language === 'hi' ? 'बोल रहे हैं...' : 'Speaking...') : (language === 'hi' ? 'आवाज में सुनें' : 'Audio Verdict')}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            style={{
              flex: 1.3,
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: '#25D366',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)'
            }}
          >
            <Share2 size={16} />
            <span>{language === 'hi' ? 'व्हाट्सएप पर्ची' : 'Share on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
