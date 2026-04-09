import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  CalendarClock, 
  Compass, 
  GraduationCap, 
  Sparkles, 
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/sidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function signOut() {
  "use server";
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, onboarding_completed, preferred_countries, target_programs")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError?.code === "42P01" || profileError?.code === "PGRST205") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16 sm:px-8 lg:px-10">
        <Card className="w-full space-y-4 border-amber-400/30">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300/80">Setup necesar</p>
          <h1 className="text-2xl font-semibold text-white">Lipsește schema din Supabase</h1>
          <p className="text-slate-300">
            Rulează scriptul SQL din <span className="font-semibold text-slate-100">supabase/schema.sql</span> în SQL Editor, apoi reîncarcă pagina.
          </p>
        </Card>
      </main>
    );
  }

  if (!profile?.onboarding_completed) {
    redirect("/onboarding");
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar user={user} onSignOut={undefined} />
      {/* Main Content */}
      <div className="min-h-screen bg-slate-950">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      {/* Welcome Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Bun venit înapoi</p>
          <h1 className="text-4xl font-bold text-white">
            Salut, {profile.full_name || user.email || "utilizator"}! 👋
          </h1>
        </div>
        <form action={signOut}>
          <Button variant="ghost" className="hover:bg-slate-700">
            Sign out
          </Button>
        </form>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="space-y-2 border-sky-300/20 bg-sky-900/20 p-4">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-sky-300" />
            <p className="text-xs font-semibold text-sky-300">Universități</p>
          </div>
          <p className="text-2xl font-bold text-white">9</p>
          <p className="text-xs text-slate-300">Explorate</p>
        </Card>

        <Card className="space-y-2 border-emerald-300/20 bg-emerald-900/20 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-300" />
            <p className="text-xs font-semibold text-emerald-300">Profil</p>
          </div>
          <p className="text-2xl font-bold text-white">85%</p>
          <p className="text-xs text-slate-300">Completat</p>
        </Card>

        <Card className="space-y-2 border-amber-300/20 bg-amber-900/20 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-300" />
            <p className="text-xs font-semibold text-amber-300">Termene</p>
          </div>
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-xs text-slate-300">Următoarele 30 zile</p>
        </Card>

        <Card className="space-y-2 border-fuchsia-300/20 bg-fuchsia-900/20 p-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-fuchsia-300" />
            <p className="text-xs font-semibold text-fuchsia-300">Activități</p>
          </div>
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-xs text-slate-300">Salvate</p>
        </Card>
      </section>

      {/* Quick Action Buttons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Comenzi rapide</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Universitati */}
          <Link href="/universities">
            <Card className="group cursor-pointer space-y-3 border-fuchsia-300/20 bg-fuchsia-900/10 p-4 transition-all hover:border-fuchsia-300/50 hover:bg-fuchsia-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-fuchsia-900/50 p-2">
                    <Compass className="h-5 w-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-semibold text-white">Exploreaza Universitati</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-fuchsia-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Cauta si compara institutiile tale preferate</p>
            </Card>
          </Link>

          {/* Activitati */}
          <Link href="/activities">
            <Card className="group cursor-pointer space-y-3 border-cyan-300/20 bg-cyan-900/10 p-4 transition-all hover:border-cyan-300/50 hover:bg-cyan-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-900/50 p-2">
                    <GraduationCap className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="font-semibold text-white">Activitati</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Conferinte, proiecte, voluntariat, summer camps</p>
            </Card>
          </Link>

          {/* Exercitii */}
          <Link href="/exercises">
            <Card className="group cursor-pointer space-y-3 border-emerald-300/20 bg-emerald-900/10 p-4 transition-all hover:border-emerald-300/50 hover:bg-emerald-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-900/50 p-2">
                    <BookOpen className="h-5 w-5 text-emerald-300" />
                  </div>
                  <h3 className="font-semibold text-white">Exercitii & Practice</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Practica teste de admitere si subiecte</p>
            </Card>
          </Link>

          {/* Mentorat */}
          <Link href="/mentoring">
            <Card className="group cursor-pointer space-y-3 border-amber-300/20 bg-amber-900/10 p-4 transition-all hover:border-amber-300/50 hover:bg-amber-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-900/50 p-2">
                    <Users className="h-5 w-5 text-amber-300" />
                  </div>
                  <h3 className="font-semibold text-white">Mentorat</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Gaseste mentor sau ofera pregatiri</p>
            </Card>
          </Link>

          {/* Calendar */}
          <Link href="/calendar">
            <Card className="group cursor-pointer space-y-3 border-purple-300/20 bg-purple-900/10 p-4 transition-all hover:border-purple-300/50 hover:bg-purple-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-900/50 p-2">
                    <CalendarClock className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="font-semibold text-white">Calendar Interactiv</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-purple-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Termene, sesiuni si reminder-e</p>
            </Card>
          </Link>

          {/* AI Planner */}
          <Link href="/planner">
            <Card className="group cursor-pointer space-y-3 border-rose-300/20 bg-rose-900/10 p-4 transition-all hover:border-rose-300/50 hover:bg-rose-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-rose-900/50 p-2">
                    <Sparkles className="h-5 w-5 text-rose-300" />
                  </div>
                  <h3 className="font-semibold text-white">AI Planner</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-rose-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-slate-300">Plan saptamanal inteligent si personalizat</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Termene importante 📅</h2>
        <Card className="border-amber-300/20 bg-amber-900/5 p-6">
          <div className="space-y-4">
            {[
              { date: "15 Mar 2026", title: "Stanford - Application Deadline", uni: "Stanford University", status: "upcoming" },
              { date: "01 Apr 2026", title: "MIT - Early Decision Results", uni: "Massachusetts Institute of Technology", status: "upcoming" },
              { date: "20 Apr 2026", title: "Harvard - Regular Admission Deadline", uni: "Harvard University", status: "upcoming" },
            ].map((deadline, idx) => (
              <div key={idx} className="flex items-start gap-4 border-b border-amber-300/10 pb-4 last:border-0">
                <div className="mt-1 rounded-lg bg-amber-900/30 p-2">
                  <CalendarClock className="h-4 w-4 text-amber-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-300">{deadline.date}</p>
                  <p className="font-medium text-white">{deadline.title}</p>
                  <p className="text-xs text-slate-400">{deadline.uni}</p>
                </div>
                <span className="rounded-full bg-amber-900/40 px-3 py-1 text-xs font-semibold text-amber-200">
                  {deadline.status === "upcoming" ? "⏱️ Viitor" : "✅ Completat"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Recent Universities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Universitati recente 🎓</h2>
          <Link href="/universities" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
            Vezi toate →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Stanford University", country: "USA", type: "Private" },
            { name: "Harvard University", country: "USA", type: "Private" },
            { name: "MIT", country: "USA", type: "Private" },
          ].map((uni, idx) => (
            <Link key={idx} href={`/universities/${uni.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <Card className="group cursor-pointer space-y-3 border-sky-300/20 transition-all hover:border-sky-300/50">
                <div className="space-y-2">
                  <h3 className="font-semibold text-white group-hover:text-sky-300">{uni.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-2 py-1">{uni.country}</span>
                    <span className="rounded-full bg-slate-800 px-2 py-1">{uni.type}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Your Activities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Activitati salvate 🎯</h2>
          <Link href="/activities" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            Exploreaza mai multe →
          </Link>
        </div>
        <Card className="border-cyan-300/20 bg-cyan-900/5 p-6">
          <div className="space-y-3">
            {[
              { title: "Global Leaders Summit 2026", category: "Conference", location: "Vienna, Austria" },
              { title: "International Science Fair", category: "Competition", location: "Geneva, Switzerland" },
              { title: "Tech Internship Program", category: "Internship", location: "Remote" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start justify-between rounded-lg border border-cyan-300/10 bg-cyan-900/10 p-3">
                <div className="flex-1">
                  <p className="font-medium text-white">{activity.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded bg-cyan-900/40 px-2 py-1 text-cyan-200">{activity.category}</span>
                    <span>{activity.location}</span>
                  </div>
                </div>
                <button className="rounded-lg bg-cyan-900/40 p-2 hover:bg-cyan-900/60">
                  <ArrowRight className="h-4 w-4 text-cyan-300" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </section>
      </main>
      </div>
    </>
  );
}
