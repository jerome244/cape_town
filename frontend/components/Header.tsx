"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasAccess(!!localStorage.getItem("access"));
    }
  }, []);

  async function handleLogout() {
    try {
      localStorage.removeItem("access");                 // client token
      await fetch("/api/auth/logout", { method: "POST" }); // clears httpOnly refresh cookie
    } catch {}
    setHasAccess(false);
    router.push("/");
    router.refresh();
  }

  function onNavClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: "features" | "packages" | "contact"
  ) {
    // keep the href for right-click / open in new tab,
    // but intercept normal clicks for SPA behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${sectionId}`);
    }
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/">PrimeJourney</Link>
        </h1>

        <nav className="flex items-center gap-6 text-sm">
          <a
            href="/#features"
            onClick={(e) => onNavClick(e, "features")}
            className="hover:underline"
          >
            Features
          </a>

          <a
            href="/#packages"
            onClick={(e) => onNavClick(e, "packages")}
            className="hover:underline"
          >
            Packages
          </a>

          {/* HIDDEN: Bookings */}
          {/* <Link href="/bookings" className="hover:underline">Bookings</Link> */}

          <a
            href="/#contact"
            onClick={(e) => onNavClick(e, "contact")}
            className="hover:underline"
          >
            Contact
          </a>

          {!hasAccess ? (
            <>
              {/* HIDDEN: Login / Register */}
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md border px-3 py-1 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
