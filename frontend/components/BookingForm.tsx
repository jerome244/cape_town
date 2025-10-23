// components/BookingForm.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Package = {
  id: number;
  title: string;
  subtitle: string;
  price: number;        // by default treated as price per traveler per night (see NOTE below)
  currency: string;     // use 'ZAR' for Cape Town packages to display Rand
  image: string;
  highlights: string[];
};

type Theme = 'nature' | 'adventure' | 'culture' | null;
type ActivityOption = { name: string; priceZAR: number };

type Props = {
  pkg: Package;
  theme?: Theme;                  // preselect theme (for CT curated packages)
  showOptions?: boolean;          // if false, hide the curated options UI entirely
  priceCatalog?: ActivityOption[];// per-person ZAR activities from client doc
  transportRateZAR?: number;      // optional: show transport toggle priced per night in ZAR
};

/* ---------- Hydration-safe currency helpers ---------- */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function Price({ amount, currency }: { amount: number; currency: string }) {
  const mounted = useMounted();
  const locale = currency === 'ZAR' ? 'en-ZA' : 'en-US';
  const text = mounted
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(amount)
    : `${currency === 'ZAR' ? 'R' : currency} ${amount}`;
  return <span suppressHydrationWarning>{text}</span>;
}

function PriceZAR({ amount }: { amount: number }) {
  const mounted = useMounted();
  const text = mounted
    ? new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
      }).format(amount)
    : `R ${amount}`;
  return <span suppressHydrationWarning>{text}</span>;
}
/* ----------------------------------------------------- */

