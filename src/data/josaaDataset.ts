import {
  CutoffRecord,
  ExamType,
  Institute,
  Program,
  QualifiedPoolSize,
  SeatCategory,
  SeatMatrixRecord,
  SeatPool,
} from '../types';

export const INSTITUTES: Institute[] = [
  { id: 'iit-b', name: 'Indian Institute of Technology Bombay', shortName: 'IIT Bombay', type: 'IIT', state: 'Maharashtra', city: 'Mumbai', establishedYear: 1958, tier: 1 },
  { id: 'iit-d', name: 'Indian Institute of Technology Delhi', shortName: 'IIT Delhi', type: 'IIT', state: 'Delhi', city: 'New Delhi', establishedYear: 1961, tier: 1 },
  { id: 'iit-m', name: 'Indian Institute of Technology Madras', shortName: 'IIT Madras', type: 'IIT', state: 'Tamil Nadu', city: 'Chennai', establishedYear: 1959, tier: 1 },
  { id: 'iit-k', name: 'Indian Institute of Technology Kanpur', shortName: 'IIT Kanpur', type: 'IIT', state: 'Uttar Pradesh', city: 'Kanpur', establishedYear: 1959, tier: 1 },
  { id: 'iit-kgp', name: 'Indian Institute of Technology Kharagpur', shortName: 'IIT Kharagpur', type: 'IIT', state: 'West Bengal', city: 'Kharagpur', establishedYear: 1951, tier: 1 },
  { id: 'iit-r', name: 'Indian Institute of Technology Roorkee', shortName: 'IIT Roorkee', type: 'IIT', state: 'Uttarakhand', city: 'Roorkee', establishedYear: 1847, tier: 1 },
  { id: 'iit-g', name: 'Indian Institute of Technology Guwahati', shortName: 'IIT Guwahati', type: 'IIT', state: 'Assam', city: 'Guwahati', establishedYear: 1994, tier: 1 },
  { id: 'iit-h', name: 'Indian Institute of Technology Hyderabad', shortName: 'IIT Hyderabad', type: 'IIT', state: 'Telangana', city: 'Hyderabad', establishedYear: 2008, tier: 1 },
  { id: 'iit-bhu', name: 'Indian Institute of Technology (BHU) Varanasi', shortName: 'IIT BHU', type: 'IIT', state: 'Uttar Pradesh', city: 'Varanasi', establishedYear: 1919, tier: 2 },
  { id: 'iit-ind', name: 'Indian Institute of Technology Indore', shortName: 'IIT Indore', type: 'IIT', state: 'Madhya Pradesh', city: 'Indore', establishedYear: 2009, tier: 2 },
  // NITs
  { id: 'nit-trichy', name: 'National Institute of Technology Tiruchirappalli', shortName: 'NIT Trichy', type: 'NIT', state: 'Tamil Nadu', city: 'Tiruchirappalli', establishedYear: 1964, tier: 1 },
  { id: 'nit-surathkal', name: 'National Institute of Technology Karnataka Surathkal', shortName: 'NIT Surathkal', type: 'NIT', state: 'Karnataka', city: 'Surathkal', establishedYear: 1960, tier: 1 },
  { id: 'nit-warangal', name: 'National Institute of Technology Warangal', shortName: 'NIT Warangal', type: 'NIT', state: 'Telangana', city: 'Warangal', establishedYear: 1959, tier: 1 },
  { id: 'nit-rourkela', name: 'National Institute of Technology Rourkela', shortName: 'NIT Rourkela', type: 'NIT', state: 'Odisha', city: 'Rourkela', establishedYear: 1961, tier: 1 },
  { id: 'nit-calicut', name: 'National Institute of Technology Calicut', shortName: 'NIT Calicut', type: 'NIT', state: 'Kerala', city: 'Kozhikode', establishedYear: 1961, tier: 2 },
  // IIITs
  { id: 'iiit-allahabad', name: 'Indian Institute of Information Technology Allahabad', shortName: 'IIIT Allahabad', type: 'IIIT', state: 'Uttar Pradesh', city: 'Prayagraj', establishedYear: 1999, tier: 1 },
  { id: 'iiit-delhi', name: 'Indraprastha Institute of Information Technology Delhi', shortName: 'IIIT Delhi', type: 'IIIT', state: 'Delhi', city: 'New Delhi', establishedYear: 2008, tier: 1 },
];

