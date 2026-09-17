import {
  ChoiceItem,
  ChoiceListAnalysis,
  FloatFreezeDecision,
  PredictionResult,
} from '../types';

/**
 * Strategy-Proof Serial Dictatorship Choice List Analyzer
 */
export function analyzeChoiceList(choices: ChoiceItem[]): ChoiceListAnalysis {
  let prodComplement = 1.0;
  let safeCount = 0;
  let likelyCount = 0;
  let targetCount = 0;
  let reachCount = 0;
  let outOfRangeCount = 0;

  const outcomeDistribution: ChoiceListAnalysis['outcomeDistribution'] = [];
  let cumulativeAllocation = 0;

  // Track the first N choices to detect top-heavy list
  let topChoicesLowProbCount = 0;
  const topThreshold = Math.min(choices.length, 10);

  choices.forEach((choice, index) => {
    const pAdmit = choice.prediction.probability;
    const bucket = choice.prediction.bucket;

    if (bucket === 'Safe') safeCount++;
    else if (bucket === 'Likely') likelyCount++;
    else if (bucket === 'Target') targetCount++;
    else if (bucket === 'Reach') reachCount++;
    else outOfRangeCount++;

    if (index < topThreshold && pAdmit < 0.15) {
      topChoicesLowProbCount++;
    }

    // P(allocated to choice i) = P(admit to i) * prod_{j < i} (1 - P(admit to j))
    const pAllocated = pAdmit * prodComplement;
    prodComplement *= 1.0 - pAdmit;
    cumulativeAllocation += pAllocated;

    outcomeDistribution.push({
      choiceId: choice.id,
      preferenceRank: choice.preferenceRank,
      instituteName: choice.prediction.institute.shortName,
      branchName: choice.prediction.program.branchName,
      pAdmit,
      pAllocated,
      cumulativeAllocationProb: Math.min(1.0, cumulativeAllocation),
    });
  });

  const pNoAllocation = choices.length > 0 ? Math.max(0.0, Math.min(1.0, prodComplement)) : 1.0;

  // Top-heavy warning if >70% of the top 10 choices are < 15% probability
  const isTopHeavy = choices.length >= 4 && topChoicesLowProbCount / topThreshold >= 0.7;
  let topHeavyWarning: string | undefined;
  if (isTopHeavy) {
    topHeavyWarning = `Top-heavy risk: ${topChoicesLowProbCount} of your first ${topThreshold} choices have admission probability under 15%. While listing aspirational choices is strategy-proof, you must verify your lower backup positions.`;
  }

  // Calculate recommended safe additions:
  // If P(no allocation) > 0.05, how many ~90% safe choices are needed?
  // Each safe choice has (1 - 0.90) = 0.10 failure rate.
  let recommendedSafeAdditions = 0;
  if (pNoAllocation > 0.05) {
    let currentFailure = pNoAllocation;
    while (currentFailure > 0.049 && recommendedSafeAdditions < 6) {
      currentFailure *= 0.12; // typical safe choice complement
      recommendedSafeAdditions++;
    }
  }

  return {
    choices,
    pNoAllocation,
    safeCount,
    likelyCount,
    targetCount,
    reachCount,
    outOfRangeCount,
    isTopHeavy,
    topHeavyWarning,
    recommendedSafeAdditions,
    outcomeDistribution,
  };
}

/**
 * Cycle Detection in Pairwise Preferences (detects intransitive preferences A > B > C > A)
 */
export function detectPreferenceCycles(
  comparisons: { itemAId: string; itemBId: string; preferredId?: string }[]
): { hasCycle: boolean; cyclePath?: string[] } {
  // Directed graph: u -> v means u is preferred over v (u > v)
  const adj = new Map<string, Set<string>>();

  comparisons.forEach((comp) => {
    if (!comp.preferredId) return;
    const winner = comp.preferredId;
    const loser = comp.preferredId === comp.itemAId ? comp.itemBId : comp.itemAId;

    if (!adj.has(winner)) adj.set(winner, new Set());
    adj.get(winner)!.add(loser);
  });

  const visited = new Map<string, number>(); // 0: unvisited, 1: visiting, 2: visited
  const parent = new Map<string, string>();
  let cycleNodes: string[] | undefined;

  function dfs(node: string): boolean {
    visited.set(node, 1);
    const neighbors = adj.get(node) || new Set();

    for (const neighbor of neighbors) {
      if (visited.get(neighbor) === 1) {
        // Cycle detected
        const path = [neighbor, node];
        let curr = node;
        while (parent.has(curr) && parent.get(curr) !== neighbor) {
          curr = parent.get(curr)!;
          path.push(curr);
        }
        cycleNodes = path.reverse();
        return true;
      }
      if (!visited.has(neighbor) || visited.get(neighbor) === 0) {
        parent.set(neighbor, node);
        if (dfs(neighbor)) return true;
      }
    }

    visited.set(node, 2);
    return false;
  }

  for (const node of adj.keys()) {
    if (!visited.has(node) || visited.get(node) === 0) {
      if (dfs(node)) {
        return { hasCycle: true, cyclePath: cycleNodes };
      }
    }
  }

  return { hasCycle: false };
}

/**
 * Compute Elo / Bradley-Terry Utility Scores from Pairwise Comparisons
 */
