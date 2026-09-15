import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Lightbulb,
  Skull,
  Users,
  Hammer,
  Dna,
  CheckCircle2,
  Calculator,
  Rocket,
  MessageSquareCode,
  X
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const allNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/founder-dna', label: 'Founder DNA', icon: Dna },
    { to: '/market', label: 'Market Intelligence', icon: Compass },
    { to: '/opportunities', label: 'Opportunities', icon: Lightbulb },
    { to: '/idea-lab', label: 'Idea Lab & Kill Test', icon: Skull },
    { to: '/validation', label: 'Validation Lab', icon: CheckCircle2 },
    { to: '/boardroom', label: 'AI Boardroom', icon: Users },
    { to: '/simulator', label: 'Simulator & Score', icon: Calculator },
    { to: '/mvp', label: 'MVP Builder & QA', icon: Hammer },
    { to: '/launch', label: 'Launch Center', icon: Rocket },
    { to: '/advisor', label: 'AI Co-Founder & Advisor', icon: MessageSquareCode },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-4/5 max-w-xs h-full bg-dark-900 border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="font-extrabold text-sm text-white tracking-tight">AI COMPANY</span>
                <button
                  onClick={onClose}
                  className="p-1 rounded bg-dark-950 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {allNavItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30'
                            : 'text-slate-300 hover:bg-dark-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono text-center">
              AI Decision Intelligence v1.0
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 flex items-center justify-around">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Hub</span>
        </NavLink>

        <NavLink
          to="/market"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <Compass className="w-4 h-4" />
          <span>Market</span>
        </NavLink>

        <NavLink
          to="/opportunities"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <Lightbulb className="w-4 h-4" />
          <span>Ideas</span>
        </NavLink>

        <NavLink
          to="/idea-lab"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-rose-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <Skull className="w-4 h-4" />
          <span>Kill Test</span>
        </NavLink>

        <NavLink
          to="/boardroom"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <Users className="w-4 h-4" />
          <span>Board</span>
        </NavLink>

        <NavLink
          to="/mvp"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-mono ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <Hammer className="w-4 h-4" />
          <span>MVP</span>
        </NavLink>
      </div>
    </>
  );
};
