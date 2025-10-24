// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div
        className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid gap-6 sm:gap-4"
        style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
      >
        <div>
          <div className="font-semibold text-gray-900">PrimeJourney</div>
          <p className="mt-2 text-gray-500">© {year} PrimeJourney. All rights reserved.</p>
        </div>

        <div>
          <div className="font-semibold text-gray-900">Company</div>
          <ul className="mt-2 space-y-1">
            <li>
              <a className="hover:underline" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-gray-900">Help</div>
          <ul className="mt-2 space-y-1">
            <li>
              <a className="hover:underline" href="/terms">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
