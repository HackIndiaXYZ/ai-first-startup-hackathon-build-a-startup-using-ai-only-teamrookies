import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { PublicSurvey } from '../types';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  Users,
  BarChart3,
  HelpCircle,
  ExternalLink,
  Copy,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';

export const ValidationLabPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [experiments, setExperiments] = useState<any[]>([]);
  const [survey, setSurvey] = useState<PublicSurvey | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const expRes = await api.getValidationExperiments();
      setExperiments(expRes.experiments);
      const survRes = await api.getSurvey('survey-ai-co-default');
      setSurvey(survRes.survey);
    } catch (err) {
      console.error('Validation data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const publicSurveyUrl = `${window.location.origin}/survey/survey-ai-co-default`;

  const copySurveyUrl = () => {
    navigator.clipboard.writeText(publicSurveyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading || !survey) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>INITIALIZING VALIDATION EXPERIMENT MATRIX...</span>
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
              EVIDENCE LAB
            </span>
            <EvidenceBadge level="VERIFIED" label="Real Respondent Data" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Validation Lab & Customer Signals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Convert risky assumptions into verifiable market proof through structured experiments and real public surveys.
          </p>
        </div>
      </div>

      {/* Real Respondent Analytics Dashboard (Separated from AI estimates) */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-semibold block mb-0.5">
              REAL MARKET VALIDATION METRICS
            </span>
            <h3 className="text-lg font-bold text-white">
              Customer Feedback Analytics ({survey.totalResponses} Verified Responses)
            </h3>
          </div>

          {/* Shareable Link Box */}
          <div className="flex items-center gap-2 self-start">
            <button
              onClick={copySurveyUrl}
              className="px-3.5 py-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'LINK COPIED!' : 'COPY SURVEY LINK'}</span>
            </button>
            <Link
              to="/survey/survey-ai-co-default"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold flex items-center gap-1"
            >
              <span>OPEN SURVEY</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">HIGH INTEREST</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
              {survey.analytics.interestedPercent}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Acute pain confirmed</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">WILLING TO PAY</span>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
              {survey.analytics.wouldPayPercent}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">$149/mo pilot threshold</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">EVALUATING / MAYBE</span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
              {survey.analytics.maybePercent}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Requires clinical proof</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">NOT INTERESTED</span>
            <div className="text-2xl font-bold text-slate-400 font-mono mt-1">
              {survey.analytics.notInterestedPercent}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Happy with paper notes</span>
          </div>
        </div>

        {/* Top Requested Features & AI Synthesis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
              TOP REQUESTED CAPABILITIES BY DOCTORS:
            </span>
            <div className="space-y-1.5">
              {survey.analytics.topRequestedFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-2">
              AI RESPONSE SYNTHESIS:
            </span>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {survey.analytics.summaryInsight}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: ACTIVE VALIDATION EXPERIMENTS */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
          Structured Assumption-Killing Experiments
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map(exp => (
            <div
              key={exp.id}
              className="p-5 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800">
                    {exp.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    exp.status === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-dark-900 text-slate-400 border border-slate-800'
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{exp.title}</h4>

                <div className="space-y-2 text-xs font-mono mb-3">
                  <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                    <span className="text-slate-500 font-bold block mb-0.5">HYPOTHESIS TO TEST:</span>
                    <p className="text-slate-300">{exp.hypothesis}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-0.5">SUCCESS CRITERIA:</span>
                    <p className="text-slate-300">{exp.successCriteria}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {exp.expectedDurationDays} days
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  ${exp.estimatedBudgetUsd} budget
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
