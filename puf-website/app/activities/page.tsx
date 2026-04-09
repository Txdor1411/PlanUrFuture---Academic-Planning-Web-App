"use client";

import { useState } from "react";
import { activities } from "@/lib/activities-data";
import ActivitiesSearch from "./activities-search";
import Sidebar from "@/app/components/sidebar";
import { MobileMenuButton } from "@/app/components/sidebar";

export default function ActivitiesPage() {
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
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">Oportunități pentru CV</p>
          <h1 className="text-4xl font-bold text-white">Activități & Oportunități 🎯</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Descoperă o lume de conferințe, proiecte, programe de voluntariat și tabere de vară.
          </p>
        </div>
        <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
      </header>

      {/* Search & Filter Component */}
      <ActivitiesSearch activities={activities} />
    </main>
    </div>
    </>
  );
}
