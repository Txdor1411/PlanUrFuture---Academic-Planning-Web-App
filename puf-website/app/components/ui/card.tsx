import * as React from "react";
import { cn } from "./utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-white/5 p-6 transition-all duration-200",
        "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    />
  );
}