export const PROGRAMS: Program[] = [
  // IIT Bombay
  { id: 'p-iitb-cse', instituteId: 'iit-b', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitb-ee', instituteId: 'iit-b', branchName: 'Electrical Engineering', branchCode: 'EE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitb-me', instituteId: 'iit-b', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitb-ce', instituteId: 'iit-b', branchName: 'Civil Engineering', branchCode: 'CE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitb-che', instituteId: 'iit-b', branchName: 'Chemical Engineering', branchCode: 'CHE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitb-aero', instituteId: 'iit-b', branchName: 'Aerospace Engineering', branchCode: 'AERO', degree: 'B.Tech', durationYears: 4 },

  // IIT Delhi
  { id: 'p-iitd-cse', instituteId: 'iit-d', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitd-mnc', instituteId: 'iit-d', branchName: 'Mathematics and Computing', branchCode: 'MNC', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitd-ee', instituteId: 'iit-d', branchName: 'Electrical Engineering', branchCode: 'EE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitd-me', instituteId: 'iit-d', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitd-ai', instituteId: 'iit-d', branchName: 'Artificial Intelligence and Data Engineering', branchCode: 'AI', degree: 'B.Tech', durationYears: 4, isNew: true },

  // IIT Madras
  { id: 'p-iitm-cse', instituteId: 'iit-m', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitm-ee', instituteId: 'iit-m', branchName: 'Electrical Engineering', branchCode: 'EE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitm-me', instituteId: 'iit-m', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitm-aero', instituteId: 'iit-m', branchName: 'Aerospace Engineering', branchCode: 'AERO', degree: 'B.Tech', durationYears: 4 },

  // IIT Kanpur
  { id: 'p-iitk-cse', instituteId: 'iit-k', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitk-ee', instituteId: 'iit-k', branchName: 'Electrical Engineering', branchCode: 'EE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitk-me', instituteId: 'iit-k', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitk-stats', instituteId: 'iit-k', branchName: 'Statistics and Data Science', branchCode: 'SDS', degree: 'B.S.', durationYears: 4, isNew: true },

  // IIT Kharagpur
  { id: 'p-iitkgp-cse', instituteId: 'iit-kgp', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitkgp-ece', instituteId: 'iit-kgp', branchName: 'Electronics and Electrical Communication', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitkgp-me', instituteId: 'iit-kgp', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },

  // IIT Roorkee
  { id: 'p-iitr-cse', instituteId: 'iit-r', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitr-ds', instituteId: 'iit-r', branchName: 'Data Science and Artificial Intelligence', branchCode: 'DSAI', degree: 'B.Tech', durationYears: 4, isNew: true },
  { id: 'p-iitr-ece', instituteId: 'iit-r', branchName: 'Electronics and Communication Engineering', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },

  // IIT Guwahati
  { id: 'p-iitg-cse', instituteId: 'iit-g', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iitg-ds', instituteId: 'iit-g', branchName: 'Data Science and Artificial Intelligence', branchCode: 'DSAI', degree: 'B.Tech', durationYears: 4, isNew: true },
  { id: 'p-iitg-me', instituteId: 'iit-g', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },

  // IIT Hyderabad
  { id: 'p-iith-cse', instituteId: 'iit-h', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iith-ai', instituteId: 'iit-h', branchName: 'Artificial Intelligence', branchCode: 'AI', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iith-ee', instituteId: 'iit-h', branchName: 'Electrical Engineering', branchCode: 'EE', degree: 'B.Tech', durationYears: 4 },

  // NIT Trichy
  { id: 'p-nitt-cse', instituteId: 'nit-trichy', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitt-ece', instituteId: 'nit-trichy', branchName: 'Electronics and Communication Engineering', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitt-eee', instituteId: 'nit-trichy', branchName: 'Electrical and Electronics Engineering', branchCode: 'EEE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitt-me', instituteId: 'nit-trichy', branchName: 'Mechanical Engineering', branchCode: 'ME', degree: 'B.Tech', durationYears: 4 },

  // NIT Surathkal
  { id: 'p-nitk-cse', instituteId: 'nit-surathkal', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitk-ai', instituteId: 'nit-surathkal', branchName: 'Artificial Intelligence', branchCode: 'AI', degree: 'B.Tech', durationYears: 4, isNew: true },
  { id: 'p-nitk-it', instituteId: 'nit-surathkal', branchName: 'Information Technology', branchCode: 'IT', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitk-ece', instituteId: 'nit-surathkal', branchName: 'Electronics and Communication Engineering', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },

  // NIT Warangal
  { id: 'p-nitw-cse', instituteId: 'nit-warangal', branchName: 'Computer Science and Engineering', branchCode: 'CSE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitw-ece', instituteId: 'nit-warangal', branchName: 'Electronics and Communication Engineering', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-nitw-eee', instituteId: 'nit-warangal', branchName: 'Electrical and Electronics Engineering', branchCode: 'EEE', degree: 'B.Tech', durationYears: 4 },

  // IIIT Allahabad
  { id: 'p-iiita-it', instituteId: 'iiit-allahabad', branchName: 'Information Technology', branchCode: 'IT', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iiita-ece', instituteId: 'iiit-allahabad', branchName: 'Electronics and Communication Engineering', branchCode: 'ECE', degree: 'B.Tech', durationYears: 4 },
  { id: 'p-iiita-itbi', instituteId: 'iiit-allahabad', branchName: 'IT (Business Informatics)', branchCode: 'ITBI', degree: 'B.Tech', durationYears: 4 },
];

/**
 * Historical total qualified pool size per exam, category, and year.
 * Crucial for step 2.1: normalised_rank = raw_rank / total_qualified_candidates.
 */
export const QUALIFIED_POOL_SIZES: QualifiedPoolSize[] = [
  // JEE Advanced (IITs)
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2020, count: 21500 },
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2021, count: 22800 },
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2022, count: 23600 },
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2023, count: 24200 },
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2024, count: 25100 },
  { exam: 'JEE_ADVANCED', category: 'OPEN', year: 2025, count: 25800 }, // Projected

  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2020, count: 4600 },
  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2021, count: 4850 },
  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2022, count: 5100 },
  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2023, count: 5400 },
  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2024, count: 5650 },
  { exam: 'JEE_ADVANCED', category: 'EWS', year: 2025, count: 5800 },

  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2020, count: 8800 },
  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2021, count: 9100 },
  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2022, count: 9450 },
  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2023, count: 9800 },
  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2024, count: 10200 },
  { exam: 'JEE_ADVANCED', category: 'OBC-NCL', year: 2025, count: 10500 },

  { exam: 'JEE_ADVANCED', category: 'SC', year: 2020, count: 6200 },
  { exam: 'JEE_ADVANCED', category: 'SC', year: 2021, count: 6400 },
  { exam: 'JEE_ADVANCED', category: 'SC', year: 2022, count: 6700 },
  { exam: 'JEE_ADVANCED', category: 'SC', year: 2023, count: 6950 },
  { exam: 'JEE_ADVANCED', category: 'SC', year: 2024, count: 7200 },
  { exam: 'JEE_ADVANCED', category: 'SC', year: 2025, count: 7400 },

  { exam: 'JEE_ADVANCED', category: 'ST', year: 2020, count: 2800 },
  { exam: 'JEE_ADVANCED', category: 'ST', year: 2021, count: 2950 },
  { exam: 'JEE_ADVANCED', category: 'ST', year: 2022, count: 3100 },
  { exam: 'JEE_ADVANCED', category: 'ST', year: 2023, count: 3250 },
  { exam: 'JEE_ADVANCED', category: 'ST', year: 2024, count: 3400 },
  { exam: 'JEE_ADVANCED', category: 'ST', year: 2025, count: 3550 },

  // JEE Main (NITs, IIITs)
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2020, count: 105000 },
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2021, count: 108000 },
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2022, count: 112000 },
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2023, count: 118000 },
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2024, count: 125000 },
  { exam: 'JEE_MAIN', category: 'OPEN', year: 2025, count: 130000 },

  { exam: 'JEE_MAIN', category: 'EWS', year: 2020, count: 22000 },
  { exam: 'JEE_MAIN', category: 'EWS', year: 2021, count: 23500 },
  { exam: 'JEE_MAIN', category: 'EWS', year: 2022, count: 25000 },
  { exam: 'JEE_MAIN', category: 'EWS', year: 2023, count: 27000 },
  { exam: 'JEE_MAIN', category: 'EWS', year: 2024, count: 29000 },
  { exam: 'JEE_MAIN', category: 'EWS', year: 2025, count: 30500 },

  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2020, count: 68000 },
  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2021, count: 71000 },
  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2022, count: 74000 },
  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2023, count: 78000 },
  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2024, count: 83000 },
  { exam: 'JEE_MAIN', category: 'OBC-NCL', year: 2025, count: 86000 },

  { exam: 'JEE_MAIN', category: 'SC', year: 2020, count: 38000 },
  { exam: 'JEE_MAIN', category: 'SC', year: 2021, count: 39500 },
  { exam: 'JEE_MAIN', category: 'SC', year: 2022, count: 41000 },
  { exam: 'JEE_MAIN', category: 'SC', year: 2023, count: 43500 },
  { exam: 'JEE_MAIN', category: 'SC', year: 2024, count: 46000 },
  { exam: 'JEE_MAIN', category: 'SC', year: 2025, count: 48000 },

  { exam: 'JEE_MAIN', category: 'ST', year: 2020, count: 18000 },
  { exam: 'JEE_MAIN', category: 'ST', year: 2021, count: 19000 },
  { exam: 'JEE_MAIN', category: 'ST', year: 2022, count: 20000 },
  { exam: 'JEE_MAIN', category: 'ST', year: 2023, count: 21500 },
  { exam: 'JEE_MAIN', category: 'ST', year: 2024, count: 23000 },
  { exam: 'JEE_MAIN', category: 'ST', year: 2025, count: 24000 },
];

