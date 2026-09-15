import React, { useState } from 'react';
import { api } from '../services/api';
import { AdvisorTriageResult } from '../types';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  MessageSquareCode,
  Sparkles,
  Send,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AdvisorPage: React.FC = () => {
  const [question, setQuestion] = useState('What should I do today?');
  const [triage, setTriage] = useState<AdvisorTriageResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.triageAdvisor(question);
      setTriage(res.triage);
    } catch (err) {
      console.error('Advisor triage error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold uppercase">
              PERSISTENT STRATEGIC ADVISORY
            </span>
            <EvidenceBadge level="ESTIMATED" label="Context-Aware Co-Founder" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Co-Founder & Advisor Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            A persistent AI co-founder that knows your Founder DNA, 5KM ground data, and board consensus to guide daily execution.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
          Ask Your Co-Founder or Request Domain Mentor
        </h3>
        <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask anything (e.g. 'What should I do today?' or 'How do I handle doctor privacy fear?')"
            className="flex-1 px-4 py-3 bg-dark-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-cyan-950/40 flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'REASONING...' : 'ASK CO-FOUNDER'}</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500">Quick Prompts:</span>
          <button
            type="button"
            onClick={() => setQuestion('What should I do today?')}
            className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-slate-700 text-slate-300"
          >
            "What should I do today?"
          </button>
          <button
            type="button"
            onClick={() => setQuestion('Should I raise venture capital or stay bootstrapped?')}
            className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-slate-700 text-slate-300"
          >
            "Bootstrap vs VC?"
          </button>
          <button
            type="button"
            onClick={() => setQuestion('How do I handle clinic liability if an AI dosage note is wrong?')}
            className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-slate-700 text-slate-300"
          >
            "Medical liability shield?"
          </button>
        </div>
      </div>

      {/* AI Triage Response & Prepared Brief */}
      {triage && (
        <div className="space-y-6 animate-in fade-in">
          {/* AI Answer */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-emerald-500/50 space-y-4 shadow-xl shadow-emerald-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI CO-FOUNDER IMMEDIATE STRATEGIC GUIDANCE</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase">
                PRIORITY: {triage.priority}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed bg-dark-950 p-4 rounded-xl border border-slate-800">
              {triage.aiImmediateAnswer}
            </p>
          </div>

          {/* Automated Advisor Context Brief */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  HUMAN ADVISOR CONTEXT BRIEF
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Automated Pre-Compiled Mentorship Brief
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Recommended Mentor Domain: <strong className="text-cyan-400">{triage.recommendedAdvisorDomain}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              When escalating to human mentors, AI COMPANY prevents you from repeating your backstory by generating this instant context dossier:
            </p>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
              <div><strong className="text-slate-400">Startup Focus:</strong> {triage.preparedBrief.startupName}</div>
              <div><strong className="text-slate-400">Ground Location:</strong> {triage.preparedBrief.location}</div>
              <div><strong className="text-slate-400">Market Ground Finding:</strong> {triage.preparedBrief.marketFindings}</div>
              <div><strong className="text-slate-400">Incumbents Mapped:</strong> {triage.preparedBrief.keyCompetitors.join(', ')}</div>
              <div><strong className="text-slate-400">Viability Score:</strong> {triage.preparedBrief.startupScore}/100</div>
              <div><strong className="text-slate-400">Main Strategic Uncertainty:</strong> {triage.preparedBrief.mainConcern}</div>
              <div className="pt-2 border-t border-slate-800 text-cyan-300 font-semibold">
                Question to Mentor: "{triage.preparedBrief.exactQuestion}"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
