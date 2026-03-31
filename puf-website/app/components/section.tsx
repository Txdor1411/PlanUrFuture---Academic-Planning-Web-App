import { ReactNode } from "react";
import { cn } from "./ui/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("w-full py-16 sm:py-20", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}
