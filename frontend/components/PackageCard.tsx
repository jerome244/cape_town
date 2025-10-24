'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

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
  slideSec?: number; // seconds each slide is visible
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop';

export default function PackageCard({
  pkg,
  href,
  slideSec = 3.5,
}: Props) {
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

  // Build image list (at least one)
  const images = useMemo<string[]>(() => {
    const list = (pkg.images ?? []).filter(Boolean);
    if (list.length) return list;
    if (pkg.image) return [pkg.image];
    return [FALLBACK_IMG];
  }, [pkg.image, pkg.images]);

  // Auto-rotate one visible image (no stacking)
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), Math.max(1, slideSec) * 1000);
    return () => clearInterval(t);
  }, [images.length, slideSec]);

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
      {/* NAME FIRST — header ABOVE the image */}
      <div className="px-4 py-3 border-b bg-white">
        <h3 className="text-lg font-semibold text-gray-900">{safeTitle}</h3>
        {!!safeSubtitle && <p className="text-sm text-gray-600">{safeSubtitle}</p>}
      </div>

      {/* UNIFORM CROP: fixed aspect ratio (change to '16 / 9' if you prefer) */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        <img
          key={images[idx]}  /* fade per change */
          src={images[idx] || FALLBACK_IMG}
          alt={safeTitle}
          className="absolute inset-0 h-full w-full object-cover opacity-0 data-[ready=true]:opacity-100 transition-opacity duration-500"
          loading="lazy"
          decoding="async"
          onLoad={(e) => (e.currentTarget.dataset.ready = 'true')}
          style={{ objectPosition: 'center center' }}
        />
      </div>

      {/* BADGES MARQUEE (kept) */}
      {!!badges.length && (
        <div className="relative overflow-hidden bg-gray-50 border-t">
          <div className="flex gap-2 whitespace-nowrap animate-marquee">
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
