export default function FeaturesVitrine() {
  const features = [
    {
      title: 'Tailor-made itineraries',
      desc: 'We design trips around you: pace, budget, and interests — no templates.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    },
    {
      title: 'Transparent quotation',
      desc: 'Up-front pricing with inclusions/exclusions clearly listed, so there are no surprises.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    },
    {
      title: 'Service agreement clarity',
      desc: 'Clean terms, timelines, and responsibilities before any booking is confirmed.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M6 3h12v18H6z" stroke="currentColor" strokeWidth="2"/></svg>
      )
    },
    {
      title: 'Activities Board',
      desc: 'Live itinerary board with daily plans, tickets, and contacts — shareable with your group.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="9" cy="17" r="2" stroke="currentColor" strokeWidth="2"/><path d="M8.5 8.5l6 3m-4 4l4-2" stroke="currentColor" strokeWidth="2"/></svg>
      )
    },
    {
      title: 'Concierge & support',
      desc: '24/7 assistance for changes, emergencies, and on-trip questions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a8 8 0 10-6.2 6.2l2.7-5.4H21z" stroke="currentColor" strokeWidth="2"/></svg>
      )
    },
    {
      title: 'Groups & corporate',
      desc: 'Seamless travel for teams, incentives, and events — with simple approval flows.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12a3 3 0 100-6 3 3 0 000 6zM4 20a6 6 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    }
  ];

  return (
    <section id="features" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10" style={{ textAlign:'center' }}>
          <h2 className="text-3xl font-semibold">Everything you need, in one place</h2>
          <p className="text-gray-600 mt-2">From first quote to final boarding pass.</p>
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {features.map((f, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5">
              <div className="rounded-full" style={{ width:40, height:40, display:'grid', placeItems:'center', background:'#fff', color:'#111' }}>
                {f.icon}
              </div>
              <div className="mt-3 font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-gray-700">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
