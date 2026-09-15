import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dna,
  Compass,
  Lightbulb,
  Crosshair,
  Skull,
  Sparkles,
  Users,
  Calculator,
  Hammer,
  Rocket,
  MessageSquareCode,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentStartupName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStartupName = 'ClinicFlow AI' }) => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/founder-dna', label: 'Founder DNA', icon: Dna, badge: 'Profile' },
    { to: '/market', label: 'Market Intelligence', icon: Compass, badge: '5 KM' },
    { to: '/opportunities', label: 'Opportunities', icon: Lightbulb, badge: '12 Ideas' },
    { to: '/idea-lab', label: 'Idea Lab & Kill Test', icon: Skull, badge: 'Signature' },
    { to: '/validation', label: 'Validation Lab', icon: CheckCircle2, badge: 'Survey' },
    { to: '/boardroom', label: 'AI Boardroom', icon: Users, badge: '8 Agents' },
    { to: '/simulator', label: 'Simulator & Score', icon: Calculator, badge: '84/100' },
    { to: '/mvp', label: 'MVP Builder & QA', icon: Hammer, badge: 'Spec' },
    { to: '/launch', label: 'Launch Center', icon: Rocket, badge: 'Kit' },
    { to: '/advisor', label: 'AI Co-Founder & Help', icon: MessageSquareCode, badge: 'Daily' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col bg-dark-900 border-r border-slate-800/80 min-h-[calc(100vh-61px)] p-4">
      {/* Workflow Phase Indicator */}
      <div className="mb-4 px-3 py-2 rounded-lg bg-dark-950/70 border border-slate-800/80 text-xs">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
          DECISION WORKFLOW
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>DISCOVER → VALIDATE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dark-950 border border-slate-800 text-slate-400 group-hover:border-slate-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Co-Founder Hint */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-950/30 to-cyan-950/30 border border-emerald-800/30 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Co-Founder Tip</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            "Don’t build first. Validate doctor willingness to pay with 10 local practitioners before adding more features."
          </p>
        </div>
      </div>
    </aside>
  );
};
