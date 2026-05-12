"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  PAGE_SIZE,
  formatAcceptanceRate,
  formatCurrency,
  formatLocation,
  type UniversityListItem,
} from "@/lib/supabase-universities";

export function UniversitySearch() {
  const [universities, setUniversities] = useState<UniversityListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<{ country: string; total: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supabase = createClient();

  // Load distinct countries with counts via DB function
  useEffect(() => {
    supabase
      .rpc("distinct_university_countries")
      .then(({ data }) => {
        setCountries((data ?? []) as { country: string; total: number }[]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUniversities = useCallback(
    async (q: string, ct: string, pg: number) => {
      setLoading(true);
      const from = (pg - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let qb = supabase
        .from("universities")
        .select(
          "id,slug,name,city,state,country,website,acceptance_rate,tuition_out_of_state,world_ranking,world_ranking_score,ownership,school_type",
          { count: "exact" }
        )
        .order("world_ranking", { ascending: true, nullsFirst: false })
        .order("name", { ascending: true })
        .range(from, to);

      if (q) qb = qb.ilike("name", `%${q}%`);
      if (ct) qb = qb.eq("country", ct);

      const { data, count, error } = await qb;
      if (error) {
        setFetchError(`${error.code}: ${error.message}`);
        setLoading(false);
        return;
      }
      setFetchError(null);
      setUniversities((data ?? []) as UniversityListItem[]);
      setTotal(count ?? 0);
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    fetchUniversities(query, country, page);
  }, [fetchUniversities, query, country, page]);

  const handleQueryChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setQuery(value);
    }, 350);
  };

  const handleCountryChange = (value: string) => {
    setPage(1);
    setCountry(value);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/65 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.45)] backdrop-blur sm:grid-cols-[minmax(0,2fr)_minmax(200px,1fr)] sm:p-6">
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
          >
            Cauta universitate
          </label>
          <input
            id="search"
            type="text"
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Ex: Harvard, MIT, Oxford..."
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/70"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
          >
            Țară
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/70"
          >
            <option value="">Toate țările</option>
            {countries.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country} ({c.total})
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-300">
        Rezultate:{" "}
        <span className="font-semibold text-white">
          {total.toLocaleString("en-US")}
        </span>
        {totalPages > 1 && (
          <span className="ml-2 text-slate-500">
            — pagina {page} din {totalPages}
          </span>
        )}
      </p>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-white/10 bg-slate-900/60"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {universities.map((university) => (
            <article
              key={university.slug}
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-sky-300/40 hover:bg-slate-900"
            >
              {/* Top row: country + rank badge + ownership */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                  {university.country ?? "United States"}
                </p>
                <div className="flex items-center gap-2">
                  {university.world_ranking && (
                    <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-0.5 text-xs font-bold text-amber-300">
                      #{university.world_ranking} ARWU
                    </span>
                  )}
                  {university.ownership && (
                    <p className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                      {university.ownership}
                    </p>
                  )}
                </div>
              </div>

              <h2 className="text-lg font-semibold text-white">
                {university.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {formatLocation(university.city, university.state)}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {/* Box 1: always acceptance rate */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Acceptance</p>
                  <p className="mt-1 text-white">
                    {formatAcceptanceRate(university.acceptance_rate)}
                  </p>
                </div>

                {/* Box 2: tuition if available, else website domain */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {university.tuition_out_of_state !== null ? "Tuition" : "Website"}
                  </p>
                  {university.tuition_out_of_state !== null ? (
                    <p className="mt-1 text-white">
                      {formatCurrency(university.tuition_out_of_state)}
                    </p>
                  ) : university.website ? (
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 block truncate text-sky-300 hover:text-sky-200 text-xs"
                    >
                      {university.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <p className="mt-1 text-slate-500">N/A</p>
                  )}
                </div>
              </div>

              {university.acceptance_rate !== null || university.tuition_out_of_state !== null ? (
                <Link
                  href={`/universities/${university.slug}`}
                  className="mt-5 inline-flex items-center rounded-full border border-sky-300/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 transition group-hover:border-sky-200 group-hover:bg-sky-500/20"
                >
                  Vezi pagina facultatii
                </Link>
              ) : university.website ? (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 transition group-hover:border-sky-200 group-hover:bg-sky-500/20"
                >
                  Deschide website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              ) : (
                <Link
                  href={`/universities/${university.slug}`}
                  className="mt-5 inline-flex items-center rounded-full border border-sky-300/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 transition group-hover:border-sky-200 group-hover:bg-sky-500/20"
                >
                  Vezi pagina facultatii
                </Link>
              )}
            </article>
          ))}
        </div>
      )}

      {!loading && fetchError && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm text-red-200">
          <p className="font-semibold mb-1">Eroare la incarcarea datelor</p>
          <p className="font-mono text-xs text-red-300">{fetchError}</p>
        </div>
      )}

      {!loading && !fetchError && universities.length === 0 && (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-5 text-sm text-amber-100">
          Nu am gasit rezultate. Incearca un alt nume sau selecteaza o alta tara.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition disabled:opacity-40 hover:border-sky-300/40 hover:text-white"
          >
            Anterior
          </button>
          <span className="text-sm text-slate-400">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition disabled:opacity-40 hover:border-sky-300/40 hover:text-white"
          >
            Urmator
          </button>
        </div>
      )}
    </section>
  );
}
