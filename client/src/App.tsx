import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FounderDNAPage } from './pages/FounderDNAPage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { IdeaLabPage } from './pages/IdeaLabPage';
import { BoardroomPage } from './pages/BoardroomPage';
import { ScoreSimulatorPage } from './pages/ScoreSimulatorPage';
import { ValidationLabPage } from './pages/ValidationLabPage';
import { PublicSurveyPage } from './pages/PublicSurveyPage';
import { MVPBuilderPage } from './pages/MVPBuilderPage';
import { LaunchCenterPage } from './pages/LaunchCenterPage';
import { AdvisorPage } from './pages/AdvisorPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Discovery Flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/survey/:id" element={<PublicSurveyPage />} />

        {/* Protected / Decision App Shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/founder-dna" element={<FounderDNAPage />} />
          <Route path="/market" element={<MarketIntelligencePage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/idea-lab" element={<IdeaLabPage />} />
          <Route path="/validation" element={<ValidationLabPage />} />
          <Route path="/boardroom" element={<BoardroomPage />} />
          <Route path="/simulator" element={<ScoreSimulatorPage />} />
          <Route path="/mvp" element={<MVPBuilderPage />} />
          <Route path="/launch" element={<LaunchCenterPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
