import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MandiRadar from './components/MandiRadar';
import FalseEconomyAlert from './components/FalseEconomyAlert';
import ProfitWaterfall from './components/ProfitWaterfall';
import SimulationLab from './components/SimulationLab';
import MandiTicketModal from './components/MandiTicketModal';
import FloatingStatsBar from './components/FloatingStatsBar';
import GemmaAdvisor from './components/GemmaAdvisor';
import CropProjections from './components/CropProjections';
import { TRANSLATIONS } from './data/translations';
import { getApiUrl } from './config';
import { Trophy, BarChart3, FlaskConical, Bot, LineChart } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('rankings'); // rankings | waterfall | simulation | advisor | projections
  const [commodity, setCommodity] = useState('Wheat');
  const [quantity, setQuantity] = useState(35); // 35 Quintals = 70 bags
  const [freightRate, setFreightRate] = useState(18); // ₹18/km round-trip
  const [tier, setTier] = useState('standard');
  const [language, setLanguage] = useState('en');
  const [isFieldMode, setIsFieldMode] = useState(false);
  const [isApiConnected, setIsApiConnected] = useState(true);

  // Simulation Lab State
  const [activePreset, setActivePreset] = useState('baseline');
  const [isTickerRunning, setIsTickerRunning] = useState(false);
  const [tickerOffset, setTickerOffset] = useState(0);

  // API State
  const [mandis, setMandis] = useState([]);
  const [winner, setWinner] = useState(null);
  const [falseEconomyTrap, setFalseEconomyTrap] = useState(null);

  // Ticket Modal State
  const [selectedMandiForTicket, setSelectedMandiForTicket] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // National Crop Projections
  const [projections, setProjections] = useState([]);
  const [isProjectionsLoading, setIsProjectionsLoading] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // 10-Second Auction Ticker Effect
  useEffect(() => {
    let interval = null;
    if (isTickerRunning) {
      interval = setInterval(() => {
        setTickerOffset((prev) => (prev > 50 ? -30 : prev + 15));
      }, 10000);
    } else {
      setTickerOffset(0);
    }
    return () => clearInterval(interval);
  }, [isTickerRunning]);

  // Fetch Mandi Rates with Round-Trip Formula & Trap Alerts
  useEffect(() => {
    async function loadMandiData() {
      try {
        const queryParams = new URLSearchParams({
          commodity,
          quantity: String(quantity),
          freightRate: String(freightRate),
          preset: activePreset,
          tier
        });

        const url = getApiUrl(`/api/mandi-prices?${queryParams.toString()}`);
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          let fetchedMandis = data.mandis || [];

          // Apply ticker fluctuation if active
          if (tickerOffset !== 0) {
            fetchedMandis = fetchedMandis.map((m) => {
              if (m.reported) {
                const adjPrice = m.activePrice + tickerOffset;
                const gross = adjPrice * Number(quantity);
                const net = gross - m.roundTripFreight;
                return { ...m, activePrice: adjPrice, grossRevenue: gross, netProfit: net };
              }
              return m;
            }).sort((a, b) => b.netProfit - a.netProfit);
          }

          setMandis(fetchedMandis);
          setWinner(data.winner || (fetchedMandis.find(m => m.reported) || null));
          setFalseEconomyTrap(data.falseEconomyTrap || null);
          setIsApiConnected(true);
        } else {
          setIsApiConnected(false);
        }
      } catch (err) {
        console.warn('API connection issue, fallback active:', err);
        setIsApiConnected(false);
      }
    }

    loadMandiData();
  }, [commodity, quantity, freightRate, activePreset, tier, tickerOffset]);

  // Fetch National Demand Projections
  useEffect(() => {
    async function loadProjections() {
      setIsProjectionsLoading(true);
      try {
        const res = await fetch(getApiUrl('/api/crop-projections'));
        if (res.ok) {
          const data = await res.json();
          setProjections(data.records || []);
        }
      } catch (err) {
        console.warn('Projections API error:', err);
      } finally {
        setIsProjectionsLoading(false);
      }
    }
    loadProjections();
  }, []);

  const handleOpenTicket = (mandi) => {
    setSelectedMandiForTicket(mandi || winner);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="app-container" style={{ paddingBottom: '7rem' }}>
      {/* Navbar with RouteToRate Branding & Language Switch */}
      <Navbar
        isFieldMode={isFieldMode}
        setIsFieldMode={setIsFieldMode}
        language={language}
        setLanguage={setLanguage}
        isApiConnected={isApiConnected}
      />

      {/* Hero Problem Statement with Sitapur Trap Breakdown */}
      <HeroBanner language={language} />

      {/* False Economy Trap Alert (Dhokha Alert) */}
      <FalseEconomyAlert trap={falseEconomyTrap} language={language} />

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'rankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('rankings')}
        >
          <Trophy size={18} />
          <span>{t.tabRankings}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'waterfall' ? 'active' : ''}`}
          onClick={() => setActiveTab('waterfall')}
        >
          <BarChart3 size={18} />
          <span>{t.tabWaterfall}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'simulation' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulation')}
        >
          <FlaskConical size={18} />
          <span>{t.tabSimulation}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'advisor' ? 'active' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          <Bot size={18} />
          <span>{t.tabAdvisor}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'projections' ? 'active' : ''}`}
          onClick={() => setActiveTab('projections')}
        >
          <LineChart size={18} />
          <span>{t.tabProjections}</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <main>
        {activeTab === 'rankings' && (
          <MandiRadar
            commodity={commodity}
            setCommodity={setCommodity}
            quantity={quantity}
            setQuantity={setQuantity}
            freightRate={freightRate}
            setFreightRate={setFreightRate}
            tier={tier}
            setTier={setTier}
            mandis={mandis}
            winner={winner}
            language={language}
            onOpenTicket={handleOpenTicket}
          />
        )}

        {activeTab === 'waterfall' && (
          <ProfitWaterfall
            mandis={mandis}
            language={language}
            commodity={commodity}
          />
        )}

        {activeTab === 'simulation' && (
          <div>
            <SimulationLab
              activePreset={activePreset}
              setActivePreset={setActivePreset}
              isTickerRunning={isTickerRunning}
              setIsTickerRunning={setIsTickerRunning}
              language={language}
            />
            <MandiRadar
              commodity={commodity}
              setCommodity={setCommodity}
              quantity={quantity}
              setQuantity={setQuantity}
              freightRate={freightRate}
              setFreightRate={setFreightRate}
              tier={tier}
              setTier={setTier}
              mandis={mandis}
              winner={winner}
              language={language}
              onOpenTicket={handleOpenTicket}
            />
          </div>
        )}

        {activeTab === 'advisor' && (
          <GemmaAdvisor
            commodity={commodity}
            mandis={mandis}
          />
        )}

        {activeTab === 'projections' && (
          <CropProjections
            records={projections}
            isLoading={isProjectionsLoading}
          />
        )}
      </main>

      {/* Floating Bottom Sticky Ribbon */}
      <FloatingStatsBar
        winner={winner}
        onOpenTicket={() => handleOpenTicket(winner)}
        language={language}
        commodity={commodity}
        quantity={quantity}
      />

      {/* Digital Mandi Receipt (APMC Ticket) Modal */}
      <MandiTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        mandi={selectedMandiForTicket || winner}
        commodity={commodity}
        quantity={quantity}
        freightRate={freightRate}
        language={language}
      />
    </div>
  );
}
