import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product, selectedColor: string) => void;
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onQuickView,
  onViewAll
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#e6e2d8] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
              Handcrafted in Limited Runs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] mt-1">
              The Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Proven everyday companions carried by over 14,000 professionals across India and abroad.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1715] hover:text-[#c07a46] transition-colors self-start sm:self-auto"
          >
            <span>View All Pieces ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
