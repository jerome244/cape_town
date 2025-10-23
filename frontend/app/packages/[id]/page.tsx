import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  cta: string;
  image: string;
  highlights: string[];
  location?: string;
};

async function getPackages(): Promise<Package[]> {
  return [
    {
      id: 1,
      title: 'Paris Getaway',
      subtitle: '3 nights • 4-star hotel',
      price: 499,
      currency: 'EUR',
      cta: 'Book now',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Breakfast included', 'Louvre tickets', 'Seine cruise'],
      location: 'Paris, France',
    },
    {
      id: 2,
      title: 'Greek Islands Escape',
      subtitle: '7 nights • island hopping',
      price: 1199,
      currency: 'EUR',
      cta: 'Explore',
      image:
        'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Ferry passes', 'Santorini sunset', 'Mykonos tour'],
      location: 'Santorini, Greece',
    },
    {
      id: 3,
      title: 'Alpine Adventure',
      subtitle: '5 nights • chalet stay',
      price: 899,
      currency: 'EUR',
      cta: 'Discover',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Ski pass', 'Spa access', 'Guided hike'],
      location: 'Zermatt, Switzerland',
    },
  ];
}

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
        <div style={{ position: 'relative', width: '100%', height: '20rem', overflow: 'hidden', borderRadius: '1rem' }}>
          <Image src={pkg.image} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="mt-8" style={{ maxWidth: '800px' }}>
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600 mt-1">{pkg.subtitle}</p>
          <div className="mt-3 text-xl font-semibold">
            {pkg.currency} {pkg.price}
          </div>

          <ul className="flex mt-3" style={{ gap: '.5rem', flexWrap: 'wrap' }}>
            {pkg.highlights.map((h, i) => (
              <li key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {h}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mt-6">
            <Link
              href={`/book/${pkg.id}`}
              className="px-5 py-3 rounded-2xl bg-black text-white font-semibold"
            >
              Book this trip
            </Link>
            <Link href="/" className="px-5 py-3 rounded-2xl border font-semibold">
              Back to Home
            </Link>
          </div>

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
