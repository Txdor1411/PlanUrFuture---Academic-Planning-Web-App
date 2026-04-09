"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, Flame, GraduationCap } from "lucide-react";
import { Section } from "./section";
import { Card } from "./ui/card";
import { SplineDemo } from "./spline-demo";
import { SplineDemo2 } from "./spline-demo-2";

export function DemoSection() {
  return (
    <Section id="demo">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          Previzualizare
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Vezi dashboard-ul tău în acțiune
        </h2>
        <p className="max-w-2xl text-lg text-slate-300">
          Un spațiu de lucru clar și liniștit, cu planul, sesiunile și termenele tale într-un singur loc, ca să știi mereu următorul pas.
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
              <p className="text-sm text-slate-400">Astăzi</p>
              <h3 className="text-2xl font-semibold text-white">Planul tău</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
              <CheckCircle2 className="h-4 w-4" />
              Pe drumul bun
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[{ label: "Eseuri pentru aplicații", time: "2 sarcini", accent: "from-sky-500 to-sky-300" }, { label: "Actualizări portofoliu", time: "1 etapă", accent: "from-fuchsia-500 to-pink-400" }].map(
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
                  <div className="text-xs text-slate-400">Termen {idx === 0 ? "Vin" : "Dum"}</div>
                </div>
              )
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-sky-300" />
                <div>
                  <p className="text-slate-400">Urmează</p>
                  <p className="text-sm font-semibold text-white">Termen bursă · 28 Mar</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock3 className="h-4 w-4" />
                Notificare cu 24h înainte
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Progres</p>
            <Flame className="h-5 w-5 text-amber-300" />
          </div>
          <div className="space-y-4">
            {["Cercetare", "Aplicări", "Burse"].map((label, idx) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{label}</span>
                  <span className="text-xs text-slate-400">{idx === 0 ? "Săptămâna 4" : idx === 1 ? "Săptămâna 7" : "Săptămâna 9"}</span>
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
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Notițe mentor</p>
                <p className="text-sm text-white">
                  {'"Narațiune puternică - întărește concluzia eseului și adaugă indicatori."'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <Card className="p-3 sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <div>
              <p className="text-sm text-slate-400">Traseu vizual</p>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">Scenă interactivă Spline</h3>
            </div>
            <p className="max-w-md text-sm text-slate-300">
              Modelul este încărcat direct din Spline și poate fi explorat interactiv în pagină.
            </p>
          </div>
          <SplineDemo />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <Card className="p-3 sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <div>
              <p className="text-sm text-slate-400">Scenă 3D</p>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">Exploră mediul interactiv</h3>
            </div>
            <p className="max-w-md text-sm text-slate-300">
              O vizualizare imersivă a spațiului tău de lucru, creată cu Spline.
            </p>
          </div>
          <SplineDemo2 />
        </Card>
      </motion.div>
    </Section>
  );
}
