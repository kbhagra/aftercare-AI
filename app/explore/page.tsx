import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-white text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[820px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--aftercare-blue)]">
          Explore
        </p>
        <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-bold tracking-tight text-[var(--aftercare-text)]">
          Discover what AfterCare AI can do
        </h1>
        <p className="mb-10 text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
          Turn discharge paperwork into plain language, warning signs, checklists, and questions for your care team — powered by NVIDIA Nemotron.
        </p>

        <div className="space-y-4">
          <Link
            href="/app"
            className="block rounded-[20px] border border-[var(--aftercare-border)] bg-[#f9fafb] p-6 transition hover:border-[rgba(8,102,255,0.25)] hover:bg-[#eff6ff]"
          >
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">Create a care plan</h2>
            <p className="mt-2 text-sm text-[var(--aftercare-text-muted)]">
              Paste discharge instructions and get a 72-hour plan in seconds.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-[var(--aftercare-blue)]">Open analyzer →</span>
          </Link>

          <Link
            href="/care-plans"
            className="block rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 transition hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-[var(--aftercare-text)]">How care plans work</h2>
            <p className="mt-2 text-sm text-[var(--aftercare-text-muted)]">
              Learn what goes into your personalized checklist and timeline.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-[var(--aftercare-blue)]">Read more →</span>
          </Link>
        </div>

        <section id="resources" className="mt-16 scroll-mt-[calc(var(--aftercare-nav-h)+16px)]">
          <h2 className="mb-2 text-xl font-bold text-[var(--aftercare-text)]">Helpful resources</h2>
          <p className="mb-6 text-[15px] text-[var(--aftercare-text-muted)]">
            General guidance — always follow your own discharge paperwork and clinician advice.
          </p>
          <ul className="space-y-3 text-[15px] text-[var(--aftercare-text-muted)]">
            <li>
              <a className="font-medium text-[var(--aftercare-blue)] hover:underline" href="https://www.cdc.gov/patientsafety/features/prevent-hospital-infections.html" target="_blank" rel="noopener noreferrer">
                CDC — Prevent infections after hospital care
              </a>
            </li>
            <li>
              <a className="font-medium text-[var(--aftercare-blue)] hover:underline" href="https://www.medicare.gov/care-compare" target="_blank" rel="noopener noreferrer">
                Medicare Care Compare — find facilities & quality info
              </a>
            </li>
            <li>
              <Link href="/support" className="font-medium text-[var(--aftercare-blue)] hover:underline">
                AfterCare AI — Support & help center
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
