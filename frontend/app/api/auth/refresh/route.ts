import { NextResponse } from "next/server";
import { djangoFetch } from "@/lib/server/django";
import { getRefreshCookie, setRefreshCookie } from "@/lib/server/cookies";

export async function POST() {
  const refresh = getRefreshCookie();
  if (!refresh) {
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 });
  }

  const res = await djangoFetch("/api/auth/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // If your Django is set to ROTATE_REFRESH_TOKENS=True, update cookie here if backend returns a new refresh
  if (data.refresh) setRefreshCookie(data.refresh);

  return NextResponse.json({ access: data.access }, { status: 200 });
}
