/**
 * Pure TypeScript numerical statistics library
 * Implements Student's t-distribution CDF, inverse CDF (PPF),
 * regularized incomplete beta function, log-gamma,
 * and weighted least squares matrix solver.
 */

// Log-Gamma function via Lanczos approximation (g=7, n=9)
export function logGamma(x: number): number {
  if (x <= 0) return 0;
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.138571095836524,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  const g = 7;
  if (x < 0.5) {
    // Reflection formula
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = p[0];
  const t = x + g + 0.5;
  for (let i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// Continued fraction evaluation for regularized incomplete beta function I_x(a, b)
function betacf(a: number, b: number, x: number): number {
  const MAXIT = 150;
  const EPS = 3.0e-12;
  const FPMIN = 1.0e-30;

  const qab = a + b;
  const qap = a + 1.0;
  const qam = a - 1.0;
  let c = 1.0;
  let d = 1.0 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1.0 / d;
  let h = d;

  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) <= EPS) break;
  }
  return h;
}

// Regularized Incomplete Beta Function I_x(a, b)
export function incBeta(x: number, a: number, b: number): number {
  if (x <= 0.0) return 0.0;
  if (x >= 1.0) return 1.0;

  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1.0 - x));

  if (x < (a + 1.0) / (a + b + 2.0)) {
    return (bt * betacf(a, b, x)) / a;
  } else {
    return 1.0 - (bt * betacf(b, a, 1.0 - x)) / b;
  }
}

// Student's t-distribution Cumulative Distribution Function (CDF)
export function studentT_CDF(t: number, dof: number): number {
  if (isNaN(t) || isNaN(dof) || dof <= 0) return 0.5;
  if (t === 0) return 0.5;

  const x = dof / (dof + t * t);
  const ib = incBeta(x, dof / 2, 0.5);

  if (t > 0) {
    return 1.0 - 0.5 * ib;
  } else {
    return 0.5 * ib;
  }
}

// Student's t-distribution Probability Density Function (PDF)
export function studentT_PDF(t: number, dof: number): number {
  const coeff = Math.exp(logGamma((dof + 1) / 2) - logGamma(dof / 2)) / Math.sqrt(Math.PI * dof);
  return coeff * Math.pow(1 + (t * t) / dof, -(dof + 1) / 2);
}

// Rational approximation for standard normal inverse CDF
function normalPPF(p: number): number {
  if (p <= 0) return -8.0;
  if (p >= 1) return 8.0;
  if (p === 0.5) return 0;

  // Abramowitz and Stegun approximation
  const q = p < 0.5 ? p : 1.0 - p;
  const t = Math.sqrt(-2.0 * Math.log(q));
  const c0 = 2.515517;
  const c1 = 0.802853;
  const c2 = 0.010328;
  const d1 = 1.432788;
  const d2 = 0.189269;
  const d3 = 0.001308;
  let xp = t - (c0 + c1 * t + c2 * t * t) / (1.0 + d1 * t + d2 * t * t + d3 * t * t * t);
  return p < 0.5 ? -xp : xp;
}

// Student's t Percent Point Function (Inverse CDF / Quantile)
// Hill's expansion + Newton-Raphson root finding for exact precision
export function studentT_PPF(p: number, dof: number): number {
  if (p <= 0) return -100;
  if (p >= 1) return 100;
  if (p === 0.5) return 0;

  // Initial estimate via Hill's approximation using normal quantile
  const z = normalPPF(p);
  let t = z;

  if (dof < 100) {
    const z2 = z * z;
    t = z + (z * (z2 + 1)) / (4 * dof) + (z * (5 * z2 * z2 + 16 * z2 + 3)) / (96 * dof * dof);
  }

  // Refine using Newton-Raphson
  for (let iter = 0; iter < 12; iter++) {
    const cdfVal = studentT_CDF(t, dof);
    const pdfVal = studentT_PDF(t, dof);
    if (pdfVal <= 1e-12) break;
    const diff = cdfVal - p;
    if (Math.abs(diff) < 1e-8) break;
    t = t - diff / pdfVal;
  }

  return t;
}

/**
 * 2x2 Matrix Inversion
 * [ a  b ]^-1 = 1/(ad - bc) * [  d  -b ]
 * [ c  d ]                   [ -c   a ]
 */
export function invert2x2(m: [[number, number], [number, number]]): [[number, number], [number, number]] {
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  if (Math.abs(det) < 1e-12) {
    // Fallback regularized pseudo-inverse
    return [
      [1 / (m[0][0] + 1e-6), 0],
      [0, 1 / (m[1][1] + 1e-6)],
    ];
  }
  const invDet = 1 / det;
  return [
    [m[1][1] * invDet, -m[0][1] * invDet],
    [-m[1][0] * invDet, m[0][0] * invDet],
  ];
}

/**
 * Matrix multiplication of 2x2 with 2x1 vector
 */
export function matVecMul2(m: [[number, number], [number, number]], v: [number, number]): [number, number] {
  return [m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1]];
}

/**
 * Quadratic form: v^T * M * v for 2x1 vector and 2x2 matrix
 */
export function quadForm2(v: [number, number], m: [[number, number], [number, number]]): number {
  const mv = matVecMul2(m, v);
  return v[0] * mv[0] + v[1] * mv[1];
}
