import {
  MVPPlan,
  AIBuildLogItem,
  QABreakResult,
  SecurityReadinessResult,
  LaunchCenterKit,
  AdvisorTriageResult
} from '../types/index.js';

export class MVPAgent {
  public static generateMVPPlan(): MVPPlan {
    return {
      id: `mvp-${Date.now()}`,
      startupName: 'ClinicFlow AI',
      problem: 'Outpatient physicians lose 2.5 hours every day manually transcribing patient consultations into legacy EMR software, causing severe cognitive burnout and limiting patient care capacity.',
      targetCustomer: 'Independent outpatient doctors and multi-specialty clinic practitioners.',
      valueProposition: 'Recover 2 hours every clinical day through ambient zero-click medical transcription that automatically formats SOAP notes and synchronizes with existing clinic software.',
      coreFeatures: [
        {
          name: 'Ambient Dual-Channel Audio Recorder',
          description: 'Browser & mobile web audio recorder with automatic doctor/patient voice diarization and medical noise filtering.',
          priority: 'P0 - CRITICAL'
        },
        {
          name: 'Clinical SOAP Note & Entity Generator',
          description: 'Transforms messy patient dialogues into structured Subjective, Objective, Assessment, and Plan notes with highlighted dosage chips.',
          priority: 'P0 - CRITICAL'
        },
        {
          name: 'Zero-Click Clipboard & Browser Injector',
          description: 'Lightweight overlay that pastes completed clinical charts directly into active browser textfields with a hotkey.',
          priority: 'P0 - CRITICAL'
        },
        {
          name: '1-Click Verification Audio Auditing',
          description: 'Clicking any extracted clinical fact instantly plays back the exact 2-second audio snippet to verify dosage without relistening to the entire consultation.',
          priority: 'P1 - IMPORTANT'
        },
        {
          name: 'Instant Pharmacy & Diagnostic Order Slip',
          description: 'Generates a clean PDF and WhatsApp prescription summary formatted for local partner pharmacy fulfillment.',
          priority: 'P1 - IMPORTANT'
        }
      ],
      whatNotToBuildYet: [
        {
          feature: 'Full Electronic Medical Record (EMR) Replacement',
          reasonToOmit: 'Do NOT try to replace their existing database. EMR switching costs are huge; build a lightweight injection wedge instead.'
        },
        {
          feature: 'Direct Hospital Enterprise Inpatient Billing Suite',
          reasonToOmit: 'Enterprise hospital billing requires 12-month compliance audits and integration with 20-year-old on-premise mainframe systems.'
        },
        {
          feature: 'Native iOS & Android Mobile Apps',
          reasonToOmit: 'A mobile-responsive PWA and desktop Chrome extension is 10x faster to ship and iterate without App Store review delays.'
        },
        {
          feature: 'Automated Telemedicine Video Calling',
          reasonToOmit: 'Telehealth is heavily saturated and distracts from physical outpatient exam room efficiency.'
        }
      ],
      userJourneys: [
        {
          persona: 'Dr. Sarah (Outpatient Pediatrician)',
          steps: [
            'Opens ClinicFlow browser tab on consultation room laptop.',
            'Clicks "Start Ambient Visit" as patient and parent enter.',
            'Conducts natural 8-minute physical examination and conversation.',
            'Clicks "Complete Visit". AI renders draft SOAP note in 1.4 seconds.',
            'Doctor glances at dosage chips, taps Alt+Space to inject directly into clinic software.',
            'Prints prescription slip or sends to parent via WhatsApp in 1 click.'
          ]
        }
      ],
      architecture: {
        frontend: 'React 18 + TypeScript + Vite + Tailwind CSS (Lightweight, instant sub-50ms render latency)',
        backend: 'Node.js + Express + TypeScript running on low-latency edge servers',
        database: 'MongoDB Atlas with encrypted medical session logs and audit trails',
        aiEngine: 'Whisper streaming ASR + Gemini 1.5 Flash / Groq Llama-3.3 for structured clinical JSON extraction',
        apis: [
          'POST /api/consultation/stream-audio',
          'POST /api/consultation/generate-soap',
          'GET /api/prescriptions/:id/pdf',
          'POST /api/integrations/clipboard-inject'
        ],
        auth: 'JWT with secure HttpOnly cookies, multi-factor authentication (MFA), and session timeouts',
        deployment: 'Frontend on Vercel Edge; Backend on Render/Railway container with automated health monitoring'
      },
      developmentRoadmap: [
        {
          phase: 'Phase 1: Audio Core & Clinical Prompt Calibration (Days 1–7)',
          timeframe: 'Week 1',
          deliverables: [
            'Implement Web Audio API recording with opus compression',
            'Calibrate Gemini/Groq prompt with 50 real anonymized clinical transcripts',
            'Build interactive SOAP note card with audio timestamp verification'
          ]
        },
        {
          phase: 'Phase 2: Injection Widget & Clinic Pilot Sandbox (Days 8–14)',
          timeframe: 'Week 2',
          deliverables: [
            'Develop zero-click hotkey clipboard injector extension',
            'Implement doctor feedback and dosage correction telemetry',
            'Deploy to staging and onboard 3 pilot doctors for live clinic trials'
          ]
        },
        {
          phase: 'Phase 3: Security Hardening & Local Distribution (Days 15–21)',
          timeframe: 'Week 3',
          deliverables: [
            'Implement automated audio stream memory-purge on note completion',
            'Setup diagnostic partner referral tracking portal',
            'Launch self-serve onboarding and Stripe billing integration'
          ]
        }
      ]
    };
  }

