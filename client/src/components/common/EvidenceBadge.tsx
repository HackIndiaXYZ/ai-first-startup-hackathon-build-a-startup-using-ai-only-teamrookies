import React from 'react';
import { EvidenceLevel } from '../../types/index.js';
import { ShieldCheck, Eye, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  label?: string;
  sourceDescription?: string;
  className?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  level,
  label,
  sourceDescription,
  className = ''
}) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'VERIFIED':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
          bg: 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300',
          dot: 'bg-emerald-400',
          title: label || 'VERIFIED (Reliable Source / Direct Data)'
        };
      case 'OBSERVED':
        return {
          icon: <Eye className="w-3.5 h-3.5 text-cyan-400" />,
          bg: 'bg-cyan-950/60 border-cyan-700/60 text-cyan-300',
          dot: 'bg-cyan-400',
          title: label || 'OBSERVED (Pattern in Public Signals)'
        };
      case 'ESTIMATED':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-950/60 border-amber-700/60 text-amber-300',
          dot: 'bg-amber-400',
          title: label || 'ESTIMATED (AI Decision Inference)'
        };
      case 'UNVALIDATED':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-orange-400" />,
          bg: 'bg-orange-950/60 border-orange-700/60 text-orange-300',
          dot: 'bg-orange-400',
          title: label || 'UNVALIDATED (Requires Real-World Test)'
        };
      case 'ASSUMPTION':
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-rose-400" />,
          bg: 'bg-rose-950/60 border-rose-700/60 text-rose-300',
          dot: 'bg-rose-400',
          title: label || 'ASSUMPTION (Founder Hypothesis)'
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div
      title={sourceDescription || config.title}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-colors cursor-help ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dot}`} />
      {config.icon}
      <span>{label || level}</span>
    </div>
  );
};
