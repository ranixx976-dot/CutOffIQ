import React, { useState, useEffect } from 'react';
import {
  ChoiceItem,
  PredictionResult,
  StudentProfile,
} from './types';
import { Header } from './components/Header';
import { PredictorView } from './components/PredictorView';
import { ChoiceListBuilder } from './components/ChoiceListBuilder';
import { PreferenceElicitorModal } from './components/PreferenceElicitorModal';
import { FloatFreezeAdvisor } from './components/FloatFreezeAdvisor';
import { BacktestReportView } from './components/BacktestReportView';
import { MethodologyView } from './components/MethodologyView';
import { CANONICAL_POOLS_DATA, findSeatPoolData } from './data/josaaDataset';
import { evaluateSeatPoolForStudent } from './engine/predictionEngine';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>({
    examType: 'JEE_ADVANCED',
    rank: 350,
    category: 'OPEN',
    genderPool: 'Gender-Neutral',
    homeState: 'Maharashtra',
    targetRound: 6,
  });

  const [activeTab, setActiveTab] = useState<
    'predictor' | 'choicelist' | 'elicitor' | 'floatfreeze' | 'backtest' | 'methodology'
  >('predictor');

  const [isElicitorOpen, setIsElicitorOpen] = useState(false);
  const [choices, setChoices] = useState<ChoiceItem[]>([]);

  // Seed initial choices based on student rank on first mount
  useEffect(() => {
    const seedPoolIds = [
      'pool-iitb-cse-open-gn', // Reach (rank ~63)
      'pool-iitd-cse-open-gn', // Reach (rank ~115)
      'pool-iitm-cse-open-gn', // Target/Reach (rank ~165)
      'pool-iitk-cse-open-gn', // Target (rank ~225)
      'pool-iitd-mnc-open-gn', // Target (rank ~320)
      'pool-iitd-ai-open-gn',  // Target (rank ~340)
      'pool-iitb-ee-open-gn',  // Likely (rank ~425)
      'pool-iitr-cse-open-gn', // Likely (rank ~430)
      'pool-iith-cse-open-gn', // Likely (rank ~640)
      'pool-iitkgp-ece-open-gn', // Safe (rank ~920)
      'pool-iitb-me-open-gn',  // Safe (rank ~1650)
    ];

    const initialChoices: ChoiceItem[] = [];
    seedPoolIds.forEach((id, idx) => {
      const poolData = findSeatPoolData(id);
      if (poolData) {
        const pred = evaluateSeatPoolForStudent(poolData, profile, profile.targetRound);
        if (pred) {
          initialChoices.push({
            id: `choice-${id}`,
            seatPoolId: id,
            prediction: pred,
            preferenceRank: idx + 1,
          });
        }
      }
    });

    setChoices(initialChoices);
  }, []);

  // Whenever student profile changes, recompute predictions on existing choices
  const handleProfileChange = (updated: Partial<StudentProfile>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);

    setChoices((prev) =>
      prev.map((item) => {
        const poolData = findSeatPoolData(item.seatPoolId);
        if (poolData) {
          const pred = evaluateSeatPoolForStudent(poolData, newProfile, newProfile.targetRound);
          if (pred) {
            return {
              ...item,
              prediction: pred,
            };
          }
        }
        return item;
      })
    );
  };

  const handleAddChoice = (prediction: PredictionResult) => {
    if (choices.some((c) => c.seatPoolId === prediction.seatPool.id)) return;

    const newChoice: ChoiceItem = {
      id: `choice-${prediction.seatPool.id}`,
      seatPoolId: prediction.seatPool.id,
      prediction,
      preferenceRank: choices.length + 1,
    };
    setChoices([...choices, newChoice]);
  };

  const handleRemoveChoice = (seatPoolId: string) => {
    const filtered = choices
      .filter((c) => c.seatPoolId !== seatPoolId)
      .map((c, idx) => ({ ...c, preferenceRank: idx + 1 }));
    setChoices(filtered);
  };

  const handleMoveChoice = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === choices.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...choices];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    // Renumber preference ranks
    const renumbered = reordered.map((c, idx) => ({ ...c, preferenceRank: idx + 1 }));
    setChoices(renumbered);
  };

  const handleClearList = () => {
    setChoices([]);
  };

  const handleApplyInferredOrdering = (reordered: ChoiceItem[]) => {
    const renumbered = reordered.map((c, idx) => ({ ...c, preferenceRank: idx + 1 }));
    setChoices(renumbered);
  };

  return (
    <div id="cutoffiq-app-root" className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        profile={profile}
        onProfileChange={handleProfileChange}
        activeTab={activeTab}
        onTabChange={(t) => {
          if (t === 'elicitor') {
            setIsElicitorOpen(true);
          } else {
            setActiveTab(t);
          }
        }}
        choicesCount={choices.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'predictor' && (
          <PredictorView
            profile={profile}
            choices={choices}
            onAddChoice={handleAddChoice}
            onRemoveChoice={handleRemoveChoice}
          />
        )}

        {activeTab === 'choicelist' && (
          <ChoiceListBuilder
            choices={choices}
            profile={profile}
            onMoveChoice={handleMoveChoice}
            onRemoveChoice={handleRemoveChoice}
            onClearList={handleClearList}
            onOpenElicitor={() => setIsElicitorOpen(true)}
            onNavigateToPredictor={() => setActiveTab('predictor')}
          />
        )}

        {activeTab === 'floatfreeze' && (
          <FloatFreezeAdvisor
            choices={choices}
            profile={profile}
            onNavigateToPredictor={() => setActiveTab('predictor')}
          />
        )}

        {activeTab === 'backtest' && <BacktestReportView />}

        {activeTab === 'methodology' && <MethodologyView />}
      </main>

      {/* Pairwise Preference Elicitor Modal */}
      <PreferenceElicitorModal
        choices={choices}
        isOpen={isElicitorOpen}
        onClose={() => setIsElicitorOpen(false)}
        onApplyOrdering={handleApplyInferredOrdering}
      />

      {/* Bottom Footer */}
      <footer id="app-footer" className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CutoffIQ Engine • JoSAA &amp; CSAB Counselling Intelligence</span>
          <span className="font-mono text-[11px] text-slate-400">
            Statistical engine verified on 2020–2024 cutoff records
          </span>
        </div>
      </footer>
    </div>
  );
}
