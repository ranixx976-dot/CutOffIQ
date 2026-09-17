import React, { useState } from 'react';
import { PageType, Product, ProductCategory } from '../types';
import { ShoppingBag, Search, Menu, X, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { SearchAutocomplete } from './SearchAutocomplete';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, selectedProductId?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  onSearchQuerySelect?: (query: string, category?: ProductCategory) => void;
  onQuickAdd?: (product: Product, color: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onSearchQuerySelect,
  onQuickAdd
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleQuerySelect = (query: string, category?: ProductCategory) => {
    if (onSearchQuerySelect) {
      onSearchQuerySelect(query, category);
    } else {
      onNavigate('shop');
    }
    setMobileSearchOpen(false);
  };

  const handleProductSelect = (productId: string) => {
    onNavigate('product-detail', productId);
    setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e6e2d8] transition-all">
      {/* 1. Thin Announcement Bar */}
      <div className="bg-[#1a1715] text-[#fbf9f5] text-xs font-medium tracking-wide py-2 px-4 text-center flex items-center justify-center space-x-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c07a46] animate-pulse"></span>
        <span>FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,999 • 7-DAY DOORSTEP EXCHANGES</span>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#1a1715] hover:text-[#c07a46] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo (Left on desktop for Amazon/Flipkart style search layout) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="group inline-flex flex-col items-start focus:outline-none text-left"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-bold text-[#1a1715] group-hover:text-[#c07a46] transition-colors">
                VEYLORA
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-sans -mt-0.5">
                Artisanal Full-Grain
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-xs tracking-wider uppercase font-medium text-stone-700 shrink-0">
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-[#c07a46] transition-colors py-1 ${currentPage === 'shop' ? 'text-[#c07a46] font-semibold border-b-2 border-[#c07a46]' : ''}`}
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#c07a46] transition-colors py-1 ${currentPage === 'about' ? 'text-[#c07a46] font-semibold border-b-2 border-[#c07a46]' : ''}`}
            >
              Our Craft
            </button>
            <button
              onClick={() => onNavigate('reviews')}
              className={`hover:text-[#c07a46] transition-colors py-1 ${currentPage === 'reviews' ? 'text-[#c07a46] font-semibold border-b-2 border-[#c07a46]' : ''}`}
            >
              Reviews (4.9★)
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className={`hover:text-[#c07a46] transition-colors py-1 ${currentPage === 'faq' ? 'text-[#c07a46] font-semibold border-b-2 border-[#c07a46]' : ''}`}
            >
              Care & FAQ
            </button>
          </nav>

          {/* Prominent Live Search Autocomplete (Amazon & Flipkart style) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <SearchAutocomplete
              products={PRODUCTS}
              onSelectProduct={handleProductSelect}
              onSelectQuery={handleQuerySelect}
              onQuickAdd={onQuickAdd}
              placeholder="Search wallets, MacBook sleeves, duffel bags, keywraps..."
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 text-[#1a1715] hover:text-[#c07a46] transition-colors focus:outline-none"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Lifetime Warranty Indicator (Desktop) */}
            <div className="hidden 2xl:flex items-center space-x-1.5 text-xs text-stone-600 bg-stone-100/80 px-2.5 py-1 rounded-full border border-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c07a46]" />
              <span className="font-medium">Lifetime Hardware Warranty</span>
            </div>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={onOpenCart}
              id="cart-trigger-button"
              className="relative p-2 text-[#1a1715] hover:text-[#c07a46] transition-colors focus:outline-none flex items-center"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c07a46] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Live Search Bar Flyout */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-[#e6e2d8] bg-white px-4 py-3 shadow-lg animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Search the Atelier
            </span>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SearchAutocomplete
            products={PRODUCTS}
            onSelectProduct={handleProductSelect}
            onSelectQuery={handleQuerySelect}
            onQuickAdd={onQuickAdd}
            autoFocus
            onClose={() => setMobileSearchOpen(false)}
            placeholder="Search wallets, tech folios, duffels..."
          />
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e6e2d8] bg-[#fbf9f5] px-6 py-6 shadow-xl">
          <div className="flex flex-col space-y-4 text-base font-medium">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Shop All Products ({PRODUCTS.length})
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Our Craft & Story
            </button>
            <button
              onClick={() => {
                onNavigate('reviews');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Customer Reviews (4.9 ★)
            </button>
            <button
              onClick={() => {
                onNavigate('shipping');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => {
                onNavigate('faq');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-200 text-[#1a1715] hover:text-[#c07a46]"
            >
              Care Guide & FAQ
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#1a1715] hover:text-[#c07a46]"
            >
              Concierge & Contact
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-300 text-xs text-stone-500 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#c07a46]" />
              <span>Lifetime Guarantee on all Solid Brass Hardware</span>
            </div>
            <span>Jaipur & Bengaluru Workshop • Pan-India Express Delivery</span>
          </div>
        </div>
      )}
    </header>
  );
};

