import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryTilesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-white border-y border-[#e6e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            Form Meets Daily Utility
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] mt-1">
            Curated Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Engineered silhouettes designed to eliminate clutter from your daily journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-md border border-[#e6e2d8]"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1715] via-[#1a1715]/40 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded">
                    {cat.itemCount}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#c07a46] transition-colors flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold mt-3 group-hover:text-[#c07a46] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 font-normal line-clamp-1">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
