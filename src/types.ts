export type ExamType = 'JEE_ADVANCED' | 'JEE_MAIN';

export type InstituteType = 'IIT' | 'NIT' | 'IIIT' | 'GFTI';

export type SeatCategory = 
  | 'OPEN' 
  | 'OPEN-PwD' 
  | 'EWS' 
  | 'EWS-PwD' 
  | 'OBC-NCL' 
  | 'OBC-NCL-PwD' 
  | 'SC' 
  | 'SC-PwD' 
  | 'ST' 
  | 'ST-PwD';

export type GenderPool = 'Gender-Neutral' | 'Female-only';

export type QuotaType = 'AI' | 'HS' | 'OS' | 'GO' | 'JK' | 'LA';

export type AdmissionBucket = 'Safe' | 'Likely' | 'Target' | 'Reach' | 'Out of range';

export interface Institute {
  id: string;
  name: string;
  shortName: string;
  type: InstituteType;
  state: string;
  city: string;
  establishedYear: number;
  tier: 1 | 2 | 3;
}

export interface Program {
  id: string;
  instituteId: string;
  branchName: string;
  branchCode: string;
  degree: string;
  durationYears: number;
  isNew?: boolean; // Established vs newly opened program
}

export interface SeatPool {
  id: string;
  programId: string;
  instituteId: string;
  quota: QuotaType;
  category: SeatCategory;
  genderPool: GenderPool;
  examType: ExamType;
}

export interface CutoffRecord {
  id: string;
  seatPoolId: string;
  year: number;
  round: number; // 1 to 6
  openingRank: number;
  closingRank: number;
  examType: ExamType;
}

export interface SeatMatrixRecord {
  id: string;
  seatPoolId: string;
  year: number;
  seatCount: number;
}

export interface QualifiedPoolSize {
  exam: ExamType;
  category: SeatCategory;
  year: number;
  count: number;
}

export interface PoolFitResult {
  beta: [number, number]; // [beta0, beta1]
  sigma2: number;
  dof: number;
  XtWX_inv: [[number, number], [number, number]];
  n: number;
  years: number[];
  closingRanks: number[];
  normalisedY: number[];
  weights: number[];
  shrunk: boolean;
  shrinkWeight?: number;
  parentSlope?: number;
  targetSeats: number;
  historicalSeats: number[];
}

export interface PredictionResult {
  seatPool: SeatPool;
  institute: Institute;
  program: Program;
  probability: number;
  bucket: AdmissionBucket;
  predictedClosingRank: number;
  interval80: [number, number];
  dataPoints: number;
  dof: number;
  sigmaPred: number;
  yStudent: number;
  yHat: number;
  zScore: number;
  shrunk: boolean;
  round: number;
  lastYearClosingRank: number;
  historicalCutoffs: {
    year: number;
    closingRank: number;
    seats: number;
    round: number;
  }[];
}

export interface StudentProfile {
  examType: ExamType;
  rank: number;
  category: SeatCategory;
  genderPool: GenderPool;
  homeState: string;
  targetRound: 1 | 6; // 1 = Round 1, 6 = Final Round
}

export interface ChoiceItem {
  id: string;
  seatPoolId: string;
  prediction: PredictionResult;
  preferenceRank: number;
  notes?: string;
}

export interface ChoiceListAnalysis {
  choices: ChoiceItem[];
  pNoAllocation: number;
  safeCount: number;
  likelyCount: number;
  targetCount: number;
  reachCount: number;
  outOfRangeCount: number;
  isTopHeavy: boolean;
  topHeavyWarning?: string;
  recommendedSafeAdditions: number;
  outcomeDistribution: {
    choiceId: string;
    preferenceRank: number;
    instituteName: string;
    branchName: string;
    pAdmit: number;
    pAllocated: number;
    cumulativeAllocationProb: number;
  }[];
}

export interface PairwiseComparison {
  id: string;
  itemA: PredictionResult;
  itemB: PredictionResult;
  preferredId?: string; // id of A or B
  reason?: string;
}

export interface FloatFreezeDecision {
  currentChoice: ChoiceItem;
  currentRound: number;
  higherChoices: ChoiceItem[];
  pAnyUpgrade: number;
  upgradeProbabilities: {
    choice: ChoiceItem;
    pUpgrade: number;
    relativeUtility: number;
  }[];
  euFloat: number;
  euFreeze: number;
  recommendation: 'FLOAT' | 'FREEZE' | 'SLIDE';
  rationale: string;
  constraintsAndChecklist: string[];
}

// Backtest & Calibration Types
export interface DecileBin {
  decile: number; // 1 to 10 (e.g. 0.0-0.1, ..., 0.9-1.0)
  predictedProbMin: number;
  predictedProbMax: number;
  count: number;
  meanPredictedProb: number;
  observedFrequency: number;
  actualAdmits: number;
}

export interface BacktestMetricSummary {
  totalTestCases: number;
  brierScore: number;
  naiveBrierScore: number;
  brierSkillScore: number; // (1 - brier / naive) * 100
  interval80Coverage: number; // Target: 0.75 - 0.85
  safeBucketRealization: number; // Target: >= 0.85
  likelyBucketRealization: number;
  targetBucketRealization: number;
  reachBucketRealization: number;
  reliabilityBins: DecileBin[];
}

export interface SegmentedBacktest {
  categoryBreakdown: Record<SeatCategory, { count: number; brier: number; coverage80: number; safeAccuracy: number }>;
  rankBandBreakdown: Record<string, { count: number; brier: number; coverage80: number }>;
  instituteTypeBreakdown: Record<InstituteType, { count: number; brier: number; coverage80: number }>;
  programMaturityBreakdown: Record<'Established' | 'Newer', { count: number; brier: number; coverage80: number }>;
}

export interface FullBacktestReport {
  evaluatedYears: number[];
  summary: BacktestMetricSummary;
  segmentation: SegmentedBacktest;
  shipCriteriaPassed: {
    coverageInRange: boolean; // 0.75 <= cov <= 0.85
    beatsNaiveBrier: boolean;
    safeBucketPass: boolean; // >= 0.85
    publicReliabilityPublished: boolean;
  };
}
