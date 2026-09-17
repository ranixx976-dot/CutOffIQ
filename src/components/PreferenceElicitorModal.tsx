import React, { useState, useMemo } from 'react';
import { ChoiceItem, PredictionResult } from '../types';
import {
  computeUtilityScores,
  detectPreferenceCycles,
} from '../engine/choiceListEngine';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Sparkles,
  X,
} from 'lucide-react';

interface PreferenceElicitorModalProps {
  choices: ChoiceItem[];
  isOpen: boolean;
  onClose: () => void;
  onApplyOrdering: (reorderedChoices: ChoiceItem[]) => void;
}

interface PairDuel {
  id: string;
  itemA: ChoiceItem;
  itemB: ChoiceItem;
  winnerId?: string; // id of itemA or itemB
}

export const PreferenceElicitorModal: React.FC<PreferenceElicitorModalProps> = ({
  choices,
  isOpen,
  onClose,
  onApplyOrdering,
}) => {
  const [comparisons, setComparisons] = useState<PairDuel[]>([]);
  const [currentDuelIndex, setCurrentDuelIndex] = useState<number>(0);
  const [completed, setCompleted] = useState(false);

  // Initialize pairs when choices change or modal opens
  React.useEffect(() => {
    if (choices.length < 2) return;

    const duels: PairDuel[] = [];
    // Generate intelligent pairs focusing on adjacent rank pairs and key tradeoffs
    for (let i = 0; i < choices.length; i++) {
      for (let j = i + 1; j < Math.min(choices.length, i + 3); j++) {
        duels.push({
          id: `duel-${choices[i].id}-${choices[j].id}`,
          itemA: choices[i],
          itemB: choices[j],
        });
      }
    }

    // Limit to maximum 8 duels to avoid decision fatigue
    const selectedDuels = duels.slice(0, 8);
    setComparisons(selectedDuels);
    setCurrentDuelIndex(0);
    setCompleted(false);
  }, [choices, isOpen]);

  if (!isOpen) return null;

  if (choices.length < 2) {
    return (
      <div id="elicitor-empty-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-xl border border-slate-200">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900">Need at least 2 choices to elicit preferences</h3>
          <p className="text-xs text-slate-500 mt-1">
            Please add at least 2 institutes/branches to your choice list before running the pairwise comparison wizard.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  const currentDuel = comparisons[currentDuelIndex];

  const handleVote = (winnerId: string) => {
    const updated = [...comparisons];
    updated[currentDuelIndex] = {
      ...updated[currentDuelIndex],
      winnerId,
    };
    setComparisons(updated);

    if (currentDuelIndex + 1 < comparisons.length) {
      setCurrentDuelIndex(currentDuelIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  // Detect any cycle in preference graph
  const cycleDetection = detectPreferenceCycles(
    comparisons.map((c) => ({
      itemAId: c.itemA.id,
      itemBId: c.itemB.id,
      preferredId: c.winnerId,
    }))
  );

  // Compute utility ranking
  const utilityScores = computeUtilityScores(
    choices.map((c) => c.id),
    comparisons.map((c) => ({
      itemAId: c.itemA.id,
      itemBId: c.itemB.id,
      preferredId: c.winnerId,
    }))
  );

  const rankedChoices = [...choices].sort((a, b) => {
    const scoreA = utilityScores.get(a.id) || 1000;
    const scoreB = utilityScores.get(b.id) || 1000;
    return scoreB - scoreA;
  });

  return (
    <div id="preference-elicitor-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                Part 5.2(a) Specification
              </span>
              <span className="text-xs text-slate-400">Pairwise Utility Inference</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Preference Elicitation &amp; Inconsistency Diagnostic
            </h3>
            <p className="text-xs text-slate-500">
              Students often struggle to balance branch vs campus vs prestige. Resolve trade-offs through pairwise comparisons.
            </p>
          </div>
          <button
            id="btn-close-elicitor"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inconsistency / Cycle Warning if detected */}
        {cycleDetection.hasCycle && (
          <div id="cycle-detected-banner" className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start space-x-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Preference Inconsistency Detected:</strong>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Your selections form an intransitive loop (e.g. A &gt; B and B &gt; C, but C &gt; A). Review your tradeoffs below to ensure a consistent, transitivity-respecting ranking.
              </p>
            </div>
          </div>
        )}

        {/* Duel Screen */}
        {!completed && currentDuel ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Comparison {currentDuelIndex + 1} of {comparisons.length}</span>
              <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${((currentDuelIndex + 1) / comparisons.length) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-center text-xs font-semibold text-slate-700">
              Which seat pool would you genuinely choose if both were offered to you simultaneously?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A */}
              <button
                id="btn-vote-option-a"
                type="button"
                onClick={() => handleVote(currentDuel.itemA.id)}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold group-hover:bg-indigo-200 group-hover:text-indigo-900">
                    Option A
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">
                    {currentDuel.itemA.prediction.institute.name}
                  </h4>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {currentDuel.itemA.prediction.program.branchName}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Quota: {currentDuel.itemA.prediction.seatPool.quota}</span>
                  <span className="font-semibold text-indigo-600 group-hover:underline">Choose A &rarr;</span>
                </div>
              </button>

              {/* Option B */}
              <button
                id="btn-vote-option-b"
                type="button"
                onClick={() => handleVote(currentDuel.itemB.id)}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold group-hover:bg-indigo-200 group-hover:text-indigo-900">
                    Option B
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">
                    {currentDuel.itemB.prediction.institute.name}
                  </h4>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {currentDuel.itemB.prediction.program.branchName}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Quota: {currentDuel.itemB.prediction.seatPool.quota}</span>
                  <span className="font-semibold text-indigo-600 group-hover:underline">Choose B &rarr;</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Results / Ordering Screen */
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="font-semibold">Pairwise Comparisons Completed!</strong>
                <p className="text-[11px] text-emerald-800">
                  Utility weights calculated via Bradley-Terry logistic model. Below is your inferred, mathematically defensible preference ordering.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
              {rankedChoices.map((choice, idx) => {
                const score = Math.round(utilityScores.get(choice.id) || 1000);
                return (
                  <div
                    key={choice.id}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900">{choice.prediction.institute.shortName}</span>
                        <span className="text-slate-600 ml-1.5 font-medium">{choice.prediction.program.branchName}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-indigo-600 font-semibold">
                      Score: {score}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                id="btn-restart-elicitor"
                type="button"
                onClick={() => {
                  setCurrentDuelIndex(0);
                  setCompleted(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart Comparisons</span>
              </button>

              <button
                id="btn-apply-inferred-ordering"
                type="button"
                onClick={() => {
                  onApplyOrdering(rankedChoices);
                  onClose();
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-2xs flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply Inferred Ordering to Choice List</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
