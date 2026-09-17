import React from 'react';
import { StudentProfile, ExamType, SeatCategory, GenderPool } from '../types';
import { Sliders, ShieldCheck, Award, Layers, HelpCircle, CheckCircle2, TrendingUp } from 'lucide-react';

interface HeaderProps {
  profile: StudentProfile;
  onProfileChange: (updated: Partial<StudentProfile>) => void;
  activeTab: 'predictor' | 'choicelist' | 'elicitor' | 'floatfreeze' | 'backtest' | 'methodology';
  onTabChange: (tab: 'predictor' | 'choicelist' | 'elicitor' | 'floatfreeze' | 'backtest' | 'methodology') => void;
  choicesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onProfileChange,
  activeTab,
  onTabChange,
  choicesCount,
}) => {
  return (
    <header id="main-header" className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand & nav bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 gap-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div id="cutoffiq-logo-badge" className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-900/30 ring-1 ring-white/20">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-black tracking-tight text-white flex items-center">
                  <span>Cutoff</span>
                  <span className="text-indigo-400 font-extrabold ml-0.5">IQ</span>
                </h1>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                  JoSAA &amp; CSAB 2025/26
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Calibrated cutoff intelligence &amp; strategy-proof choice optimization
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav id="nav-tabs" className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              id="tab-btn-predictor"
              onClick={() => onTabChange('predictor')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'predictor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Cutoff Predictor</span>
            </button>

            <button
              id="tab-btn-choicelist"
              onClick={() => onTabChange('choicelist')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'choicelist'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Choice List</span>
              {choicesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
                  {choicesCount}
                </span>
              )}
            </button>

            <button
              id="tab-btn-elicitor"
              onClick={() => onTabChange('elicitor')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'elicitor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>⚖️</span>
              <span>Preferences</span>
            </button>

            <button
              id="tab-btn-floatfreeze"
              onClick={() => onTabChange('floatfreeze')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'floatfreeze'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🔀</span>
              <span>Float / Freeze</span>
            </button>

            <button
              id="tab-btn-backtest"
              onClick={() => onTabChange('backtest')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'backtest'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Backtest &amp; Calibration</span>
            </button>

            <button
              id="tab-btn-methodology"
              onClick={() => onTabChange('methodology')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'methodology'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Methodology</span>
            </button>
          </nav>
        </div>

        {/* Global Student Profile Config Bar */}
        <div id="student-profile-bar" className="py-2.5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
          {/* Exam Type Toggle */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium">Exam:</span>
            <div className="inline-flex rounded-md p-0.5 bg-slate-800 border border-slate-700">
              <button
                id="btn-exam-adv"
                type="button"
                onClick={() => onProfileChange({ examType: 'JEE_ADVANCED' })}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  profile.examType === 'JEE_ADVANCED'
                    ? 'bg-indigo-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                JEE Advanced (IITs)
              </button>
              <button
                id="btn-exam-main"
                type="button"
                onClick={() => onProfileChange({ examType: 'JEE_MAIN' })}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  profile.examType === 'JEE_MAIN'
                    ? 'bg-indigo-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                JEE Main (NITs/IIITs)
              </button>
            </div>
          </div>

          {/* Student Rank Input */}
          <div className="flex items-center space-x-1.5">
            <label htmlFor="input-student-rank" className="text-slate-400 font-medium">
              Rank:
            </label>
            <div className="relative">
              <input
                id="input-student-rank"
                type="number"
                min="1"
                max="250000"
                value={profile.rank}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val > 0) {
                    onProfileChange({ rank: val });
                  }
                }}
                className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-100 font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
              />
              <span className="text-[10px] text-slate-500 ml-1">AIR / Cat-Rank</span>
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex items-center space-x-1.5">
            <label htmlFor="select-category" className="text-slate-400 font-medium">
              Category:
            </label>
            <select
              id="select-category"
              value={profile.category}
              onChange={(e) => onProfileChange({ category: e.target.value as SeatCategory })}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="OPEN">OPEN (General)</option>
              <option value="EWS">GEN-EWS</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          {/* Gender Pool Selector */}
          <div className="flex items-center space-x-1.5">
            <label htmlFor="select-gender" className="text-slate-400 font-medium">
              Gender Pool:
            </label>
            <select
              id="select-gender"
              value={profile.genderPool}
              onChange={(e) => onProfileChange({ genderPool: e.target.value as GenderPool })}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="Gender-Neutral">Gender-Neutral</option>
              <option value="Female-only">Female-only (Supernumerary)</option>
            </select>
          </div>

          {/* Target Round Toggle */}
          <div className="flex items-center space-x-1.5 ml-auto">
            <span className="text-slate-400 font-medium">Target Round:</span>
            <div className="inline-flex rounded-md p-0.5 bg-slate-800 border border-slate-700">
              <button
                id="btn-round-1"
                type="button"
                onClick={() => onProfileChange({ targetRound: 1 })}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  profile.targetRound === 1
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Round 1 (First Allocation)
              </button>
              <button
                id="btn-round-6"
                type="button"
                onClick={() => onProfileChange({ targetRound: 6 })}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  profile.targetRound === 6
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Round 6 (Final Closing)
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
