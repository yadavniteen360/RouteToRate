import React, { useState } from 'react';
import { Search, Download, Database, Info, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CropProjections({
  records = [],
  isLoading = false,
  error = null,
  onRefresh
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecords = records.filter(row => {
    const cropName = row.crop_group_of_crops || '';
    const matchesSearch = cropName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Cereals') {
      return matchesSearch && (cropName.includes('Rice') || cropName.includes('Wheat') || cropName.includes('Cereals'));
    }
    if (selectedCategory === 'Pulses') {
      return matchesSearch && cropName.includes('Pulses');
    }
    if (selectedCategory === 'Commercial') {
      return matchesSearch && (cropName.includes('Cotton') || cropName.includes('Sugarcane') || cropName.includes('Oilseeds'));
    }
    return matchesSearch;
  });

  const downloadCsv = () => {
    window.open('/api/crop-projections?format=csv', '_blank');
  };

  return (
    <div className="projections-container animate-fade-in">
      {/* Dataset Header Badge Card */}
      <div className="dataset-badge-card glass-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Database size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>National Crop Demand & Production Projections</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Official Planning Commission & Ministry of Agriculture macro-economic projections.
          </p>

          <div className="schema-tag-pills">
            <span className="schema-tag">filters[crop_group_of_crops]</span>
            <span className="schema-tag">filters[projected_demand__by_financial_year_2016_17]</span>
            <span className="schema-tag">filters[projected_demand__by_financial_year_2020_21]</span>
            <span className="schema-tag">filters[projected_supply__by_financial_year_2016_17]</span>
            <span className="schema-tag">filters[actual_production__for_financial_year_2006_07]</span>
            <span className="schema-tag">filters[actual_production__for_financial_year_2011_12]</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="action-btn" onClick={downloadCsv} title="Export CSV from backend">
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="controls-bar glass-card">
        <div className="filters-row">
          <div className="search-input-box">
            <Search size={16} color="var(--color-text-subtle)" />
            <input
              type="text"
              placeholder="Filter by crop name (e.g. Rice, Wheat, Pulses, Oilseeds)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="commodity-pills" style={{ paddingBottom: 0 }}>
            {['All', 'Cereals', 'Pulses', 'Commercial'].map(cat => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="projections-table-wrap glass-card">
        <table className="projections-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Crop / Group of Crops</th>
              <th>Actual Prod. (06-07)</th>
              <th>Actual Prod. (11-12)</th>
              <th>Projected Supply (16-17)</th>
              <th>Projected Demand (16-17)</th>
              <th>Projected Demand (20-21)</th>
              <th>Supply-Demand Outlook</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((row) => {
              const demand17 = Number(row.projected_demand__by_financial_year_2016_17) || 0;
              const supply17 = Number(row.projected_supply__by_financial_year_2016_17) || 0;
              const gap = supply17 - demand17;
              const isDeficit = gap < 0;

              return (
                <tr key={row.document_id || row.crop_group_of_crops}>
                  <td style={{ color: 'var(--color-text-subtle)', fontFamily: 'monospace' }}>
                    #{row.document_id || '-'}
                  </td>
                  <td className="crop-name-cell">
                    {row.crop_group_of_crops}
                  </td>
                  <td>
                    <span className="val-badge actual">
                      {row.actual_production__for_financial_year_2006_07} MT
                    </span>
                  </td>
                  <td>
                    <span className="val-badge actual">
                      {row.actual_production__for_financial_year_2011_12} MT
                    </span>
                  </td>
                  <td>
                    <span className="val-badge supply">
                      {row.projected_supply__by_financial_year_2016_17} MT
                    </span>
                  </td>
                  <td>
                    <span className="val-badge demand">
                      {row.projected_demand__by_financial_year_2016_17} MT
                    </span>
                  </td>
                  <td>
                    <span className="val-badge demand">
                      {row.projected_demand__by_financial_year_2020_21} MT
                    </span>
                  </td>
                  <td>
                    <div className={`gap-indicator ${isDeficit ? 'deficit' : 'surplus'}`}>
                      {isDeficit ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                      <span>
                        {isDeficit
                          ? `Supply Deficit (${Math.abs(gap).toFixed(1)} MT)`
                          : `Self-Sufficient (+${gap.toFixed(1)} MT)`}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredRecords.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No crop projection records found for "{searchTerm}".
          </div>
        )}
      </div>

      {/* Explanatory Callout */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          <strong>Why Macro Projections Matter to a Farmer:</strong> Crops facing national supply deficits (like Pulses & Edible Oilseeds) exhibit structurally stronger mandi pricing. Traders cannot easily claim "the market is flooded" when national production remains behind projected demand targets.
        </span>
      </div>
    </div>
  );
}
