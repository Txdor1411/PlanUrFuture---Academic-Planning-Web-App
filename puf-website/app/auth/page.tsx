"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Mode = "signin" | "signup";

function getSafeNextPath(nextParam: string | null) {
  if (!nextParam) {
    return "/dashboard";
  }

  if (nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }

  return "/dashboard";
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const envReady = useMemo(() => hasSupabaseEnv(), []);
  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams]
  );

  useEffect(() => {
    const errorMessage = searchParams.get("error");

    if (errorMessage) {
      setMessage(errorMessage);
    }
  }, [searchParams]);

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        router.push(nextPath);
        router.refresh();
        return;
      }

      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", nextPath);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: callbackUrl.toString(),
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Cont creat. Verifica emailul pentru confirmare, apoi intră în platformă.");
      setMode("signin");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", nextPath);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!envReady) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-6 py-16 sm:px-8">
        <Card className="w-full space-y-4 border-amber-400/40">
          <h1 className="text-2xl font-semibold text-white">Lipsește configurarea Supabase</h1>
          <p className="text-slate-300">
            Completează variabilele din fișierul .env.local și apoi repornește serverul.
          </p>
          <pre className="rounded-xl bg-slate-900/80 p-4 text-sm text-slate-200 ring-1 ring-white/10">
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
          </pre>
          <Link href="/" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
            Înapoi la pagina principală
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 sm:px-8 lg:px-10">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Platform access</p>
          <h1 className="text-3xl font-semibold text-white">Intră în contul tău</h1>
          <p className="text-slate-300">
            Login rapid pentru dashboard, onboarding, universități, mentorat și AI planner.
          </p>
          <Button onClick={handleGoogleLogin} className="w-full" size="lg" disabled={loading}>
            Continuă cu Google
          </Button>
          <p className="text-xs text-slate-400">
            Google OAuth trebuie activat în Supabase și configurat în Google Cloud.
          </p>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`h-9 flex-1 rounded-full text-sm font-semibold transition ${
                mode === "signin" ? "bg-white text-slate-900" : "text-slate-300"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`h-9 flex-1 rounded-full text-sm font-semibold transition ${
                mode === "signup" ? "bg-white text-slate-900" : "text-slate-300"
              }`}
            >
              Sign up
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleEmailAuth}>
            {mode === "signup" ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Nume complet</span>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                  placeholder="Ex: Andrei Popescu"
                  required
                />
              </label>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                placeholder="nume@email.com"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Parolă</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                placeholder="Minim 8 caractere"
                required
                minLength={8}
              />
            </label>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {mode === "signin" ? "Intră în platformă" : "Creează cont"}
            </Button>
          </form>

          {message ? <p className="text-sm text-slate-300">{message}</p> : null}

          <p className="text-sm text-slate-400">
            {mode === "signin" ? "Nu ai cont?" : "Ai deja cont?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-sky-300 hover:text-sky-200"
            >
              {mode === "signin" ? "Înregistrează-te" : "Conectează-te"}
            </button>
          </p>
        </Card>
      </div>
    </main>
  );
}
