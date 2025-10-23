// app/packages/[id]/page.tsx
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getPackages } from '@/lib/packages';

export default async function PackageDetail({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold">Package not found</h1>
          <div className="mt-4"><Link href="/packages" className="underline text-sm">← Back to Packages</Link></div>
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
          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">{pkg.title}</h1>
            <p className="text-white/90">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 max-w-[800px]">
          {/* Highlights */}
          {pkg.highlights?.length ? (
            <ul className="flex mt-1 gap-2 flex-wrap">
              {pkg.highlights.map((h, i) => (
                <li key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {h}
                </li>
              ))}
              <li className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">Flexible dates</li>
            </ul>
          ) : null}

          {/* CTA */}
          <div className="flex gap-3 mt-6">
            <Link href={`/book/${pkg.id}`} className="px-5 py-3 rounded-2xl bg-black text-white font-semibold">
              Book this trip
            </Link>
            <Link href="/packages" className="px-5 py-3 rounded-2xl border font-semibold">
              Back to Packages
            </Link>
          </div>

          {/* Included (detailed) */}
          {pkg.included?.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">What’s included</h2>
              <ul className="mt-4 space-y-4">
                {pkg.included.map((item) => (
                  <li key={item.name} className="rounded-2xl border bg-white p-4">
                    <div className="font-medium">{item.name}</div>
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
