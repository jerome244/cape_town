export default function Steps() {
  const steps = [
    { n: 1, t: 'Tell us your dates & style' },
    { n: 2, t: 'Receive a transparent quotation' },
    { n: 3, t: 'Approve the service agreement' },
    { n: 4, t: 'Track it all on the Activities Board' },
  ];
  return (
    <section className="bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold">How it works</h3>
        <div className="grid gap-6 mt-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>
          {steps.map(s => (
            <div key={s.n} className="bg-white rounded-2xl p-5 shadow">
              <div className="text-xl font-bold">Step {s.n}</div>
              <div className="mt-2 text-sm text-gray-700">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
