import { NextResponse } from "next/server";
import { djangoFetch } from "@/lib/server/django";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await djangoFetch("/api/auth/register/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
