import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { StartupOpportunity } from '../types/index.js';
import { EvidenceBadge } from '../components/common/EvidenceBadge.js';
import {
  Lightbulb,
  Sparkles,
  MapPin,
  Dna,
  ArrowRight,
  Skull,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers,
  Filter
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<StartupOpportunity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'intersection' | 'best_for_you' | 'best_for_area' | 'surprise_me'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const res = await api.getOpportunities();
      if (res.opportunities && res.opportunities.length > 0) {
        setOpportunities(res.opportunities);
        setSelectedId(res.selectedOpportunityId || res.opportunities[0].id);
      } else {
        const gen = await api.generateOpportunities();
        setOpportunities(gen.opportunities);
        if (gen.opportunities.length > 0) {
          setSelectedId(gen.opportunities[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOpportunity = async (opp: StartupOpportunity) => {
    try {
      await api.selectOpportunity(opp.id);
      setSelectedId(opp.id);
      navigate('/idea-lab');
    } catch (err) {
      console.error('Error selecting opportunity:', err);
      navigate('/idea-lab');
    }
  };

  const filteredOpportunities = opportunities.filter(o => {
    if (selectedCategory === 'all') return true;
    return o.categoryType === selectedCategory;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>SYNTHESIZING GROUNDED STARTUP OPPORTUNITIES...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold uppercase">
              OPPORTUNITY RADAR
            </span>
            <span className="text-xs font-mono text-slate-400">
              12 Discovered Ventures
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What Else Can I Build Here?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Grounded venture opportunities generated from Founder DNA, 5KM business density, and observed market gaps.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-800 text-white font-bold border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Opportunities ({opportunities.length})
        </button>

        <button
          onClick={() => setSelectedCategory('intersection')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'intersection'
              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Best Intersection (Founder × Market)</span>
        </button>

        <button
          onClick={() => setSelectedCategory('best_for_you')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'best_for_you'
              ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/50 shadow-sm'
              : 'text-slate-400 hover:text-indigo-300'
          }`}
        >
          <Dna className="w-3.5 h-3.5 text-indigo-400" />
          <span>Best For You (Founder Fit)</span>
        </button>

        <button
          onClick={() => setSelectedCategory('best_for_area')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'best_for_area'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Best For This Area (Market Gaps)</span>
        </button>

        <button
          onClick={() => setSelectedCategory('surprise_me')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'surprise_me'
              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>✨ Surprise Me (Unconventional)</span>
        </button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map(opp => {
          const isSelected = selectedId === opp.id;
          const isIntersection = opp.categoryType === 'intersection';
          const isSurprise = opp.categoryType === 'surprise_me';

          return (
            <div
              key={opp.id}
              className={`p-6 rounded-2xl bg-dark-900 border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-500/80 shadow-xl shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : isIntersection
                  ? 'border-emerald-800/40 hover:border-emerald-700'
                  : isSurprise
                  ? 'border-amber-800/40 hover:border-amber-700'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Category & Score Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isIntersection
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : isSurprise
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : opp.categoryType === 'best_for_you'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                    }`}>
                      {opp.categoryType.replace(/_/g, ' ')}
                    </span>
                    <EvidenceBadge level={opp.evidence.level} label={opp.evidence.label} />
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400">
                    <span>SCORE: {opp.opportunityScore}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {opp.title}
                </h3>
                <p className="text-xs text-emerald-400 font-mono mb-3">
                  "{opp.tagline}"
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {opp.description}
                </p>

                {/* Operational Details */}
                <div className="space-y-2 text-xs font-mono bg-dark-950 p-3 rounded-xl border border-slate-800/80 mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TARGET CUSTOMER:</span>
                    <span className="text-slate-200">{opp.targetCustomer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">BUSINESS MODEL:</span>
                    <span className="text-slate-200">{opp.potentialBusinessModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">LOCAL GROUND WEDGES:</span>
                    <span className="text-cyan-300">{opp.whyHere}</span>
                  </div>
                </div>

                {/* Special Reasoning (Founder Fit vs Local Signal) */}
                {opp.founderFitReason && (
                  <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-[11px] font-mono text-indigo-300 mb-2">
                    <span className="font-bold text-indigo-400 block mb-0.5">Why it fits you:</span>
                    {opp.founderFitReason}
                  </div>
                )}
                {opp.localSignalReason && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-900/40 text-[11px] font-mono text-cyan-300 mb-2">
                    <span className="font-bold text-cyan-400 block mb-0.5">Why it fits this area:</span>
                    {opp.localSignalReason}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectOpportunity(opp)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>SELECT & ENTER IDEA LAB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
