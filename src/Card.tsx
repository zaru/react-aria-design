"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
  base: "box-border flex min-w-0 max-w-full flex-col font-sans text-glass-900 dark:text-glass-50 isolate overflow-hidden",
  variants: {
    variant: {
      default:
        "rounded-[2rem] ring-1 ring-black/8 shadow-[0_24px_48px_-18px_rgba(15,23,42,0.22),inset_1px_1px_0_rgba(255,255,255,0.65)] bg-linear-to-br from-white/72 via-white/42 to-white/26 backdrop-blur-2xl backdrop-saturate-150 dark:ring-white/12 dark:shadow-[0_28px_56px_-22px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.22)] dark:bg-linear-to-br dark:from-glass-800/72 dark:via-glass-900/52 dark:to-glass-950/48",
      frost:
        "rounded-[2rem] ring-1 ring-black/8 shadow-[0_26px_52px_-18px_rgba(56,189,248,0.14),inset_1px_1px_0_rgba(255,255,255,0.72)] bg-linear-to-br from-white/76 via-frost-50/42 to-white/28 backdrop-blur-2xl backdrop-saturate-150 dark:ring-frost-400/14 dark:shadow-[0_28px_56px_-22px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(186,230,253,0.18)] dark:bg-linear-to-br dark:from-glass-800/62 dark:via-frost-950/38 dark:to-glass-950/46",
      glow: "rounded-[2rem] ring-1 ring-glow-400/28 shadow-[0_28px_56px_-18px_rgba(34,211,238,0.22),inset_1px_1px_0_rgba(255,255,255,0.68)] bg-linear-to-br from-white/68 via-glow-50/34 to-aurora-100/36 backdrop-blur-2xl backdrop-saturate-[1.35] dark:border-transparent dark:ring-glow-400/22 dark:shadow-[0_32px_60px_-22px_rgba(6,182,212,0.18),inset_0_1px_0_rgba(165,243,252,0.18)] dark:bg-linear-to-br dark:from-glass-800/62 dark:via-glow-950/34 dark:to-aurora-950/38",
    },
    padding: {
      none: "gap-0 p-0",
      sm: "gap-3 p-4",
      md: "gap-4 p-6",
      lg: "gap-5 p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export type CardVariantProps = VariantProps<typeof card>;

export interface CardProps
  extends ComponentPropsWithoutRef<"article">,
    CardVariantProps {
  children?: ReactNode;
}

export function Card({
  className,
  variant,
  padding,
  children,
  ...props
}: CardProps) {
  return (
    <article
      {...props}
      className={twMerge(card({ variant, padding }), className)}
      style={{
        cornerShape: "squircle",
      }}
    >
      {children}
    </article>
  );
}

const headerStyles =
  "flex min-w-0 flex-col gap-1.5 border-b border-white/15 pb-4 dark:border-white/8";

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={twMerge(headerStyles, className)} />;
}

const titleStyles =
  "font-semibold text-lg text-glass-950 tracking-tight dark:text-glass-50";

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return <h2 {...props} className={twMerge(titleStyles, className)} />;
}

const descriptionStyles =
  "text-glass-600 text-md leading-relaxed dark:text-glass-400";

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p {...props} className={twMerge(descriptionStyles, className)} />;
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={twMerge("min-w-0 flex-1", className)} />;
}

const footerStyles =
  "flex flex-wrap items-center gap-2 border-t border-white/12 pt-4 dark:border-white/8";

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={twMerge(footerStyles, className)} />;
}
