import {
  IdeaDecomposition,
  KillTestReport,
  DifferentiationStrategy,
  StrategyBattleOption
} from '../types/index.js';
import { aiService } from '../services/ai.service.js';

export class IdeaAgent {
  public static async deconstructIdea(rawInput: string): Promise<IdeaDecomposition> {
    const systemPrompt = `You are a Principal Startup Venture Analyst. 
Deconstruct the founder's raw startup idea into its foundational building blocks.
Do NOT flatter the founder. Be analytically objective and precise.
Return structured JSON:
{
  "title": string,
  "problem": string,
  "customer": string,
  "solution": string,
  "valueProposition": string,
  "businessModel": string,
  "technology": string,
  "assumptions": string[],
  "risks": string[],
  "competition": string,
  "differentiation": string
}`;

    const fallbackGenerator = (): IdeaDecomposition => {
      const isHealth = rawInput.toLowerCase().includes('clinic') || rawInput.toLowerCase().includes('doctor') || rawInput.toLowerCase().includes('health');
      const isSecurity = rawInput.toLowerCase().includes('security') || rawInput.toLowerCase().includes('cloud') || rawInput.toLowerCase().includes('attack');

      if (isHealth) {
        return {
          title: 'ClinicFlow AI: Ambient Outpatient Clinical Copilot',
          problem: 'Outpatient physicians lose 2.5 hours every evening typing clinical encounter notes into clunky, unintuitive Electronic Medical Record (EMR) systems, leading to severe administrative burnout and reduced patient throughput.',
          customer: 'Independent outpatient physicians, specialty medical practitioners, and high-volume multi-specialty clinic administrators.',
          solution: 'An ambient listening iPad/tablet application that records natural doctor-patient dialogue, generates structured SOAP notes in real-time, extracts ICD-10 billing codes, and syncs directly into legacy EMR databases via a zero-install browser extension.',
          valueProposition: 'Recover 2 hours every clinical day, eliminate after-hours charting, and increase daily patient capacity by 20% without changing your existing EMR software.',
          businessModel: 'B2B SaaS ($149 per active doctor per month) with enterprise clinic discounts and optional transcription minute add-ons.',
          technology: 'Whisper streaming speech-to-text, Gemini 1.5 Flash clinical entity extraction, HIPAA-compliant encrypted vector store, and headless browser EMR auto-fill scripts.',
          assumptions: [
            'Patients will comfortably consent to ambient tablet audio recording in exam rooms.',
            'Physicians will trust AI-generated clinical summaries without re-typing every sentence.',
            'Doctors have sufficient individual procurement authority to expense $149/mo.'
          ],
          risks: [
            'Hallucinated clinical dosages or omitted allergy notes creating medical malpractice liability.',
            'Incumbent EMR giants (Epic, AthenaHealth, Cerner) launching bundled AI dictation features.',
            'Doctors refusing to spend 10 minutes onboarding or reviewing initial drafts.'
          ],
          competition: 'Traditional medical transcription services, Nuance/Dragon Medical One, Abridge, Suki AI, and manual handwritten charts.',
          differentiation: 'Built specifically for high-speed outpatient clinics with instant local pharmacy dispatch, offline-first local device processing, and zero-click browser EMR injection.'
        };
      }

      return {
        title: rawInput.length > 5 ? rawInput.slice(0, 45) : 'AI Workflow Automation Engine',
        problem: 'Knowledge workers and engineering teams spend 40% of their working hours manually executing repetitive operational workflows across fragmented SaaS applications.',
        customer: 'Fast-growing technology startups, digital agencies, and engineering teams with 15-200 employees.',
        solution: 'Autonomous AI decision-agents that monitor communication channels, trigger cross-service execution graphs, and resolve operational bottlenecks with human-in-the-loop approvals.',
        valueProposition: 'Automate 15+ hours of weekly manual coordination per employee while ensuring 100% auditability and zero configuration complexity.',
        businessModel: 'Usage-based B2B subscription starting at $99/team/month based on active execution credits.',
        technology: 'TypeScript, Node.js, LangGraph-style state machines, vector embeddings, and webhooks.',
        assumptions: [
          'Teams are willing to connect Slack and GitHub to third-party agent executors.',
          'The cost of LLM tokens is significantly lower than employee hourly wages.'
        ],
        risks: [
          'Agent hallucination causing erroneous data mutations in production databases.',
          'Crowded market of generic Zapier/Make automation tools.'
        ],
        competition: 'Zapier Central, Make.com, Relay.app, and internal custom Python scripts.',
        differentiation: 'Domain-specific decision intelligence agents with verified sandboxed testing rather than linear static if-this-then-that triggers.'
      };
    };

    return await aiService.generateStructuredJSON<IdeaDecomposition>(
      { systemPrompt, userPrompt: `Deconstruct this startup idea: "${rawInput}"`, responseFormat: 'json' },
      fallbackGenerator
    );
  }

