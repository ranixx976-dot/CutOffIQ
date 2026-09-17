import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface ShippingReturnsViewProps {
  onShopClick: () => void;
}

export const ShippingReturnsView: React.FC<ShippingReturnsViewProps> = ({ onShopClick }) => {
  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            Transparent Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1715]">
            Shipping &amp; 7-Day Doorstep Returns
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            We partner exclusively with premium air express networks to ensure your artisanal leather goods arrive safely and without delay.
          </p>
        </div>

        {/* Shipping Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs space-y-2">
            <Clock className="w-5 h-5 text-[#c07a46]" />
            <h3 className="font-serif text-base font-bold text-stone-900">Same-Day Dispatch</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Orders placed before 2:00 PM IST (Monday through Saturday) are packed and dispatched the very same afternoon from our Jaipur atelier.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs space-y-2">
            <Truck className="w-5 h-5 text-[#c07a46]" />
            <h3 className="font-serif text-base font-bold text-stone-900">Complimentary Express</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              All orders above ₹1,999 qualify for Free BlueDart Air Express shipping across all serviceable Indian PIN codes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e6e2d8] shadow-xs space-y-2">
            <RotateCcw className="w-5 h-5 text-[#c07a46]" />
            <h3 className="font-serif text-base font-bold text-stone-900">7-Day Reverse Pickup</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Need a different shade or silhouette? BlueDart picks up from your doorstep at zero charge. No awkward interrogation.
            </p>
          </div>
        </div>

        {/* Delivery Timelines Table */}
        <div className="bg-white rounded-xl border border-[#e6e2d8] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1a1715]">
            Pan-India Delivery Timelines
          </h2>

          <div className="divide-y divide-stone-200 text-xs">
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-stone-900">
                Tier-1 Metros (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata)
              </span>
              <span className="text-[#c07a46] font-semibold">24 to 48 Hours via Air Express</span>
            </div>
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-stone-900">
                Tier-2 Regional Hubs (Pune, Ahmedabad, Jaipur, Chandigarh, Kochi, Lucknow)
              </span>
              <span className="text-[#c07a46] font-semibold">2 to 3 Business Days</span>
            </div>
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-stone-900">
                Rest of India &amp; Special Postal Regions (J&amp;K, North East, Remote Talukas)
              </span>
              <span className="text-[#c07a46] font-semibold">3 to 5 Business Days</span>
            </div>
          </div>
        </div>

        {/* 7-Step Return Process */}
        <div className="bg-[#1a1715] text-[#fbf9f5] rounded-xl p-8 sm:p-10 space-y-6 border border-stone-800">
          <h2 className="font-serif text-2xl font-bold text-white">
            How the 7-Day Doorstep Return Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-300">
            <div className="space-y-2">
              <span className="font-mono text-[#c07a46] font-bold text-lg">01</span>
              <h4 className="text-white font-bold text-sm">Notify Us</h4>
              <p className="leading-relaxed">
                Send your order ID to <strong className="text-white">returns@veylora.com</strong> or WhatsApp our concierge within 7 days of doorstep receipt.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[#c07a46] font-bold text-lg">02</span>
              <h4 className="text-white font-bold text-sm">Reverse Pickup</h4>
              <p className="leading-relaxed">
                BlueDart will visit your home or office with a pre-printed AWB shipping label. Pack the piece in its original dust bag and box.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[#c07a46] font-bold text-lg">03</span>
              <h4 className="text-white font-bold text-sm">Instant Credit or Refund</h4>
              <p className="leading-relaxed">
                Upon quick check at our workshop, your refund is credited back to your UPI or original card within 24–48 hours.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 pt-4 border-t border-stone-800">
            * Note: Custom pieces featuring bespoke monogram blind-stamps cannot be returned unless an atelier defect is present.
          </p>
        </div>

      </div>
    </div>
  );
};
