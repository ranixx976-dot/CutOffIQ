import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle2, Quote } from 'lucide-react';

interface SocialProofProps {
  onViewAllReviews: () => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({ onViewAllReviews }) => {
  return (
    <section className="py-20 bg-white border-b border-[#e6e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#e6e2d8] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
              Real Owners • Real Patina
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] mt-1">
              Field Notes from our Community
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Rated 4.9 / 5 across 1,840+ verified doorstep deliveries.
            </p>
          </div>

          <button
            onClick={onViewAllReviews}
            className="text-xs font-bold uppercase tracking-wider text-[#1a1715] hover:text-[#c07a46] underline transition-colors self-start sm:self-auto"
          >
            Read All 1,840+ Verified Reviews
          </button>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#fbf9f5] p-6 rounded-xl border border-[#e6e2d8] flex flex-col justify-between shadow-xs hover:border-[#c07a46]/50 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                {/* Review Title */}
                <h4 className="font-serif text-base font-bold text-[#1a1715] leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h4>

                {/* Content */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Author & Product */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center space-x-3">
                {review.userImage && (
                  <img
                    src={review.userImage}
                    alt={review.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-stone-300 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-[#1a1715] truncate">{review.author}</h5>
                  <p className="text-[11px] text-stone-500">
                    {review.city} • Bought <strong className="text-stone-700">{review.productBought}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