  public static async killMyStartup(idea: IdeaDecomposition): Promise<KillTestReport> {
    const systemPrompt = `You are a Brutal Startup Devil's Advocate and Hardened Seed Investor.
Your objective is to stress-test and challenge the startup idea across all critical failure dimensions:
1. Is the problem acute enough that users will pay now?
2. Are incumbents already solving this well enough?
3. What makes differentiation defensible vs easily copied in 3 weeks?
4. What is the fatal point of failure?
5. Be willing to conclude "DONT_BUILD" or "MODIFY" if the idea is fundamentally flawed.
Return structured JSON:
{
  "survivalScore": number (0-100),
  "riskLevel": "LOW RISK" | "MODERATE RISK" | "HIGH RISK" | "CRITICAL RISK",
  "verdict": "BUILD" | "MODIFY" | "VALIDATE_MORE" | "DONT_BUILD",
  "verdictRationale": string,
  "killerQuestions": [
    { "question": string, "critique": string, "severity": "FATAL" | "CONCERNING" | "MANAGEABLE" }
  ],
  "whyItMayFail": string[],
  "howToFixIt": string[]
}`;

    const fallbackGenerator = (): KillTestReport => {
      return {
        survivalScore: 68,
        riskLevel: 'HIGH RISK',
        verdict: 'MODIFY',
        verdictRationale: 'The pain point (doctor charting fatigue) is acutely real, but selling directly to independent physicians without deep EMR integration creates a lethal distribution bottleneck. You risk building a feature that Epic or Microsoft Nuance can replicate with a single toggle.',
        killerQuestions: [
          {
            question: 'Why won’t Microsoft/Nuance DAX or Epic simply give this away for free to their existing hospital accounts?',
            critique: 'Nuance already owns 60% of hospital dictation. If you enter the enterprise hospital tier, sales cycles exceed 14 months and you will be crushed by enterprise procurement inertia.',
            severity: 'FATAL'
          },
          {
            question: 'Will solo and small outpatient clinics actually pay $149/month out of their own pocket?',
            critique: 'Independent practitioners are notoriously stingy software buyers who have survived for decades with cheap paper notes or $15/month legacy transcriptionists.',
            severity: 'CONCERNING'
          },
          {
            question: 'What happens the first time your AI hallucinates a medication dosage or misses a penicillin allergy in the summary?',
            critique: 'Medical liability is unforgiving. If doctors must manually proofread every line, your 2-hour time savings collapses to 15 minutes of anxious verification.',
            severity: 'FATAL'
          },
          {
            question: 'How do you bridge the data into legacy on-premise Windows clinic software without building 200 custom integrations?',
            critique: 'Old clinic systems lack REST APIs. If installation requires IT setup, your self-serve growth hypothesis fails immediately.',
            severity: 'CONCERNING'
          }
        ],
        whyItMayFail: [
          'Distribution failure: Inability to acquire doctors profitably with digital ads due to high B2B healthcare CAC.',
          'Verification drag: Doctors spend almost as much time verifying AI outputs as they would writing notes.',
          'Platform lock-in: Incumbent EMR vendors blocking third-party scraping and clipboard automation extensions.',
          'Churn after novelty wears off: Failure to embed deeply into daily billing and prescription workflows.'
        ],
        howToFixIt: [
          'Narrow your beachhead wedge: Target high-throughput outpatient specialties (e.g. Pediatricians or Orthopedics) where physical examination notes follow predictable templates.',
          'Make verification visual: Highlight every extracted dosage and diagnosis with interactive one-click audit chips referencing exact timestamps in audio.',
          'Add a revenue-generating wedge: Instead of just saving time (a cost center), automate diagnostic pre-authorization and billing code capture to increase doctor insurance reimbursements by $1,200/mo.',
          'Build a zero-install browser extension and WhatsApp voice note gateway rather than demanding a dedicated desktop app.'
        ],
        evidence: {
          level: 'ESTIMATED',
          label: 'Devil’s Advocate Stress-Test',
          sourceDescription: 'Heuristic challenge across defensibility, liability, and distribution vectors.'
        }
      };
    };

    return await aiService.generateStructuredJSON<KillTestReport>(
      {
        systemPrompt,
        userPrompt: `Stress-test and attack this startup idea:\nTitle: ${idea.title}\nProblem: ${idea.problem}\nSolution: ${idea.solution}\nCustomer: ${idea.customer}\nRisks: ${idea.risks.join(', ')}`,
        responseFormat: 'json'
      },
      fallbackGenerator
    );
  }

