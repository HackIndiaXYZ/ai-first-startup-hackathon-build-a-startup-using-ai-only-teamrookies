import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { FounderDNA, FounderProfile } from '../types/index.js';
import { FounderRadar } from '../components/charts/FounderRadar.js';
import { EvidenceBadge } from '../components/common/EvidenceBadge.js';
import {
  Dna,
  Sparkles,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FounderDNAPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [founderDNA, setFounderDNA] = useState<FounderDNA | null>(null);
  const [profile, setProfile] = useState<FounderProfile | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getProfile();
      setProfile(res.profile);
      if (res.founderDNA) {
        setFounderDNA(res.founderDNA);
      } else {
        const gen = await api.generateFounderDNA(res.profile);
        setFounderDNA(gen.founderDNA);
      }
    } catch (err) {
      console.error('Failed to load DNA:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !founderDNA) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>COMPUTING FOUNDER CAPABILITY PROFILE...</span>
      </div>
    );
  }

  const dimensionsList = [
    { label: 'Technology Depth', score: founderDNA.radar.technology, desc: 'Mastery of fundamental systems and full-stack software.' },
    { label: 'AI Native Intensity', score: founderDNA.radar.ai, desc: 'Propensity for autonomous agentic and streaming LLM workflows.' },
    { label: 'Technical Depth', score: founderDNA.radar.technicalDepth, desc: 'Propensity to solve hard infrastructure problems rather than thin wrappers.' },
    { label: 'Execution Tempo', score: founderDNA.radar.execution, desc: 'Rapid iterative shipping and low-friction MVP delivery.' },
    { label: 'Scalability Focus', score: founderDNA.radar.scalability, desc: 'Bias toward globally distributable software with zero marginal cost.' },
    { label: 'Risk Appetite', score: founderDNA.radar.riskAppetite, desc: 'Tolerance for ambiguous, unproven, and experimental market frontiers.' },
    { label: 'Business & Monetization', score: founderDNA.radar.business, desc: 'Focus on enterprise willingness-to-pay and unit economics.' },
    { label: 'Design & Customer Empathy', score: founderDNA.radar.design, desc: 'Commitment to zero-cognitive-load user experience.' },
    { label: 'Social & Industry Impact', score: founderDNA.radar.socialImpact, desc: 'Mission-driven focus on solving systemic human challenges.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold uppercase">
              CAPABILITY MATRIX
            </span>
            <EvidenceBadge level="OBSERVED" label="Founder DNA Pattern" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Founder DNA Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            A precise startup preference and capability profile — not a personality test.
          </p>
        </div>

        <Link
          to="/onboarding"
          className="px-4 py-2 rounded-xl bg-dark-900 hover:bg-dark-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2 self-start"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Re-Calibrate Preferences</span>
        </Link>
      </div>

      {/* Main Grid: Radar Chart & Executive AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Radar Chart (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                9-DIMENSION CAPABILITY RADAR
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                AVERAGE: {Math.round(Object.values(founderDNA.radar).reduce((a, b) => a + b, 0) / 9)}/100
              </span>
            </div>

            <FounderRadar dna={founderDNA} height={320} />
          </div>

          <div className="mt-4 p-3 rounded-xl bg-dark-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 text-center">
            AI-modeled startup orientation based on 4 selected interests & 7 operational sliders.
          </div>
        </div>

        {/* Right: AI Synthesis & Strengths (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Executive Summary Card */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                AI Capability Synthesis
              </h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed mb-4">
              {founderDNA.executiveSummary}
            </p>
            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 text-xs text-slate-300 font-mono">
              <span className="text-cyan-400 font-bold block mb-1">OPERATIONAL PROFILE:</span>
              {founderDNA.preferencesSummary}
            </div>
          </div>

          {/* Core Strengths */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide mb-3">
              Identified Startup Strengths
            </h3>
            <div className="space-y-2">
              {founderDNA.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-dark-950 border border-slate-800 text-xs font-mono text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Skills Clusters */}
          {profile && (
            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wide block mb-2 font-semibold">
                ACTIVE DOMAIN KNOWLEDGE CLUSTERS:
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 text-xs font-mono"
                  >
                    #{idx + 1} {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed 9-Dimension Table / Cards */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide mb-4">
          Detailed Dimension Scores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensionsList.map(dim => (
            <div key={dim.label} className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-200 font-mono">{dim.label}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{dim.score}/100</span>
              </div>
              <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{dim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="flex justify-end pt-2">
        <Link
          to="/market"
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <span>PROCEED TO 5KM MARKET SCAN</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