export default function BookingForm({
  pkg,
  theme = null,
  showOptions = false,
  priceCatalog,
  transportRateZAR,
}: Props) {
  const router = useRouter();

  // --- auth gate (prototype) ---
  const [isAuthed, setIsAuthed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthed(!!localStorage.getItem('pj_user'));
    }
  }, []);

  // --- form state (no name/email/agree) ---
  const [form, setForm] = useState({
    travelers: 2,
    startDate: '',
    endDate: '',
    notes: '',
    theme: (theme ?? 'nature') as Exclude<Theme, null>,
    selectedActivities: [] as string[],
    wantTransport: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  // Reset selected activities when theme changes
  useEffect(() => {
    update('selectedActivities', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.theme]);

  // --- derived data & pricing ---
  const nights = useMemo(() => {
    if (!form.startDate || !form.endDate) return 0;
    const a = new Date(form.startDate);
    const b = new Date(form.endDate);
    const ms = b.getTime() - a.getTime();
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    return Math.max(0, d);
  }, [form.startDate, form.endDate]);

  // NOTE: If your package price is per trip (not per night), change baseTotal to: form.travelers * pkg.price
  const baseTotal = useMemo(() => {
    return Math.max(1, form.travelers) * Math.max(1, nights || 1) * pkg.price;
  }, [form.travelers, nights, pkg.price]);

  // Activities total (ZAR, per person), included only when catalog is provided & options are shown
  const activitiesTotalZAR = useMemo(() => {
    if (!showOptions || !priceCatalog || form.selectedActivities.length === 0) return 0;
    const priceByName = new Map(priceCatalog.map(o => [o.name, o.priceZAR]));
    const perPerson = form.selectedActivities.reduce((sum, name) => sum + (priceByName.get(name) || 0), 0);
    return perPerson * Math.max(1, form.travelers);
  }, [showOptions, priceCatalog, form.selectedActivities, form.travelers]);

  // Transport (ZAR) per night, included only when a rate is passed
  const transportTotalZAR = useMemo(() => {
    if (!transportRateZAR || !form.wantTransport) return 0;
    return Math.max(1, nights || 1) * transportRateZAR;
  }, [transportRateZAR, form.wantTransport, nights]);

  // Subtotal + taxes (8%) + grand total
  // If pkg.currency is ZAR, baseTotal is ZAR. Avoid mixing currencies in production.
  const subTotal = useMemo(
    () => baseTotal + activitiesTotalZAR + transportTotalZAR,
    [baseTotal, activitiesTotalZAR, transportTotalZAR]
  );
  const taxes = useMemo(() => Math.round(subTotal * 0.08), [subTotal]);
  const grandTotal = useMemo(() => subTotal + taxes, [subTotal, taxes]);

  // --- submit flow: ask auth BEFORE validate ---
  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAuthed) {
      setShowAuthModal(true);
      return;
    }

    // minimal validation after auth
    if (!form.startDate || !form.endDate) {
      setError('Please select your travel dates.');
      return;
    }
    if (nights <= 0) {
      setError('End date must be after start date.');
      return;
    }
    if (form.travelers < 1) {
      setError('At least 1 traveler is required.');
      return;
    }

    // Persist (prototype) and go to success
    const payload = {
      id: crypto.randomUUID(),
      pkg: { id: pkg.id, title: pkg.title, price: pkg.price, currency: pkg.currency },
      options: {
        theme: showOptions ? form.theme : null,
        selectedActivities: showOptions ? form.selectedActivities : [],
        wantTransport: Boolean(transportRateZAR && form.wantTransport),
      },
      pricing: {
        nights,
        travelers: form.travelers,
        baseTotal,
        activitiesTotalZAR,
        transportTotalZAR,
        taxes,
        grandTotal,
      },
      form: { startDate: form.startDate, endDate: form.endDate, notes: form.notes },
      createdAt: new Date().toISOString(),
    };

    const key = 'pj_bookings';
    const cur = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : [];
    cur.push(payload);
    localStorage.setItem(key, JSON.stringify(cur));

    setSubmitting(true);
    router.push(`/book/${pkg.id}/success`);
  }

  // If user logs in on another tab, let them retry
  function IAmLoggedInNow() {
    if (typeof window !== 'undefined') {
      const ok = !!localStorage.getItem('pj_user');
      setIsAuthed(ok);
      if (ok) setShowAuthModal(false);
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <div className="px-4 py-3 rounded-2xl" style={{ background:'#FEF2F2', color:'#991B1B' }}>
          {error}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-5">
        {/* Core details */}
        <div className="grid gap-4" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
          <div>
            <label className="text-sm font-semibold">Travelers</label>
            <input
              type="number"
              min={1}
              className="w-full px-3 py-2 rounded-xl border"
              value={form.travelers}
              onChange={(e)=>update('travelers', Math.max(1, Number(e.target.value)))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Start date *</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-xl border"
              value={form.startDate}
              onChange={(e)=>update('startDate', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">End date *</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-xl border"
              value={form.endDate}
              onChange={(e)=>update('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Curated options (only if provided) */}
        {showOptions ? (
          <>
            {/* Experience theme */}
            <div className="rounded-2xl border p-4">
              <label className="block text-sm font-semibold">Experience theme</label>
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={form.theme}
                onChange={(e)=>update('theme', e.target.value as any)}
              >
                <option value="nature">Nature – Outdoor & Scenic</option>
                <option value="adventure">Adventure – Thrill-seekers</option>
                <option value="culture">Culture & Urban Style</option>
              </select>

              {/* Activities list (priced from client document, per person) */}
              {priceCatalog && priceCatalog.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium">Curated activities (per person, ZAR)</div>
                  <div className="mt-2 grid gap-2">
                    {priceCatalog.map((opt) => {
                      const checked = form.selectedActivities.includes(opt.name);
                      return (
                        <label key={opt.name} className="flex items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              update(
                                'selectedActivities',
                                e.target.checked
                                  ? [...form.selectedActivities, opt.name]
                                  : form.selectedActivities.filter(a => a !== opt.name)
                              );
                            }}
                          />
                          <span className="flex-1">{opt.name}</span>
                          <span><PriceZAR amount={opt.priceZAR} /></span>
                        </label>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Activity prices are per person and sourced from the client’s board.
                  </p>
                </div>
              )}
            </div>

            {/* Transport add-on (optional, shows only if a ZAR rate is provided) */}
            {typeof transportRateZAR === 'number' && transportRateZAR > 0 && (
              <div className="rounded-2xl border p-4">
                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Luxury Chauffeured Transport (door-to-door, AC vehicle)</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      <PriceZAR amount={transportRateZAR} /> / night
                    </span>
                    <input
                      type="checkbox"
                      checked={form.wantTransport}
                      onChange={(e)=>update('wantTransport', e.target.checked)}
                    />
                  </div>
                </label>
                <p className="mt-2 text-xs text-gray-600">
                  Professional, multilingual chauffeurs · flexible schedule · door-to-door.
                </p>
              </div>
            )}
          </>
        ) : null}

        {/* Notes */}
        <div>
          <label className="text-sm font-semibold">Notes (optional)</label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 rounded-2xl border"
            value={form.notes}
            onChange={(e)=>update('notes', e.target.value)}
            placeholder="Flight numbers, dietary needs, activity preferences…"
          />
        </div>

        {/* Sticky total & actions */}
        <div className="sticky bottom-0 z-10 rounded-2xl border bg-white/85 backdrop-blur p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              {form.travelers} traveler{form.travelers !== 1 ? 's' : ''} ·{' '}
              {nights || 0} night{(nights || 0) !== 1 ? 's' : ''}{' '}
              {showOptions && theme ? <>· {labelFromTheme(form.theme)}</> : null}
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">
                Base: <Price amount={baseTotal} currency={pkg.currency} />
                {activitiesTotalZAR > 0 ? <> · Activities: <PriceZAR amount={activitiesTotalZAR} /></> : null}
                {transportTotalZAR > 0 ? <> · Transport: <PriceZAR amount={transportTotalZAR} /></> : null}
                 · Taxes: <Price amount={taxes} currency={pkg.currency} />
              </div>
              <div className="text-xl font-semibold">
                Total: <Price amount={grandTotal} currency={pkg.currency} />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={()=>history.back()}
              className="px-4 py-2 rounded-2xl border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-2xl text-white disabled:opacity-60"
              style={{ background:'#111' }}
              title={!isAuthed ? 'Login or register to continue' : 'Submit booking request'}
            >
              {!isAuthed ? (
                'Continue · Login / Register'
              ) : (
                <>
                  Confirm · <Price amount={grandTotal} currency={pkg.currency} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Summary card */}
      <aside className="rounded-2xl border p-4">
        <h3 className="text-lg font-semibold">Summary</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          <li><strong>Package:</strong> {pkg.title}</li>
          {showOptions && theme ? (
            <>
              <li><strong>Theme:</strong> {labelFromTheme(form.theme)}</li>
              <li>
                <strong>Activities:</strong>{' '}
                {form.selectedActivities.length ? form.selectedActivities.join(' • ') : '—'}
              </li>
            </>
          ) : null}
          <li><strong>Travelers:</strong> {form.travelers}</li>
          <li><strong>Dates:</strong> {form.startDate || '—'} → {form.endDate || '—'}</li>
          <li><strong>Nights:</strong> {nights}</li>
          {transportTotalZAR > 0 && <li><strong>Transport:</strong> Yes</li>}
        </ul>
        <hr className="my-3" />
        <div className="text-sm text-gray-700">
          <div className="flex justify-between"><span>Base</span><span><Price amount={baseTotal} currency={pkg.currency} /></span></div>
          {activitiesTotalZAR > 0 && (
            <div className="flex justify-between"><span>Activities</span><span><PriceZAR amount={activitiesTotalZAR} /></span></div>
          )}
          {transportTotalZAR > 0 && (
            <div className="flex justify-between"><span>Transport</span><span><PriceZAR amount={transportTotalZAR} /></span></div>
          )}
          <div className="flex justify-between"><span>Taxes & fees</span><span><Price amount={taxes} currency={pkg.currency} /></span></div>
          <div className="mt-2 flex justify-between text-base font-semibold">
            <span>Total</span><span><Price amount={grandTotal} currency={pkg.currency} /></span>
          </div>
        </div>
      </aside>

      {/* Auth prompt modal */}
      {showAuthModal && (
        <AuthPrompt
          total={<Price amount={grandTotal} currency={pkg.currency} />}
          onClose={() => setShowAuthModal(false)}
          onIAmLoggedIn={IAmLoggedInNow}
        />
      )}
    </div>
  );
}

// Helpers
function labelFromTheme(t: Exclude<Theme, null>) {
  if (t === 'nature') return 'Nature – Outdoor & Scenic';
  if (t === 'adventure') return 'Adventure – Thrill-seekers';
  return 'Culture & Urban Style';
}

function AuthPrompt({
  total,
  onClose,
  onIAmLoggedIn,
}: {
  total: React.ReactNode;
  onClose: () => void;
  onIAmLoggedIn: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">Please log in or register</h3>
        <p className="mt-1 text-sm text-gray-600">
          You’ll need an account to continue your booking.
        </p>

        <div className="mt-4 rounded-lg border bg-gray-50 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Current total</span>
            <strong className="text-base" suppressHydrationWarning>{total}</strong>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/login"
            className="flex-1 rounded-lg bg-black px-4 py-2 text-center text-white hover:opacity-90"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="flex-1 rounded-lg border px-4 py-2 text-center hover:bg-gray-50"
          >
            Register
          </Link>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={onIAmLoggedIn}
            className="text-sm underline"
            title="If you’ve just logged in on another tab"
          >
            I’m logged in now
          </button>
          <button onClick={onClose} className="text-sm text-gray-600 underline">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
