import { Product, ProductReview } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'the-bento-tech-folio',
    name: 'The Bento Tech Folio',
    tagline: 'Your entire desk in one 18mm slim profile.',
    price: 3499,
    originalPrice: 4299,
    category: 'tech',
    rating: 4.9,
    reviewCount: 342,
    badge: 'Bestseller',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 },
      { name: 'Forest Olive', hex: '#3E4434', classBg: 'bg-[#3E4434]', imageIndex: 2 },
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Unclutter your daily tech carry with zero bulk.',
    experienceDesc: 'Cut from a single hide of 1.8mm vegetable-tanned leather, the Bento Folio secures your 14" laptop, chargers, Apple Pencil, and notebook in partitioned symmetry. It develops a rich caramel patina within weeks of daily handling.',
    specs: [
      'Certified LWG Gold-rated full-grain vegetable-tanned leather',
      'Accommodates up to 14" MacBook Pro or iPad Pro 12.9" with Magic Keyboard',
      'Internal dedicated slots for 65W GaN charger, SSD drive & cables',
      'Heavy-gauge YKK Excella® brass zippers with hand-skived pulls',
      'Plush microfiber interior prevents micro-scratches on anodized aluminum'
    ],
    dimensions: '35 cm × 25 cm × 2.2 cm (Weight: 420g)',
    capacity: 'Laptop, charger, cables, notebook & pens',
    materials: [
      'Top-grain vegetable-tanned bovine leather',
      'Antiqued solid brass hardware',
      'German bonded polyester thread',
      'Ultrasuede scratch-shield lining'
    ],
    careInstructions: [
      'Wipe down with a dry microfibre cloth after humid commutes',
      'Apply natural beeswax leather balm every 4-6 months',
      'Avoid continuous direct sunlight and submersion in water'
    ],
    inStock: true,
    stockCount: 14,
    tags: ['Best Seller', 'Tech', 'Folio', '14-inch', 'Work Essentials'],
    patinaNote: 'Deepens in gloss and turns two shades richer over 6 months of daily use.'
  },
  {
    id: 'prod-2',
    slug: 'the-slim-bifold-cardholder',
    name: 'The Slim Bifold Cardholder',
    tagline: 'Front-pocket freedom with quick thumb access.',
    price: 1699,
    originalPrice: 1999,
    category: 'wallets',
    rating: 4.9,
    reviewCount: 528,
    badge: 'Bestseller',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 },
      { name: 'Raw Vachetta', hex: '#D2B48C', classBg: 'bg-[#D2B48C]', imageIndex: 2 }
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517254793880-928d3ef79568?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Never sit on a bulky wallet again.',
    experienceDesc: 'Precision beveled edges and hand-waxed burnishing ensure this cardholder slips effortlessly into any tailored trouser pocket. Accommodates 8 cards plus folded currency without bulging.',
    specs: [
      'Ultra-thin 6mm empty profile',
      'External quick-draw slot for your primary payment card or metro card',
      'RFID-blocking inner lining to protect against skimming scans',
      'Dual hidden cash pockets for folded banknotes and receipts',
      'Hand-burnished edges sealed with natural Japanese beeswax'
    ],
    dimensions: '10.2 cm × 7.5 cm × 0.6 cm (Weight: 45g)',
    capacity: 'Up to 8 cards + 6 folded banknotes',
    materials: ['Full-grain pull-up leather', 'RFID shielding membrane', 'Nylon bonded stitching'],
    careInstructions: [
      'Clean gently with leather milk once a year',
      'Leather will mould to your card count over the first two weeks'
    ],
    inStock: true,
    stockCount: 28,
    tags: ['Wallet', 'Slim', 'EDC', 'Minimalist', 'RFID Safe'],
    patinaNote: 'Develops unique oil pull-up highlights along the fold and outer corners.'
  },
  {
    id: 'prod-3',
    slug: 'the-horizon-weekender-duffel',
    name: 'The Horizon Weekender Duffel',
    tagline: 'Your 3-day getaway standard in full-grain hide.',
    price: 7899,
    originalPrice: 9499,
    category: 'bags',
    rating: 4.95,
    reviewCount: 189,
    badge: "Editor's Pick",
    isBestSeller: true,
    featured: true,
    defaultColor: 'Deep Espresso',
    colors: [
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 0 },
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Engineered to fit overhead bins worldwide.',
    experienceDesc: 'Handcrafted from thick 2.2mm vegetable-tanned cowhide with reinforced dual carry handles and a padded shoulder strap. The wide doctor-bag opening stays open while packing.',
    specs: [
      'Meets IATA international carry-on dimensions',
      'Separate zippered base compartment for shoes or laundry',
      'Solid forged brass base feet prevent ground dampness and abrasion',
      'Detachable ergonomic leather shoulder strap with dual shoulder pad',
      'Reinforced riveted stress points rated to 25 kg load'
    ],
    dimensions: '52 cm × 28 cm × 26 cm (Capacity: 38 Litres, Weight: 1.8 kg)',
    capacity: '38 Litres (3-4 days clothing, shoes, toiletries & laptop)',
    materials: ['2.2mm Full-grain pull-up leather', 'Solid sand-cast brass hardware', 'Heavy 14oz cotton twill lining'],
    careInstructions: [
      'Store in provided breathable cotton dust bag when not traveling',
      'Condition with natural leather wax before seasonal road trips'
    ],
    inStock: true,
    stockCount: 8,
    tags: ['Travel', 'Duffel', 'Carry-on', 'Luxury', 'Weekend'],
    patinaNote: 'Scuffs rub out naturally with warm thumb friction; darkens to a deep vintage sheen.'
  },
  {
    id: 'prod-4',
    slug: 'the-nomad-cord-laptop-sleeve',
    name: 'The Nomad Cord & Laptop Sleeve',
    tagline: 'Streamlined armor with magnetic silent clasp.',
    price: 2899,
    originalPrice: 3499,
    category: 'tech',
    rating: 4.85,
    reviewCount: 214,
    badge: 'Bestseller',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Charge your laptop while it rests securely inside.',
    experienceDesc: 'Featuring a thoughtful side cutout for cable pass-through, the Nomad Sleeve allows you to fast-charge without removing your laptop from its padded cocoon.',
    specs: [
      'Tailored fit for 13"-14" or 15"-16" MacBook Pro and Air',
      'Concealed neodymium magnetic closure — no loud velcro or exposed metal zips',
      'Exterior expandable rear slip pocket for charging brick and notepad',
      'Dual 3mm high-density EVA foam impact shielding'
    ],
    dimensions: '36 cm × 26 cm × 1.5 cm (Weight: 310g)',
    capacity: '13-14" laptop + notebook + charging cable',
    materials: ['Semi-vegetable tanned full-grain leather', 'Neodymium magnets', 'Flocked velvet interior'],
    careInstructions: ['Spot clean with damp cotton cloth', 'Condition twice yearly'],
    inStock: true,
    stockCount: 19,
    tags: ['Sleeve', 'MacBook', 'Tech', 'Protective'],
    patinaNote: 'The magnetic flap softens and settles perfectly around your device contours.'
  },
  {
    id: 'prod-5',
    slug: 'the-meridian-commuter-backpack',
    name: 'The Meridian Commuter Backpack',
    tagline: 'Architectural lines meeting all-day ergonomics.',
    price: 8499,
    originalPrice: 9999,
    category: 'bags',
    rating: 4.9,
    reviewCount: 96,
    badge: 'New',
    isBestSeller: false,
    featured: true,
    defaultColor: 'Deep Espresso',
    colors: [
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 0 },
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Balanced weight distribution for crowded commutes.',
    experienceDesc: 'Designed in collaboration with industrial designers in Bengaluru, the Meridian features anatomically curved shoulder straps that prevent neck fatigue, paired with a hidden passport security pocket against your lumbar spine.',
    specs: [
      'Suspended 16" laptop cradle with waterproof YKK zipper',
      'Luggage trolley sleeve for effortless airport transit',
      'Quick-access magnetic key leash in front pocket',
      'Breathable padded air-mesh back panel'
    ],
    dimensions: '44 cm × 31 cm × 15 cm (Capacity: 20 Litres, Weight: 1.4 kg)',
    capacity: '20 Litres (Daily work kit + 16" laptop + gym change)',
    materials: ['Full-grain drum-dyed leather', 'Breathable lumbar mesh', 'Gunmetal finish hardware'],
    careInstructions: ['Avoid overloading beyond 12 kg', 'Store upright in dustbag'],
    inStock: true,
    stockCount: 6,
    tags: ['Backpack', 'Commute', 'Laptop', 'Luxury Carry'],
    patinaNote: 'Shoulder strap curves will mould to your unique anatomy within 3 weeks.'
  },
  {
    id: 'prod-6',
    slug: 'the-apex-passport-travel-wallet',
    name: 'The Apex Passport & Travel Wallet',
    tagline: 'Boarding gate efficiency in one hand.',
    price: 2499,
    originalPrice: 2999,
    category: 'wallets',
    rating: 4.88,
    reviewCount: 147,
    badge: 'Limited Batch',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1517254793880-928d3ef79568?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Keep boarding pass, two passports, and currency organized.',
    experienceDesc: 'Never fumble at immigration again. The Apex organizes 2 passports, 6 international cards, boarding pass, micro SIM card and retrieval pin, and folded international cash.',
    specs: [
      'Dedicated SIM card slot and stainless steel ejector pin included',
      'Full-perimeter RFID shield',
      'Pen slot tailored for mini ballpoints (complimentary brass pen included)',
      'Hidden compartment for emergency reserve foreign currency'
    ],
    dimensions: '14.5 cm × 10.5 cm × 1.2 cm (Weight: 95g)',
    capacity: '2 Passports, 6 cards, boarding pass & cash',
    materials: ['Hand-selected vegetable tanned calfskin', 'Waxed linen edge stitching'],
    careInstructions: ['Keep dry; buff with clean flannel if exposed to rain'],
    inStock: true,
    stockCount: 12,
    tags: ['Travel', 'Passport', 'EDC', 'Organized'],
    patinaNote: 'Collects subtle stamps and character marks across every passport stamp.'
  },
  {
    id: 'prod-7',
    slug: 'the-journal-folio-pen-quiver',
    name: 'The Journal Folio & Pen Quiver',
    tagline: 'Refillable sanctuary for your best ideas.',
    price: 2199,
    originalPrice: 2699,
    category: 'accessories',
    rating: 4.92,
    reviewCount: 112,
    badge: "Editor's Pick",
    isBestSeller: false,
    featured: false,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Fits standard A5 Moleskine, Leuchtturm, and Midori notebooks.',
    experienceDesc: 'A ritual in slow thinking. The Journal Folio wraps standard A5 hardbound or softcover notebooks with an integrated fountain pen quiver and dual business card slits.',
    specs: [
      'Fits standard 14 cm × 21 cm A5 refills',
      'Accommodates thick barrel pens up to 15mm diameter',
      'Comes pre-loaded with an 80gsm fountain-pen friendly blank notebook',
      'Leather ribbon page marker with solid brass finial'
    ],
    dimensions: '22 cm × 16 cm × 2 cm (Weight: 260g)',
    capacity: '1 A5 notebook + 1 luxury pen + 4 cards',
    materials: ['Full-grain saddle leather', 'Brass hardware', 'Acid-free paper insert'],
    careInstructions: ['Condition when changing notebook refills'],
    inStock: true,
    stockCount: 22,
    tags: ['Journal', 'A5', 'Writer', 'Stationery'],
    patinaNote: 'Develops rich desk-burnishing along the spine.'
  },
  {
    id: 'prod-8',
    slug: 'the-keywrap-carabiner-airtag',
    name: 'The KeyWrap & AirTag Holster',
    tagline: 'Silent, scratch-free key containment.',
    price: 1499,
    originalPrice: 1799,
    category: 'accessories',
    rating: 4.79,
    reviewCount: 260,
    badge: 'Bestseller',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Forest Olive',
    colors: [
      { name: 'Forest Olive', hex: '#3E4434', classBg: 'bg-[#3E4434]', imageIndex: 0 },
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 1 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 2 }
    ],
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Eliminate key jingling and phone screen scratches.',
    experienceDesc: 'Secures 2 to 7 keys in a rigid leather sheath with an integrated Apple AirTag pocket and a drop-forged brass spring carabiner that clips to your belt loop.',
    specs: [
      'Apple AirTag snap pocket with acoustic speaker cutouts',
      'Hardened stainless steel Chicago screw post prevents loose keys',
      'Drop-forged brass quick-release carabiner',
      'Tough 2.5mm harness leather'
    ],
    dimensions: '9 cm × 3.5 cm × 2 cm (Weight: 52g)',
    capacity: '2-7 standard door/car keys + 1 AirTag',
    materials: ['Heavy saddle harness leather', 'Solid antiqued brass screw & clip'],
    careInstructions: ['Tighten screw post with a coin every 6 months'],
    inStock: true,
    stockCount: 35,
    tags: ['Keychain', 'Keychains', 'Key Ring', 'Keys', 'AirTag', 'EDC', 'Pocket'],
    patinaNote: 'Softens with pocket tumble and absorbs oils from your hands.'
  },
  {
    id: 'prod-9',
    slug: 'the-solid-brass-carabiner-key-fob',
    name: 'The Solid Brass Carabiner & Leather Key Fob',
    tagline: 'Heavy sand-cast brass with full-grain bridle loop.',
    price: 899,
    originalPrice: 1199,
    category: 'accessories',
    rating: 4.88,
    reviewCount: 184,
    badge: 'Popular',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 },
      { name: 'Forest Olive', hex: '#3E4434', classBg: 'bg-[#3E4434]', imageIndex: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Effortless one-handed clip to belt loops or tote handles.',
    experienceDesc: 'Cast from heavy untreated solid brass and riveted to 3mm bridle leather, this key fob holds your house and automotive keys with timeless ruggedness. The brass naturally oxidizes with handling.',
    specs: [
      'Drop-forged solid brass heavy duty carabiner clip',
      'Hand-burnished vegetable-tanned bridle leather strap',
      'Includes dual 30mm flat split rings for multi-key organization',
      'Corrosion resistant and salt-air proof'
    ],
    dimensions: '12 cm × 2.8 cm × 1.2 cm (Weight: 68g)',
    capacity: 'Up to 10 keys + car remote fob',
    materials: ['Sand-cast solid brass', 'Full-grain English bridle leather'],
    careInstructions: ['Rub brass with microfiber to renew shine or leave to develop natural patina'],
    inStock: true,
    stockCount: 42,
    tags: ['Keychain', 'Keychains', 'Car Key', 'Brass Clip', 'Key Fob', 'EDC', 'Keys', 'Key Ring'],
    patinaNote: 'The brass gains a vintage bronze glow, and leather softens into rich amber.'
  },
  {
    id: 'prod-10',
    slug: 'the-orbit-silent-key-organiser',
    name: 'The Orbit Silent Multi-Key Organiser',
    tagline: 'Rotary stack system stops jingling and pocket scratch.',
    price: 1299,
    originalPrice: 1599,
    category: 'accessories',
    rating: 4.82,
    reviewCount: 139,
    badge: 'Trending',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Deep Espresso',
    colors: [
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 0 },
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Transforms an unruly cluster of keys into a Swiss-army knife profile.',
    experienceDesc: 'Houses 2 to 7 keys neatly sandwiched inside a sleek leather band. An integrated wave washer maintains friction so keys swing out smoothly without loosening over time.',
    specs: [
      'Stainless steel locking mechanism prevents screw backing out',
      'External D-ring for bulky car remotes and key fobs',
      'Beveled hand-finished edges sealed with bee wax',
      'Slim 18mm pocket profile'
    ],
    dimensions: '8.5 cm × 2.2 cm × 1.8 cm (Weight: 38g)',
    capacity: '2 to 7 standard flat keys + external car fob',
    materials: ['Full-grain pull-up leather', 'Marine grade stainless steel locking post'],
    careInstructions: ['Tighten friction bolt with thumbnail or flat screwdriver periodically'],
    inStock: true,
    stockCount: 29,
    tags: ['Keychain', 'Keychains', 'Key Organiser', 'Key Ring', 'Keys', 'EDC', 'Pocket', 'Minimalist'],
    patinaNote: 'Moulds closely to the thickness of your exact keys within days.'
  },
  {
    id: 'prod-11',
    slug: 'the-heritage-braided-leather-lanyard-keychain',
    name: 'The Heritage Braided Leather Lanyard Keychain',
    tagline: 'Hand-plaited four-strand calfskin with 360° swivel clip.',
    price: 799,
    originalPrice: 999,
    category: 'accessories',
    rating: 4.76,
    reviewCount: 94,
    badge: 'New',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Comfortable wrist loop ensures you never drop keys while carrying groceries.',
    experienceDesc: 'Four individual strips of supple calfskin leather are hand-braided by our artisans in Jaipur, anchored with brass wire whip-finishing and a heavy swivel lobster clasp.',
    specs: [
      '360-degree rotating solid brass lobster clasp',
      'Four-plait round braid for maximum tensile strength (tested to 30kg)',
      'Comfortable 16cm wrist loop circumference',
      'Solid brass stamped Veylora insignia ring'
    ],
    dimensions: '18 cm × 1.8 cm (Weight: 45g)',
    capacity: 'Car fob, house keys, mini flashlight',
    materials: ['Supple vegetable-tanned calfskin', 'Antiqued solid brass clasp & ring'],
    careInstructions: ['Keep away from prolonged soaking; condition braid with beeswax balm'],
    inStock: true,
    stockCount: 50,
    tags: ['Keychain', 'Keychains', 'Wristlet', 'Lanyard', 'Key Ring', 'Car Key', 'EDC', 'Keys'],
    patinaNote: 'The round braid becomes silky-soft and flexible with everyday wrist wear.'
  },
  {
    id: 'prod-12',
    slug: 'the-minimalist-magsafe-card-wallet',
    name: 'The Minimalist MagSafe Leather Card Wallet',
    tagline: 'Snap to iPhone or slide into skinny jeans with ease.',
    price: 1399,
    originalPrice: 1799,
    category: 'wallets',
    rating: 4.91,
    reviewCount: 312,
    badge: 'Bestseller',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: '3,000 Gauss neodymium magnet array locks firmly to your phone.',
    experienceDesc: 'Designed for the modern cashless nomad. Holds 3 essential credit/debit cards plus an emergency folded banknote with an easy thumb cutout for instant extraction at the counter.',
    specs: [
      'Strong N52 neodymium magnetic ring array compatible with all MagSafe iPhones & cases',
      'Built-in shielding prevents demagnetization of payment card magnetic strips',
      'Rear ergonomic thumb slot for instant card flick',
      'Hand-skived ultra-thin 5mm profile'
    ],
    dimensions: '9.6 cm × 6.5 cm × 0.5 cm (Weight: 36g)',
    capacity: 'Up to 3 cards + 1 folded banknote',
    materials: ['Full-grain pull-up leather', 'N52 Neodymium magnets', 'Shielded inner lining'],
    careInstructions: ['Wipe clean with a dry cotton cloth'],
    inStock: true,
    stockCount: 38,
    tags: ['Wallet', 'Wallets', 'Cardholder', 'MagSafe', 'iPhone', 'Minimalist', 'Slim', 'EDC'],
    patinaNote: 'Develops distinctive sheen from daily palm holding and wireless charging warmth.'
  },
  {
    id: 'prod-13',
    slug: 'the-executive-trifold-currency-wallet',
    name: 'The Executive Trifold Currency & Coin Wallet',
    tagline: 'Classic full-capacity wallet with concealed brass coin snap.',
    price: 2299,
    originalPrice: 2899,
    category: 'wallets',
    rating: 4.86,
    reviewCount: 165,
    badge: 'Classic',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Deep Espresso',
    colors: [
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 0 },
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1517254793880-928d3ef79568?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Holds flat full-length currency notes without folding, plus 10 cards and coins.',
    experienceDesc: 'For those who appreciate classic capacity. Features two full-length billfold dividers for Indian Rupee notes, a gusseted coin pocket with brass prym snap, and 8 dedicated card slots.',
    specs: [
      'Full-perimeter RFID protection across all card pockets',
      'Dual currency chambers (fits ₹500, ₹200, ₹100 notes without folding)',
      'Gusseted coin tray with German Prym brass press snap',
      'Clear ID window for driver license or metro pass'
    ],
    dimensions: '11.5 cm × 9.5 cm × 1.6 cm (Weight: 88g)',
    capacity: '10-12 cards + 15 banknotes + 10 coins',
    materials: ['LWG Gold-certified vegetable-tanned leather', 'Brass snap fastener', 'RFID foil'],
    careInstructions: ['Condition yearly; avoid overloading with unnecessary paper receipts'],
    inStock: true,
    stockCount: 22,
    tags: ['Wallet', 'Wallets', 'Trifold', 'Bifold', 'Coin Pouch', 'Cash', 'Cards', 'Classic'],
    patinaNote: 'The grain deepens into rich espresso tones along all stress folds.'
  },
  {
    id: 'prod-14',
    slug: 'the-crossbody-leather-sling-bag',
    name: 'The Crossbody Leather Sling Bag',
    tagline: 'Hands-free urban mobility with quick-adjust brass slider.',
    price: 4499,
    originalPrice: 5499,
    category: 'bags',
    rating: 4.93,
    reviewCount: 218,
    badge: 'Bestseller',
    isBestSeller: true,
    featured: true,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Wear across chest or back for effortless city exploration and travel.',
    experienceDesc: 'Engineered for your daily carry when a backpack is too bulky and pockets are not enough. Fits your Kindle/iPad Mini, power bank, sunglasses case, keys, and wallet comfortably.',
    specs: [
      'Weather-shielded YKK brass zippers with glove-friendly leather pulls',
      'Reversible strap anchor clips for left or right shoulder carry',
      'Concealed anti-theft zipper pocket against your body for passport and wallet',
      'Wide adjustable seatbelt webbing and leather comfort shoulder pad'
    ],
    dimensions: '29 cm × 17 cm × 8 cm (Weight: 510g)',
    capacity: 'iPad Mini / Kindle, power bank, wallet, keys, sunglasses',
    materials: ['Full-grain pull-up cowhide', 'Antiqued solid brass hardware', 'Heavy twill lining'],
    careInstructions: ['Condition with leather cream twice a year'],
    inStock: true,
    stockCount: 16,
    tags: ['Bag', 'Bags', 'Sling Bag', 'Crossbody', 'Travel', 'Commute', 'Chest Bag', 'Carry'],
    patinaNote: 'Develops unique vintage highs and lows where the bag rests against your hip.'
  },
  {
    id: 'prod-15',
    slug: 'the-atelier-leather-desk-mat',
    name: 'The Atelier Full-Grain Leather Desk Mat',
    tagline: 'Supple 90cm workspace foundation for keyboards and optical mice.',
    price: 2799,
    originalPrice: 3499,
    category: 'accessories',
    rating: 4.95,
    reviewCount: 177,
    badge: 'Workspace',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'Waterproof vegetable finish that provides smooth mouse tracking and wrist warmth.',
    experienceDesc: 'Elevate your daily desk setup with a generous single piece of 2mm vegetable-tanned hide. Cushions your wrists while typing and protects your desktop from mug rings and scratches.',
    specs: [
      'Generous 90 cm × 40 cm dimensions fits full keyboard and mouse with ample room',
      'Precision laser-cut smooth beveled edges',
      'Micro-suction natural suede backing prevents desk slippage',
      'Water-resistant natural wax finish repels accidental coffee drops'
    ],
    dimensions: '90 cm × 40 cm × 0.22 cm (Weight: 620g)',
    capacity: 'Full keyboard, optical mouse, laptop, notepad & coffee mug',
    materials: ['Full-grain saddle hide', 'Natural suede anti-slip backing'],
    careInstructions: ['Wipe spills immediately with a dry cloth; roll with leather side out when moving'],
    inStock: true,
    stockCount: 25,
    tags: ['Desk Mat', 'Mousepad', 'Workspace', 'Desk', 'Accessories', 'Office', 'Stationery'],
    patinaNote: 'Develops rich warm honey hues where your wrists rest over months of work.'
  },
  {
    id: 'prod-16',
    slug: 'the-artisan-cord-charger-roll',
    name: 'The Artisan Cable & Charger Roll Organizer',
    tagline: 'Roll up tangled cables, GaN chargers, and adapters in bespoke leather.',
    price: 1699,
    originalPrice: 2199,
    category: 'tech',
    rating: 4.84,
    reviewCount: 142,
    badge: 'Staff Pick',
    isBestSeller: false,
    featured: false,
    defaultColor: 'Cognac Tan',
    colors: [
      { name: 'Cognac Tan', hex: '#C07A46', classBg: 'bg-[#C07A46]', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#2A201C', classBg: 'bg-[#2A201C]', imageIndex: 1 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80'
    ],
    hook: 'No more knots, crushed adapter pins, or loose dongles at the bottom of your bag.',
    experienceDesc: 'Five heavy-duty elasticized leather loops and a zippered brass pouch for thumb drives and SD cards, bound together with an adjustable wrap-around leather tie strap.',
    specs: [
      '5 Dedicated cable and adapter slots with elasticized leather bands',
      'Zippered pouch for AirPods, thumb drives, and Apple Pencil tips',
      'Compact wrap-up roll design secures with brass stud finial',
      'Flocked scratch-resistant interior lining'
    ],
    dimensions: '42 cm × 18 cm open; 18 cm × 8 cm rolled (Weight: 165g)',
    capacity: '4 Cables, 65W charger brick, mouse/AirPods, 3 USB adapters',
    materials: ['Full-grain pull-up leather', 'Solid brass hardware', 'Heavy duty elastic'],
    careInstructions: ['Roll gently; avoid bending around sharp metal objects'],
    inStock: true,
    stockCount: 31,
    tags: ['Cable Organizer', 'Charger', 'Tech Pouch', 'Wires', 'Travel Tech', 'Folio', 'Tech'],
    patinaNote: 'The wrap strap softens and wraps tighter around your exact accessories.'
  }
];

