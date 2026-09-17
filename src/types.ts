export type ProductCategory = 'all' | 'wallets' | 'tech' | 'bags' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  classBg?: string;
  imageIndex: number;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  productBought: string;
  helpfulCount: number;
  userImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'wallets' | 'tech' | 'bags' | 'accessories';
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New' | 'Limited Batch' | "Editor's Pick" | 'Popular' | 'Trending' | 'Classic' | 'Staff Pick' | 'Workspace';
  images: string[];
  colors: ProductColor[];
  defaultColor: string;
  hook: string;
  experienceDesc: string;
  specs: string[];
  dimensions: string;
  capacity?: string;
  materials: string[];
  careInstructions: string[];
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  featured?: boolean;
  tags: string[];
  patinaNote?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  color: string;
  quantity: number;
  monogram?: string;
}

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'about' 
  | 'reviews' 
  | 'shipping' 
  | 'faq' 
  | 'contact' 
  | 'checkout' 
  | 'order-success';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  saveInfo: boolean;
  notes?: string;
}

export interface CompletedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  trackingCode: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: ProductCategory;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
  inStockOnly: boolean;
}
