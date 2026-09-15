import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Dna,
  Users,
  Compass,
  Skull,
  Hammer,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { ScoreRing } from '../components/common/ScoreRing.js';
import { EvidenceBadge } from '../components/common/EvidenceBadge.js';
import { FounderRadar } from '../components/charts/FounderRadar.js';
import { FounderDNA, MarketScanResult, StartupScoreBreakdown } from '../types/index.js';

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    founderDNA: FounderDNA | null;
    marketScan: MarketScanResult | null;
    startupScore: StartupScoreBreakdown | null;
    selectedOpportunity: any;
    nextBestAction: any;
  } | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboard();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>INITIALIZING AI COMMAND CENTER...</span>
      </div>
    );
  }

  const { founderDNA, marketScan, startupScore, selectedOpportunity, nextBestAction } = data;

  return (
    <div className="space-y-6">
      {/* Top Banner: Your Next Best Action */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-dark-900 to-cyan-950/40 border border-emerald-500/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase tracking-wider border border-emerald-500/40">
                🎯 YOUR NEXT BEST ACTION
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">Phase: Pre-Build Validation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {nextBestAction?.title || 'Validate Willingness to Pay with 10 Local Clinics'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {nextBestAction?.description || 'Run a shadow consultation in 2 friendly local clinics to benchmark charting latency and confirm willing payment.'}
            </p>
          </div>

          <Link
            to={nextBestAction?.route || '/validation'}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 flex-shrink-0"
          >
            <span>{nextBestAction?.cta || 'LAUNCH EXPERIMENT'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Current Startup Overview & Score Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Startup Card (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-dark-950 text-cyan-400 border border-cyan-800 font-semibold uppercase">
                  ACTIVE FOCUS
                </span>
                <EvidenceBadge level="OBSERVED" label="Grounded Opportunity" />
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                SURVIVAL SCORE: 84%
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              {selectedOpportunity?.title || 'ClinicFlow AI: Ambient Outpatient Clinical Copilot'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {selectedOpportunity?.description || 'Eliminate doctor paperwork burnout with zero-click ambient voice transcription & instant local EHR sync.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono bg-dark-950/70 p-3 rounded-xl border border-slate-800/80 mb-4">
              <div>
                <span className="text-slate-400 block text-[10px]">TARGET CUSTOMER:</span>
                <span className="text-slate-200 font-semibold truncate block">Outpatient Physicians</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">BUSINESS MODEL:</span>
                <span className="text-slate-200 font-semibold">$149 / doctor / mo</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">COMPETITION LEVEL:</span>
                <span className="text-amber-400 font-semibold">Moderate Incumbents</span>
              </div>
            </div>
          </div>

          {/* Signature Action Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-800">
            <Link
              to="/idea-lab"
              className="px-3.5 py-2 rounded-lg bg-rose-950/50 hover:bg-rose-950/80 border border-rose-800/60 text-rose-300 font-mono text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Skull className="w-3.5 h-3.5 text-rose-400" />
              <span> Kill My Startup</span>
            </Link>

            <Link
              to="/boardroom"
              className="px-3.5 py-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Convene AI Board</span>
            </Link>

            <Link
              to="/mvp"
              className="px-3.5 py-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Hammer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Build MVP Spec</span>
            </Link>
          </div>
        </div>

        {/* Score Ring & Heuristic Breakdown (1 col) */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col items-center justify-between text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
            DECISION SUPPORT SCORE
          </span>

          <div className="my-2">
            <ScoreRing
              score={startupScore?.overallScore || 84}
              size={130}
              label="Startup Viability Score"
              sublabel="Heuristic Decision Index"
            />
          </div>

          <div className="w-full text-left bg-dark-950 p-3 rounded-xl border border-slate-800/80 text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Founder Fit:</span>
              <span className="text-emerald-400 font-bold">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Local Market Gap:</span>
              <span className="text-cyan-400 font-bold">88%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Technical Feasibility:</span>
              <span className="text-emerald-400 font-bold">90%</span>
            </div>
          </div>

          <Link
            to="/simulator"
            className="w-full mt-3 py-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 text-center block"
          >
            View Full Score Breakdown & Simulator →
          </Link>
        </div>
      </div>

      {/* Second Row: Market Pulse & Founder DNA Radar Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Pulse */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h4 className="text-base font-bold text-white">5KM Market Pulse</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-950 text-cyan-300 border border-slate-800">
                {marketScan?.location.name || 'Bengaluru Corridor'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-2xl font-bold text-white font-mono">
                  {marketScan?.totalBusinessesFound || 143}
                </span>
                <span className="text-xs text-slate-400 block">Entities Found</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-2xl font-bold text-rose-400 font-mono">
                  {marketScan?.relevantCompetitorsCount || 18}
                </span>
                <span className="text-xs text-slate-400 block">Relevant Competitors</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-2xl font-bold text-amber-400 font-mono">
                  {marketScan?.possibleGapsCount || 7}
                </span>
                <span className="text-xs text-slate-400 block">Possible Gaps</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  {marketScan?.partnershipTargetsCount || 24}
                </span>
                <span className="text-xs text-slate-400 block">Partnership Targets</span>
              </div>
            </div>
          </div>

          <Link
            to="/market"
            className="w-full py-2.5 rounded-xl bg-dark-950 hover:bg-dark-800 border border-slate-800 text-xs font-mono text-center text-slate-200 transition-colors"
          >
            Explore Interactive Competitor Map & Gaps →
          </Link>
        </div>

        {/* Founder DNA Preview */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Dna className="w-4 h-4 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Founder DNA</h4>
              </div>
              <EvidenceBadge level="OBSERVED" label="Capability Matrix" />
            </div>

            {founderDNA && (
              <div className="my-1">
                <FounderRadar dna={founderDNA} height={200} />
              </div>
            )}

            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
              {founderDNA?.executiveSummary || 'High technical depth founder suited for autonomous AI agent architectures and B2B scalable software.'}
            </p>
          </div>

          <Link
            to="/founder-dna"
            className="w-full py-2.5 rounded-xl bg-dark-950 hover:bg-dark-800 border border-slate-800 text-xs font-mono text-center text-slate-200 transition-colors mt-3"
          >
            View Detailed Capability Breakdown →
          </Link>
        </div>
      </div>
    </div>
  );
};
