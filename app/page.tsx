"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ChangeEvent } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [draftInstructions, setDraftInstructions] = useState("");
  const instructionsParam = useMemo(() => encodeURIComponent(draftInstructions.trim()), [draftInstructions]);

  const goToApp = () => {
    const trimmed = draftInstructions.trim();
    if (!trimmed) {
      router.push("/app");
      return;
    }
    router.push(`/app?instructions=${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f4fc] to-white text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b8dff0]">
            <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
          </div>
          <span className="text-xl font-semibold">AfterCare AI</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            How it works
          </Link>
          <Link href="/app#care-plans" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Care Plans
          </Link>
          <Link href="/app#resources" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link href="/app" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Explore
          </Link>
          <a href="/#support" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Support
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 shadow-sm"
            aria-label="Profile"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#7dd3fc]/40 blur-3xl aftercare-drift" />
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#86efac]/30 blur-3xl aftercare-drift" />
          <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c4b5fd]/25 blur-3xl aftercare-drift" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-28 text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5ba3d0] bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2e7ab5]">
            <span className="h-2 w-2 rounded-full bg-[#2e7ab5]" />
          POWERED BY NVIDIA NEMOTRON
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-800 md:text-5xl lg:text-6xl">
            We&apos;re building the{" "}
            <span className="text-[#2563eb]">future of</span>{" "}
            <span className="text-[#16a34a]">caregiving</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
            AfterCare AI transforms confusing hospital discharge notes into a clear 72-hour plan — with warning signs, checklists, and doctor questions, instantly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/app")}
              className="rounded-xl bg-[#2563eb] px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#1d4ed8]"
            >
              Get started free
            </button>
            <Link
              href="/#mission"
              className="rounded-xl border-2 border-neutral-700 bg-white px-6 py-3.5 font-semibold text-neutral-800 transition hover:bg-neutral-50"
            >
              Our mission
            </Link>
          </div>

          {/* Floating feature cards */}
          <div className="aftercare-float absolute left-6 top-[10rem] hidden w-44 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 shadow-lg lg:block">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-neutral-800">72-Hour Care Plan</p>
          </div>

          <div className="aftercare-float absolute left-10 top-[16rem] hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white/80 shadow-lg lg:flex items-center justify-center">
            <span className="text-2xl">💊</span>
          </div>
          <div className="aftercare-float absolute left-24 top-[19rem] hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white/80 shadow-lg lg:flex items-center justify-center">
            <span className="text-2xl">🫀</span>
          </div>

          <div className="aftercare-float absolute right-6 top-[8rem] hidden w-52 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 shadow-lg lg:block">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-neutral-800">Warning Signs Detected</p>
          </div>
          <div className="aftercare-float absolute right-16 top-[14.5rem] hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white/80 shadow-lg lg:flex items-center justify-center">
            <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="aftercare-float absolute right-8 top-[19rem] hidden w-44 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 shadow-lg lg:block">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-neutral-800">Daily Checklist Ready</p>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-1 text-sm text-neutral-500">
            <span>Scroll</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/80">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#2e7ab5]">WHAT WE DO</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-800 md:text-4xl">
            Everything a caregiver needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            AfterCare AI reads discharge instructions the way a doctor would — and translates them for the people who love the patient.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h7m-7 4h10M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" />
                </svg>
              </span>
            }
            title="Plain-language summary"
            description="Complex medical jargon translated into clear, actionable language your whole family can understand."
          />
          <FeatureCard
            icon={
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
            }
            title="Warning sign detection"
            description="AI automatically flags red-flag symptoms and tells you exactly when to call 911 or head to the ER."
          />
          <FeatureCard
            icon={
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m-6 4h6m-7 7l2 2 4-4m-8 7h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
            }
            title="72-hour care plan"
            description="A personalized, hour-by-hour action plan with medication reminders, wound checks, and follow-up scheduling."
          />
        </div>
      </section>

      {/* Try it now */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-wider text-neutral-500">TRY IT NOW</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-800 md:text-4xl">
              Paste your discharge instructions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
              We&apos;ll create a personalized care plan in seconds.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-end gap-3">
              <textarea
                value={draftInstructions}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraftInstructions(e.target.value)}
                placeholder="Paste discharge instructions here... e.g. 'Patient discharged after appendectomy. Keep incision dry. Watch for fever above 101°F. Take ibuprofen 400mg every 6 hours. Follow up in 5 days.'"
                rows={3}
                className="w-full resize-none rounded-xl border border-neutral-200 bg-white p-4 text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
              />
              <button
                type="button"
                onClick={goToApp}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-md transition hover:bg-[#1d4ed8]"
                aria-label="Analyze"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
              Demo mode — connect NVIDIA Nemotron API to analyze real notes
            </p>
          </div>
        </div>
      </section>

      <section id="support" className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-bold text-neutral-800">Support</h2>
        <p className="mt-4 text-neutral-600">
          Need help? Contact us for questions about discharge plans, resources, or using AfterCare AI.
        </p>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b8dff0]">
                <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
              </div>
              AfterCare AI
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-neutral-500">
              <a className="hover:text-neutral-800" href="/#">
                Privacy
              </a>
              <a className="hover:text-neutral-800" href="/#">
                Terms
              </a>
              <a className="hover:text-neutral-800" href="/#">
                Accessibility
              </a>
              <a className="hover:text-neutral-800" href="/#support">
                Help Center
              </a>
            </div>
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} AfterCare AI • Powered by NVIDIA Nemotron
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {icon}
      <h3 className="mt-4 text-base font-semibold text-neutral-800">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
    </div>
  );
}
