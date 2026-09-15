import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.js';
import { Sidebar } from '../components/layout/Sidebar.js';
import { MobileNav } from '../components/layout/MobileNav.js';

interface AppLayoutProps {
  currentStartupName?: string;
  locationName?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentStartupName = 'ClinicFlow AI',
  locationName = 'Bengaluru (5 KM)'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col antialiased selection:bg-brand-primary/20 selection:text-emerald-400">
      <Navbar
        currentStartupName={currentStartupName}
        locationName={locationName}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <Sidebar currentStartupName={currentStartupName} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};
