# aftercare-AI

AfterCare AI is a NVIDIA Nemotron-powered caregiver support agent that helps families understand discharge instructions, create a 72-hour care plan, detect warning signs, and take the right next step.

## Environment variables

1. Copy the template: `cp .env.example .env.local`
2. Fill in **NVIDIA** and **Supabase** values in `.env.local` (this file is **gitignored** — do not commit it).
3. On Vercel, add the same keys under **Project → Settings → Environment Variables** (use **Sensitive** for `NVIDIA_API_KEY`).

See **`SECURITY.md`** for handling leaked keys and what never to put in the repo.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
