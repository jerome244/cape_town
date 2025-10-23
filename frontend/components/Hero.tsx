'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '72vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.55))'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h1 className="font-bold" style={{ color:'#fff', lineHeight:1.08, fontSize:'clamp(2rem,5vw,3.5rem)' }}>
          PrimeJourney — tailor-made trips, handled end-to-end
        </h1>
        <p className="mt-3 text-lg" style={{ color:'rgba(255,255,255,.9)', fontSize:'clamp(1rem,2.2vw,1.25rem)' }}>
          From quote to service agreement to activities board — we plan, book, and support your journey 24/7.
        </p>

        <div className="mt-6" style={{ display:'flex', gap:'.75rem', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#packages" className="px-5 py-3 rounded-2xl text-white" style={{ background:'#111', fontWeight:600 }}>
            Explore packages
          </a>
          <a href="#features" className="px-5 py-3 rounded-2xl" style={{ background:'#fff', color:'#111', fontWeight:600 }}>
            How it works
          </a>
        </div>

        <div className="mt-6 text-sm" style={{ color:'rgba(255,255,255,.85)' }}>
          Transparent quotes · Flexible changes · Trusted partners
        </div>
      </div>
    </section>
  );
}
