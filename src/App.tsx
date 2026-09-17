import React, { useState, useEffect } from 'react';
import { Product, CartItem, PageType, ProductCategory, CompletedOrder } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { BestSellers } from './components/BestSellers';
import { CategoryTiles } from './components/CategoryTiles';
import { BrandStory } from './components/BrandStory';
import { SocialProof } from './components/SocialProof';
import { ComparisonBlock } from './components/ComparisonBlock';
import { LifestyleGallery } from './components/LifestyleGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { AboutView } from './components/AboutView';
import { ReviewsView } from './components/ReviewsView';
import { ShippingReturnsView } from './components/ShippingReturnsView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation & View State
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Cart & Promo
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veylora_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Seed with 1 bestseller by default for instant delight
    return [
      {
        id: `cart-${PRODUCTS[0].id}-${Date.now()}`,
        productId: PRODUCTS[0].id,
        product: PRODUCTS[0],
        color: PRODUCTS[0].defaultColor,
        quantity: 1,
        monogram: 'K.M.'
      }
    ];
  });

  const [promoCode, setPromoCode] = useState<string | null>('FIRST500');
  const [discountAmount, setDiscountAmount] = useState<number>(500);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veylora_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Scroll to top on navigation
  const navigateTo = (page: PageType, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchQuerySelect = (query: string, category?: ProductCategory) => {
    setSearchQuery(query);
    if (category && category !== 'all') {
      setSelectedCategory(category);
    }
    navigateTo('shop');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Cart Management
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    quantity: number = 1,
    monogram?: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.color === selectedColor &&
          item.monogram === (monogram || undefined)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${product.id}-${Date.now()}`,
        productId: product.id,
        product,
        color: selectedColor,
        quantity,
        monogram: monogram || undefined
      };
      return [...prev, newItem];
    });

    showToast(`Added ${product.name} (${selectedColor}) to your bag`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from carry bag');
  };

  const handleApplyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'FIRST500') {
      setPromoCode('FIRST500');
      setDiscountAmount(500);
      showToast('₹500 inaugural discount applied!');
    } else if (upper === 'PATINA10') {
      setPromoCode('PATINA10');
      const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      showToast(`10% discount applied (-₹${disc})`);
    } else if (upper === 'HEIRLOOM') {
      setPromoCode('HEIRLOOM');
      setDiscountAmount(1000);
      showToast('₹1,000 heirloom collector credit applied!');
    } else {
      showToast('Invalid promo code. Try FIRST500 for ₹500 off.');
    }
  };

  const handleOrderComplete = (order: CompletedOrder) => {
    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    showToast(`Order ${order.orderId} successfully placed! BlueDart tracking generated.`);
  };

  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div id="veylora-storefront" className="min-h-screen bg-[#fbf9f5] text-[#1a1715] flex flex-col font-sans selection:bg-[#c07a46]/20 selection:text-[#1a1715]">
      
      {/* Universal Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onSearchQuerySelect={handleSearchQuerySelect}
        onQuickAdd={(product, color) => handleAddToCart(product, color, 1)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOMEPAGE */}
        {currentPage === 'home' && (
          <>
            <HeroSection
              onShopClick={() => navigateTo('shop')}
              onStoryClick={() => navigateTo('about')}
            />
            <TrustStrip />
            <BestSellers
              products={PRODUCTS}
              onSelectProduct={(id) => navigateTo('product-detail', id)}
              onQuickAdd={(product, color) => handleAddToCart(product, color, 1)}
              onQuickView={(product) => setQuickViewProduct(product)}
              onViewAll={() => navigateTo('shop')}
            />
            <CategoryTiles
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop');
              }}
            />
            <BrandStory onLearnMore={() => navigateTo('about')} />
            <SocialProof onViewAllReviews={() => navigateTo('reviews')} />
            <ComparisonBlock />
            <LifestyleGallery />
            <NewsletterSection
              onSubscribed={(email) =>
                showToast(`Welcome ${email}! Code FIRST500 active for ₹500 off.`)
              }
            />
          </>
        )}

        {/* VIEW 2: FULL CATALOG / SHOP */}
        {currentPage === 'shop' && (
          <ShopView
            products={PRODUCTS}
            initialCategory={selectedCategory}
            initialSearchQuery={searchQuery}
            onSelectProduct={(id) => navigateTo('product-detail', id)}
            onQuickAdd={(product, color) => handleAddToCart(product, color, 1)}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        )}

        {/* VIEW 3: PRODUCT DETAIL PAGE */}
        {currentPage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={PRODUCTS}
            onSelectProduct={(id) => navigateTo('product-detail', id)}
            onAddToCart={handleAddToCart}
            onOpenReviews={() => navigateTo('reviews')}
          />
        )}

        {/* VIEW 4: CRAFT & STORY */}
        {currentPage === 'about' && (
          <AboutView onShopClick={() => navigateTo('shop')} />
        )}

        {/* VIEW 5: VERIFIED REVIEWS */}
        {currentPage === 'reviews' && (
          <ReviewsView onShopClick={() => navigateTo('shop')} />
        )}

        {/* VIEW 6: SHIPPING & RETURNS */}
        {currentPage === 'shipping' && (
          <ShippingReturnsView onShopClick={() => navigateTo('shop')} />
        )}

        {/* VIEW 7: FAQ & CARE */}
        {currentPage === 'faq' && <FaqView />}

        {/* VIEW 8: ATELIER CONCIERGE & CONTACT */}
        {currentPage === 'contact' && <ContactView />}

      </main>

      {/* Universal Luxury Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('shop');
        }}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onApplyPromo={handleApplyPromo}
        discountAmount={discountAmount}
        appliedPromoCode={promoCode}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={discountAmount}
        promoCode={promoCode}
        onOrderComplete={handleOrderComplete}
      />

      {/* Order Confirmed Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onContinueShopping={() => navigateTo('shop')}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullDetails={(id) => {
          setQuickViewProduct(null);
          navigateTo('product-detail', id);
        }}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

    </div>
  );
}
