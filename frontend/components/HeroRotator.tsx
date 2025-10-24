'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  images?: string[];
  title: string;
  subtitle?: string;
  heightRem?: number;   // default 28
  slideSec?: number;    // default 3.5
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop';

export default function HeroRotator({
  images,
  title,
  subtitle,
  heightRem = 28,
  slideSec = 3.5,
}: Props) {
  // Build a clean list (no empty strings). Keep order as given.
  const list = useMemo(() => {
    const arr = (images ?? []).filter((s): s is string => !!s && s.length > 0);
    return arr.length ? arr : [FALLBACK_IMG];
  }, [images]);

  // Two-layer “double buffer” for smooth crossfades
  const [frontIdx, setFrontIdx] = useState(0);   // which index is currently visible
  const [isAFront, setIsAFront] = useState(true); // which layer is front (A or B)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Precompute the srcs for the two layers
  const srcA = list[frontIdx];
  const srcB = list[(frontIdx + 1) % list.length];

  useEffect(() => {
    if (list.length <= 1) return;
    // rotate every slideSec seconds
    timerRef.current = setInterval(() => {
      setFrontIdx((i) => (i + 1) % list.length);
      setIsAFront((f) => !f); // flip which layer is in front
    }, Math.max(1, slideSec) * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [list.length, slideSec]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow">
      <div className="relative" style={{ height: `${heightRem}rem` }}>
        {/* Layer A */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isAFront ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            key={`A-${srcA}`}        // force reload when src changes
            src={srcA || FALLBACK_IMG}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Layer B */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isAFront ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            key={`B-${srcB}`}        // force reload when src changes
            src={srcB || FALLBACK_IMG}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* gradient + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
          <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
          {!!subtitle && <p className="text-white/90">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
