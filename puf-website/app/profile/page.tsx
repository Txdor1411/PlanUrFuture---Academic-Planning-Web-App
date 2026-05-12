import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { saveProfile, signOut } from "./actions";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/sidebar";
import { LogOut, User, CheckCircle } from "lucide-react";

const STUDY_COUNTRIES = [
  "Olanda", "Germania", "Marea Britanie", "SUA", "Canada",
  "Franța", "Elveția", "Suedia", "Danemarca", "Italia",
  "Spania", "Singapore", "Australia",
];

const PROGRAM_OPTIONS = [
  "Computer Science", "Software Engineering", "Data Science",
  "Artificial Intelligence", "Cybersecurity", "Business Administration",
  "Economics", "Finance", "Marketing", "Medicine", "Dentistry",
  "Psychology", "Law", "Architecture", "Mechanical Engineering",
  "Electrical Engineering", "International Relations", "Design",
];

const CLASS_YEARS = [
  "a 9-a", "a 10-a", "a 11-a", "a 12-a",
  "Absolvent liceu", "Student an 1", "Student an 2+",
];

interface ProfilePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, bio, role, preferred_countries, target_programs, sat_score, class_year, goals"
    )
    .eq("id", user.id)
    .maybeSingle();

  const query = searchParams ? await searchParams : {};
  const saved = query?.saved === "1";
  const errorState = typeof query?.error === "string" ? query.error : undefined;

  const selectedCountries = new Set<string>(profile?.preferred_countries ?? []);
  const selectedPrograms = new Set<string>(profile?.target_programs ?? []);
  const customPrograms = (profile?.target_programs ?? []).filter(
    (p: string) => !PROGRAM_OPTIONS.includes(p)
  );

  const sidebarUser = {
    email: user.email ?? undefined,
    full_name: profile?.full_name ?? undefined,
  };

  return (
    <>
      <Sidebar user={sidebarUser} onSignOut={undefined} />
      <div className="min-h-screen bg-slate-950 lg:pl-64">
        <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          {/* Header */}
          <header className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300/80">Cont</p>
              <h1 className="text-4xl font-bold text-white">Profilul tău</h1>
              <p className="text-slate-300">
                Datele tale academice și preferințele de admitere.
              </p>
            </div>
            <form action={signOut}>
              <Button variant="ghost" className="flex items-center gap-2 text-red-300 hover:bg-red-900/20 hover:text-red-200">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </header>

          {/* Notifications */}
          {saved && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Profilul a fost salvat cu succes.
            </div>
          )}
          {errorState && (
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              Salvarea a eșuat. Încearcă din nou.
            </div>
          )}

          {/* User info card */}
          <Card className="flex items-center gap-4 border-fuchsia-300/20 bg-fuchsia-900/10 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-900/50 ring-2 ring-fuchsia-400/30">
              <User className="h-7 w-7 text-fuchsia-300" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                {profile?.full_name || "Utilizator"}
              </p>
              <p className="text-sm text-slate-400">{user.email}</p>
              {profile?.class_year && (
                <p className="mt-1 text-xs text-fuchsia-300">Clasa {profile.class_year}</p>
              )}
            </div>
          </Card>

          {/* Edit form */}
          <form action={saveProfile} className="space-y-6">
            {/* Personal info */}
            <Card className="space-y-5 p-6">
              <h2 className="text-lg font-semibold text-white">Informații personale</h2>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Nume complet</span>
                <input
                  name="fullName"
                  defaultValue={profile?.full_name ?? ""}
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                  placeholder="Ex: Andreea Ionescu"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Rol</span>
                  <select
                    name="role"
                    defaultValue={profile?.role ?? "student"}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-white outline-none transition focus:border-sky-400"
                  >
                    <option value="student">Elev/Student</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Clasă / An studiu</span>
                  <select
                    name="classYear"
                    defaultValue={profile?.class_year ?? ""}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-white outline-none transition focus:border-sky-400"
                  >
                    <option value="">Selectează...</option>
                    {CLASS_YEARS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Scor SAT (opțional)</span>
                <input
                  name="satScore"
                  type="number"
                  min={400}
                  max={1600}
                  defaultValue={profile?.sat_score ?? ""}
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                  placeholder="Ex: 1350"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Obiective academice</span>
                <textarea
                  name="goals"
                  defaultValue={profile?.goals ?? ""}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                  placeholder="Ex: Vreau să mă admit la o universitate din top 50 în Computer Science."
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Bio</span>
                <textarea
                  name="bio"
                  defaultValue={profile?.bio ?? ""}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
                  placeholder="Spune-ne ceva despre tine..."
                />
              </label>
            </Card>

            {/* Countries */}
            <Card className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-white">Țări preferate pentru studiu</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {STUDY_COUNTRIES.map((country) => (
                  <label
                    key={country}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-400/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="preferredCountries"
                      value={country}
                      defaultChecked={selectedCountries.has(country)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-900 text-sky-400 focus:ring-sky-400"
                    />
                    {country}
                  </label>
                ))}
              </div>
            </Card>

            {/* Programs */}
            <Card className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-white">Domenii de interes</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {PROGRAM_OPTIONS.map((program) => (
                  <label
                    key={program}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="targetPrograms"
                      value={program}
                      defaultChecked={selectedPrograms.has(program)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-900 text-fuchsia-400 focus:ring-fuchsia-400"
                    />
                    {program}
                  </label>
                ))}
              </div>
              <label className="block space-y-2">
                <span className="text-xs font-medium text-slate-300">
                  Alte domenii (separate prin virgulă)
                </span>
                <input
                  name="targetProgramsCustom"
                  defaultValue={customPrograms.join(", ")}
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400"
                  placeholder="Ex: Neuroscience, Biotech"
                />
              </label>
            </Card>

            <Button type="submit" size="lg" className="w-full sm:w-fit">
              Salvează profilul
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}
