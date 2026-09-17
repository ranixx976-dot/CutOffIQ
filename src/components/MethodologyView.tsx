import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  Shield,
  Sliders,
  TrendingUp,
  Zap,
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  const failureModes = [
    {
      risk: 'Overconfident intervals → students lose seats',
      mitigation: 'Student-t distribution with (n - 2) degrees of freedom rather than normal distribution. Heavily widens interval on sparse series; strictly verified via 80% empirical backtest coverage.',
    },
    {
      risk: 'Sparse-category pools produce nonsense',
      mitigation: 'Hierarchical shrinkage pulls pool slope toward parent institute/branch slope: β1_final = w·β1_pool + (1-w)·β1_parent with w = n/(n+3). UI surfaces explicit low-confidence badge.',
    },
    {
      risk: 'Seat matrix expansion breaks historical trend',
      mitigation: 'Pre-regression seat adjustment in log space: adjusted_y = y + ln(seats_target / seats_t). Compensates for proportional cutoff shifts when a branch adds seats.',
    },
    {
      risk: 'Policy change (new quota, new institute, supernumerary)',
      mitigation: 'Dimensionally unpooled seat pools (never pool SC with OPEN, or Female-only with Gender-Neutral). Separate time series per quota and seat category.',
    },
    {
      risk: 'Student misreads probability as absolute guarantee',
      mitigation: 'Never display a bare percentage. Every probability is bound to an 80% prediction interval and honest contextual guidance.',
    },
    {
      risk: 'Exam pattern change breaks rank comparability',
      mitigation: 'Divide raw ranks by annual qualified candidate count per exam and category to yield comparable percentile quantities in (0, 1].',
    },
    {
      risk: 'Model silently degrades year over year',
      mitigation: 'Annual post-counselling walk-forward audit; public calibration report and Brier score tracking against naive baselines.',
    },
  ];

  return (
    <div id="methodology-view-container" className="space-y-6">
      {/* Overview Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            CutoffIQ Prediction Methodology &amp; Mathematical Specification
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          An 18-year-old student deciding between colleges deserves transparent, statistically honest reasoning — not opaque machine learning &quot;black box&quot; scores. CutoffIQ uses weighted linear regression in log-normalised percentile space with explicit Student-t predictive uncertainty and hierarchical Bayesian shrinkage.
        </p>
      </div>

      {/* Why Not Machine Learning (Part 3.1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-rose-700">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Why Not Deep Learning / GBDT? (Part 3.1)
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            JoSAA seat pools provide only <strong>3 to 6 historical data points</strong>. Running a deep neural network or gradient-boosted tree on 5 data points is overfitting theatre.
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>Machine learning models fit noise rather than signal on small N.</li>
            <li>Zero interpretability — unable to explain why a student&apos;s odds are 65% vs 40%.</li>
            <li>Produces false precision without genuine Bayesian parameter uncertainty.</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-indigo-700">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              The Weighted Regression Solution
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            CutoffIQ models log-normalised ranks via weighted least squares with recency decay (<code className="font-mono text-indigo-600">λ = 0.7</code>):
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>y_t = β₀ + β₁·t + ε,  ε ~ N(0, σ²)</div>
            <div>w_t = 0.7^(T - t)  (T = 2024, t = year)</div>
            <div>σ_pred² = σ̂² · (1 + x₀ᵀ(XᵀWX)⁻¹x₀)</div>
          </div>
          <p className="text-xs text-slate-600">
            Accounts for parameter uncertainty via the design matrix leverage and applies Student-t distribution (<code className="font-mono text-slate-700">df = n - 2</code>) so confidence intervals automatically widen when data is scarce.
          </p>
        </div>
      </div>

      {/* Part 7 Failure Modes & Mitigations Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Part 7: Failure Modes to Guard Against &amp; System Mitigations
          </h3>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left font-semibold text-slate-600">
              <tr>
                <th className="py-2.5 px-3 w-1/3">Identified Vulnerability / Risk</th>
                <th className="py-2.5 px-3">System Engineering Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {failureModes.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 align-top">
                    {item.risk}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed align-top">
                    {item.mitigation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Serial Dictatorship Strategy-Proofness */}
      <div className="bg-indigo-950 text-white p-5 rounded-2xl border border-indigo-900 space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-indigo-300">
          <Zap className="w-4 h-4" />
          <h3 className="font-bold uppercase tracking-wider">
            Game Theory of Serial Dictatorship (Part 5.1)
          </h3>
        </div>
        <p className="text-indigo-100 leading-relaxed">
          JoSAA counselling runs an exact serial dictatorship: the algorithm orders students strictly by merit rank and processes each student&apos;s choice list sequentially from rank 1 downwards. A candidate is allocated the highest choice on their list that has an available seat.
        </p>
        <p className="text-indigo-200 leading-relaxed">
          Because of this mechanism, <strong>preference submission is strictly strategy-proof</strong>: submitting your honest preference order weakly dominates any tactical reshuffling. Any tool claiming to &quot;optimize choice positions&quot; by moving hard-to-reach colleges down is mathematically flawed.
        </p>
      </div>
    </div>
  );
};
