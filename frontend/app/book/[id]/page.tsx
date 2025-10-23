import Footer from '../../../components/Footer';
import BookingForm from '../../../components/BookingForm';
import Reviews from '../../../components/Reviews';

type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  cta: string;
  image: string;
  highlights: string[];
};

// 👇 Re-add this function (was missing)
async function getPackages(): Promise<Package[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${base}/api/packages/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Bad status');
    const data = await res.json();
    return data.packages;
  } catch {
    // fallback demo data
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
      },
    ];
  }
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold">Package not found</h1>
        <p className="mt-2">Go back and choose another package.</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold">Book: {pkg.title}</h1>
      <p className="text-gray-600 mt-1">{pkg.subtitle}</p>

      <div className="bg-white rounded-2xl shadow mt-6 p-5">
        <div className="text-sm text-gray-700">
          <strong>From:</strong> {pkg.currency} {pkg.price} ·{' '}
          <strong>Highlights:</strong> {pkg.highlights.join(' • ')}
        </div>

        <div className="mt-6">
          <BookingForm pkg={pkg} />
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-12">
        <Reviews pkgId={pkg.id} pkgTitle={pkg.title} />
      </section>

      <Footer />
    </main>
  );
}
