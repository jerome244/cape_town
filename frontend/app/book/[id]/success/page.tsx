'use client';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function BookingSuccess({ params }: { params: { id: string } }) {
  const [last, setLast] = useState<any>(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('pj_bookings') || '[]');
    const match = [...list].reverse().find((b:any) => String(b.pkg?.id) === params.id);
    setLast(match || null);
  }, [params.id]);

  const when = useMemo(() => last?.createdAt ? new Date(last.createdAt).toLocaleString() : '', [last]);

  return (
    <main>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold">Request received 🎉</h1>
        {last ? (
          <>
            <p className="text-gray-600 mt-2">We’ve saved your prototype booking request locally.</p>
            <div className="bg-white rounded-2xl shadow mt-6 p-5">
              <div className="font-semibold">Package</div>
              <div className="text-sm mt-1">{last.pkg.title} — {last.pkg.currency} {last.pkg.price}</div>
              <div className="grid gap-4 mt-4" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
                <Info label="Full name" value={last.form.fullName} />
                <Info label="Email" value={last.form.email} />
                <Info label="Travelers" value={String(last.form.travelers)} />
                <Info label="Dates" value={`${last.form.startDate} → ${last.form.endDate}`} />
                <Info label="Submitted" value={when} />
              </div>
              {last.form.notes && <div className="mt-4 text-sm"><strong>Notes:</strong> {last.form.notes}</div>}
            </div>
          </>
        ) : (
          <p className="mt-3">Couldn’t find the booking data. Try submitting the form again.</p>
        )}

        <div className="mt-8" style={{ display:'flex', gap:'.75rem', flexWrap:'wrap' }}>
          <Link href="/" className="px-4 py-2 rounded-2xl border">Back to home</Link>
          <Link href="/bookings" className="px-4 py-2 rounded-2xl text-white" style={{ background:'#111' }}>
            View all bookings
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Info({ label, value }: { label:string; value:string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
