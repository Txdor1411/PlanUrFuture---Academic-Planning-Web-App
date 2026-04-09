import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivityBySlug, activities } from "@/lib/activities-data";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ExternalLink, Calendar, MapPin, Users, Award, DollarSign, Target, ArrowLeft } from "lucide-react";
import Sidebar from "@/app/components/sidebar";

export async function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}

const InfoBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="border-slate-600/30 space-y-3 bg-slate-800/30 p-4">
    <h3 className="font-semibold text-white">{title}</h3>
    <div className="text-sm text-slate-300">{children}</div>
  </Card>
);

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg bg-slate-800/40 p-3">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
  </div>
);

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      conference: { bg: "bg-sky-900/20", text: "text-sky-300", border: "border-sky-300/30" },
      project: { bg: "bg-emerald-900/20", text: "text-emerald-300", border: "border-emerald-300/30" },
      volunteering: { bg: "bg-amber-900/20", text: "text-amber-300", border: "border-amber-300/30" },
      "summer-camp": { bg: "bg-fuchsia-900/20", text: "text-fuchsia-300", border: "border-fuchsia-300/30" },
    };
    return colors[category] || { bg: "bg-slate-900/20", text: "text-slate-300", border: "border-slate-300/30" };
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      conference: "🎤",
      project: "🚀",
      volunteering: "🤝",
      "summer-camp": "⛺",
    };
    return emojis[category] || "📌";
  };

  const colors = getCategoryColor(activity.category);
  const startDate = new Date(activity.startsAt);
  const endDate = new Date(activity.endsAt);

  return (
    <>
      {/* Sidebar */}
      <Sidebar user={undefined} onSignOut={undefined} />
      {/* Main Content */}
      <div className="min-h-screen bg-slate-950">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      {/* Back Button */}
      <Link href="/activities" className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-semibold">Înapoi la activități</span>
      </Link>

      {/* Hero Section */}
      <section className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
        {/* Left: Title & Stats */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/55 p-6 lg:col-span-7">
          <header className="space-y-3">
            <div className={`inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold ${colors.bg} ${colors.text} ${colors.border}`}>
              <span>{getCategoryEmoji(activity.category)}</span>
              <span>{activity.category.charAt(0).toUpperCase() + activity.category.slice(1).replace("-", " ")}</span>
            </div>
            <h1 className="text-3xl font-semibold text-white">{activity.title}</h1>
            <p className="text-base text-slate-300">
              {activity.city && `${activity.city}, `}
              {activity.country}
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Stat
              label="Data Inceput"
              value={startDate.toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <Stat
              label="Data Sfarsit"
              value={endDate.toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            {activity.deadline && (
              <Stat
                label="Termen Inscriere"
                value={new Date(activity.deadline).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "short",
                })}
              />
            )}
            {activity.participants && <Stat label="Participanti" value={activity.participants} />}
            {activity.ageRequirement && <Stat label="Varsta" value={activity.ageRequirement} />}
            {activity.costRange && <Stat label="Pret" value={activity.costRange} />}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            {activity.applicationUrl && (
              <a href={activity.applicationUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="inline-flex items-center gap-2">
                  Inregistreaza-te acum
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
            {activity.sourceUrl && (
              <a href={activity.sourceUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="inline-flex items-center gap-2">
                  Afla mai mult
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Right: Image */}
        {activity.imageUrl && (
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 lg:col-span-5">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              width={1400}
              height={800}
              className="h-72 w-full object-cover sm:h-80 lg:h-full"
              priority
              unoptimized
            />
          </section>
        )}
      </section>

      {/* Description */}
      <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-6">
        <h2 className="text-xl font-semibold text-white">Descriere Detaliata</h2>
        <p className="leading-relaxed text-slate-300">{activity.longDescription}</p>
      </Card>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Benefits */}
        {activity.benefits && activity.benefits.length > 0 && (
          <InfoBlock title="🎁 Ce vei invata / obtine">
            <ul className="list-inside space-y-2">
              {activity.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-300" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>
        )}

        {/* Target Audience */}
        {activity.targetAudience && activity.targetAudience.length > 0 && (
          <InfoBlock title="👥 Pentru cine">
            <ul className="space-y-2">
              {activity.targetAudience.map((audience, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Target className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                  {audience}
                </li>
              ))}
            </ul>
          </InfoBlock>
        )}

        {/* Requirements */}
        <InfoBlock title="📋 Cerinte">
          <div className="space-y-3">
            {activity.ageRequirement && (
              <div>
                <p className="text-xs font-semibold text-slate-400">Varsta recomandata:</p>
                <p>{activity.ageRequirement}</p>
              </div>
            )}
            {activity.costRange && (
              <div>
                <p className="text-xs font-semibold text-slate-400">Cost:</p>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-amber-300" />
                  {activity.costRange}
                </p>
              </div>
            )}
          </div>
        </InfoBlock>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <InfoBlock title="🏷️ Tags">
            <div className="flex flex-wrap gap-2">
              {activity.tags.map((tag, idx) => (
                <span key={idx} className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </InfoBlock>
        )}
      </div>

      {/* Timeline */}
      <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-6">
        <h2 className="text-xl font-semibold text-white">📅 Timeline</h2>
        <div className="space-y-3">
          {activity.deadline && (
            <div className="rounded-lg border border-amber-300/20 bg-amber-900/10 p-3">
              <p className="text-xs font-semibold text-amber-300">TERMEN LIMITED</p>
              <p className="mt-1 font-medium text-white">Inscriere pana pe {new Date(activity.deadline).toLocaleDateString("ro-RO")}</p>
            </div>
          )}
          <div className="rounded-lg border border-cyan-300/20 bg-cyan-900/10 p-3">
            <p className="text-xs font-semibold text-cyan-300">PERIOADA ACTIVITATE</p>
            <p className="mt-1 font-medium text-white">
              {startDate.toLocaleDateString("ro-RO", { day: "numeric", month: "long" })} -{" "}
              {endDate.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </Card>

      {/* Related Activities */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Activitati similare</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities
            .filter((a) => a.category === activity.category && a.slug !== activity.slug)
            .slice(0, 3)
            .map((related) => (
              <Link key={related.slug} href={`/activities/${related.slug}`}>
                <Card className="group cursor-pointer space-y-2 border-slate-600/50 transition-all hover:border-slate-500">
                  {related.imageUrl && (
                    <div className="overflow-hidden rounded-lg">
                      <Image 
                        src={related.imageUrl} 
                        alt={related.title} 
                        width={400}
                        height={200}
                        className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  )}
                  <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-sky-300">{related.title}</h3>
                  <p className="text-xs text-slate-400">{related.country}</p>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </main>
    </div>
    </>
  );
}
