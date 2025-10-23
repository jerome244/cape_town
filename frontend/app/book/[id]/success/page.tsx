import Link from "next/link";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Booking Success | PrimeJourney",
};

export default function BookingSuccessPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-green-600">Booking Confirmed!</h1>
        <p className="mt-4 text-gray-700 text-lg">
          Thank you for booking with <strong>PrimeJourney</strong>.  
          Your trip package #{params.id} has been successfully reserved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-3 rounded-2xl border font-semibold hover:bg-gray-50"
          >
            View My Bookings
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
