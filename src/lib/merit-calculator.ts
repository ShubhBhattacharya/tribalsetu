export interface MeritWeights {
  academicWeight: number; // default 0.4
  universityWeight: number; // default 0.4
  socioEconomicWeight: number; // default 0.2
}

export const DEFAULT_MERIT_WEIGHTS: MeritWeights = {
  academicWeight: 0.4,
  universityWeight: 0.4,
  socioEconomicWeight: 0.2,
};

export function calculateUniversityScore(schemeCode: string, ranking?: number): number {
  if (!ranking || ranking <= 0) return 70;

  if (schemeCode === "NOS") {
    // QS World Ranking
    if (ranking <= 50) return 100;
    if (ranking <= 100) return 95;
    if (ranking <= 200) return 90;
    if (ranking <= 300) return 82;
    if (ranking <= 500) return 75;
    return 60;
  } else {
    // NFST (NIRF India Ranking)
    if (ranking <= 10) return 100;
    if (ranking <= 25) return 94;
    if (ranking <= 50) return 88;
    if (ranking <= 100) return 80;
    return 70;
  }
}

export function calculateSocioEconomicScore(annualIncome: number, tribalGroup?: string): number {
  let score = 70;

  if (annualIncome <= 250000) {
    score = 100;
  } else if (annualIncome <= 400000) {
    score = 90;
  } else if (annualIncome <= 600000) {
    score = 80;
  } else if (annualIncome <= 800000) {
    score = 70;
  } else {
    score = 45;
  }

  // Particularly Vulnerable Tribal Group (PVTG) / Priority community affirmative bonus
  const pvtgGroups = ["Birhor", "Korwa", "Mariya Gond", "Chenchu", "Toda", "Santhal", "Munda"];
  if (tribalGroup && pvtgGroups.includes(tribalGroup)) {
    score = Math.min(100, score + 5);
  }

  return score;
}

export function computeCompositeMerit(
  academicScore: number,
  univRanking: number | undefined,
  annualIncome: number,
  schemeCode: string,
  tribalGroup?: string,
  weights: MeritWeights = DEFAULT_MERIT_WEIGHTS
): {
  meritScore: number;
  breakdown: {
    academicPoints: number;
    univPoints: number;
    socioPoints: number;
  };
} {
  const normalizedAcademic = Math.min(100, Math.max(0, academicScore));
  const univPoints = calculateUniversityScore(schemeCode, univRanking);
  const socioPoints = calculateSocioEconomicScore(annualIncome, tribalGroup);

  const weightedScore =
    normalizedAcademic * weights.academicWeight +
    univPoints * weights.universityWeight +
    socioPoints * weights.socioEconomicWeight;

  return {
    meritScore: Number(weightedScore.toFixed(2)),
    breakdown: {
      academicPoints: Number((normalizedAcademic * weights.academicWeight).toFixed(2)),
      univPoints: Number((univPoints * weights.universityWeight).toFixed(2)),
      socioPoints: Number((socioPoints * weights.socioEconomicWeight).toFixed(2)),
    },
  };
}
