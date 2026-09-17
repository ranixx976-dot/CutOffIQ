import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { X, Star, ShieldCheck, Check, Plus, Minus, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number, monogram?: string) => void;
  onViewFullDetails: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetails
}) => {
  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor || product.defaultColor, quantity, monogram || undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#fbf9f5] w-full max-w-3xl rounded-xl shadow-2xl border border-[#e6e2d8] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full backdrop-blur-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery View */}
          <div className="p-6 bg-stone-100/60 flex flex-col justify-between">
            <div className="aspect-square rounded-lg overflow-hidden bg-white border border-stone-200">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-md overflow-hidden border shrink-0 transition-all ${
                    selectedImage === idx
                      ? 'border-[#c07a46] ring-2 ring-[#c07a46]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Action */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-1 text-xs text-stone-500 mb-1">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-semibold text-stone-800">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1a1715]">{product.name}</h3>
              <p className="text-xs text-stone-500 mt-1">{product.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline space-x-2.5 mt-3">
                <span className="text-xl font-bold text-[#1a1715]">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  In Stock • Dispatch in 24h
                </span>
              </div>

              {/* Color selection */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Selected Leather: <span className="text-[#c07a46]">{selectedColor || product.defaultColor}</span>
                </label>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        if (product.images[color.imageIndex]) setSelectedImage(color.imageIndex);
                      }}
                      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
                        (selectedColor || product.defaultColor) === color.name
                          ? 'border-[#c07a46] bg-[#c07a46]/10 font-semibold text-[#1a1715]'
                          : 'border-stone-300 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Monogram option */}
              <div className="mt-4 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Complimentary Monogram Hot-Stamp (Optional)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Initials (e.g. K.M.)"
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded uppercase font-mono tracking-widest focus:border-[#c07a46]"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Blind debossed by hand with brass heated typeface.
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-100 text-stone-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-100 text-stone-600"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className="flex-1 py-3 bg-[#c07a46] text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#aa6533] transition-colors flex items-center justify-center space-x-2 shadow-md"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag &bull; {formatINR(product.price * quantity)}</span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetails(product.id);
                  }}
                  className="text-stone-600 hover:text-[#c07a46] underline font-medium flex items-center space-x-1"
                >
                  <span>View Full Specs &amp; Customer Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1 text-stone-500 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c07a46]" />
                  <span>Lifetime Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
