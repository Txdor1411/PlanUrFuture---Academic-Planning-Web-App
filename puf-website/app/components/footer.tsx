import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10" />
            <span className="tracking-tight">PlanFuture</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Link href="#features" className="hover:text-white">
              Funcționalități
            </Link>
            <Link href="#how-it-works" className="hover:text-white">
              Cum funcționează
            </Link>
            <a
              href="/auth"
              className="hover:text-white"
            >
              Platformă
            </a>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="https://github.com" aria-label="GitHub" className="hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} PlanFuture. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
