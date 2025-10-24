// components/Hero.tsx
'use client';
import Image from 'next/image';
import * as React from 'react';

type HeroProps = {
  title?: string;
  subtitle?: string;
  /** path under /public, e.g. /images/hero/cape-town-frommers.jpg */
  bgImage?: string;
};

export default function Hero({
  title = 'PrimeJourney — tailor-made trips, handled end-to-end',
  subtitle = 'From quote to service agreement to activities board — we plan, book, and support your journey 24/7.',
  bgImage = '/images/hero/cape-town-frommers.jpg',
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '72vh', display: 'grid', placeItems: 'center' }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={bgImage}                    // <-- uses the prop
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Dark overlay for legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.55))',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="max-w-4xl mx-auto px-4"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
      >
        <h1
          className="font-bold"
          style={{
            color: '#fff',
            lineHeight: 1.08,
            fontSize: 'clamp(2rem,5vw,3.5rem)',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-3 text-lg"
            style={{
              color: 'rgba(255,255,255,.9)',
              fontSize: 'clamp(1rem,2.2vw,1.25rem)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
