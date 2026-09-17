import {
  AdmissionBucket,
  CutoffRecord,
  ExamType,
  PoolFitResult,
  PredictionResult,
  SeatMatrixRecord,
  SeatPool,
  StudentProfile,
} from '../types';
import {
  invert2x2,
  quadForm2,
  studentT_CDF,
  studentT_PPF,
} from '../utils/statistics';
import {
  CANONICAL_POOLS_DATA,
  findSeatPoolData,
  getInstitute,
  getProgram,
  getQualifiedCount,
  SeatPoolData,
} from '../data/josaaDataset';

export const LAMBDA = 0.7; // recency decay factor
export const SHRINK_K = 3.0; // shrinkage strength

/**
 * Fit a weighted linear regression model on log-normalised, seat-adjusted historical cutoffs.
 */
export function fitPool(
  years: number[],
  closingRanks: number[],
  qualifiedCounts: number[],
  seats: number[],
  targetSeats: number,
  parentSlope?: number
): PoolFitResult {
  const n = years.length;
  if (n === 0) {
    throw new Error('Cannot fit pool with 0 data points');
  }

  // 1. Normalise, log-transform, seat-matrix adjust
  const y: number[] = [];
  for (let i = 0; i < n; i++) {
    const normalisedRank = closingRanks[i] / qualifiedCounts[i];
    const rawY = Math.log(Math.max(normalisedRank, 1e-6));
    const seatAdjustment = Math.log(Math.max(targetSeats / seats[i], 0.01));
    y.push(rawY + seatAdjustment);
  }

  // Single data point fallback
  if (n === 1) {
    const defaultSlope = parentSlope !== undefined ? parentSlope : 0.0;
    return {
      beta: [y[0], defaultSlope],
      sigma2: 0.04,
      dof: 1,
      XtWX_inv: [[1, 0], [0, 1]],
      n: 1,
      years,
      closingRanks,
      normalisedY: y,
      weights: [1],
      shrunk: true,
      shrinkWeight: 0.25,
      parentSlope: defaultSlope,
      targetSeats,
      historicalSeats: seats,
    };
  }

  // Center on the most recent year: t = years - max(years)
  const maxYear = Math.max(...years);
  const t = years.map((yr) => yr - maxYear);

  // Recency weights: w_t = lambda^(-t)
  const w = t.map((val) => Math.pow(LAMBDA, -val));

  // Compute X^T W X (2x2)
  let sumW = 0;
  let sumWT = 0;
  let sumWT2 = 0;
  let sumWY = 0;
  let sumWTY = 0;

  for (let i = 0; i < n; i++) {
    const wi = w[i];
    const ti = t[i];
    const yi = y[i];

    sumW += wi;
    sumWT += wi * ti;
    sumWT2 += wi * ti * ti;
    sumWY += wi * yi;
    sumWTY += wi * ti * yi;
  }

  const XtWX: [[number, number], [number, number]] = [
    [sumW, sumWT],
    [sumWT, sumWT2],
  ];

  const XtWX_inv = invert2x2(XtWX);

  // beta = (XtWX)^-1 * (X^T W y)
  const beta0 = XtWX_inv[0][0] * sumWY + XtWX_inv[0][1] * sumWTY;
  let beta1 = XtWX_inv[1][0] * sumWY + XtWX_inv[1][1] * sumWTY;

  let shrunk = false;
  let shrinkW = 1.0;

  // Shrink the slope toward parent group when data is thin (n <= 3 or explicit request)
  if (parentSlope !== undefined && (n <= 3 || isNaN(beta1))) {
    shrunk = true;
    shrinkW = n / (n + SHRINK_K);
    beta1 = shrinkW * beta1 + (1 - shrinkW) * parentSlope;
  }

  // Residual variance: sum(w * resid^2) / sum(w) * (n / dof)
  let weightedResidSum = 0;
  for (let i = 0; i < n; i++) {
    const yHat_i = beta0 + beta1 * t[i];
    const resid = y[i] - yHat_i;
    weightedResidSum += w[i] * resid * resid;
  }

  const dof = Math.max(n - 2, 1);
  let sigma2 = (weightedResidSum / Math.max(sumW, 1e-6)) * (n / dof);
  // Guarantee a reasonable noise floor
  sigma2 = Math.max(sigma2, 0.0008);

  return {
    beta: [beta0, beta1],
    sigma2,
    dof,
    XtWX_inv,
    n,
    years,
    closingRanks,
    normalisedY: y,
    weights: w,
    shrunk,
    shrinkWeight: shrunk ? shrinkW : undefined,
    parentSlope,
    targetSeats,
    historicalSeats: seats,
  };
}

