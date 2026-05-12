import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Card } from "@/app/components/ui/card";
import Sidebar from "@/app/components/sidebar";
import { SUBJECTS, exercises } from "@/lib/exercises-data";
import { BookOpen, Trophy, Target } from "lucide-react";

export default async function ExercisesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
    : { data: null };

  const sidebarUser = user
    ? { email: user.email ?? undefined, full_name: profile?.full_name ?? undefined }
    : undefined;

  const countBySubject = (subject: string) =>
    exercises.filter((e) => e.subject === subject).length;

  return (
    <>
      <Sidebar user={sidebarUser} onSignOut={undefined} />
      <div className="min-h-screen bg-slate-950 lg:pl-64">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          {/* Header */}
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">Pregătire Bac</p>
            <h1 className="text-4xl font-bold text-white">Invată 📚</h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Teorie + exerciții interactive în stil Duolingo. Evaluare automată și urmărire puncte slabe.
            </p>
          </header>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: "Total exerciții", value: exercises.length, color: "text-emerald-300" },
              { icon: Trophy, label: "Module", value: SUBJECTS.length, color: "text-amber-300" },
              { icon: Target, label: "Subiecte Bac", value: exercises.filter(e => e.bacSource).length, color: "text-sky-300" },
            ].map(({ icon: Icon, label, value, color }) => (
              <Card key={label} className="p-4 text-center space-y-1">
                <Icon className={`mx-auto h-5 w-5 ${color}`} />
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </Card>
            ))}
          </div>

          {/* Subject modules */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Alege un modul</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SUBJECTS.map((s) => (
                <Link key={s.subject} href={`/exercises/${s.subject}`}>
                  <Card
                    className={`group cursor-pointer space-y-4 ${s.border} ${s.bg} p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{s.emoji}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${s.border} ${s.color}`}>
                        {countBySubject(s.subject)} ex.
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${s.color}`}>{s.label}</h3>
                      <p className="mt-1 text-sm text-slate-300">{s.description}</p>
                    </div>
                    <div className={`text-sm font-semibold ${s.color}`}>
                      Începe modulul →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Cum funcționează</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: "1", title: "Citești teoria", desc: "Fiecare exercițiu vine cu un rezumat clar al conceptului testat." },
                { step: "2", title: "Răspunzi", desc: "Alegi varianta corectă sau completezi. Feedback imediat — verde sau roșu." },
                { step: "3", title: "Vezi scorul", desc: "La final primești scorul și o listă cu punctele slabe identificate." },
              ].map((item) => (
                <Card key={item.step} className="p-5 space-y-2 border-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
