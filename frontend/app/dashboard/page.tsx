"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      router.replace("/login");
      return;
    }
    (async () => {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${access}` },
      });
      if (res.ok) setMe(await res.json());
      else {
        // try silent refresh
        const r = await fetch("/api/auth/refresh", { method: "POST" });
        if (r.ok) {
          const { access: newAccess } = await r.json();
          localStorage.setItem("access", newAccess);
          const res2 = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${newAccess}` },
          });
          if (res2.ok) setMe(await res2.json());
          else router.replace("/login");
        } else {
          router.replace("/login");
        }
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) return <main className="p-6">Loading…</main>;
  if (!me) return null;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {me.first_name || me.username}!</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(me, null, 2)}</pre>
    </main>
  );
}
