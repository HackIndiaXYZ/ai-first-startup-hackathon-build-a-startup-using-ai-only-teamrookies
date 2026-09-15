import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  MVPPlan,
  AIBuildLogItem,
  QABreakResult,
  SecurityReadinessResult
} from '../types';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  Hammer,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Bug,
  Lock,
  Layers,
  Terminal,
  Calendar,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const MVPBuilderPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'spec' | 'not_to_build' | 'build_logs' | 'qa' | 'security'>('spec');
  const [plan, setPlan] = useState<MVPPlan | null>(null);
  const [logs, setLogs] = useState<AIBuildLogItem[]>([]);
  const [qa, setQA] = useState<QABreakResult | null>(null);
  const [security, setSecurity] = useState<SecurityReadinessResult | null>(null);

  useEffect(() => {
    loadMVPData();
  }, []);

  const loadMVPData = async () => {
    try {
      setLoading(true);
      const planRes = await api.getMVPPlan();
      setPlan(planRes.plan);
      const logsRes = await api.getBuildLogs();
      setLogs(logsRes.logs);
      const qaRes = await api.breakApp();
      setQA(qaRes.qa);
      const secRes = await api.getSecurity();
      setSecurity(secRes.security);
    } catch (err) {
      console.error('Error loading MVP data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !plan || !qa || !security) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>COMPILING SCOPE-GUARDED MVP BLUEPRINT...</span>
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
              DECISION TO CODE
            </span>
            <EvidenceBadge level="VERIFIED" label="Scope-Guarded Architecture" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MVP Builder & AI Execution
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            From strategic decision to execution: core features, scope bounds, QA tests, and security readiness.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('spec')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'spec'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Hammer className="w-4 h-4 text-emerald-400" />
          <span>Core MVP Features</span>
        </button>

        <button
          onClick={() => setActiveTab('not_to_build')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'not_to_build'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-700 shadow-sm'
              : 'text-slate-400 hover:text-rose-300'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>🚫 What NOT To Build Yet</span>
        </button>

        <button
          onClick={() => setActiveTab('build_logs')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'build_logs'
              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>AI Build Agent Logs</span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'qa'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-700 shadow-sm'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <Bug className="w-4 h-4 text-amber-400" />
          <span>Break My App (QA Tests)</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'security'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Security Readiness ({security.score}%)</span>
        </button>
      </div>

      {/* TAB 1: CORE FEATURES & ARCHITECTURE */}
      {activeTab === 'spec' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Summary */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-semibold block">
              MINIMUM VIABLE PRODUCT (MVP) BLUEPRINT
            </span>
            <h3 className="text-xl font-bold text-white">{plan.startupName} Core Architecture</h3>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {plan.valueProposition}
            </p>
          </div>

          {/* Features by Priority */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              P0 & P1 Core Feature Scope
            </h3>
            <div className="space-y-3">
              {plan.coreFeatures.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-slate-200 text-sm">{f.name}</span>
                    <p className="text-slate-400 leading-relaxed">{f.description}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase flex-shrink-0 self-start ${
                    f.priority.includes('P0')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                  }`}>
                    {f.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture Stack */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Verified Technical Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">FRONTEND:</span>
                <span className="text-slate-200">{plan.architecture.frontend}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">BACKEND:</span>
                <span className="text-slate-200">{plan.architecture.backend}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">DATABASE:</span>
                <span className="text-slate-200">{plan.architecture.database}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">AI ENGINE:</span>
                <span className="text-emerald-400">{plan.architecture.aiEngine}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">AUTHENTICATION:</span>
                <span className="text-slate-200">{plan.architecture.auth}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-500 font-bold block mb-1">DEPLOYMENT:</span>
                <span className="text-slate-200">{plan.architecture.deployment}</span>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              3-Week Sprint Roadmap
            </h3>
            <div className="space-y-3">
              {plan.developmentRoadmap.map((r, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-200 font-bold">
                    <span>{r.phase}</span>
                    <span className="text-cyan-400">{r.timeframe}</span>
                  </div>
                  <div className="space-y-1 text-slate-400">
                    {r.deliverables.map((d, i) => (
                      <div key={i}>• {d}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 🚫 WHAT NOT TO BUILD YET */}
      {activeTab === 'not_to_build' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-rose-950/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>THE ANTI-SCOPE CREEP MANIFESTO</span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              More startups die from indigestion than starvation. These are features that sound good but will kill your speed to market if built before securing initial paid clinics.
            </p>

            <div className="space-y-3 pt-2">
              {plan.whatNotToBuildYet.map((omit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 space-y-1 text-xs font-mono"
                >
                  <span className="text-rose-400 font-bold text-sm block">
                    🚫 DO NOT BUILD: {omit.feature}
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    <span className="text-slate-500 font-semibold">Strategic Rationale: </span>
                    {omit.reasonToOmit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI BUILD AGENT LOGS */}
      {activeTab === 'build_logs' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>AI BUILD AGENT EXECUTION TRACE</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">7/7 STEPS COMPLETED</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {logs.map(log => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-200">{log.step}</span>
                      <p className="text-[11px] text-slate-400">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-dark-900 text-slate-500 border border-slate-800">
                      {log.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BREAK MY APP (QA Stress Testing) */}
      {activeTab === 'qa' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
                <Bug className="w-4 h-4" />
                <span>BREAK MY APP QA TEST SUITE</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                SYSTEM HEALTH: {qa.overallHealth}%
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              Stress-testing authentication, network dropouts, background noise, and double-click form idempotency across {qa.testSuitesRun} automated test cases.
            </p>

            <div className="space-y-3 pt-2">
              {qa.bugsFound.map(bug => (
                <div
                  key={bug.id}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 space-y-2 text-xs font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{bug.bug}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      bug.severity === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {bug.severity}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Location: </span>
                    {bug.location}
                  </div>
                  <div className="text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                    <span className="font-semibold text-emerald-400">Suggested Fix: </span>
                    {bug.suggestedFix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY READINESS */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>AUTOMATED SECURITY READINESS AUDIT</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                READINESS: {security.score}/100
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {security.checks.map(chk => (
                <div
                  key={chk.name}
                  className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-bold text-slate-200">{chk.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-5">{chk.details}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase flex-shrink-0">
                    {chk.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-500 text-center">
              {security.disclaimer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
