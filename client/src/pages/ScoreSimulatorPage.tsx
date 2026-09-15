import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { StartupScoreBreakdown, SimulatorRunResult } from '../types';
import { ScoreRing } from '../components/common/ScoreRing';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Sliders,
  DollarSign,
  Users,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ScoreSimulatorPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<StartupScoreBreakdown | null>(null);
  const [simulator, setSimulator] = useState<SimulatorRunResult | null>(null);
  const [inputs, setInputs] = useState({
    price: 149,
    customersM1: 15,
    conversionRatePercent: 8.5,
    churnRatePercent: 3.5,
    monthlyMarketingBudget: 1200,
    cac: 180,
    operatingCostsMonthly: 2500
  });
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const scoreRes = await api.getScore();
      setScore(scoreRes.score);
      const simRes = await api.runSimulator(inputs);
      setSimulator(simRes.simulator);
    } catch (err) {
      console.error('Error loading score & simulator:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      const simRes = await api.runSimulator(inputs);
      setSimulator(simRes.simulator);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setSimulating(false);
    }
  };

  if (loading || !score || !simulator) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>COMPUTING HEURISTIC SCORE & FINANCIAL SCENARIOS...</span>
      </div>
    );
  }

  const dimensionEntries = Object.entries(score.dimensions);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold uppercase">
              DECISION SUPPORT
            </span>
            <EvidenceBadge level="ESTIMATED" label="Heuristic Modeling" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Startup Score & Financial Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            A transparent 10-dimension heuristic viability index coupled with 12-month unit economic scenario modeling.
          </p>
        </div>
      </div>

      {/* SECTION 1: 10-FACTOR STARTUP SCORE */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Score Ring */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-dark-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
              OVERALL HEURISTIC SCORE
            </span>
            <ScoreRing score={score.overallScore} size={145} label="Venture Viability" sublabel="84 / 100 Index" />
            <div className="mt-3 text-[11px] font-mono text-emerald-400">
              High Venture Conviction
            </div>
          </div>

          {/* Key Insights */}
          <div className="lg:col-span-8 space-y-3">
            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 text-xs font-mono">
              <span className="text-emerald-400 font-bold block mb-1">
                ✓ STRONGEST FACTOR ({score.strongestFactor.score}%): {score.strongestFactor.factor}
              </span>
              <p className="text-slate-300">{score.strongestFactor.reason}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 text-xs font-mono">
              <span className="text-amber-400 font-bold block mb-1">
                ⚠️ WEAKEST FACTOR ({score.weakestFactor.score}%): {score.weakestFactor.factor}
              </span>
              <p className="text-slate-300">{score.weakestFactor.reason}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 text-xs font-mono">
              <span className="text-cyan-400 font-bold block mb-1">
                ❓ BIGGEST UNCERTAINTY:
              </span>
              <p className="text-slate-300">{score.biggestUncertainty}</p>
            </div>
          </div>
        </div>

        {/* 10 Dimension Progress Bars */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-4">
            10-DIMENSION HEURISTIC BREAKDOWN:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {dimensionEntries.map(([key, val]) => (
              <div key={key} className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-300 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-emerald-400 font-bold">{val}%</span>
                </div>
                <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-500 text-center">
          {score.disclaimer}
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE FINANCIAL SIMULATOR */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-mono uppercase">
                12-Month Startup Financial Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Adjust price, CAC, and conversion variables to project Conservative, Base, and Aggressive outcomes.
            </p>
          </div>

          <button
            onClick={handleSimulate}
            disabled={simulating}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-cyan-950/40 flex items-center gap-1.5 self-start"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
            <span>UPDATE SCENARIOS</span>
          </button>
        </div>

        {/* Input Sliders & Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Price / Mo:</span>
              <span className="text-emerald-400 font-bold">${inputs.price}</span>
            </div>
            <input
              type="range"
              min="29"
              max="499"
              step="10"
              value={inputs.price}
              onChange={e => setInputs({ ...inputs, price: Number(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Monthly Marketing:</span>
              <span className="text-cyan-400 font-bold">${inputs.monthlyMarketingBudget}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={inputs.monthlyMarketingBudget}
              onChange={e => setInputs({ ...inputs, monthlyMarketingBudget: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Target CAC:</span>
              <span className="text-amber-400 font-bold">${inputs.cac}</span>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={inputs.cac}
              onChange={e => setInputs({ ...inputs, cac: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Monthly Churn:</span>
              <span className="text-rose-400 font-bold">{inputs.churnRatePercent}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={inputs.churnRatePercent}
              onChange={e => setInputs({ ...inputs, churnRatePercent: Number(e.target.value) })}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Side-by-Side Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simulator.scenarios.map(sc => (
            <div
              key={sc.scenarioName}
              className={`p-5 rounded-2xl bg-dark-950 border flex flex-col justify-between space-y-4 ${
                sc.scenarioName === 'Base'
                  ? 'border-emerald-500 shadow-xl shadow-emerald-950/30'
                  : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono px-2.5 py-1 rounded font-bold uppercase ${
                    sc.scenarioName === 'Base'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : sc.scenarioName === 'Aggressive'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {sc.scenarioName} Scenario
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Margin: {sc.grossMarginPercent}%
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">MONTH 12 MRR:</span>
                    <span className="text-2xl font-bold text-white">${sc.monthlyRevenueM12.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">TOTAL YEAR 1:</span>
                      <span className="text-emerald-400 font-bold">${sc.annualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">BREAK-EVEN:</span>
                      <span className="text-cyan-400 font-bold">Month {sc.breakEvenMonth}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ACTIVE CLINICS AT M12:</span>
                    <span className="text-slate-200 font-bold">{sc.totalCustomersM12} Subscriptions</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-300 font-semibold block mb-1">Key Assumptions:</span>
                  {sc.growthAssumptions.map((a, i) => (
                    <div key={i} className="text-slate-400">• {a}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs font-mono text-slate-500">
          {simulator.disclaimer}
        </div>
      </div>
    </div>
  );
};
