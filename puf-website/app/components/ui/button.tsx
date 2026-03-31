"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white shadow-[0_10px_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] hover:shadow-[0_12px_45px_rgba(168,85,247,0.35)]",
        ghost:
          "bg-white/5 text-slate-100 border border-white/10 hover:border-white/25 hover:bg-white/10",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonElementProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type AnchorElementProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type ButtonProps = ButtonElementProps | AnchorElementProps;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { className, variant, size, as = "button", ...props },
  ref
) {
  if (as === "a") {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        {...anchorProps}
      />
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonProps}
    />
  );
});
Button.displayName = "Button";
