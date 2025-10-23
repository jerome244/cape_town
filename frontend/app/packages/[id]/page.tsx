import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getPackages } from '@/lib/packages';
import { formatPrice } from '@/lib/money';

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
        <div className="relative w-full h-80 overflow-hidden rounded-2xl">
          <Image src={pkg.image} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="mt-8 max-w-[800px]">
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600 mt-1">{pkg.subtitle}</p>

          <div className="mt-3 text-xl font-semibold">
            From {formatPrice(pkg.price, pkg.currency)} <span className="text-sm text-gray-500">/ person</span>
          </div>

          <ul className="flex mt-3 gap-2 flex-wrap">
            {pkg.highlights.map((h, i) => (
              <li key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {h}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mt-6">
            <Link href={`/book/${pkg.id}`} className="px-5 py-3 rounded-2xl bg-black text-white font-semibold">
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
                className="rounded-2xl"
                style={{ border: 0 }}
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
