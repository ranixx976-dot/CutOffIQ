import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RotateCcw, X, Search, Sparkles, Tag, Star } from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { SearchAutocomplete } from './SearchAutocomplete';
import { matchProductScore, getSearchSuggestions } from '../utils/searchIndex';

interface ShopViewProps {
  products: Product[];
  initialCategory: ProductCategory;
  initialSearchQuery?: string;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product, selectedColor: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory,
  initialSearchQuery = '',
  onSelectProduct,
  onQuickAdd,
  onQuickView
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    maxPrice: 10000,
    sortBy: 'featured',
    searchQuery: initialSearchQuery,
    inStockOnly: false
  });

  // Sync when initialCategory or initialSearchQuery change from navbar or external navigation
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategory,
      searchQuery: initialSearchQuery
    }));
  }, [initialCategory, initialSearchQuery]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    { id: 'accessories', label: 'Desk & Accessories' },
    { id: 'wallets', label: 'Wallets & Cardholders' },
    { id: 'tech', label: 'Tech Organizers' },
    { id: 'bags', label: 'Duffels & Carry' }
  ];

  // Tokenize and score products when query is active
  const filteredProducts = useMemo(() => {
    const queryTokens = filters.searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return products
      .map((p) => {
        const score = queryTokens.length > 0 ? matchProductScore(p, queryTokens) : 100;
        return { product: p, score };
      })
      .filter(({ product: p, score }) => {
        if (queryTokens.length > 0 && score <= 0) return false;
        if (filters.category !== 'all' && p.category !== filters.category) return false;
        if (p.price > filters.maxPrice) return false;
        if (filters.inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.product.price - b.product.price;
        if (filters.sortBy === 'price-desc') return b.product.price - a.product.price;
        if (filters.sortBy === 'rating') return b.product.rating - a.product.rating;
        // Default sort: if search is active, sort by relevance score descending, then featured
        if (queryTokens.length > 0) {
          if (b.score !== a.score) return b.score - a.score;
        }
        return (b.product.featured ? 1 : 0) - (a.product.featured ? 1 : 0);
      })
      .map(({ product }) => product);
  }, [products, filters]);

  // Compute suggestions and related pills for active search query
  const searchSuggestions = useMemo(() => {
    if (!filters.searchQuery.trim()) return null;
    return getSearchSuggestions(filters.searchQuery, products);
  }, [filters.searchQuery, products]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      maxPrice: 10000,
      sortBy: 'featured',
      searchQuery: '',
      inStockOnly: false
    });
  };

  const handleSelectRelatedTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: tag
    }));
  };

  const handlePricePillClick = (max: number) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: prev.maxPrice === max ? 10000 : max
    }));
  };

  const isSearchActive = Boolean(filters.searchQuery.trim());

  return (
    <div className="py-8 sm:py-10 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c07a46]">
            The Master Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1715] mt-1">
            {isSearchActive ? `Search: “${filters.searchQuery}”` : 'Artisanal Leather Goods'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            {isSearchActive
              ? `Found ${filteredProducts.length} handcrafted piece${filteredProducts.length === 1 ? '' : 's'} matching your search.`
              : 'Each piece is cut from certified full-grain bovine hide and assembled with solid brass hardware.'}
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-6 border-b border-[#e6e2d8] no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id })}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-[#1a1715] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Search and Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e6e2d8] shadow-xs mb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs">
          
          {/* Real-time Search Autocomplete Field (Amazon / Flipkart Style) */}
          <div className="w-full md:w-96 lg:w-[440px]">
            <SearchAutocomplete
              products={products}
              initialQuery={filters.searchQuery}
              onSelectProduct={onSelectProduct}
              onSelectQuery={(q, cat) => {
                setFilters((prev) => ({
                  ...prev,
                  searchQuery: q,
                  category: cat || prev.category
                }));
              }}
              onQuickAdd={onQuickAdd}
              placeholder="Search keychains, wallets, bags, folios..."
              variant="shop"
            />
          </div>

          {/* Sort & Quick Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Price Filter Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-stone-500">Max Price:</span>
              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="px-2.5 py-1.5 border border-stone-300 rounded bg-stone-50 text-stone-800 focus:outline-hidden focus:border-[#c07a46] cursor-pointer"
              >
                <option value={10000}>All Prices</option>
                <option value={1000}>Under ₹1,000</option>
                <option value={1500}>Under ₹1,500</option>
                <option value={3000}>Under ₹3,000</option>
                <option value={6000}>Under ₹6,000</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-stone-500">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-2.5 py-1.5 border border-stone-300 rounded bg-stone-50 text-stone-800 focus:outline-hidden focus:border-[#c07a46] cursor-pointer"
              >
                <option value="featured">Featured / Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated (4.8★+)</option>
              </select>
            </div>

            {/* In Stock Toggle */}
            <label className="flex items-center space-x-1.5 text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                className="rounded text-[#c07a46] focus:ring-[#c07a46]"
              />
              <span>In Stock Only</span>
            </label>

            {/* Reset Button */}
            {(filters.category !== 'all' ||
              filters.maxPrice !== 10000 ||
              filters.searchQuery !== '' ||
              filters.inStockOnly) && (
              <button
                onClick={handleResetFilters}
                className="p-1.5 text-stone-500 hover:text-[#c07a46] flex items-center space-x-1 cursor-pointer"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Flipkart / Amazon Style: Quick Filter Pills & Related Searches After Search */}
        {isSearchActive && (
          <div className="bg-white/80 p-3.5 rounded-xl border border-[#e6e2d8] shadow-2xs mb-6 space-y-3 animate-fade-in">
            {/* Row 1: Active query chip + Quick Price Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Active Search:</span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#c07a46] text-white text-xs font-semibold shadow-2xs">
                <span>&ldquo;{filters.searchQuery}&rdquo;</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="text-white hover:text-stone-200 ml-1 p-0.5 cursor-pointer"
                  title="Clear query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>

              {/* Quick Price Pills like Amazon / Flipkart */}
              <div className="flex items-center space-x-1.5 ml-2">
                <button
                  onClick={() => handlePricePillClick(1000)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    filters.maxPrice === 1000
                      ? 'bg-[#1a1715] text-white border-[#1a1715]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  Under ₹1,000
                </button>
                <button
                  onClick={() => handlePricePillClick(1500)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    filters.maxPrice === 1500
                      ? 'bg-[#1a1715] text-white border-[#1a1715]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  Under ₹1,500
                </button>
                <button
                  onClick={() => handlePricePillClick(3000)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    filters.maxPrice === 3000
                      ? 'bg-[#1a1715] text-white border-[#1a1715]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  Under ₹3,000
                </button>
              </div>
            </div>

            {/* Row 2: Related Searches / People also search for (Flipkart & Amazon style) */}
            {searchSuggestions && searchSuggestions.relatedSearchPills.length > 0 && (
              <div className="flex items-center space-x-2 pt-2 border-t border-stone-100 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#c07a46]" />
                  <span>Related Searches:</span>
                </span>
                <div className="flex items-center space-x-1.5 shrink-0">
                  {searchSuggestions.relatedSearchPills.map((pill, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectRelatedTag(pill)}
                      className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 hover:border-[#c07a46]/40 rounded-full text-xs font-medium text-stone-700 hover:text-[#c07a46] transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <span>
            Showing <strong className="text-stone-800">{filteredProducts.length}</strong> handcrafted pieces
            {filters.category !== 'all' && (
              <span> in <strong className="text-stone-800">{categories.find(c => c.id === filters.category)?.label}</strong></span>
            )}
          </span>
          <span className="text-emerald-700 font-medium">
            ✓ Genuine Full-Grain Leather • Dispatches in 24h
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#e6e2d8] p-12 text-center text-stone-500 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1715]">
              No matching pieces found for &ldquo;{filters.searchQuery}&rdquo;
            </h3>
            <p className="text-xs max-w-sm mx-auto text-stone-500">
              Try checking your spelling or explore one of our popular leather collections below.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {['keychains', 'wallets', 'tech', 'bags'].map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: catKey, category: 'all' }))}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-[#1a1715] hover:text-white text-stone-700 rounded-md text-xs font-semibold transition-colors cursor-pointer capitalize"
                >
                  Browse {catKey}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-[#1a1715] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#c07a46] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
