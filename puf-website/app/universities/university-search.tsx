"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { University } from "@/lib/universities-data";

type UniversitySearchProps = {
  universities: University[];
};

export function UniversitySearch({ universities }: UniversitySearchProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => {
    return ["all", ...new Set(universities.map((university) => university.region))];
  }, [universities]);

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return universities.filter((university) => {
      const matchesRegion = region === "all" || university.region === region;
      const matchesQuery =
        lowered.length === 0 ||
        university.name.toLowerCase().includes(lowered) ||
        university.location.toLowerCase().includes(lowered) ||
        university.undergraduateProgrammes.some((programme) =>
          programme.toLowerCase().includes(lowered),
        );

      return matchesRegion && matchesQuery;
    });
  }, [query, region, universities]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/65 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.45)] backdrop-blur sm:grid-cols-[minmax(0,2fr)_minmax(200px,1fr)] sm:p-6">
        <div className="space-y-2">
          <label htmlFor="search" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300">
            Cauta universitate
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: Harvard, Computer Science, London..."
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/70"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="region" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300">
            Regiune
          </label>
          <select
            id="region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/70"
          >
            {regions.map((entry) => (
              <option key={entry} value={entry}>
                {entry === "all" ? "Toate regiunile" : entry}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-300">
        Rezultate: <span className="font-semibold text-white">{filtered.length}</span>
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((university) => (
          <article
            key={university.slug}
            className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-sky-300/40 hover:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                {university.region}
              </p>
              <p className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                {university.qsRank}
              </p>
            </div>

            <h2 className="text-lg font-semibold text-white">{university.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{university.location}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Acceptance</p>
                <p className="mt-1 text-white">{university.acceptanceRate}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Tuition</p>
                <p className="mt-1 text-white">{university.tuition}</p>
              </div>
            </div>

            <Link
              href={`/universities/${university.slug}`}
              className="mt-5 inline-flex items-center rounded-full border border-sky-300/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 transition group-hover:border-sky-200 group-hover:bg-sky-500/20"
            >
              Vezi pagina facultatii
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-5 text-sm text-amber-100">
          Nu am gasit rezultate pentru filtrarea curenta. Incearca un alt nume, oras sau program.
        </div>
      ) : null}
    </section>
  );
}
