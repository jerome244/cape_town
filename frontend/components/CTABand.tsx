export default function CTABand() {
  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto px-4 py-10" style={{ color:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' }}>
        <div>
          <div className="text-2xl font-semibold">Ready to plan?</div>
          <div className="text-sm" style={{ opacity:.9 }}>Get a custom quote in under 24 hours.</div>
        </div>
        <a href="#contact" className="px-5 py-3 rounded-2xl" style={{ background:'#fff', color:'#111', fontWeight:600 }}>
          Get my quote
        </a>
      </div>
    </section>
  );
}
