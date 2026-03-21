"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type Resource = {
  type: string;
  name: string;
  address: string;
  phone: string;
};

type CarePlan72h = {
  day1?: string[];
  day2?: string[];
  day3?: string[];
};

type CarePlanResult = {
  plain_summary: string;
  today_checklist: string[];
  warning_signs: string[];
  questions_for_doctor: string[];
  next_step: string;
  urgency: string;
  suggested_resources: Resource[];
  urgent_advice?: string;
  urgent_rationale?: string[];
  care_plan_72h?: CarePlan72h;
};

const DISCHARGE_PLACEHOLDER =
  "Paste discharge instructions here… e.g. 'Patient discharged after appendectomy. Keep incision dry. Watch for fever above 101°F. Take ibuprofen 400mg every 6 hours. Follow up in 5 days.'";

export default function AppPage() {
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CarePlanResult | null>(null);
  const [error, setError] = useState("");
  const [doneChecklist, setDoneChecklist] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromLanding = params.get("instructions") ?? "";
    if (fromLanding.trim()) setInstructions(fromLanding);
    if (params.get("autogen") === "1" && fromLanding.trim()) {
      queueMicrotask(() => void handleGenerate(fromLanding));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async (override?: string) => {
    setLoading(true);
    setError("");
    setResult(null);
    setDoneChecklist({});

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instructions: override ?? instructions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate care plan.");
    } finally {
      setLoading(false);
    }
  };

  const isUrgent = result?.urgency && ["emergency", "high"].includes(result.urgency.toLowerCase());
  const urgentAdvice = result?.urgent_advice ?? result?.next_step;
  const urgentRationale = result?.urgent_rationale ?? result?.warning_signs ?? [];
  const care72h = result?.care_plan_72h;
  const timeline = useMemo(() => {
    if (care72h?.day1 || care72h?.day2 || care72h?.day3) return care72h;
    // fallback: simple, deterministic grouping if model doesn't return structured 72h plan
    const items = result?.today_checklist ?? [];
    const d1 = items.slice(0, Math.min(items.length, 4));
    const d2 = items.slice(4, Math.min(items.length, 7));
    const d3 = items.slice(7);
    return { day1: d1, day2: d2, day3: d3 } satisfies CarePlan72h;
  }, [care72h, result?.today_checklist]);

  const copyQuestions = async () => {
    const qs = result?.questions_for_doctor ?? [];
    const text = qs.map((q, i) => `${i + 1}. ${q}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[15px] leading-[1.6] text-[var(--aftercare-text)]">
      <SiteHeader />

      <section className="px-5 pb-20 pt-[calc(var(--aftercare-nav-h)+64px)]">
        <div className="mx-auto max-w-[820px]">
          <div className="mx-auto mb-8 max-w-[560px] text-center">
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[.08em] text-[var(--aftercare-blue)]">
              Try it now
            </div>
            <h1 className="mb-3 text-[clamp(22px,4vw,34px)] font-bold leading-[1.2] tracking-[-.5px] text-[var(--aftercare-text)]">
              Paste your discharge instructions
            </h1>
            <p className="text-[15px] leading-[1.65] text-[var(--aftercare-text-muted)]">
              We&apos;ll create a personalized care plan in seconds.
            </p>
          </div>

          <div className="flex items-end gap-2 rounded-[20px] border border-[var(--aftercare-border)] bg-white px-[22px] py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.03)] focus-within:border-[rgba(8,102,255,0.3)] focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_3px_rgba(8,102,255,0.12)]">
            <textarea
              value={instructions}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
              placeholder={DISCHARGE_PLACEHOLDER}
              rows={3}
              className="min-h-[64px] max-h-[180px] flex-1 resize-none border-none bg-transparent py-3.5 pr-2 text-[15px] leading-[1.6] text-[var(--aftercare-text)] outline-none placeholder:text-[var(--aftercare-text-light)]"
            />
            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={loading || !instructions.trim()}
              className="mb-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--aftercare-blue)] text-white shadow-[0_4px_12px_rgba(8,102,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--aftercare-blue-dark)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M3 9h12M9 3l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {loading && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-[3px] border-[#e0f2fe] border-t-[var(--aftercare-blue)]" />
              <div className="mb-1.5 text-[18px] font-semibold text-[var(--aftercare-text)]">Analyzing discharge instructions…</div>
              <div className="text-[14px] text-[var(--aftercare-text-muted)]">Building your personalized 72-hour care plan</div>
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div id="results" className="mt-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-[40px] border border-[#bfdbfe] bg-[#eff6ff] px-3.5 py-1.5 text-[12px] font-medium text-[var(--aftercare-blue)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--aftercare-blue)]" />
                Demo mode — connect NVIDIA Nemotron API to analyze real notes
              </div>

              {/* URGENT */}
              {isUrgent && (
                <div className="mb-5 flex flex-col gap-7 rounded-[20px] bg-gradient-to-br from-[#dc2626] to-[#b91c1c] p-7 text-white shadow-[0_8px_32px_rgba(220,38,38,0.22)] md:flex-row md:items-center">
                  <div className="shrink-0 md:border-r md:border-white/20 md:pr-7">
                    <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white/60">⚠ Urgent</div>
                    <div className="mb-4 text-[16px] font-semibold leading-[1.3]">Requires immediate medical attention</div>
                    <a
                      href="tel:911"
                      className="inline-flex items-center gap-2 rounded-[40px] bg-white px-5 py-2.5 text-[14px] font-bold text-[#dc2626] hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                        <path d="M2 3c0-.6.4-1 1-1h2.2l.9 2.8-1.4 1.4c.8 1.6 2.5 3.3 4.1 4.1l1.4-1.4L13 9.8V12c0 .6-.4 1-1 1C5.8 13 2 9.2 2 4.5V3z" fill="#dc2626" />
                      </svg>
                      Call 911
                    </a>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2.5 text-[18px] font-semibold leading-[1.3]">{urgentAdvice}</div>
                    <ul className="space-y-1.5">
                      {urgentRationale.map((r, idx) => (
                        <li key={idx} className="relative pl-4 text-[14px] font-light text-white/90">
                          <span className="absolute left-0 text-white/40">—</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <Card variant="summary" title="Plain Summary" tag="Nemotron">
                  <div className="text-[16px] font-semibold leading-[1.4] text-[var(--aftercare-text)]">{result.plain_summary}</div>
                </Card>

                <Card variant="checklist" title="Today's Checklist">
                  <ul className="flex flex-col">
                    {(result.today_checklist ?? []).map((item) => {
                      const key = item;
                      const done = !!doneChecklist[key];
                      const [maybeTime, rest] = item.includes(" - ") ? item.split(" - ", 2) : ["", item];
                      const showTime = maybeTime && /am|pm|\d/.test(maybeTime.toLowerCase()) && rest !== item;
                      return (
                        <li
                          key={key}
                          className="flex cursor-pointer items-center gap-2.5 border-b border-[#f3f4f6] py-2.5 last:border-b-0"
                          onClick={() => setDoneChecklist((prev) => ({ ...prev, [key]: !done }))}
                        >
                          <span
                            className={[
                              "flex h-5 w-5 items-center justify-center rounded-md border-2 transition",
                              done ? "border-[var(--aftercare-green)] bg-[var(--aftercare-green)]" : "border-[#d1d5db] bg-white",
                            ].join(" ")}
                            aria-hidden
                          >
                            {done && (
                              <span className="block h-2.5 w-3 -translate-y-[1px] rotate-[-45deg] border-b-2 border-l-2 border-white" />
                            )}
                          </span>
                          <span className={["flex-1 text-[14px] leading-[1.4]", done ? "text-[var(--aftercare-text-light)] line-through" : "text-[var(--aftercare-text)]"].join(" ")}>
                            {showTime ? rest : item}
                          </span>
                          {showTime && <span className="pl-1 text-[11px] font-semibold text-[var(--aftercare-text-light)]">{maybeTime}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card variant="warning" title="Warning Signs">
                  <div className="mb-2.5 text-[12px] text-[var(--aftercare-text-muted)]">Seek immediate attention if you notice:</div>
                  <ul className="space-y-2">
                    {(result.warning_signs ?? []).map((w, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 rounded-[10px] border border-[#fef3c7] bg-[#fffbeb] px-3.5 py-2.5 text-[14px] text-[var(--aftercare-text)]"
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--aftercare-amber)]" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="questions" title="Questions for Doctor">
                  <ul className="space-y-2">
                    {(result.questions_for_doctor ?? []).map((q, idx) => (
                      <li key={idx} className="rounded-[10px] border-l-[3px] border-[var(--aftercare-blue)] bg-[#eff6ff] px-3.5 py-2.5 text-[14px] leading-[1.5] text-[var(--aftercare-text)]">
                        {q}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => void copyQuestions()}
                    className="mt-4 inline-flex items-center gap-2 rounded-[40px] bg-[var(--aftercare-blue)] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(8,102,255,0.3)] hover:bg-[var(--aftercare-blue-dark)]"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" stroke="white" strokeWidth="1.3" fill="none" />
                      <path d="M9.5 3.5V2.5C9.5 2 9.2 1.5 8.5 1.5H2.5C2 1.5 1.5 2 1.5 2.5v6C1.5 9 2 9.5 2.5 9.5H3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    {copied ? "✓ Copied!" : "Copy Questions"}
                  </button>
                </Card>
              </div>

              {/* 72-hour plan */}
              <div className="mt-4">
                <Card variant="timeline" title="Your 72-Hour Care Plan">
                  <div className="space-y-5">
                    <TimelineDay dayNumber={1} label="Day 1 — Today" variant="d1" tasks={timeline.day1 ?? []} />
                    <TimelineDay dayNumber={2} label="Day 2" variant="d2" tasks={timeline.day2 ?? []} />
                    <TimelineDay dayNumber={3} label="Day 3" variant="d3" tasks={timeline.day3 ?? []} />
                  </div>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card variant="next" title="Next Step">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-[40px] border border-[rgba(139,92,246,0.18)] bg-[#f5f3ff] px-4 py-2 text-[13px] font-semibold text-[#7c3aed]">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                      <circle cx="6.5" cy="6.5" r="4.5" stroke="#7c3aed" strokeWidth="1.2" fill="none" />
                      <path d="M6.5 4v2.5l1.5 1.5" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Schedule Follow-Up Visit
                  </div>
                  <p className="text-[14px] leading-[1.7] text-[var(--aftercare-text-muted)]">{result.next_step}</p>
                </Card>

                <Card variant="resources" title="Helpful Resources" id="resources">
                  <ul className="space-y-2">
                    {(result.suggested_resources ?? []).map((r, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex items-center gap-3 rounded-[12px] border border-[#f3f4f6] bg-[#fafafa] px-3.5 py-2.5 transition hover:translate-x-0.5 hover:border-[rgba(34,197,94,0.25)] hover:bg-[#f0fdf4]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(34,197,94,0.2)] bg-[#f0fdf4]">
                          <span className="text-[14px]">↗</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-[var(--aftercare-text)]">{r.name}</div>
                          <div className="text-[12px] text-[var(--aftercare-text-muted)]">{r.address}</div>
                        </div>
                        <div className="text-[16px] text-[var(--aftercare-text-light)]">↗</div>
                      </a>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  children,
  id,
  variant,
  tag,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
  variant:
    | "summary"
    | "checklist"
    | "warning"
    | "questions"
    | "timeline"
    | "next"
    | "resources";
  tag?: string;
}) {
  const icon = (() => {
    switch (variant) {
      case "summary":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="2" width="14" height="14" rx="3" stroke="#0866FF" strokeWidth="1.5" fill="none" />
            <path d="M5 6h8M5 9h6M5 12h4" stroke="#0866FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "checklist":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="2" width="14" height="14" rx="3" stroke="#22c55e" strokeWidth="1.5" fill="none" />
            <path d="M6 9l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "warning":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M9 2L16 15H2L9 2z" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <path d="M9 8v3M9 13v.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "questions":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="9" cy="9" r="7" stroke="#0866FF" strokeWidth="1.5" fill="none" />
            <path d="M9 13v.5" stroke="#0866FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.5-1.2 1.8C9.3 9.1 9 9.5 9 10v.5" stroke="#0866FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "timeline":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="9" cy="9" r="7" stroke="#10d9b0" strokeWidth="1.5" fill="none" />
            <path d="M9 5v4l2.5 2.5" stroke="#10d9b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "next":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 9h10M9 4l5 5-5 5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "resources":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M3 4h12v10H3z" stroke="#22c55e" strokeWidth="1.5" fill="none" />
            <path d="M6 4V2M12 4V2M3 8h12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  })();

  const iconBg = (() => {
    switch (variant) {
      case "summary":
      case "questions":
        return "bg-[#eff6ff]";
      case "checklist":
        return "bg-[#f0fdf4]";
      case "warning":
        return "bg-[#fffbeb]";
      case "timeline":
        return "bg-[#f0fdf4]";
      case "next":
        return "bg-[#f5f3ff]";
      case "resources":
        return "bg-[#f0fdf4]";
    }
  })();

  const accentBar = (() => {
    switch (variant) {
      case "summary":
      case "questions":
        return "bg-[linear-gradient(90deg,var(--aftercare-blue),transparent)]";
      case "checklist":
      case "resources":
        return "bg-[linear-gradient(90deg,var(--aftercare-green),transparent)]";
      case "warning":
        return "bg-[linear-gradient(90deg,var(--aftercare-amber),transparent)]";
      case "timeline":
        return "bg-[linear-gradient(90deg,var(--aftercare-mint),transparent)]";
      case "next":
        return "bg-[linear-gradient(90deg,var(--aftercare-purple),transparent)]";
    }
  })();

  return (
    <div
      id={id}
      className="rounded-[20px] border border-[var(--aftercare-border)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={["flex h-9 w-9 items-center justify-center rounded-[10px]", iconBg].join(" ")}>
          {icon}
        </div>
        <div className="text-[15px] font-semibold text-[var(--aftercare-text)]">{title}</div>
        {tag && (
          <div className="ml-auto inline-flex items-center gap-1.5 rounded-[20px] border border-[var(--aftercare-border)] bg-[#f9fafb] px-2.5 py-1 text-[11px] font-medium text-[var(--aftercare-text-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#76b900]" />
            {tag}
          </div>
        )}
      </div>
      <div className={["mb-4 h-0.5 rounded", accentBar].join(" ")} />
      {children}
    </div>
  );
}

function TimelineDay({
  dayNumber,
  label,
  variant,
  tasks,
}: {
  dayNumber: number;
  label: string;
  variant: "d1" | "d2" | "d3";
  tasks: string[];
}) {
  const dotClass =
    variant === "d1"
      ? "bg-[var(--aftercare-blue)] text-white"
      : variant === "d2"
        ? "bg-[#dbeafe] text-[var(--aftercare-blue)]"
        : "bg-[#f3f4f6] text-[var(--aftercare-text-muted)]";

  const taskDot =
    variant === "d1"
      ? "bg-[var(--aftercare-blue)]"
      : variant === "d2"
        ? "bg-[#93c5fd]"
        : "bg-[#d1d5db]";

  return (
    <div className="flex gap-4">
      <div className="flex w-8 flex-col items-center">
        <div className={["flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold", dotClass].join(" ")}>
          {dayNumber}
        </div>
        {variant !== "d3" && <div className="mt-1 min-h-4 flex-1 w-0.5 bg-[#e5e7eb]" />}
      </div>
      <div className="flex-1 pt-1">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--aftercare-text-muted)]">
          {label}
        </div>
        <div className="space-y-1.5">
          {(tasks ?? []).length > 0 ? (
            tasks.map((t, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg border border-[#f3f4f6] bg-[#f9fafb] px-3 py-1.5 text-[13px] text-[var(--aftercare-text)]">
                <span className={["h-1.5 w-1.5 rounded-full", taskDot].join(" ")} />
                {t}
              </div>
            ))
          ) : (
            <div className="text-[13px] text-[var(--aftercare-text-light)]">No tasks provided.</div>
          )}
        </div>
      </div>
    </div>
  );
}
