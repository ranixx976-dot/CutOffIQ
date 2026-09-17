import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { Star, Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickAdd: (product: Product, selectedColor: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  onQuickView
}) => {
  const [selectedColor, setSelectedColor] = useState(product.defaultColor);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleColorChange = (colorName: string, imageIndex: number) => {
    setSelectedColor(colorName);
    if (product.images[imageIndex]) {
      setCurrentImageIndex(imageIndex);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      className="group bg-white rounded-lg border border-[#e6e2d8] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1a1715] text-[#fbf9f5] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={handleEyeClick}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs text-stone-700 hover:text-[#c07a46] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Quick Preview"
            aria-label="Quick preview product"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Quick Add overlay button on mobile/desktop */}
        <div className="absolute inset-x-3 bottom-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddClick}
            disabled={!product.inStock}
            className="w-full py-2.5 px-3 bg-[#1a1715]/95 hover:bg-[#c07a46] text-white text-xs font-semibold uppercase tracking-wider rounded backdrop-blur-xs transition-colors flex items-center justify-center space-x-1.5 shadow-md"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : product.inStock ? (
              <>
                <Plus className="w-4 h-4" />
                <span>Quick Add &bull; {selectedColor}</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Rating Strip */}
          <div className="flex items-center space-x-1 text-xs text-stone-500 mb-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-stone-800">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#1a1715] group-hover:text-[#c07a46] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{product.tagline}</p>
        </div>

        <div>
          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5 py-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name, color.imageIndex)}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-offset-1 ring-[#c07a46] scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[10px] text-stone-400 ml-1 font-medium">{selectedColor}</span>
          </div>

          {/* Price Strip */}
          <div className="flex items-baseline space-x-2 pt-1 border-t border-stone-100">
            <span className="text-sm font-bold text-[#1a1715]">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Save {formatINR(product.originalPrice - product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
