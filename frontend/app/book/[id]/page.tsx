// app/book/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import BookingForm from '../../../components/BookingForm';

type Package = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  highlights: string[];
};

async function getPackages(): Promise<Package[]> {
  // Replace with your API if needed
  return [
    {
      id: 1,
      title: 'Nature Package',
      subtitle: 'Outdoor & Scenic Explorers',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Table Mountain', 'Kirstenbosch', 'Cape Point'],
    },
    {
      id: 2,
      title: 'Adventure Package',
      subtitle: 'Thrill-seekers itinerary',
      image:
        'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Paragliding', 'Sandboarding', 'Kayaking'],
    },
    {
      id: 3,
      title: 'Culture & Urban Style',
      subtitle: 'City lovers & culture enthusiasts',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Bo-Kaap', 'Zeitz MOCAA', 'V&A Waterfront'],
    },
  ];
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold">Package not found</h1>
        <p className="mt-2 text-gray-600">Go back and choose another package.</p>
        <div className="mt-6">
          <Link href="/" className="text-sm underline">← Back to Home</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pb-24">
      {/* breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:underline">Home</Link> /{' '}
          <Link href="/packages" className="hover:underline">Packages</Link> /{' '}
          <span className="text-gray-700">{pkg.title}</span>
        </nav>
      </div>

      {/* hero */}
      <div className="max-w-5xl mx-auto px-4 mt-4">
        <div className="relative overflow-hidden rounded-2xl h-64 md:h-80 shadow">
          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">{pkg.title}</h1>
            <p className="text-sm md:text-base text-white/90">{pkg.subtitle}</p>
          </div>
        </div>
      </div>

      {/* layout */}
      <div className="max-w-5xl mx-auto px-4 mt-8 grid gap-8 md:grid-cols-[1.15fr,0.85fr]">
        {/* left: info */}
        <section aria-label="Package details">
          {pkg.highlights?.length ? (
            <div>
              <h2 className="text-lg font-semibold">Package highlights</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {pkg.highlights.map((h, i) => (
                  <li key={i} className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 space-y-3 text-gray-700 leading-relaxed">
            <p>
              This is a curated package — activities are predefined and handled by your planner.
              On this page you’ll just choose dates and travelers.
            </p>
            <p className="text-sm text-gray-500">
              You can discuss small adjustments with your planner after submitting your request.
            </p>
          </div>
        </section>

        {/* right: sticky booking panel (money-free form) */}
        <aside id="booking" className="md:sticky md:top-6 bg-white rounded-2xl shadow p-5 h-max border">
          <BookingForm pkg={pkg} />
          <div className="mt-4 grid grid-cols-3 text-center text-xs text-gray-600">
            <div>Secure</div><div>Flexible</div><div>Human support</div>
          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