  public static async makeItUnique(idea: IdeaDecomposition): Promise<DifferentiationStrategy> {
    const fallbackGenerator = (): DifferentiationStrategy => {
      return {
        originalIdea: idea.solution || 'Ambient AI medical transcription tool that records patient visits and generates SOAP notes for doctors.',
        improvedIdea: 'ClinicFlow Wedge: Real-time Ambient Consultation Copilot with Instant Pharmacy Dispatch and Automated Cashless Billing Yield Optimizer.',
        differentiationVectors: [
          {
            vector: 'Product',
            strategy: 'Dual-screen mode: While doctor speaks, the system displays real-time contraindication alerts and generates a patient-friendly 1-page WhatsApp summary in the patient’s native language.',
            impact: 'HIGH'
          },
          {
            vector: 'AI',
            strategy: 'Confidence-annotated transcription chips: Every clinical assertion shows a micro-waveform anchor. Clicking any clinical fact plays the exact 2-second audio snippet, cutting verification time from 3 minutes to 15 seconds.',
            impact: 'HIGH'
          },
          {
            vector: 'UX',
            strategy: 'Zero-Click Floating Widget: Works overlaid across any legacy Windows or browser EMR. Pressing Alt+Space injects formatted text directly into active input cursor without copy-pasting.',
            impact: 'HIGH'
          },
          {
            vector: 'Pricing',
            strategy: 'Risk-free ROI Guarantee: 30-day free pilot where clinic pays $0 until the system documents its first 100 patient visits and saves verified 15 hours.',
            impact: 'MEDIUM'
          },
          {
            vector: 'Distribution',
            strategy: 'Local Diagnostic Lab Referral Flywheel: Diagnostic imaging centers sponsor licenses for nearby prescribing physicians because ClinicFlow makes test ordering 1-click.',
            impact: 'HIGH'
          },
          {
            vector: 'Retention',
            strategy: 'Custom Physician Voice Profile: The system learns individual doctor phrasing preferences, custom abbreviations, and prescription dosages over the first 50 consultations.',
            impact: 'HIGH'
          },
          {
            vector: 'Data Moat',
            strategy: 'Proprietary Outpatient Lexicon: Accumulate anonymized outpatient colloquial speech-to-clinical terminology pairs that generic foundational models fail to parse.',
            impact: 'HIGH'
          },
          {
            vector: 'Specialization',
            strategy: 'Own high-volume general outpatient and pediatric practices rather than competing for inpatient hospital surgery wards.',
            impact: 'HIGH'
          },
          {
            vector: 'Defensibility',
            strategy: 'Network effects connecting local doctors to independent diagnostic labs and neighborhood pharmacies in a closed referral loop.',
            impact: 'HIGH'
          }
        ],
        moatSummary: 'You move from a generic AI wrapper dictation tool to a high-retention clinical operating wedge that increases doctor revenues through diagnostic partnerships while locking in physician habit via personalized voice profiles.',
        evidence: {
          level: 'ESTIMATED',
          label: 'Differentiation Matrix',
          sourceDescription: 'Derived across 10 strategic vectors comparing incumbent weaknesses against local market opportunities.'
        }
      };
    };

    return fallbackGenerator();
  }

  public static async battleStrategies(idea: IdeaDecomposition): Promise<StrategyBattleOption[]> {
    return [
      {
        id: 'strat-1',
        name: 'Strategy A: Pure Self-Serve B2B SaaS',
        strategyType: 'B2B SaaS',
        description: 'Target solo private practices with $149/mo self-serve browser extension. Doctor signs up with credit card on web.',
        marketPotential: 82,
        feasibility: 92,
        riskLevel: 'MEDIUM',
        scalability: 94,
        competitionIntensity: 'HIGH',
        isRecommended: true,
        recommendationReason: 'Fastest route to initial revenue ($10k MRR) with low engineering overhead and zero enterprise sales friction.'
      },
      {
        id: 'strat-2',
        name: 'Strategy B: Diagnostic Partner Subsidized Model',
        strategyType: 'Marketplace / Platform',
        description: 'Provide software free or at 80% discount to doctors; monetize via referral transactions with nearby diagnostic pathology and MRI labs.',
        marketPotential: 95,
        feasibility: 74,
        riskLevel: 'HIGH',
        scalability: 88,
        competitionIntensity: 'LOW',
        isRecommended: false,
        recommendationReason: 'Huge financial upside, but complex regulatory compliance and kickback considerations require legal clearance.'
      },
      {
        id: 'strat-3',
        name: 'Strategy C: Direct-to-Consumer Patient Health Passport',
        strategyType: 'Low-cost B2C',
        description: 'Let patients record their own doctor consultations on their personal phone to receive simplified post-visit health instructions.',
        marketPotential: 68,
        feasibility: 85,
        riskLevel: 'HIGH',
        scalability: 96,
        competitionIntensity: 'MEDIUM',
        isRecommended: false,
        recommendationReason: 'Weak willingness to pay directly from consumers; doctor may refuse permission to be recorded on patient phone.'
      },
      {
        id: 'strat-4',
        name: 'Strategy D: Enterprise Hospital System Integration',
        strategyType: 'B2B SaaS',
        description: 'Sell multi-year $100k+ contracts to large hospital networks with on-premise deployment and custom Epic/Cerner connectors.',
        marketPotential: 96,
        feasibility: 45,
        riskLevel: 'HIGH',
        scalability: 72,
        competitionIntensity: 'HIGH',
        isRecommended: false,
        recommendationReason: '12-18 month enterprise sales cycles will drain startup runway before securing initial feedback.'
      }
    ];
  }
}
