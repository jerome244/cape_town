// app/packages/[id]/page.tsx
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getPackages } from '@/lib/packages';

export default async function PackageDetail({
  params,
}: {
  params: { id: string };
}) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold">Package not found</h1>
          <div className="mt-4">
            <Link href="/packages" className="underline text-sm">
              ← Back to Packages
            </Link>
          </div>
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
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">{pkg.title}</h1>
            <p className="text-white/90">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 max-w-[800px]">
          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/book/${pkg.id}`}
              className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-black/50"
            >
              Book this trip
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center justify-center px-5 py-3 rounded-2xl border font-semibold hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Back to Packages
            </Link>
          </div>

          {/* Highlights under buttons */}
          {pkg.highlights?.length ? (
            <section className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Highlights</h2>
              <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
                {pkg.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-200"
                    title={h}
                  >
                    {h}
                  </li>
                ))}
                <li className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                  ✨ Flexible dates
                </li>
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
