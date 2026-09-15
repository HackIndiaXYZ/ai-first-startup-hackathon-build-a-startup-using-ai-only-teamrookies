export type EvidenceLevel = 'VERIFIED' | 'OBSERVED' | 'ESTIMATED' | 'UNVALIDATED' | 'ASSUMPTION';

export interface EvidenceBadge {
  level: EvidenceLevel;
  label: string;
  sourceDescription: string;
}

export interface FounderPreferences {
  aiIntensity: number;
  technicalComplexity: number;
  riskAppetite: number;
  investmentPreference: number;
  scalabilityPreference: number;
  mvpSpeed: number;
  businessType: number;
}

export interface FounderProfile {
  interests: string[];
  preferences: FounderPreferences;
}

export interface FounderDNA {
  radar: {
    technology: number;
    ai: number;
    business: number;
    design: number;
    technicalDepth: number;
    riskAppetite: number;
    socialImpact: number;
    scalability: number;
    execution: number;
  };
  strengths: string[];
  preferencesSummary: string;
  executiveSummary: string;
  evidence: EvidenceBadge;
}

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
  radiusKm: 1 | 5 | 15 | 50;
  address?: string;
}

export interface BusinessEntity {
  id: string;
  name: string;
  category: string;
  distanceMeters: number;
  lat: number;
  lng: number;
  publicRating?: number;
  reviewCount?: number;
  reviewSignals?: string[];
  isCompetitor: boolean;
  isPotentialPartner: boolean;
  partnerSynergyReason?: string;
  evidence: EvidenceBadge;
}

export interface CompetitorAnalysis {
  id: string;
  name: string;
  category: string;
  distanceMeters: number;
  publicRating: number;
  strengths: string[];
  potentialWeaknesses: string[];
  customerPainSignals: string[];
  marketPosition: string;
  differentiationOpportunity: string;
  evidence: EvidenceBadge;
}

export interface MarketGap {
  id: string;
  category: string;
  competitionLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  opportunitySignal: string;
  evidence: EvidenceBadge;
  confidenceScore: number;
  validationNeeded: string;
}

export interface MarketScanResult {
  location: LocationData;
  totalBusinessesFound: number;
  relevantCompetitorsCount: number;
  possibleGapsCount: number;
  partnershipTargetsCount: number;
  businesses: BusinessEntity[];
  competitors: CompetitorAnalysis[];
  gaps: MarketGap[];
  categoryDensity: Record<string, number>;
  scanTimestamp: string;
  isDemoData: boolean;
}

export interface StartupOpportunity {
  id: string;
  title: string;
  tagline: string;
  description: string;
  targetCustomer: string;
  opportunityScore: number;
  competitionLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  marketGap: string;
  potentialBusinessModel: string;
  whyHere: string;
  whyNow: string;
  risks: string[];
  validationNeeded: string[];
  categoryType: 'best_for_you' | 'best_for_area' | 'intersection' | 'surprise_me';
  evidence: EvidenceBadge;
  founderFitReason?: string;
  localSignalReason?: string;
}

export interface IdeaDecomposition {
  title: string;
  problem: string;
  customer: string;
  solution: string;
  valueProposition: string;
  businessModel: string;
  technology: string;
  assumptions: string[];
  risks: string[];
  competition: string;
  differentiation: string;
}

export interface KillTestReport {
  survivalScore: number;
  riskLevel: 'LOW RISK' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL RISK';
  verdict: 'BUILD' | 'MODIFY' | 'VALIDATE_MORE' | 'DONT_BUILD';
  verdictRationale: string;
  killerQuestions: {
    question: string;
    critique: string;
    severity: 'FATAL' | 'CONCERNING' | 'MANAGEABLE';
  }[];
  whyItMayFail: string[];
  howToFixIt: string[];
  evidence: EvidenceBadge;
}

export interface DifferentiationStrategy {
  originalIdea: string;
  improvedIdea: string;
  differentiationVectors: {
    vector: 'Product' | 'AI' | 'UX' | 'Pricing' | 'Distribution' | 'Retention' | 'Data Moat' | 'Partnerships' | 'Specialization' | 'Defensibility';
    strategy: string;
    impact: 'HIGH' | 'MEDIUM';
  }[];
  moatSummary: string;
  evidence: EvidenceBadge;
}

export interface StrategyBattleOption {
  id: string;
  name: string;
  strategyType: 'Low-cost B2C' | 'Premium B2C' | 'B2B SaaS' | 'Marketplace / Platform';
  description: string;
  marketPotential: number;
  feasibility: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  scalability: number;
  competitionIntensity: 'LOW' | 'MEDIUM' | 'HIGH';
  isRecommended: boolean;
  recommendationReason: string;
}

export type BoardAgentRole = 'CEO' | 'CFO' | 'CTO' | 'CMO' | 'CUSTOMER' | 'MARKET' | 'RISK' | 'PRODUCT';

export interface BoardroomOpinion {
  agent: BoardAgentRole;
  agentName: string;
  agentTitle: string;
  stance: 'BULLISH' | 'SKEPTICAL' | 'CRITICAL' | 'NEUTRAL';
  argument: string;
  clashWith?: BoardAgentRole;
  clashReason?: string;
  keyCondition: string;
}

export interface BoardroomSession {
  id: string;
  timestamp: string;
  opinions: BoardroomOpinion[];
  disagreements: {
    agents: [BoardAgentRole, BoardAgentRole];
    conflictTopic: string;
    resolutionRecommendation: string;
  }[];
  synthesis: string;
  finalDecision: 'BUILD' | 'MODIFY' | 'VALIDATE' | 'DONT_BUILD';
  confidenceScore: number;
  unanimousPoints: string[];
  blockingConcerns: string[];
}

