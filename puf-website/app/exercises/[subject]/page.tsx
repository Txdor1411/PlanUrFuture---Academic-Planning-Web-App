import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getExercisesBySubject, getSubjectMeta, SUBJECTS, type Subject } from "@/lib/exercises-data";
import Sidebar from "@/app/components/sidebar";
import { Card } from "@/app/components/ui/card";
import ExerciseSession from "./exercise-session";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ subject: string }> };

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.subject }));
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;

  if (!SUBJECTS.find((s) => s.subject === subject)) notFound();

  const exercises = getExercisesBySubject(subject as Subject);
  const meta = getSubjectMeta(subject as Subject);

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
    : { data: null };
  const sidebarUser = user
    ? { email: user.email ?? undefined, full_name: profile?.full_name ?? undefined }
    : undefined;

  return (
    <>
      <Sidebar user={sidebarUser} onSignOut={undefined} />
      <div className="min-h-screen bg-slate-950 lg:pl-64">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10 sm:px-8 lg:px-10">
          {/* Back */}
          <Link
            href="/exercises"
            className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-300/40 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la module
          </Link>

          {/* Header */}
          <header className="space-y-2">
            <p className={`text-sm uppercase tracking-[0.2em] ${meta.color}`}>
              {meta.emoji} Modul
            </p>
            <h1 className="text-3xl font-bold text-white">{meta.label}</h1>
            <p className="text-slate-300">{meta.description}</p>
          </header>

          {/* Info bar */}
          <Card className={`${meta.border} ${meta.bg} flex items-center gap-4 p-4`}>
            <div className="text-4xl">{meta.emoji}</div>
            <div>
              <p className={`font-semibold ${meta.color}`}>{exercises.length} exerciții</p>
              <p className="text-xs text-slate-400">
                {exercises.filter((e) => e.bacSource).length} cu referință la Bac ·{" "}
                {exercises.filter((e) => e.difficulty === "hard").length} exerciții grele
              </p>
            </div>
          </Card>

          {/* Session */}
          <ExerciseSession exercises={exercises} meta={meta} />
        </main>
      </div>
    </>
  );
}