export const REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Vikramaditya Sengupta',
    city: 'Mumbai',
    rating: 5,
    date: '14 August 2024',
    title: 'The patina on the Bento Folio is genuine art.',
    content: 'I was hesitant about ordering leather goods online without feeling the grain first. Three months in, the leather has softened into the deepest rich cognac. The zipper is butter-smooth and my 14-inch M3 Max fits like a custom glove. No fake shine, just pure craftsmanship.',
    verified: true,
    productBought: 'The Bento Tech Folio',
    helpfulCount: 42,
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    author: 'Ananya Deshmukh',
    city: 'Bengaluru',
    rating: 5,
    date: '28 July 2024',
    title: 'Replaced a ₹28,000 Italian designer cardholder.',
    content: 'The edge burnishing on the Slim Bifold is immaculate. I carry 6 cards and a few emergency ₹500 notes. It leaves zero pocket imprint in my work trousers. Worth every rupee and proud that this level of finish is made in India.',
    verified: true,
    productBought: 'The Slim Bifold Cardholder',
    helpfulCount: 38,
    userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    author: 'Arjun Nambiar',
    city: 'Delhi NCR',
    rating: 5,
    date: '03 September 2024',
    title: 'Weekender Duffel handled 4 flights without a mark.',
    content: 'Solid brass feet underneath are a godsend when setting down on dirty airport lounge floors. Fits easily into Indigo and Air India overhead lockers. The leather smells like authentic vegetable bark, not petrochemical solvent.',
    verified: true,
    productBought: 'The Horizon Weekender Duffel',
    helpfulCount: 56,
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const CATEGORIES = [
  {
    id: 'wallets',
    name: 'Wallets & Cardholders',
    desc: 'Front-pocket freedom with RFID defense.',
    itemCount: '3 Models',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tech',
    name: 'Tech Organizers & Folios',
    desc: 'Bespoke protection for laptops and peripherals.',
    itemCount: '2 Models',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bags',
    name: 'Duffels & Travel Carry',
    desc: 'Hand-riveted luggage for 3-day journeys.',
    itemCount: '2 Models',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Leather Quality',
    veylora: 'Certified LWG Gold full-grain vegetable-tanned bovine hide',
    typical: 'Coated "genuine leather" or polyurethane (PU) synthetic splits',
    benefit: 'Ages into a rich natural patina; never cracks or peels'
  },
  {
    feature: 'Hardware & Zippers',
    veylora: 'Solid sand-cast antiqued brass & YKK Excella® luxury metal zips',
    typical: 'Electroplated zinc alloy that tarnishes and chips within months',
    benefit: 'Lifetime replacement guarantee on all zippers and brass snaps'
  },
  {
    feature: 'Craftsmanship & Edges',
    veylora: 'Hand-beveled and burnished with natural beeswax and friction',
    typical: 'Thick synthetic rubber edge paint that splits after slight bending',
    benefit: 'Smooth seamless pocket ingress that never catches on fabric'
  },
  {
    feature: 'Pricing & Middlemen',
    veylora: 'Direct workshop-to-doorstep pricing (₹1,499 – ₹8,999)',
    typical: '300-500% luxury retail markups for brand logo status',
    benefit: 'Uncompromising artisanal grade at fair everyday investment'
  }
];

