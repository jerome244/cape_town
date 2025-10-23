import { NextResponse } from "next/server";
import { djangoFetch } from "@/lib/server/django";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const res = await djangoFetch("/api/auth/me/", {
    headers: { Authorization: auth },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
