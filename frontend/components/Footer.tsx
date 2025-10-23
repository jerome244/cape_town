export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid gap-4"
           style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <div>
          <div className="font-semibold text-gray-900">PrimeJourney</div>
          <p className="mt-2">Prototype built with Next.js.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Company</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="#">About</a></li>
            <li><a className="hover:underline" href="#">Careers</a></li>
            <li><a className="hover:underline" href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Help</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="#">Support</a></li>
            <li><a className="hover:underline" href="#">Contact</a></li>
            <li><a className="hover:underline" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
