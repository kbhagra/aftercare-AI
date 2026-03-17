import { NextRequest, NextResponse } from "next/server";
import { getSuggestedResources } from "@/data/resources";

type NemotronResponse = {
  plain_summary: string;
  today_checklist: string[];
  warning_signs: string[];
  questions_for_doctor: string[];
  next_step: string;
  urgency: string;
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

Rules:
- Do not diagnose
- Do not replace a doctor
- Do not invent medication dosages
- If severe signs appear like chest pain, severe bleeding, trouble breathing, or loss of consciousness, urgency should be "emergency"
- Return valid JSON only

Return this exact schema:
{
  "plain_summary": "string",
  "today_checklist": ["string", "string"],
  "warning_signs": ["string", "string"],
  "questions_for_doctor": ["string", "string"],
  "next_step": "string",
  "urgency": "low | medium | high | emergency"
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

    return NextResponse.json({
      ...parsed,
      suggested_resources: suggestedResources,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate care plan." },
      { status: 500 }
    );
  }
}