'use client';
import { useEffect, useMemo, useState } from 'react';

type Review = {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
};

function key(pkgId: number) {
  return `pj_reviews_${pkgId}`;
}

export default function Reviews({ pkgId, pkgTitle }: { pkgId: number; pkgTitle: string }) {
  const [list, setList] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key(pkgId)) || '[]');
    setList(data);
  }, [pkgId]);

  function addReview(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating < 1 || rating > 5) {
      setErr('Please provide your name, a comment, and a rating from 1 to 5.');
      return;
    }
    const r: Review = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [...list, r];
    setList(next);
    localStorage.setItem(key(pkgId), JSON.stringify(next));
    setName(''); setRating(5); setComment(''); setErr(null);
  }

  function remove(id: string) {
    const next = list.filter(r => r.id !== id);
    setList(next);
    localStorage.setItem(key(pkgId), JSON.stringify(next));
  }

  const avg = useMemo(() => {
    if (!list.length) return 0;
    return Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10;
  }, [list]);

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex" style={{ justifyContent:'space-between', alignItems:'baseline', gap:'.75rem', flexWrap:'wrap' }}>
        <h2 className="text-2xl font-semibold">Reviews for {pkgTitle}</h2>
        <div className="text-sm text-gray-700">
          {list.length ? <>Average rating: <strong>{avg}</strong> ({list.length})</> : 'No reviews yet'}
        </div>
      </div>

      {/* Add review */}
      <form onSubmit={addReview} className="mt-4 grid gap-4" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
        {err && <div className="px-4 py-3 rounded-2xl" style={{ background:'#FEF2F2', color:'#991B1B' }}>{err}</div>}
        <div>
          <label className="text-sm font-semibold">Your name *</label>
          <input className="w-full px-3 py-2 rounded-xl border" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-semibold">Rating *</label>
          <StarPicker value={rating} onChange={setRating} />
        </div>
        <div style={{ gridColumn:'1 / -1' }}>
          <label className="text-sm font-semibold">Comment *</label>
          <textarea rows={3} className="w-full px-3 py-2 rounded-2xl border" value={comment} onChange={e=>setComment(e.target.value)} />
        </div>
        <div style={{ gridColumn:'1 / -1', display:'flex', justifyContent:'flex-end' }}>
          <button type="submit" className="px-5 py-2 rounded-2xl text-white" style={{ background:'#111' }}>Submit review</button>
        </div>
      </form>

      {/* List */}
      <div className="mt-6 grid gap-4">
        {list.slice().reverse().map(r => (
          <article key={r.id} className="rounded-2xl border p-4">
            <div className="flex" style={{ justifyContent:'space-between', gap:'.75rem', flexWrap:'wrap' }}>
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-gray-600">{new Date(r.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-1">{renderStars(r.rating)}</div>
            <p className="text-sm text-gray-800 mt-2" style={{ whiteSpace:'pre-wrap' }}>{r.comment}</p>
            <div className="mt-3" style={{ display:'flex', justifyContent:'flex-end' }}>
              <button onClick={()=>remove(r.id)} className="px-3 py-2 rounded-xl border text-sm">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n:number)=>void }) {
  return (
    <div className="flex" style={{ gap:'.25rem' }}>
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n>1?'s':''}`}
          onClick={()=>onChange(n)}
          style={{
            background:'transparent', border:'none', cursor:'pointer', fontSize:'1.25rem', lineHeight:1
          }}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
      <span className="text-sm text-gray-700" style={{ marginLeft: '.5rem' }}>{value}/5</span>
    </div>
  );
}

function renderStars(n: number) {
  return <div aria-label={`${n} out of 5 stars`} style={{ letterSpacing:'.05em' }}>
    {'★★★★★'.slice(0, n)}{'☆☆☆☆☆'.slice(0, 5-n)}
  </div>;
}
