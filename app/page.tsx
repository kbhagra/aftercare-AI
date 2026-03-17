"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f4fc] to-white text-neutral-800">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#b8dff0]" />
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
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-16 pb-32 text-center">
        <p className="mb-6 inline-block rounded-full border border-[#5ba3d0] bg-white px-4 py-1.5 text-sm font-medium text-[#2e7ab5]">
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
          <Link
            href="/app"
            className="rounded-xl bg-[#2563eb] px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#1d4ed8]"
          >
            Get started free
          </Link>
          <Link
            href="/#mission"
            className="rounded-xl border-2 border-neutral-700 bg-white px-6 py-3.5 font-semibold text-neutral-800 transition hover:bg-neutral-50"
          >
            Our mission
          </Link>
        </div>

        {/* Floating feature cards */}
        <div className="absolute left-4 top-[18rem] hidden w-44 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-lg lg:block">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-neutral-800">72-Hour Care Plan</p>
        </div>
        <div className="absolute bottom-24 left-8 hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white shadow-lg lg:flex items-center justify-center">
          <span className="text-2xl">💊</span>
        </div>
        <div className="absolute bottom-40 left-20 hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white shadow-lg lg:flex items-center justify-center">
          <span className="text-2xl">🧬</span>
        </div>

        <div className="absolute right-4 top-[14rem] hidden w-48 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-lg lg:block">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-neutral-800">Warning Signs Detected</p>
        </div>
        <div className="absolute right-16 top-[22rem] hidden h-14 w-14 rounded-xl border border-neutral-200/80 bg-white shadow-lg lg:flex items-center justify-center">
          <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="absolute right-8 bottom-32 hidden w-44 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-lg lg:block">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-neutral-800">Daily Checklist Ready</p>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-1 pb-8 text-sm text-neutral-500">
        <span>Scroll</span>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Mission / How it works anchor section */}
      <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-20">
        <h2 id="mission" className="text-2xl font-bold text-neutral-800">
          Our mission
        </h2>
        <p className="mt-4 text-neutral-600">
          AfterCare AI is a caregiver support agent that helps families understand discharge instructions, create a 72-hour care plan, detect warning signs, and take the right next step — powered by NVIDIA Nemotron.
        </p>
      </section>

      <section id="support" className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-bold text-neutral-800">Support</h2>
        <p className="mt-4 text-neutral-600">
          Need help? Contact us for questions about discharge plans, resources, or using AfterCare AI.
        </p>
      </section>

      <footer className="border-t border-neutral-200 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
            Ashton Moraes
          </span>
        </div>
      </footer>
    </main>
  );
}
