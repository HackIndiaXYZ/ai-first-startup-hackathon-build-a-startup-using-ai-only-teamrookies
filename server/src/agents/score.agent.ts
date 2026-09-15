import { StartupScoreBreakdown, SimulatorRunResult } from '../types/index.js';

export class ScoreAgent {
  public static calculateStartupScore(): StartupScoreBreakdown {
    return {
      overallScore: 84,
      strongestFactor: {
        factor: 'Founder Fit & Local Market Intersection',
        score: 94,
        reason: 'Exceptional convergence between your AI technical depth and the acute, documented paperwork latency in nearby outpatient clinics.'
      },
      weakestFactor: {
        factor: 'Customer Acquisition Channel (CAC)',
        score: 62,
        reason: 'Physicians have low receptivity to digital cold outreach; distribution depends heavily on forging local diagnostic lab referral relationships.'
      },
      biggestUncertainty: 'Will independent doctors consistently verify AI SOAP notes in under 20 seconds, or will verification anxiety lead to product abandonment?',
      recommendedNextAction: {
        title: 'Run a 10-Doctor Shadow & Pricing Experiment',
        description: 'Observe 5 consultations in 2 friendly local clinics to benchmark raw ambient note accuracy and confirm willing payment threshold.',
        ctaText: 'Launch Validation Experiment',
        route: '/validation'
      },
      dimensions: {
        problem: 95,
        market: 92,
        founderFit: 94,
        localOpportunity: 88,
        competition: 70,
        differentiation: 86,
        businessModel: 82,
        feasibility: 90,
        validation: 65,
        scalability: 84
      },
      disclaimer: 'This is a heuristic decision-support score designed to pinpoint operational blindspots, not a statistical guarantee of commercial venture success.'
    };
  }

  public static runSimulation(inputs: {
    price?: number;
    customersM1?: number;
    conversionRatePercent?: number;
    churnRatePercent?: number;
    monthlyMarketingBudget?: number;
    cac?: number;
    operatingCostsMonthly?: number;
  }): SimulatorRunResult {
    const price = inputs.price ?? 149;
    const baseCust = inputs.customersM1 ?? 15;
    const churn = (inputs.churnRatePercent ?? 3.5) / 100;
    const mktg = inputs.monthlyMarketingBudget ?? 1200;
    const cac = inputs.cac ?? 180;
    const opex = inputs.operatingCostsMonthly ?? 2500;

    // Monthly organic & paid acquisition
    const monthlyNewBase = Math.round(mktg / cac) + 4;
    const monthlyNewCons = Math.round((mktg * 0.7) / (cac * 1.4)) + 2;
    const monthlyNewAggr = Math.round((mktg * 1.3) / (cac * 0.8)) + 8;

    const projectScenario = (
      name: 'Conservative' | 'Base' | 'Aggressive',
      monthlyNew: number,
      churnRate: number,
      marginPercent: number
    ) => {
      let active = baseCust;
      let totalRev = 0;
      let m12Rev = 0;
      let breakEvenMonth = 0;

      for (let m = 1; m <= 12; m++) {
        active = Math.round(active * (1 - churnRate) + monthlyNew);
        const monthlyRev = active * price;
        const totalMonthlyCost = opex + mktg + (active * 15); // $15 AI compute
        totalRev += monthlyRev;
        if (m === 12) m12Rev = monthlyRev;
        if (monthlyRev >= totalMonthlyCost && breakEvenMonth === 0) {
          breakEvenMonth = m;
        }
      }

      return {
        scenarioName: name,
        monthlyRevenueM12: m12Rev,
        annualRevenue: totalRev,
        breakEvenMonth: breakEvenMonth > 0 ? breakEvenMonth : 14,
        totalCustomersM12: active,
        monthlyBurn: Math.max(0, opex + mktg - (baseCust * price)),
        grossMarginPercent: marginPercent,
        growthAssumptions: [
          `${monthlyNew} new subscribing clinics onboarded per month`,
          `${(churnRate * 100).toFixed(1)}% monthly customer churn`,
          `$${price}/month blended average revenue per clinic`,
          `Estimated $15/doctor monthly LLM compute & vector hosting cost`
        ]
      };
    };

    return {
      inputs: {
        price,
        customersM1: baseCust,
        conversionRatePercent: inputs.conversionRatePercent ?? 8.5,
        churnRatePercent: inputs.churnRatePercent ?? 3.5,
        monthlyMarketingBudget: mktg,
        cac,
        operatingCostsMonthly: opex
      },
      scenarios: [
        projectScenario('Conservative', monthlyNewCons, churn * 1.5, 72),
        projectScenario('Base', monthlyNewBase, churn, 82),
        projectScenario('Aggressive', monthlyNewAggr, churn * 0.7, 88)
      ],
      disclaimer: 'Scenario projection model based on unit economic heuristics — not an audit or financial guarantee.'
    };
  }
}
