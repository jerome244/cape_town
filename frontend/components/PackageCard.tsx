'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

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
  speedSec?: number;   // marquee speed
  slideSec?: number;   // seconds each slide is fully visible
};

const PLACEHOLDER = '/images/placeholder.jpg';

export default function PackageCard({
  pkg,
  href,
  rating = 5,
  speedSec = 20,
  slideSec = 3.5,
}: Props) {
  if (!pkg) {
    // minimal skeleton during data fetch
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

  // Build images list (always at least one)
  const images = useMemo<string[]>(() => {
    const list = (pkg.images ?? []).filter(Boolean);
    if (list.length) return list;
    if (pkg.image) return [pkg.image];
    return [PLACEHOLDER];
  }, [pkg.image, pkg.images]);

  const badges = useMemo(() => {
    if (pkg.highlights?.length) return pkg.highlights;
    if (pkg.included?.length) return pkg.included.map((a) => a.name).slice(0, 8);
    return [];
  }, [pkg]);

  const N = images.length;
  const cycle = `${Math.max(1, N) * slideSec}s`;

  return (
    <Link
      href={to}
      className="group block rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow bg-white"
    >
      {/* IMAGE / CSS-ONLY CAROUSEL */}
      <div
        className="relative h-56 w-full select-none"
        style={
          {
            // total cycle duration shared by all slides
            // @ts-expect-error css var
            '--cycle': cycle,
          } as React.CSSProperties
        }
      >
{images.map((src, i) => (
  <div
    key={src + i}
    className={N > 1 ? 'slide absolute inset-0' : 'absolute inset-0'}
    style={N > 1 ? ({ animationDelay: `${i * slideSec}s` } as React.CSSProperties) : undefined}
  >
    <div className="img-wrap">
      <Image
        src={src}
        alt={safeTitle}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 640px"
        priority={i === 0}
      />
    </div>
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

        {/* Component-scoped CSS for the crossfade */}
        <style jsx>{`
          .slide {
            opacity: 0;
            animation: xfade var(--cycle) linear infinite;
          }
          @keyframes xfade {
            /* Each slide timeline (with per-slide delay):
               0%–15%: fully visible
               20%: faded out
               100%: stay hidden until the cycle loops
            */
            0% { opacity: 1; }
            15% { opacity: 1; }
            20% { opacity: 0; }
            100% { opacity: 0; }
          }

          /* Respect users who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .slide { animation: none !important; opacity: 1 !important; }
          }
        `}</style>
      </div>

      {/* BADGES MARQUEE (uses global .animate-marquee) */}
      {!!badges.length && (
        <div className="relative overflow-hidden bg-gray-50 border-t">
          <div
            className="flex gap-2 whitespace-nowrap animate-marquee"
            style={
              {
                // @ts-expect-error css var
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

      {/* FOOTER (arrow removed) */}
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
