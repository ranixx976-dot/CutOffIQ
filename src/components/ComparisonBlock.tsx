import React from 'react';
import { COMPARISON_DATA } from '../data/products';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ComparisonBlock: React.FC = () => {
  return (
    <section className="py-20 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            The Honest Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] mt-1">
            Why Veylora Stands Alone
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            We reject the disposable shortcuts taken by mass fashion labels and synthetic &ldquo;genuine leather&rdquo; brands.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="bg-white rounded-xl border border-[#e6e2d8] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#e6e2d8] bg-stone-100/70 text-xs font-bold uppercase tracking-wider text-stone-700 py-3.5 px-6">
            <div className="md:col-span-3">Core Dimension</div>
            <div className="md:col-span-4 text-[#c07a46] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Veylora Standard</span>
            </div>
            <div className="md:col-span-3 text-stone-500 hidden md:block">
              Typical Fast-Fashion Brand
            </div>
            <div className="md:col-span-2 text-stone-700 hidden md:block">
              Real Impact
            </div>
          </div>

          <div className="divide-y divide-[#e6e2d8]">
            {COMPARISON_DATA.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 gap-3 md:gap-4 items-center hover:bg-stone-50/50 transition-colors"
              >
                {/* Dimension */}
                <div className="md:col-span-3 font-serif font-bold text-base text-[#1a1715]">
                  {item.feature}
                </div>

                {/* Veylora Feature */}
                <div className="md:col-span-4 bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 text-xs text-stone-900 font-medium">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item.veylora}</span>
                  </div>
                </div>

                {/* Fast Fashion Feature */}
                <div className="md:col-span-3 text-xs text-stone-500 flex items-start space-x-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5 md:inline hidden" />
                  <div>
                    <span className="md:hidden font-semibold text-stone-700 block mb-0.5">Typical Alternative:</span>
                    <span>{item.typical}</span>
                  </div>
                </div>

                {/* Customer Benefit */}
                <div className="md:col-span-2 text-xs font-medium text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-200/60">
                  <span className="md:hidden font-bold text-stone-900 block mb-0.5">Why it matters:</span>
                  {item.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