/**
 * Predict admission probability and 80% prediction interval for target year
 */
export function predictProbability(
  fit: PoolFitResult,
  studentRank: number,
  qualifiedCountTarget: number,
  horizon = 1
): {
  probability: number;
  predictedClosingRank: number;
  interval80: [number, number];
  sigmaPred: number;
  yStudent: number;
  yHat: number;
  zScore: number;
} {
  const x0: [number, number] = [1.0, horizon];

  // Point prediction in log-normalised space
  const yHat = fit.beta[0] * x0[0] + fit.beta[1] * x0[1];

  // Variance accounting for parameter uncertainty and residual variance
  const leverage = quadForm2(x0, fit.XtWX_inv);
  let varPred = fit.sigma2 * (1.0 + Math.max(0, leverage));

  // If estimate was shrunk, widen predictive standard deviation proportionally
  if (fit.shrunk && fit.shrinkWeight !== undefined) {
    const penalty = 1.0 + 0.3 * (1.0 - fit.shrinkWeight);
    varPred *= penalty * penalty;
  }

  const sigmaPred = Math.sqrt(Math.max(varPred, 1e-8));

  // Student's transformed rank
  const yStudent = Math.log(Math.max(studentRank / qualifiedCountTarget, 1e-6));

  // Standardized z score relative to Student-t distribution
  const z = (yStudent - yHat) / sigmaPred;

  // P(admit) = P(Y_closing >= y_student) = 1 - CDF_t(z)
  const pAdmitRaw = 1.0 - studentT_CDF(z, fit.dof);
  const probability = Math.max(0.0, Math.min(1.0, pAdmitRaw));

  // 80% prediction interval (10th percentile to 90th percentile, t_crit at 0.90)
  const tCrit = studentT_PPF(0.90, fit.dof);
  const loRank = Math.max(1, Math.round(Math.exp(yHat - tCrit * sigmaPred) * qualifiedCountTarget));
  const hiRank = Math.max(1, Math.round(Math.exp(yHat + tCrit * sigmaPred) * qualifiedCountTarget));

  const predictedClosingRank = Math.max(1, Math.round(Math.exp(yHat) * qualifiedCountTarget));

  return {
    probability,
    predictedClosingRank,
    interval80: [loRank, hiRank],
    sigmaPred,
    yStudent,
    yHat,
    zScore: z,
  };
}

export function bucket(p: number): AdmissionBucket {
  if (p >= 0.85) return 'Safe';
  if (p >= 0.6) return 'Likely';
  if (p >= 0.3) return 'Target';
  if (p >= 0.1) return 'Reach';
  return 'Out of range';
}

/**
 * Compute Parent Slope for hierarchical shrinkage
 * Hierarchy:
 * 1. Same institute + same branch, all categories
 * 2. Same institute, all branches
 */
