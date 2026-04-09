"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function CTASection() {
  return (
    <Section id="cta">
      <Card className="relative overflow-hidden border-white/20 bg-gradient-to-r from-sky-500/15 via-slate-900 to-fuchsia-500/15 px-6 py-10 sm:px-12 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),transparent_45%)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
              Ești pregătit?
            </p>
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              Începe să-ți construiești viitorul chiar azi
            </h3>
            <p className="max-w-xl text-lg text-slate-200">
              Alătură-te elevilor și studenților care își transformă ambiția în planuri concrete, cu ghidare AI, mentori și etape clare.
            </p>
          </div>
          <motion.a
            href="/auth"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button size="lg" className="shadow-[0_20px_60px_rgba(56,189,248,0.35)]">
              Începe acum
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </motion.a>
        </div>
      </Card>
    </Section>
  );
}
