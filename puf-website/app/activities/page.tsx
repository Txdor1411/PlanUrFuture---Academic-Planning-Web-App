import { activities } from "@/lib/activities-data";
import ActivitiesSearch from "./activities-search";
import Sidebar from "@/app/components/sidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function ActivitiesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name, target_programs")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const sidebarUser = user
    ? { email: user.email ?? undefined, full_name: profile?.full_name ?? undefined }
    : undefined;

  return (
    <>
      <Sidebar user={sidebarUser} onSignOut={undefined} />
      <div className="min-h-screen bg-slate-950 lg:pl-64">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          <header className="space-y-4 mb-4">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">Oportunități pentru CV</p>
            <h1 className="text-4xl font-bold text-white">Activități & Oportunități 🎯</h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Descoperă conferințe, proiecte, voluntariat și tabere de vară. Salvează-le sau adaugă-le în calendar.
            </p>
          </header>
          <ActivitiesSearch
            activities={activities}
            userPrograms={profile?.target_programs ?? []}
          />
        </main>
      </div>
    </>
  );
}
