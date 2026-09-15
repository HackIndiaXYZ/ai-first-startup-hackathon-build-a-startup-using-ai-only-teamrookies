import { FounderProfile, FounderDNA } from '../types/index.js';
import { aiService } from '../services/ai.service.js';

export class FounderAgent {
  public static async analyzeProfile(profile: FounderProfile): Promise<FounderDNA> {
    const systemPrompt = `You are a Principal Startup Talent and Capability Analyst. 
Analyze the founder's selected interests and operational preferences. 
Do NOT diagnose psychology or personality.
Evaluate their startup preference and capability profile on 9 core dimensions (scores 1-100):
- technology: Depth of core tech adoption
- ai: Propensity for autonomous and agentic workflows
- business: Monetization instincts and commercial focus
- design: UX focus and customer empathy
- technicalDepth: Willingness to build hard infrastructure vs wrappers
- riskAppetite: Tolerance for experimental/unproven markets
- socialImpact: Mission-driven and sustainability priority
- scalability: Focus on global digital distribution vs local service
- execution: Bias towards rapid iterative shipping

Return valid JSON with:
{
  "radar": {
    "technology": number,
    "ai": number,
    "business": number,
    "design": number,
    "technicalDepth": number,
    "riskAppetite": number,
    "socialImpact": number,
    "scalability": number,
    "execution": number
  },
  "strengths": string[],
  "preferencesSummary": string,
  "executiveSummary": string
}`;

    const userPrompt = `Interests: ${profile.interests.join(', ')}
Preferences:
- AI Intensity: ${profile.preferences.aiIntensity}/10
- Technical Complexity: ${profile.preferences.technicalComplexity}/10
- Risk Appetite: ${profile.preferences.riskAppetite}/10
- Investment Preference: ${profile.preferences.investmentPreference}/10
- Scalability Preference: ${profile.preferences.scalabilityPreference}/10
- MVP Speed: ${profile.preferences.mvpSpeed}/10
- Business Type: ${profile.preferences.businessType}/10 (1=B2C, 10=B2B)`;

    const fallbackGenerator = (): Omit<FounderDNA, 'evidence'> => {
      const isTech = profile.preferences.technicalComplexity >= 6;
      const isAI = profile.preferences.aiIntensity >= 6;
      const isRisk = profile.preferences.riskAppetite >= 6;
      const isB2B = profile.preferences.businessType >= 6;

      const techScore = Math.min(95, 45 + profile.preferences.technicalComplexity * 5);
      const aiScore = Math.min(98, 40 + profile.preferences.aiIntensity * 6);
      const bizScore = Math.min(90, 40 + profile.preferences.businessType * 4 + profile.preferences.scalabilityPreference * 2);
      const designScore = Math.max(50, 85 - profile.preferences.technicalComplexity * 2);
      const depthScore = Math.min(96, 40 + profile.preferences.technicalComplexity * 5);
      const riskScore = Math.min(92, 35 + profile.preferences.riskAppetite * 6);
      const socialScore = profile.interests.some(i => i.toLowerCase().includes('climate') || i.toLowerCase().includes('health') || i.toLowerCase().includes('social')) ? 82 : 58;
      const scaleScore = Math.min(95, 45 + profile.preferences.scalabilityPreference * 5);
      const execScore = Math.min(96, 50 + profile.preferences.mvpSpeed * 4);

      const strengths: string[] = [];
      if (isAI) strengths.push('Autonomous Agentic & Applied AI System Design');
      if (isTech) strengths.push('Deep Technical Problem Solving & High-Complexity Architecture');
      if (isB2B) strengths.push('B2B Enterprise Workflow Optimization & High-ACV Alignment');
      if (isRisk) strengths.push('High-Velocity Asymmetric Risk-Taking');
      strengths.push('Rapid MVP Prototyping & Iterative Delivery');

      const prefSummary = `Strong inclination towards ${isB2B ? 'B2B enterprise solutions' : 'consumer/prosumer platforms'} with high AI leverage (${profile.preferences.aiIntensity}/10), ${isRisk ? 'aggressive risk appetite' : 'disciplined risk mitigation'}, and rapid MVP shipping speed.`;

      const execSummary = `Your profile demonstrates an AI-native builder profile with formidable technical depth and an instinct for high-leverage scalable architecture. You excel at taking ambiguous, high-friction domain workflows (like ${profile.interests.slice(0, 3).join(', ')}) and transforming them into streamlined, software-first business opportunities.`;

      return {
        radar: {
          technology: techScore,
          ai: aiScore,
          business: bizScore,
          design: designScore,
          technicalDepth: depthScore,
          riskAppetite: riskScore,
          socialImpact: socialScore,
          scalability: scaleScore,
          execution: execScore
        },
        strengths,
        preferencesSummary: prefSummary,
        executiveSummary: execSummary
      };
    };

    const res = await aiService.generateStructuredJSON<Omit<FounderDNA, 'evidence'>>(
      { systemPrompt, userPrompt, responseFormat: 'json' },
      fallbackGenerator
    );

    return {
      ...res,
      evidence: {
        level: 'OBSERVED',
        label: 'Founder DNA Pattern',
        sourceDescription: 'Derived directly from user skill weighting and calibrated operational sliders.'
      }
    };
  }
}
