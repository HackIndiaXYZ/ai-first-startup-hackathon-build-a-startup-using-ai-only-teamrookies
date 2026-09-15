import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { PublicSurvey } from '../types';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export const PublicSurveyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<PublicSurvey | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSurvey();
  }, [id]);

  const loadSurvey = async () => {
    try {
      setLoading(true);
      const res = await api.getSurvey(id || 'survey-ai-co-default');
      setSurvey(res.survey);
    } catch (err) {
      console.error('Error loading survey:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (qId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!survey) return;
    setSubmitting(true);
    try {
      await api.submitSurveyResponse(survey.id, answers);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !survey) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-3">LOADING MARKET VALIDATION SURVEY...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 tech-grid">
      <div className="w-full max-w-2xl bg-dark-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* Survey Brand */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              {survey.startupName} • Market Discovery
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">100% Anonymous</span>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Thank You For Your Response!</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Your feedback directly impacts product prioritization and clinical workflow optimization.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-800 border border-slate-800 text-xs font-mono text-slate-300 inline-flex items-center gap-2"
              >
                <span>Powered by AI COMPANY Decision Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white mb-2">
                Help Us Build A Better Clinical Workflow
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {survey.valueProposition}
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6 pt-2">
              {survey.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-200 font-mono block">
                    {idx + 1}. {q.questionText}
                  </span>

                  {q.options && (
                    <div className="space-y-2">
                      {q.options.map(opt => {
                        const isChosen = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`w-full p-3 rounded-lg text-left text-xs font-mono transition-all flex items-center justify-between border ${
                              isChosen
                                ? 'bg-emerald-500/15 border-emerald-500/80 text-emerald-200 font-semibold'
                                : 'bg-dark-900 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <span>{opt}</span>
                            {isChosen && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={submitting || Object.keys(answers).length === 0}
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-dark-950 font-bold text-xs font-mono tracking-wide transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'RECORDING RESPONSE...' : 'SUBMIT ANONYMOUS RESPONSE'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
