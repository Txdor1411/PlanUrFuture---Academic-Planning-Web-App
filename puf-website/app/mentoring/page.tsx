"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import Sidebar, { MobileMenuButton } from "@/app/components/sidebar";
import { Button } from "@/app/components/ui/button";
import { Sparkles, Users } from "lucide-react";

export default function MentoringPage() {
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
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300/80">Mentorat</p>
              <h1 className="text-4xl font-bold text-white">Mentoring Hub</h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Conectam elevii cu mentori verificati pentru aplicatii, eseuri si strategie academica.
              </p>
            </div>
            <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
          </header>

          <Card className="space-y-5 border-amber-300/20 bg-amber-900/10 p-8">
            <div className="flex items-center gap-3 text-amber-200">
              <Users className="h-6 w-6" />
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">Coming Soon</p>
            </div>

            <h2 className="text-3xl font-semibold text-white">Pagina de mentorat este in lucru</h2>

            <p className="max-w-3xl text-slate-200">
              Lansam curand sistemul complet de matching mentor-elev, sesiuni 1-la-1 si pachete de pregatire pentru admitere.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button className="bg-amber-400 text-slate-950 hover:bg-amber-300">Inapoi in dashboard</Button>
              </Link>
              <Link href="/universities">
                <Button variant="ghost" className="text-amber-100 hover:bg-amber-950/30 hover:text-amber-50">
                  Exploreaza universitati
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-amber-100/80">
              <Sparkles className="h-4 w-4" />
              <p>Early access intern: in pregatire.</p>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}
