import { redirect } from "next/navigation";
import { saveOnboarding } from "@/app/onboarding/actions";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const STUDY_HUB_COUNTRIES = [
  "Olanda",
  "Germania",
  "Marea Britanie",
  "SUA",
  "Canada",
  "Franța",
  "Elveția",
  "Suedia",
  "Danemarca",
  "Italia",
  "Spania",
  "Singapore",
  "Australia",
];

const TARGET_PROGRAM_OPTIONS = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Business Administration",
  "Economics",
  "Finance",
  "Marketing",
  "Medicine",
  "Dentistry",
  "Psychology",
  "Law",
  "Architecture",
  "Mechanical Engineering",
  "Electrical Engineering",
  "International Relations",
  "Design",
];

interface OnboardingPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const query = searchParams ? await searchParams : undefined;
  const errorState = typeof query?.error === "string" ? query.error : undefined;
  const errorCode = typeof query?.code === "string" ? query.code : undefined;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("onboarding_completed, full_name, bio, role, preferred_countries, target_programs")
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

  if (profile?.onboarding_completed) {
    redirect("/dashboard");
  }

  const selectedCountries = new Set(profile?.preferred_countries ?? []);
  const selectedPrograms = new Set(profile?.target_programs ?? []);
  const customPrograms = (profile?.target_programs ?? []).filter(
    (program: string) => !TARGET_PROGRAM_OPTIONS.includes(program)
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16 sm:px-8 lg:px-10">
      <Card className="w-full space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300/80">Onboarding</p>
          <h1 className="text-3xl font-semibold text-white">Hai să îți configurăm profilul</h1>
          <p className="text-slate-300">
            Răspunsurile tale sunt baza pentru recomandări de universități, activități și AI planner.
          </p>
          {errorState === "schema_missing" ? (
            <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              Nu poți salva onboarding-ul încă: rulează mai întâi scriptul din supabase/schema.sql.
            </p>
          ) : null}
          {errorState === "save_failed" ? (
            <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              Salvarea a eșuat. Reîncearcă, iar dacă persistă, verifică log-urile Supabase.
              {errorCode ? ` Cod: ${errorCode}` : ""}
            </p>
          ) : null}
        </div>

        <form action={saveOnboarding} className="grid grid-cols-1 gap-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Nume complet</span>
            <input
              name="fullName"
              defaultValue={profile?.full_name ?? ""}
              required
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
              placeholder="Ex: Andreea Ionescu"
            />
          </label>

          <label className="space-y-2">
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

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-200">Țări preferate pentru studiu</legend>
            <p className="text-xs text-slate-400">Alege una sau mai multe destinații populare pentru studii.</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {STUDY_HUB_COUNTRIES.map((country) => (
                <label
                  key={country}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-400/50"
                >
                  <input
                    type="checkbox"
                    name="preferredCountries"
                    value={country}
                    defaultChecked={selectedCountries.has(country)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-sky-400 focus:ring-sky-400"
                  />
                  <span>{country}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-200">Facultăți/programe țintă</legend>
            <p className="text-xs text-slate-400">Selectează domeniile principale care te interesează pentru demo.</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {TARGET_PROGRAM_OPTIONS.map((program) => (
                <label
                  key={program}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400/50"
                >
                  <input
                    type="checkbox"
                    name="targetPrograms"
                    value={program}
                    defaultChecked={selectedPrograms.has(program)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-fuchsia-400 focus:ring-fuchsia-400"
                  />
                  <span>{program}</span>
                </label>
              ))}
            </div>
            <label className="block space-y-2">
              <span className="text-xs font-medium text-slate-300">Alte programe (opțional, separate prin virgulă)</span>
              <input
                name="targetProgramsCustom"
                defaultValue={customPrograms.join(", ")}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400"
                placeholder="Ex: Neuroscience, Biotech"
              />
            </label>
          </fieldset>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Bio scurt</span>
            <textarea
              name="bio"
              defaultValue={profile?.bio ?? ""}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
              placeholder="Spune-ne ce obiective ai pentru următoarele 12 luni."
            />
          </label>

          <Button type="submit" size="lg" className="w-full sm:w-fit">
            Salvează onboarding-ul
          </Button>
        </form>
      </Card>
    </main>
  );
}
