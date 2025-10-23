'use client';
import { useEffect, useMemo, useState } from 'react';

type Booking = {
  id: string;
  pkg: { id: number; title: string; price: number; currency: string };
  form: { fullName: string; email: string; travelers: number; startDate: string; endDate: string; notes?: string };
  createdAt: string;
};

const KEY = 'pj_bookings';

export default function BookingsList() {
  const [items, setItems] = useState<Booking[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    setItems(data);
  }, []);

  function remove(id: string) {
    const next = items.filter(b => b.id !== id);
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function clearAll() {
    setItems([]);
    localStorage.setItem(KEY, '[]');
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'primejourney-bookings.json'; a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items.slice().reverse();
    return items
      .filter(b =>
        b.form.fullName.toLowerCase().includes(s) ||
        b.form.email.toLowerCase().includes(s) ||
        b.pkg.title.toLowerCase().includes(s)
      )
      .reverse();
  }, [items, q]);

  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold">No bookings yet</div>
        <p className="text-sm text-gray-700 mt-2">Submit a booking from a package card to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex" style={{ gap: '.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <input
          placeholder="Search by name, email, or package…"
          className="px-3 py-2 rounded-xl border"
          style={{ flex: '1 1 260px' }}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <button onClick={exportJSON} className="px-3 py-2 rounded-xl border">Export JSON</button>
          <button onClick={clearAll} className="px-3 py-2 rounded-xl border" title="Remove all bookings">Clear all</button>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        {filtered.map(b => (
          <article key={b.id} className="rounded-2xl border p-4">
            <div className="flex" style={{ justifyContent:'space-between', gap:'.75rem', flexWrap:'wrap' }}>
              <div>
                <div className="font-semibold">{b.pkg.title}</div>
                <div className="text-sm text-gray-700">
                  {b.pkg.currency} {b.pkg.price} · {b.form.travelers} traveler{b.form.travelers>1?'s':''}
                </div>
              </div>
              <div className="text-sm text-gray-600">{new Date(b.createdAt).toLocaleString()}</div>
            </div>

            <div className="grid gap-3 mt-3" style={{ gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <Info label="Full name" value={b.form.fullName} />
              <Info label="Email" value={b.form.email} />
              <Info label="Dates" value={`${b.form.startDate} → ${b.form.endDate}`} />
              <Info label="Travelers" value={String(b.form.travelers)} />
            </div>

            {b.form.notes && <div className="mt-3 text-sm"><strong>Notes:</strong> {b.form.notes}</div>}

            <div className="mt-4" style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', justifyContent:'flex-end' }}>
              <a href={`/book/${b.pkg.id}/success`} className="px-3 py-2 rounded-xl bg-black text-white text-sm">View</a>
              <button onClick={() => remove(b.id)} className="px-3 py-2 rounded-xl border text-sm">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm font-semibold">{value || '—'}</div>
    </div>
  );
}
