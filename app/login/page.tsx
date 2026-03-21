import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb] text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[420px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <h1 className="mb-2 text-2xl font-bold text-[var(--aftercare-text)]">Log in</h1>
        <p className="mb-8 text-sm text-[var(--aftercare-text-muted)]">
          Sign in to manage your caregiver profile.
        </p>
        <Suspense fallback={<div className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 text-sm text-[var(--aftercare-text-muted)]">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
