import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  MarketScanResult,
  CompetitorAnalysis,
  MarketGap,
  BusinessEntity
} from '../types/index.js';
import { CompetitorMap } from '../components/market/CompetitorMap.js';
import { EvidenceBadge } from '../components/common/EvidenceBadge.js';
import {
  Compass,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Users,
  Shield,
  Star,
  ArrowRight,
  Crosshair,
  Layers,
  HelpCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const MarketIntelligencePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<MarketScanResult | null>(null);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorAnalysis | null>(null);
  const [winWedge, setWinWedge] = useState<string | null>(null);

  const scanningSteps = [
    'Establishing geolocation boundary...',
    'Mapping nearby commercial entities...',
    'Clustering business categories & density...',
    'Detecting incumbent competitors...',
    'Extracting public customer review signals...',
    'Identifying structural market gaps...',
    'Mapping complementary partnership synergies...',
    'Synthesizing local opportunity radar...'
  ];

  useEffect(() => {
    loadMarket();
  }, []);

  const loadMarket = async () => {
    try {
      setLoading(true);
      const res = await api.getMarket();
      if (res.marketScan) {
        setScanResult(res.marketScan);
        if (res.marketScan.competitors.length > 0) {
          setSelectedCompetitor(res.marketScan.competitors[0]);
        }
      } else {
        await triggerMarketScan();
      }
    } catch (err) {
      console.error('Failed to load market:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerMarketScan = async () => {
    setScanning(true);
    setScanStep(0);

    // Animate scan steps smoothly
    for (let i = 0; i < scanningSteps.length; i++) {
      setScanStep(i);
      await new Promise(r => setTimeout(r, 220));
    }

    try {
      const res = await api.scanMarket();
      setScanResult(res.marketScan);
      if (res.marketScan.competitors.length > 0) {
        setSelectedCompetitor(res.marketScan.competitors[0]);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setScanning(false);
    }
  };

  const handleHowCanIWin = (comp: CompetitorAnalysis) => {
    setWinWedge(
      `Strategic Wedge against ${comp.name}: Rather than competing on general broad outpatient services where they have entrenched physical presence, own the ultra-fast ambient voice documentation wedge. Offer local clinics a zero-click browser extension that eliminates 2 hours of daily typing without demanding software switching.`
    );
  };

  if (loading && !scanning) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span>INITIALIZING MARKET INTELLIGENCE RADAR...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold uppercase">
              LOCAL MARKET PULSE
            </span>
            <EvidenceBadge level="OBSERVED" label="Grounded Local Signals" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Market Intelligence & Local Gap Finder
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real local businesses, competitor review signals, and structural voids within {scanResult?.location.radiusKm || 5} KM.
          </p>
        </div>

        <button
          onClick={triggerMarketScan}
          disabled={scanning}
          className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold transition-all flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
          <span>{scanning ? 'SCANNING MARKET...' : 'RE-SCAN GROUND'}</span>
        </button>
      </div>

      {/* Scanning Overlay / Stepper if in progress */}
      {scanning && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-cyan-500/40 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Active Ground Radar Sweep
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {Math.round(((scanStep + 1) / scanningSteps.length) * 100)}%
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {scanningSteps.map((step, idx) => (
              <div
                key={step}
                className={`flex items-center gap-2.5 transition-colors ${
                  idx < scanStep
                    ? 'text-emerald-400'
                    : idx === scanStep
                    ? 'text-cyan-300 font-semibold animate-pulse'
                    : 'text-slate-600'
                }`}
              >
                {idx < scanStep ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </span>
                )}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Banner */}
      {scanResult && !scanning && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              ENTITIES DISCOVERED
            </span>
            <div className="text-2xl font-bold text-white font-mono mt-1">
              {scanResult.totalBusinessesFound}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">In {scanResult.location.radiusKm}km radius</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">
              RELEVANT COMPETITORS
            </span>
            <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
              {scanResult.relevantCompetitorsCount}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Direct & indirect players</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
              STRUCTURAL MARKET GAPS
            </span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
              {scanResult.possibleGapsCount}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">High opportunity signals</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
              POTENTIAL PARTNERS
            </span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
              {scanResult.partnershipTargetsCount}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Synergistic referral allies</span>
          </div>
        </div>
      )}

      {/* Interactive Competitor Map */}
      {scanResult && !scanning && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
              INTERACTIVE COMPETITOR & PARTNER RADAR
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              Click any pin on map for detail drawer
            </span>
          </div>

          <CompetitorMap
            location={scanResult.location}
            businesses={scanResult.businesses}
            competitors={scanResult.competitors}
            onSelectCompetitor={comp => {
              setSelectedCompetitor(comp);
              setWinWedge(null);
            }}
          />
        </div>
      )}

      {/* Competitor Detail & "HOW CAN I WIN?" Action */}
      {selectedCompetitor && !scanning && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 font-semibold uppercase">
                  COMPETITOR INTELLIGENCE
                </span>
                <EvidenceBadge level={selectedCompetitor.evidence.level} label={selectedCompetitor.evidence.label} />
              </div>
              <h3 className="text-xl font-bold text-white">{selectedCompetitor.name}</h3>
              <p className="text-xs text-slate-400">{selectedCompetitor.category} • {selectedCompetitor.distanceMeters}m away</p>
            </div>

            <button
              onClick={() => handleHowCanIWin(selectedCompetitor)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 self-start"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>HOW CAN I WIN?</span>
            </button>
          </div>

          {/* Winning Wedge Banner if Generated */}
          {winWedge && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs font-mono leading-relaxed animate-in fade-in">
              <span className="font-bold block text-emerald-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                STRATEGIC DIFFERENTIATION WEDGE:
              </span>
              {winWedge}
            </div>
          )}

          {/* Strengths, Weaknesses, Pain Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
              <span className="text-slate-400 font-bold block mb-2">INCUMBENT STRENGTHS:</span>
              <ul className="space-y-1 text-slate-300">
                {selectedCompetitor.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
              <span className="text-amber-400 font-bold block mb-2">POTENTIAL WEAKNESSES:</span>
              <ul className="space-y-1 text-slate-300">
                {selectedCompetitor.potentialWeaknesses.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
              <span className="text-rose-400 font-bold block mb-2">CUSTOMER PAIN SIGNALS:</span>
              <ul className="space-y-1 text-rose-300">
                {selectedCompetitor.customerPainSignals.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* WHAT'S MISSING HERE? (Structural Market Gap Finder) */}
      {scanResult && !scanning && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold tracking-wider block">
                WHAT'S MISSING HERE?
              </span>
              <h3 className="text-lg font-bold text-white">Structural Market Gaps & Voids</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Category Competition Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanResult.gaps.map(gap => (
              <div
                key={gap.id}
                className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      gap.competitionLevel === 'LOW'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      COMPETITION: {gap.competitionLevel}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      Confidence: {gap.confidenceScore}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{gap.category}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {gap.opportunitySignal}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono text-amber-300">
                    <span className="text-slate-500 font-semibold">Validation Needed: </span>
                    {gap.validationNeeded}
                  </div>
                  <EvidenceBadge level={gap.evidence.level} label={gap.evidence.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Step CTA */}
      <div className="flex justify-end pt-2">
        <Link
          to="/opportunities"
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <span>VIEW 12 GROUNDED OPPORTUNITIES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
