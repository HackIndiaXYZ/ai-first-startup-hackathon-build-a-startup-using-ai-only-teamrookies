import { Router, Request, Response } from 'express';
import { dbStore } from '../services/store.js';
import { FounderAgent } from '../agents/founder.agent.js';
import { MarketAgent } from '../agents/market.agent.js';
import { OpportunityAgent } from '../agents/opportunity.agent.js';
import { IdeaAgent } from '../agents/idea.agent.js';
import { BoardroomAgent } from '../agents/boardroom.agent.js';
import { ScoreAgent } from '../agents/score.agent.js';
import { MVPAgent } from '../agents/mvp.agent.js';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'AI COMPANY Decision Intelligence Engine',
    timestamp: new Date().toISOString(),
    demoMode: process.env.DEMO_MODE !== 'false'
  });
});

// Profile & Founder DNA
router.get('/profile', (_req: Request, res: Response) => {
  res.json({ profile: dbStore.profile, founderDNA: dbStore.founderDNA });
});

router.post('/profile', (req: Request, res: Response) => {
  if (req.body.interests) dbStore.profile.interests = req.body.interests;
  if (req.body.preferences) dbStore.profile.preferences = req.body.preferences;
  res.json({ success: true, profile: dbStore.profile });
});

router.post('/founder-dna', async (req: Request, res: Response) => {
  try {
    const profile = req.body.profile || dbStore.profile;
    const dna = await FounderAgent.analyzeProfile(profile);
    dbStore.founderDNA = dna;
    res.json({ success: true, founderDNA: dna });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Market Intelligence & Scanner
router.get('/market', (_req: Request, res: Response) => {
  res.json({ location: dbStore.location, marketScan: dbStore.marketScan });
});

router.post('/market/scan', async (req: Request, res: Response) => {
  try {
    const location = req.body.location || dbStore.location;
    dbStore.location = location;
    const scanResult = await MarketAgent.scanMarket(location);
    dbStore.marketScan = scanResult;
    res.json({ success: true, marketScan: scanResult });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Opportunities (Best For You, Best For Area, Intersection, Surprise Me)
router.get('/opportunities', (_req: Request, res: Response) => {
  res.json({
    opportunities: dbStore.opportunities,
    selectedOpportunityId: dbStore.selectedOpportunityId
  });
});

router.post('/opportunities/generate', async (_req: Request, res: Response) => {
  try {
    if (!dbStore.marketScan) {
      dbStore.marketScan = await MarketAgent.scanMarket(dbStore.location);
    }
    const opps = await OpportunityAgent.generateOpportunities(dbStore.founderDNA, dbStore.marketScan);
    dbStore.opportunities = opps;
    if (opps.length > 0 && !dbStore.selectedOpportunityId) {
      dbStore.selectedOpportunityId = opps[0].id;
    }
    res.json({ success: true, opportunities: opps });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/opportunities/select', (req: Request, res: Response) => {
  const { id } = req.body;
  const opp = dbStore.opportunities.find(o => o.id === id);
  if (opp) {
    dbStore.selectedOpportunityId = id;
    dbStore.currentIdea = {
      title: opp.title,
      problem: opp.description,
      customer: opp.targetCustomer,
      solution: opp.tagline,
      valueProposition: opp.tagline,
      businessModel: opp.potentialBusinessModel,
      technology: 'Ambient AI, Speech-to-Text, LLM Structured Clinical Extraction, Web Audio API',
      assumptions: opp.validationNeeded,
      risks: opp.risks,
      competition: `Local clinics and legacy medical software (${opp.competitionLevel} competition)`,
      differentiation: opp.whyHere
    };
  }
  res.json({ success: true, selectedOpportunityId: id, currentIdea: dbStore.currentIdea });
});

// Idea Lab: Deconstruct, Kill My Startup, Make It Unique, Strategy Battle
router.get('/ideas/current', (_req: Request, res: Response) => {
  res.json({
    currentIdea: dbStore.currentIdea,
    killTestReport: dbStore.killTestReport,
    differentiation: dbStore.differentiation
  });
});

router.post('/ideas/deconstruct', async (req: Request, res: Response) => {
  try {
    const raw = req.body.ideaText || 'ClinicFlow AI: Ambient Outpatient Clinical Copilot';
    const deconstructed = await IdeaAgent.deconstructIdea(raw);
    dbStore.currentIdea = deconstructed;
    res.json({ success: true, idea: deconstructed });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/ideas/kill', async (req: Request, res: Response) => {
  try {
    const idea = req.body.idea || dbStore.currentIdea || await IdeaAgent.deconstructIdea('ClinicFlow AI');
    dbStore.currentIdea = idea;
    const report = await IdeaAgent.killMyStartup(idea);
    dbStore.killTestReport = report;
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/ideas/differentiate', async (req: Request, res: Response) => {
  try {
    const idea = req.body.idea || dbStore.currentIdea || await IdeaAgent.deconstructIdea('ClinicFlow AI');
    const diff = await IdeaAgent.makeItUnique(idea);
    dbStore.differentiation = diff;
    res.json({ success: true, differentiation: diff });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/ideas/battle', async (req: Request, res: Response) => {
  try {
    const idea = req.body.idea || dbStore.currentIdea || await IdeaAgent.deconstructIdea('ClinicFlow AI');
    const strategies = await IdeaAgent.battleStrategies(idea);
    res.json({ success: true, strategies });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// AI Boardroom (Multi-Agent Live Debate)
router.get('/boardroom', (_req: Request, res: Response) => {
  res.json({ boardroom: dbStore.boardroomSession });
});

router.post('/boardroom/run', async (_req: Request, res: Response) => {
  try {
    const session = await BoardroomAgent.conveneBoard(dbStore.currentIdea);
    dbStore.boardroomSession = session;
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Startup Score & Simulator
router.get('/score', (_req: Request, res: Response) => {
  const score = ScoreAgent.calculateStartupScore();
  dbStore.startupScore = score;
  res.json({ success: true, score });
});

router.post('/simulator/run', (req: Request, res: Response) => {
  const result = ScoreAgent.runSimulation(req.body);
  dbStore.simulator = result;
  res.json({ success: true, simulator: result });
});

// Validation Lab & Surveys
router.get('/validation/experiments', (_req: Request, res: Response) => {
  const experiments = [
    {
      id: 'exp-1',
      title: '10-Doctor Consultation Shadow & Friction Benchmark',
      type: 'INTERVIEW',
      hypothesis: 'Doctors spend at least 2.5 minutes per patient typing notes and actively complain about EHR fatigue.',
      method: 'In-person observation of 10 outpatient visits across 3 local clinics.',
      targetAudience: 'General Physicians and Pediatricians in local 5KM cluster.',
      questions: [
        'How many total minutes do you spend charting after the patient leaves the desk?',
        'What software do you currently type into?',
        'Would you allow an ambient microphone in the consultation room if raw audio is wiped instantly?'
      ],
      successCriteria: '8 out of 10 doctors report charting fatigue and express willingness to pilot.',
      expectedDurationDays: 4,
      estimatedBudgetUsd: 50,
      status: 'ACTIVE'
    },
    {
      id: 'exp-2',
      title: 'Willingness-to-Pay Deposit Experiment ($49 Setup Fee)',
      type: 'WAITLIST',
      hypothesis: 'At least 20% of interested doctors will place a refundable $49 pilot deposit for early access.',
      method: 'Dedicated landing page with Stripe deposit checkout.',
      targetAudience: 'Outpatient physicians via local doctor WhatsApp groups.',
      questions: ['Are you willing to place a refundable $49 priority slot deposit?'],
      successCriteria: '5 paid deposits secured within 7 days.',
      expectedDurationDays: 7,
      estimatedBudgetUsd: 100,
      status: 'DRAFT'
    }
  ];
  res.json({ success: true, experiments });
});

router.get('/validation/survey/:id', (req: Request, res: Response) => {
  const survey = dbStore.surveys.get(req.params.id) || dbStore.surveys.get('survey-ai-co-default');
  if (!survey) return res.status(404).json({ error: 'Survey not found' });
  res.json({ success: true, survey });
});

router.post('/validation/survey/:id/respond', (req: Request, res: Response) => {
  const survey = dbStore.surveys.get(req.params.id) || dbStore.surveys.get('survey-ai-co-default');
  if (!survey) return res.status(404).json({ error: 'Survey not found' });

  const responseItem = {
    id: `resp-${Date.now()}`,
    timestamp: new Date().toISOString(),
    answers: req.body.answers || {}
  };

  survey.responses.push(responseItem);
  survey.totalResponses += 1;
  res.json({ success: true, totalResponses: survey.totalResponses, analytics: survey.analytics });
});

// MVP Builder, AI Build Agent, QA Agent, Security
router.get('/mvp/plan', (_req: Request, res: Response) => {
  const plan = MVPAgent.generateMVPPlan();
  dbStore.mvpPlan = plan;
  res.json({ success: true, plan });
});

router.get('/mvp/build-logs', (_req: Request, res: Response) => {
  const logs = MVPAgent.getBuildExecutionLogs();
  res.json({ success: true, logs });
});

router.post('/mvp/break-app', (_req: Request, res: Response) => {
  const qa = MVPAgent.runQABreakApp();
  res.json({ success: true, qa });
});

router.get('/mvp/security', (_req: Request, res: Response) => {
  const security = MVPAgent.auditSecurity();
  res.json({ success: true, security });
});

// Launch Center
router.get('/launch/kit', (_req: Request, res: Response) => {
  const kit = MVPAgent.generateLaunchKit();
  dbStore.launchKit = kit;
  res.json({ success: true, kit });
});

// Advisor & AI Co-Founder
router.post('/advisor/triage', (req: Request, res: Response) => {
  const { question } = req.body;
  const result = MVPAgent.triageAdvisorQuestion(question || 'Should I focus on sales or build more features?', {
    startupName: dbStore.currentIdea?.title || 'ClinicFlow AI'
  });
  res.json({ success: true, triage: result });
});

// Master Dashboard API (aggregating all critical context for the command center)
router.get('/dashboard', async (_req: Request, res: Response) => {
  if (!dbStore.founderDNA) {
    dbStore.founderDNA = await FounderAgent.analyzeProfile(dbStore.profile);
  }
  if (!dbStore.marketScan) {
    dbStore.marketScan = await MarketAgent.scanMarket(dbStore.location);
  }
  if (dbStore.opportunities.length === 0) {
    dbStore.opportunities = await OpportunityAgent.generateOpportunities(dbStore.founderDNA, dbStore.marketScan);
  }
  if (!dbStore.currentIdea) {
    dbStore.currentIdea = await IdeaAgent.deconstructIdea('ClinicFlow AI: Ambient Outpatient Clinical Copilot');
  }
  if (!dbStore.startupScore) {
    dbStore.startupScore = ScoreAgent.calculateStartupScore();
  }

  res.json({
    profile: dbStore.profile,
    founderDNA: dbStore.founderDNA,
    location: dbStore.location,
    marketScan: dbStore.marketScan,
    selectedOpportunity: dbStore.opportunities.find(o => o.id === dbStore.selectedOpportunityId) || dbStore.opportunities[0],
    currentIdea: dbStore.currentIdea,
    startupScore: dbStore.startupScore,
    boardroom: dbStore.boardroomSession,
    nextBestAction: {
      title: 'Validate Willingness to Pay with 10 Local Clinics',
      description: 'Run an in-person shadow session and test the $49 refundable pilot deposit.',
      cta: 'Launch Validation Experiment',
      route: '/validation'
    }
  });
});

export default router;
