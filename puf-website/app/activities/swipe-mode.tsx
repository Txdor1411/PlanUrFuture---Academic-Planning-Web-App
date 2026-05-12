"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "@/lib/activities-data";
import { Card } from "@/app/components/ui/card";
import { Heart, X, Calendar, MapPin, RefreshCw } from "lucide-react";

interface SwipeModeProps {
  activities: Activity[];
}

export default function SwipeMode({ activities }: SwipeModeProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [saved, setSaved] = useState<Activity[]>([]);
  const [finished, setFinished] = useState(false);

  const current = activities[index];

  function animate(dir: "left" | "right", onDone: () => void) {
    setDirection(dir);
    setTimeout(() => {
      setDirection(null);
      onDone();
    }, 300);
  }

  function handleSkip() {
    if (index >= activities.length - 1) {
      animate("left", () => setFinished(true));
      return;
    }
    animate("left", () => setIndex((i) => i + 1));
  }

  function handleSave() {
    setSaved((prev) => [...prev, current]);
    // Persist to localStorage
    try {
      const existing: Activity[] = JSON.parse(
        localStorage.getItem("puf_saved_activities") ?? "[]"
      );
      const merged = [...existing.filter((a) => a.slug !== current.slug), current];
      localStorage.setItem("puf_saved_activities", JSON.stringify(merged));
    } catch {
      // ignore storage errors
    }
    if (index >= activities.length - 1) {
      animate("right", () => setFinished(true));
      return;
    }
    animate("right", () => setIndex((i) => i + 1));
  }

  function handleRestart() {
    setIndex(0);
    setFinished(false);
    setDirection(null);
  }

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      conference: "text-sky-300 bg-sky-900/40 border-sky-300/30",
      project: "text-emerald-300 bg-emerald-900/40 border-emerald-300/30",
      volunteering: "text-amber-300 bg-amber-900/40 border-amber-300/30",
      "summer-camp": "text-fuchsia-300 bg-fuchsia-900/40 border-fuchsia-300/30",
    };
    return map[category] ?? "text-slate-300 bg-slate-900/40 border-slate-300/30";
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-white">Ai parcurs toate activitățile!</h2>
        <p className="text-slate-300">
          Ai salvat <span className="font-semibold text-emerald-300">{saved.length}</span> activitate
          {saved.length !== 1 ? "i" : ""}.
        </p>
        {saved.length > 0 && (
          <div className="w-full max-w-md space-y-2 text-left">
            <p className="text-sm font-semibold text-slate-400">Salvate:</p>
            {saved.map((a) => (
              <Link key={a.slug} href={`/activities/${a.slug}`}>
                <div className="rounded-lg border border-emerald-300/20 bg-emerald-900/10 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300/40">
                  {a.title}
                </div>
              </Link>
            ))}
          </div>
        )}
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
          Reia de la început
        </button>
      </div>
    );
  }

  if (!current) return null;

  const slideClass =
    direction === "left"
      ? "-translate-x-full opacity-0"
      : direction === "right"
        ? "translate-x-full opacity-0"
        : "translate-x-0 opacity-100";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full max-w-lg">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>{index + 1} / {activities.length}</span>
          <span>{saved.length} salvate</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-700">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 transition-all"
            style={{ width: `${((index + 1) / activities.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className={`w-full max-w-lg transition-all duration-300 ${slideClass}`}
      >
        <Card className="space-y-4 border-slate-600/50 p-0 overflow-hidden">
          {current.imageUrl && (
            <div className="overflow-hidden">
              <Image
                src={current.imageUrl}
                alt={current.title}
                width={600}
                height={300}
                className="h-52 w-full object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="space-y-3 p-5">
            <span
              className={`inline-flex items-center rounded-lg border px-3 py-1 text-xs font-semibold ${getCategoryColor(current.category)}`}
            >
              {current.category.charAt(0).toUpperCase() + current.category.slice(1).replace("-", " ")}
            </span>
            <h2 className="text-xl font-bold text-white">{current.title}</h2>
            <p className="text-sm text-slate-300 line-clamp-3">{current.description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-amber-300" />
                {current.city ? `${current.city}, ` : ""}{current.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-emerald-300" />
                {new Date(current.startsAt).toLocaleDateString("ro-RO", { month: "short", day: "numeric" })}
                {" – "}
                {new Date(current.endsAt).toLocaleDateString("ro-RO", { month: "short", day: "numeric" })}
              </span>
            </div>
            <Link
              href={`/activities/${current.slug}`}
              className="text-xs text-sky-300 hover:text-sky-200"
            >
              Vezi detalii complete →
            </Link>
          </div>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-8">
        <button
          onClick={handleSkip}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-400/40 bg-red-900/20 text-red-300 shadow-lg transition-all hover:border-red-400/70 hover:bg-red-900/40 active:scale-95"
          title="Skip"
        >
          <X className="h-7 w-7" />
        </button>
        <button
          onClick={handleSave}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400/40 bg-emerald-900/20 text-emerald-300 shadow-lg transition-all hover:border-emerald-400/70 hover:bg-emerald-900/40 active:scale-95"
          title="Salvează"
        >
          <Heart className="h-7 w-7" />
        </button>
      </div>

      <p className="text-xs text-slate-500">
        <span className="text-red-400">✗</span> Skip &nbsp;·&nbsp; <span className="text-emerald-400">♥</span> Salvează
      </p>
    </div>
  );
}
