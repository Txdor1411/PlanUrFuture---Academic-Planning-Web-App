"use client";

import { motion } from "framer-motion";
import { SplineDemo } from "@/app/components/spline-demo";
import { SplineDemo2 } from "@/app/components/spline-demo-2";

export default function VisualisePage() {
  return (
    <div className="relative flex flex-col bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-[-10%] h-80 bg-[radial-gradient(circle,_rgba(56,189,248,0.18)_0%,_transparent_50%)] blur-3xl pointer-events-none" />

      {/* Hero section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
              Explorează visual
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              O trecere interactivă prin platforma PUF, construită cu tehnologie 3D imersivă.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Spline scene - pinned while scrolling */}
      <section className="relative w-full h-[180vh]">
        <div className="sticky top-0 h-screen w-full">
          <SplineDemo2 plain heightClassName="h-screen" />
        </div>
      </section>

      {/* Second Spline scene - pinned while scrolling */}
      <section className="relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen w-full">
          <SplineDemo plain heightClassName="h-screen" />
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 w-full py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[.02] p-12 text-center"
          >
            <h2 className="text-3xl font-semibold">Gata să începi?</h2>
            <p className="mt-3 text-slate-300">
              Gestionează-ți aplicațiile și planul într-un loc.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-lg">
                Crează cont
              </button>
              <button className="rounded-lg border border-white/20 px-8 py-3 font-semibold transition-all hover:bg-white/5">
                Afla mai mult
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