export function computeUtilityScores(
  itemIds: string[],
  comparisons: { itemAId: string; itemBId: string; preferredId?: string }[]
): Map<string, number> {
  const scores = new Map<string, number>();
  itemIds.forEach((id) => scores.set(id, 1000));

  comparisons.forEach((comp) => {
    if (!comp.preferredId) return;
    const isA = comp.preferredId === comp.itemAId;
    const winner = isA ? comp.itemAId : comp.itemBId;
    const loser = isA ? comp.itemBId : comp.itemAId;

    const rW = scores.get(winner) || 1000;
    const rL = scores.get(loser) || 1000;

    const expectedW = 1.0 / (1.0 + Math.pow(10, (rL - rW) / 400));
    const k = 32;
    scores.set(winner, rW + k * (1.0 - expectedW));
    scores.set(loser, rL - k * (1.0 - expectedW));
  });

  return scores;
}

/**
 * Float vs Freeze vs Slide Advisor Engine
 */
export function evaluateFloatFreezeDecision(
  choices: ChoiceItem[],
  currentChoiceIndex: number,
  currentRound: number
): FloatFreezeDecision {
  const currentChoice = choices[currentChoiceIndex];
  const higherChoices = choices.slice(0, currentChoiceIndex);

  // In JoSAA serial dictatorship:
  // Utility of choice index i is strictly decreasing with preference rank (1 = highest utility)
  const totalChoices = choices.length;
  const getUtility = (idx: number) => totalChoices - idx;

  const currentUtility = getUtility(currentChoiceIndex);

  // Remaining rounds (up to round 6)
  const remainingRounds = Math.max(1, 6 - currentRound);
  const roundLooseningFactor = 0.08 * remainingRounds;

  let sumUpgradeProb = 0;
  let euFloatUpgradePart = 0;

  const upgradeProbabilities = higherChoices.map((choice, idx) => {
    // Probability of upgrading across subsequent rounds is higher if cutoff loosens
    const baseP = choice.prediction.probability;
    const pUpgrade = Math.min(0.95, baseP * (1.0 + roundLooseningFactor));
    const relativeUtility = getUtility(idx);

    sumUpgradeProb += pUpgrade;
    euFloatUpgradePart += pUpgrade * relativeUtility;

    return {
      choice,
      pUpgrade,
      relativeUtility,
    };
  });

  const pAnyUpgrade = Math.min(0.98, 1.0 - higherChoices.reduce((acc, c, idx) => {
    const pUp = upgradeProbabilities[idx].pUpgrade;
    return acc * (1.0 - pUp);
  }, 1.0));

  // EU(float) = sum over j < current [ P(upgrade to j) * U(j) ] + (1 - P(any upgrade)) * U(current)
  const euFloat = euFloatUpgradePart + (1.0 - pAnyUpgrade) * currentUtility;
  const euFreeze = currentUtility;

  // Check if any higher choice is within the SAME institute (for Slide eligibility)
  const hasSameInstHigherChoice = higherChoices.some(
    (c) => c.prediction.institute.id === currentChoice.prediction.institute.id
  );

  let recommendation: 'FLOAT' | 'FREEZE' | 'SLIDE' = 'FLOAT';
  let rationale = '';

  if (euFloat >= euFreeze) {
    if (hasSameInstHigherChoice && higherChoices.every((c) => c.prediction.institute.id === currentChoice.prediction.institute.id)) {
      recommendation = 'SLIDE';
      rationale = `All your higher preferences are inside ${currentChoice.prediction.institute.shortName}. Opting for SLIDE restricts your upgrade solely within this campus.`;
    } else {
      recommendation = 'FLOAT';
      rationale = `Mathematical Weak Dominance: Under JoSAA rules, floating can NEVER cause you to forfeit your current seat at ${currentChoice.prediction.institute.shortName} (${currentChoice.prediction.program.branchName}). You have an estimated ${(pAnyUpgrade * 100).toFixed(1)}% cumulative chance to upgrade to higher preferences in remaining rounds. EU(Float) = ${euFloat.toFixed(1)} vs EU(Freeze) = ${euFreeze.toFixed(1)}.`;
    }
  } else {
    recommendation = 'FREEZE';
    rationale = `You have reached your absolute top preference or are fully content with this exact branch and campus, wishing to conclude the counselling process immediately.`;
  }

  const constraintsAndChecklist = [
    'Seat Acceptance Fee (SAF): Must be paid in Round 1 (₹35,000 for GEN/OBC, ₹17,500 for SC/ST/PwD). Failure to pay cancels your seat entirely!',
    'Online Document Verification: Upload Class 10/12 marksheets, Category certificate (issued on/after April 1 of current year), Medical Certificate (Annexure 7). Respond to queries within the round deadline.',
    'Floating is 100% Retentive: Your allotted seat is guaranteed unless you are allocated a higher-listed choice in a future round.',
    'Dual Allotment Rule: Once allocated a higher preference in Round 2-6, your previous seat is automatically vacated and offered to another candidate. You cannot revert to an older seat.',
    'CSAB Transition: JoSAA round 6 seats can be retained while participating in CSAB Special Rounds with a separate registration fee, subject to withdrawal deadlines.',
  ];

  return {
    currentChoice,
    currentRound,
    higherChoices,
    pAnyUpgrade,
    upgradeProbabilities,
    euFloat,
    euFreeze,
    recommendation,
    rationale,
    constraintsAndChecklist,
  };
}
