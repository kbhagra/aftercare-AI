# Security

## Secrets

- **Never commit** `.env.local` or any file containing API keys, tokens, or passwords.
- Use **`.env.example`** as a template only (placeholders, no real values).
- **NVIDIA `NVIDIA_API_KEY`**: server-side only (`app/api/generate-plan/route.ts`). Set in `.env.local` locally and in **Vercel → Project → Environment Variables** for production (mark as sensitive / not exposed to browser).
- **Supabase**: use the **anon** key in `NEXT_PUBLIC_SUPABASE_ANON_KEY` only. Never put the **service_role** key in frontend env vars or in the repo.

## If a key was ever committed or shared

1. **Rotate** the leaked key in the NVIDIA and/or Supabase dashboards.
2. Remove the file from Git history if needed:  
   `git filter-repo` or BFG Repo-Cleaner (see GitHub docs on removing sensitive data).
3. Update `.env.local` and hosting env vars with the new keys.

## Repo checks

```bash
# Ensure .env.local is ignored
git check-ignore -v .env.local

# Ensure no env file is tracked (should print nothing)
git ls-files | grep -E '\.env' || true
```