  public static getBuildExecutionLogs(): AIBuildLogItem[] {
    return [
      { id: 'b1', step: 'Synthesize Architecture & System Topology', category: 'PLAN', status: 'COMPLETED', details: 'Designed event-driven micro-architecture with WebSocket streaming and HIPAA-compliant data boundaries.', timestamp: '10:00:12 AM' },
      { id: 'b2', step: 'Initialize MongoDB Schemas & Audit Vault', category: 'DATABASE', status: 'COMPLETED', details: 'Configured indexed collections for consultations, doctors, clinic profiles, and ephemeral audio tokens.', timestamp: '10:00:24 AM' },
      { id: 'b3', step: 'Generate Zero-Trust Auth & MFA Safeguards', category: 'AUTH', status: 'COMPLETED', details: 'Implemented signed JWT authentication with rate-limited login and role-based access control.', timestamp: '10:00:39 AM' },
      { id: 'b4', step: 'Construct Streaming Audio & Clinical NLP Endpoints', category: 'API', status: 'COMPLETED', details: 'Engineered sub-second SOAP extraction pipeline with automated confidence tagging.', timestamp: '10:00:58 AM' },
      { id: 'b5', step: 'Assemble High-Performance Doctor Interface', category: 'UI', status: 'COMPLETED', details: 'Built responsive consultation dashboard with audio waveform visualizer and keyboard navigation.', timestamp: '10:01:15 AM' },
      { id: 'b6', step: 'Run Automated Unit & Stress Test Suites', category: 'TEST', status: 'COMPLETED', details: 'Passed 48/48 integration tests verifying audio packet chunking and JSON parser error recovery.', timestamp: '10:01:32 AM' },
      { id: 'b7', step: 'Verify Production Deployment Topology', category: 'DEPLOY', status: 'COMPLETED', details: 'Container image verified; cold start latency verified at 120ms with zero memory leaks.', timestamp: '10:01:45 AM' }
    ];
  }

  public static runQABreakApp(): QABreakResult {
    return {
      overallHealth: 94,
      testSuitesRun: 62,
      bugsFound: [
        {
          id: 'bug-1',
          bug: 'Temporary audio recording cut-off when laptop screen locks during extended consultations',
          severity: 'HIGH',
          location: 'Client Web Audio API WakeLock Handler',
          suggestedFix: 'Implement Screen Wake Lock API to prevent mobile/laptop browser sleep during active recording.',
          status: 'RESOLVED'
        },
        {
          id: 'bug-2',
          bug: 'Accidental duplicate SOAP note generation when doctor double-clicks "Complete Visit"',
          severity: 'MEDIUM',
          location: 'Client Action Button Throttle',
          suggestedFix: 'Add idempotent request tokens and disable submit button state during initial payload processing.',
          status: 'RESOLVED'
        },
        {
          id: 'bug-3',
          bug: 'Edge case: Ambient background baby crying lowered transcription accuracy in pediatric clinics',
          severity: 'LOW',
          location: 'Audio Preprocessing Low-Pass Filter',
          suggestedFix: 'Apply client-side Web Audio API frequency band-pass filter to isolate human vocal spectrum (300Hz–3400Hz).',
          status: 'OPEN'
        }
      ]
    };
  }

