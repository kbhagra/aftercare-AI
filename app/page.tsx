"use client";

import { useState } from "react";

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
};

export default function HomePage() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate care plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 inline-block rounded-full bg-neutral-200 px-3 py-1 text-sm font-medium">
            NVIDIA Nemotron-Powered
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            AfterCare AI
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            A caregiver support website that helps families understand discharge
            instructions, build a 72-hour care plan, detect warning signs, and
            take the right next step.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Paste Discharge Instructions</h2>

            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Example: My father just came home after surgery. He needs to take antibiotics twice a day, walk every few hours, drink water, avoid lifting, and follow up in 3 days..."
              rows={12}
              className="w-full rounded-xl border border-neutral-300 p-4 outline-none focus:border-black"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !instructions.trim()}
              className="mt-4 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Care Plan"}
            </button>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">How It Works</h2>

            <div className="space-y-4 text-neutral-700">
              <div>
                <p className="font-semibold">1. Parser Agent</p>
                <p>Extracts care tasks, warnings, and follow-up instructions.</p>
              </div>
              <div>
                <p className="font-semibold">2. Planner Agent</p>
                <p>Builds a simple 72-hour care plan for the caregiver.</p>
              </div>
              <div>
                <p className="font-semibold">3. Risk Agent</p>
                <p>Checks symptoms and signs to estimate urgency level.</p>
              </div>
              <div>
                <p className="font-semibold">4. Resource Agent</p>
                <p>Suggests the most relevant next-step resources.</p>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <Card title="Plain Summary">
              <p className="text-neutral-700">{result.plain_summary}</p>
            </Card>

            <Card title="Next Step">
              <p className="text-neutral-700">{result.next_step}</p>
              <p className="mt-3">
                <span className="font-semibold">Urgency:</span>{" "}
                <span className="rounded-full bg-neutral-200 px-3 py-1 text-sm">
                  {result.urgency}
                </span>
              </p>
            </Card>

            <Card title="Today's Checklist">
              <List items={result.today_checklist} />
            </Card>

            <Card title="Warning Signs">
              <List items={result.warning_signs} />
            </Card>

            <Card title="Questions for Doctor">
              <List items={result.questions_for_doctor} />
            </Card>

            <Card title="Suggested Resources">
              <div className="space-y-3">
                {result.suggested_resources?.length > 0 ? (
                  result.suggested_resources.map((resource, index) => (
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
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