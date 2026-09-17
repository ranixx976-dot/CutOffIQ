import React, { useState, useMemo } from 'react';
import {
  StudentProfile,
  PredictionResult,
  ChoiceItem,
  AdmissionBucket,
} from '../types';
import {
  CANONICAL_POOLS_DATA,
  INSTITUTES,
  PROGRAMS,
} from '../data/josaaDataset';
import { evaluateSeatPoolForStudent } from '../engine/predictionEngine';
import {
  Search,
  Plus,
  Check,
  Info,
  TrendingUp,
  AlertTriangle,
  Layers,
  ChevronDown,
  X,
  ExternalLink,
} from 'lucide-react';

interface PredictorViewProps {
  profile: StudentProfile;
  choices: ChoiceItem[];
  onAddChoice: (prediction: PredictionResult) => void;
  onRemoveChoice: (seatPoolId: string) => void;
}

export const PredictorView: React.FC<PredictorViewProps> = ({
  profile,
  choices,
  onAddChoice,
  onRemoveChoice,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitute, setSelectedInstitute] = useState<string>('ALL');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedBucket, setSelectedBucket] = useState<string>('ALL');
  const [inspectModalPrediction, setInspectModalPrediction] = useState<PredictionResult | null>(null);

  // Compute predictions for all matching seat pools in real time
  const predictions: PredictionResult[] = useMemo(() => {
    const results: PredictionResult[] = [];

    CANONICAL_POOLS_DATA.forEach((poolData) => {
      // Must match student exam type and category (or OPEN)
      if (poolData.pool.examType !== profile.examType) return;
      if (poolData.pool.category !== profile.category) return;
      if (poolData.pool.genderPool !== profile.genderPool) return;

      const pred = evaluateSeatPoolForStudent(
        poolData,
        profile,
        profile.targetRound,
        2025,
        CANONICAL_POOLS_DATA
      );

      if (pred) {
        results.push(pred);
      }
    });

    // Sort: Safe first, then Likely, Target, Reach, Out of range; within bucket by probability descending
    return results.sort((a, b) => b.probability - a.probability);
  }, [profile]);

  // Unique lists for filtering
  const availableBranches = useMemo(() => {
    const set = new Set<string>();
    predictions.forEach((p) => set.add(p.program.branchName));
    return Array.from(set).sort();
  }, [predictions]);

  const availableInstitutes = useMemo(() => {
    const set = new Set<string>();
    predictions.forEach((p) => set.add(p.institute.name));
    return Array.from(set).sort();
  }, [predictions]);

  // Filtered predictions
  const filteredPredictions = useMemo(() => {
    return predictions.filter((p) => {
      if (selectedInstitute !== 'ALL' && p.institute.name !== selectedInstitute) return false;
      if (selectedBranch !== 'ALL' && p.program.branchName !== selectedBranch) return false;
      if (selectedBucket !== 'ALL' && p.bucket !== selectedBucket) return false;

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const instMatch = p.institute.name.toLowerCase().includes(query) || p.institute.shortName.toLowerCase().includes(query);
        const branchMatch = p.program.branchName.toLowerCase().includes(query) || p.program.branchCode.toLowerCase().includes(query);
        const quotaMatch = p.seatPool.quota.toLowerCase().includes(query);
        if (!instMatch && !branchMatch && !quotaMatch) return false;
      }

      return true;
    });
  }, [predictions, selectedInstitute, selectedBranch, selectedBucket, searchTerm]);

  // Bucket badge style helper
  const getBucketBadge = (b: AdmissionBucket) => {
    switch (b) {
      case 'Safe':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Likely':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Target':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Reach':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'Out of range':
        return 'bg-rose-50 text-rose-800 border-rose-300';
    }
  };

  const isChoiceAdded = (poolId: string) => choices.some((c) => c.seatPoolId === poolId);

  return (
    <div id="predictor-view-container" className="space-y-6">
      {/* Top Banner Explainer */}
      <div id="predictor-notice-banner" className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg shrink-0 mt-0.5 sm:mt-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Evaluated for {profile.examType === 'JEE_ADVANCED' ? 'JEE Advanced' : 'JEE Main'} Rank {profile.rank} ({profile.category}, {profile.genderPool})
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Probabilities modeled via log-normalised weighted linear regression (w_t = 0.7^(T-t)) with Student-t prediction intervals (&nu; = n-2). Ranks loosening modeled for <strong className="text-slate-800">Round {profile.targetRound}</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 self-end sm:self-center shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{predictions.length} seat pools analyzed</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div id="predictor-filters" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="input-search-predictor"
            type="text"
            placeholder="Search institute or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Institute Filter */}
        <div>
          <select
            id="filter-select-institute"
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
          >
            <option value="ALL">All Institutes ({availableInstitutes.length})</option>
            {availableInstitutes.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Filter */}
        <div>
          <select
            id="filter-select-branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
          >
            <option value="ALL">All Academic Branches ({availableBranches.length})</option>
            {availableBranches.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>

        {/* Bucket Filter */}
        <div>
          <select
            id="filter-select-bucket"
            value={selectedBucket}
            onChange={(e) => setSelectedBucket(e.target.value)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
          >
            <option value="ALL">All Confidence Buckets</option>
            <option value="Safe">Safe (≥ 85%)</option>
            <option value="Likely">Likely (60% - 84%)</option>
            <option value="Target">Target (30% - 59%)</option>
            <option value="Reach">Reach (10% - 29%)</option>
            <option value="Out of range">Out of range (&lt; 10%)</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredPredictions.length === 0 ? (
        <div id="empty-predictions" className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-8">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">No matching seat pools found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try resetting your search query or selecting &quot;All Institutes&quot; / &quot;All Academic Branches&quot;. Note that IITs require JEE Advanced while NITs/IIITs require JEE Main.
          </p>
        </div>
      ) : (
        <div id="prediction-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPredictions.map((pred) => {
            const added = isChoiceAdded(pred.seatPool.id);
            const probPercent = Math.round(pred.probability * 100);

            return (
              <div
                id={`card-pool-${pred.seatPool.id}`}
                key={pred.seatPool.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs relative group"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getBucketBadge(pred.bucket)}`}>
                        {pred.bucket} ({probPercent}%)
                      </span>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {pred.seatPool.quota} Quota
                      </span>
                      {pred.shrunk && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5" title="Sparse series: Trend slope shrunk hierarchically towards parent group">
                          Sparse (Shrunk)
                        </span>
                      )}
                    </div>

                    <button
                      id={`btn-inspect-${pred.seatPool.id}`}
                      type="button"
                      onClick={() => setInspectModalPrediction(pred)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                      title="Inspect Statistical Model & Interval Calculation"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {pred.institute.shortName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-1">
                    {pred.program.branchName}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {pred.program.degree} • {pred.program.durationYears} Years • {pred.institute.city}, {pred.institute.state}
                  </p>
                </div>

                {/* Cutoff & Interval stats */}
                <div className="my-3 py-2.5 px-3 bg-slate-50/80 rounded-lg border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Predicted Closing Rank:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {pred.predictedClosingRank.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">80% Interval (t-dist):</span>
                    <span className="font-mono text-slate-700 text-[11px]">
                      [{pred.interval80[0].toLocaleString()} – {pred.interval80[1].toLocaleString()}]
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Last Year (2024 R{pred.round}):</span>
                    <span className="font-mono text-slate-600">{pred.lastYearClosingRank.toLocaleString()}</span>
                  </div>
                </div>

                {/* Plain-language honest caveat: Never show a bare percentage */}
                <div className="mb-3 text-[11px] text-slate-500 leading-relaxed italic">
                  {pred.probability >= 0.85 ? (
                    <span>Your rank ({profile.rank}) clears the 80% interval comfortably. Historically highly stable.</span>
                  ) : pred.probability >= 0.30 ? (
                    <span>Within the realistic cutoff swing range. Allocation is contingent on round-to-round vacancy shifts.</span>
                  ) : (
                    <span>Above the projected closing interval. Requires significant category loosening to materialize.</span>
                  )}
                </div>

                {/* Add/Remove Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    id={`btn-toggle-choice-${pred.seatPool.id}`}
                    type="button"
                    onClick={() => {
                      if (added) {
                        onRemoveChoice(pred.seatPool.id);
                      } else {
                        onAddChoice(pred);
                      }
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                      added
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Choice List</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Choice List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Model Transparency & Mathematics Modal */}
      {inspectModalPrediction && (
        <div id="inspect-model-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getBucketBadge(inspectModalPrediction.bucket)}`}>
                    {inspectModalPrediction.bucket} ({Math.round(inspectModalPrediction.probability * 100)}%)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Round {inspectModalPrediction.round} Model
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {inspectModalPrediction.institute.name}
                </h3>
                <p className="text-xs text-slate-600">
                  {inspectModalPrediction.program.branchName} ({inspectModalPrediction.seatPool.quota} Quota, {inspectModalPrediction.seatPool.category})
                </p>
              </div>
              <button
                id="btn-close-inspect-modal"
                onClick={() => setInspectModalPrediction(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Regression breakdown */}
            <div className="space-y-3 text-xs text-slate-700">
              <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                <span>📐</span>
                <span>Part 2 &amp; 3 Mathematical Specification Breakdown</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Data Points (n)</span>
                  <span className="font-bold text-slate-800">{inspectModalPrediction.dataPoints} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Degrees of Freedom</span>
                  <span className="font-bold text-slate-800">{inspectModalPrediction.dof}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Predictive σ_pred</span>
                  <span className="font-bold text-slate-800">{inspectModalPrediction.sigmaPred.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Student z-score</span>
                  <span className="font-bold text-slate-800">{inspectModalPrediction.zScore.toFixed(3)}</span>
                </div>
              </div>

              {/* Formula & derivation note */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1.5 text-[11px] text-slate-700">
                <p className="font-medium text-indigo-950">Normalisation &amp; Seat Adjustment Equation:</p>
                <code className="block bg-white p-2 rounded border border-indigo-200 text-slate-800 font-mono text-[10px]">
                  y_t = ln(closing_rank / qualified_pool) + ln(seats_2025 / seats_t)
                </code>
                <p className="text-slate-600">
                  Student transformed rank <code className="font-mono text-indigo-700">y_student = {inspectModalPrediction.yStudent.toFixed(4)}</code> evaluated against point estimate <code className="font-mono text-indigo-700">ŷ = {inspectModalPrediction.yHat.toFixed(4)}</code>.
                </p>
                <p className="text-slate-600">
                  Calculated via Student-t CDF: <code className="font-mono text-indigo-700">P(admit) = 1 - T_{'{' + inspectModalPrediction.dof + '}'}(z) = {(inspectModalPrediction.probability * 100).toFixed(2)}%</code>.
                </p>
              </div>

              {/* Historical Cutoffs Table */}
              <div>
                <h5 className="font-semibold text-slate-800 text-[11px] mb-1.5">Observed Historical Cutoffs &amp; Seat Matrix:</h5>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200 text-center text-[11px]">
                    <thead className="bg-slate-50 font-medium text-slate-500">
                      <tr>
                        <th className="py-1.5 px-2">Year</th>
                        <th className="py-1.5 px-2">Round</th>
                        <th className="py-1.5 px-2">Closing Rank</th>
                        <th className="py-1.5 px-2">Seat Count</th>
                        <th className="py-1.5 px-2">Weight (w_t = 0.7^(T-t))</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {inspectModalPrediction.historicalCutoffs.map((hc) => {
                        const yearsDiff = 2024 - hc.year;
                        const weight = Math.pow(0.7, yearsDiff);
                        return (
                          <tr key={hc.year} className="hover:bg-slate-50/50">
                            <td className="py-1.5 px-2 font-semibold text-slate-800">{hc.year}</td>
                            <td className="py-1.5 px-2 text-slate-500">R{hc.round}</td>
                            <td className="py-1.5 px-2 text-slate-900 font-bold">{hc.closingRank.toLocaleString()}</td>
                            <td className="py-1.5 px-2 text-slate-600">{hc.seats}</td>
                            <td className="py-1.5 px-2 text-slate-500">{weight.toFixed(3)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shrinkage note if applicable */}
              {inspectModalPrediction.shrunk && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
                  <strong>Hierarchical Shrinkage Applied (Part 3.5):</strong> Because this program has thin historical data (≤ 3 years), the pool&apos;s regression slope has been shrunk toward the parent institute/branch slope ($k = 3.0$). The prediction interval standard error has been widened proportionally to avoid overconfidence.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                id="btn-dismiss-modal"
                onClick={() => setInspectModalPrediction(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
