// lib/packages.ts
export type Theme = 'nature' | 'adventure' | 'culture' | null;

export type Pkg = {
  id: number;
  title: string;
  subtitle: string;
  price: number;        // "From" price per person
  currency: string;     // 'ZAR' for Cape Town
  cta: string;
  image: string;
  highlights: string[];
  location?: string;
  theme?: Theme;
};

// Per-person activity prices in ZAR (from client doc)
export type ActivityOption = { name: string; priceZAR: number };
export const PRICE_CATALOG: Record<Exclude<Theme, null>, ActivityOption[]> = {
  nature: [
    { name: "Wine Safari (tastings, transport, guide)", priceZAR: 1790 },
    { name: "Peninsula Safari",                          priceZAR: 2790 },
    { name: "Robben Island (ferry ticket)",              priceZAR: 750  },
    { name: "Sunset Catamaran Cruise (welcome drink)",   priceZAR: 595  },
  ],
  adventure: [
    { name: "Shark Cage Diving (Gansbaai)",              priceZAR: 3995 },
    { name: "Ziplining (incl. transfers)",               priceZAR: 1250 },
    { name: "Surfing Lesson (board, wetsuit, coach)",    priceZAR: 750  },
  ],
  culture: [
    { name: "Robben Island (ferry ticket)",              priceZAR: 750  },
    { name: "Sunset Catamaran Cruise (welcome drink)",   priceZAR: 595  },
  ],
};

// Shared packages list (detail page, cards, book page all import this)
export async function getPackages(): Promise<Pkg[]> {
  // If you later switch to API, replace this function only.
  return [
    {
      id: 1,
      title: 'Nature Package',
      subtitle: 'Outdoor & Scenic Explorers',
      price: 1790,               // "From" = cheapest nature activity, per person
      currency: 'ZAR',
      cta: 'Book now',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      highlights: [
        'Table Mountain hike',
        'Kirstenbosch Gardens',
        'Cape Point & Chapman’s Peak',
      ],
      location: 'Cape Town, South Africa',
      theme: 'nature',
    },
    {
      id: 2,
      title: 'Adventure Package',
      subtitle: 'Thrill-seekers itinerary',
      price: 750,                // "From" = cheapest adventure activity, per person
      currency: 'ZAR',
      cta: 'Explore',
      image:
        'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Shark cage diving', 'Paragliding', 'Sandboarding'],
      location: 'Cape Town, South Africa',
      theme: 'adventure',
    },
    {
      id: 3,
      title: 'Culture & Urban Style',
      subtitle: 'City lovers & culture enthusiasts',
      price: 750,                // "From" = Robben Island ticket, per person
      currency: 'ZAR',
      cta: 'Discover',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Robben Island', 'Bo-Kaap tour', 'Zeitz MOCAA & V&A'],
      location: 'Cape Town, South Africa',
      theme: 'culture',
    },
  ];
}
