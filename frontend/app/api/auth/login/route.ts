import { NextResponse } from "next/server";
import { djangoFetch } from "@/lib/server/django";
import { setRefreshCookie } from "@/lib/server/cookies";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await djangoFetch("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // Store refresh token server-side in an httpOnly cookie
  if (data.refresh) {
    setRefreshCookie(data.refresh);
  }

  // Return only access token to the client
  return NextResponse.json({ access: data.access }, { status: 200 });
}