  public static auditSecurity(): SecurityReadinessResult {
    return {
      score: 96,
      checks: [
        { name: 'Secret & API Key Exposure Check', category: 'Secret Exposure', status: 'PASSED', details: 'All Groq/Gemini/OpenAI API keys strictly kept on server backend. Zero frontend leaks.' },
        { name: 'Physician Session & Auth Security', category: 'Authentication', status: 'PASSED', details: 'HttpOnly SameSite cookies with automated 30-minute idle inactivity session expiration.' },
        { name: 'Multi-Tenant Clinic Data Isolation', category: 'Authorization', status: 'PASSED', details: 'Every database query enforced with strict tenant ID boundary checking.' },
        { name: 'Medical Payload Input Validation', category: 'Input Validation', status: 'PASSED', details: 'Strict Zod/TypeScript schema parsing preventing prototype pollution and script injection.' },
        { name: 'Audio Stream Retention Sanitization', category: 'Data Exposure', status: 'PASSED', details: 'Raw consultation audio buffer wiped from server RAM immediately upon clinical note emission.' },
        { name: 'Dependency Vulnerability Audit', category: 'Dependency Risks', status: 'PASSED', details: 'Zero high or critical CVE vulnerabilities detected in npm audit package tree.' }
      ],
      summary: 'All automated security and data isolation readiness checks passed. Ready for controlled pilot deployment in clinical settings.',
      disclaimer: 'Automated security checks completed. Formal HIPAA/SOC2 compliance audits should be conducted prior to commercial institutional expansion.'
    };
  }

  public static generateLaunchKit(): LaunchCenterKit {
    return {
      startupName: 'ClinicFlow AI',
      tagline: 'The 2-hour daily gift for outpatient doctors: Ambient clinical notes with zero typing.',
      valueProposition: 'Recover 2 hours every clinical day, eliminate after-hours charting, and increase daily patient capacity by 20% without changing your existing EMR software.',
      landingPageCopy: {
        heroHeading: 'Stop typing clinical charts after hours. Let AI document your clinic visits in real-time.',
        heroSubheading: 'ClinicFlow listens ambiently to doctor-patient conversations, formats perfect SOAP notes with dosage verification, and injects directly into your existing software.',
        bulletPoints: [
          'Zero software installation required — works as a seamless overlay.',
          'Sub-second SOAP note creation with one-click audio proof chips.',
          'Immediate raw audio purge guarantees 100% patient confidentiality.',
          'Free 14-day clinic pilot with dedicated onboarding support.'
        ],
        primaryCta: 'Start Free 14-Day Clinic Pilot'
      },
      pricingTiers: [
        {
          name: 'Starter Practice',
          price: '$99 / doctor / month',
          features: ['Up to 300 patient visits/mo', 'Real-time SOAP note generation', 'Instant PDF & printout export', 'Standard email support']
        },
        {
          name: 'High-Volume Clinic',
          price: '$149 / doctor / month',
          recommended: true,
          features: ['Unlimited patient visits', 'Zero-click browser injector widget', 'Multi-physician clinic dashboard', 'Local pharmacy & lab order routing', 'Priority phone & WhatsApp support']
        },
        {
          name: 'Multi-Specialty Network',
          price: '$249 / doctor / month',
          features: ['Custom EHR database connectors', 'Dedicated clinic account manager', 'On-premise hybrid processing options', 'Custom clinic note templates']
        }
      ],
      launchStrategy: [
        'Beachhead: Walk into 25 independent outpatient clinics in the local 5KM medical district with a tablet demonstration.',
        'Diagnostic Lab Channel Partnership: Equip 3 local diagnostic labs with co-branded ClinicFlow referral slips.',
        'Physician WhatsApp & LinkedIn Community Case Study: Publish a 60-second side-by-side video of a doctor finishing a full day of charts by 5:00 PM.'
      ],
      socialAnnouncementPosts: [
        {
          platform: 'LinkedIn',
          content: 'Physicians spend an average of 2.5 hours every single evening doing clinical paperwork. We spent the last 3 months in local clinics watching doctors battle clunky software.\n\nToday, we’re launching ClinicFlow AI: ambient clinical documentation that writes your SOAP notes while you talk to patients, and injects them directly into your EMR in 1 click.\n\nDoctors are getting their evenings back. Check out our launch video below! 👇'
        },
        {
          platform: 'X / Twitter',
          content: 'Doctors shouldn’t spend 40% of their day typing into a screen while looking away from their patients.\n\nIntroducing ClinicFlow AI 🩺\n\n- Ambient listening in consultation rooms\n- Instant structured SOAP notes\n- Zero typing, zero installation\n\nTry the live demo now: https://clinicflow.ai'
        }
      ],
      coldEmailCampaign: {
        subject: 'Quick question regarding your clinic paperwork load, Dr. {{LastName}}',
        body: `Dear Dr. {{LastName}},\n\nI noticed your clinic in {{City}} sees a high volume of patients every afternoon. Most general practitioners we talk to in the area are spending 2+ hours after clinic hours finishing patient charts.\n\nWe built ClinicFlow AI to solve this: an ambient consultation copilot that listens to your visits, drafts perfect SOAP notes in real-time, and lets you inject them into your clinic software with a single keystroke.\n\nWould you be open to a 5-minute demonstration at your clinic this Thursday? I can set up a free 14-day trial on your laptop with zero software installation.\n\nBest regards,\nFounder, ClinicFlow AI`,
        targetRecipient: 'Independent Clinic General Practitioners and Pediatricians'
      },
      demoScript: [
        { timingSeconds: 15, section: 'The Hook', spokenNotes: 'Show a messy consultation room desk with stacks of patient files. Explain that the doctor has been working for 9 hours and still has 30 charts left to type.' },
        { timingSeconds: 45, section: 'The Ambient Demonstration', spokenNotes: 'Press "Start Visit" on a tablet. Have an actor simulate a patient complaining of a 3-day cough and fever. The doctor prescribes amoxicillin 500mg.' },
        { timingSeconds: 75, section: 'The Magic Moment', spokenNotes: 'Press "Complete Visit". In 1.2 seconds, display the fully formatted SOAP note with exact dosage chips and audio timestamp verification.' },
        { timingSeconds: 110, section: 'The Zero-Click Injection', spokenNotes: 'Press Alt+Space on a mock legacy clinic software screen. Show all text automatically filling the respective fields without manual copy-pasting.' },
        { timingSeconds: 140, section: 'The Business Opportunity & Close', spokenNotes: 'Demonstrate the $149/mo unit economics, the local diagnostic lab referral flywheel, and invite the audience to test the prototype.' }
      ],
      investorOnePager: {
        theProblem: 'Outpatient physicians suffer from acute administrative paperwork burnout, losing 2.5 hours daily to manual charting.',
        theSolution: 'Ambient clinical listening copilot with zero-click legacy EMR injection and instant dosage verification.',
        marketSize: '$9.2B global outpatient medical transcription and clinical documentation market.',
        tractionPlan: 'Target 100 independent clinics in 2 dense regional medical corridors via diagnostic lab referral partnerships.',
        ask: '$500,000 Seed round to expand engineering team and secure regional clinic distribution.'
      },
      first100CustomersPlan: [
        'Days 1–15: Direct in-person walkthroughs with 30 doctors in the local 5KM cluster to secure first 15 paid pilots.',
        'Days 16–45: Formalize channel partnership with 2 regional diagnostic pathology lab chains to distribute pilot flyers.',
        'Days 46–75: Launch referral program giving existing clinics 1 free month for every colleague they refer.',
        'Days 76–90: Host an intimate regional clinical efficiency dinner for 25 clinic medical directors.'
      ]
    };
  }

