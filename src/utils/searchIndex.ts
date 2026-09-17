import { Product, ProductCategory } from '../types';

export interface KeywordSuggestion {
  query: string;
  category?: ProductCategory;
  categoryLabel?: string;
  type: 'keyword' | 'category' | 'tag' | 'price';
  filterType?: 'category' | 'price' | 'none';
  filterValue?: string;
}

export interface SearchSuggestionResult {
  query: string;
  keywords: KeywordSuggestion[];
  products: Product[];
  totalProductMatches: number;
  categoryMatches: { id: ProductCategory; label: string; count: number }[];
  relatedSearchPills: string[];
  didYouMean?: string;
}

export const CATEGORY_MAP: Record<ProductCategory, string> = {
  all: 'All Pieces',
  wallets: 'Wallets & Cardholders',
  tech: 'Tech Organizers',
  bags: 'Duffels & Carry',
  accessories: 'Desk & Accessories'
};

export const POPULAR_TRENDING_SEARCHES = [
  'Keychains',
  'Slim Bifold Wallet',
  'MacBook 14 Folio',
  'Brass Carabiner Key Fob',
  'MagSafe Cardholder',
  'Weekender Duffel',
  'Crossbody Sling Bag',
  'AirTag KeyWrap'
];

// Stemming helper for singular/plural and verb forms
export function stemWord(word: string): string {
  let w = word.toLowerCase().trim();
  if (w.endsWith("ies") && w.length > 4) {
    return w.slice(0, -3) + "y";
  }
  if (w.endsWith("es") && w.length > 3 && !w.endsWith("ses") && !w.endsWith("ces")) {
    return w.slice(0, -2);
  }
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 2) {
    return w.slice(0, -1);
  }
  return w;
}

// Comprehensive synonym mapping for leather goods and daily carry
const SYNONYM_GROUPS: Record<string, string[]> = {
  keychain: ['keychain', 'keychains', 'key chain', 'key-chain', 'key ring', 'keyring', 'key fob', 'keywrap', 'carabiner', 'keys', 'key', 'airtag', 'lanyard', 'chabi'],
  keychains: ['keychain', 'keychains', 'key chain', 'key-chain', 'key ring', 'keyring', 'key fob', 'keywrap', 'carabiner', 'keys', 'key', 'airtag', 'lanyard', 'chabi'],
  keys: ['keychain', 'keychains', 'key fob', 'key ring', 'keywrap', 'keys', 'carabiner', 'lanyard'],
  key: ['keychain', 'keychains', 'key fob', 'key ring', 'keywrap', 'keys', 'carabiner', 'lanyard'],
  carabiner: ['carabiner', 'clip', 'brass clip', 'key fob', 'keychain', 'keychains'],
  wallet: ['wallet', 'wallets', 'cardholder', 'card holder', 'card case', 'bifold', 'trifold', 'magsafe', 'coin pouch', 'money clip', 'purse', 'billfold'],
  wallets: ['wallet', 'wallets', 'cardholder', 'card holder', 'card case', 'bifold', 'trifold', 'magsafe', 'coin pouch', 'money clip', 'purse', 'billfold'],
  cardholder: ['cardholder', 'card holder', 'wallet', 'wallets', 'magsafe', 'slim bifold', 'rfid'],
  bag: ['bag', 'bags', 'duffel', 'duffle', 'backpack', 'sling', 'sling bag', 'crossbody', 'weekender', 'luggage', 'travel', 'tote', 'chest bag'],
  bags: ['bag', 'bags', 'duffel', 'duffle', 'backpack', 'sling', 'sling bag', 'crossbody', 'weekender', 'luggage', 'travel', 'tote', 'chest bag'],
  duffel: ['duffel', 'duffle', 'weekender', 'travel bag', 'luggage', 'carry on', 'bag'],
  backpack: ['backpack', 'commuter backpack', 'rucksack', 'knapsack', 'laptop bag', 'bag'],
  sling: ['sling', 'sling bag', 'crossbody', 'chest bag', 'shoulder bag', 'travel bag'],
  sleeve: ['sleeve', 'sleeves', 'case', 'folio', 'cover', 'laptop sleeve', 'macbook sleeve', 'tech'],
  sleeves: ['sleeve', 'sleeves', 'case', 'folio', 'cover', 'laptop sleeve', 'macbook sleeve', 'tech'],
  laptop: ['laptop', 'macbook', 'folio', 'sleeve', 'bento', 'nomad', 'notebook', 'case'],
  macbook: ['macbook', 'laptop', 'sleeve', 'folio', 'bento', 'nomad', 'case', '14 inch', '16 inch'],
  desk: ['desk mat', 'mousepad', 'workspace', 'desk pad', 'desk', 'office'],
  mat: ['desk mat', 'mousepad', 'desk pad', 'workspace', 'leather mat'],
  charger: ['charger', 'cable', 'cord', 'cable roll', 'wire', 'organizer', 'adapter', 'tech pouch'],
  journal: ['journal', 'notebook', 'diary', 'a5', 'pen quiver', 'stationery', 'writer'],
  passport: ['passport', 'travel wallet', 'travel', 'boarding pass', 'international']
};

