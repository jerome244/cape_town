'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
  heightRem?: number;   // default 28
};

export default function BannerGallery({ images, title, subtitle, heightRem = 28 }: Props) {
  const [i, setI] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);

  const go = (n: number) => setI((prev) => (prev + n + images.length) % images.length);
  const goTo = (idx: number) => setI(idx);

  // Keyboard nav when the region is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  // Basic swipe (pointer events)
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) go(1); else go(-1);
    }
    startX.current = null;
  };

  // Guard
  const imgs = images?.length ? images : [];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-2xl shadow"
      role="region"
      aria-label="Image gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ height: `${heightRem}rem` }}
    >
      {/* Slides */}
      {imgs.map((src, idx) => (
        <div
          key={src + idx}
          aria-hidden={i !== idx}
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${(idx - i) * 100}%)`,
            transition: 'transform .35s ease',
          }}
        >
          <Image
            src={src}
            alt={title || `Slide ${idx + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Gradient for legible text */}
      <div
        className="absolute"
        style={{
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.25) 40%, rgba(0,0,0,0))',
        }}
      />

      {/* Text overlay */}
      {(title || subtitle) && (
        <div className="absolute" style={{ left: '1rem', right: '1rem', bottom: '1rem', color: '#fff' }}>
          <div
            className="rounded-2xl"
            style={{
              background: 'rgba(0,0,0,.32)',
              padding: '1rem 1.25rem',
              lineHeight: 1.6,
            }}
          >
            {title && <h1 className="text-2xl text-white" style={{ lineHeight: 1.25 }}>{title}</h1>}
            {subtitle && <p className="text-white" style={{ opacity: .95, marginTop: '.25rem' }}>{subtitle}</p>}
          </div>
        </div>
      )}




      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div
          className="absolute"
          style={{
            left: '1rem',
            right: '1rem',
            bottom: '0.5rem',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            padding: '0.25rem 0',
          }}
          aria-label="Choose image"
        >
          {imgs.map((src, idx) => (
            <button
              key={'thumb-' + idx}
              onClick={() => goTo(idx)}
              aria-label={`Show image ${idx + 1}`}
              style={{
                position: 'relative',
                height: '3.5rem',
                width: '5.5rem',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                outline: i === idx ? '2px solid #111827' : '1px solid rgba(0,0,0,.12)',
                boxShadow: i === idx ? '0 1px 6px rgba(0,0,0,.2)' : 'none',
                flex: '0 0 auto',
                background: '#fff',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function btnStyle(side: 'left' | 'right'): React.CSSProperties {
  const pos = side === 'left' ? { left: '0.5rem' } : { right: '0.5rem' };
  return {
    ...pos,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2.5rem',
    width: '2.5rem',
    borderRadius: '9999px',
    background: 'rgba(255,255,255,.9)',
    color: '#111827',
    border: '1px solid rgba(0,0,0,.08)',
    boxShadow: '0 2px 8px rgba(0,0,0,.15)',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.5rem',
    lineHeight: 1,
  };
}
