// app/page.tsx
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturesVitrine from '../components/FeaturesVitrine';
import Steps from '../components/Steps';
import CTABand from '../components/CTABand';
import PackageCard from '../components/PackageCard';

// ⬇️ use the shared source of truth
import { getPackages } from '@/lib/packages';

export default async function Home() {
  const packages = await getPackages();

  return (
    <main>
      <Hero
        title="Discover Cape Town & Beyond"
        subtitle="Experience the best of South Africa — mountains, oceans, vineyards, and safaris in one unforgettable journey."
        bgImage="https://images.unsplash.com/photo-1501601963120-2c39e44d9b49?q=80&w=2400&auto=format&fit=crop"
      />
      <FeaturesVitrine />
      <Steps />

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
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
    </main>
  );
}
