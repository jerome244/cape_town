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

          {/* Activities (detailed list, with emojis) */}
          {pkg.included?.length ? (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Activities</h2>
              <p className="text-gray-600 mt-1">
                A curated list of experiences included in this package.
              </p>

              <ol className="mt-5 space-y-4">
                {pkg.included.map((a, i) => (
                  <li
                    key={a.name + i}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200">
                        <span className="text-sm font-semibold">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{a.name}</h3>
                        {a.description ? (
                          <p className="mt-1 text-gray-700">{a.description}</p>
                        ) : null}
                        {(pkg.location || null) && (
                          <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                            {pkg.location ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-0.5">
                                <span aria-hidden>📍</span> {pkg.location}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {/* Transport service callout */}
          <section className="mt-10">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Premium Transport (Optional)
              </h2>
              <p className="text-emerald-800 mt-1">
                Travel in comfort with our luxury vehicles and professional chauffeurs.
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-emerald-900">
                <li className="flex items-start gap-2">
                  <span aria-hidden>🚘</span>
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
