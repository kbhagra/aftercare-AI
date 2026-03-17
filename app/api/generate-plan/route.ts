import { NextRequest, NextResponse } from "next/server";
import { getSuggestedResources } from "@/app/data/resources";

type NemotronResponse = {
  plain_summary: string;
  today_checklist: string[];
  warning_signs: string[];
  questions_for_doctor: string[];
  next_step: string;
  urgency: string;
  /** When urgency is emergency or high: one sentence of immediate action advice. */
  urgent_advice?: string;
  /** When urgency is emergency or high: short bullets explaining why (e.g. from discharge notes). */
  urgent_rationale?: string[];
  /** A lightweight 72-hour timeline grouped by day. */
  care_plan_72h?: {
    day1?: string[];
    day2?: string[];
    day3?: string[];
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const instructions = body.instructions?.trim();

    if (!instructions) {
      return NextResponse.json(
        { error: "No discharge instructions provided." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are AfterCare AI, a caregiver support agent for the first 72 hours after hospital discharge.

Your job:
- Simplify discharge instructions into plain English
- Create a short care checklist
- Identify warning signs
- Suggest questions for the doctor
- Recommend the next step
- Estimate urgency level
- When urgency is "emergency" or "high", also provide urgent_advice (one clear sentence: what to do right now) and urgent_rationale (2-4 short bullets citing what in the discharge instructions triggered this, e.g. "Discharge instructions mention risk of wound reopening")
- Create a short 72-hour timeline grouped by day (day1/day2/day3). Each day should have 3-6 short tasks.

Rules:
- Do not diagnose
- Do not replace a doctor
- Do not invent medication dosages
- If severe signs appear like chest pain, severe bleeding, trouble breathing, or loss of consciousness, urgency should be "emergency"
- Return valid JSON only

Return this exact schema (include urgent_advice and urgent_rationale only when urgency is "emergency" or "high"):
{
  "plain_summary": "string",
  "today_checklist": ["string", "string"],
  "warning_signs": ["string", "string"],
  "questions_for_doctor": ["string", "string"],
  "next_step": "string",
  "urgency": "low | medium | high | emergency",
  "urgent_advice": "optional: one sentence immediate action when emergency/high",
  "urgent_rationale": ["optional: short bullet citing discharge notes", "optional: ..."],
  "care_plan_72h": {
    "day1": ["string", "string"],
    "day2": ["string", "string"],
    "day3": ["string", "string"]
  }
}
`;

    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:
            process.env.NVIDIA_MODEL || "nvidia/nvidia-nemotron-nano-9b-v2",
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: instructions },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "NVIDIA API request failed." },
        { status: 500 }
      );
    }

    const rawContent = data.choices?.[0]?.message?.content || "{}";

    let parsed: NemotronResponse;

    try {
      parsed = JSON.parse(rawContent);
    } catch {
      return NextResponse.json(
        {
          error: "Model returned invalid JSON.",
          raw: rawContent,
        },
        { status: 500 }
      );
    }

    const suggestedResources = getSuggestedResources(parsed.urgency);

    const isUrgent = ["emergency", "high"].includes(
      (parsed.urgency || "").toLowerCase().trim()
    );
    const urgent_advice =
      parsed.urgent_advice ?? (isUrgent ? parsed.next_step : undefined);
    const urgent_rationale =
      parsed.urgent_rationale && parsed.urgent_rationale.length > 0
        ? parsed.urgent_rationale
        : isUrgent
          ? parsed.warning_signs ?? []
          : undefined;

    return NextResponse.json({
      ...parsed,
      suggested_resources: suggestedResources,
      ...(urgent_advice != null && { urgent_advice }),
      ...(urgent_rationale != null && { urgent_rationale }),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate care plan." },
      { status: 500 }
    );
  }
}