import React, { useState, useMemo } from 'react';
import { ChoiceItem, FloatFreezeDecision, StudentProfile } from '../types';
import { evaluateFloatFreezeDecision } from '../engine/choiceListEngine';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Info,
  Layers,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface FloatFreezeAdvisorProps {
  choices: ChoiceItem[];
  profile: StudentProfile;
  onNavigateToPredictor: () => void;
}

export const FloatFreezeAdvisor: React.FC<FloatFreezeAdvisorProps> = ({
  choices,
  profile,
  onNavigateToPredictor,
}) => {
  const [selectedAllottedIndex, setSelectedAllottedIndex] = useState<number>(
    choices.length > 2 ? 2 : Math.max(0, choices.length - 1)
  );
  const [counsellingRound, setCounsellingRound] = useState<number>(1);

  const decision: FloatFreezeDecision | null = useMemo(() => {
    if (choices.length === 0 || selectedAllottedIndex >= choices.length) return null;
    return evaluateFloatFreezeDecision(choices, selectedAllottedIndex, counsellingRound);
  }, [choices, selectedAllottedIndex, counsellingRound]);

  if (choices.length === 0) {
    return (
      <div id="float-freeze-empty" className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <RotateCcw className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-800">Add choices to simulate post-round decision</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          The Float/Freeze advisor requires your submitted choice list to calculate upgrade probabilities and expected utilities under JoSAA rules.
        </p>
        <button
          onClick={onNavigateToPredictor}
          className="mt-3 px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
        >
          Add choices from Predictor
        </button>
      </div>
    );
  }

  return (
    <div id="float-freeze-container" className="space-y-6">
      {/* Educational Header Banner */}
      <div id="float-freeze-explainer" className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔀</span>
              <h2 className="text-base font-bold text-white tracking-tight">
                Post-Round Decision Matrix: Float vs Freeze vs Slide
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              In JoSAA counselling, <strong>floating never forfeits your currently held seat</strong>. If you do not get an upgrade in subsequent rounds, your existing seat remains 100% reserved. Hence mathematically, Expected Utility of Floating almost always weakly dominates Freezing: <code className="font-mono text-indigo-300">EU(Float) ≥ EU(Freeze)</code>.
            </p>
          </div>

          {/* Current Round Selector */}
          <div className="flex items-center space-x-2 shrink-0 bg-slate-800 p-2 rounded-xl border border-slate-700">
            <label htmlFor="select-counselling-round" className="text-xs text-slate-400 font-medium">
              Active Round:
            </label>
            <select
              id="select-counselling-round"
              value={counsellingRound}
              onChange={(e) => setCounsellingRound(parseInt(e.target.value, 10))}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  Round {r} Allotment
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scenario Simulator Controls */}
      <div id="simulator-seat-selector" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <label htmlFor="select-currently-allotted-seat" className="text-xs font-bold text-slate-800 block">
          Simulate: Suppose you received an allotment for choice #
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {choices.map((c, idx) => {
            const isSelected = idx === selectedAllottedIndex;
            return (
              <button
                id={`btn-allotted-choice-${idx}`}
                key={c.id}
                type="button"
                onClick={() => setSelectedAllottedIndex(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-500 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className={`w-5 h-5 rounded text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {c.prediction.institute.shortName}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {c.prediction.program.branchName}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-semibold text-indigo-700 uppercase shrink-0 px-1.5 py-0.5 rounded bg-indigo-100">
                    Allotted
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Result Card */}
      {decision && (
        <div id="float-freeze-decision-report" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Recommendation & Math (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mathematical Decision Output
                </span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  decision.recommendation === 'FLOAT'
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    : decision.recommendation === 'SLIDE'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  RECOMMENDATION: {decision.recommendation}
                </span>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  {decision.rationale}
                </p>
              </div>

              {/* Expected Utility Table */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">EU(Float)</span>
                  <span className="text-lg font-bold text-indigo-600">{decision.euFloat.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {(decision.pAnyUpgrade * 100).toFixed(1)}% upgrade probability
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">EU(Freeze)</span>
                  <span className="text-lg font-bold text-slate-700">{decision.euFreeze.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Forfeits any higher seats
                  </span>
                </div>
              </div>

              {/* Higher Preferences Upgrade Breakdown */}
              {decision.higherChoices.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">
                    Target Higher Preferences (Rounds {counsellingRound + 1}–6 Upgrade Chance):
                  </h4>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {decision.upgradeProbabilities.map((up) => {
                      return (
                        <div
                          key={up.choice.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
                        >
                          <div className="truncate">
                            <span className="font-bold text-slate-900">#{up.choice.preferenceRank} {up.choice.prediction.institute.shortName}</span>
                            <span className="text-slate-600 text-[11px] block truncate">{up.choice.prediction.program.branchName}</span>
                          </div>
                          <div className="text-right shrink-0 font-mono">
                            <span className="font-bold text-indigo-700">
                              {(up.pUpgrade * 100).toFixed(1)}%
                            </span>
                            <span className="text-[10px] text-slate-400 block">Round upgrade est.</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Real Constraints & Mandatory Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-2xs space-y-3">
              <div className="flex items-center space-x-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Real Costs, Deadlines &amp; Traps (Part 5.3)
                </h3>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Floating carries no algorithmic risk, but students routinely lose seats due to administrative procedural deadlines. Pay close attention:
              </p>

              <div className="space-y-2 text-xs">
                {decision.constraintsAndChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 bg-white/90 p-2.5 rounded-lg border border-amber-200/80 text-slate-700 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
