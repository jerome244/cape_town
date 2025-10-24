// app/terms/page.tsx
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions — PrimeJourney',
  description:
    'Read PrimeJourney’s terms and conditions for bookings, cancellations, and site usage.',
};

export default function TermsPage() {
  const updated = new Date().toLocaleDateString();

  return (
    <main className="min-h-screen antialiased leading-relaxed relative">
      {/* soft background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70rem_40rem_at_10%_-10%,#fff4ed_0%,transparent_40%),radial-gradient(70rem_40rem_at_110%_-10%,#ecf2ff_0%,transparent_35%)]" />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-white/70 backdrop-blur shadow-sm">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                Terms & Conditions
              </h1>
              <p className="mt-3 text-gray-600">Last updated: {updated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">
          {[
            {
              title: '1) Bookings & Payments',
              body:
                'Quotes are subject to availability until confirmed. A deposit may be required to secure services, with the balance due before departure as communicated in your itinerary. Payment details will be provided when you confirm your trip.',
            },
            {
              title: '2) Cancellations & Changes',
              body:
                'Cancellations and amendments may incur fees set by local partners (e.g., hotels, activity providers). We’ll always communicate these clearly at the time of booking. Travel insurance is strongly recommended.',
            },
            {
              title: '3) Responsibilities & Liability',
              body:
                'We act as an agent for selected third-party providers. While we take great care to choose reputable partners, their terms apply to services they deliver. PrimeJourney is not liable for events beyond our reasonable control (e.g., weather, strikes, delays).',
            },
            {
              title: '4) Health, Safety & Requirements',
              body:
                'Some activities have age, fitness, or safety requirements. Please disclose any medical conditions and review activity guidelines. Follow local regulations and supplier instructions at all times.',
            },
            {
              title: '5) Privacy',
              body:
                'We collect the information necessary to arrange your trip and communicate with you. We won’t share personal data beyond what’s required to deliver services. If you have privacy questions, contact us any time.',
            },
            {
              title: '6) Contact',
              body:
                'For questions about these terms, email us at david.ndong@icloud.com or call +27 75 353 0288 / +27 66 324 0237.',
            },
          ].map((s) => (
            <section
              key={s.title}
              className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-gray-700">{s.body}</p>
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
