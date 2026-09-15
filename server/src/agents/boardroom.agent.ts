import {
  BoardroomSession,
  BoardroomOpinion,
  BoardAgentRole,
  IdeaDecomposition
} from '../types/index.js';
import { aiService } from '../services/ai.service.js';

export class BoardroomAgent {
  public static async conveneBoard(
    idea: IdeaDecomposition | null,
    founderContext?: string
  ): Promise<BoardroomSession> {
    const startupTitle = idea?.title || 'ClinicFlow AI';

    const fallbackGenerator = (): BoardroomSession => {
      const opinions: BoardroomOpinion[] = [
        {
          agent: 'CEO',
          agentName: 'Elena Vance',
          agentTitle: 'Chief Executive Officer',
          stance: 'BULLISH',
          argument: 'We must ship the MVP in 30 days. The doctor burnout crisis is at an all-time peak, and every week we spend philosophizing is a week Nuance or another YC startup locks down another clinic network. Speed to first 20 clinics is our only real defense.',
          clashWith: 'CFO',
          clashReason: 'Willing to give free pilot licenses to accelerate land-grab, while CFO demands upfront commitment.',
          keyCondition: 'Ship a working browser extension within 4 weeks and secure 10 active daily clinic pilots.'
        },
        {
          agent: 'CFO',
          agentName: 'Marcus Sterling',
          agentTitle: 'Chief Financial Officer',
          stance: 'SKEPTICAL',
          argument: 'Free pilots are a lethal trap in healthcare. If a doctor will not pay $149 upfront or put down a $50 deposit, they do not have acute pain. Audio token costs (Whisper + LLM) will bleed $15/doctor/month in variable compute. We need positive gross margin from patient encounter #1.',
          clashWith: 'CEO',
          clashReason: 'Demands upfront paid commitment rather than subsidized rapid expansion.',
          keyCondition: 'Unit economics must show >70% gross margins after LLM API costs at $149/mo.'
        },
        {
          agent: 'CTO',
          agentName: 'Dr. Aris Thorne',
          agentTitle: 'Chief Technology Officer',
          stance: 'BULLISH',
          argument: 'The technical feasibility is high. We do not need to train custom foundational models; fine-tuning Whisper on local clinical accents and prompt-engineering Gemini 1.5 Flash gives us 98% entity accuracy. Latency is sub-800ms. The key is building zero-click keyboard injection so doctors never have to alt-tab.',
          clashWith: 'RISK',
          clashReason: 'Believes local on-device caching is sufficient, whereas Risk warns of HIPAA compliance liability.',
          keyCondition: 'Build local on-device encryption and guarantee sub-1-second SOAP note rendering.'
        },
        {
          agent: 'CMO',
          agentName: 'Samantha Chen',
          agentTitle: 'Chief Marketing Officer',
          stance: 'SKEPTICAL',
          argument: 'Digital marketing to doctors on Facebook or Google Ads has a horrific $800+ CAC. If the founder plans to run paid ads, this company will die. Our only viable distribution channel is partnering with local diagnostic laboratories who already have sales reps walking into 40 clinics every week.',
          clashWith: 'CEO',
          clashReason: 'Refuses to allocate budget to digital growth marketing without lab channel partnerships.',
          keyCondition: 'Lock in at least 1 regional diagnostic pathology chain as an authorized referral partner.'
        },
        {
          agent: 'CUSTOMER',
          agentName: 'Dr. Rajesh Patel',
          agentTitle: 'Voice of the Customer (Practicing Physician)',
          stance: 'CRITICAL',
          argument: 'I see 42 patients every single day. If your software makes a single mistake on a pediatric penicillin allergy or misinterprets hypertension as hypotension, I will delete it in 5 seconds. I do not want another complicated dashboard. Make it work silently on my existing screen or stay out of my exam room.',
          clashWith: 'PRODUCT',
          clashReason: 'Rejects complex diagnostic suggestion features in favor of extreme, bare-bones speed.',
          keyCondition: 'Verification of clinical facts must take less than 15 seconds per patient encounter.'
        },
        {
          agent: 'MARKET',
          agentName: 'Victoria Ramos',
          agentTitle: 'Market & Macro Analyst',
          stance: 'BULLISH',
          argument: 'The market tailwinds are historic. Outpatient medical documentation is a $9.2B global TAM. While enterprise hospital inpatient is locked by Epic and Cerner, 72% of outpatient clinics operate independently or in small groups. That is a massive, highly fragmented greenfield for an agile startup.',
          keyCondition: 'Stay laser-focused on outpatient general and pediatric practices; do not chase hospital enterprise RFP contracts.'
        },
        {
          agent: 'RISK',
          agentName: 'David K. Lawson',
          agentTitle: 'Chief Risk Officer & General Counsel',
          stance: 'CRITICAL',
          argument: 'Recording patient audio in exam rooms triggers serious privacy and informed-consent regulations. If audio is stored on unencrypted cloud servers or if a minor is recorded without explicit parental consent, the legal liability could bankrupt the startup before Series A.',
          clashWith: 'CTO',
          clashReason: 'Demands automated audio deletion post-transcription, while CTO wants audio retention for model training.',
          keyCondition: 'Zero permanent audio storage on server; audio stream deleted immediately once clinical note is verified.'
        },
        {
          agent: 'PRODUCT',
          agentName: 'Liam O’Connor',
          agentTitle: 'Chief Product Officer',
          stance: 'BULLISH',
          argument: 'We must avoid feature bloat at all costs. The initial MVP should do only two things with world-class execution: (1) Ambient record, (2) One-click inject structured SOAP note into the doctor’s open window. No patient portals, no billing suites, no telemedicine add-ons yet.',
          clashWith: 'CEO',
          clashReason: 'Pushes back against the CEO’s desire to add multi-language patient WhatsApp summaries in the MVP.',
          keyCondition: 'Freeze MVP scope strictly to transcription + note injection before adding any secondary features.'
        }
      ];

      return {
        id: `board-${Date.now()}`,
        timestamp: new Date().toISOString(),
        opinions,
        disagreements: [
          {
            agents: ['CEO', 'CFO'],
            conflictTopic: 'Free 30-day trial vs Upfront paid commitment',
            resolutionRecommendation: 'Compromise on a 14-day performance-guaranteed pilot with a refundable $49 setup deposit to filter serious practitioners.'
          },
          {
            agents: ['CTO', 'RISK'],
            conflictTopic: 'Audio recording storage vs Immediate stream purge',
            resolutionRecommendation: 'Purge raw audio files immediately upon doctor note sign-off; retain only anonymized, de-identified clinical entity tokens for product improvement.'
          },
          {
            agents: ['CMO', 'CEO'],
            conflictTopic: 'Direct-to-doctor digital ads vs Diagnostic lab channel partner distribution',
            resolutionRecommendation: 'Kill paid digital ads entirely; execute an offline beachhead strategy leveraging regional diagnostic lab representatives.'
          }
        ],
        synthesis: `The Board agrees that the outpatient doctor paperwork crisis is an urgent, multi-billion-dollar problem with exceptional timing. However, the Board unanimously warns against attempting to sell generic dictation software or chasing enterprise hospitals. The winning path requires: (1) A zero-click injection UX that respects physician time, (2) Strict immediate audio deletion to eliminate medical privacy liability, and (3) Distribution powered by local diagnostic lab partnerships rather than expensive digital ads.`,
        finalDecision: 'MODIFY',
        confidenceScore: 86,
        unanimousPoints: [
          'The core problem of administrative doctor burnout is acute, urgent, and validated.',
          'Enterprise hospital inpatient sales cycles must be avoided entirely during Seed stage.',
          'Raw voice audio must be purged immediately after note completion to guarantee zero privacy liability.',
          'Zero-click keyboard injection is non-negotiable for physician adoption.'
        ],
        blockingConcerns: [
          'CFO and Customer demand proof that doctors will pay $149/mo without requiring high-touch in-person sales reps.',
          'Risk demands formal legal consent workflow for in-room patient audio capture.'
        ]
      };
    };

    return fallbackGenerator();
  }
}
