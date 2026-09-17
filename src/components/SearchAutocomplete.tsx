import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import {
  Search,
  X,
  TrendingUp,
  Clock,
  ArrowRight,
  ShoppingBag,
  Star,
  CornerDownLeft,
  Sparkles,
  Check,
  Tag
} from 'lucide-react';
import {
  getSearchSuggestions,
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  POPULAR_TRENDING_SEARCHES,
  CATEGORY_MAP,
  KeywordSuggestion
} from '../utils/searchIndex';
import { formatINR } from '../utils/formatters';

interface SearchAutocompleteProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onSelectQuery: (query: string, category?: ProductCategory) => void;
  onQuickAdd?: (product: Product, color: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
  variant?: 'navbar' | 'shop' | 'modal';
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  products,
  onSelectProduct,
  onSelectQuery,
  onQuickAdd,
  placeholder = "Search for keychains, wallets, bags, sleeves...",
  initialQuery = '',
  className = '',
  autoFocus = false,
  onClose,
  variant = 'navbar'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Sync query if initialQuery changes
  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search suggestions
  const suggestions = useMemo(() => {
    return getSearchSuggestions(query, products);
  }, [query, products]);

  // Flat list of selectable suggestions for keyboard navigation
  const selectableItems = useMemo(() => {
    const items: Array<{
      type: 'keyword' | 'product';
      data: KeywordSuggestion | Product;
    }> = [];

    suggestions.keywords.forEach((k) => {
      items.push({ type: 'keyword', data: k });
    });

    suggestions.products.forEach((p) => {
      items.push({ type: 'product', data: p });
    });

    return items;
  }, [suggestions]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Helper to highlight matching text in query
  const highlightMatch = (text: string, queryStr: string) => {
    if (!queryStr.trim()) return <span>{text}</span>;
    const cleanQ = queryStr.trim();
    const regex = new RegExp(`(${cleanQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="font-bold text-[#c07a46] bg-[#c07a46]/10 px-0.5 rounded">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleExecuteSearch = (searchVal: string, cat?: ProductCategory) => {
    const targetQuery = searchVal.trim();
    if (!targetQuery && !cat) return;
    if (targetQuery) {
      saveRecentSearch(targetQuery);
      setRecentSearches(getRecentSearches());
    }
    setIsOpen(false);
    onSelectQuery(targetQuery, cat);
    if (onClose) onClose();
  };

  const handleSelectProduct = (productId: string, productName: string) => {
    saveRecentSearch(productName);
    setRecentSearches(getRecentSearches());
    setIsOpen(false);
    onSelectProduct(productId);
    if (onClose) onClose();
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (!onQuickAdd) return;
    onQuickAdd(product, product.defaultColor);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < selectableItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : selectableItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < selectableItems.length) {
        const item = selectableItems[selectedIndex];
        if (item.type === 'keyword') {
          const kw = item.data as KeywordSuggestion;
          handleExecuteSearch(kw.query, kw.category);
        } else {
          const prod = item.data as Product;
          handleSelectProduct(prod.id, prod.name);
        }
      } else {
        handleExecuteSearch(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      if (onClose) onClose();
    }
  };

  const handleRemoveRecent = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const updated = removeRecentSearch(item);
    setRecentSearches(updated);
  };

  const handleClearAllRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };

  const isQueryEmpty = query.trim().length === 0;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* 1. Main Search Bar Input Field */}
      <div
        className={`relative flex items-center bg-white border transition-all duration-200 rounded-lg ${
          isOpen
            ? 'border-[#c07a46] ring-2 ring-[#c07a46]/20 shadow-md'
            : 'border-stone-200 hover:border-stone-300 shadow-2xs'
        }`}
      >
        <div className="pl-3.5 pr-2 flex items-center text-stone-400 pointer-events-none">
          <Search className="w-4 h-4 text-stone-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full py-2.5 sm:py-3 pr-20 bg-transparent text-sm text-[#1a1715] placeholder:text-stone-400 focus:outline-hidden"
          aria-label="Search catalog"
          autoComplete="off"
          spellCheck="false"
        />

        <div className="absolute right-2.5 flex items-center space-x-1.5">
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => handleExecuteSearch(query)}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-[#1a1715] hover:bg-[#c07a46] text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
            title="Search"
          >
            <span>Search</span>
            <CornerDownLeft className="w-3 h-3 text-stone-300 ml-0.5" />
          </button>
        </div>
      </div>

      {/* 2. Amazon / Flipkart Style Suggestions Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-stone-200 shadow-2xl z-50 overflow-hidden text-xs divide-y divide-stone-100 animate-fade-in max-h-[82vh] sm:max-h-[600px] flex flex-col"
          style={{ width: '100%', minWidth: '320px' }}
        >
          {/* SCENARIO A: Query is empty — show Recent & Trending Searches (Amazon/Flipkart Welcome State) */}
          {isQueryEmpty && (
            <div className="overflow-y-auto p-4 space-y-5">
              {/* Recent Searches (if any) */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-stone-400 mb-2.5">
                    <span className="flex items-center space-x-1.5 font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                      <Clock className="w-3 h-3" />
                      <span>Recent Searches</span>
                    </span>
                    <button
                      onClick={handleClearAllRecents}
                      className="text-[10px] text-stone-400 hover:text-[#c07a46] transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          handleExecuteSearch(term);
                        }}
                        className="group flex items-center space-x-1.5 bg-stone-50 hover:bg-[#c07a46]/10 border border-stone-200 hover:border-[#c07a46]/30 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-[#c07a46] cursor-pointer transition-colors"
                      >
                        <Clock className="w-3 h-3 text-stone-400 group-hover:text-[#c07a46]" />
                        <span>{term}</span>
                        <button
                          onClick={(e) => handleRemoveRecent(e, term)}
                          className="text-stone-300 hover:text-stone-600 ml-1 p-0.5 cursor-pointer"
                          title="Remove from history"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Popular Searches */}
              <div>
                <div className="flex items-center space-x-1.5 font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-2.5">
                  <TrendingUp className="w-3 h-3 text-[#c07a46]" />
                  <span>Trending on Veylora</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5">
                  {POPULAR_TRENDING_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        handleExecuteSearch(item);
                      }}
                      className="flex items-center space-x-2 text-left p-2 rounded-lg hover:bg-stone-50 text-stone-700 hover:text-[#c07a46] transition-colors group cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#c07a46]" />
                      <span className="font-medium truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Atelier Categories */}
              <div className="pt-3 border-t border-stone-100">
                <div className="font-semibold uppercase tracking-wider text-[10px] text-stone-400 mb-2">
                  Browse by Collection
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(CATEGORY_MAP) as ProductCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleExecuteSearch('', cat)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-[#1a1715] text-stone-700 hover:text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                    >
                      {CATEGORY_MAP[cat]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO B: Query has text — Show Real-Time Smart Autocomplete (Flipkart / Amazon style) */}
          {!isQueryEmpty && (
            <div className="overflow-y-auto divide-y divide-stone-100">
              {/* 1. Category-specific Search Jump Bar (e.g. "Search in: Desk & Accessories (4)") */}
              {suggestions.categoryMatches.length > 0 && (
                <div className="bg-stone-50/80 p-2.5 sm:px-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-stone-500 font-medium">Search in category:</span>
                  {suggestions.categoryMatches.map((cm) => (
                    <button
                      key={cm.id}
                      onClick={() => handleExecuteSearch(query, cm.id)}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white hover:bg-[#c07a46] hover:text-white border border-stone-200 rounded-md text-[11px] font-medium text-stone-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>{cm.label}</span>
                      <span className="bg-stone-100 text-stone-600 px-1 py-0.2 rounded text-[10px] font-semibold">
                        {cm.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Keyword Autocomplete Phrases (Like Flipkart/Amazon top suggestions) */}
              {suggestions.keywords.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Suggested Searches
                  </div>
                  {suggestions.keywords.map((kw, i) => {
                    const isSelected = selectedIndex === i;
                    return (
                      <div
                        key={i}
                        onClick={() => handleExecuteSearch(kw.query, kw.category)}
                        className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                          isSelected ? 'bg-stone-100 text-[#c07a46]' : 'hover:bg-stone-50 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="text-xs truncate">
                            {highlightMatch(kw.query, query)}
                          </span>
                        </div>
                        {kw.categoryLabel && (
                          <span className="text-[10px] text-stone-400 italic shrink-0 ml-2">
                            {kw.categoryLabel}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Related Search Pills (Flipkart & Amazon style chips below search bar) */}
              {suggestions.relatedSearchPills.length > 0 && (
                <div className="px-4 py-2 bg-stone-50/50 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#c07a46]" />
                    <span>Related:</span>
                  </span>
                  {suggestions.relatedSearchPills.map((pill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleExecuteSearch(pill)}
                      className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-full text-[11px] font-medium text-stone-700 hover:text-[#c07a46] transition-colors shadow-2xs cursor-pointer"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              )}

              {/* 4. Direct Matching Product Cards (The Amazon/Flipkart Items to Buy Panel) */}
              {suggestions.products.length > 0 && (
                <div className="py-2.5 bg-stone-50/30">
                  <div className="px-4 py-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c07a46]" />
                      <span>Suggested Items to Buy ({suggestions.totalProductMatches} items)</span>
                    </span>
                    <span className="text-stone-400 font-normal lowercase">click to view or add</span>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {suggestions.products.map((product, pIndex) => {
                      const itemIdx = suggestions.keywords.length + pIndex;
                      const isSelected = selectedIndex === itemIdx;
                      const isJustAdded = justAddedId === product.id;

                      const discountPercent = product.originalPrice
                        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                        : null;

                      return (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.id, product.name)}
                          className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors group ${
                            isSelected ? 'bg-amber-50/80' : 'hover:bg-white'
                          }`}
                        >
                          {/* Left: Thumbnail & Details */}
                          <div className="flex items-center space-x-3 min-w-0 pr-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200 shadow-2xs">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {product.badge && (
                                <span className="absolute top-0 left-0 bg-[#1a1715] text-[8px] text-white px-1.5 py-0.2 font-semibold rounded-br">
                                  {product.badge === 'Bestseller' ? '★ TOP' : product.badge}
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-xs font-semibold text-[#1a1715] group-hover:text-[#c07a46] transition-colors truncate">
                                  {highlightMatch(product.name, query)}
                                </h4>
                                <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded shrink-0 font-medium">
                                  {CATEGORY_MAP[product.category]}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                                {product.tagline}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center text-amber-600 font-semibold text-[10px]">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                                  <span>{product.rating}</span>
                                </div>
                                <span className="text-stone-300">•</span>
                                <span className="text-[10px] text-stone-500 font-medium">
                                  {product.colors.length} leather shades
                                </span>
                                {product.stockCount <= 10 && (
                                  <>
                                    <span className="text-stone-300">•</span>
                                    <span className="text-[10px] text-amber-700 font-semibold">
                                      Only {product.stockCount} left
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Price & Quick Action */}
                          <div className="flex flex-col items-end shrink-0 pl-2">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-[#1a1715]">
                                {formatINR(product.price)}
                              </span>
                              {discountPercent && (
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                                  {discountPercent}% OFF
                                </span>
                              )}
                            </div>
                            {product.originalPrice && (
                              <span className="text-[10px] text-stone-400 line-through">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}

                            {onQuickAdd && (
                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(e, product)}
                                className={`mt-1 flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer shadow-2xs ${
                                  isJustAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-stone-100 hover:bg-[#c07a46] hover:text-white text-stone-800'
                                }`}
                                title="Quick add to bag"
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Added ✓</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3 h-3" />
                                    <span>+ Add to Bag</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Zero Matches & "Did You Mean" Fuzzy Match Fallback */}
              {suggestions.products.length === 0 && suggestions.keywords.length === 0 && (
                <div className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[#1a1715]">
                    No handcrafted items matching &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Try searching for &lsquo;keychains&rsquo;, &lsquo;wallets&rsquo;, &lsquo;bags&rsquo;, or &lsquo;sleeves&rsquo;.
                  </p>

                  {/* Fuzzy Did You Mean Suggestion */}
                  {suggestions.didYouMean && (
                    <div className="mt-3 p-2.5 bg-amber-50 rounded-lg inline-block text-xs text-stone-700 border border-amber-200">
                      <span>Did you mean: </span>
                      <button
                        onClick={() => {
                          setQuery(suggestions.didYouMean!);
                          handleExecuteSearch(suggestions.didYouMean!);
                        }}
                        className="font-bold text-[#c07a46] underline hover:text-[#9d5b28] ml-1 cursor-pointer"
                      >
                        {suggestions.didYouMean}
                      </button>
                      ?
                    </div>
                  )}

                  {/* Quick category recovery buttons */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="text-[10px] uppercase font-bold text-stone-400 mb-2">
                      Popular Collections:
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {['accessories', 'wallets', 'tech', 'bags'].map((catKey) => (
                        <button
                          key={catKey}
                          onClick={() => handleExecuteSearch('', catKey as ProductCategory)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] cursor-pointer"
                        >
                          {CATEGORY_MAP[catKey as ProductCategory]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Footer: View All Results for Query */}
              {suggestions.totalProductMatches > 0 && (
                <div
                  onClick={() => handleExecuteSearch(query)}
                  className="bg-stone-50 hover:bg-stone-100 p-3 text-center cursor-pointer transition-colors flex items-center justify-center space-x-1.5 font-semibold text-xs text-[#c07a46]"
                >
                  <span>See all {suggestions.totalProductMatches} results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