export const LIFESTYLE_GALLERY = [
  {
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    caption: 'Morning espresso in Bandra with the Bento Folio.'
  },
  {
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    caption: 'Minimalist desktop workflow.'
  },
  {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    caption: 'Ready for gate call at T2 Delhi.'
  },
  {
    image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80',
    caption: 'Weekender packed for Coorg retreat.'
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    caption: 'Jaipur workshop bench tools.'
  },
  {
    image: 'https://images.unsplash.com/photo-1517254793880-928d3ef79568?auto=format&fit=crop&w=800&q=80',
    caption: 'Everyday carry flat lay in warm natural light.'
  }
];

export const FAQS = [
  {
    question: 'How do I care for full-grain vegetable-tanned leather?',
    answer: 'Vegetable-tanned leather thrives with everyday handling because the natural oils from your palms keep it hydrated. For periodic maintenance, wipe with a dry cotton cloth and apply a dab of organic beeswax conditioner every 4-6 months. If caught in rain, let it air dry away from heaters.'
  },
  {
    question: 'What is your shipping timeline and return policy?',
    answer: 'All orders placed before 2 PM IST ship the same business day via BlueDart or Delhivery Air Express (2-3 days for metros, 3-5 days for rest of India). We provide a 7-day hassle-free doorstep exchange or return guarantee. If the product is in unused condition, our courier picks it up directly from your door.'
  },
  {
    question: 'What does the Lifetime Warranty cover?',
    answer: 'Our lifetime warranty covers all functional hardware: solid brass rivets, snaps, carabiners, and YKK Excella® zipper mechanisms. If a zipper or brass fastener fails under standard usage at any point in its lifetime, we repair or replace it free of charge.'
  },
  {
    question: 'Can I add custom monogram initials to my leather piece?',
    answer: 'Yes! We offer complimentary blind or gold foil hot-stamp debossing (up to 3 initials) on the Bento Folio, Slim Bifold, and Weekender Duffel. You can specify your initials directly on the product page before adding to cart.'
  },
  {
    question: 'Does full-grain leather scratch easily?',
    answer: 'High-grade pull-up leather does record light surface marks from nails or keys, which is the defining trademark of genuine leather. These marks are easily rubbed away by massaging the surface with a warm thumb or clean microfiber cloth.'
  }
];