export function getQualifiedCount(exam: ExamType, category: SeatCategory, year: number): number {
  const normCat: SeatCategory = category.startsWith('OPEN')
    ? 'OPEN'
    : category.startsWith('EWS')
    ? 'EWS'
    : category.startsWith('OBC')
    ? 'OBC-NCL'
    : category.startsWith('SC')
    ? 'SC'
    : 'ST';

  const match = QUALIFIED_POOL_SIZES.find((q) => q.exam === exam && q.category === normCat && q.year === year);
  if (match) return match.count;
  // Extrapolation fallback
  return exam === 'JEE_ADVANCED' ? 25000 : 125000;
}

/**
 * Generate Historical Seat Pools and Cutoff Records
 */
export interface SeatPoolData {
  pool: SeatPool;
  cutoffs: CutoffRecord[];
  seatMatrix: SeatMatrixRecord[];
  targetSeats: number;
}

// Helper to construct realistic 5-year cutoffs and seats
function buildPoolData(
  id: string,
  programId: string,
  instituteId: string,
  quota: 'AI' | 'HS' | 'OS',
  category: SeatCategory,
  genderPool: 'Gender-Neutral' | 'Female-only',
  examType: ExamType,
  baseClosingRankR6: number,
  yearlyGrowthRatio: number, // e.g. 1.02, 0.98, etc.
  years: number[],
  baseSeats: number,
  seatExpansionYear?: number,
  seatExpansionDelta?: number
): SeatPoolData {
  const pool: SeatPool = {
    id,
    programId,
    instituteId,
    quota,
    category,
    genderPool,
    examType,
  };

  const cutoffs: CutoffRecord[] = [];
  const seatMatrix: SeatMatrixRecord[] = [];

  years.forEach((yr, idx) => {
    let seats = baseSeats;
    if (seatExpansionYear && yr >= seatExpansionYear && seatExpansionDelta) {
      seats += seatExpansionDelta;
    }
    seatMatrix.push({
      id: `sm-${id}-${yr}`,
      seatPoolId: id,
      year: yr,
      seatCount: seats,
    });

    // Compute closing rank for Round 6 with historical variation + seat effect
    const yearOffset = yr - 2020;
    const drift = Math.pow(yearlyGrowthRatio, yearOffset);
    // Slight noise to reflect genuine cutoff jitter
    const noise = 1.0 + Math.sin(yearOffset * 1.7 + id.length) * 0.035;
    const r6_cr = Math.max(1, Math.round(baseClosingRankR6 * drift * noise * (seats / baseSeats)));
    const r6_or = Math.max(1, Math.round(r6_cr * 0.55));

    cutoffs.push({
      id: `co-${id}-${yr}-r6`,
      seatPoolId: id,
      year: yr,
      round: 6,
      openingRank: r6_or,
      closingRank: r6_cr,
      examType,
    });

    // Round 1 closing rank is strictly tighter than Round 6 (JoSAA monotonic loosening)
    const r1_tightness = 0.88 - (idx % 2 === 0 ? 0.03 : 0.01);
    const r1_cr = Math.max(1, Math.round(r6_cr * r1_tightness));
    const r1_or = Math.max(1, Math.round(r1_cr * 0.5));

    cutoffs.push({
      id: `co-${id}-${yr}-r1`,
      seatPoolId: id,
      year: yr,
      round: 1,
      openingRank: r1_or,
      closingRank: r1_cr,
      examType,
    });
  });

  const latestSeats = seatMatrix[seatMatrix.length - 1].seatCount;
  return {
    pool,
    cutoffs,
    seatMatrix,
    targetSeats: latestSeats,
  };
}

