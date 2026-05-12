"use client";

import { useState } from "react";
import Link from "next/link";
import { Exercise, SubjectMeta } from "@/lib/exercises-data";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CheckCircle2, XCircle, ChevronRight, Trophy, Target, RefreshCw } from "lucide-react";

interface ExerciseSessionProps {
  exercises: Exercise[];
  meta: SubjectMeta;
}

type AnswerState = "unanswered" | "correct" | "wrong";

interface SessionResult {
  exerciseId: string;
  correct: boolean;
  subject: string;
}

export default function ExerciseSession({ exercises: exList, meta }: ExerciseSessionProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [results, setResults] = useState<SessionResult[]>([]);
  const [done, setDone] = useState(false);
  const [fillValue, setFillValue] = useState("");

  const current = exList[index];
  const progress = ((index) / exList.length) * 100;

  function handleAnswer(answer: string) {
    if (answerState !== "unanswered") return;
    const isCorrect = answer.trim().toLowerCase() === current.correctAnswer.trim().toLowerCase();
    setSelected(answer);
    setAnswerState(isCorrect ? "correct" : "wrong");
    setResults((prev) => [
      ...prev,
      { exerciseId: current.id, correct: isCorrect, subject: current.subject },
    ]);
  }

  function handleNext() {
    setSelected(null);
    setAnswerState("unanswered");
    setFillValue("");
    if (index + 1 >= exList.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setAnswerState("unanswered");
    setResults([]);
    setDone(false);
    setFillValue("");
  }

  if (done) {
    const correct = results.filter((r) => r.correct).length;
    const total = results.length;
    const pct = Math.round((correct / total) * 100);
    const weak = results
      .filter((r) => !r.correct)
      .map((r) => exList.find((e) => e.id === r.exerciseId))
      .filter(Boolean) as Exercise[];

    return (
      <div className="space-y-6">
        {/* Score */}
        <Card className={`p-8 text-center space-y-4 ${pct >= 80 ? "border-emerald-400/30 bg-emerald-900/10" : "border-amber-400/30 bg-amber-900/10"}`}>
          <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "📈" : "💪"}</div>
          <h2 className="text-3xl font-bold text-white">{pct}%</h2>
          <p className={`text-lg font-semibold ${pct >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
            {correct} din {total} exerciții corecte
          </p>
          <p className="text-slate-300">
            {pct >= 80 ? "Excelent! Ești bine pregătit pe acest modul." : pct >= 50 ? "Bine! Mai ai de lucrat la unele concepte." : "Continuă să exersezi — vei progresa!"}
          </p>
        </Card>

        {/* Weak points */}
        {weak.length > 0 && (
          <Card className="space-y-4 border-rose-400/20 bg-rose-900/10 p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-rose-300" />
              <h3 className="font-semibold text-white">Puncte slabe — revizuiește:</h3>
            </div>
            <div className="space-y-3">
              {weak.map((ex) => (
                <div key={ex.id} className="rounded-xl border border-rose-300/20 bg-rose-900/10 p-4">
                  <p className="text-sm font-semibold text-white">{ex.question}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Răspuns corect: <span className="text-emerald-300">{ex.correctAnswer}</span>
                  </p>
                  <p className="mt-2 text-xs text-slate-300">💡 {ex.explanation}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleRestart} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reia modulul
          </Button>
          <Link href="/exercises">
            <Button variant="ghost">Înapoi la module</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span className={meta.color}>{meta.emoji} {meta.label}</span>
          <span>{index + 1} / {exList.length}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-700">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Difficulty + Bac tag */}
      <div className="flex items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
          current.difficulty === "easy"
            ? "border-emerald-300/30 bg-emerald-900/20 text-emerald-300"
            : current.difficulty === "medium"
              ? "border-amber-300/30 bg-amber-900/20 text-amber-300"
              : "border-rose-300/30 bg-rose-900/20 text-rose-300"
        }`}>
          {current.difficulty === "easy" ? "Ușor" : current.difficulty === "medium" ? "Mediu" : "Greu"}
        </span>
        {current.bacSource && (
          <span className="rounded-full border border-sky-300/20 bg-sky-900/10 px-2 py-0.5 text-xs text-sky-300">
            📋 {current.bacSource}
          </span>
        )}
      </div>

      {/* Theory */}
      <Card className="border-white/10 bg-slate-800/40 p-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Teorie</p>
        <p className="text-sm leading-relaxed text-slate-200">{current.theory}</p>
      </Card>

      {/* Question */}
      <Card className="border-white/10 bg-slate-900/60 p-5 space-y-5">
        <p className="text-base font-semibold text-white">{current.question}</p>

        {current.type === "multiple-choice" && current.options ? (
          <div className="space-y-3">
            {current.options.map((opt) => {
              const isSelected = selected === opt;
              const isCorrect = opt === current.correctAnswer;
              let cls =
                "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ";
              if (answerState === "unanswered") {
                cls += "border-white/10 bg-white/5 text-slate-200 hover:border-sky-400/50 hover:bg-sky-900/20";
              } else if (isCorrect) {
                cls += "border-emerald-400/60 bg-emerald-900/30 text-emerald-200";
              } else if (isSelected && !isCorrect) {
                cls += "border-red-400/60 bg-red-900/30 text-red-200";
              } else {
                cls += "border-white/5 bg-white/3 text-slate-500";
              }

              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => handleAnswer(opt)}
                  disabled={answerState !== "unanswered"}
                >
                  <span className="flex items-center gap-2">
                    {answerState !== "unanswered" && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {answerState !== "unanswered" && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    )}
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              disabled={answerState !== "unanswered"}
              placeholder="Scrie răspunsul..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 disabled:opacity-60"
            />
            {answerState === "unanswered" && (
              <Button onClick={() => handleAnswer(fillValue)} disabled={!fillValue.trim()}>
                Verifică
              </Button>
            )}
          </div>
        )}

        {/* Explanation */}
        {answerState !== "unanswered" && (
          <div className={`rounded-xl border p-4 text-sm space-y-1 ${
            answerState === "correct"
              ? "border-emerald-400/30 bg-emerald-900/20 text-emerald-200"
              : "border-red-400/30 bg-red-900/20 text-red-200"
          }`}>
            <p className="font-semibold">
              {answerState === "correct" ? "✅ Corect!" : "❌ Greșit"}
            </p>
            <p className="text-slate-300">{current.explanation}</p>
          </div>
        )}
      </Card>

      {/* Next button */}
      {answerState !== "unanswered" && (
        <Button onClick={handleNext} className="w-full sm:w-auto flex items-center gap-2">
          {index + 1 >= exList.length ? (
            <>
              <Trophy className="h-4 w-4" />
              Vezi rezultatele
            </>
          ) : (
            <>
              Exercițiul următor
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