export function computeParentSlope(
  poolData: SeatPoolData,
  allPools: SeatPoolData[],
  round: number
): number {
  // Try Level 1: same institute + same branch, across other categories
  const sameInstBranch = allPools.filter(
    (p) =>
      p.pool.instituteId === poolData.pool.instituteId &&
      p.pool.programId === poolData.pool.programId &&
      p.pool.id !== poolData.pool.id
  );

  const slopes: number[] = [];

  for (const sibling of sameInstBranch) {
    const cutoffs = sibling.cutoffs.filter((c) => c.round === round).sort((a, b) => a.year - b.year);
    if (cutoffs.length >= 3) {
      const years = cutoffs.map((c) => c.year);
      const cr = cutoffs.map((c) => c.closingRank);
      const qc = years.map((y) => getQualifiedCount(sibling.pool.examType, sibling.pool.category, y));
      const seats = sibling.seatMatrix.map((s) => s.seatCount);
      const fit = fitPool(years, cr, qc, seats, sibling.targetSeats);
      slopes.push(fit.beta[1]);
    }
  }

  if (slopes.length > 0) {
    return slopes.reduce((a, b) => a + b, 0) / slopes.length;
  }

  // Level 2: same institute, across any branch
  const sameInst = allPools.filter(
    (p) => p.pool.instituteId === poolData.pool.instituteId && p.pool.id !== poolData.pool.id
  );

  for (const sibling of sameInst) {
    const cutoffs = sibling.cutoffs.filter((c) => c.round === round).sort((a, b) => a.year - b.year);
    if (cutoffs.length >= 4) {
      const years = cutoffs.map((c) => c.year);
      const cr = cutoffs.map((c) => c.closingRank);
      const qc = years.map((y) => getQualifiedCount(sibling.pool.examType, sibling.pool.category, y));
      const seats = sibling.seatMatrix.map((s) => s.seatCount);
      const fit = fitPool(years, cr, qc, seats, sibling.targetSeats);
      slopes.push(fit.beta[1]);
    }
  }

  if (slopes.length > 0) {
    return slopes.reduce((a, b) => a + b, 0) / slopes.length;
  }

  return 0.01; // Neutral slight loosening drift default
}

/**
 * Full Pipeline: Evaluate a seat pool for a given student profile
 */
export function evaluateSeatPoolForStudent(
  poolData: SeatPoolData,
  profile: StudentProfile,
  round: number,
  targetYear = 2025,
  allPools: SeatPoolData[] = CANONICAL_POOLS_DATA
): PredictionResult | null {
  const { pool, cutoffs, seatMatrix, targetSeats } = poolData;

  // Filter cutoffs for the desired round
  const roundCutoffs = cutoffs.filter((c) => c.round === round).sort((a, b) => a.year - b.year);
  if (roundCutoffs.length === 0) return null;

  const years = roundCutoffs.map((c) => c.year);
  const cr = roundCutoffs.map((c) => c.closingRank);
  const qc = years.map((yr) => getQualifiedCount(pool.examType, pool.category, yr));
  const seats = roundCutoffs.map((c) => {
    const sm = seatMatrix.find((s) => s.year === c.year);
    return sm ? sm.seatCount : targetSeats;
  });

  // Calculate parent slope for shrinkage if data points <= 3
  const parentSlope = years.length <= 3 ? computeParentSlope(poolData, allPools, round) : undefined;

  const fit = fitPool(years, cr, qc, seats, targetSeats, parentSlope);

  // Projected target year qualified count
  const targetQC = getQualifiedCount(pool.examType, pool.category, targetYear);
  const pred = predictProbability(fit, profile.rank, targetQC, 1);

  const institute = getInstitute(pool.instituteId);
  const program = getProgram(pool.programId);
  const lastYearCr = cr[cr.length - 1];

  return {
    seatPool: pool,
    institute,
    program,
    probability: pred.probability,
    bucket: bucket(pred.probability),
    predictedClosingRank: pred.predictedClosingRank,
    interval80: pred.interval80,
    dataPoints: fit.n,
    dof: fit.dof,
    sigmaPred: pred.sigmaPred,
    yStudent: pred.yStudent,
    yHat: pred.yHat,
    zScore: pred.zScore,
    shrunk: fit.shrunk,
    round,
    lastYearClosingRank: lastYearCr,
    historicalCutoffs: roundCutoffs.map((rc, idx) => ({
      year: rc.year,
      closingRank: rc.closingRank,
      seats: seats[idx],
      round: rc.round,
    })),
  };
}
