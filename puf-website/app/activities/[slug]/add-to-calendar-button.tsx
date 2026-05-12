"use client";

import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";

interface AddToCalendarButtonProps {
  title: string;
  date: string;
}

export default function AddToCalendarButton({ title, date }: AddToCalendarButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    try {
      const existing = JSON.parse(localStorage.getItem("puf_calendar_tasks") ?? "[]");
      const task = {
        id: `activity-${Date.now()}`,
        title,
        date,
        status: "todo",
        source: "activity",
        priority: "high",
      };
      const updated = [...existing.filter((t: { title: string }) => t.title !== title), task];
      localStorage.setItem("puf_calendar_tasks", JSON.stringify(updated));
      setAdded(true);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition ${
        added
          ? "border-emerald-400/40 bg-emerald-900/20 text-emerald-300 cursor-default"
          : "border-purple-400/40 bg-purple-500/15 text-purple-200 hover:border-purple-300/70 hover:bg-purple-500/25"
      }`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Adăugat în calendar
        </>
      ) : (
        <>
          <CalendarPlus className="h-4 w-4" />
          Adaugă deadline în calendar
        </>
      )}
    </button>
  );
}
