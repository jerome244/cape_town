// app/book/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import BookingForm from '../../../components/BookingForm';
import { getPackages } from '../../../lib/packages';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop';

export default async function BookPage({ params }: { params: { id: string } }) {
  const list = await getPackages();
  const pkg = list.find((p) => String(p.id) === params.id);

  if (!pkg) {
    return (
      <main className="min-h-screen antialiased leading-relaxed bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="rounded-3xl border bg-white/70 backdrop-blur p-10 shadow-sm text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Package not found</h1>
            <p className="mt-2 text-gray-600">Go back and choose another package.</p>
            <div className="mt-6">
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 transition">
                <span aria-hidden>←</span> Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pb-24 antialiased leading-relaxed bg-[radial-gradient(80rem_40rem_at_10%_-20%,#e8f1ff_0%,transparent_40%),radial-gradient(70rem_40rem_at_110%_-10%,#ffe9e3_0%,transparent_35%)]">


      {/* HERO (spacious & highly legible) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="relative overflow-hidden rounded-3xl h-[22rem] md:h-[28rem] shadow ring-1 ring-black/5 group">
          <Image
            src={pkg.image || FALLBACK_IMG}
            alt={pkg.title}
            fill
            priority
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />

          {/* stronger overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* text block with ample padding & relaxed line-height */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="max-w-3xl rounded-2xl bg-black/35 backdrop-blur-sm ring-1 ring-white/15 px-5 md:px-6 py-4 md:py-5 space-y-2.5">
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">{pkg.title}</h1>
              {pkg.subtitle && (
                <p className="text-base md:text-lg leading-relaxed text-white/95">{pkg.subtitle}</p>
              )}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-sm md:text-base text-white/95">
                {(pkg as any).location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/25">
                    <span aria-hidden>📍</span> {(pkg as any).location}
                  </span>
                )}
                {(pkg as any).duration && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/25">
                    <span aria-hidden>🗓️</span> {(pkg as any).duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid gap-8 md:grid-cols-[1.15fr,0.85fr]">
        {/* Left: info */}
        <section aria-label="Package details" className="space-y-6">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight">What to know</h2>
            <div className="mt-2 space-y-4 text-gray-700">
              <p>
                This is a curated package — activities are predefined and handled by your planner.
                On this page you’ll just choose dates and travelers.
              </p>
              <p className="text-sm text-gray-500">
                You can discuss small adjustments with your planner after submitting your request.
              </p>
            </div>
            {(pkg as any).highlights?.length ? (
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {(pkg as any).highlights.map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 rounded-2xl border p-3 text-sm">
                    <span aria-hidden>✨</span>
                    <span className="text-gray-800">{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Trust strip */}
          <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span>🔒</span> Secure checkout</li>
              <li className="flex items-center gap-2"><span>📅</span> Flexible dates</li>
              <li className="flex items-center gap-2"><span>👨‍💼</span> Dedicated planner</li>
              <li className="flex items-center gap-2"><span>✅</span> No hidden fees</li>
            </ul>
          </div>

          {/* FAQ (optional) */}
          {(pkg as any).faqs?.length ? (
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight">FAQs</h3>
              <div className="mt-3 divide-y">
                {(pkg as any).faqs.map((f: any, i: number) => (
                  <details key={i} className="group py-3">
                    <summary className="flex cursor-pointer items-center justify-between text-left font-medium marker:hidden">
                      <span>{f.q}</span>
                      <span aria-hidden className="ml-4 transition group-open:rotate-45">＋</span>
                    </summary>
                    <p className="mt-2 text-gray-700 text-sm">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Right: sticky booking panel */}
        <aside id="booking" className="md:sticky md:top-6 h-max">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            {/* Price header (if available) */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="text-2xl font-semibold">
                  {typeof (pkg as any).price !== 'undefined'
                    ? Intl.NumberFormat(undefined, { style: 'currency', currency: ((pkg as any).currency as string) || 'EUR' }).format(Number((pkg as any).price))
                    : '—'}
                </p>
              </div>
              <Link href="#details" className="text-sm underline text-gray-600 hover:text-gray-900">What’s included?</Link>
            </div>

            <div className="mt-5">
              <BookingForm pkg={pkg as any} />
            </div>

            {/* Guarantees */}
            <div className="mt-4 grid grid-cols-3 text-center text-xs text-gray-600">
              <div className="flex flex-col items-center gap-1"><span>🛡️</span> Secure</div>
              <div className="flex flex-col items-center gap-1"><span>↩️</span> Flexible</div>
              <div className="flex flex-col items-center gap-1"><span>🤝</span> Human support</div>
            </div>

            {/* Callout */}
            <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-gray-200">
              Have special requests? <Link href="/contact" className="underline">Contact us</Link> and we’ll tailor the details.
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
