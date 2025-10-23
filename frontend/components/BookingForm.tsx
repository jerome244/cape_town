'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Package = { id:number; title:string; subtitle:string; price:number; currency:string; image:string; highlights:string[]; };

export default function BookingForm({ pkg }: { pkg: Package }) {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    travelers: 2,
    startDate: '',
    endDate: '',
    notes: '',
    agree: false,
  });
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.startDate || !form.endDate || !form.agree) {
      setError('Please fill required fields and accept terms.');
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      pkg: {
        id: pkg.id, title: pkg.title, price: pkg.price, currency: pkg.currency
      },
      form,
      createdAt: new Date().toISOString()
    };

    // store locally for this prototype
    const key = 'pj_bookings';
    const cur = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : [];
    cur.push(payload);
    localStorage.setItem(key, JSON.stringify(cur));

    router.push(`/book/${pkg.id}/success`);
  }

  return (
    <form onSubmit={submit} className="grid gap-4" style={{ gridTemplateColumns:'repeat(1, minmax(0, 1fr))' }}>
      {error && <div className="px-4 py-3 rounded-2xl" style={{ background:'#FEF2F2', color:'#991B1B' }}>{error}</div>}

      <div className="grid gap-4" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
        <div>
          <label className="text-sm font-semibold">Full name *</label>
          <input className="w-full px-3 py-2 rounded-xl border" value={form.fullName} onChange={e=>update('fullName', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-semibold">Email *</label>
          <input type="email" className="w-full px-3 py-2 rounded-xl border" value={form.email} onChange={e=>update('email', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-semibold">Travelers</label>
          <input type="number" min={1} className="w-full px-3 py-2 rounded-xl border" value={form.travelers} onChange={e=>update('travelers', Number(e.target.value))} />
        </div>
        <div>
          <label className="text-sm font-semibold">Start date *</label>
          <input type="date" className="w-full px-3 py-2 rounded-xl border" value={form.startDate} onChange={e=>update('startDate', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-semibold">End date *</label>
          <input type="date" className="w-full px-3 py-2 rounded-xl border" value={form.endDate} onChange={e=>update('endDate', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold">Notes (optional)</label>
        <textarea rows={4} className="w-full px-3 py-2 rounded-2xl border" value={form.notes} onChange={e=>update('notes', e.target.value)} />
      </div>

      <label className="text-sm" style={{ display:'flex', gap:'.5rem', alignItems:'center' }}>
        <input type="checkbox" checked={form.agree} onChange={e=>update('agree', e.target.checked)} />
        I agree to the prototype terms (no payment collected).
      </label>

      <div style={{ display:'flex', gap:'.75rem', justifyContent:'flex-end', flexWrap:'wrap' }}>
        <button type="button" onClick={()=>history.back()} className="px-4 py-2 rounded-2xl border">Cancel</button>
        <button type="submit" className="px-5 py-2 rounded-2xl text-white" style={{ background:'#111' }}>
          Submit booking request
        </button>
      </div>
    </form>
  );
}
