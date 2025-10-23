import "./globals.css";
import Header from "../components/Header";

export const metadata = { title: "PrimeJourney", description: "Travel packages prototype" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