export interface StartupScoreBreakdown {
  overallScore: number;
  strongestFactor: { factor: string; score: number; reason: string };
  weakestFactor: { factor: string; score: number; reason: string };
  biggestUncertainty: string;
  recommendedNextAction: { title: string; description: string; ctaText: string; route: string };
  dimensions: {
    problem: number;
    market: number;
    founderFit: number;
    localOpportunity: number;
    competition: number;
    differentiation: number;
    businessModel: number;
    feasibility: number;
    validation: number;
    scalability: number;
  };
  disclaimer: string;
}

export interface ScenarioProjection {
  scenarioName: 'Conservative' | 'Base' | 'Aggressive';
  monthlyRevenueM12: number;
  annualRevenue: number;
  breakEvenMonth: number;
  totalCustomersM12: number;
  monthlyBurn: number;
  grossMarginPercent: number;
  growthAssumptions: string[];
}

export interface SimulatorRunResult {
  inputs: {
    price: number;
    customersM1: number;
    conversionRatePercent: number;
    churnRatePercent: number;
    monthlyMarketingBudget: number;
    cac: number;
    operatingCostsMonthly: number;
  };
  scenarios: ScenarioProjection[];
  disclaimer: string;
}

export interface ValidationExperiment {
  id: string;
  title: string;
  type: 'SURVEY' | 'INTERVIEW' | 'LANDING_PAGE' | 'WAITLIST' | 'CONCIERGE_TEST';
  hypothesis: string;
  method: string;
  targetAudience: string;
  questions: string[];
  successCriteria: string;
  expectedDurationDays: number;
  estimatedBudgetUsd: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
}

export interface PublicSurvey {
  id: string;
  startupName: string;
  valueProposition: string;
  questions: {
    id: string;
    questionText: string;
    type: 'CHOICE' | 'RATING' | 'TEXT';
    options?: string[];
  }[];
  totalResponses: number;
  responses: Array<{
    id: string;
    timestamp: string;
    answers: Record<string, any>;
  }>;
  analytics: {
    interestedPercent: number;
    maybePercent: number;
    notInterestedPercent: number;
    wouldPayPercent: number;
    topRequestedFeatures: string[];
    summaryInsight: string;
  };
}

export interface MVPPlan {
  id: string;
  startupName: string;
  problem: string;
  targetCustomer: string;
  valueProposition: string;
  coreFeatures: {
    name: string;
    description: string;
    priority: 'P0 - CRITICAL' | 'P1 - IMPORTANT' | 'P2 - NICE TO HAVE';
  }[];
  whatNotToBuildYet: {
    feature: string;
    reasonToOmit: string;
  }[];
  userJourneys: {
    persona: string;
    steps: string[];
  }[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    aiEngine: string;
    apis: string[];
    auth: string;
    deployment: string;
  };
  developmentRoadmap: {
    phase: string;
    timeframe: string;
    deliverables: string[];
  }[];
}

export interface AIBuildLogItem {
  id: string;
  step: string;
  category: 'PLAN' | 'GENERATE' | 'DATABASE' | 'AUTH' | 'API' | 'UI' | 'TEST' | 'DEPLOY';
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED_ERROR';
  details: string;
  timestamp: string;
}

export interface QABreakResult {
  overallHealth: number;
  testSuitesRun: number;
  bugsFound: {
    id: string;
    bug: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    location: string;
    suggestedFix: string;
    status: 'OPEN' | 'RESOLVED';
  }[];
}

export interface SecurityReadinessResult {
  score: number;
  checks: {
    name: string;
    category: 'Secret Exposure' | 'Authentication' | 'Authorization' | 'Input Validation' | 'API Permissions' | 'Dependency Risks' | 'Data Exposure';
    status: 'PASSED' | 'WARNING' | 'FAILED';
    details: string;
  }[];
  summary: string;
  disclaimer: string;
}

export interface LaunchCenterKit {
  startupName: string;
  tagline: string;
  valueProposition: string;
  landingPageCopy: {
    heroHeading: string;
    heroSubheading: string;
    bulletPoints: string[];
    primaryCta: string;
  };
  pricingTiers: {
    name: string;
    price: string;
    features: string[];
    recommended?: boolean;
  }[];
  launchStrategy: string[];
  socialAnnouncementPosts: {
    platform: 'X / Twitter' | 'LinkedIn' | 'Product Hunt' | 'Reddit';
    content: string;
  }[];
  coldEmailCampaign: {
    subject: string;
    body: string;
    targetRecipient: string;
  };
  demoScript: {
    timingSeconds: number;
    section: string;
    spokenNotes: string;
  }[];
  investorOnePager: {
    theProblem: string;
    theSolution: string;
    marketSize: string;
    tractionPlan: string;
    ask: string;
  };
  first100CustomersPlan: string[];
}

export interface AdvisorContextBrief {
  startupName: string;
  founderGoal: string;
  location: string;
  ideaSummary: string;
  marketFindings: string;
  keyCompetitors: string[];
  startupScore: number;
  mainConcern: string;
  exactQuestion: string;
  sharedFields: string[];
}

export interface AdvisorTriageResult {
  priority: 'NORMAL' | 'IMPORTANT' | 'CRITICAL';
  canAISolve: boolean;
  aiImmediateAnswer?: string;
  recommendedAdvisorDomain: 'BUSINESS' | 'TECH' | 'PRICING' | 'MARKET' | 'LEGAL' | 'GROWTH';
  preparedBrief: AdvisorContextBrief;
}
