"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { SiteHeader } from "@/components/SiteHeader";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (!u) {
        router.replace("/login?next=/profile");
        return;
      }
      const meta = u.user_metadata || {};
      setFullName((meta.full_name as string) || "");
      setRelationship((meta.caregiver_relationship as string) || "");
      setPatientName((meta.patient_name as string) || "");
      setPhone((meta.phone as string) || "");
      setLoading(false);
    });
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    const supabase = getSupabaseBrowser();
    if (!supabase || !user) return;
    setSaving(true);
    const { error: upErr } = await supabase.auth.updateUser({
      data: {
        full_name: fullName.trim(),
        caregiver_relationship: relationship.trim(),
        patient_name: patientName.trim(),
        phone: phone.trim(),
      },
    });
    setSaving(false);
    if (upErr) {
      setError(upErr.message);
      return;
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowser();
    await supabase?.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9fafb]">
        <SiteHeader />
        <div className="px-5 pt-[calc(var(--aftercare-nav-h)+48px)] text-center text-sm text-[var(--aftercare-text-muted)]">
          Loading profile…
        </div>
      </main>
    );
  }

  const supabase = getSupabaseBrowser();
  if (!supabase) {
    return (
      <main className="min-h-screen bg-[#f9fafb]">
        <SiteHeader />
        <div className="mx-auto max-w-lg px-5 pt-[calc(var(--aftercare-nav-h)+48px)]">
          <p className="text-[15px] text-[var(--aftercare-text-muted)]">
            Supabase is not configured. Add <code className="rounded bg-neutral-200 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-neutral-200 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to use profiles and auth.
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[560px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <h1 className="mb-2 text-2xl font-bold text-[var(--aftercare-text)]">Your profile</h1>
        <p className="mb-8 text-sm text-[var(--aftercare-text-muted)]">
          Tell us who you are as a caregiver. This information is stored with your account (Supabase user metadata).
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="email-ro" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Email
            </label>
            <input
              id="email-ro"
              type="email"
              readOnly
              value={user.email ?? ""}
              className="w-full cursor-not-allowed rounded-xl border border-[var(--aftercare-border)] bg-[#f9fafb] px-3 py-2.5 text-[15px] text-[var(--aftercare-text-muted)]"
            />
          </div>
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jordan Lee"
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          <div>
            <label htmlFor="relationship" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Relationship to patient
            </label>
            <input
              id="relationship"
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Adult child, spouse, friend"
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          <div>
            <label htmlFor="patientName" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Patient name or nickname (optional)
            </label>
            <input
              id="patientName"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Mom, Alex"
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[var(--aftercare-text)]">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="For reminders (future feature)"
              className="w-full rounded-xl border border-[var(--aftercare-border)] px-3 py-2.5 text-[15px] outline-none focus:border-[var(--aftercare-blue)] focus:ring-2 focus:ring-[rgba(8,102,255,0.15)]"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && <p className="text-sm text-green-700">Profile saved.</p>}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-[40px] bg-[var(--aftercare-blue)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--aftercare-blue-dark)] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="rounded-[40px] border border-[var(--aftercare-border)] px-6 py-3 text-sm font-semibold text-[var(--aftercare-text-muted)] hover:bg-black/5"
            >
              Log out
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm">
          <Link href="/app" className="text-[var(--aftercare-blue)] hover:underline">
            Go to care plan analyzer
          </Link>
        </p>
      </div>
    </main>
  );
}
