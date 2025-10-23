// components/BookingForm.tsx
'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Package = {
  id:number;
  title:string;
  subtitle:string;
  // price/currency not used anymore
  image?:string;
  highlights?:string[];
};

export default function BookingForm({ pkg }: { pkg: Package }) {
  const router = useRouter();

  // auth (prototype): rely on localStorage 'pj_user'
  const [isAuthed, setIsAuthed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthed(!!localStorage.getItem('pj_user'));
    }
  }, []);

  const [form, setForm] = useState({
    travelers: 2,
    startDate: '',
    endDate: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAuthed) {
      setShowAuthModal(true);
      return;
    }

    // basic validation
    if (!form.startDate || !form.endDate) {
      setError('Please select your travel dates.');
      return;
    }
    const a = new Date(form.startDate);
    const b = new Date(form.endDate);
    if (isNaN(+a) || isNaN(+b) || b <= a) {
      setError('End date must be after start date.');
      return;
    }
    if (form.travelers < 1) {
      setError('At least 1 traveler is required.');
      return;
    }

    // persist lightweight payload (no money)
    const payload = {
      id: crypto.randomUUID(),
      pkg: { id: pkg.id, title: pkg.title },
      form,
      createdAt: new Date().toISOString(),
    };
    const key = 'pj_bookings';
    const cur = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : [];
    cur.push(payload);
    localStorage.setItem(key, JSON.stringify(cur));

    setSubmitting(true);
    router.push(`/book/${pkg.id}/success`);
  }

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

        {/* Notes */}
        <div>
          <label className="text-sm font-semibold">Notes (optional)</label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 rounded-2xl border"
            value={form.notes}
            onChange={(e)=>update('notes', e.target.value)}
            placeholder="Flight numbers, dietary needs, room preferences…"
          />
        </div>

        {/* Actions */}
        <div className="mt-1 flex flex-wrap justify-end gap-3">
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
            {!isAuthed ? 'Continue · Login / Register' : 'Confirm request'}
          </button>
        </div>
      </form>

      {/* Auth prompt modal */}
      {showAuthModal && (
        <AuthPrompt
          onClose={() => setShowAuthModal(false)}
          onIAmLoggedIn={IAmLoggedInNow}
        />
      )}
    </div>
  );
}

function AuthPrompt({
  onClose,
  onIAmLoggedIn,
}: {
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
