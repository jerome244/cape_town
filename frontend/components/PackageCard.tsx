'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type ActivityDetail = { name: string; description?: string };

export type Package = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  highlights?: string[];           // now optional
  included?: ActivityDetail[];     // new optional (for fallback)
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop';

/**
 * Marquee-style activities row (auto-scrolls).
 */
function ActivitiesMarquee({
  items,
  speedSec = 22,
  forceMotion = true,
}: { items: string[]; speedSec?: number; forceMotion?: boolean }) {
  if (!items?.length) return null;
  const loop = items.concat(items);

  return (
    <div className="relative mt-2">
      <div className="overflow-hidden rounded-lg bg-gray-50 px-0 py-2">
        <div className="relative">
          <div
            className={`flex gap-2 whitespace-nowrap will-change-transform ${
              forceMotion ? 'animate-marquee' : 'motion-safe:animate-marquee'
            }`}
            style={{ ['--marquee-duration' as any]: `${speedSec}s` }}
          >
            {loop.map((h, i) => (
              <span
                key={`${h}-${i}`}
                className="mx-3 px-2 py-1 rounded-full bg-white border text-xs text-gray-700 select-none"
                title={h}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee { animation: marquee var(--marquee-duration, 22s) linear infinite; }
        .animate-marquee:focus, .animate-marquee:hover { animation-play-state: paused; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function PackageCard({ p }: { p: Package }) {
  const [src, setSrc] = useState(p.image);
  const [rating, setRating] = useState<{ avg: number; count: number }>({ avg: 0, count: 0 });

  // derive marquee items: highlights -> included names -> []
  const marqueeItems =
    (p.highlights && p.highlights.length > 0
      ? p.highlights
      : (p.included?.map((a) => a.name) ?? [])
    );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`pj_reviews_${p.id}`);
      const list: Array<{ rating: number }> = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list) && list.length) {
        const sum = list.reduce((s, r) => s + (Number(r.rating) || 0), 0);
        const avg = Math.round((sum / list.length) * 10) / 10;
        setRating({ avg, count: list.length });
      } else {
        setRating({ avg: 0, count: 0 });
      }
    } catch {
      setRating({ avg: 0, count: 0 });
    }
  }, [p.id]);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition card">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden">
        <Image
          src={src}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          onError={() => setSrc(FALLBACK_IMG)}
          priority={p.id === 2}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="text-sm text-gray-600">{p.subtitle}</p>

        {/* Star rating preview (optional) */}
        {rating.count > 0 && (
          <div className="mt-1 text-xs text-gray-700 flex items-center gap-1">
            <span aria-label={`${rating.avg} out of 5 stars`} style={{ letterSpacing: '.05em' }}>
              {renderStars(Math.round(rating.avg))}
            </span>
            <span>
              {rating.avg} ({rating.count})
            </span>
          </div>
        )}

        {/* Activities at bottom — auto scrolling */}
        <ActivitiesMarquee items={marqueeItems} speedSec={22} />

        {/* CTA */}
        <div className="mt-4 flex items-center justify-end">
          <Link
            href={`/packages/${p.id}`}
            className="px-3 py-2 rounded-2xl border text-sm hover:bg-gray-100"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

/* helpers */
function renderStars(n: number) {
  const clamped = Math.max(0, Math.min(5, n));
  const filled = '★★★★★'.slice(0, clamped);
  const empty = '☆☆☆☆☆'.slice(0, 5 - clamped);
  return (
    <span>
      {filled}
      {empty}
    </span>
  );
}
