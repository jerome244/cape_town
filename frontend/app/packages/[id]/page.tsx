import Footer from '../../../components/Footer';
import Link from 'next/link';
import { getPackages } from '@/lib/packages';
import HeroRotator from '@/components/HeroRotator'; // ⬅️ add this import

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
        </div>
        <Footer />
      </main>
    );
  }

  // Build the hero image list: cover + additional images
  const heroImages = [pkg.image, ...(pkg.images ?? [])].filter(Boolean) as string[];

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Auto-rotating hero */}
        <HeroRotator
          images={heroImages}
          title={pkg.title ?? 'Package'}
          subtitle={pkg.subtitle}
          heightRem={28}   // keep your visual
          slideSec={3.5}   // adjust to taste
        />

        {/* Body */}
        <div className="mt-8 max-w-[800px]">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/book/${pkg.id}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
            >
              Book this trip
            </Link>
          </div>

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

          <section className="mt-10">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Premium Transport (Optional)
              </h2>
              <p className="text-emerald-800 mt-1">
                <span aria-hidden>🚘</span>{' '}
                Travel in comfort with our luxury vehicles and professional chauffeurs.
              </p>
              {/* …rest unchanged … */}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
