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
          {/* REMOVED: Back to Packages
          <div className="mt-4">
            <Link href="/packages" className="underline text-sm">
              ← Back to Packages
            </Link>
          </div>
          */}
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero (taller, no aspect lock to avoid the “squished” look) */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow">
          {/* Use a fixed, generous height so the photo has room; object-cover prevents distortion */}
          <div className="relative" style={{ height: '28rem' }}>
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
              <h1 className="text-2xl md:text-3xl font-semibold">{pkg.title}</h1>
              <p className="text-white/90">{pkg.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 max-w-[800px]">
          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/book/${pkg.id}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
            >
              Book this trip
            </Link>

            {/* REMOVED: Back to Packages button
            <Link
              href="/packages"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border font-semibold hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              ← Back to Packages
            </Link>
            */}
          </div>

          {/* Activities (no numbers) */}
          {pkg.included?.length ? (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Activities</h2>
              <p className="text-gray-600 mt-1">
                A curated list of experiences included in this package.
              </p>

              <div className="mt-5 space-y-4">
                {pkg.included.map((a, i) => (
                  <div
                    key={a.name + i}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 hover:shadow-md transition"
                  >
                    <h3 className="text-base font-semibold">{a.name}</h3>
                    {a.description && (
                      <p className="mt-1 text-gray-700">{a.description}</p>
                    )}
                    {pkg.location && (
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-0.5">
                          <span aria-hidden>📍</span> {pkg.location}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Transport service callout */}
          <section className="mt-10">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Premium Transport (Optional)
              </h2>
              <p className="text-emerald-800 mt-1">
                <span aria-hidden>🚘</span>{' '}
                Travel in comfort with our luxury vehicles and professional chauffeurs.
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-emerald-900">
                <li className="flex items-start gap-2">
                  <span aria-hidden>💺</span>
                  Luxury, air-conditioned fleet
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden>👔</span>
                  Professional, multilingual chauffeurs
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden>🕒</span>
                  Flexible schedules tailored to you
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden>🛎️</span>
                  Door-to-door convenience
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden>🌍</span>
                  Exclusive city tours & insider tips
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
