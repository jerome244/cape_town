import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturesVitrine from '../components/FeaturesVitrine';
import Steps from '../components/Steps';
import CTABand from '../components/CTABand';
import PackageCard, { Package } from '../components/PackageCard';

// 🔹 Cape Town–themed fallback data
async function getPackages(): Promise<Package[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${base}/api/packages/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Bad status');
    const data = await res.json();
    return data.packages;
  } catch {
    return [
      {
        id: 1,
        title: 'Cape Town Explorer',
        subtitle: '5 nights • city & nature highlights',
        price: 950,
        currency: 'USD',
        cta: 'View',
        image:
          'https://images.unsplash.com/photo-1501601963120-2c39e44d9b49?q=80&w=1600&auto=format&fit=crop',
        galleryImages: [
          'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop', // Table Mountain / Lion's Head
          'https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=1600&auto=format&fit=crop', // V&A Waterfront wheel
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop', // Bo-Kaap houses
        ],
        highlights: ['Table Mountain cableway', 'V&A Waterfront', 'Robben Island tour'],
        location: 'Cape Town, South Africa',
      },
      {
        id: 2,
        title: 'Cape Peninsula Adventure',
        subtitle: '3 nights • coastal escape',
        price: 690,
        currency: 'USD',
        cta: 'View',
        image:
          'https://images.unsplash.com/photo-1595232500888-c596e71d54d6?q=80&w=1600&auto=format&fit=crop',
        galleryImages: [
          'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=1600&auto=format&fit=crop', // Chapman’s Peak drive
          'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1600&auto=format&fit=crop', // Boulders Beach penguins
          'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop', // Cape Point cliffs
        ],
        highlights: [
          'Cape Point & Boulders penguins',
          'Chapman’s Peak drive',
          'Seal Island cruise',
        ],
        location: 'Cape Point, South Africa',
      },
      {
        id: 3,
        title: 'Winelands & Safari Retreat',
        subtitle: '6 nights • Stellenbosch & Big Five reserve',
        price: 1450,
        currency: 'USD',
        cta: 'View',
        image:
          'https://images.unsplash.com/photo-1533616688418-7f55b78a3a59?q=80&w=1600&auto=format&fit=crop',
        galleryImages: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop', // Vineyard cellar/tasting
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop', // Safari savannah
          'https://images.unsplash.com/photo-1578926375605-eaf7559b145c?q=80&w=1600&auto=format&fit=crop', // Lodge sunset
        ],
        highlights: ['Private wine tasting', 'Luxury game lodge', 'Sunset safari drives'],
        location: 'Stellenbosch, South Africa',
      },
    ];
  }
}

export default async function Home() {
  const packages = await getPackages();

  return (
    <main>
      <Header />
      <Hero
        title="Discover Cape Town & Beyond"
        subtitle="Experience the best of South Africa — mountains, oceans, vineyards, and safaris in one unforgettable journey."
        bgImage="https://images.unsplash.com/photo-1501601963120-2c39e44d9b49?q=80&w=2400&auto=format&fit=crop"
      />
      <FeaturesVitrine />
      <Steps />

      {/* Vitrine */}
      <section id="packages" className="bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold">Featured Travel Packages</h2>
            <p className="text-gray-600 mt-2">
              Handpicked journeys to explore the magic of Cape Town and its surroundings.
            </p>
          </div>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {packages.map((p) => (
              <PackageCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
    </main>
  );
}
