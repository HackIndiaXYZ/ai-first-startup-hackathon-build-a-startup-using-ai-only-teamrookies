import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentStartupName?: string;
  locationName?: string;
  isDemoMode?: boolean;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStartupName = 'ClinicFlow AI',
  locationName = 'Bengaluru (5 KM)',
  isDemoMode = true,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-dark-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  AI COMPANY
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                  v1.0
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Decision Intelligence Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center Context Indicators (Active Startup & Location) */}
        <div className="hidden md:flex items-center gap-2.5 text-xs font-mono">
          {/* Current Startup Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800/80 shadow-inner">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Startup:</span>
            <span className="font-semibold text-slate-100">{currentStartupName}</span>
          </div>

          {/* Current Market Pin */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800/80 shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Ground:</span>
            <span className="font-semibold text-cyan-300">{locationName}</span>
          </div>
        </div>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Badge */}
          {isDemoMode && (
            <div
              title="Demo Mode: Grounded realistic market intelligence and deterministic validation workflows active"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">DEMO MODE ACTIVE</span>
              <span className="sm:hidden">DEMO</span>
            </div>
          )}

          {/* Quick Action to Onboarding / Discovery */}
          <Link
            to="/onboarding"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold font-mono transition-all hover:scale-[1.02]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Scan New Ground</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
