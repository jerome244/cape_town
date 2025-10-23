// Server-only helper to call Django from Next API routes
export async function djangoFetch(path: string, init: RequestInit = {}) {
  const base = process.env.API_BASE || "http://localhost:8000";
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  return res;
}
