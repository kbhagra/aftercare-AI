import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb] text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[720px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--aftercare-blue)]">
          Support
        </p>
        <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-bold tracking-tight text-[var(--aftercare-text)]">
          Help center
        </h1>
        <p className="mb-10 text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
          Questions about discharge plans, the analyzer, or your account? Start here.
        </p>

        <div className="space-y-6">
          <section className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">Getting started</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-[var(--aftercare-text-muted)]">
              <li>
                <Link href="/app" className="text-[var(--aftercare-blue)] hover:underline">
                  Open the care plan analyzer
                </Link>{" "}
                and paste your discharge instructions.
              </li>
              <li>
                Add your{" "}
                <Link href="/profile" className="text-[var(--aftercare-blue)] hover:underline">
                  caregiver profile
                </Link>{" "}
                so we can personalize the experience (optional).
              </li>
            </ul>
          </section>

          <section className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">Medical disclaimer</h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
              AfterCare AI does not diagnose or replace your doctor. In an emergency, call 911. For medical decisions, contact your clinician.
            </p>
          </section>

          <section className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">Account & login</h2>
            <p className="mt-3 text-[15px] text-[var(--aftercare-text-muted)]">
              Use{" "}
              <Link href="/login" className="font-medium text-[var(--aftercare-blue)] hover:underline">
                Log in
              </Link>{" "}
              or{" "}
              <Link href="/signup" className="font-medium text-[var(--aftercare-blue)] hover:underline">
                Sign up
              </Link>{" "}
              to save your profile. If email confirmation is enabled in Supabase, check your inbox after signing up.
            </p>
          </section>

          <section id="contact" className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">Contact</h2>
            <p className="mt-3 text-[15px] text-[var(--aftercare-text-muted)]">
              For product feedback or partnership questions, reach out through your team&apos;s official channel. This demo does not include a public inbox.
            </p>
          </section>
        </div>

        <p className="mt-10 text-center text-[13px] text-[var(--aftercare-text-light)]">
          <Link href="/" className="text-[var(--aftercare-blue)] hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
