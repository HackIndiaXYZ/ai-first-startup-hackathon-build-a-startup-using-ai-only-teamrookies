import {
  FounderProfile,
  FounderDNA,
  LocationData,
  MarketScanResult,
  StartupOpportunity,
  IdeaDecomposition,
  KillTestReport,
  DifferentiationStrategy,
  StrategyBattleOption,
  BoardroomSession,
  StartupScoreBreakdown,
  SimulatorRunResult,
  MVPPlan,
  AIBuildLogItem,
  QABreakResult,
  SecurityReadinessResult,
  LaunchCenterKit,
  PublicSurvey,
  AdvisorTriageResult
} from '../types/index.js';

const BASE_URL = '/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getHealth: () => fetchJSON<{ status: string; platform: string; demoMode: boolean }>('/health'),

  // Profile & Founder DNA
  getProfile: () => fetchJSON<{ profile: FounderProfile; founderDNA: FounderDNA | null }>('/profile'),
  updateProfile: (profile: Partial<FounderProfile>) =>
    fetchJSON<{ success: boolean; profile: FounderProfile }>('/profile', {
      method: 'POST',
      body: JSON.stringify(profile)
    }),
  generateFounderDNA: (profile?: FounderProfile) =>
    fetchJSON<{ success: boolean; founderDNA: FounderDNA }>('/founder-dna', {
      method: 'POST',
      body: JSON.stringify({ profile })
    }),

  // Market Intelligence
  getMarket: () => fetchJSON<{ location: LocationData; marketScan: MarketScanResult | null }>('/market'),
  scanMarket: (location?: LocationData) =>
    fetchJSON<{ success: boolean; marketScan: MarketScanResult }>('/market/scan', {
      method: 'POST',
      body: JSON.stringify({ location })
    }),

  // Opportunities
  getOpportunities: () =>
    fetchJSON<{ opportunities: StartupOpportunity[]; selectedOpportunityId: string | null }>('/opportunities'),
  generateOpportunities: () =>
    fetchJSON<{ success: boolean; opportunities: StartupOpportunity[] }>('/opportunities/generate', {
      method: 'POST'
    }),
  selectOpportunity: (id: string) =>
    fetchJSON<{ success: boolean; selectedOpportunityId: string; currentIdea: IdeaDecomposition }>('/opportunities/select', {
      method: 'POST',
      body: JSON.stringify({ id })
    }),

  // Idea Lab
  getCurrentIdea: () =>
    fetchJSON<{ currentIdea: IdeaDecomposition | null; killTestReport: KillTestReport | null; differentiation: DifferentiationStrategy | null }>('/ideas/current'),
  deconstructIdea: (ideaText: string) =>
    fetchJSON<{ success: boolean; idea: IdeaDecomposition }>('/ideas/deconstruct', {
      method: 'POST',
      body: JSON.stringify({ ideaText })
    }),
  killMyStartup: (idea?: IdeaDecomposition) =>
    fetchJSON<{ success: boolean; report: KillTestReport }>('/ideas/kill', {
      method: 'POST',
      body: JSON.stringify({ idea })
    }),
  differentiateIdea: (idea?: IdeaDecomposition) =>
    fetchJSON<{ success: boolean; differentiation: DifferentiationStrategy }>('/ideas/differentiate', {
      method: 'POST',
      body: JSON.stringify({ idea })
    }),
  battleStrategies: (idea?: IdeaDecomposition) =>
    fetchJSON<{ success: boolean; strategies: StrategyBattleOption[] }>('/ideas/battle', {
      method: 'POST',
      body: JSON.stringify({ idea })
    }),

  // Boardroom
  getBoardroom: () => fetchJSON<{ boardroom: BoardroomSession | null }>('/boardroom'),
  runBoardroom: () =>
    fetchJSON<{ success: boolean; session: BoardroomSession }>('/boardroom/run', {
      method: 'POST'
    }),

  // Score & Simulator
  getScore: () => fetchJSON<{ success: boolean; score: StartupScoreBreakdown }>('/score'),
  runSimulator: (inputs: any) =>
    fetchJSON<{ success: boolean; simulator: SimulatorRunResult }>('/simulator/run', {
      method: 'POST',
      body: JSON.stringify(inputs)
    }),

  // Validation
  getValidationExperiments: () => fetchJSON<{ success: boolean; experiments: any[] }>('/validation/experiments'),
  getSurvey: (id: string) => fetchJSON<{ success: boolean; survey: PublicSurvey }>(`/validation/survey/${id}`),
  submitSurveyResponse: (id: string, answers: Record<string, any>) =>
    fetchJSON<{ success: boolean; totalResponses: number; analytics: any }>(`/validation/survey/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    }),

  // MVP, Build Logs, QA Break App, Security
  getMVPPlan: () => fetchJSON<{ success: boolean; plan: MVPPlan }>('/mvp/plan'),
  getBuildLogs: () => fetchJSON<{ success: boolean; logs: AIBuildLogItem[] }>('/mvp/build-logs'),
  breakApp: () => fetchJSON<{ success: boolean; qa: QABreakResult }>('/mvp/break-app', { method: 'POST' }),
  getSecurity: () => fetchJSON<{ success: boolean; security: SecurityReadinessResult }>('/mvp/security'),

  // Launch Center
  getLaunchKit: () => fetchJSON<{ success: boolean; kit: LaunchCenterKit }>('/launch/kit'),

  // Advisor
  triageAdvisor: (question: string) =>
    fetchJSON<{ success: boolean; triage: AdvisorTriageResult }>('/advisor/triage', {
      method: 'POST',
      body: JSON.stringify({ question })
    }),

  // Master Dashboard
  getDashboard: () => fetchJSON<any>('/dashboard')
};
