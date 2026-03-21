"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

function GlassLogo() {
  return (
    <div className="aftercare-glass-icon" aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" className="relative z-[1] h-5 w-5">
        <path
          d="M10 2.5C10 2.5 4 6.5 4 11C4 13.8 6.7 16 10 16C13.3 16 16 13.8 16 11C16 6.5 10 2.5 10 2.5Z"
          fill="url(#navG1)"
          stroke="rgba(8,102,255,0.3)"
          strokeWidth="0.8"
        />
        <path d="M8 10.5h1.5v1.5h1.5v-1.5H12.5v-1.5H11v-1.5H9.5v1.5H8z" fill="white" />
        <defs>
          <linearGradient id="navG1" x1="4" y1="2" x2="16" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#0550cc" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const profileHref = user ? "/profile" : "/login?next=/profile";

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] h-[var(--aftercare-nav-h)] border-b border-[var(--aftercare-border)] bg-white/90 backdrop-blur-[20px]">
      <div className="mx-auto flex h-full max-w-[1080px] items-center gap-6 px-7">
        <Link href="/" className="mr-6 flex shrink-0 items-center gap-2.5 no-underline">
          <GlassLogo />
          <span className="text-[17px] font-bold text-[var(--aftercare-text)]">AfterCare AI</span>
        </Link>

        <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-0 sm:justify-start">
          <Link
            href="/#how-it-works"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]"
          >
            How it works
          </Link>
          <Link
            href="/care-plans"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]"
          >
            Care Plans
          </Link>
          <Link
            href="/explore#resources"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)]"
          >
            Resources
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/explore"
            className="rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)] sm:px-3.5"
          >
            Explore
          </Link>
          <Link
            href="/support"
            className="rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)] sm:px-3.5"
          >
            Support
          </Link>
          {user ? (
            <Link
              href="/profile"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[var(--aftercare-blue)] hover:bg-[#eff6ff] sm:inline"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--aftercare-text-muted)] hover:bg-black/5 hover:text-[var(--aftercare-text)] sm:px-3.5"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[var(--aftercare-blue)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--aftercare-blue-dark)]"
              >
                Sign up
              </Link>
            </>
          )}
          <Link
            href={profileHref}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[var(--aftercare-text)] hover:bg-black/10"
            aria-label={user ? "Your profile" : "Sign in"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
