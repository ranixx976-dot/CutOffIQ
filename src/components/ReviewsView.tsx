import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { ProductReview } from '../types';
import { Star, CheckCircle2, ThumbsUp, Filter, MessageSquare } from 'lucide-react';

interface ReviewsViewProps {
  onShopClick: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onShopClick }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const extendedReviews: ProductReview[] = [
    ...REVIEWS,
    {
      id: 'rev-4',
      author: 'Kavita Sundaram',
      city: 'Chennai',
      rating: 5,
      date: '19 August 2024',
      title: 'The Nomad Sleeve fits my M3 Air like a tailored glove.',
      content: 'I love that the magnetic closure has zero velcro noise. In boardrooms, opening my laptop doesn’t make a loud screech. The leather has a subtle cedar and bark aroma. Outstanding craftsmanship.',
      verified: true,
      productBought: 'The Nomad Cord & Laptop Sleeve',
      helpfulCount: 29,
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'rev-5',
      author: 'Rohit Balakrishnan',
      city: 'Hyderabad',
      rating: 5,
      date: '02 September 2024',
      title: 'KeyWrap eliminated my pocket jingle forever.',
      content: 'I was worried the brass screw might loosen with daily use, but three months of bike commuting and it has stayed tight as a vault. AirTag slot works flawlessly with Find My.',
      verified: true,
      productBought: 'The KeyWrap & AirTag Holster',
      helpfulCount: 17,
      userImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'rev-6',
      author: 'Meera Chawla',
      city: 'Pune',
      rating: 5,
      date: '11 July 2024',
      title: 'Monogram debossing is exceptionally clean.',
      content: 'Had my initials M.C. embossed in blind stamp on the Journal Folio. It came packaged in a reusable cotton dust bag with a handwritten thank-you card from the Jaipur team. Rare level of care.',
      verified: true,
      productBought: 'The Journal Folio & Pen Quiver',
      helpfulCount: 22,
      userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const filteredReviews = selectedRating
    ? extendedReviews.filter((r) => r.rating === selectedRating)
    : extendedReviews;

  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            Community Field Reports
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1715]">
            Verified Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Real experiences from professionals who carry Veylora daily across 28 Indian states and international cities.
          </p>
        </div>

        {/* Aggregate Ratings Scorecard */}
        <div className="bg-white p-8 rounded-2xl border border-[#e6e2d8] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-6">
            <span className="font-serif text-5xl font-bold text-[#1a1715]">4.9</span>
            <div className="flex justify-center md:justify-start items-center text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Based on <strong>1,840 verified deliveries</strong>
            </p>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium mt-2 inline-block border border-emerald-200">
              98.4% Would Recommend to Colleagues
            </span>
          </div>

          <div className="md:col-span-8 space-y-2 text-xs">
            <div className="flex items-center space-x-3">
              <span className="w-12 text-stone-600 font-medium">5 Stars</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#c07a46] h-full w-[91%]" />
              </div>
              <span className="w-12 text-right text-stone-500 font-mono">91%</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-12 text-stone-600 font-medium">4 Stars</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#c07a46] h-full w-[8%]" />
              </div>
              <span className="w-12 text-right text-stone-500 font-mono">8%</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-12 text-stone-600 font-medium">3 Stars</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#c07a46] h-full w-[1%]" />
              </div>
              <span className="w-12 text-right text-stone-500 font-mono">1%</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-12 text-stone-600 font-medium">2 Stars</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#c07a46] h-full w-[0%]" />
              </div>
              <span className="w-12 text-right text-stone-500 font-mono">0%</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-12 text-stone-600 font-medium">1 Star</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#c07a46] h-full w-[0%]" />
              </div>
              <span className="w-12 text-right text-stone-500 font-mono">0%</span>
            </div>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between border-b border-[#e6e2d8] pb-4 text-xs">
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-600 font-semibold">Filter Reviews:</span>
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                selectedRating === null
                  ? 'bg-[#1a1715] text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              All Ratings ({extendedReviews.length})
            </button>
            <button
              onClick={() => setSelectedRating(5)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                selectedRating === 5
                  ? 'bg-[#1a1715] text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              5 Stars Only
            </button>
          </div>

          <button
            onClick={onShopClick}
            className="text-xs font-semibold text-[#c07a46] hover:underline"
          >
            Explore Best Sellers &rarr;
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#c07a46]/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400">{review.date}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#1a1715] leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  {review.userImage && (
                    <img
                      src={review.userImage}
                      alt={review.author}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-stone-200"
                    />
                  )}
                  <div>
                    <span className="font-bold text-stone-900 block">{review.author}</span>
                    <span className="text-[10px] text-stone-400">
                      {review.city} • Verified Owner of <strong>{review.productBought}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[11px] text-stone-400">
                  <ThumbsUp className="w-3 h-3 text-[#c07a46]" />
                  <span>{review.helpfulCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