  public static triageAdvisorQuestion(question: string, context?: any): AdvisorTriageResult {
    const isTech = question.toLowerCase().includes('tech') || question.toLowerCase().includes('api') || question.toLowerCase().includes('database') || question.toLowerCase().includes('latency');
    const isPricing = question.toLowerCase().includes('price') || question.toLowerCase().includes('cost') || question.toLowerCase().includes('monetiz') || question.toLowerCase().includes('charge');

    let domain: 'BUSINESS' | 'TECH' | 'PRICING' | 'MARKET' | 'LEGAL' | 'GROWTH' = 'BUSINESS';
    if (isTech) domain = 'TECH';
    else if (isPricing) domain = 'PRICING';

    return {
      priority: 'IMPORTANT',
      canAISolve: true,
      aiImmediateAnswer: `Based on your startup context (${context?.startupName || 'ClinicFlow AI'}), here is the strategic recommendation: Focus immediately on proving physician willingness to pay before writing additional custom code. In healthcare, doctors frequently say they love a prototype during free trials but churn when billed. Run a 14-day pilot with a mandatory $49 deposit; this single friction point will filter your true high-urgency believers.`,
      recommendedAdvisorDomain: domain,
      preparedBrief: {
        startupName: context?.startupName || 'ClinicFlow AI',
        founderGoal: 'Discover, validate, and launch the strongest startup opportunity in the local healthcare corridor.',
        location: 'Bengaluru Innovation Corridor (5 KM radius)',
        ideaSummary: 'Ambient outpatient clinical consultation copilot with zero-click EMR injection.',
        marketFindings: 'High clinic density with documented 45+ minute patient wait backlogs.',
        keyCompetitors: ['MediPulse Family Clinic', 'Medix Cloud Solutions', 'Nuance Dragon Medical'],
        startupScore: 84,
        mainConcern: 'Physician willingness to pay and clinical liability verification speed.',
        exactQuestion: question,
        sharedFields: ['Founder DNA', 'Market Scan', 'Survival Score', 'Pricing Model']
      }
    };
  }
}
