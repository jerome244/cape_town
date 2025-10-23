"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Errors = Partial<Record<"username"|"email"|"password"|"password2"|"first_name"|"last_name"|"non_field_errors"|"detail", string[]>>;

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "", email: "", password: "", password2: "", first_name: "", last_name: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Refs for focusing first error
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
    // clear field error as user edits
    setErrors(prev => ({ ...prev, [k]: undefined }));
  }

  function firstErrorFieldKey(e: Errors): keyof typeof form | undefined {
    const order: (keyof typeof form)[] = ["username","email","first_name","last_name","password","password2"];
    return order.find(k => e[k] && e[k]!.length > 0);
  }

  function focusField(key?: keyof typeof form) {
    if (!key) return;
    ({ username: usernameRef, email: emailRef, password: passwordRef, password2: password2Ref,
       first_name: firstRef, last_name: lastRef } as const)[key].current?.focus();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    // quick client check
    if (form.password !== form.password2) {
      const e: Errors = { password2: ["Passwords do not match."] };
      setErrors(e); focusField("password2"); setSubmitting(false); return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        // DRF returns field errors as {field: [msg, ...]}
        const e: Errors = data || { detail: ["Registration failed"] };
        setErrors(e);
        focusField(firstErrorFieldKey(e));
        setSubmitting(false);
        return;
      }

      // Auto login
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setErrors({ detail: ["Account created, but auto-login failed. Please log in."] });
        router.push("/login");
        return;
      }

      localStorage.setItem("access", loginData.access);
      router.push("/dashboard");
    } catch {
      setErrors({ detail: ["Network error. Please try again."] });
    } finally {
      setSubmitting(false);
    }
  }

  const err = (k: keyof typeof form) => errors[k]?.[0]; // first error per field
  const cls = (k: keyof typeof form) =>
    `w-full border rounded px-3 py-2 ${err(k) ? "border-red-500 focus:outline-red-500" : ""}`;

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>

      {/* General error banner */}
      {(errors.detail || errors.non_field_errors) && (
        <div role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {(errors.detail || errors.non_field_errors)!.join(" ")}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        <input
          ref={usernameRef}
          className={cls("username")}
          placeholder="Username"
          value={form.username}
          onChange={e => set("username", e.target.value)}
          aria-invalid={!!err("username")}
          aria-describedby={err("username") ? "username-error" : undefined}
        />
        {err("username") && <p id="username-error" className="text-xs text-red-600">{err("username")}</p>}

        <input
          ref={emailRef}
          className={cls("email")}
          placeholder="Email"
          value={form.email}
          onChange={e => set("email", e.target.value)}
          aria-invalid={!!err("email")}
          aria-describedby={err("email") ? "email-error" : undefined}
        />
        {err("email") && <p id="email-error" className="text-xs text-red-600">{err("email")}</p>}

        <div className="flex gap-2">
          <div className="w-1/2">
            <input
              ref={firstRef}
              className={cls("first_name")}
              placeholder="First name"
              value={form.first_name}
              onChange={e => set("first_name", e.target.value)}
              aria-invalid={!!err("first_name")}
            />
            {err("first_name") && <p className="text-xs text-red-600">{err("first_name")}</p>}
          </div>
          <div className="w-1/2">
            <input
              ref={lastRef}
              className={cls("last_name")}
              placeholder="Last name"
              value={form.last_name}
              onChange={e => set("last_name", e.target.value)}
              aria-invalid={!!err("last_name")}
            />
            {err("last_name") && <p className="text-xs text-red-600">{err("last_name")}</p>}
          </div>
        </div>

        <input
          ref={passwordRef}
          className={cls("password")}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => set("password", e.target.value)}
          aria-invalid={!!err("password")}
          aria-describedby={err("password") ? "password-error" : undefined}
        />
        {err("password") && <p id="password-error" className="text-xs text-red-600">{err("password")}</p>}

        <input
          ref={password2Ref}
          className={cls("password2")}
          type="password"
          placeholder="Confirm password"
          value={form.password2}
          onChange={e => set("password2", e.target.value)}
          aria-invalid={!!err("password2")}
          aria-describedby={err("password2") ? "password2-error" : undefined}
        />
        {err("password2") && <p id="password2-error" className="text-xs text-red-600">{err("password2")}</p>}

        <button
          disabled={submitting}
          className="w-full border rounded px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="text-sm mt-4">
        Already have an account? <a href="/login" className="underline">Login</a>
      </p>
    </main>
  );
}
