## AfterCare AI

**AfterCare AI** is an NVIDIA Nemotron-powered caregiver support platform that helps families understand hospital discharge instructions, create a short-term recovery plan, identify warning signs, and take the right next step with more confidence.

## Problem

The first few days after a patient returns home from the hospital can be confusing and stressful. Discharge instructions are often dense, medical, and hard to follow, especially for family caregivers without clinical training.

Caregivers are left trying to answer questions like:

- What matters most today?
- What symptoms are normal, and what are warning signs?
- What should I ask the doctor?
- What should I do next if something gets worse?

## Solution

AfterCare AI turns discharge instructions into clear, caregiver-friendly guidance.

A user can paste discharge notes into the website, and the system will generate:

- a plain-language summary
- a short checklist for immediate care
- warning signs to monitor
- suggested follow-up questions for the doctor
- an urgency level
- recommended next-step resources

## Why It Matters

AfterCare AI is designed to support caregivers during one of the most vulnerable moments in recovery: the first 72 hours after discharge.

By reducing confusion and surfacing the most important care actions, the platform helps families feel more prepared, informed, and supported.

## Key Features

- **Plain-language discharge summaries**  
  Simplifies medical instructions into understandable language.

- **72-hour care planning**  
  Highlights the most important care tasks for the immediate recovery period.

- **Warning sign detection**  
  Surfaces symptoms and red flags that may require medical attention.

- **Doctor question generation**  
  Suggests helpful follow-up questions a caregiver can ask.

- **Urgency-based next steps**  
  Classifies the situation and recommends what to do next.

- **Resource guidance**  
  Suggests relevant support options such as urgent care, pharmacy, or hospital follow-up.

## Agentic Workflow

AfterCare AI is structured as an agent-style system rather than a simple chatbot.

### 1. Parser Agent
Extracts important information from discharge instructions:
- medications
- tasks
- restrictions
- follow-up care
- warning signs

### 2. Planner Agent
Builds a short-term caregiver plan:
- what to do today
- what to watch for
- what to prepare next

### 3. Risk Agent
Assesses urgency based on the instructions and symptoms described.

### 4. Resource Agent
Maps urgency to the most relevant next-step support resources.

## Tech Stack

- **Frontend:** Next.js
- **Language:** TypeScript
- **AI Model:** NVIDIA Nemotron
- **Deployment:** Vercel
- **Database / backend utilities:** Supabase (optional / extendable)

## Project Structure

```text
.
├── app/
│   ├── api/
│   │   └── generate-plan/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── data/
│   └── resources.ts
├── lib/
│   └── supabase.ts
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── vercel.json
