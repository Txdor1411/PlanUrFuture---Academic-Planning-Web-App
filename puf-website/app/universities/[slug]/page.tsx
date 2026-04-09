import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getUniversityBySlug, universities } from "@/lib/universities-data";
import Sidebar from "@/app/components/sidebar";

type UniversityDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return universities.map((university) => ({ slug: university.slug }));
}

export default async function UniversityDetailsPage({ params }: UniversityDetailsPageProps) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar user={undefined} onSignOut={undefined} />
      {/* Content */}
      <div className="relative overflow-hidden text-slate-100 min-h-screen bg-slate-950 w-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(168,85,247,0.16),_transparent_40%),radial-gradient(circle_at_100%_0%,_rgba(56,189,248,0.16),_transparent_35%)]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/universities"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-300 transition hover:border-sky-300/40 hover:text-white"
          >
            Inapoi la lista
          </Link>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            {university.region}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            {university.qsRank}
          </span>
          <span className="rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-sky-100">
            {university.type}
          </span>
        </div>

        <section className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/55 p-6 lg:col-span-7">
            <header className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {university.name}
              </h1>
              <p className="text-base text-slate-300">{university.location}</p>
            </header>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <Stat label="Acceptance rate" value={university.acceptanceRate} />
              <Stat label="Tuition" value={university.tuition} />
              <Stat label="Cost total" value={university.totalCost} />
              <Stat label="Room & board" value={university.roomBoard} />
              <Stat label="Application fee" value={university.applicationFee} />
              <Stat label="QS Rank" value={university.qsRank} />
            </div>
          </div>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 lg:col-span-5">
            <Image
              src={university.imageUrl}
              alt={`Imagine ${university.name}`}
              width={1400}
              height={800}
              className="h-72 w-full object-cover sm:h-80 lg:h-full"
              priority
              unoptimized
            />
          </section>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InfoBlock title="Financial Aid">{university.financialAid}</InfoBlock>

          <InfoBlock title="Scholarships">
            <ul className="list-disc space-y-2 pl-5">
              {university.scholarships.map((scholarship) => (
                <li key={scholarship}>{scholarship}</li>
              ))}
            </ul>
          </InfoBlock>

          <InfoBlock title="Admission & Deadlines">{university.admissionTypeAndDeadlines}</InfoBlock>
          <InfoBlock title="Test Requirements">{university.testRequirements}</InfoBlock>
          <InfoBlock title="Essays & Recommendations">{university.essaysAndRecommendations}</InfoBlock>
          <InfoBlock title="Extracurriculars & Interview">
            {university.extracurricularsAndInterview}
          </InfoBlock>
          <InfoBlock title="Housing">{university.housing}</InfoBlock>

          <InfoBlock title="Step-by-step application plan">
            <ol className="list-decimal space-y-2 pl-5">
              {university.stepByStep.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </InfoBlock>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InfoBlock title="Undergraduate Programmes">
            <ul className="list-disc space-y-1.5 pl-5">
              {university.undergraduateProgrammes.map((programme) => (
                <li key={programme}>{programme}</li>
              ))}
            </ul>
          </InfoBlock>

          <InfoBlock title="Graduate Programmes">
            <ul className="list-disc space-y-1.5 pl-5">
              {university.graduateProgrammes.map((programme) => (
                <li key={programme}>{programme}</li>
              ))}
            </ul>
          </InfoBlock>
        </section>

      </main>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-2 text-sm leading-6 text-slate-200">{children}</div>
    </section>
  );
}
