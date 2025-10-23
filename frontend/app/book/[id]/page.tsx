// app/book/[id]/page.tsx
import Image from 'next/image';
import Footer from '../../../components/Footer';
import BookingForm from '../../../components/BookingForm';

type Theme = 'nature' | 'adventure' | 'culture' | null;

type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;      // "From" price per person
  currency: string;   // 'ZAR' for CT packages
  image: string;
  highlights: string[];
  theme?: Theme;      // used to decide if options should show
};

type ActivityOption = { name: string; priceZAR: number };

// Server-safe formatter (no hooks)
function formatPrice(amount: number, currency: string) {
  const locale = currency === 'ZAR' ? 'en-ZA' : 'en-US';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency === 'ZAR' ? 'R' : currency} ${amount.toLocaleString('en-ZA')}`;
  }
}

// Prices taken from the client's "ACTIVITIES BOARD" (per person, ZAR).
const PRICE_CATALOG: Record<Exclude<Theme, null>, ActivityOption[]> = {
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

// Fetch packages – if your API returns packages, we infer theme from title.
// Fallback uses real ZAR "from" prices for the 3 curated CT packages.
async function getPackages(): Promise<Package[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${base}/api/packages/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Bad status');
    const data = await res.json();
    const list: Package[] = (data.packages as Package[]).map(addThemeFromTitle);
    return list;
  } catch {
    return [
      {
        id: 1,
        title: 'Nature Package',
        subtitle: 'Outdoor & Scenic Explorers',
        price: 1790, // from price = cheapest activity per person
        currency: 'ZAR',
        image:
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
        highlights: ['Table Mountain hike', 'Kirstenbosch Gardens', 'Cape Point & Chapman’s Peak'],
        theme: 'nature',
      },
      {
        id: 2,
        title: 'Adventure Package',
        subtitle: 'Thrill-seekers itinerary',
        price: 750, // from price = cheapest activity per person
        currency: 'ZAR',
        image:
          'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
        highlights: ['Shark cage diving', 'Paragliding', 'Sandboarding'],
        theme: 'adventure',
      },
      {
        id: 3,
        title: 'Culture & Urban Style',
        subtitle: 'City lovers & culture enthusiasts',
        price: 750, // from price = Robben Island ticket per person
        currency: 'ZAR',
        image:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
        highlights: ['Robben Island', 'Bo-Kaap tour', 'Zeitz MOCAA & V&A'],
        theme: 'culture',
      },
      // Example of a non-CT package without curated options:
      {
        id: 4,
        title: 'Greek Islands Escape',
        subtitle: '7 nights • island hopping',
        price: 1199,
        currency: 'EUR',
        image:
          'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
        highlights: ['Ferry passes', 'Santorini sunset', 'Mykonos tour'],
        theme: null,
      },
    ];
  }
}

// Infer theme from title if API doesn’t provide it
function addThemeFromTitle(p: Package): Package {
  const t = (p.title || '').toLowerCase();
  let theme: Theme = null;
  if (t.includes('nature')) theme = 'nature';
  else if (t.includes('adventure')) theme = 'adventure';
  else if (t.includes('culture') || t.includes('urban')) theme = 'culture';
  return { ...p, theme: p.theme ?? theme };
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold">Package not found</h1>
        <p className="mt-2">Go back and choose another package.</p>
        <Footer />
      </main>
    );
  }

  const showOptions = Boolean(pkg.theme);
  const priceCatalog = pkg.theme ? PRICE_CATALOG[pkg.theme] : undefined;

  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">
          {/* Left: Title + image + meta */}
          <section>
            <h1 className="text-3xl font-semibold">Book: {pkg.title}</h1>
            <p className="text-gray-600 mt-1">{pkg.subtitle}</p>

            {pkg.image && (
              <div className="mt-6 overflow-hidden rounded-2xl shadow">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-700">
              <strong>From:</strong> {formatPrice(pkg.price, pkg.currency)} ·{' '}
              <strong>Highlights:</strong> {pkg.highlights.join(' • ')}
            </div>
          </section>

          {/* Right: Booking form */}
          <section className="bg-white rounded-2xl shadow p-5">
            {/* @ts-expect-error if your BookingForm doesn't yet accept these props, add them */}
            <BookingForm
              pkg={pkg}
              theme={pkg.theme}
              showOptions={showOptions}
              priceCatalog={priceCatalog}
              // transportRateZAR: pass a number (e.g., 950) to enable the transport toggle. Omit/0 to hide.
            />
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
