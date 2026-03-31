"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react";
import { Section } from "./section";
import { Card } from "./ui/card";

const steps = [
  {
    title: "Create your profile",
    description: "Share your interests, target programs, and timeline.",
    icon: Sparkles,
  },
  {
    title: "Get your personalized plan",
    description: "AI builds a roadmap with tasks, resources, and milestones.",
    icon: Target,
  },
  {
    title: "Track progress and succeed",
    description: "Stay on track with reminders, mentor feedback, and wins.",
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="pt-8">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300/80">
          How it works
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          From idea to acceptance in three steps
        </h2>
        <p className="max-w-2xl text-lg text-slate-300">
          We keep the flow simple—clarity first, then action, then momentum.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <Card className="relative h-full overflow-hidden">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-slate-300">Step {idx + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-slate-300">{step.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
