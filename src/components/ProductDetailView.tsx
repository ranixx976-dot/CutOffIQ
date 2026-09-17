import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR, calculateEstimatedDelivery } from '../utils/formatters';
import { ProductCard } from './ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number, monogram?: string) => void;
  onOpenReviews: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onOpenReviews
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.defaultColor);
  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState('');
  const [pincode, setPincode] = useState('560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [added, setAdded] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 4);

  const deliveryDate = calculateEstimatedDelivery(pincode);

  const handleColorSelect = (colorName: string, imageIdx: number) => {
    setSelectedColor(colorName);
    if (product.images[imageIdx]) {
      setSelectedImageIndex(imageIdx);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity, monogram || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center space-x-2">
          <button onClick={() => onSelectProduct('all')} className="hover:text-stone-900">
            Catalog
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-stone-900">{product.name}</span>
        </nav>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] sm:aspect-square bg-white rounded-xl overflow-hidden border border-[#e6e2d8] shadow-sm relative group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#1a1715] text-[#fbf9f5] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#c07a46] ring-2 ring-[#c07a46]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Patina note strip */}
            {product.patinaNote && (
              <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 text-xs text-amber-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#c07a46] shrink-0" />
                <span>
                  <strong>Patina Evolution:</strong> {product.patinaNote}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Purchasing & Experience (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Review strip */}
            <div>
              <div className="flex items-center space-x-2 text-xs text-stone-500 mb-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-stone-900">{product.rating}</span>
                <span className="text-stone-400">&bull;</span>
                <button
                  onClick={onOpenReviews}
                  className="underline hover:text-[#c07a46] font-medium"
                >
                  {product.reviewCount} verified customer reviews
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] leading-tight">
                {product.name}
              </h1>

              {/* One-line Hook */}
              <p className="text-sm font-medium text-[#c07a46] mt-1">
                {product.hook}
              </p>
            </div>

            {/* Price Strip */}
            <div className="flex items-baseline space-x-3 pb-4 border-b border-[#e6e2d8]">
              <span className="text-2xl font-bold text-[#1a1715]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save {formatINR(product.originalPrice - product.price)} (Inclusive of all taxes)
                </span>
              )}
            </div>

            {/* 40-Word Experience Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.experienceDesc}
            </p>

            {/* Variant Selector: Leather Shade */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Leather Color: <span className="text-[#c07a46] capitalize">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color.name, color.imageIndex)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs border transition-all ${
                      selectedColor === color.name
                        ? 'border-[#c07a46] bg-[#c07a46]/10 font-bold text-[#1a1715] ring-1 ring-[#c07a46]'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Monogram Personalization Input */}
            <div className="bg-white p-4 rounded-lg border border-[#e6e2d8] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800">
                  Complimentary Monogram Hot-Stamp
                </label>
                <span className="text-[10px] text-emerald-700 font-semibold uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  Free
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Hand-embossed with heated brass typeface into the grain. Up to 3 initials.
              </p>
              <input
                type="text"
                maxLength={4}
                placeholder="Initials (e.g. K.M.)"
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded font-mono uppercase tracking-widest bg-stone-50 focus:outline-none focus:border-[#c07a46]"
              />
            </div>

            {/* Quantity & Add to Bag */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-600 hover:bg-stone-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-600 hover:bg-stone-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  id="pdp-add-to-bag-button"
                  className="flex-1 py-4 bg-[#c07a46] hover:bg-[#aa6533] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Your Carry Bag</span>
                    </>
                  ) : product.inStock ? (
                    <>
                      <span>Add to Bag &bull; {formatINR(product.price * quantity)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <span>Temporarily Reserved / Sold Out</span>
                  )}
                </button>
              </div>

              {/* Stock status */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span className="flex items-center space-x-1.5 text-emerald-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>In Stock — Only {product.stockCount} workshop pieces remaining</span>
                </span>
                <span className="text-stone-400">Jaipur Tannery Batch #24</span>
              </div>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="pt-3 border-t border-[#e6e2d8] space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Check Express Delivery &amp; Cash on Delivery Availability:
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded bg-white font-mono"
                  />
                </div>
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="px-4 py-1.5 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-[#c07a46] transition-colors"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="text-xs text-stone-600 bg-white p-3 rounded border border-stone-200 space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Truck className="w-4 h-4 text-[#c07a46]" />
                    <span>Estimated Arrival: {deliveryDate}</span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Dispatches from Jaipur within 24 hours. COD &amp; 7-Day Doorstep Returns available for PIN <strong>{pincode}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-stone-600">
              <div className="bg-white p-2.5 rounded border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-[#c07a46] mx-auto mb-1" />
                <span className="font-semibold block text-stone-900">Lifetime Warranty</span>
                <span>On All Brass &amp; Zippers</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-stone-200">
                <RotateCcw className="w-4 h-4 text-[#c07a46] mx-auto mb-1" />
                <span className="font-semibold block text-stone-900">7-Day Doorstep</span>
                <span>Hassle-Free Returns</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-stone-200">
                <Truck className="w-4 h-4 text-[#c07a46] mx-auto mb-1" />
                <span className="font-semibold block text-stone-900">Air Express</span>
                <span>Free Above ₹1,999</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Spec & Care Accordions */}
        <div className="mt-16 bg-white rounded-xl border border-[#e6e2d8] shadow-xs overflow-hidden">
          
          {/* Accordion 1: Technical Specs */}
          <div className="border-b border-[#e6e2d8]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-bold text-[#1a1715] hover:text-[#c07a46] transition-colors"
            >
              <span>4–6 Engineering Specifications</span>
              {openAccordion === 'specs' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'specs' && (
              <div className="px-6 pb-6 text-xs text-stone-600 space-y-3">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-4 marker:text-[#c07a46]">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="leading-relaxed font-medium">
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <strong className="text-stone-900 block">Dimensions &amp; Weight:</strong>
                    <span>{product.dimensions}</span>
                  </div>
                  {product.capacity && (
                    <div>
                      <strong className="text-stone-900 block">Capacity:</strong>
                      <span>{product.capacity}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Materials & Vegetable Tanning */}
          <div className="border-b border-[#e6e2d8]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-bold text-[#1a1715] hover:text-[#c07a46] transition-colors"
            >
              <span>Materials &amp; 30-Day Vegetable Tanning Ritual</span>
              {openAccordion === 'materials' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'materials' && (
              <div className="px-6 pb-6 text-xs text-stone-600 space-y-2">
                <p className="leading-relaxed">
                  Unlike 90% of commercial leather processed with toxic chromium salts in 24 hours, Veylora leather undergoes a 30-day natural bath in crushed acacia bark, chestnut extracts, and pure mimosa oils.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.materials.map((mat, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full font-medium">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Care Instructions */}
          <div className="border-b border-[#e6e2d8]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-bold text-[#1a1715] hover:text-[#c07a46] transition-colors"
            >
              <span>Care Instructions &amp; Scuff Treatment</span>
              {openAccordion === 'care' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'care' && (
              <div className="px-6 pb-6 text-xs text-stone-600 space-y-2">
                <ul className="list-disc pl-4 space-y-1.5 marker:text-[#c07a46]">
                  {product.careInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 4: Lifetime Warranty Details */}
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'warranty' ? null : 'warranty')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-bold text-[#1a1715] hover:text-[#c07a46] transition-colors"
            >
              <span>Lifetime Hardware Guarantee Details</span>
              {openAccordion === 'warranty' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'warranty' && (
              <div className="px-6 pb-6 text-xs text-stone-600 leading-relaxed space-y-2">
                <p>
                  Every Veylora brass rivet, press snap, and YKK Excella® zipper is guaranteed for life. If a mechanical fastener ever fails, email concierge@veylora.com with your order number and we will arrange doorstep pickup and restoration at our Jaipur atelier at zero charge.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* "You May Also Like" Related Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e6e2d8]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c07a46]">
                Curated Companions
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1715] mt-0.5">
                Complete Your Daily Carry
              </h3>
            </div>
            <button
              onClick={() => onSelectProduct('all')}
              className="text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#c07a46] underline"
            >
              View Full Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onSelect={onSelectProduct}
                onQuickAdd={(p, col) => onAddToCart(p, col, 1)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#e6e2d8] p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#1a1715] block truncate max-w-[160px]">
            {product.name}
          </span>
          <span className="text-sm font-bold text-[#c07a46]">{formatINR(product.price)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="px-6 py-2.5 bg-[#c07a46] text-white rounded-md text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#aa6533] transition-colors"
        >
          {added ? 'Added to Bag' : 'Add to Bag'}
        </button>
      </div>

    </div>
  );
};
