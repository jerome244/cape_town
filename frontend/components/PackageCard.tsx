// components/PackageCard.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type Package = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  highlights: string[]; // activities / chips
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop';

/* --- Manual chips carousel: buttons + touch/trackpad scroll, keyboard friendly --- */
function ChipsCarousel({ items }: { items: string[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateButtons() {
    const el = wrapRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
  }

  useEffect(() => {
    updateButtons();
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => updateButtons();
    window.addEventListener('resize', onResize);

    // Safe feature detect (no optional chaining after `new`)
    let ro: ResizeObserver | null = null;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      ro = new (window as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver(() => {
        updateButtons();
      });
      ro.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollByAmount(dir: 'left' | 'right') {
    const el = wrapRef.current;
    if (!el) return;
    const amount = Math.max(180, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  // keyboard support when the row has focus
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByAmount('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByAmount('right');
    }
  }

  if (!items?.length) return null;

  return (
    <div className="relative mt-2">
      {/* Scrollable chips row */}
      <div
        ref={wrapRef}
        className="flex gap-2 overflow-x-auto rounded-lg bg-gray-50 px-3 py-2 scroll-smooth"
        tabIndex={0}
        role="listbox"
        aria-label="Activities"
        onKeyDown={onKeyDown}
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((h, i) => (
          <span
            key={`${h}-${i}`}
            role="option"
            className="px-2 py-1 rounded-full bg-white border text-xs text-gray-700 whitespace-nowrap select-none"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Prev/Next buttons (show only when needed) */}
      {canLeft && (
        <button
          type="button"
          aria-label="Scroll activities left"
          onClick={() => scrollByAmount('left')}
          className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 px-2 py-1 text-xs shadow hover:bg-white"
        >
          ‹
        </button>
      )}
      {canRight && (
        <button
          type="button"
          aria-label="Scroll activities right"
          onClick={() => scrollByAmount('right')}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 px-2 py-1 text-xs shadow hover:bg-white"
        >
          ›
        </button>
      )}
    </div>
  );
}

export default function PackageCard({ p }: { p: Package }) {
  const [src, setSrc] = useState(p.image);
  const [rating, setRating] = useState<{ avg: number; count: number }>({ avg: 0, count: 0 });

  // Optional: rating preview from localStorage (if you kept reviews)
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

        {/* Manual chips carousel */}
        <ChipsCarousel items={p.highlights} />

        {/* CTA only */}
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
