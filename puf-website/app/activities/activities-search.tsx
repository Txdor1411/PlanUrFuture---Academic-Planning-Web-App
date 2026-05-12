"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity } from "@/lib/activities-data";
import { Card } from "@/app/components/ui/card";
import { Calendar, MapPin, Users, Tag, LayoutList, Layers } from "lucide-react";
import SwipeMode from "./swipe-mode";

interface ActivitiesSearchProps {
  activities: Activity[];
  userPrograms?: string[];
}

export default function ActivitiesSearch({ activities, userPrograms = [] }: ActivitiesSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [personalizedOnly, setPersonalizedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "swipe">("list");

  const categories = Array.from(new Set(activities.map((a) => a.category)));
  const countries = Array.from(new Set(activities.map((a) => a.country))).sort();
  const cities = Array.from(
    new Set(activities.map((a) => a.city).filter(Boolean) as string[])
  ).sort();

  const months = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      const d = new Date(a.startsAt);
      set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    });
    return Array.from(set).sort();
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesQuery =
        activity.title.toLowerCase().includes(query.toLowerCase()) ||
        activity.description.toLowerCase().includes(query.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = !selectedCategory || activity.category === selectedCategory;
      const matchesCountry = !selectedCountry || activity.country === selectedCountry;
      const matchesCity = !selectedCity || activity.city === selectedCity;
      const matchesMonth =
        !selectedMonth ||
        (() => {
          const d = new Date(activity.startsAt);
          const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          return m === selectedMonth;
        })();
      const matchesPersonalized =
        !personalizedOnly ||
        userPrograms.length === 0 ||
        activity.tags.some((tag) =>
          userPrograms.some((p) => p.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(p.toLowerCase()))
        );

      return matchesQuery && matchesCategory && matchesCountry && matchesCity && matchesMonth && matchesPersonalized;
    });
  }, [query, selectedCategory, selectedCountry, selectedCity, selectedMonth, personalizedOnly, activities, userPrograms]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      conference: "bg-sky-900/40 text-sky-300 border-sky-300/30",
      project: "bg-emerald-900/40 text-emerald-300 border-emerald-300/30",
      volunteering: "bg-amber-900/40 text-amber-300 border-amber-300/30",
      "summer-camp": "bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-300/30",
    };
    return colors[category] || "bg-slate-900/40 text-slate-300 border-slate-300/30";
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

  const formatMonth = (ym: string) => {
    const [year, month] = ym.split("-");
    const d = new Date(parseInt(year), parseInt(month) - 1, 1);
    return d.toLocaleDateString("ro-RO", { month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              viewMode === "list"
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <LayoutList className="h-4 w-4" />
            Listă
          </button>
          <button
            onClick={() => setViewMode("swipe")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              viewMode === "swipe"
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4" />
            Swipe
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Caută activități (titlu, descriere, tags)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-300">Categorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              <option value="">Toate categoriile</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryEmoji(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-300">Țară</label>
            <select
              value={selectedCountry}
              onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(""); }}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              <option value="">Toate țările</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-300">Oraș</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              <option value="">Toate orașele</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-300">Lună start</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              <option value="">Orice perioadă</option>
              {months.map((m) => (
                <option key={m} value={m}>{formatMonth(m)}</option>
              ))}
            </select>
          </div>
        </div>

        {userPrograms.length > 0 && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={personalizedOnly}
              onChange={(e) => setPersonalizedOnly(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-900 text-sky-400 focus:ring-sky-400"
            />
            <span>
              Afișează doar activitățile relevante pentru profilul meu
              <span className="ml-1 text-sky-300">✨</span>
            </span>
          </label>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-slate-400">
        {filteredActivities.length === activities.length
          ? `${activities.length} activități disponibile`
          : `${filteredActivities.length} din ${activities.length} activități`}
      </p>

      {/* Content */}
      {viewMode === "swipe" ? (
        <SwipeMode activities={filteredActivities.length > 0 ? filteredActivities : activities} />
      ) : filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <Link key={activity.slug} href={`/activities/${activity.slug}`}>
              <Card className="group space-y-4 border-slate-600/50 transition-all hover:border-slate-500 hover:shadow-lg hover:shadow-slate-900/50">
                {activity.imageUrl && (
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={activity.imageUrl}
                      alt={activity.title}
                      width={500}
                      height={280}
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={false}
                      unoptimized
                    />
                  </div>
                )}
                <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold ${getCategoryColor(activity.category)}`}>
                  <span>{getCategoryEmoji(activity.category)}</span>
                  <span>{activity.category.charAt(0).toUpperCase() + activity.category.slice(1).replace("-", " ")}</span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-sky-300">{activity.title}</h3>
                <p className="line-clamp-2 text-sm text-slate-300">{activity.description}</p>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-amber-300" />
                    <span>{activity.city && `${activity.city}, `}{activity.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                    <span className="text-xs">
                      {new Date(activity.startsAt).toLocaleDateString("ro-RO", { month: "short", day: "numeric" })}
                      {" – "}
                      {new Date(activity.endsAt).toLocaleDateString("ro-RO", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  {activity.participants && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 flex-shrink-0 text-blue-300" />
                      <span className="text-xs">{activity.participants}</span>
                    </div>
                  )}
                </div>
                {activity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {activity.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-2 py-1 text-xs text-slate-300">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {activity.tags.length > 2 && (
                      <span className="text-xs text-slate-400">+{activity.tags.length - 2}</span>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-sky-300">Vezi detalii →</span>
                  {activity.deadline && (
                    <span className="text-xs text-amber-300">
                      Termen: {new Date(activity.deadline).toLocaleDateString("ro-RO")}
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="border-slate-600/30 bg-slate-800/20 p-8 text-center">
          <p className="text-slate-400">Nu au fost găsite activități care să se potrivească criteriilor.</p>
        </Card>
      )}
    </div>
  );
}
