import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function CarePlansPage() {
  return (
    <main className="min-h-screen bg-white text-[var(--aftercare-text)]">
      <SiteHeader />
      <div className="mx-auto max-w-[820px] px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+48px)]">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--aftercare-blue)]">
          Care plans
        </p>
        <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-bold tracking-tight text-[var(--aftercare-text)]">
          Your 72-hour care plan
        </h1>
        <p className="mb-8 text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
          AfterCare AI reads your hospital discharge instructions and builds a structured plan: a plain-language summary, today&apos;s checklist, warning signs to watch for, questions to ask at follow-up, and a simple day-by-day timeline for the first three days.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[20px] border border-[var(--aftercare-border)] bg-[#f9fafb] p-6">
            <h2 className="font-bold text-[var(--aftercare-text)]">What you get</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--aftercare-text-muted)]">
              <li>Plain summary of instructions</li>
              <li>Checklist with optional times</li>
              <li>Urgent banner when risk is high</li>
              <li>Copy-ready questions for your doctor</li>
            </ul>
          </div>
          <div className="rounded-[20px] border border-[var(--aftercare-border)] bg-[#eff6ff] p-6">
            <h2 className="font-bold text-[var(--aftercare-text)]">Ready to try?</h2>
            <p className="mt-2 text-sm text-[var(--aftercare-text-muted)]">
              Paste your real discharge text on the analyzer page. Your data is sent to our API for processing; do not include information you are not allowed to share.
            </p>
            <Link
              href="/app"
              className="mt-4 inline-flex rounded-[40px] bg-[var(--aftercare-blue)] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[var(--aftercare-blue-dark)]"
            >
              Open care plan analyzer
            </Link>
          </div>
        </div>

        <p className="mt-10 text-[13px] text-[var(--aftercare-text-light)]">
          <Link href="/" className="text-[var(--aftercare-blue)] hover:underline">
            ← Home
          </Link>
          {" · "}
          <Link href="/explore" className="text-[var(--aftercare-blue)] hover:underline">
            Explore
          </Link>
        </p>
      </div>
    </main>
  );
}
