"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/app/components/ui/card";
import Sidebar, { MobileMenuButton } from "@/app/components/sidebar";
import { Button } from "@/app/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  AlertCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface CalendarTask {
  id: string;
  title: string;
  date: string;
  status: "todo" | "in-progress" | "done";
  source: "manual" | "ai" | "activity";
  notes?: string;
  priority?: "low" | "high";
}

const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const firstDayOfMonth = (date: Date) => {
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert JS getDay (0=Sunday) to mon-based (0=Monday)
};
const monthName = (date: Date) =>
  date.toLocaleDateString("ro-RO", { month: "long", year: "numeric" }).toUpperCase();

export default function InteractiveCalendar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 9)); // April 9, 2026
  const [tasks, setTasks] = useState<CalendarTask[]>([
    {
      id: "1",
      title: "Stanford Application Deadline",
      date: "2026-03-15",
      status: "todo",
      source: "activity",
      priority: "high",
    },
    {
      id: "2",
      title: "SAT Practice Test",
      date: "2026-03-20",
      status: "in-progress",
      source: "manual",
    },
    {
      id: "3",
      title: "Global Leaders Summit Application",
      date: "2026-04-30",
      status: "todo",
      source: "activity",
      priority: "high",
    },
    {
      id: "4",
      title: "Math Homework",
      date: "2026-04-10",
      status: "done",
      source: "manual",
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSource, setNewTaskSource] = useState<"manual" | "ai" | "activity">("manual");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "high">("low");

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !selectedDate) return;

    const newTask: CalendarTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      date: selectedDate,
      status: "todo",
      source: newTaskSource,
      priority: newTaskPriority,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setSelectedDate("");
    setShowAddTask(false);
    setNewTaskSource("manual");
    setNewTaskPriority("low");
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "todo" : "done",
            }
          : task
      )
    );
  };

  const getDaysArray = () => {
    const days: (number | null)[] = [];
    const firstDay = firstDayOfMonth(currentDate);
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth(currentDate); i++) {
      days.push(i);
    }
    return days;
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((task) => task.date === dateStr);
  };

  const getTodayTasks = () => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return tasks.filter((task) => task.date === dateStr);
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks
      .filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate > today && task.status !== "done";
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const daysArray = getDaysArray();
  const weekDays = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      manual: "bg-sky-900/30 text-sky-300 border-sky-300/20",
      ai: "bg-purple-900/30 text-purple-300 border-purple-300/20",
      activity: "bg-emerald-900/30 text-emerald-300 border-emerald-300/20",
    };
    return colors[source] || "bg-slate-900/30 text-slate-300 border-slate-300/20";
  };

  const getSourceIcon = (source: string) => {
    if (source === "ai") return <Zap className="h-3 w-3" />;
    if (source === "activity") return <AlertCircle className="h-3 w-3" />;
    return <Clock className="h-3 w-3" />;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      {/* Sidebar - only on large screens */}
      <div className="hidden lg:block">
        <Sidebar user={undefined} onSignOut={undefined} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>
      {/* Mobile drawer overlay */}
      <div className="lg:hidden">
        <Sidebar user={undefined} onSignOut={undefined} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>
      <div className="min-h-screen bg-slate-950">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-300/80">Organizeaza-ti viata</p>
          <h1 className="text-4xl font-bold text-white">Calendar Interactiv 📅</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Planificați-vă aplicațiile, termenele și activitățile. Integrare cu AI planner pentru recomandări inteligente.
          </p>
        </div>
        <MobileMenuButton onOpen={() => setIsMobileOpen(true)} />
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Header */}
          <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{monthName(currentDate)}</h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="rounded-lg bg-slate-700/50 p-2 hover:bg-slate-600"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="rounded-lg bg-slate-700/50 p-2 hover:bg-slate-600"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-slate-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((day, idx) => {
                const dayTasks = day ? getTasksForDate(day) : [];
                const dayIsToday = day ? isToday(day) : false;
                const dateStr = day
                  ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  : "";

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (day && dateStr) {
                        setSelectedDate(dateStr);
                        setShowAddTask(true);
                      }
                    }}
                    className={`relative rounded-lg p-2 text-sm font-semibold transition-all ${
                      day
                        ? dayIsToday
                          ? "border-2 border-green-400 bg-green-900/20 text-white"
                          : "border border-slate-600 bg-slate-800/50 text-white hover:border-slate-500 hover:bg-slate-800"
                        : "bg-slate-900/20"
                    }`}
                  >
                    {day}
                    {dayTasks.length > 0 && (
                      <div className="absolute bottom-1 right-1 flex gap-1">
                        {dayTasks.slice(0, 2).map((task, i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full ${
                              task.source === "ai"
                                ? "bg-purple-400"
                                : task.source === "activity"
                                  ? "bg-emerald-400"
                                  : "bg-sky-400"
                            }`}
                          />
                        ))}
                        {dayTasks.length > 2 && (
                          <div className="text-[10px] text-slate-400">+{dayTasks.length - 2}</div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Selected Date Tasks */}
          {selectedDate && (
            <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  Sarcini din {new Date(selectedDate).toLocaleDateString("ro-RO")}
                </h3>
                <button
                  onClick={() => setSelectedDate("")}
                  className="rounded-lg bg-slate-700/50 p-1 hover:bg-slate-600"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="space-y-2">
                {getTasksForDate(parseInt(selectedDate.split("-")[2])).length > 0 ? (
                  getTasksForDate(parseInt(selectedDate.split("-")[2])).map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start justify-between rounded-lg border px-3 py-2 ${getSourceColor(task.source)}`}
                    >
                      <div className="flex items-start gap-2 flex-1">
                        <button
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {task.status === "done" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-slate-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-semibold ${
                              task.status === "done" ? "line-through opacity-60" : ""
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-xs">
                            {getSourceIcon(task.source)}
                            <span>{task.source}</span>
                            {task.priority === "high" && (
                              <span className="ml-1 rounded bg-red-900/50 px-1.5 py-0.5 text-red-300">
                                HIGH
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4 opacity-50 hover:opacity-100" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">Nu sunt sarcini pentru aceasta zi</p>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Add Task Button */}
          <Button
            onClick={() => {
              setShowAddTask(!showAddTask);
              if (!showAddTask) setSelectedDate("");
            }}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adauga Sarcina
          </Button>

          {/* Add Task Form */}
          {showAddTask && (
            <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-4">
              <h3 className="font-semibold text-white">Noua Sarcina</h3>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Titlu sarcina..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-sky-400 focus:outline-none"
                />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
                />

                <select
                  value={newTaskSource}
                  onChange={(e) => setNewTaskSource(e.target.value as "manual" | "ai" | "activity")}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
                >
                  <option value="manual">Manual</option>
                  <option value="ai">AI Suggested</option>
                  <option value="activity">Activity Deadline</option>
                </select>

                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "low" | "high")}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
                >
                  <option value="low">Normal Priority</option>
                  <option value="high">High Priority</option>
                </select>

                <div className="flex gap-2">
                  <Button onClick={handleAddTask} variant="primary" className="flex-1">
                    Adauga
                  </Button>
                  <Button
                    onClick={() => setShowAddTask(false)}
                    variant="ghost"
                    className="flex-1"
                  >
                    Anuleaza
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Today's Tasks */}
          <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-4">
            <h3 className="font-semibold text-white">📌 Astazi</h3>
            {getTodayTasks().length > 0 ? (
              <div className="space-y-2">
                {getTodayTasks().map((task) => (
                  <div key={task.id} className={`rounded-lg px-3 py-2 text-xs ${getSourceColor(task.source)}`}>
                    <p className="font-semibold">{task.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Nu sunt sarcini pentru azi</p>
            )}
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-slate-600/30 space-y-4 bg-slate-800/30 p-4">
            <h3 className="font-semibold text-white">🔔 Viitor</h3>
            {getUpcomingTasks().length > 0 ? (
              <div className="space-y-2">
                {getUpcomingTasks().map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg px-3 py-2 text-xs ${getSourceColor(task.source)}`}
                  >
                    <p className="font-semibold">{task.title}</p>
                    <p className="mt-0.5 text-xs opacity-75">
                      {new Date(task.date).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Nu sunt sarcini viitoare</p>
            )}
          </Card>

          {/* Stats */}
          <Card className="border-slate-600/30 space-y-3 bg-slate-800/30 p-4">
            <h3 className="font-semibold text-white">📊 Statistici</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Total Sarcini:</span>
                <span className="font-bold text-white">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Completate:</span>
                <span className="font-bold text-green-400">{tasks.filter((t) => t.status === "done").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">In Curs:</span>
                <span className="font-bold text-amber-400">
                  {tasks.filter((t) => t.status === "in-progress").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">De Facut:</span>
                <span className="font-bold text-red-400">{tasks.filter((t) => t.status === "todo").length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
    </div>
    </>
  );
}
