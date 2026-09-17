import React from 'react';
import { ArrowRight, Shield, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onStoryClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#1a1715] text-[#fbf9f5]">
      {/* Background Photography with warm editorial grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85"
          alt="Artisanal leather craftsmanship"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1715] via-[#1a1715]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1715] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[82vh]">
        <div className="max-w-2xl space-y-6">
          
          {/* Subtle Craft Tag */}
          <div className="inline-flex items-center space-x-2 bg-stone-800/80 border border-stone-700/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs text-stone-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#c07a46]" />
            <span>Certified LWG Gold-Rated Vegetable Tanned Hide</span>
          </div>

          {/* Headline: Under 8 words stating customer outcome */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Carry Fewer, Better Things Every Day.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-xl">
            Handcrafted vegetable-tanned leather essentials built to age gracefully through every commute, flight, and boardroom meeting.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onShopClick}
              id="hero-shop-now-cta"
              className="px-8 py-4 bg-[#c07a46] hover:bg-[#aa6533] text-white text-xs font-semibold uppercase tracking-widest rounded transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2 group"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStoryClick}
              id="hero-story-cta"
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-stone-200 hover:text-white border border-stone-500/80 text-xs font-semibold uppercase tracking-widest rounded transition-all flex items-center justify-center"
            >
              Our Craft &amp; Story
            </button>
          </div>

          {/* Proof Metrics Strip */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="font-serif text-2xl font-bold text-white">14,200+</div>
              <div className="text-xs text-stone-400 mt-0.5">Orders Delivered</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-white flex items-center">
                <span>4.9</span>
                <span className="text-amber-400 text-base ml-1">★</span>
              </div>
              <div className="text-xs text-stone-400 mt-0.5">1,840+ Reviews</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-white">Lifetime</div>
              <div className="text-xs text-stone-400 mt-0.5">Hardware Warranty</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
