// app/page.tsx
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturesVitrine from '../components/FeaturesVitrine';
import Steps from '../components/Steps';
import PackageCard from '../components/PackageCard';
import { getPackages } from '@/lib/packages';
import { Mail, Phone } from 'lucide-react'; // icons for contact info

export default async function Home() {
  const packages = await getPackages();

  return (
    <main>
      {/* HERO */}
      <Hero
        title="Discover Cape Town & Beyond"
        subtitle="Experience the best of South Africa — mountains, oceans, vineyards, and safaris in one unforgettable journey."
        bgImage="https://images.unsplash.com/photo-1501601963120-2c39e44d9b49?q=80&w=2400&auto=format&fit=crop"
      />

      {/* FEATURES target */}
      <section id="features" className="scroll-mt-24">
        <FeaturesVitrine />
      </section>

      <Steps />

      {/* PACKAGES target */}
      <section
        id="packages"
        className="scroll-mt-24 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold">Featured Travel Packages</h2>
            <p className="text-gray-600 mt-2">
              Handpicked journeys to explore the magic of Cape Town and its surroundings.
            </p>
          </div>

          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

{/* CONTACT target */}
<section
  id="contact"
  className="scroll-mt-24 relative py-24"
>
  {/* soft background */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_10%_10%,#ecfdf5_0%,transparent_40%),radial-gradient(60rem_30rem_at_90%_90%,#eef2ff_0%,transparent_40%)]" />

  <div className="max-w-6xl mx-auto px-4">
    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Ready to Plan Your Journey?
      </h2>
      <p className="mt-3 text-gray-600">
        Tell us what you’re dreaming of—adventure, culture, or pure relaxation.
        We’ll craft a personalized itinerary in Cape Town and beyond.
      </p>
    </div>

{/* Cards */}
<div className="mt-10 grid gap-6 sm:grid-cols-2">
  {/* Email card */}
  <a
    href="mailto:david.ndong@icloud.com"
    className="group relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur ring-1 ring-black/5 p-6 flex items-start gap-4 hover:shadow-lg transition"
  >
    <div className="shrink-0 rounded-2xl bg-emerald-100 p-3 ring-1 ring-emerald-200">
      {/* email icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0L12 13.5 2.25 6.75" />
      </svg>
    </div>
    <div>
      <div className="text-sm text-gray-500">Email</div>
      <div className="mt-1 font-medium text-gray-900 break-all">
        david.ndong@icloud.com
      </div>
    </div>
  </a>

  {/* Phone card */}
  <div className="relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur ring-1 ring-black/5 p-6 flex items-start gap-4">
    <div className="shrink-0 rounded-2xl bg-indigo-100 p-3 ring-1 ring-indigo-200">
      {/* phone icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75l3 3m0 0L9 6M5.25 9.75A11.25 11.25 0 0015 19.5l2.25-2.25m0 0l3 3m-3-3L15 12" />
      </svg>
    </div>
    <div>
      <div className="text-sm text-gray-500">Call or WhatsApp</div>
      {/* force newline between numbers */}
      <ul className="mt-1 font-medium text-gray-900 space-y-2">
        <li>
          <a href="tel:+27753530288" className="hover:underline block">
            +27 75 353 0288
          </a>
        </li>
        <li>
          <a href="tel:+27663240237" className="hover:underline block">
            +27 66 324 0237
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>


    {/* Divider */}
    <div className="my-10 flex items-center gap-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <span className="text-xs uppercase tracking-wider text-gray-400">or</span>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>

    {/* CTA */}
    <div className="text-center">
      <h3 className="text-2xl font-semibold">Let’s Make Your Trip Unforgettable 🌍</h3>
      <p className="mt-2 text-gray-600 max-w-xl mx-auto">
        Share your travel goals — we’ll handle the planning, details, and special touches.
      </p>
      <a
        href="mailto:david.ndong@icloud.com?subject=Trip%20Planning%20Request"
        className="mt-6 inline-flex items-center justify-center rounded-2xl px-7 py-3 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow ring-1 ring-emerald-700/10 transition"
      >
        Start Planning
      </a>
    </div>
  </div>

  {/* footer */}
  <div className="mt-20">
    <Footer />
  </div>
</section>

    </main>
  );
}
