import React from 'react';
import { LIFESTYLE_GALLERY } from '../data/products';
import { Instagram } from 'lucide-react';

export const LifestyleGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#e6e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46] mb-1">
            <Instagram className="w-3.5 h-3.5" />
            <span>#CarryVeylora</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715]">
            Seen in Transit
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            From Indiranagar coffee bars to terminal lounges across the world.
          </p>
        </div>

        {/* 6-Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {LIFESTYLE_GALLERY.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-lg overflow-hidden bg-stone-100 shadow-xs border border-stone-200 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium line-clamp-2 leading-tight">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