// Generate our canonical catalog of seat pools
export function generateCanonicalSeatPools(): SeatPoolData[] {
  const result: SeatPoolData[] = [];
  const fullYears = [2020, 2021, 2022, 2023, 2024];

  // 1. IIT Bombay CSE (AI, OPEN, Gender-Neutral) - Benchmark
  result.push(buildPoolData('pool-iitb-cse-open-gn', 'p-iitb-cse', 'iit-b', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 63, 1.01, fullYears, 140, 2023, 15));
  // Female-only
  result.push(buildPoolData('pool-iitb-cse-open-fn', 'p-iitb-cse', 'iit-b', 'AI', 'OPEN', 'Female-only', 'JEE_ADVANCED', 280, 1.015, fullYears, 35));
  // OBC-NCL
  result.push(buildPoolData('pool-iitb-cse-obc-gn', 'p-iitb-cse', 'iit-b', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 48, 1.02, fullYears, 50));
  // EWS
  result.push(buildPoolData('pool-iitb-cse-ews-gn', 'p-iitb-cse', 'iit-b', 'AI', 'EWS', 'Gender-Neutral', 'JEE_ADVANCED', 18, 1.01, fullYears, 18));
  // SC
  result.push(buildPoolData('pool-iitb-cse-sc-gn', 'p-iitb-cse', 'iit-b', 'AI', 'SC', 'Gender-Neutral', 'JEE_ADVANCED', 25, 1.025, fullYears, 28));

  // 2. IIT Bombay EE
  result.push(buildPoolData('pool-iitb-ee-open-gn', 'p-iitb-ee', 'iit-b', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 425, 1.025, fullYears, 160));
  result.push(buildPoolData('pool-iitb-ee-obc-gn', 'p-iitb-ee', 'iit-b', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 240, 1.02, fullYears, 60));
  result.push(buildPoolData('pool-iitb-ee-sc-gn', 'p-iitb-ee', 'iit-b', 'AI', 'SC', 'Gender-Neutral', 'JEE_ADVANCED', 145, 1.03, fullYears, 35));

  // 3. IIT Bombay ME
  result.push(buildPoolData('pool-iitb-me-open-gn', 'p-iitb-me', 'iit-b', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 1650, 1.04, fullYears, 175));
  result.push(buildPoolData('pool-iitb-me-obc-gn', 'p-iitb-me', 'iit-b', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 780, 1.03, fullYears, 65));

  // 4. IIT Delhi CSE
  result.push(buildPoolData('pool-iitd-cse-open-gn', 'p-iitd-cse', 'iit-d', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 115, 1.01, fullYears, 120));
  result.push(buildPoolData('pool-iitd-cse-obc-gn', 'p-iitd-cse', 'iit-d', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 85, 1.015, fullYears, 45));
  result.push(buildPoolData('pool-iitd-cse-sc-gn', 'p-iitd-cse', 'iit-d', 'AI', 'SC', 'Gender-Neutral', 'JEE_ADVANCED', 45, 1.02, fullYears, 25));

  // 5. IIT Delhi AI (New program launched in 2022 - 3 years data! Tests shrinkage)
  result.push(buildPoolData('pool-iitd-ai-open-gn', 'p-iitd-ai', 'iit-d', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 340, 0.96, [2022, 2023, 2024], 40));
  result.push(buildPoolData('pool-iitd-ai-obc-gn', 'p-iitd-ai', 'iit-d', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 190, 0.95, [2022, 2023, 2024], 15));

  // 6. IIT Delhi MnC
  result.push(buildPoolData('pool-iitd-mnc-open-gn', 'p-iitd-mnc', 'iit-d', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 320, 1.02, fullYears, 80));

  // 7. IIT Madras CSE
  result.push(buildPoolData('pool-iitm-cse-open-gn', 'p-iitm-cse', 'iit-m', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 165, 1.015, fullYears, 90));
  result.push(buildPoolData('pool-iitm-cse-obc-gn', 'p-iitm-cse', 'iit-m', 'AI', 'OBC-NCL', 'Gender-Neutral', 'JEE_ADVANCED', 110, 1.02, fullYears, 35));

  // 8. IIT Kanpur CSE
  result.push(buildPoolData('pool-iitk-cse-open-gn', 'p-iitk-cse', 'iit-k', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 225, 1.015, fullYears, 110));
  // IIT Kanpur SDS (Statistics & Data Science, launched in 2023 - 2 years data! Demonstrates hierarchical shrinkage)
  result.push(buildPoolData('pool-iitk-stats-open-gn', 'p-iitk-stats', 'iit-k', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 1050, 0.97, [2023, 2024], 45));

  // 9. IIT Kharagpur CSE & ECE
  result.push(buildPoolData('pool-iitkgp-cse-open-gn', 'p-iitkgp-cse', 'iit-kgp', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 290, 1.02, fullYears, 115));
  result.push(buildPoolData('pool-iitkgp-ece-open-gn', 'p-iitkgp-ece', 'iit-kgp', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 920, 1.03, fullYears, 105));

  // 10. IIT Roorkee DSAI (Newer program)
  result.push(buildPoolData('pool-iitr-ds-open-gn', 'p-iitr-ds', 'iit-r', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 880, 0.98, [2022, 2023, 2024], 45));
  result.push(buildPoolData('pool-iitr-cse-open-gn', 'p-iitr-cse', 'iit-r', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 430, 1.02, fullYears, 110));

  // 11. IIT Guwahati CSE & ME
  result.push(buildPoolData('pool-iitg-cse-open-gn', 'p-iitg-cse', 'iit-g', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 610, 1.02, fullYears, 115));
  result.push(buildPoolData('pool-iitg-me-open-gn', 'p-iitg-me', 'iit-g', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 3950, 1.035, fullYears, 120));

  // 12. IIT Hyderabad CSE & AI
  result.push(buildPoolData('pool-iith-cse-open-gn', 'p-iith-cse', 'iit-h', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 640, 1.015, fullYears, 65));
  result.push(buildPoolData('pool-iith-ai-open-gn', 'p-iith-ai', 'iit-h', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_ADVANCED', 840, 0.98, fullYears, 40));

  // --- NITs (JEE Main Rank Scale) ---
  // NIT Trichy CSE (OS & HS)
  result.push(buildPoolData('pool-nitt-cse-open-os', 'p-nitt-cse', 'nit-trichy', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 1480, 1.02, fullYears, 60));
  result.push(buildPoolData('pool-nitt-cse-open-hs', 'p-nitt-cse', 'nit-trichy', 'HS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 4850, 1.03, fullYears, 60));
  result.push(buildPoolData('pool-nitt-cse-obc-os', 'p-nitt-cse', 'nit-trichy', 'OS', 'OBC-NCL', 'Gender-Neutral', 'JEE_MAIN', 440, 1.025, fullYears, 28));
  result.push(buildPoolData('pool-nitt-ece-open-os', 'p-nitt-ece', 'nit-trichy', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 3850, 1.03, fullYears, 65));
  result.push(buildPoolData('pool-nitt-me-open-os', 'p-nitt-me', 'nit-trichy', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 11200, 1.04, fullYears, 75));

  // NIT Surathkal CSE
  result.push(buildPoolData('pool-nitk-cse-open-os', 'p-nitk-cse', 'nit-surathkal', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 2150, 1.025, fullYears, 58));
  result.push(buildPoolData('pool-nitk-ai-open-os', 'p-nitk-ai', 'nit-surathkal', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 2850, 0.97, [2022, 2023, 2024], 35));
  result.push(buildPoolData('pool-nitk-it-open-os', 'p-nitk-it', 'nit-surathkal', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 3200, 1.02, fullYears, 55));

  // NIT Warangal CSE
  result.push(buildPoolData('pool-nitw-cse-open-os', 'p-nitw-cse', 'nit-warangal', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 2450, 1.025, fullYears, 60));
  result.push(buildPoolData('pool-nitw-ece-open-os', 'p-nitw-ece', 'nit-warangal', 'OS', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 5600, 1.03, fullYears, 65));

  // IIIT Allahabad IT
  result.push(buildPoolData('pool-iiita-it-open-ai', 'p-iiita-it', 'iiit-allahabad', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 5100, 1.02, fullYears, 140));
  result.push(buildPoolData('pool-iiita-ece-open-ai', 'p-iiita-ece', 'iiit-allahabad', 'AI', 'OPEN', 'Gender-Neutral', 'JEE_MAIN', 9800, 1.035, fullYears, 75));

  return result;
}

export const CANONICAL_POOLS_DATA = generateCanonicalSeatPools();

export function findSeatPoolData(poolId: string): SeatPoolData | undefined {
  return CANONICAL_POOLS_DATA.find((p) => p.pool.id === poolId);
}

export function getInstitute(id: string): Institute {
  return INSTITUTES.find((i) => i.id === id) || INSTITUTES[0];
}

export function getProgram(id: string): Program {
  return PROGRAMS.find((p) => p.id === id) || PROGRAMS[0];
}
