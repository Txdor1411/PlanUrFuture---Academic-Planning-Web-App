"use client";

import { useState } from "react";
import Link from "next/link";
import { universities } from "@/lib/universities-data";
import { UniversitySearch } from "./university-search";
import Sidebar from "@/app/components/sidebar";
import { MobileMenuButton } from "@/app/components/sidebar";

export default function UniversitiesPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <>
      {/* Sidebar - only on large screens */}
      <div className="hidden lg:block">
        <Sidebar user={undefined} onSignOut={undefined} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>
      {/* Mobile drawer overlay */}
      <div className="lg:hidden">
        <Sidebar user={undefined} onSignOut={undefined} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>
      <div className="min-h-screen bg-slate-950">
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
              Datele provin din ghidul incarcat in proiect si includ universitati din USA, UK si Europa.
            </p>
          </div>
          <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
        </header>

        <UniversitySearch universities={universities} />
      </main>
    </div>
    </>
  );
}
