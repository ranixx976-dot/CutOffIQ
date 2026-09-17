import React, { useMemo } from 'react';
import { ChoiceItem, ChoiceListAnalysis, StudentProfile } from '../types';
import { analyzeChoiceList } from '../engine/choiceListEngine';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  HelpCircle,
  Layers,
  Trash2,
  Zap,
  Sliders,
} from 'lucide-react';

interface ChoiceListBuilderProps {
  choices: ChoiceItem[];
  profile: StudentProfile;
  onMoveChoice: (index: number, direction: 'up' | 'down') => void;
  onRemoveChoice: (seatPoolId: string) => void;
  onClearList: () => void;
  onOpenElicitor: () => void;
  onNavigateToPredictor: () => void;
}

export const ChoiceListBuilder: React.FC<ChoiceListBuilderProps> = ({
  choices,
  profile,
  onMoveChoice,
  onRemoveChoice,
  onClearList,
  onOpenElicitor,
  onNavigateToPredictor,
}) => {
  const analysis: ChoiceListAnalysis = useMemo(() => {
    return analyzeChoiceList(choices);
  }, [choices]);

  const pNoAllocationPct = (analysis.pNoAllocation * 100).toFixed(1);
  const isHighRiskNoAlloc = analysis.pNoAllocation > 0.05;

  return (
    <div id="choice-list-builder-container" className="space-y-6">
      {/* Educational Notice: Serial Dictatorship Strategy-Proofness */}
      <div id="serial-dictatorship-callout" className="bg-indigo-950 text-indigo-100 rounded-xl p-4 border border-indigo-800/60 shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-800/80 rounded-lg text-indigo-200 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white">
                Serial Dictatorship: The Optimal List IS Your True Preference Order
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
                Strategy-Proof
              </span>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">
              JoSAA walks down your submitted list and allocates the highest-ranked choice whose cutoff you clear. Listing an ambitious or low-probability branch at position 1 <strong>costs you nothing</strong> — if you don&apos;t clear it, the algorithm immediately checks position 2 without penalty. Never artificially push down your dream college!
            </p>
          </div>
        </div>
      </div>

      {/* Coverage & Health Metrics Bar */}
      <div id="choice-list-health-metrics" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* P(No Allocation) Metric Card */}
        <div className={`p-4 rounded-xl border ${
          isHighRiskNoAlloc
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        } shadow-2xs`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Risk of Zero Seat Allocation
            </span>
            {isHighRiskNoAlloc ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className={`text-2xl font-extrabold font-mono ${
              isHighRiskNoAlloc ? 'text-rose-700' : 'text-emerald-700'
            }`}>
              {pNoAllocationPct}%
            </span>
            <span className="text-xs text-slate-500">P(unallocated)</span>
          </div>
          <p className="text-[11px] mt-1 text-slate-600">
            {isHighRiskNoAlloc
              ? `Threshold exceeded (>5%). Add at least ${analysis.recommendedSafeAdditions} more Safe backup choices.`
              : 'Safely below the 5% risk threshold. Solid coverage.'}
          </p>
        </div>

        {/* Bucket Count Breakdown */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Composition Breakdown
          </span>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold" title="Safe (≥ 85%)">
              {analysis.safeCount} Safe
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold" title="Likely (60-84%)">
              {analysis.likelyCount} Likely
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold" title="Target (30-59%)">
              {analysis.targetCount} Target
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold" title="Reach (10-29%)">
              {analysis.reachCount} Reach
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Total {choices.length} choices listed
          </p>
        </div>

        {/* Top-Heavy Warning */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs md:col-span-2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              List Balance Diagnostic
            </span>
            {analysis.isTopHeavy ? (
              <div className="flex items-start space-x-2 mt-1.5 text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p>{analysis.topHeavyWarning}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-600 mt-1.5">
                Balanced distribution: your list properly mixes aspirational preferences with realistic target and anchor seats.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-2 mt-3 pt-2 border-t border-slate-100">
            <button
              id="btn-launch-elicitor-from-list"
              type="button"
              onClick={onOpenElicitor}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <span>⚖️</span>
              <span>Run Pairwise Preference Elicitor</span>
            </button>
            {choices.length > 0 && (
              <button
                id="btn-clear-choice-list"
                type="button"
                onClick={onClearList}
                className="px-2.5 py-1 text-slate-400 hover:text-rose-600 rounded-lg text-xs font-medium transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Choice List & Expected Outcome Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: The Interactive Reorderable List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Submitted Choice Order (1 to {choices.length})</span>
            </h3>
            <button
              id="btn-add-more-choices"
              onClick={onNavigateToPredictor}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              + Add more branches
            </button>
          </div>

          {choices.length === 0 ? (
            <div id="empty-choice-list" className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-slate-700">No choices added yet</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                Navigate to the Cutoff Predictor tab to evaluate programs and add them into your personal preference list.
              </p>
              <button
                id="btn-goto-predictor-empty"
                onClick={onNavigateToPredictor}
                className="mt-3 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700"
              >
                Browse &amp; Add Seat Pools
              </button>
            </div>
          ) : (
            <div id="choices-reorder-container" className="space-y-2">
              {choices.map((choice, index) => {
                const pAdmitPct = Math.round(choice.prediction.probability * 100);
                const outcome = analysis.outcomeDistribution[index];
                const pAllocPct = outcome ? (outcome.pAllocated * 100).toFixed(1) : '0';

                return (
                  <div
                    id={`choice-item-${choice.id}`}
                    key={choice.id}
                    className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between gap-3 shadow-2xs hover:border-indigo-300 transition-all"
                  >
                    {/* Position handle */}
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-xs font-bold text-slate-900">
                            {choice.prediction.institute.shortName}
                          </h4>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                            choice.prediction.bucket === 'Safe'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : choice.prediction.bucket === 'Likely'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : choice.prediction.bucket === 'Target'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-purple-50 text-purple-800 border-purple-300'
                          }`}>
                            {choice.prediction.bucket} ({pAdmitPct}%)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {choice.prediction.program.branchName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          P(Admit) = {pAdmitPct}% • P(Allocated here) = {pAllocPct}%
                        </p>
                      </div>
                    </div>

                    {/* Move controls & Delete */}
                    <div className="flex items-center space-x-1">
                      <button
                        id={`btn-move-up-${choice.id}`}
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMoveChoice(index, 'up')}
                        className={`p-1 rounded text-slate-500 hover:bg-slate-100 ${
                          index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-slate-800'
                        }`}
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        id={`btn-move-down-${choice.id}`}
                        type="button"
                        disabled={index === choices.length - 1}
                        onClick={() => onMoveChoice(index, 'down')}
                        className={`p-1 rounded text-slate-500 hover:bg-slate-100 ${
                          index === choices.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-slate-800'
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        id={`btn-delete-choice-${choice.id}`}
                        type="button"
                        onClick={() => onRemoveChoice(choice.seatPoolId)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-1"
                        title="Remove from list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Expected Outcome Probability Distribution Waterfall (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <span>📈</span>
              <span>Expected Allocation Distribution (Part 5.2c)</span>
            </h3>
          </div>

          <div id="outcome-distribution-panel" className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              In serial dictatorship, probability of being allocated choice <code className="font-mono text-slate-700">i</code> is the joint probability of qualifying for <code className="font-mono text-slate-700">i</code> AND NOT qualifying for any higher choice:
              <span className="block font-mono text-[10px] text-indigo-900 bg-indigo-50 p-1.5 rounded mt-1 border border-indigo-100">
                P(alloted i) = P(admit_i) × ∏_{'{'}j&lt;i{'}'} (1 - P(admit_j))
              </span>
            </p>

            {choices.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Add choices to view the probability spread.</p>
            ) : (
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {analysis.outcomeDistribution.map((item, idx) => {
                  const allocPct = item.pAllocated * 100;
                  const barWidth = Math.max(allocPct, 2);

                  return (
                    <div key={item.choiceId} className="text-xs space-y-1 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                          #{idx + 1} {item.instituteName}
                        </span>
                        <span className="font-mono font-bold text-indigo-700">
                          {allocPct.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.branchName}
                      </p>

                      {/* Visual probability bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>P(Admit) = {(item.pAdmit * 100).toFixed(0)}%</span>
                        <span>Cumul = {(item.cumulativeAllocationProb * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}

                {/* Unallocated tail probability */}
                <div className={`text-xs p-2 rounded-lg border font-mono ${
                  analysis.pNoAllocation > 0.05
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>Unallocated Tail Risk</span>
                    <span>{(analysis.pNoAllocation * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
