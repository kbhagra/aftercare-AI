"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[40px] bg-[var(--aftercare-blue)] py-3 text-sm font-bold text-white hover:bg-[var(--aftercare-blue-dark)] disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--aftercare-text-muted)]">
        No account?{" "}
        <Link href="/signup" className="font-semibold text-[var(--aftercare-blue)] hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
