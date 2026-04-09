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
              Ghidat de AI • Creat pentru elevi și studenți
            </motion.div>
            <motion.h1
              variants={item}
              className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Planifică-ți viitorul. <span className="text-gradient">Pas cu pas.</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-xl text-lg leading-8 text-slate-300"
            >
              Construiește un plan academic personalizat cu ghidare AI, explorare de universități, mentorat și monitorizare inteligentă - tot ce ai nevoie ca să treci de la intenție la admitere.
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <Button
                as="a"
                href="/auth"
                size="lg"
              >
                Începe acum
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button as="a" href="#how-it-works" variant="ghost" size="lg" className="gap-2">
                <Play className="h-4 w-4 text-sky-300" />
                Vezi cum funcționează
              </Button>
            </motion.div>
            <motion.div
              variants={item}
              className="flex gap-3 text-sm text-slate-400"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Potriviri live cu mentori
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/5">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Foaie de parcurs AI instant
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
            <p className="text-sm text-slate-400">Planul tău</p>
            <h3 className="text-xl font-semibold text-white">Primăvara 2026 · 12 săptămâni</h3>
          </div>
          <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
            Ghidat de AI
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Cercetare", "Aplicări", "Burse"].map((label, idx) => (
            <div key={label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{label}</span>
                <span>{idx === 0 ? "Săptămâna 1" : idx === 1 ? "Săptămâna 5" : "Săptămâna 8"}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                {idx === 0 && "Identifică primele 5 programe și cerințele de admitere."}
                {idx === 1 && "Trimite 3 aplicații prioritare împreună cu eseurile."}
                {idx === 2 && "Asigură 2 opțiuni de finanțare și termenele lor."}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500" />
              <div>
                <p className="text-slate-400">Sesiune cu mentor</p>
                <p className="font-semibold text-white">Joi · 17:00</p>
              </div>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
              Confirmat
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
