export async function register(payload: any) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export async function login(username: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  // Response contains { access }, store in memory/localStorage
  if (!res.ok) return null;
  const { access } = await res.json();
  return access as string;
}

export async function me(access: string) {
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${access}` },
  });
  return res;
}

export async function refresh() {
  // Uses httpOnly cookie automatically
  const res = await fetch("/api/auth/refresh", { method: "POST" });
  if (!res.ok) return null;
  const { access } = await res.json();
  return access as string;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}
