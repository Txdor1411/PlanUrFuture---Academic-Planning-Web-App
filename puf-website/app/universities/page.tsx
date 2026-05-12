"use client";

import { useState } from "react";
import Link from "next/link";
import { UniversitySearch } from "./university-search";
import Sidebar, { MobileMenuButton } from "@/app/components/sidebar";
import { useSupabaseUser } from "@/lib/use-supabase-user";

export default function UniversitiesPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = useSupabaseUser();
  return (
    <>
      <Sidebar
        user={user}
        onSignOut={undefined}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="min-h-screen bg-slate-950 lg:pl-64">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

        <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-300/40 hover:text-white"
          >
            Inapoi la pagina principala
          </Link>

          <header className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Explorer de universitati
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Cauta facultati si compara rapid criteriile de admitere, costurile si bursele.
              </h1>
              <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
                Date din colegii și universități din SUA și Europa.
              </p>
            </div>
            <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
          </header>

          <UniversitySearch />
        </main>
      </div>
    </>
  );
}
