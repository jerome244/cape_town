// app/about/page.tsx
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About — PrimeJourney',
  description:
    'Learn about PrimeJourney — our mission, story, and how we craft unforgettable trips in and around Cape Town.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen antialiased leading-relaxed relative">
      {/* Soft backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90rem_52rem_at_-10%_-10%,#e8f1ff_0%,transparent_40%),radial-gradient(80rem_48rem_at_110%_-10%,#e9fbee_0%,transparent_35%)]" />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-white/70 backdrop-blur shadow-sm">
            <div className="px-8 py-12 sm:px-14 sm:py-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-white/80 text-gray-700">
                Cape Town & beyond
              </div>
              <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                About PrimeJourney
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
                We design curated, worry-free travel experiences across Cape Town and beyond —
                blending local expertise, human support, and premium partners.
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-2.5 text-white font-medium hover:bg-black transition"
                >
                  ← Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">What makes us different</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '🧭',
                title: 'Local Expertise',
                text:
                  'Hand-picked routes and insider tips from people who live here — from Table Mountain to hidden wineries.',
              },
              {
                icon: '🤝',
                title: 'Human Support',
                text:
                  'Message or call us — real people help before and during your trip. No bots, just friendly pros.',
              },
              {
                icon: '🛡️',
                title: 'Quality & Safety',
                text:
                  'Trusted, vetted partners and clear communication every step of the way.',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border bg-white/80 backdrop-blur p-8 ring-1 ring-black/5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Contact */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-5">
          <article className="md:col-span-3 rounded-3xl border bg-white p-8 ring-1 ring-black/5 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">Our Story</h2>
            <div className="mt-4 space-y-4 text-gray-700 leading-7">
              <p>
                PrimeJourney started with a simple idea: travel should feel effortless and memorable.
                We combine deep local knowledge with thoughtful planning to craft days you’ll talk
                about for years — dramatic coastal drives, penguin beaches, vineyard tastings, and
                skyline sunsets.
              </p>
              <p>
                We’re selective about partners and guides to keep quality high and logistics smooth.
                That way, you can focus on the moments — not the admin.
              </p>
            </div>

            {/* Optional thin divider for rhythm */}
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Simple FAQ (no JS needed) */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">FAQ</h3>
              <div className="mt-3 divide-y divide-gray-100 rounded-2xl border">
                {[
                  {
                    q: 'What areas do you cover?',
                    a: 'Primarily Cape Town, the Winelands, the Cape Peninsula, and seasonal excursions further afield.',
                  },
                  {
                    q: 'Can you tailor trips?',
                    a: 'Absolutely — every itinerary is customizable: pace, budget, interests, and special requests.',
                  },
                  {
                    q: 'How do I book?',
                    a: 'Reach out by email or phone. We confirm availability with partners and share a clear, no-surprises plan.',
                  },
                ].map((item) => (
                  <details key={item.q} className="group p-4">
                    <summary className="cursor-pointer list-none flex items-center justify-between text-gray-900 font-medium">
                      {item.q}
                      <span className="ml-4 h-5 w-5 grid place-items-center rounded-md bg-gray-50 ring-1 ring-gray-200">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-700">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </article>

          <aside className="md:col-span-2 rounded-3xl border bg-white/80 backdrop-blur p-8 ring-1 ring-black/5 shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight text-gray-900">Contact</h3>
            <div className="mt-4 grid gap-4">
              {/* Email */}
              <a
                href="mailto:david.ndong@icloud.com"
                className="group flex items-start gap-3 rounded-2xl border bg-white p-5 hover:shadow-md transition"
              >
                <span className="shrink-0 rounded-xl bg-emerald-100 p-2 ring-1 ring-emerald-200">✉️</span>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="mt-1 font-medium text-gray-900 break-all">
                    david.ndong@icloud.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-3 rounded-2xl border bg-white p-5">
                <span className="shrink-0 rounded-xl bg-indigo-100 p-2 ring-1 ring-indigo-200">📞</span>
                <div>
                  <div className="text-sm text-gray-500">Call or WhatsApp</div>
                  <ul className="mt-1 font-medium text-gray-900 space-y-1">
                    <li>
                      <a className="hover:underline block" href="tel:+27753530288">
                        +27 75 353 0288
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline block" href="tel:+27663240237">
                        +27 66 324 0237
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Prefer email? We usually reply within a business day.
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