function getSynonyms(word: string): string[] {
  const stem = stemWord(word);
  const direct = SYNONYM_GROUPS[word] || SYNONYM_GROUPS[stem];
  if (direct) return direct;
  return [word, stem];
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(s1: string, s2: string): number {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

const COMMON_VOCABULARY = [
  'keychain', 'keychains', 'wallet', 'wallets', 'cardholder', 'bifold', 'trifold',
  'duffel', 'backpack', 'sling', 'bag', 'bags', 'laptop', 'macbook', 'sleeve',
  'folio', 'desk mat', 'cable', 'charger', 'passport', 'journal', 'leather',
  'carabiner', 'airtag', 'brass'
];

/**
 * Advanced multi-token scoring engine for matching products
 */
export function matchProductScore(product: Product, queryTokens: string[]): number {
  if (queryTokens.length === 0) return 1;

  let totalScore = 0;
  const prodNameLower = product.name.toLowerCase();
  const prodTaglineLower = product.tagline.toLowerCase();
  const prodCategoryLower = product.category.toLowerCase();
  const prodCatLabelLower = (CATEGORY_MAP[product.category] || '').toLowerCase();
  const prodHookLower = product.hook.toLowerCase();
  const prodTagsLower = product.tags.map(t => t.toLowerCase());
  const prodMaterialsLower = product.materials.map(m => m.toLowerCase()).join(' ');

  for (const token of queryTokens) {
    const tokenStem = stemWord(token);
    const synonyms = getSynonyms(token);
    let tokenScore = 0;

    // 1. Direct match in Name
    if (prodNameLower.includes(token)) {
      tokenScore += 80;
    } else if (prodNameLower.includes(tokenStem)) {
      tokenScore += 65;
    }

    // 2. Direct match in Tags
    for (const tag of prodTagsLower) {
      if (tag === token) {
        tokenScore += 70;
        break;
      } else if (tag === tokenStem || tag.includes(token) || tag.includes(tokenStem)) {
        tokenScore += 50;
        break;
      }
    }

    // 3. Match in Category / Category Label
    if (prodCategoryLower.includes(token) || prodCatLabelLower.includes(token) || prodCatLabelLower.includes(tokenStem)) {
      tokenScore += 45;
    }

    // 4. Synonym match in Name or Tags
    for (const syn of synonyms) {
      if (prodNameLower.includes(syn)) {
        tokenScore += Math.max(tokenScore, 55);
      }
      for (const tag of prodTagsLower) {
        if (tag.includes(syn)) {
          tokenScore += Math.max(tokenScore, 45);
        }
      }
    }

    // 5. Match in Tagline or Hook
    if (prodTaglineLower.includes(token) || prodTaglineLower.includes(tokenStem)) {
      tokenScore += 30;
    }
    if (prodHookLower.includes(token) || prodHookLower.includes(tokenStem)) {
      tokenScore += 20;
    }

    // 6. Match in Materials
    if (prodMaterialsLower.includes(token) || prodMaterialsLower.includes(tokenStem)) {
      tokenScore += 15;
    }

    // If this token didn't match anything, check fuzzy match
    if (tokenScore === 0 && token.length >= 4) {
      for (const tag of prodTagsLower) {
        if (levenshteinDistance(token, tag) <= 1) {
          tokenScore += 25;
          break;
        }
      }
      if (tokenScore === 0 && levenshteinDistance(token, prodCategoryLower) <= 1) {
        tokenScore += 25;
      }
    }

    if (tokenScore === 0) {
      // One of the search tokens has no match at all in this product
      return 0;
    }

    totalScore += tokenScore;
  }

  // Small boosts for popularity & high ratings
  if (product.isBestSeller) totalScore += 10;
  totalScore += (product.rating - 4.5) * 10;

  return totalScore;
}

/**
 * Main Search Autocomplete suggestions generator (Flipkart / Amazon style)
 */
export function getSearchSuggestions(
  query: string,
  products: Product[]
): SearchSuggestionResult {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    return {
      query: '',
      keywords: [],
      products: [],
      totalProductMatches: 0,
      categoryMatches: [],
      relatedSearchPills: []
    };
  }

  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

  // 1. Score and rank matching products
  const scoredProducts: { product: Product; score: number }[] = [];

  for (const product of products) {
    const score = matchProductScore(product, queryTokens);
    if (score > 0) {
      scoredProducts.push({ product, score });
    }
  }

  // Sort by highest relevance score
  scoredProducts.sort((a, b) => b.score - a.score);
  const matchingProducts = scoredProducts.map(sp => sp.product);

  // 2. Generate Flipkart/Amazon-style Keyword Suggestions
  const keywords: KeywordSuggestion[] = [];

  // A. If query matches a category (e.g. "accessories", "wallets", "keychains" in accessories)
  (Object.keys(CATEGORY_MAP) as ProductCategory[]).forEach((cat) => {
    if (cat === 'all') return;
    const catLabel = CATEGORY_MAP[cat];
    const catLabelLower = catLabel.toLowerCase();
    
    // Check if query is related to this category
    const isCatMatch = catLabelLower.includes(cleanQuery) || 
      matchingProducts.some(p => p.category === cat);

    if (isCatMatch && matchingProducts.filter(p => p.category === cat).length > 0) {
      keywords.push({
        query: cleanQuery,
        category: cat,
        categoryLabel: `in ${catLabel}`,
        type: 'category'
      });
    }
  });

  // B. Specific keyword completions based on what was typed
  const isKeychainQuery = /key|carabiner|lanyard|fob/i.test(cleanQuery);
  const isWalletQuery = /wall|card|bifold|trifold|magsafe/i.test(cleanQuery);
  const isBagQuery = /bag|duffel|backpack|sling|travel/i.test(cleanQuery);
  const isTechQuery = /tech|laptop|sleeve|folio|macbook|charger|cable/i.test(cleanQuery);

  if (isKeychainQuery) {
    keywords.push({ query: 'keychains for men', category: 'accessories', type: 'keyword' });
    keywords.push({ query: 'brass carabiner keychains', category: 'accessories', type: 'keyword' });
    keywords.push({ query: 'airtag keychains', category: 'accessories', type: 'keyword' });
    keywords.push({ query: 'silent key organiser', category: 'accessories', type: 'keyword' });
    keywords.push({ query: 'braided leather lanyard', category: 'accessories', type: 'keyword' });
  } else if (isWalletQuery) {
    keywords.push({ query: 'slim bifold cardholder', category: 'wallets', type: 'keyword' });
    keywords.push({ query: 'rfid blocking leather wallet', category: 'wallets', type: 'keyword' });
    keywords.push({ query: 'magsafe cardholder for iphone', category: 'wallets', type: 'keyword' });
    keywords.push({ query: 'executive currency & coin wallet', category: 'wallets', type: 'keyword' });
    keywords.push({ query: 'passport travel wallet', category: 'wallets', type: 'keyword' });
  } else if (isBagQuery) {
    keywords.push({ query: 'weekender travel duffel bag', category: 'bags', type: 'keyword' });
    keywords.push({ query: 'crossbody leather sling bag', category: 'bags', type: 'keyword' });
    keywords.push({ query: 'meridian commuter backpack', category: 'bags', type: 'keyword' });
    keywords.push({ query: 'overhead cabin carry-on luggage', category: 'bags', type: 'keyword' });
  } else if (isTechQuery) {
    keywords.push({ query: 'macbook pro 14 inch sleeve', category: 'tech', type: 'keyword' });
    keywords.push({ query: 'bento tech folio organizer', category: 'tech', type: 'keyword' });
    keywords.push({ query: 'cable and charger roll organizer', category: 'tech', type: 'keyword' });
  } else {
    // Dynamic generation from product names matching query
    matchingProducts.forEach(p => {
      keywords.push({
        query: p.name.toLowerCase(),
        category: p.category,
        categoryLabel: `in ${CATEGORY_MAP[p.category]}`,
        type: 'keyword'
      });
    });
  }

  // Deduplicate keywords
  const seenKw = new Set<string>();
  const uniqueKeywords: KeywordSuggestion[] = [];
  for (const kw of keywords) {
    const key = `${kw.query.toLowerCase()}_${kw.category || ''}`;
    if (!seenKw.has(key)) {
      seenKw.add(key);
      uniqueKeywords.push(kw);
      if (uniqueKeywords.length >= 6) break;
    }
  }

  // 3. Category breakdown
  const categoryCounts = new Map<ProductCategory, number>();
  matchingProducts.forEach((p) => {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
  });

  const categoryMatches = Array.from(categoryCounts.entries()).map(([cat, count]) => ({
    id: cat,
    label: CATEGORY_MAP[cat],
    count
  }));

  // 4. Related search pill tags (Flipkart/Amazon style)
  let relatedSearchPills: string[] = [];
  if (isKeychainQuery) {
    relatedSearchPills = ['Solid Brass Carabiner', 'AirTag KeyWrap', 'Key Organiser', 'Braided Lanyard', 'Car Key Fob'];
  } else if (isWalletQuery) {
    relatedSearchPills = ['Slim Bifold', 'MagSafe Wallet', 'RFID Cardholder', 'Trifold Coin Wallet', 'Passport Wallet'];
  } else if (isBagQuery) {
    relatedSearchPills = ['Weekender Duffel', 'Crossbody Sling', 'Commuter Backpack', 'Carry-On Luggage'];
  } else if (isTechQuery) {
    relatedSearchPills = ['MacBook Sleeve', 'Bento Folio', 'Cable Roll Organizer', 'Tech Pouch'];
  } else if (matchingProducts.length > 0) {
    // Collect tags from top matching products
    const tagSet = new Set<string>();
    matchingProducts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    relatedSearchPills = Array.from(tagSet).slice(0, 5);
  }

  // 5. "Did you mean" fuzzy detection if zero product matches
  let didYouMean: string | undefined = undefined;
  if (matchingProducts.length === 0 && cleanQuery.length >= 3) {
    let lowestDistance = 999;
    let bestCorrection = '';

    COMMON_VOCABULARY.forEach((word) => {
      const dist = levenshteinDistance(cleanQuery, word);
      if (dist <= 2 && dist < lowestDistance) {
        lowestDistance = dist;
        bestCorrection = word;
      }
    });

    if (bestCorrection && lowestDistance <= 2) {
      didYouMean = bestCorrection;
    }
  }

  return {
    query: cleanQuery,
    keywords: uniqueKeywords,
    products: matchingProducts.slice(0, 6), // Return top 6 distinct matching items for preview
    totalProductMatches: matchingProducts.length,
    categoryMatches,
    relatedSearchPills,
    didYouMean
  };
}

// Local storage helper for recent searches
const RECENT_SEARCHES_KEY = 'veylora_recent_searches';

export function getRecentSearches(): string[] {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!data) return ['Keychains', 'Slim Bifold Wallet', 'Weekender Duffel'];
    return JSON.parse(data);
  } catch (e) {
    return ['Keychains', 'Slim Bifold Wallet', 'Weekender Duffel'];
  }
}

export function saveRecentSearch(query: string): void {
  const clean = query.trim();
  if (!clean) return;
  try {
    const current = getRecentSearches();
    const updated = [clean, ...current.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (e) {
    // ignore
  }
}

export function removeRecentSearch(query: string): string[] {
  try {
    const current = getRecentSearches();
    const updated = current.filter((item) => item.toLowerCase() !== query.toLowerCase());
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (e) {
    // ignore
  }
}
