"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Compass,
  GraduationCap,
  LineChart,
  Sparkles,
  Users,
} from "lucide-react";
import { Section } from "./section";
import { Card } from "./ui/card";

const featureList = [
  {
    title: "Foaie de parcurs cu AI",
    description: "Planuri instant care se adaptează obiectivelor, termenelor și ritmului tău de studiu.",
    icon: Sparkles,
  },
  {
    title: "Explorer de universități",
    description: "Descoperă programe din toată lumea cu cerințe, costuri și perspective.",
    icon: Compass,
  },
  {
    title: "Sistem de mentorat",
    description: "Conectează-te cu mentori care îți revizuiesc aplicațiile și te mențin pe drumul bun.",
    icon: Users,
  },
  {
    title: "Monitorizarea activităților",
    description: "Verificări de progres, etape și remindere pe toate dispozitivele.",
    icon: LineChart,
  },
  {
    title: "Calendar inteligent",
    description: "Sincronizează termene, interviuri și sesiuni de studiu într-o singură vedere.",
    icon: CalendarClock,
  },
  {
    title: "Focus pe burse",
    description: "Găsește bursele potrivite cu cerințe și pași adaptați profilului tău.",
    icon: GraduationCap,
  },
];

export function Features() {
  return (
    <Section id="features">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          Ce primești
        </p>
        <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
          Instrumente care îi ajută pe studenți să avanseze
        </h2>
        <p className="max-w-2xl text-lg text-slate-300">
          Fiecare funcționalitate este gândită să elimine fricțiunea, ca tu să te concentrezi pe deciziile potrivite, nu pe tabele.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.05, duration: 0.45, ease: "easeOut" }}
          >
            <Card className="h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-sky-300 ring-1 ring-white/10">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-slate-300">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
