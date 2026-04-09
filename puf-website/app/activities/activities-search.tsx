"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity } from "@/lib/activities-data";
import { Card } from "@/app/components/ui/card";
import { Calendar, MapPin, Users, Tag } from "lucide-react";

export default function ActivitiesSearch({ activities }: { activities: Activity[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const categories = Array.from(new Set(activities.map((a) => a.category)));
  const countries = Array.from(new Set(activities.map((a) => a.country))).sort();

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesQuery =
        activity.title.toLowerCase().includes(query.toLowerCase()) ||
        activity.description.toLowerCase().includes(query.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory = !selectedCategory || activity.category === selectedCategory;
      const matchesCountry = !selectedCountry || activity.country === selectedCountry;

      return matchesQuery && matchesCategory && matchesCountry;
    });
  }, [query, selectedCategory, selectedCountry, activities]);

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

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Cauta activitati (titlu, descriere, tags)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">Categorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
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
            <label className="mb-2 block text-sm font-semibold text-slate-300">Țară</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            >
              <option value="">Toate țările</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-slate-400">
        Gasiti <span className="font-semibold text-white">{filteredActivities.length}</span> activitate
        {filteredActivities.length !== 1 ? "i" : ""}
      </p>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <Link key={activity.slug} href={`/activities/${activity.slug}`}>
              <Card className="group space-y-4 border-slate-600/50 transition-all hover:border-slate-500 hover:shadow-lg hover:shadow-slate-900/50">
                {/* Image */}
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

                {/* Category Badge */}
                <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold ${getCategoryColor(activity.category)}`}>
                  <span>{getCategoryEmoji(activity.category)}</span>
                  <span>{activity.category.charAt(0).toUpperCase() + activity.category.slice(1).replace("-", " ")}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-sky-300">{activity.title}</h3>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-slate-300">{activity.description}</p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-amber-300" />
                    <span>{activity.city && `${activity.city}, `}{activity.country}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                    <span className="text-xs">
                      {new Date(activity.startsAt).toLocaleDateString("ro-RO", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(activity.endsAt).toLocaleDateString("ro-RO", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {activity.participants && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 flex-shrink-0 text-blue-300" />
                      <span className="text-xs">{activity.participants}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {activity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {activity.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-2 py-1 text-xs text-slate-300">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {activity.tags.length > 2 && <span className="text-xs text-slate-400">+{activity.tags.length - 2}</span>}
                  </div>
                )}

                {/* CTA */}
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
          <p className="text-slate-400">Nu au fost gasit activitati care sa se potriveasca criteriilor.</p>
        </Card>
      )}
    </div>
  );
}
