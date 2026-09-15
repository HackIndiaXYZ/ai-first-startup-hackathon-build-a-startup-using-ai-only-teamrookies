import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* SVG Icon Emblem */}
      <div className={`${iconSizes[size]} relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
        >
          <defs>
            <linearGradient id="logoGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="logoGradientB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>

          {/* Rounded Hexagonal Shield Frame */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#090E17"
            stroke="#1E293F"
            strokeWidth="1.5"
          />

          {/* Precision Crosshair Guides */}
          <line x1="24" y1="8" x2="24" y2="40" stroke="#162235" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="8" y1="24" x2="40" y2="24" stroke="#162235" strokeWidth="1" strokeDasharray="2 2" />

          {/* Stylized AI Decision Prism / Diamond */}
          {/* Left Facet */}
          <path
            d="M24 9 L12 24 L24 39 L24 24 Z"
            fill="url(#logoGradientB)"
            fillOpacity="0.25"
            stroke="url(#logoGradientA)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Right Facet */}
          <path
            d="M24 9 L36 24 L24 39 L24 24 Z"
            fill="url(#logoGradientA)"
            fillOpacity="0.5"
            stroke="url(#logoGradientA)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Center Glowing Intelligence Core */}
          <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
          <circle cx="24" cy="24" r="1.5" fill="#06B6D4" />

          {/* Corner Node Accents */}
          <circle cx="24" cy="9" r="1.5" fill="#10B981" />
          <circle cx="12" cy="24" r="1.5" fill="#06B6D4" />
          <circle cx="36" cy="24" r="1.5" fill="#3B82F6" />
          <circle cx="24" cy="39" r="1.5" fill="#10B981" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold ${textSizes[size]} tracking-tight text-white group-hover:text-emerald-400 transition-colors`}>
              AI COMPANY
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-dark-950 text-emerald-400 border border-emerald-900/60 uppercase">
              OS
            </span>
          </div>
          <span className={`${subtextSizes[size]} text-slate-400 font-mono tracking-wider uppercase mt-0.5`}>
            Decision Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
