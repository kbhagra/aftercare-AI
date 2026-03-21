"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    const { data, error: signErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/profile` : undefined,
      },
    });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    if (data.session) {
      router.push("/profile");
      router.refresh();
      return;
    }
    setMessage("Check your email to confirm your account, then log in.");
  };

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[420px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <h1 className="mb-2 text-2xl font-bold text-[var(--aftercare-text)]">Sign up</h1>
        <p className="mb-8 text-sm text-[var(--aftercare-text-muted)]">
          Create an account to save your caregiver profile.
        </p>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-700">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[40px] bg-[var(--aftercare-blue)] py-3 text-sm font-bold text-white hover:bg-[var(--aftercare-blue-dark)] disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--aftercare-text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--aftercare-blue)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
