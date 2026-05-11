import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  formatAcceptanceRate,
  formatCurrency,
  formatLocation,
  type SupabaseUniversity,
} from "@/lib/supabase-universities";
import Sidebar from "@/app/components/sidebar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function UniversityDetailsPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  const uni = data as SupabaseUniversity;
  const location = formatLocation(uni.city, uni.state);

  const stats: { label: string; value: string }[] = [
    uni.world_ranking !== null
      ? { label: "ARWU World Ranking", value: `#${uni.world_ranking}${uni.world_ranking_score ? ` · score ${uni.world_ranking_score}` : ""}` }
      : null,
    uni.acceptance_rate !== null
      ? { label: "Acceptance rate", value: formatAcceptanceRate(uni.acceptance_rate) }
      : null,
    uni.tuition_out_of_state !== null
      ? { label: "Tuition (out-of-state)", value: formatCurrency(uni.tuition_out_of_state) }
      : null,
    uni.tuition_in_state !== null
      ? { label: "Tuition (in-state)", value: formatCurrency(uni.tuition_in_state) }
      : null,
    uni.total_cost !== null
      ? { label: "Cost total", value: formatCurrency(uni.total_cost) }
      : null,
    uni.application_fee !== null
      ? { label: "Application fee", value: `$${uni.application_fee}` }
      : null,
    uni.sat_average !== null
      ? { label: "SAT average", value: uni.sat_average.toString() }
      : null,
    uni.act_midpoint !== null
      ? { label: "ACT midpoint", value: uni.act_midpoint.toString() }
      : null,
    uni.student_size !== null
      ? { label: "Studenti", value: uni.student_size.toLocaleString("en-US") }
      : null,
    uni.completion_rate !== null
      ? { label: "Rata de absolvire", value: `${(uni.completion_rate * 100).toFixed(0)}%` }
      : null,
    uni.median_earnings_10yrs !== null
      ? {
          label: "Salariu median (10 ani)",
          value: formatCurrency(uni.median_earnings_10yrs, ""),
        }
      : null,
    uni.median_debt !== null
      ? { label: "Datorie mediana", value: formatCurrency(uni.median_debt, "") }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const steps = Array.isArray(uni.application_steps) ? uni.application_steps : null;

  return (
    <>
      <Sidebar user={undefined} onSignOut={undefined} />
      <div className="relative overflow-hidden text-slate-100 min-h-screen bg-slate-950 w-full lg:pl-64">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(168,85,247,0.16),_transparent_40%),radial-gradient(circle_at_100%_0%,_rgba(56,189,248,0.16),_transparent_35%)]" />

        <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/universities"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-300 transition hover:border-sky-300/40 hover:text-white"
            >
              Inapoi la lista
            </Link>
            {location && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                {location}
              </span>
            )}
            {uni.ownership && (
              <span className="rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-sky-100">
                {uni.ownership}
              </span>
            )}
          </div>

          <section className="rounded-2xl border border-white/10 bg-slate-900/55 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {uni.name}
                </h1>
                {location && (
                  <p className="mt-2 text-base text-slate-300">{location}</p>
                )}
              </div>
              {uni.website && (
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-500/15 px-5 py-2.5 text-sm font-medium text-sky-200 transition hover:border-sky-300/70 hover:bg-sky-500/25 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Website oficial
                </a>
              )}
            </div>

            {stats.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {(uni.overview ||
            uni.admission_tips ||
            uni.financial_aid_notes ||
            steps) && (
            <section className="grid gap-4 lg:grid-cols-2">
              {uni.overview && (
                <InfoBlock title="Despre universitate">{uni.overview}</InfoBlock>
              )}
              {uni.admission_tips && (
                <InfoBlock title="Admitere & Sfaturi">
                  {uni.admission_tips}
                </InfoBlock>
              )}
              {uni.financial_aid_notes && (
                <InfoBlock title="Ajutor financiar">
                  {uni.financial_aid_notes}
                </InfoBlock>
              )}
              {steps && steps.length > 0 && (
                <InfoBlock title="Pasi pentru aplicare">
                  <ol className="list-decimal space-y-2 pl-5">
                    {steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </InfoBlock>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-2 text-sm leading-6 text-slate-200">
        {children}
      </div>
    </section>
  );
}
