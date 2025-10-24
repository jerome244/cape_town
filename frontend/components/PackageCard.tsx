'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

export type ActivityDetail = { name: string; description?: string };

export type Package = {
  id?: number;
  title?: string;
  subtitle?: string;
  image?: string;
  images?: string[];
  highlights?: string[];
  included?: ActivityDetail[];
};

type Props = {
  pkg?: Package;
  href?: string;
  rating?: number;
  speedSec?: number;
  slideMs?: number;
};

const PLACEHOLDER = '/images/placeholder.jpg';

export default function PackageCard({
  pkg,
  href,
  rating = 5,
  speedSec = 20,
  slideMs = 3500,
}: Props) {
  // Skeleton while loading
  if (!pkg) {
    return (
      <div className="rounded-2xl overflow-hidden border shadow-sm bg-white animate-pulse">
        <div className="h-56 w-full bg-gray-200" />
        <div className="p-4 space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  const safeTitle = pkg.title ?? 'Package';
  const safeSubtitle = pkg.subtitle ?? '';
  const to = href ?? (pkg.id != null ? `/packages/${pkg.id}` : '#');

  // images list (purges empties, guarantees 1+)
  const images = useMemo<string[]>(() => {
    const list = (pkg.images ?? []).filter(Boolean) as string[];
    if (list.length) return list;
    if (pkg.image) return [pkg.image];
    return [PLACEHOLDER];
  }, [pkg.image, pkg.images]);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  // autoplay
  useEffect(() => {
    if (count <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), slideMs);
    return () => clearInterval(t);
  }, [count, paused, slideMs]);

  // swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    const TH = 40;
    if (dx > TH) setIdx((i) => (i - 1 + count) % count);
    else if (dx < -TH) setIdx((i) => (i + 1) % count);
  };

  // badges
  const badges = useMemo(() => {
    if (pkg.highlights?.length) return pkg.highlights;
    if (pkg.included?.length) return pkg.included.map((a) => a.name).slice(0, 8);
    return [];
  }, [pkg]);

  return (
    <Link
      href={to}
      className="group block rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow bg-white"
    >
{/* IMAGE / CAROUSEL */}
<div
  className="relative h-56 w-full select-none"
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
  onFocus={() => setPaused(true)}
  onBlur={() => setPaused(false)}
  onTouchStart={onTouchStart}
  onTouchEnd={onTouchEnd}
>
  {images.map((src, i) => (
    <div
      key={src + i}
      className={`absolute inset-0 transition-opacity duration-700 will-change-[opacity] ${
        i === idx ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={i !== idx}
    >
      <Image
        src={src}
        alt={safeTitle}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 640px"
        priority={i === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
    </div>
  ))}

  {/* Title overlay */}
  <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
    <div>
      <h3 className="text-white text-lg font-semibold drop-shadow">{safeTitle}</h3>
      <p className="text-white/90 text-sm drop-shadow">{safeSubtitle}</p>
    </div>
    <div className="hidden sm:flex items-center gap-1 text-yellow-300 text-sm">
      {renderStars(rating)}
    </div>
  </div>

  {/* Dots only (no arrows) */}
  {count > 1 && (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
      {images.map((_, d) => (
        <button
          key={d}
          aria-label={`Go to image ${d + 1}`}
          onClick={(e) => { e.preventDefault(); setIdx(d); }}
          className={`h-1.5 w-4 rounded-full transition-all ${
            d === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  )}
</div>


      {/* BADGES MARQUEE (purge-safe class) */}
      {!!badges.length && (
        <div className="relative overflow-hidden bg-gray-50 border-t">
          <div
            className="flex gap-2 whitespace-nowrap animate-marquee"
            style={
              {
                // @ts-ignore custom CSS var
                '--marquee-duration': `${speedSec}s`,
              } as React.CSSProperties
            }
          >
            {badges.concat(badges).map((txt, i) => (
              <span
                key={`${txt}-${i}`}
                className="mx-3 my-2 px-2 py-1 rounded-full bg-white border text-xs text-gray-700"
                title={txt}
              >
                {txt}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
<div className="p-4">
  <span className="text-sm text-gray-500">View details</span>
</div>

    </Link>
  );
}

/* helpers */
function renderStars(n: number) {
  const clamped = Math.max(0, Math.min(5, n));
  const filled = '★★★★★'.slice(0, clamped);
  const empty = '☆☆☆☆☆'.slice(0, 5 - clamped);
  return (
    <span aria-label={`${clamped} out of 5 stars`}>
      {filled}
      {empty}
    </span>
  );
}
