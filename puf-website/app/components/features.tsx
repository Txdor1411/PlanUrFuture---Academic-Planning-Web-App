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
    title: "AI-powered roadmap",
    description: "Instant plans that adapt to your goals, deadlines, and study pace.",
    icon: Sparkles,
  },
  {
    title: "University explorer",
    description: "Discover programs worldwide with requirements, costs, and outcomes.",
    icon: Compass,
  },
  {
    title: "Mentorship system",
    description: "Pair with mentors who review applications and keep you accountable.",
    icon: Users,
  },
  {
    title: "Activity tracking",
    description: "Progress check-ins, milestones, and reminders across devices.",
    icon: LineChart,
  },
  {
    title: "Smart calendar",
    description: "Sync deadlines, interviews, and study blocks in one smart view.",
    icon: CalendarClock,
  },
  {
    title: "Scholarship focus",
    description: "Surface best-fit scholarships with tailored requirements and steps.",
    icon: GraduationCap,
  },
];

export function Features() {
  return (
    <Section id="features">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          What you get
        </p>
        <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
          Tools that move students forward
        </h2>
        <p className="max-w-2xl text-lg text-slate-300">
          Every feature is designed to remove friction—so you can focus on making the right decisions, not managing spreadsheets.
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
