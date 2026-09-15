import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  IdeaDecomposition,
  KillTestReport,
  DifferentiationStrategy,
  StrategyBattleOption
} from '../types';
import { ScoreRing } from '../components/common/ScoreRing';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  Skull,
  Sparkles,
  Swords,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Zap,
  Lightbulb,
  RefreshCw,
  Layers
} from 'lucide-react';

export const IdeaLabPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'deconstruct' | 'kill' | 'unique' | 'battle'>('kill');
  const [currentIdea, setCurrentIdea] = useState<IdeaDecomposition | null>(null);
  const [killReport, setKillReport] = useState<KillTestReport | null>(null);
  const [differentiation, setDifferentiation] = useState<DifferentiationStrategy | null>(null);
  const [strategies, setStrategies] = useState<StrategyBattleOption[]>([]);
  const [rawIdeaInput, setRawIdeaInput] = useState('');
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getCurrentIdea();
      if (res.currentIdea) {
        setCurrentIdea(res.currentIdea);
        setRawIdeaInput(res.currentIdea.title);
      } else {
        const defaultDecon = await api.deconstructIdea('ClinicFlow AI: Ambient Outpatient Clinical Copilot');
        setCurrentIdea(defaultDecon.idea);
        setRawIdeaInput(defaultDecon.idea.title);
      }

      if (res.killTestReport) {
        setKillReport(res.killTestReport);
      } else {
        const killRes = await api.killMyStartup();
        setKillReport(killRes.report);
      }

      if (res.differentiation) {
        setDifferentiation(res.differentiation);
      } else {
        const diffRes = await api.differentiateIdea();
        setDifferentiation(diffRes.differentiation);
      }

      const battleRes = await api.battleStrategies();
      setStrategies(battleRes.strategies);
    } catch (err) {
      console.error('Failed to load Idea Lab data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeconstruct = async () => {
    if (!rawIdeaInput.trim()) return;
    setProcessingAction('deconstruct');
    try {
      const decon = await api.deconstructIdea(rawIdeaInput);
      setCurrentIdea(decon.idea);
      const kill = await api.killMyStartup(decon.idea);
      setKillReport(kill.report);
      const diff = await api.differentiateIdea(decon.idea);
      setDifferentiation(diff.differentiation);
      const battle = await api.battleStrategies(decon.idea);
      setStrategies(battle.strategies);
      setActiveTab('kill');
    } catch (err) {
      console.error('Deconstruct error:', err);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRunKillTest = async () => {
    setProcessingAction('kill');
    try {
      const kill = await api.killMyStartup(currentIdea || undefined);
      setKillReport(kill.report);
    } catch (err) {
      console.error('Kill test error:', err);
    } finally {
      setProcessingAction(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <span>INITIALIZING IDEA STRESS-TEST ENGINE...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-semibold uppercase">
              SIGNATURE STRESS-TEST
            </span>
            <EvidenceBadge level="ESTIMATED" label="Devil's Advocate Heuristics" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Idea Lab & Kill Test
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            We don't flatter ideas. We attack assumptions, uncover fatal failure points, and build defensible differentiation.
          </p>
        </div>
      </div>

      {/* Idea Input & Switcher Banner */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={rawIdeaInput}
            onChange={e => setRawIdeaInput(e.target.value)}
            placeholder="Type any startup idea to stress-test..."
            className="w-full px-4 py-2.5 bg-dark-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
          />
        </div>
        <button
          onClick={handleDeconstruct}
          disabled={processingAction !== null}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-rose-950/40 flex items-center justify-center gap-2 flex-shrink-0"
        >
          {processingAction === 'deconstruct' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Skull className="w-3.5 h-3.5" />
          )}
          <span>{processingAction === 'deconstruct' ? 'ATTACKING...' : 'DECONSTRUCT & ATTACK'}</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('kill')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'kill'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-700/80 shadow-lg shadow-rose-950/50'
              : 'text-slate-400 hover:text-rose-300'
          }`}
        >
          <Skull className="w-4 h-4 text-rose-400" />
          <span> KILL MY STARTUP ({killReport?.survivalScore || 68}/100)</span>
        </button>

        <button
          onClick={() => setActiveTab('unique')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'unique'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 shadow-lg shadow-emerald-950/50'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span> MAKE IT UNIQUE (10 Vectors)</span>
        </button>

        <button
          onClick={() => setActiveTab('battle')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'battle'
              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/80 shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <Swords className="w-4 h-4 text-cyan-400" />
          <span>STARTUP BATTLE (4 Strategies)</span>
        </button>

        <button
          onClick={() => setActiveTab('deconstruct')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'deconstruct'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Idea Building Blocks</span>
        </button>
      </div>

      {/* TAB 1: 💀 KILL MY STARTUP */}
      {activeTab === 'kill' && killReport && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Survival Verdict Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Survival Score Ring */}
            <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-2">
                HEURISTIC SURVIVAL INDEX
              </span>
              <ScoreRing score={killReport.survivalScore} size={135} label="Survival Odds" sublabel="Pre-Validation Score" />
              <div className="mt-3">
                <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  killReport.riskLevel === 'HIGH RISK'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {killReport.riskLevel}
                </span>
              </div>
            </div>

            {/* Right: The Verdict & Rationale (2 cols) */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    DEVIL'S ADVOCATE VERDICT:
                  </span>
                  <span className={`text-xs font-mono px-3 py-1 rounded-lg font-extrabold uppercase tracking-widest ${
                    killReport.verdict === 'BUILD'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : killReport.verdict === 'MODIFY'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : killReport.verdict === 'VALIDATE_MORE'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}>
                    RECOMMENDATION: {killReport.verdict.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Can this venture survive in the wild?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono mb-4">
                  {killReport.verdictRationale}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>The AI is empowered to recommend "DON'T BUILD".</span>
                <EvidenceBadge level="ESTIMATED" label="Adversarial Attack Analysis" />
              </div>
            </div>
          </div>

          {/* Brutal Killer Questions & Vulnerabilities */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-base font-bold text-white">4 Fatal Stress Questions</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Adversarial Challenges</span>
            </div>

            <div className="space-y-3">
              {killReport.killerQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-200 block">
                      #{idx + 1}: {q.question}
                    </span>
                    <p className="text-xs text-rose-300/90 font-mono leading-relaxed">
                      {q.critique}
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase flex-shrink-0 self-start ${
                    q.severity === 'FATAL'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {q.severity} SEVERITY
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why It May Fail vs How To Fix It */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Why It May Fail */}
            <div className="p-6 rounded-2xl bg-dark-900 border border-rose-950/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>WHY IT MAY FAIL</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {killReport.whyItMayFail.map((failReason, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-dark-950 border border-slate-800/80 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{failReason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How To Fix It */}
            <div className="p-6 rounded-2xl bg-dark-900 border border-emerald-950/60 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>HOW TO FIX IT</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {killReport.howToFixIt.map((fix, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-dark-950 border border-slate-800/80 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action to Make It Unique */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('unique')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>APPLY FIXES: MAKE IT UNIQUE (10 VECTORS)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ✨ MAKE IT UNIQUE */}
      {activeTab === 'unique' && differentiation && (
        <div className="space-y-6 animate-in fade-in">
          {/* Side-by-side Before vs After */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-semibold">
                BEFORE VS AFTER STRATEGIC WEDGE
              </span>
              <EvidenceBadge level="ESTIMATED" label="Moat Engineering" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-[11px] font-mono text-rose-400 font-bold block mb-1">
                  ORIGINAL RAW CONCEPT:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {differentiation.originalIdea}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/60 shadow-lg shadow-emerald-950/30">
                <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">
                  ✨ HIGH-DEFENSIBILITY IMPROVED CONCEPT:
                </span>
                <p className="text-xs text-emerald-200 leading-relaxed font-mono">
                  {differentiation.improvedIdea}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="text-cyan-400 font-bold block mb-1">COMPETITIVE MOAT SYNTHESIS:</span>
              {differentiation.moatSummary}
            </div>
          </div>

          {/* 10 Differentiation Vectors */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              10 Vectors of Unfair Advantage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {differentiation.differentiationVectors.map((v, idx) => (
                <div
                  key={v.vector}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      #{idx + 1}: {v.vector} Wedge
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800">
                      {v.impact} IMPACT
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {v.strategy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('battle')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>COMPARE STRATEGIES (STARTUP BATTLE)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: STARTUP BATTLE */}
      {activeTab === 'battle' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider block">
              STRATEGIC GO-TO-MARKET BATTLE
            </span>
            <h3 className="text-xl font-bold text-white">Compare 4 Strategic Execution Models</h3>
            <p className="text-xs text-slate-400">
              The AI evaluates market potential, technical feasibility, execution risk, and scalability to crown the optimal go-to-market wedge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map(strat => (
              <div
                key={strat.id}
                className={`p-6 rounded-2xl bg-dark-900 border flex flex-col justify-between space-y-4 transition-all ${
                  strat.isRecommended
                    ? 'border-emerald-500 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-950 text-slate-400 border border-slate-800">
                      {strat.strategyType}
                    </span>
                    {strat.isRecommended && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase">
                        🏆 RECOMMENDED STRATEGY
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">{strat.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono mb-4">
                    {strat.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-dark-950 p-2.5 rounded-xl border border-slate-800/80 mb-3 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">FEASIBILITY</span>
                      <span className="text-emerald-400 font-bold">{strat.feasibility}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">SCALABILITY</span>
                      <span className="text-cyan-400 font-bold">{strat.scalability}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">RISK</span>
                      <span className={`font-bold ${strat.riskLevel === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}>
                        {strat.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 font-mono">
                    <span className="text-slate-500 font-semibold block mb-0.5">Recommendation Reason:</span>
                    {strat.recommendationReason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: IDEA BUILDING BLOCKS (Deconstruction) */}
      {activeTab === 'deconstruct' && currentIdea && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">{currentIdea.title}</h3>
            <p className="text-xs text-emerald-400 font-mono">{currentIdea.valueProposition}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">ACUTE PROBLEM:</span>
                <p className="text-slate-200 leading-relaxed">{currentIdea.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">TARGET CUSTOMER:</span>
                <p className="text-slate-200 leading-relaxed">{currentIdea.customer}</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">CORE SOLUTION:</span>
                <p className="text-slate-200 leading-relaxed">{currentIdea.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">BUSINESS MODEL & PRICING:</span>
                <p className="text-slate-200 leading-relaxed">{currentIdea.businessModel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
