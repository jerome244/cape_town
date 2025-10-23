'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  cta: string;
  image: string;
  highlights: string[];
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop';

export default function PackageCard({ p }: { p: Package }) {
  const [src, setSrc] = useState(p.image);
  const [rating, setRating] = useState<{ avg: number; count: number }>({ avg: 0, count: 0 });

  // Load rating data from localStorage (pj_reviews_<id>)
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
      <div style={{ position: 'relative', width: '100%', height: '12rem', overflow: 'hidden' }}>
        <Image
          src={src}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          onError={() => setSrc(FALLBACK_IMG)}
          priority={p.id === 2}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="text-sm text-gray-600">{p.subtitle}</p>

        {/* Star rating preview */}
        {rating.count > 0 && (
          <div className="mt-1 text-xs text-gray-700 flex items-center" style={{ gap: '.35rem' }}>
            <span aria-label={`${rating.avg} out of 5 stars`} style={{ letterSpacing: '.05em' }}>
              {renderStars(Math.round(rating.avg))}
            </span>
            <span>
              {rating.avg} ({rating.count})
            </span>
          </div>
        )}

        {/* Highlights */}
        <ul className="flex" style={{ gap: '.5rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
          {p.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
              {h}
            </li>
          ))}
        </ul>

        {/* Price + View button (to details) */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            {p.currency} {p.price}
          </span>

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

/* --- helpers --- */
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
