"use client";
import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "@/lib/client/auth";

type User = { id:number; username:string; email:string; first_name:string; last_name:string } | null;
type Ctx = {
  user: User; loading: boolean;
  login: (u:string,p:string)=>Promise<boolean>;
  register: (p:any)=>Promise<boolean>;
  logout: ()=>Promise<void>;
};
const Ctx = createContext<Ctx | null>(null);
export const useAuth = () => useContext(Ctx)!;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMe(a = access) {
    if (!a) { setUser(null); return; }
    const res = await auth.me(a);
    if (res.ok) setUser(await res.json());
    else setUser(null);
  }

  async function tryRefresh() {
    const a = await auth.refresh(); // uses cookie
    if (a) { setAccess(a); localStorage.setItem("access", a); await fetchMe(a); return true; }
    return false;
  }

  async function login(u: string, p: string) {
    const a = await auth.login(u, p);
    if (!a) return false;
    setAccess(a); localStorage.setItem("access", a);
    await fetchMe(a);
    return true;
  }

  async function register(payload: any) {
    const res = await auth.register(payload);
    if (!res.ok) return false;
    return await login(payload.username, payload.password);
  }

  async function logout() {
    localStorage.removeItem("access");
    setAccess(null); setUser(null);
    await auth.logout(); // clears cookie (+ blacklist if enabled)
  }

  useEffect(() => {
    const a = localStorage.getItem("access");
    if (a) setAccess(a);
    (async () => {
      if (a) {
        await fetchMe(a);
      } else {
        // attempt silent refresh if access missing/expired
        await tryRefresh();
      }
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}
