"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import Sidebar, { MobileMenuButton } from "@/app/components/sidebar";
import { Button } from "@/app/components/ui/button";
import { Sparkles, PencilRuler } from "lucide-react";

export default function ExercisesPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <Sidebar
          user={undefined}
          onSignOut={undefined}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      <div className="lg:hidden">
        <Sidebar
          user={undefined}
          onSignOut={undefined}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      <div className="min-h-screen bg-slate-950">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          <header className="mb-4 flex items-center justify-between gap-4">
            <div className="flex-1 space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">Exercitii</p>
              <h1 className="text-4xl font-bold text-white">Practice & Exercises</h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Vom adauga in curand exercitii pentru admitere, antrenament SAT si task-uri personalizate pe profilul tau.
              </p>
            </div>
            <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
          </header>

          <Card className="space-y-5 border-emerald-300/20 bg-emerald-900/10 p-8">
            <div className="flex items-center gap-3 text-emerald-200">
              <PencilRuler className="h-6 w-6" />
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">Coming Soon</p>
            </div>

            <h2 className="text-3xl font-semibold text-white">Modulul de exercitii este in dezvoltare</h2>

            <p className="max-w-3xl text-slate-200">
              Construim o biblioteca de exercitii interactive, simulari si feedback automat ca sa te pregatesti eficient.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button className="bg-emerald-400 text-slate-950 hover:bg-emerald-300">Inapoi in dashboard</Button>
              </Link>
              <Link href="/activities">
                <Button variant="ghost" className="text-emerald-100 hover:bg-emerald-950/30 hover:text-emerald-50">
                  Vezi activitati
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-100/80">
              <Sparkles className="h-4 w-4" />
              <p>Disponibil in urmatorul update major.</p>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}
