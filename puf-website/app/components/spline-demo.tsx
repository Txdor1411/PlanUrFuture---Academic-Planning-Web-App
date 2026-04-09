"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-300">
      Loading 3D scene...
    </div>
  ),
});

const SPLINE_SCENE_URL = "https://prod.spline.design/0jXA8iqIqlxBCchV/scene.splinecode";

interface SplineDemoProps {
  plain?: boolean;
  heightClassName?: string;
}

export function SplineDemo({ plain = false, heightClassName = "h-[430px]" }: SplineDemoProps) {
  if (plain) {
    return (
      <div className={`w-full ${heightClassName}`}>
        <Spline scene={SPLINE_SCENE_URL} />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.2),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(20,184,166,0.16),transparent_38%)]" />

      <div className={`relative z-10 w-full ${heightClassName}`}>
        <Spline scene={SPLINE_SCENE_URL} />
      </div>
    </div>
  );
}
