import React from 'react';
import { PageType, ProductCategory } from '../types';
import { ShieldCheck, ArrowRight, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-[#1a1715] text-[#fbf9f5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-xs">
          
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl tracking-[0.2em] font-bold text-white block">
                VEYLORA
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c07a46] font-medium block">
                Artisanal Full-Grain Goods
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm">
              Handcrafted in small batches across our Jaipur and Bengaluru workshops. We engineer timeless everyday carry from certified vegetable-tanned bovine hide, designed to outlive trends and patina with pride.
            </p>

            <div className="flex items-center space-x-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-[#c07a46]" />
              <span className="font-medium">Backed by Veylora Lifetime Hardware Guarantee</span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Collections
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Leather Pieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('wallets');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Wallets &amp; Cardholders
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('tech');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tech Folios &amp; Sleeves
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bags');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Weekenders &amp; Backpacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('accessories');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  EDC &amp; Desk Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Concierge Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors">
                  Shipping &amp; Express Timelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors">
                  7-Day Doorstep Returns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Vegetable Tanning &amp; Patina Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Lifetime Hardware Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors">
                  Verified Owner Reviews (4.9 ★)
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Workshop
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#c07a46] shrink-0 mt-0.5" />
                <span>Sitapura Industrial Area, Jaipur &bull; Indiranagar, Bengaluru</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#c07a46] shrink-0" />
                <span>concierge@veylora.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#c07a46] shrink-0" />
                <span>+91 80 4920 8400 (Mon–Sat, 10am–7pm)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="text-[11px] font-semibold text-[#c07a46] hover:underline flex items-center space-x-1"
              >
                <span>Message Workshop Concierge</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Payment methods & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Veylora Goods Private Limited. All rights reserved. Built for decades, not seasons.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center space-x-3 text-stone-400 font-mono">
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              Instant UPI
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              RuPay
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              Visa / Mastercard
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              NetBanking
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
