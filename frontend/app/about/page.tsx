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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80rem_40rem_at_-10%_-10%,#e8f1ff_0%,transparent_40%),radial-gradient(70rem_40rem_at_110%_-10%,#e9fbee_0%,transparent_35%)]" />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-white/70 backdrop-blur shadow-sm">
            <div className="px-6 py-10 sm:px-10 sm:py-14 text-center">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                About PrimeJourney
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                We design curated, worry-free travel experiences across Cape Town and beyond —
                blending local expertise, human support, and premium partners.
              </p>
              <div className="mt-6">
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
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
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
              className="rounded-2xl border bg-white/80 backdrop-blur p-6 ring-1 ring-black/5 shadow-sm"
            >
              <div className="text-2xl">{c.icon}</div>
              <h3 className="mt-2 font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story + Contact */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-5">
          <article className="md:col-span-3 rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight">Our Story</h2>
            <div className="mt-3 space-y-4 text-gray-700">
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
          </article>

          <aside className="md:col-span-2 rounded-3xl border bg-white/80 backdrop-blur p-6 ring-1 ring-black/5 shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight">Contact</h3>
            <div className="mt-4 grid gap-4">
              {/* Email */}
              <a
                href="mailto:david.ndong@icloud.com"
                className="group flex items-start gap-3 rounded-2xl border bg-white p-4 hover:shadow-md transition"
              >
                <span className="shrink-0 rounded-xl bg-emerald-100 p-2 ring-1 ring-emerald-200">
                  ✉️
                </span>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="mt-1 font-medium text-gray-900 break-all">
                    david.ndong@icloud.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-3 rounded-2xl border bg-white p-4">
                <span className="shrink-0 rounded-xl bg-indigo-100 p-2 ring-1 ring-indigo-200">
                  📞
                </span>
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
