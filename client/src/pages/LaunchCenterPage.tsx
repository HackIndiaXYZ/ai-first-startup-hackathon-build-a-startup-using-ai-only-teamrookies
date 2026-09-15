import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { LaunchCenterKit } from '../types';
import { EvidenceBadge } from '../components/common/EvidenceBadge';
import {
  Rocket,
  Sparkles,
  Share2,
  Mail,
  Video,
  FileText,
  Users,
  Copy,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const LaunchCenterPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [kit, setKit] = useState<LaunchCenterKit | null>(null);
  const [activeTab, setActiveTab] = useState<'copy' | 'pricing' | 'social' | 'email' | 'pitch' | 'first100'>('copy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    loadLaunchKit();
  }, []);

  const loadLaunchKit = async () => {
    try {
      setLoading(true);
      const res = await api.getLaunchKit();
      setKit(res.kit);
    } catch (err) {
      console.error('Failed to load launch kit:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (loading || !kit) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <span>GENERATING INVESTOR-GRADE GO-TO-MARKET KIT...</span>
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
              GO-TO-MARKET ASSETS
            </span>
            <EvidenceBadge level="VERIFIED" label="Ready to Ship" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Launch Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            High-converting copy, pricing tiers, social announcement threads, cold email campaign, and pitch script.
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('copy')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'copy'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Landing Page Copy
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'pricing'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pricing Tiers
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'social'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Social Announcements
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'email'
              ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Doctor Outreach Email
        </button>

        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'pitch'
              ? 'bg-amber-950 text-amber-300 border border-amber-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2-Min Demo Pitch Script
        </button>

        <button
          onClick={() => setActiveTab('first100')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'first100'
              ? 'bg-rose-950 text-rose-300 border border-rose-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          First 100 Clinics Plan
        </button>
      </div>

      {/* TAB 1: LANDING PAGE COPY */}
      {activeTab === 'copy' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5 animate-in fade-in">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                HERO HEADLINE & VALUE PROP
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                "{kit.landingPageCopy.heroHeading}"
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(kit.landingPageCopy.heroHeading, 'hero')}
              className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'hero' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'hero' ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            <span className="text-slate-500 font-bold block mb-1">HERO SUBHEADING:</span>
            {kit.landingPageCopy.heroSubheading}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-300 block">
              SUPPORTING BENEFIT BULLETS:
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              {kit.landingPageCopy.bulletPoints.map((bp, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-dark-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING TIERS */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
          {kit.pricingTiers.map(tier => (
            <div
              key={tier.name}
              className={`p-6 rounded-2xl bg-dark-900 border flex flex-col justify-between space-y-4 ${
                tier.recommended
                  ? 'border-emerald-500 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                  : 'border-slate-800'
              }`}
            >
              <div>
                {tier.recommended && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase mb-2 inline-block">
                    RECOMMENDED BEACHHEAD
                  </span>
                )}
                <h4 className="text-lg font-bold text-white mb-1">{tier.name}</h4>
                <div className="text-2xl font-extrabold text-white font-mono mb-4">
                  {tier.price}
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {tier.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SOCIAL ANNOUNCEMENTS */}
      {activeTab === 'social' && (
        <div className="space-y-6 animate-in fade-in">
          {kit.socialAnnouncementPosts.map((post, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {post.platform} LAUNCH POST
                </span>
                <button
                  onClick={() => copyToClipboard(post.content, `social-${idx}`)}
                  className="px-3 py-1 rounded-lg bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
                >
                  {copiedKey === `social-${idx}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === `social-${idx}` ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: COLD EMAIL CAMPAIGN */}
      {activeTab === 'email' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">SUBJECT:</span>
              <h3 className="text-base font-bold text-white font-mono mt-0.5">
                {kit.coldEmailCampaign.subject}
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(`${kit.coldEmailCampaign.subject}\n\n${kit.coldEmailCampaign.body}`, 'email')}
              className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'email' ? 'COPIED' : 'COPY EMAIL'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
            {kit.coldEmailCampaign.body}
          </div>
        </div>
      )}

      {/* TAB 5: DEMO PITCH SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 animate-in fade-in">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
            2-MINUTE INVESTOR & HACKATHON STAGE SCRIPT
          </span>
          <div className="space-y-3">
            {kit.demoScript.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex items-start gap-4 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-dark-900 text-amber-400 border border-amber-900/60 font-bold flex-shrink-0">
                  {step.timingSeconds}s
                </span>
                <div className="space-y-1">
                  <span className="font-bold text-white text-sm">{step.section}</span>
                  <p className="text-slate-300 leading-relaxed">{step.spokenNotes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: FIRST 100 CLINICS PLAN */}
      {activeTab === 'first100' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 animate-in fade-in">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
            FIRST 100 CUSTOMERS PLAYBOOK (90 DAYS)
          </span>
          <div className="space-y-3">
            {kit.first100CustomersPlan.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-200">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
