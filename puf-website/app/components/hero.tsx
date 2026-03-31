"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Section } from "./section";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.7, ease: "easeOut" },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export function Hero() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-transparent px-6 py-16 sm:px-12">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="z-10 flex flex-col gap-6">
            <motion.div
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 ring-1 ring-white/10"
            >
              Guided by AI • Built for students
            </motion.div>
            <motion.h1
              variants={item}
              className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Plan Your Future. <span className="text-gradient">Step by Step.</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-xl text-lg leading-8 text-slate-300"
            >
              Build a personalized academic roadmap with AI guidance, university exploration, mentorship, and smart tracking—everything you need to move from intention to acceptance.
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <Button
                as="a"
                href="https://platform.domeniu.com"
                target="_blank"
                rel="noreferrer"
                size="lg"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button as="a" href="#how-it-works" variant="ghost" size="lg" className="gap-2">
                <Play className="h-4 w-4 text-sky-300" />
                See how it works
              </Button>
            </motion.div>
            <motion.div
              variants={item}
              className="flex gap-3 text-sm text-slate-400"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live mentorship matches
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/5">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Instant AI roadmap
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative z-10"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <MockDashboard />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

function MockDashboard() {
  return (
    <Card className="glass-panel relative overflow-hidden border-white/10 p-6 sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Your roadmap</p>
            <h3 className="text-xl font-semibold text-white">Spring 2026 · 12 weeks</h3>
          </div>
          <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
            AI-guided
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Research", "Applications", "Scholarships"].map((label, idx) => (
            <div key={label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{label}</span>
                <span>{idx === 0 ? "Week 1" : idx === 1 ? "Week 5" : "Week 8"}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                {idx === 0 && "Identify top 5 programs and entry requirements."}
                {idx === 1 && "Submit 3 priority applications with essays."}
                {idx === 2 && "Secure 2 funding options and deadlines."}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500" />
              <div>
                <p className="text-slate-400">Mentor session</p>
                <p className="font-semibold text-white">Thursday · 5:00 PM</p>
              </div>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
              Confirmed
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
