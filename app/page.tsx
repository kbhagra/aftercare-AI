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
    <main className="min-h-screen bg-white text-[var(--aftercare-text)]">
      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-[1000] h-[var(--aftercare-nav-h)] border-b border-[var(--aftercare-border)] bg-white/90 backdrop-blur-[20px]">
        <div className="mx-auto flex h-full max-w-[1080px] items-center gap-6 px-7">
          <Link href="/" className="mr-6 flex shrink-0 items-center gap-2.5 no-underline">
            <div className="aftercare-glass-icon" aria-hidden>
              <svg viewBox="0 0 20 20" fill="none" className="relative z-[1] h-5 w-5">
                <path
                  d="M10 2.5C10 2.5 4 6.5 4 11C4 13.8 6.7 16 10 16C13.3 16 16 13.8 16 11C16 6.5 10 2.5 10 2.5Z"
                  fill="url(#g1)"
                  stroke="rgba(8,102,255,0.3)"
                  strokeWidth="0.8"
                />
                <path
                  d="M8 10.5h1.5v1.5h1.5v-1.5H12.5v-1.5H11v-1.5H9.5v1.5H8z"
                  fill="white"
                />
                <defs>
                  <linearGradient id="g1" x1="4" y1="2" x2="16" y2="17" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#0550cc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-[17px] font-bold text-[var(--aftercare-text)]">AfterCare AI</span>
          </Link>

          <nav className="flex flex-1 items-center gap-0">
            <a className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]" href="/#how-it-works">
              How it works
            </a>
            <a className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]" href="/#appSec">
              Care Plans
            </a>
            <a className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]" href="/#resources">
              Resources
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]"
              type="button"
              onClick={() => router.push("/app")}
            >
              Explore
            </button>
            <button
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]"
              type="button"
              onClick={() => document.getElementById("support")?.scrollIntoView({ behavior: "smooth" })}
            >
              Support
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[var(--aftercare-text)] hover:bg-black/10"
              type="button"
              aria-label="Profile"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[var(--aftercare-nav-h)]">
        <div className="aftercare-hero-bg absolute inset-0" aria-hidden />
        <div className="aftercare-orb absolute -left-[100px] -top-[100px] h-[400px] w-[400px]" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3), transparent)" }} aria-hidden />
        <div className="aftercare-orb absolute -bottom-[50px] -right-[80px] h-[350px] w-[350px]" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.25), transparent)", animationDelay: "-3s" }} aria-hidden />
        <div className="aftercare-orb absolute right-[10%] top-[40%] h-[280px] w-[280px]" style={{ background: "radial-gradient(circle, rgba(8,102,255,0.2), transparent)", animationDelay: "-5s" }} aria-hidden />
        <div className="aftercare-orb absolute bottom-[20%] left-[8%] h-[200px] w-[200px]" style={{ background: "radial-gradient(circle, rgba(16,217,176,0.3), transparent)", animationDelay: "-2s" }} aria-hidden />

        {/* Floating emoji icons */}
        <div className="aftercare-float-icon absolute left-[8%] top-[18%] h-[72px] w-[72px] rounded-[22px] text-[28px]" aria-hidden>❤️</div>
        <div className="aftercare-float-icon absolute right-[12%] top-[12%] h-[80px] w-[80px] rounded-[24px] text-[28px]" style={{ animationDelay: "-2s" }} aria-hidden>🩺</div>
        <div className="aftercare-float-icon absolute left-[5%] top-[55%] h-[64px] w-[64px] rounded-[18px] text-[28px]" style={{ animationDelay: "-4s" }} aria-hidden>💊</div>
        <div className="aftercare-float-icon absolute bottom-[22%] right-[8%] h-[68px] w-[68px] rounded-[20px] text-[28px]" style={{ animationDelay: "-1s" }} aria-hidden>🩹</div>
        <div className="aftercare-float-icon absolute bottom-[35%] left-[14%] h-[56px] w-[56px] rounded-[16px] text-[22px]" style={{ animationDelay: "-3.5s" }} aria-hidden>🧬</div>
        <div className="aftercare-float-icon absolute right-[5%] top-[35%] h-[60px] w-[60px] rounded-[18px] text-[24px]" style={{ animationDelay: "-5s" }} aria-hidden>🏥</div>

        {/* Floating cards */}
        <div className="aftercare-float-card absolute left-[4%] top-[16%] h-[190px] w-[155px]" aria-hidden>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
            <div className="text-[34px]">🩺</div>
            <div className="text-center text-[11px] font-semibold leading-[1.3] text-[var(--aftercare-text-muted)]">72-Hour Care Plan</div>
          </div>
        </div>
        <div className="aftercare-float-card absolute right-[4%] top-[11%] h-[135px] w-[195px]" style={{ animationDelay: "-3s" }} aria-hidden>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
            <div className="text-[34px]">⚠️</div>
            <div className="text-center text-[11px] font-semibold leading-[1.3] text-[var(--aftercare-text-muted)]">Warning Signs Detected</div>
          </div>
        </div>
        <div className="aftercare-float-card absolute bottom-[14%] right-[3%] h-[155px] w-[138px]" style={{ animationDelay: "-1.5s" }} aria-hidden>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
            <div className="text-[34px]">✅</div>
            <div className="text-center text-[11px] font-semibold leading-[1.3] text-[var(--aftercare-text-muted)]">Daily Checklist Ready</div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[700px] px-5 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-[40px] border border-[rgba(8,102,255,0.15)] bg-white/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[.05em] text-[var(--aftercare-blue)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--aftercare-blue)]" />
            Powered by NVIDIA Nemotron
          </div>
          <h1 className="mb-[18px] text-[clamp(34px,6vw,66px)] font-bold leading-[1.08] tracking-[-1.5px] text-[var(--aftercare-text)]">
            We&apos;re building the
            <br />
            <span className="bg-gradient-to-r from-[var(--aftercare-blue)] via-[var(--aftercare-teal)] to-[var(--aftercare-mint)] bg-clip-text text-transparent">
              future of caregiving
            </span>
          </h1>
          <p className="mx-auto mb-9 max-w-[480px] text-[17px] leading-[1.65] text-[var(--aftercare-text-muted)]">
            AfterCare AI transforms confusing hospital discharge notes into a clear 72-hour plan — with warning signs, checklists, and doctor questions, instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              className="rounded-[40px] bg-[var(--aftercare-blue)] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(8,102,255,0.35)] hover:bg-[var(--aftercare-blue-dark)]"
              type="button"
              onClick={() => document.getElementById("appSec")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get started free
            </button>
            <button
              className="rounded-[40px] border border-black/10 bg-white/80 px-7 py-3.5 text-[15px] font-medium text-[var(--aftercare-text)] backdrop-blur hover:bg-white"
              type="button"
              onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}
            >
              Our mission
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[12px] font-medium text-[var(--aftercare-text-light)]">
          <span>Scroll</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="how-it-works" className="border-t border-[var(--aftercare-border)] bg-white px-5 py-16">
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <div id="mission" className="mb-3 text-[12px] font-semibold uppercase tracking-[.08em] text-[var(--aftercare-blue)]">
              What we do
            </div>
            <h2 className="mb-3 text-[clamp(22px,4vw,34px)] font-bold leading-[1.2] tracking-[-.5px] text-[var(--aftercare-text)]">
              Everything a caregiver needs
            </h2>
            <p className="text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
              AfterCare AI reads discharge instructions the way a doctor would — and translates them for the people who love the patient.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[20px] border border-[var(--aftercare-border)] bg-[var(--aftercare-border)] md:grid-cols-3">
            <FeatureCard icon="🧠" iconBg="#eff6ff" title="Plain-language summary" description="Complex medical jargon translated into clear, actionable language your whole family can understand." />
            <FeatureCard icon="⚠️" iconBg="#f0fdf4" title="Warning sign detection" description="AI automatically flags red-flag symptoms and tells you exactly when to call 911 or head to the ER." />
            <FeatureCard icon="📋" iconBg="#faf5ff" title="72-hour care plan" description="A personalized, hour-by-hour action plan with medication reminders, wound checks, and follow-up scheduling." />
          </div>
        </div>
      </section>

      {/* Try it now */}
      <section id="appSec" className="border-t border-[var(--aftercare-border)] bg-[#f9fafb] px-5 pb-20 pt-16">
        <div className="mx-auto max-w-[820px]">
          <div className="mx-auto mb-8 max-w-[560px] text-center">
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[.08em] text-[var(--aftercare-blue)]">
              Try it now
            </div>
            <h2 className="mb-3 text-[clamp(22px,4vw,34px)] font-bold leading-[1.2] tracking-[-.5px] text-[var(--aftercare-text)]">
              Paste your discharge instructions
            </h2>
            <p className="text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
              We&apos;ll create a personalized care plan in seconds.
            </p>
          </div>

          <div className="flex items-end gap-2 rounded-[20px] border border-[var(--aftercare-border)] bg-white px-[22px] py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.03)] focus-within:border-[rgba(8,102,255,0.3)] focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_3px_rgba(8,102,255,0.12)]">
            <textarea
              value={draftInstructions}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraftInstructions(e.target.value)}
              placeholder="Paste discharge instructions here… e.g. 'Patient discharged after appendectomy. Keep incision dry. Watch for fever above 101°F. Take ibuprofen 400mg every 6 hours. Follow up in 5 days.'"
              rows={3}
              className="min-h-[64px] max-h-[180px] flex-1 resize-none border-none bg-transparent py-3.5 pr-2 text-[15px] leading-[1.6] text-[var(--aftercare-text)] outline-none placeholder:text-[var(--aftercare-text-light)]"
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = draftInstructions.trim();
                router.push(trimmed ? `/app?instructions=${encodeURIComponent(trimmed)}&autogen=1` : "/app");
              }}
              disabled={!draftInstructions.trim()}
              className="mb-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--aftercare-blue)] text-white shadow-[0_4px_12px_rgba(8,102,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--aftercare-blue-dark)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M3 9h12M9 3l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--aftercare-border)] bg-white px-7 py-7">
        <div className="flex items-center gap-2.5">
          <div className="aftercare-glass-icon" style={{ width: 32, height: 32, borderRadius: 9 }} aria-hidden>
            <svg viewBox="0 0 20 20" fill="none" className="relative z-[1] h-4 w-4">
              <path
                d="M10 2.5C10 2.5 4 6.5 4 11C4 13.8 6.7 16 10 16C13.3 16 16 13.8 16 11C16 6.5 10 2.5 10 2.5Z"
                fill="url(#g2)"
                stroke="rgba(8,102,255,0.3)"
                strokeWidth="0.8"
              />
              <path
                d="M8 10.5h1.5v1.5h1.5v-1.5H12.5v-1.5H11v-1.5H9.5v1.5H8z"
                fill="white"
              />
              <defs>
                <linearGradient id="g2" x1="4" y1="2" x2="16" y2="17" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#0550cc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[15px] font-bold text-[var(--aftercare-text)]">AfterCare AI</span>
        </div>
        <div className="flex flex-wrap gap-5 text-[13px] text-[var(--aftercare-text-muted)]">
          <a href="/#" className="hover:text-[var(--aftercare-text)]">Privacy</a>
          <a href="/#" className="hover:text-[var(--aftercare-text)]">Terms</a>
          <a href="/#" className="hover:text-[var(--aftercare-text)]">Accessibility</a>
          <a href="/#support" className="hover:text-[var(--aftercare-text)]">Help Center</a>
        </div>
        <div className="text-[12px] text-[var(--aftercare-text-light)]">
          © {new Date().getFullYear()} AfterCare AI · Powered by NVIDIA Nemotron
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white px-7 py-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px]" style={{ background: iconBg }}>
        <span className="text-[22px]">{icon}</span>
      </div>
      <div className="mt-3 text-[16px] font-bold text-[var(--aftercare-text)]">{title}</div>
      <div className="text-[14px] leading-[1.65] text-[var(--aftercare-text-muted)]">{description}</div>
    </div>
  );
}
