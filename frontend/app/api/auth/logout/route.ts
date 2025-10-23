import { NextResponse } from "next/server";
import { clearRefreshCookie, getRefreshCookie } from "@/lib/server/cookies";
import { djangoFetch } from "@/lib/server/django";

export async function POST() {
  const refresh = getRefreshCookie();

  // Clear cookie locally regardless
  clearRefreshCookie();

  // Optional: if Django blacklist endpoint is enabled, revoke refresh
  if (refresh) {
    await djangoFetch("/api/auth/blacklist/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
    });
  }

  return NextResponse.json({ ok: true });
}
