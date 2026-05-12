export interface PlanTask {
  id: string;
  title: string;
  date: string;
  status: "todo";
  source: "ai";
  priority: "low" | "high";
}

export interface PlanInput {
  startDate: string;
  endDate: string;
  satScore?: number;
  classYear?: string;
  targetUniversity?: string;
  goals?: string;
}

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function nextWeekday(base: Date, weekday: number): Date {
  const d = new Date(base);
  const diff = (weekday - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d;
}

export function generateAIPlan(input: PlanInput): PlanTask[] {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const totalMs = end.getTime() - start.getTime();
  const totalWeeks = Math.max(1, Math.floor(totalMs / (7 * 24 * 60 * 60 * 1000)));

  const tasks: PlanTask[] = [];
  let idCounter = 0;
  const mk = (title: string, date: string, priority: "low" | "high" = "low"): PlanTask => ({
    id: `ai-${++idCounter}-${date}`,
    title,
    date,
    status: "todo",
    source: "ai",
    priority,
  });

  const uni = input.targetUniversity || "universitate";

  // Week 1 — foundation
  tasks.push(mk(`Evaluare inițială: obiective admitere ${uni}`, addDays(start, 1), "high"));
  tasks.push(mk("Listează universitățile țintă (safety, match, reach)", addDays(start, 3)));
  tasks.push(mk("Research cerințe admitere și deadline-uri", addDays(start, 5)));

  if (!input.satScore || input.satScore < 1400) {
    tasks.push(mk("SAT Practice Test #1 — diagnostic", addDays(start, 7), "high"));
  }

  // Every 2 weeks — SAT prep or study
  const hasSATWork = !input.satScore || input.satScore < 1550;
  if (hasSATWork) {
    for (let w = 2; w <= Math.min(totalWeeks, 12); w += 2) {
      const d = addDays(start, w * 7);
      tasks.push(mk(`SAT Practice Test #${Math.floor(w / 2) + 1}`, d, w <= 6 ? "high" : "low"));
    }
  }

  // Month 1 activities
  if (totalWeeks >= 4) {
    tasks.push(mk("Scrie draft eseu principal Common App / aplicație", addDays(start, 14), "high"));
    tasks.push(mk("Cere scrisori de recomandare de la profesori", addDays(start, 16), "high"));
    tasks.push(mk("Completează activitățile extra-curriculare în aplicație", addDays(start, 21)));
  }

  // Month 2
  if (totalWeeks >= 8) {
    tasks.push(mk("Revizuire eseu cu mentor / profesor", addDays(start, 28), "high"));
    tasks.push(mk("Completează profilul academic și note GPA", addDays(start, 35)));
    tasks.push(mk("Vizitează virtual campus-ul universității țintă", addDays(start, 40)));
    tasks.push(mk("Finalizează lista scurtă de universități (max 10)", addDays(start, 42)));
  }

  // Month 3
  if (totalWeeks >= 12) {
    tasks.push(mk("Finalizează eseul — versiunea 2", addDays(start, 50), "high"));
    tasks.push(mk("Verifică transcriptul academic și corectează erori", addDays(start, 55)));
    tasks.push(mk("Research burse și ajutor financiar", addDays(start, 60)));
    tasks.push(mk("Aplică la Early Decision dacă e opțiunea ta", addDays(start, 65), "high"));
  }

  // Month 4+
  if (totalWeeks >= 16) {
    tasks.push(mk("Trimite aplicații Regular Decision", addDays(start, 80), "high"));
    tasks.push(mk("Completează FAFSA / CSS Profile", addDays(start, 85), "high"));
    tasks.push(mk("Urmărește statusul aplicațiilor", addDays(start, 90)));
    tasks.push(mk("Pregătește interviuri pentru universități care cer", addDays(start, 95)));
  }

  // Near end — decision
  const nearEnd = Math.max(totalWeeks - 2, totalWeeks - 2);
  if (nearEnd > 0) {
    tasks.push(mk("Compară ofertele de admitere primite", addDays(start, nearEnd * 7 - 7)));
    tasks.push(mk("Depune acceptul final și plătește taxa", addDays(start, nearEnd * 7), "high"));
  }

  // Filter to be within range
  return tasks.filter((t) => {
    const td = new Date(t.date);
    return td >= start && td <= end;
  });
}
