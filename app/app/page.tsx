"use client";

import { useState, type ReactNode, type ChangeEvent } from "react";
import Link from "next/link";

type Resource = {
  type: string;
  name: string;
  address: string;
  phone: string;
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
};

const DISCHARGE_PLACEHOLDER =
  "Paste discharge instructions here... e.g. 'Patient discharged after appendectomy. Keep incision dry. Watch for fever above 101°F. Take ibuprofen 400mg every 6 hours. Follow up in 5 days.'";

export default function AppPage() {
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CarePlanResult | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instructions }),
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

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* Header - same as landing */}
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-neutral-200 px-6 py-4">
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
          <Link href="/#support" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Support
          </Link>
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

      <section className="mx-auto max-w-4xl px-6 py-10">
        {/* Input area */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
          <textarea
            value={instructions}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
            placeholder={DISCHARGE_PLACEHOLDER}
            rows={10}
            className="w-full resize-none rounded-xl border border-neutral-200 bg-white p-4 text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
              Demo mode — connect NVIDIA Nemotron API to analyze real notes
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !instructions.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-md transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Analyze instructions"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</p>
        )}

        {/* Red URGENT card when emergency/high */}
        {result && isUrgent && (
          <div
            id="care-plans"
            className="mt-8 overflow-hidden rounded-2xl bg-red-600 text-white shadow-lg"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="mb-2 flex items-center gap-2 font-bold">
                    <span className="text-2xl">▲</span> URGENT
                  </p>
                  <p className="text-lg font-semibold">Requires immediate medical attention</p>
                </div>
                <a
                  href="tel:911"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Call 911
                </a>
              </div>
              <div className="border-t border-red-500/50 p-6 md:border-t-0 md:border-l md:p-8">
                <p className="font-semibold">{urgentAdvice}</p>
                <ul className="mt-4 space-y-2 text-sm text-red-100">
                  {urgentRationale.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Rest of care plan results */}
        {result && (
          <section className="mt-10 space-y-6">
            <Card title="Plain Summary">
              <p className="text-neutral-700">{result.plain_summary}</p>
            </Card>

            {!isUrgent && (
              <Card title="Next Step">
                <p className="text-neutral-700">{result.next_step}</p>
                <p className="mt-3">
                  <span className="font-semibold">Urgency:</span>{" "}
                  <span className="rounded-full bg-neutral-200 px-3 py-1 text-sm capitalize">
                    {result.urgency}
                  </span>
                </p>
              </Card>
            )}

            <Card title="Today's Checklist">
              <List items={result.today_checklist} />
            </Card>

            {!isUrgent && (
              <Card title="Warning Signs">
                <List items={result.warning_signs} />
              </Card>
            )}

            <Card title="Questions for Doctor">
              <List items={result.questions_for_doctor} />
            </Card>

            <Card id="resources" title="Suggested Resources">
              <div className="space-y-3">
                {result.suggested_resources?.length > 0 ? (
                  result.suggested_resources.map((resource: Resource, index: number) => (
                    <div
                      key={index}
                      className="rounded-xl border border-neutral-200 p-4"
                    >
                      <p className="font-semibold">{resource.name}</p>
                      <p className="text-sm text-neutral-600">{resource.type}</p>
                      <p className="text-sm text-neutral-700">{resource.address}</p>
                      <p className="text-sm text-neutral-700">{resource.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-600">No resources found.</p>
                )}
              </div>
            </Card>
          </section>
        )}
      </section>
    </main>
  );
}

function Card({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-neutral-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
