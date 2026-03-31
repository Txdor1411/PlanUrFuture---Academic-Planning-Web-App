"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, Flame, GraduationCap } from "lucide-react";
import { Section } from "./section";
import { Card } from "./ui/card";

export function DemoSection() {
  return (
    <Section id="demo">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          Preview
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          See your dashboard in action
        </h2>
        <p className="max-w-2xl text-lg text-slate-300">
          A clear, calming workspace with your roadmap, sessions, and deadlines in one place—so you always know the next move.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Today</p>
              <h3 className="text-2xl font-semibold text-white">Your plan</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
              <CheckCircle2 className="h-4 w-4" />
              On track
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[{ label: "Application essays", time: "2 tasks", accent: "from-sky-500 to-sky-300" }, { label: "Portfolio updates", time: "1 milestone", accent: "from-fuchsia-500 to-pink-400" }].map(
              (item, idx) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${item.accent}`} />
                    <div>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.time}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">Due {idx === 0 ? "Fri" : "Sun"}</div>
                </div>
              )
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-sky-300" />
                <div>
                  <p className="text-slate-400">Upcoming</p>
                  <p className="text-sm font-semibold text-white">Scholarship deadline · Mar 28</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock3 className="h-4 w-4" />
                Reminds 24h before
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Momentum</p>
            <Flame className="h-5 w-5 text-amber-300" />
          </div>
          <div className="space-y-4">
            {["Research", "Applications", "Scholarships"].map((label, idx) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{label}</span>
                  <span className="text-xs text-slate-400">{idx === 0 ? "Week 4" : idx === 1 ? "Week 7" : "Week 9"}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: idx === 0 ? "82%" : idx === 1 ? "64%" : "48%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Mentor notes</p>
                <p className="text-sm text-white">“Strong narrative—tighten essay conclusion and add metrics.”</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
