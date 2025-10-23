export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">PrimeJourney</h1>
        <nav className="space-x-6 text-sm">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#packages" className="hover:underline">Packages</a>
          <a href="/bookings" className="hover:underline">Bookings</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
