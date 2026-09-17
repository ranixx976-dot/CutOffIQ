import React, { useState } from 'react';
import { Award, Compass, Feather, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onShopClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onShopClick }) => {
  const [patinaStage, setPatinaStage] = useState<'day1' | 'month6' | 'year3'>('day1');

  const patinaStages = {
    day1: {
      title: 'Day 1: Unboxed Character',
      desc: 'Firm, velvety matte surface with a subtle dry tactile grain. The natural bovine pores and light neck wrinkles are clearly visible, confirming authentic full-grain pedigree without plastic coating.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    },
    month6: {
      title: 'Month 6: The Caramel Glow',
      desc: 'Daily contact with natural oils from your palms and exposure to ambient UV light transforms the leather. The corners deepen by two shades into a rich warm honey caramel, and surface micro-buffs create a luxurious soft-touch sheen.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    },
    year3: {
      title: 'Year 3+: Heirloom Vintage Patina',
      desc: 'The piece softens into a completely supple drape while maintaining structural integrity. Burnished edges turn glass-smooth. Scuffs from airport gates and coffee shops blend into a unique, storied surface that cannot be bought off a shelf.',
      image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80'
    }
  };

  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            The Atelier Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1715] leading-tight">
            Crafted for decades, not seasons.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            We exist to reject fast-fashion consumerism and disposable plastic accessories. In our Jaipur and Bengaluru workshops, every hide is treated as an heirloom canvas.
          </p>
        </div>

        {/* Origin Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e6e2d8] shadow-sm">
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1715]">
              Why Kabir Mehta Started Veylora in 2022
            </h2>
            <p>
              Like many working professionals, Kabir had purchased luxury leather bags that carried four-figure European price tags, only to discover that the handles were bonded with cardboard pulp and the &ldquo;genuine leather&rdquo; label masked paper-thin splits coated in polyurethane.
            </p>
            <p>
              Within six months of daily Mumbai monsoon commutes, the edges peeled like old sunburn, and customer care dismissed it as &ldquo;standard wear and tear.&rdquo;
            </p>
            <p>
              He spent 14 months traveling across the historic tannery corridors of Rajasthan and Tamil Nadu, partnering with multi-generational master artisans who still practiced 30-day vegetable tanning. The mission was pure: create everyday carry with zero shortcuts, honest direct-to-consumer pricing, and hardware that outlasts a lifetime.
            </p>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan at work"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Patina Evolution Showcase */}
        <div className="bg-[#1a1715] text-[#fbf9f5] p-8 sm:p-12 rounded-2xl border border-stone-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c07a46] block mb-1">
              Living Material
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Living Patina Timeline
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              Unlike synthetic materials that degrade with age, vegetable-tanned leather actually improves. Explore how your piece evolves over years of travel.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex space-x-2 border-b border-stone-800 pb-4">
            {(['day1', 'month6', 'year3'] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setPatinaStage(stage)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  patinaStage === stage
                    ? 'bg-[#c07a46] text-white'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {stage === 'day1' ? 'Day 1' : stage === 'month6' ? '6 Months' : 'Year 3+'}
              </button>
            ))}
          </div>

          {/* Current Stage Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-white">
                {patinaStages[patinaStage].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {patinaStages[patinaStage].desc}
              </p>
            </div>
            <div className="md:col-span-5 aspect-square rounded-xl overflow-hidden border border-stone-700 shadow-xl">
              <img
                src={patinaStages[patinaStage].image}
                alt={patinaStages[patinaStage].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Veylora */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] space-y-2">
            <Feather className="w-5 h-5 text-[#c07a46]" />
            <h4 className="font-serif text-base font-bold text-stone-900">Zero Synthetic Fillers</h4>
            <p className="text-stone-500 leading-relaxed">
              No cardboard liners, no artificial vinyl backing, no fake grain presses. Every component is solid leather and brass.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] space-y-2">
            <Award className="w-5 h-5 text-[#c07a46]" />
            <h4 className="font-serif text-base font-bold text-stone-900">LWG Gold Certified</h4>
            <p className="text-stone-500 leading-relaxed">
              All raw hides sourced from Leather Working Group Gold-rated tanneries adhering to strict zero-discharge effluent standards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] space-y-2">
            <Compass className="w-5 h-5 text-[#c07a46]" />
            <h4 className="font-serif text-base font-bold text-stone-900">German Bonded Thread</h4>
            <p className="text-stone-500 leading-relaxed">
              Stitched using Serafil heavy-gauge continuous filament polyester thread rated to 180N tensile breaking force.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#c07a46]" />
            <h4 className="font-serif text-base font-bold text-stone-900">Lifetime Repair Pledge</h4>
            <p className="text-stone-500 leading-relaxed">
              If a brass fastener or zipper ever malfunctions, our workshop artisans repair it for free for life.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center py-10 bg-white rounded-2xl border border-[#e6e2d8] p-8 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1715]">
            Experience Heirlooms in Your Daily Life
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Browse our small-batch releases and select a companion for your next decade of commutes and travels.
          </p>
          <button
            onClick={onShopClick}
            className="px-8 py-3.5 bg-[#c07a46] hover:bg-[#aa6533] text-white rounded text-xs font-bold uppercase tracking-widest shadow-md transition-colors inline-flex items-center space-x-2"
          >
            <span>Explore the Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
