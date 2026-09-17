import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatters';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Tag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: { code: string; discountAmount: number } | null;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  onStartShopping: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1999;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  onStartShopping
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = isFreeShipping ? 0 : 150;
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FIRST500') {
      if (subtotal < 2000) {
        setPromoError('Code FIRST500 requires minimum order of ₹2,000');
        return;
      }
      onApplyPromo('FIRST500');
      setPromoInput('');
    } else if (code === 'PATINA10') {
      onApplyPromo('PATINA10');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try FIRST500 or PATINA10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] border-l border-[#e6e2d8] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#e6e2d8] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold text-[#1a1715]">Your Bag</span>
              <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-[#1a1715] transition-colors rounded-full hover:bg-stone-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#f2efe9] px-5 py-3 border-b border-[#e6e2d8] text-xs">
            <div className="flex items-center space-x-2 mb-1.5 font-medium text-stone-800">
              <Truck className="w-4 h-4 text-[#c07a46]" />
              {isFreeShipping && subtotal > 0 ? (
                <span className="text-emerald-800 font-semibold">
                  You have unlocked FREE Express Pan-India Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#c07a46]">{formatINR(amountNeededForFreeShipping)}</strong> more for FREE Express Shipping
                </span>
              )}
            </div>
            <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#c07a46] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <Truck className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1a1715]">Your carry bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our collection of full-grain vegetable-tanned wallets, folios, and travel duffels.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="px-6 py-2.5 bg-[#1a1715] text-[#fbf9f5] rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#c07a46] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 p-3 bg-white rounded-lg border border-[#e6e2d8] relative shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-md border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-[#1a1715] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors ml-2 p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-stone-500 mt-0.5 flex items-center space-x-2">
                      <span>Leather: {item.color}</span>
                    </div>

                    {item.monogram && (
                      <div className="text-[11px] text-[#c07a46] font-medium bg-[#c07a46]/10 px-2 py-0.5 rounded mt-1 inline-block">
                        Monogram: &ldquo;{item.monogram}&rdquo;
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-300 rounded bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1a1715]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Pricing & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#e6e2d8] p-5 bg-white space-y-3">
              {/* Discount Code Section */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Discount code (e.g. FIRST500)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-stone-300 rounded bg-stone-50 uppercase focus:outline-none focus:border-[#c07a46]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-[#c07a46] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}

              {/* Promo suggestion pill */}
              {!appliedPromo && (
                <div className="flex items-center space-x-2 text-[11px] text-stone-500">
                  <span>Available:</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (subtotal >= 2000) onApplyPromo('FIRST500');
                      else setPromoError('FIRST500 requires ₹2,000+ order');
                    }}
                    className="underline text-[#c07a46] hover:text-[#aa6533] font-mono"
                  >
                    FIRST500 (₹500 off)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onApplyPromo('PATINA10')}
                    className="underline text-[#c07a46] hover:text-[#aa6533] font-mono"
                  >
                    PATINA10 (10% off)
                  </button>
                </div>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded border border-emerald-200">
                  <span className="font-medium">
                    Code <strong className="font-mono">{appliedPromo.code}</strong> applied (-{formatINR(appliedPromo.discountAmount)})
                  </span>
                  <button
                    onClick={onRemovePromo}
                    className="text-emerald-700 hover:text-red-600 font-bold"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatINR(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-700 uppercase">FREE</strong> : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1a1715] pt-1.5 border-t border-stone-200">
                  <span>Total Due</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                id="proceed-checkout-button"
                className="w-full py-3 bg-[#c07a46] text-white rounded-md font-semibold text-xs uppercase tracking-wider hover:bg-[#aa6533] transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Reassurances */}
              <div className="pt-2 flex items-center justify-center space-x-4 text-[10px] text-stone-500">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-[#c07a46]" />
                  <span>256-Bit SSL</span>
                </div>
                <span>•</span>
                <span>7-Day Returns</span>
                <span>•</span>
                <span>Lifetime Warranty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
