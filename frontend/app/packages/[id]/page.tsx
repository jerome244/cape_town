// app/packages/[id]/page.tsx
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

/* ---------- Types ---------- */
type Theme = 'nature' | 'adventure' | 'culture' | null;

type ActivityAddon = { name: string; priceZAR: number };

type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;          // package "From" price per person (ZAR)
  currency: string;       // 'ZAR' for CT packages
  cta: string;
  image: string;
  highlights: string[];   // quick chips
  included: string[];     // INCLUDED in the package (not selectable)
  addons?: ActivityAddon[]; // OPTIONAL add-ons (priced per person)
  location?: string;
  theme?: Theme;
};

/* ---------- Server-safe formatting (no hooks) ---------- */
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
const formatZAR = (amount: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount);

/* ---------- Data (replace with API if available) ---------- */
async function getPackages(): Promise<Package[]> {
  return [
    {
      id: 1,
      title: 'Nature Package',
      subtitle: 'Outdoor & Scenic Explorers',
      price: 6790, // ← package "from" price per person (placeholder, adjust to your real base)
      currency: 'ZAR',
      cta: 'Book now',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Table Mountain', 'Kirstenbosch', 'Cape Point'],
      included: [
        'Table Mountain hike (guided)',
        'Kirstenbosch Gardens visit',
        'Cape Point Reserve (lookouts & lighthouse)',
        "Chapman’s Peak scenic drive (photo stops)",
      ],
      addons: [
        { name: 'Wine Safari (tastings, transport, guide)', priceZAR: 1790 },
        { name: 'Robben Island (ferry ticket)', priceZAR: 750 },
        { name: 'Sunset Catamaran Cruise (welcome drink)', priceZAR: 595 },
      ],
      location: 'Cape Town, South Africa',
      theme: 'nature',
    },
    {
      id: 2,
      title: 'Adventure Package',
      subtitle: 'Thrill-seekers itinerary',
      price: 7490, // placeholder base (ZAR/person) – adjust to your real base
      currency: 'ZAR',
      cta: 'Explore',
      image:
        'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Paragliding', 'Sandboarding', 'Kayaking'],
      included: [
        'Paragliding from Signal Hill (weather-dependent)',
        'Sandboarding at Atlantis Dunes',
        'Sea kayaking in False Bay',
      ],
      addons: [
        { name: 'Shark Cage Diving (Gansbaai)', priceZAR: 3995 },
        { name: 'Ziplining (incl. transfers)', priceZAR: 1250 },
        { name: 'Surfing Lesson (board, wetsuit, coach)', priceZAR: 750 },
      ],
      location: 'Cape Town, South Africa',
      theme: 'adventure',
    },
    {
      id: 3,
      title: 'Culture & Urban Style',
      subtitle: 'City lovers & culture enthusiasts',
      price: 5590, // placeholder base (ZAR/person) – adjust to your real base
      currency: 'ZAR',
      cta: 'Discover',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Bo-Kaap', 'Zeitz MOCAA', 'V&A Waterfront'],
      included: [
        'Bo-Kaap walking tour (heritage & cuisine)',
        'Zeitz MOCAA contemporary art visit',
        'V&A Waterfront time (shopping & dining)',
      ],
      addons: [
        { name: 'Robben Island (ferry ticket)', priceZAR: 750 },
        { name: 'Sunset Catamaran Cruise (welcome drink)', priceZAR: 595 },
      ],
      location: 'Cape Town, South Africa',
      theme: 'culture',
    },
  ];
}

/* ---------- Page ---------- */
export default async function PackageDetail({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold">Package not found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow">
          <Image src={pkg.image} alt={pkg.title} fill style={{ objectFit: 'cover' }} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">{pkg.title}</h1>
            <p className="text-white/90">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 max-w-[800px]">
          <div className="text-xl font-semibold">
            From {formatPrice(pkg.price, pkg.currency)} <span className="text-sm text-gray-500">/ person</span>
          </div>

          {/* Chips */}
          <ul className="flex mt-3 gap-2 flex-wrap">
            {pkg.highlights.map((h, i) => (
              <li key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {h}
              </li>
            ))}
            <li className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">Flexible dates</li>
          </ul>

          {/* CTA */}
          <div className="flex gap-3 mt-6">
            <Link href={`/book/${pkg.id}`} className="px-5 py-3 rounded-2xl bg-black text-white font-semibold">
              Book this trip
            </Link>
            <Link href="/packages" className="px-5 py-3 rounded-2xl border font-semibold">
              Back to Packages
            </Link>
          </div>

          {/* INCLUDED (not selectable) */}
          {pkg.included?.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">What’s included</h2>
              <ul className="mt-3 grid gap-2">
                {pkg.included.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-gray-800">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* OPTIONAL ADD-ONS (choose later during booking) */}
          {pkg.addons?.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Optional add-ons</h2>
              <p className="text-sm text-gray-600 mt-1">
                Enhance your package with curated experiences. Prices are <em>per person</em>.
              </p>

              <div className="mt-4 grid gap-3">
                {pkg.addons.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                  >
                    <div className="text-sm">{a.name}</div>
                    <div className="text-sm font-semibold">{formatZAR(a.priceZAR)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href={`/book/${pkg.id}#booking`}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold"
                >
                  Personalize & book
                </Link>
              </div>
            </section>
          ) : null}

          {/* Map */}
          {pkg.location && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-2">Destination Map</h2>
              <iframe
                title={`Map of ${pkg.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(pkg.location)}&output=embed`}
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: '1rem' }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
