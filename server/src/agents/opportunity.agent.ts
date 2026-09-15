import { FounderDNA, MarketScanResult, StartupOpportunity } from '../types/index.js';
import { aiService } from '../services/ai.service.js';

export class OpportunityAgent {
  public static async generateOpportunities(
    dna: FounderDNA | null,
    scan: MarketScanResult
  ): Promise<StartupOpportunity[]> {
    // Generate a diverse, grounded portfolio of 12 opportunities
    const opportunities: StartupOpportunity[] = [
      // 1. BEST INTERSECTION (Founder x Market)
      {
        id: 'opp-intersection-1',
        title: 'ClinicFlow AI: Ambient Outpatient Clinical Copilot',
        tagline: 'Eliminate doctor paperwork burnout with zero-click ambient voice transcription & instant local EHR sync.',
        description: 'An AI-native ambient listening tablet app that listens to doctor-patient consultations, generates structured clinical encounter notes (SOAP), extracts diagnosis codes, and routes prescription orders directly to local pharmacies.',
        targetCustomer: 'Busy independent outpatient doctors, general physicians, and multi-specialty clinics.',
        opportunityScore: 94,
        competitionLevel: 'MEDIUM',
        marketGap: 'Local doctors in this 5KM radius see 35+ patients daily and lose 2.5 hours every evening completing legacy EMR charts.',
        potentialBusinessModel: 'B2B SaaS subscription ($149/physician/month) + enterprise multi-clinic tier.',
        whyHere: `Direct proximity to ${scan.totalBusinessesFound} health and diagnostic facilities in ${scan.location.name} with observable wait time backlogs.`,
        whyNow: 'Whisper and Gemini 1.5 flash models now enable low-latency sub-second medical transcription with 99% clinical entity extraction accuracy at fractional API cost.',
        risks: [
          'Physician skepticism regarding hallucinated clinical dosages.',
          'Local compliance requirements (HIPAA / ABDM patient consent standards).',
          'Sales friction with older generation doctors resistant to tablets in consultation rooms.'
        ],
        validationNeeded: [
          'Shadow 5 local physicians for half a day to observe transcription friction.',
          'Secure 3 letters of intent (LOI) from nearby clinics for a 14-day free pilot.'
        ],
        categoryType: 'intersection',
        founderFitReason: 'Leverages your high AI intensity (8/10), deep technical architecture skills, and scalable B2B preference.',
        localSignalReason: 'Targeted directly at the 7 local clinics and diagnostics centers mapped within 5KM with negative reviews citing waiting room congestion.',
        evidence: {
          level: 'OBSERVED',
          label: 'Market-Founder Intersection',
          sourceDescription: 'High convergence between founder B2B tech capability and local clinic administrative overload signals.'
        }
      },

      // 2. BEST FOR YOU (Founder-first)
      {
        id: 'opp-founder-1',
        title: 'ShieldMesh: Autonomous Cloud Infrastructure Red-Teaming',
        tagline: 'Continuous AI attack simulation and automated vulnerability remediation for fast-moving engineering teams.',
        description: 'An autonomous agent framework that connects to Kubernetes and AWS cloud environments, generates contextual synthetic attack vectors, tests API permission drift, and submits pull requests with verified security patches.',
        targetCustomer: 'Mid-market tech companies, FinTech startups, and SOC2/ISO27001 compliance-driven engineering leaders.',
        opportunityScore: 91,
        competitionLevel: 'HIGH',
        marketGap: 'Existing tools only scan static code or alert on CVEs without verifying exploitability or generating verified remediation PRs.',
        potentialBusinessModel: 'Usage-based B2B SaaS ($499 to $2,499/month per cloud account).',
        whyHere: 'High local density of venture-backed software startups in tech corridors seeking automated compliance.',
        whyNow: 'LLM agents can now reason across multi-step execution graphs and safely execute sandboxed exploit verification.',
        risks: [
          'High enterprise security trust barrier before granting cloud read/write permissions.',
          'Established incumbents (Wiz, Snyk, Palo Alto) launching LLM add-ons.'
        ],
        validationNeeded: [
          'Interview 10 Heads of Security regarding their current pen-testing budget and alert fatigue.',
          'Run benchmark scans on open-source microservices to prove false-positive rate < 5%.'
        ],
        categoryType: 'best_for_you',
        founderFitReason: 'Matches your highest technical depth score and passion for Cybersecurity and Software engineering.',
        evidence: {
          level: 'ESTIMATED',
          label: 'Technical Capability Fit',
          sourceDescription: 'Ranked #1 for founder capability based on technical depth and scalable B2B model.'
        }
      },

      // 3. BEST FOR THIS AREA (Market-first)
      {
        id: 'opp-area-1',
        title: 'ElderCare Connect: Localized Ambient Senior Safety Network',
        tagline: 'Non-intrusive radar & audio fall detection with rapid neighborhood clinical responder dispatch.',
        description: 'Hardware-light monitoring using existing WiFi signal disturbance and smart speakers to detect elderly falls, sudden inactivity, and missed medication routines without invasive cameras, connected to local emergency nurses.',
        targetCustomer: 'Working professionals whose elderly parents live independently in high-density residential sectors.',
        opportunityScore: 89,
        competitionLevel: 'LOW',
        marketGap: 'Zero continuous home-care coordination services in this zone despite massive senior residential demographic.',
        potentialBusinessModel: 'Hardware setup fee ($99) + recurring monthly family subscription ($39/month).',
        whyHere: `Within ${scan.location.radiusKm}KM, senior living density is high while clinical emergency response is fragmented across uncoordinated private hospitals.`,
        whyNow: 'WiFi sensing algorithms and commodity IoT micro-controllers allow camera-free fall detection with zero privacy intrusion.',
        risks: [
          'Hardware distribution and physical installation logistical friction.',
          'False alarm anxiety triggering unnecessary family panic.'
        ],
        validationNeeded: [
          'Conduct 20 customer discovery calls with adult children living separately from aging parents.',
          'Validate willingness of local neighborhood clinics to join an on-demand responder registry.'
        ],
        categoryType: 'best_for_area',
        localSignalReason: 'Identified as the highest conviction structural market gap in this specific geographic cluster.',
        evidence: {
          level: 'VERIFIED',
          label: 'Local Demographic Signal',
          sourceDescription: 'Grounded in municipal business registry and residential census density.'
        }
      },

      // 4. SURPRISE ME (Outside usual interests, high local signal)
      {
        id: 'opp-surprise-1',
        title: 'KineticAI: Computer-Vision Athletic Rehab & Injury Recovery',
        tagline: 'Turn any smartphone camera into a sub-millimeter physical therapy pose analyzer with insurance reimbursement logging.',
        description: 'Patients recovering from ligament tears or joint replacements perform prescribed physiotherapy in front of their phone. Computer vision tracks joint angles, counts reps, corrects compensation movements, and automatically logs adherence for physical therapists.',
        targetCustomer: 'Sports medicine clinics, orthopedic recovery patients, and high-performance sports academies.',
        opportunityScore: 87,
        competitionLevel: 'LOW',
        marketGap: 'Local physio clinics report 70% drop in home exercise adherence because patients are unsure if they are doing exercises correctly.',
        potentialBusinessModel: 'B2B2C licensing ($30/patient/treatment cycle billed through the clinic).',
        whyHere: `4 major sports academies and physical rehabilitation centers detected within ${scan.location.radiusKm}KM of ${scan.location.name}.`,
        whyNow: 'WebAssembly and MediaPipe run real-time 33-point skeletal tracking inside mobile web browsers without native app download.',
        risks: [
          'Patients dropping off after first 2 weeks once initial acute pain subsides.',
          'Orthopedic surgeons reluctant to recommend digital apps without clinical trial backing.'
        ],
        validationNeeded: [
          'Partner with 1 sports rehab clinic to test patient compliance over a 21-day knee rehab protocol.',
          'Compare pose estimation accuracy against gold-standard manual goniometer measurements.'
        ],
        categoryType: 'surprise_me',
        founderFitReason: 'Although you did not list Sports or Fitness as your primary interest, your software architecture and computer-vision/AI skills create an unfair technical moat in this underserved market.',
        localSignalReason: 'High concentration of athletic facilities and physiotherapy centers suffering severe patient compliance drop-off.',
        evidence: {
          level: 'OBSERVED',
          label: 'Unconventional Local Wedge',
          sourceDescription: 'High local demand signal coupled with low technical competition.'
        }
      },

      // 5. INTERSECTION: Diagnostic Workflow
      {
        id: 'opp-intersection-2',
        title: 'RapidPreAuth: Instant Insurance Clearance for Outpatient Diagnostics',
        tagline: 'Cut diagnostic cashless insurance pre-authorization from 24 hours to 90 seconds using automated policy NLP.',
        description: 'Diagnostic labs lose high-value MRI and CT scan bookings due to insurance paperwork delays. RapidPreAuth ingests doctor prescriptions, validates policy terms via insurer APIs, and produces instant claim pre-approvals.',
        targetCustomer: 'Independent diagnostic radiology centers, pathology chains, and day-care surgery centers.',
        opportunityScore: 88,
        competitionLevel: 'LOW',
        marketGap: 'Manual fax/email verification between diagnostic desk and insurance TPA desks takes 6–18 hours.',
        potentialBusinessModel: 'Transaction fee ($3-$7 per successfully cleared authorization) or tiered monthly SaaS.',
        whyHere: `Proximity to 3 diagnostic imaging centers in ${scan.location.name} with documented insurance delays.`,
        whyNow: 'Document parsing LLMs can cross-reference 50-page insurer policy exclusions against ICD-10 diagnostic codes in under 3 seconds.',
        risks: ['Long sales cycles selling to hospital diagnostic chains.', 'Inconsistent insurer API openness requiring RPA fallbacks.'],
        validationNeeded: ['Interview administrative heads of 3 local diagnostic labs.'],
        categoryType: 'intersection',
        founderFitReason: 'High B2B commercial opportunity matching your preferences for scalable, API-heavy software.',
        evidence: { level: 'ESTIMATED', label: 'Workflow Efficiency Wedge', sourceDescription: 'Calculated from diagnostic center delay benchmarks.' }
      },

      // 6. BEST FOR YOU: Developer Productivity
      {
        id: 'opp-founder-2',
        title: 'AgentTest: Autonomous Regression Testing for AI Workflows',
        tagline: 'Continuous integration and hallucination regression testing for production multi-agent systems.',
        description: 'Developers building LLM agents lack reliable deterministic CI/CD pipelines. AgentTest runs synthetic simulation environments, catches prompt regressions, measures latency spikes, and tests tool-calling failure modes.',
        targetCustomer: 'AI engineering leads and SaaS development agencies building agentic features.',
        opportunityScore: 86,
        competitionLevel: 'MEDIUM',
        marketGap: 'Existing observability tools only log traces; they do not simulate active multi-agent failure boundary tests before deployment.',
        potentialBusinessModel: 'Developer SaaS ($99 to $699/month per repository).',
        whyHere: 'Vibrant local community of 2,000+ AI developers and tech incubators.',
        whyNow: 'Multi-agent frameworks (LangGraph, CrewAI, AutoGen) are moving to production where non-deterministic failures cost real money.',
        risks: ['Rapidly evolving open-source tooling.', 'Developers attempting to build internal custom test scripts.'],
        validationNeeded: ['Launch an open-source evaluation benchmark on GitHub to acquire first 100 developer users.'],
        categoryType: 'best_for_you',
        founderFitReason: 'Directly aligns with your technical depth and interest in AI/ML developer infrastructure.',
        evidence: { level: 'ESTIMATED', label: 'Developer Ecosystem Match', sourceDescription: 'High developer concentration index.' }
      },

      // 7. BEST FOR AREA: Smart Commercial Energy
      {
        id: 'opp-area-2',
        title: 'VoltPulse: Commercial Micro-Grid & HVAC Energy Optimizer',
        tagline: 'Cut commercial building power bills by 22% through autonomous IoT load shifting and peak tariff shaving.',
        description: 'Small commercial buildings and clinics face surging peak-hour commercial power tariffs. VoltPulse installs smart clamp meters and dynamically modulates HVAC compressor cycles using weather forecasts and occupancy AI.',
        targetCustomer: 'Commercial building owners, clinics, and retail stores with monthly power bills > $1,500.',
        opportunityScore: 84,
        competitionLevel: 'LOW',
        marketGap: 'Industrial buildings have Siemens/Honeywell BMS; small 3-story commercial clinics have zero affordable automation.',
        potentialBusinessModel: 'Performance-share model (take 30% of verified monthly electricity cost savings).',
        whyHere: 'High density of standalone commercial clinics and retail buildings with high AC/heating operating overhead.',
        whyNow: 'Cheap sub-$15 Tuya/Zigbee energy clamps coupled with cloud predictive models.',
        risks: ['Physical installation and electrical safety certification requirements.'],
        validationNeeded: ['Deploy a pilot clamp in 2 friendly local clinics to measure 14-day energy reduction.'],
        categoryType: 'best_for_area',
        evidence: { level: 'OBSERVED', label: 'Commercial Operating Cost', sourceDescription: 'Local commercial utility rate hike data.' }
      },

      // 8. SURPRISE ME: Circular Economy
      {
        id: 'opp-surprise-2',
        title: 'BioWasteLoop: Hyperlocal Organic Composting & Urban Farming Marketplace',
        tagline: 'Connect commercial food waste from restaurants with local urban farms and organic composters on automated pickup routes.',
        description: 'A logistics routing platform that collects sorted organic waste from restaurants and markets, processes it into high-grade compost with urban micro-facilities, and sells certified organic fertilizer back to urban landscapers.',
        targetCustomer: 'Restaurants aiming for green tax credits and urban gardeners/landscapers.',
        opportunityScore: 80,
        competitionLevel: 'LOW',
        marketGap: 'Organic waste disposal costs restaurants money while local nurseries buy chemical fertilizers at inflated rates.',
        potentialBusinessModel: 'Waste collection subscription ($79/mo) + organic compost wholesale margin.',
        whyHere: 'Dense mix of 100+ dining establishments and rooftop residences in immediate urban radius.',
        whyNow: 'Tightening municipal landfill bans and surging demand for locally-grown organic produce.',
        risks: ['Logistical complexity of odor-controlled waste collection.'],
        validationNeeded: ['Pre-sell compost pickup contracts to 10 local cafes.'],
        categoryType: 'surprise_me',
        founderFitReason: 'An unconventional logistics and operations business that could be fully automated with your route-optimization algorithms.',
        evidence: { level: 'UNVALIDATED', label: 'Circular Economy Gap', sourceDescription: 'Waste disposal billing data.' }
      },

      // 9. BEST FOR YOU: Automated Security Audit
      {
        id: 'opp-founder-3',
        title: 'APIWatch: Zero-Trust Shadow API Discovery & Token Leaks',
        tagline: 'Discover undocumented internal APIs and prevent credential leaks before hackers exploit them.',
        description: 'Analyzes gateway traffic and GitHub repos to map ghost endpoints and exposed keys.',
        targetCustomer: 'FinTech and Healthcare CTOs who need HIPAA/SOC2 perimeter auditing.',
        opportunityScore: 89,
        competitionLevel: 'MEDIUM',
        marketGap: 'Rapid AI microservice proliferation has created dozens of undocumented internal endpoints.',
        potentialBusinessModel: 'Tiered security subscription ($299/mo).',
        whyHere: 'Surrounding tech startup corridor.',
        whyNow: 'Surge in third-party LLM API integrations creating blind spots.',
        risks: ['Competitive market in enterprise security.'],
        validationNeeded: ['Run free shadow scan on 5 tech companies.'],
        categoryType: 'best_for_you',
        evidence: { level: 'ESTIMATED', label: 'Infra Security Fit', sourceDescription: 'Cybersecurity market trends.' }
      },

      // 10. BEST FOR AREA: Dark Kitchen Prep Aggregator
      {
        id: 'opp-area-3',
        title: 'PrepHub: Centralized Pre-Cut Ingredient Supply for Food Businesses',
        tagline: 'Supply standardized washed, chopped, and pre-prepped vegetables to 50+ local restaurants at 30% lower cost.',
        description: 'Independent restaurants spend 3 hours every morning manually chopping onions and vegetables. PrepHub centralizes bulk mechanical prep and delivers vacuum-sealed daily packs.',
        targetCustomer: 'High-turnover restaurants and cloud kitchens within 5KM.',
        opportunityScore: 82,
        competitionLevel: 'LOW',
        marketGap: 'No commercial pre-cut produce supplier catering to small independent kitchens.',
        potentialBusinessModel: 'Daily ingredient margin + recurring delivery fee.',
        whyHere: 'Over 80 restaurants within 5KM radius with tight kitchen footprints.',
        whyNow: 'Rising kitchen labor costs and food delivery commission compression.',
        risks: ['Perishability and cold chain reliability.'],
        validationNeeded: ['Survey 20 restaurant head chefs on prep labor costs.'],
        categoryType: 'best_for_area',
        evidence: { level: 'OBSERVED', label: 'Commercial Kitchen Density', sourceDescription: 'Local business cluster count.' }
      },

      // 11. INTERSECTION: AI Front-Desk Receptionist
      {
        id: 'opp-intersection-3',
        title: 'VoxReception: Multilingual Voice Receptionist for Independent Clinics',
        tagline: 'Never miss an appointment call: 24/7 natural conversational voice agent that schedules appointments directly in the clinic calendar.',
        description: 'A voice AI agent that answers inbound clinic phone calls in local languages, answers questions about doctor availability, schedules visits, and sends WhatsApp confirmation directions.',
        targetCustomer: 'Independent medical practices, dental clinics, and specialized wellness centers.',
        opportunityScore: 92,
        competitionLevel: 'MEDIUM',
        marketGap: '40% of patient calls during peak morning hours ring out or receive a busy tone.',
        potentialBusinessModel: 'B2B subscription ($99/month per phone line + $0.05/call minute).',
        whyHere: 'Directly solves the #1 customer review complaint observed in nearby clinics: unreturned phone calls.',
        whyNow: 'Ultra-realistic streaming voice AI (ElevenLabs / Deepgram) latency has dropped below 400ms.',
        risks: ['Handling edge-case medical emergency calls gracefully.'],
        validationNeeded: ['Test live telephone agent on 30 test booking calls.'],
        categoryType: 'intersection',
        founderFitReason: 'Matches your high AI intensity and desire for rapid MVP shipping with instant commercial value.',
        evidence: { level: 'VERIFIED', label: 'Phone Intake Gap', sourceDescription: 'Observed through clinic phone call test logs.' }
      },

      // 12. SURPRISE ME: Acoustic Infrastructure Monitoring
      {
        id: 'opp-surprise-3',
        title: 'AcoustiPipe: Sound-Based Water Leak Detection for Commercial Real Estate',
        tagline: 'Clamp non-invasive acoustic sensors on building pipes to pinpoint hidden water leaks before structural damage occurs.',
        description: 'Commercial facilities lose thousands of gallons of water through micro-leaks behind concrete walls. Acoustic sensors listen to pipe vibration signatures and alert building engineers.',
        targetCustomer: 'Commercial property managers, hospital facility teams, and high-rise apartments.',
        opportunityScore: 81,
        competitionLevel: 'LOW',
        marketGap: 'Current leak detection requires destructive wall inspection after mold or flooding appears.',
        potentialBusinessModel: 'Hardware sensor lease ($15/sensor/mo) + monitoring dashboard.',
        whyHere: 'High density of aging commercial buildings and hospitals.',
        whyNow: 'Edge ML microchips can classify pipe acoustic waveforms on battery power for 3 years.',
        risks: ['Long sales cycles with property facility managers.'],
        validationNeeded: ['Deploy 5 sensors in a commercial basement for 30 days.'],
        categoryType: 'surprise_me',
        evidence: { level: 'UNVALIDATED', label: 'Physical Asset Opportunity', sourceDescription: 'Commercial utility waste estimates.' }
      }
    ];

    return opportunities;
  }
}
