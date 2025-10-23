import { cookies } from "next/headers";

const REFRESH_COOKIE = "refresh";

export function setRefreshCookie(token: string, maxAgeSeconds = 7 * 24 * 3600) {
  cookies().set(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export function clearRefreshCookie() {
  cookies().set(REFRESH_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getRefreshCookie(): string | null {
  return cookies().get(REFRESH_COOKIE)?.value ?? null;
}
