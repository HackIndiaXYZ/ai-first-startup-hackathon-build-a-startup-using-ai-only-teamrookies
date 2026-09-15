import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Lightbulb,
  Skull,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  Dna,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import { Logo } from '../components/common/Logo';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-primary/20 selection:text-emerald-400">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-dark-950/70 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/idea-lab"
              className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 transition-colors hidden sm:block"
            >
              I Already Have An Idea
            </Link>
            <Link
              to="/onboarding"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-xs font-mono transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
            >
              Discover My Startup →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/60 tech-grid">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            DON'T BUILD FIRST. DISCOVER & VALIDATE FIRST.
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Your next startup could be hiding in your skills —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
              or on your street.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            AI COMPANY discovers real opportunities, analyzes your local market, attacks weak ideas, finds defensible differentiation, validates demand, and helps you turn the strongest opportunity into a real startup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group"
            >
              <span>DISCOVER MY STARTUP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/idea-lab"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-900 hover:bg-dark-850 text-slate-200 border border-slate-700/80 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>I ALREADY HAVE AN IDEA</span>
            </Link>
          </div>

          {/* Supporting Visual Flow */}
          <div className="mt-16 pt-10 border-t border-slate-800/80">
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4">
              THE DECISION INTELLIGENCE EQUATION
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-semibold">
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-slate-300">FOUNDER</span>
              <span className="text-slate-600">+</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-cyan-400">LOCATION</span>
              <span className="text-slate-600">+</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-amber-400">MARKET</span>
              <span className="text-slate-600">+</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-emerald-400">AI REASONING</span>
              <span className="text-emerald-400">↓</span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                VALIDATED STARTUP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Crucial Problem Section: Should you build this at all? */}
      <section className="py-20 px-6 border-b border-slate-800/60 bg-dark-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-xs font-mono text-rose-400 mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                THE STARTUP GRAVEYARD
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Most startup tools ask the wrong question.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Most AI startup tools simply generate names, write generic pitch decks, and flatter weak ideas. They push you to build before knowing if anyone cares.
              </p>
              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-slate-300 text-sm leading-relaxed font-mono">
                <span className="text-emerald-400 font-bold block mb-1">AI COMPANY asks the real question:</span>
                "Should you build this at all? What makes it defensible? What will kill it? And how can you make it truly unique before writing a single line of code?"
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-dark-950/90 border border-slate-800/90 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center flex-shrink-0 text-emerald-400 font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Understand You (Founder DNA)</h3>
                  <p className="text-xs text-slate-400">Calculates your startup capability and preference profile across 9 dimensions.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/90 border border-slate-800/90 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center flex-shrink-0 text-cyan-400 font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Understand Your Ground (5KM Market Scan)</h3>
                  <p className="text-xs text-slate-400">Maps nearby competitors, customer review pain signals, category density, and structural gaps.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/90 border border-slate-800/90 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center flex-shrink-0 text-rose-400 font-mono font-bold text-xs">
                  03
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">💀 Kill My Startup (Stress Test)</h3>
                  <p className="text-xs text-slate-400">Devil's advocate AI attacks the idea with honest survival scores and "Don’t Build" verdicts.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/90 border border-slate-800/90 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center flex-shrink-0 text-indigo-400 font-mono font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">AI Boardroom & MVP Roadmap</h3>
                  <p className="text-xs text-slate-400">8 autonomous C-suite AI agents debate your strategy before generating a scope-guarded MVP plan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three-Question Core Product Model */}
      <section className="py-20 px-6 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest block mb-2">
              FOUNDATIONAL METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Three-Question Product Model
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Every recommendation on AI COMPANY stems from three grounded vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: What Should I Build? */}
            <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 mb-4">
                  <Dna className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block font-semibold mb-1">
                  VECTOR 01
                </span>
                <h3 className="text-xl font-bold text-white mb-2">What Should I Build?</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Based primarily on your Founder DNA, technical depth, risk tolerance, and scalability appetite.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-1.5">• Skills & Domain Knowledge</div>
                  <div className="flex items-center gap-1.5">• AI Intensity & Tech Stack</div>
                  <div className="flex items-center gap-1.5">• Execution Speed & B2B vs B2C</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <EvidenceBadge level="OBSERVED" label="Founder Fit Signal" />
              </div>
            </div>

            {/* Card 2: What Should Be Built Here? */}
            <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400 mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold mb-1">
                  VECTOR 02
                </span>
                <h3 className="text-xl font-bold text-white mb-2">What Should Be Built Here?</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Based purely on local market data, competitor reviews, category density, and observable public signals.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-1.5">• 5KM Radius Cluster Density</div>
                  <div className="flex items-center gap-1.5">• Customer Pain Complaints</div>
                  <div className="flex items-center gap-1.5">• Missing Service Gaps</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <EvidenceBadge level="VERIFIED" label="Local Directory Data" />
              </div>
            </div>

            {/* Card 3: What Should I Build Here? */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-dark-900 to-emerald-950/20 border border-emerald-500/40 hover:border-emerald-500/70 transition-colors flex flex-col justify-between shadow-xl shadow-emerald-950/20">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold mb-1">
                  THE GOLDEN INTERSECTION
                </span>
                <h3 className="text-xl font-bold text-white mb-2">What Should I Build Here?</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Founder × Market. The highest conviction recommendation where your unique technical capability solves an urgent local problem.
                </p>
                <div className="space-y-1.5 text-xs text-emerald-300 font-mono">
                  <div className="flex items-center gap-1.5 font-semibold">✓ Maximum Unfair Advantage</div>
                  <div className="flex items-center gap-1.5 font-semibold">✓ Grounded Beachhead Wedge</div>
                  <div className="flex items-center gap-1.5 font-semibold">✓ Built-In Partner Flywheel</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-900/40">
                <EvidenceBadge level="ESTIMATED" label="Top Convergence Wedge" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Moments Preview */}
      <section className="py-20 px-6 border-b border-slate-800/60 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-2">
              SIGNATURE UX MOMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              An AI Decision Engine That Thinks With You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-dark-950 border border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm mb-2">
                <Skull className="w-4 h-4" />
                <span>💀 Kill My Startup</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Brutal devil's advocate stress-testing. Transparent survival score and honest "Don't Build This" recommendations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-dark-950 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm mb-2">
                <Users className="w-4 h-4" />
                <span>AI Boardroom Debate</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                8 specialized C-Suite agents (CEO, CFO, CTO, CMO, Customer, Market, Risk, Product) clashing before synthesizing a decision.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-dark-950 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>✨ Surprise Me Opportunity</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recommends unconventional, high-signal local opportunities outside your usual comfort zone where you have unfair tech leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to find what actually deserves to be built?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 font-mono">
            Stop guessing. Discover, validate, differentiate, and decide with AI COMPANY.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-emerald-500/25"
          >
            <span>START DISCOVERY NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};
