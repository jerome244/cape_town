// app/terms/page.tsx
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions — PrimeJourney',
  description:
    'Read PrimeJourney’s terms and conditions for bookings, cancellations, and site usage.',
};

export default function TermsPage() {
  const sections = [
    {
      id: 'bookings-payments',
      title: '1) Bookings & Payments',
      body:
        'Quotes are subject to availability until confirmed. A deposit may be required to secure services, with the balance due before departure as communicated in your itinerary. Payment details will be provided when you confirm your trip.',
    },
    {
      id: 'cancellations-changes',
      title: '2) Cancellations & Changes',
      body:
        'Cancellations and amendments may incur fees set by local partners (e.g., hotels, activity providers). We’ll always communicate these clearly at the time of booking. Travel insurance is strongly recommended.',
    },
    {
      id: 'responsibilities-liability',
      title: '3) Responsibilities & Liability',
      body:
        'We act as an agent for selected third-party providers. While we take great care to choose reputable partners, their terms apply to services they deliver. PrimeJourney is not liable for events beyond our reasonable control (e.g., weather, strikes, delays).',
    },
    {
      id: 'health-safety',
      title: '4) Health, Safety & Requirements',
      body:
        'Some activities have age, fitness, or safety requirements. Please disclose any medical conditions and review activity guidelines. Follow local regulations and supplier instructions at all times.',
    },
    {
      id: 'privacy',
      title: '5) Privacy',
      body:
        'We collect the information necessary to arrange your trip and communicate with you. We won’t share personal data beyond what’s required to deliver services. If you have privacy questions, contact us any time.',
    },
    {
      id: 'contact',
      title: '6) Contact',
      body:
        'For questions about these terms, email us at david.ndong@icloud.com or call +27 75 353 0288 / +27 66 324 0237.',
    },
  ];

  return (
    <main className="min-h-screen antialiased leading-relaxed relative">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90rem_52rem_at_10%_-10%,#fff4ed_0%,transparent_45%),radial-gradient(90rem_52rem_at_110%_-10%,#ecf2ff_0%,transparent_40%)]" />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-white/75 backdrop-blur shadow-sm">
            <div className="px-10 py-14 sm:px-16 sm:py-16">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-white/90 text-gray-700">
                Policy
              </div>
              <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
                Terms & Conditions
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto space-y-7">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="rounded-3xl border bg-white p-8 ring-1 ring-black/5 shadow-sm hover:shadow-md transition scroll-mt-24"
            >
              <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
              <p className="mt-3 text-gray-700 leading-7">{s.body}</p>
            </section>
          ))}

          {/* gentle note */}
          <section className="rounded-3xl border bg-white/70 backdrop-blur p-6 ring-1 ring-black/5">
            <p className="text-sm text-gray-600">
              These terms are intended as a clear summary. Specific supplier terms may apply to
              individual services and will be shared at the time of booking.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
