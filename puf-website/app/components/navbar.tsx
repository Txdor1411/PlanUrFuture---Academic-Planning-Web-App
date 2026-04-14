"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const links = [
  { href: "/universities", label: "Universitati" },
  { href: "/activities", label: "Activitati" },
  { href: "/calendar", label: "Calendar" },
  { href: "#features", label: "Funcționalități" },
  { href: "#how-it-works", label: "Cum funcționează" },
];

export function Navbar() {
  return (
    <motion.nav
      className="sticky top-0 z-40 w-full backdrop-blur-xl"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="#" className="flex items-center gap-3 text-sm font-semibold text-white">
          <Image
            src="/puff_logo_gradient-removebg-preview.png"
            alt="PUF logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="tracking-tight">Plan Ur Future</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="group relative font-medium transition-colors hover:text-white"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-full scale-x-0 bg-gradient-to-r from-sky-400 to-fuchsia-500 transition-transform duration-200 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href="/auth"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button size="md" className="shadow-[0_12px_40px_rgba(56,189,248,0.25)]">
              Începe acum
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
