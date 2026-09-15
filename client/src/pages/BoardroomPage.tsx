import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BoardroomSession, BoardAgentRole, BoardroomOpinion } from '../types';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  Users,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Shield,
  TrendingUp,
  Cpu,
  Coins,
  Megaphone,
  UserCheck,
  Scale,
  Compass
} from 'lucide-react';

export const BoardroomPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<BoardroomSession | null>(null);
  const [debating, setDebating] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<BoardAgentRole | 'ALL'>('ALL');

  useEffect(() => {
    loadBoardroom();
  }, []);

  const loadBoardroom = async () => {
    try {
      setLoading(true);
      const res = await api.getBoardroom();
      if (res.boardroom) {
        setSession(res.boardroom);
      } else {
        await handleConveneBoard();
      }
    } catch (err) {
      console.error('Boardroom error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConveneBoard = async () => {
    setDebating(true);
    try {
      // Simulate multi-agent thinking latency
      await new Promise(r => setTimeout(r, 700));
      const res = await api.runBoardroom();
      setSession(res.session);
    } catch (err) {
      console.error('Convene board error:', err);
    } finally {
      setDebating(false);
    }
  };

  const getAgentIcon = (role: BoardAgentRole) => {
    switch (role) {
      case 'CEO': return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'CFO': return <Coins className="w-4 h-4 text-amber-400" />;
      case 'CTO': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'CMO': return <Megaphone className="w-4 h-4 text-indigo-400" />;
      case 'CUSTOMER': return <UserCheck className="w-4 h-4 text-rose-400" />;
      case 'MARKET': return <TrendingUp className="w-4 h-4 text-cyan-400" />;
      case 'RISK': return <Scale className="w-4 h-4 text-rose-400" />;
      case 'PRODUCT': return <Sparkles className="w-4 h-4 text-emerald-400" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStanceBadge = (stance: string) => {
    switch (stance) {
      case 'BULLISH':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700 font-bold';
      case 'SKEPTICAL':
        return 'bg-amber-950/80 text-amber-300 border-amber-700 font-bold';
      case 'CRITICAL':
        return 'bg-rose-950/80 text-rose-300 border-rose-700 font-bold';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  if (loading && !debating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span>CONVENING 8 AUTONOMOUS AI C-SUITE AGENTS...</span>
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
              MULTI-AGENT ADVISORY
            </span>
            <EvidenceBadge level="ESTIMATED" label="8 Autonomous Perspectives" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The AI Boardroom
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            CEO, CFO, CTO, CMO, Customer, Market, Risk, and Product agents debating before synthesizing a binding decision.
          </p>
        </div>

        <button
          onClick={handleConveneBoard}
          disabled={debating}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-cyan-950/40 flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${debating ? 'animate-spin' : ''}`} />
          <span>{debating ? 'DEBATING IN PARALLEL...' : 'RE-CONVENE BOARDROOM'}</span>
        </button>
      </div>

      {session && (
        <div className="space-y-6">
          {/* Final Board Decision Banner */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                  SYNTHESIZED BOARDROOM VERDICT
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-extrabold font-mono tracking-wide uppercase px-4 py-1.5 rounded-xl border ${
                    session.finalDecision === 'BUILD'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-lg shadow-emerald-950/40'
                      : session.finalDecision === 'MODIFY'
                      ? 'bg-amber-950 text-amber-300 border-amber-600 shadow-lg shadow-amber-950/40'
                      : session.finalDecision === 'VALIDATE'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-600 shadow-lg shadow-cyan-950/40'
                      : 'bg-rose-950 text-rose-300 border-rose-600 shadow-lg shadow-rose-950/40'
                  }`}>
                    BOARD DECISION: {session.finalDecision}
                  </span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    Confidence: {session.confidenceScore}%
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                <span>Timestamp: {new Date(session.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono mb-5">
              {session.synthesis}
            </p>

            {/* Unanimous Points vs Blocking Concerns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-emerald-400 font-bold block mb-1.5">✓ UNANIMOUS AGREEMENTS:</span>
                <ul className="space-y-1 text-slate-300">
                  {session.unanimousPoints.map((pt, idx) => (
                    <li key={idx}>• {pt}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800/80">
                <span className="text-amber-400 font-bold block mb-1.5">⚠️ BLOCKING CONCERNS TO RESOLVE:</span>
                <ul className="space-y-1 text-slate-300">
                  {session.blockingConcerns.map((bc, idx) => (
                    <li key={idx}>• {bc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Explicit Agent Clashes & Disagreements */}
          {session.disagreements.length > 0 && (
            <div className="p-6 rounded-2xl bg-dark-900 border border-rose-950/60 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>HEATED BOARDROOM DISAGREEMENTS & RESOLUTIONS</span>
              </div>

              <div className="space-y-3">
                {session.disagreements.map((dis, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-dark-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-200">
                        <span className="px-2 py-0.5 rounded bg-dark-900 text-rose-300 border border-rose-900/60">
                          {dis.agents[0]} vs {dis.agents[1]}
                        </span>
                        <span>Topic: {dis.conflictTopic}</span>
                      </div>
                      <p className="text-slate-400">
                        <span className="text-emerald-400 font-semibold">Resolution: </span>
                        {dis.resolutionRecommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8 Agent Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setSelectedAgent('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedAgent === 'ALL'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 8 Members
            </button>
            {session.opinions.map(op => (
              <button
                key={op.agent}
                onClick={() => setSelectedAgent(op.agent)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  selectedAgent === op.agent
                    ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {getAgentIcon(op.agent)}
                <span>{op.agent}</span>
              </button>
            ))}
          </div>

          {/* Agent Debate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.opinions
              .filter(op => selectedAgent === 'ALL' || selectedAgent === op.agent)
              .map(op => (
                <div
                  key={op.agent}
                  className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-dark-950 border border-slate-800 flex items-center justify-center">
                          {getAgentIcon(op.agent)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight">{op.agentName}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block">{op.agentTitle}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${getStanceBadge(op.stance)}`}>
                        {op.stance}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-mono leading-relaxed mb-3">
                      "{op.argument}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono space-y-1">
                    <div className="text-cyan-300">
                      <span className="text-slate-500 font-semibold">Key Condition: </span>
                      {op.keyCondition}
                    </div>
                    {op.clashWith && (
                      <div className="text-rose-400 text-[10px]">
                        Clashed with {op.clashWith}: {op.clashReason}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
