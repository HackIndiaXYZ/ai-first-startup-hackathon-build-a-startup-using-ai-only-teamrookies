import {
  FounderProfile,
  FounderDNA,
  LocationData,
  MarketScanResult,
  StartupOpportunity,
  IdeaDecomposition,
  KillTestReport,
  DifferentiationStrategy,
  BoardroomSession,
  StartupScoreBreakdown,
  SimulatorRunResult,
  MVPPlan,
  LaunchCenterKit,
  ValidationExperiment,
  PublicSurvey
} from '../types/index.js';

class InMemoryStore {
  public profile: FounderProfile = {
    interests: ['AI / ML', 'Software', 'Cybersecurity', 'Healthcare'],
    preferences: {
      aiIntensity: 8,
      technicalComplexity: 8,
      riskAppetite: 7,
      investmentPreference: 4,
      scalabilityPreference: 9,
      mvpSpeed: 7,
      businessType: 7
    }
  };

  public founderDNA: FounderDNA | null = null;
  public location: LocationData = {
    name: 'Bengaluru Innovation Corridor (Koramangala/HSR)',
    lat: 12.9352,
    lng: 77.6245,
    radiusKm: 5,
    address: 'Koramangala, Bengaluru, Karnataka, India'
  };

  public marketScan: MarketScanResult | null = null;
  public opportunities: StartupOpportunity[] = [];
  public selectedOpportunityId: string | null = null;
  public currentIdea: IdeaDecomposition | null = null;
  public killTestReport: KillTestReport | null = null;
  public differentiation: DifferentiationStrategy | null = null;
  public boardroomSession: BoardroomSession | null = null;
  public startupScore: StartupScoreBreakdown | null = null;
  public simulator: SimulatorRunResult | null = null;
  public mvpPlan: MVPPlan | null = null;
  public launchKit: LaunchCenterKit | null = null;
  public experiments: ValidationExperiment[] = [];
  public surveys: Map<string, PublicSurvey> = new Map();

  constructor() {
    this.seedDefaultSurvey();
  }

  private seedDefaultSurvey() {
    const defaultSurveyId = 'survey-ai-co-default';
    this.surveys.set(defaultSurveyId, {
      id: defaultSurveyId,
      startupName: 'ClinicFlow AI',
      valueProposition: 'Autonomous patient triage and clinical documentation for high-volume outpatient clinics.',
      questions: [
        {
          id: 'q1',
          questionText: 'How acute is patient intake and paperwork delay in your clinic?',
          type: 'CHOICE',
          options: ['Extremely severe (costs >2 hrs daily)', 'Moderate pain', 'Manageable', 'Not a problem']
        },
        {
          id: 'q2',
          questionText: 'Would you pay $199/month for instant EHR-integrated voice intake?',
          type: 'CHOICE',
          options: ['Yes, immediately', 'Yes, if pilot succeeds', 'Uncertain', 'No, too expensive']
        },
        {
          id: 'q3',
          questionText: 'What is the single most important integration needed?',
          type: 'CHOICE',
          options: ['EHR / EMR export', 'WhatsApp patient alerts', 'HIPAA/ABDM compliance audit', 'Voice transcription accuracy']
        }
      ],
      totalResponses: 87,
      responses: [
        { id: 'r1', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), answers: { q1: 'Extremely severe (costs >2 hrs daily)', q2: 'Yes, immediately', q3: 'EHR / EMR export' } },
        { id: 'r2', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), answers: { q1: 'Extremely severe (costs >2 hrs daily)', q2: 'Yes, if pilot succeeds', q3: 'Voice transcription accuracy' } },
        { id: 'r3', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), answers: { q1: 'Moderate pain', q2: 'Yes, if pilot succeeds', q3: 'WhatsApp patient alerts' } },
      ],
      analytics: {
        interestedPercent: 61,
        maybePercent: 24,
        notInterestedPercent: 15,
        wouldPayPercent: 43,
        topRequestedFeatures: ['Voice transcription accuracy', 'Direct EHR sync', 'Local compliance export'],
        summaryInsight: 'Strong customer urgency detected in primary healthcare clinics. 61% interest with high willingness to pay once clinical accuracy is proven.'
      }
    });
  }
}

export const dbStore = new InMemoryStore();
