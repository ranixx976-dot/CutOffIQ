import React from 'react';
import { ArrowRight, Award, Compass, Feather } from 'lucide-react';

interface BrandStoryProps {
  onLearnMore: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Left: Workshop & Bench Photo with aesthetic overlap */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#e6e2d8] relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                alt="Jaipur Leather Workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small Overlaid Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-6 z-20 bg-[#1a1715] text-white p-5 rounded-xl border border-stone-700 shadow-xl max-w-[240px]">
              <span className="font-serif text-2xl font-bold text-[#c07a46] block">30 Days</span>
              <p className="text-xs text-stone-300 mt-1 leading-snug">
                Traditional vegetable tanning using natural tree bark and mimosa oils.
              </p>
            </div>
          </div>

          {/* Story Right: 100-word origin story */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
                The Veylora Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1715] leading-tight">
                Crafted for decades, not seasons.
              </h2>
            </div>

            {/* Exactly ~100 words */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              In 2022, Kabir Mehta founded Veylora after growing exhausted by luxury labels charging 10x markups for synthetic &ldquo;genuine leather&rdquo; that cracked within months. Partnering with second-generation tanners in Jaipur and industrial engineers in Bengaluru, we set out to build zero-compromise everyday carry. Every Veylora piece is cut from certified full-grain bovine hide, stitched with German bonded thread, and fitted with solid brass hardware. We eliminate retail middlemen to put heirloom craftsmanship directly into your hands — built to record your life&rsquo;s travels and patina into a signature shade that is uniquely yours.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-200 text-xs">
              <div className="flex items-center space-x-2 text-stone-700">
                <Feather className="w-4 h-4 text-[#c07a46]" />
                <span className="font-semibold">Zero Synthetic Fillers</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-700">
                <Award className="w-4 h-4 text-[#c07a46]" />
                <span className="font-semibold">LWG Gold Certified Tannery</span>
              </div>
            </div>

            <div>
              <button
                onClick={onLearnMore}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#1a1715] hover:text-[#c07a46] border-b-2 border-[#1a1715] hover:border-[#c07a46] pb-1 transition-all"
              >
                <span>Read Full Tannery &amp; Workshop Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
