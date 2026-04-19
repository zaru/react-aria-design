"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
  base: "box-border flex min-w-0 max-w-full flex-col font-sans text-glass-900 shadow-xl dark:text-glass-50 dark:shadow-black/40",
  variants: {
    variant: {
      default:
        "rounded-3xl border border-white/50 bg-white/35 shadow-glass-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-glass-900/40",
      frost:
        "rounded-3xl border border-white/45 bg-linear-to-br from-white/40 via-frost-50/35 to-white/28 shadow-frost-900/10 backdrop-blur-xl dark:border-white/12 dark:from-glass-800/45 dark:via-frost-950/30 dark:to-glass-900/38",
      glow: "rounded-3xl border border-glow-200/45 bg-linear-to-br from-white/45 via-glow-50/25 to-aurora-50/30 shadow-glow-900/15 ring-1 ring-glow-500/15 backdrop-blur-xl dark:border-glow-500/20 dark:from-glass-800/48 dark:via-glow-950/28 dark:to-aurora-950/28 dark:ring-glow-400/18",
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
    >
      {children}
    </article>
  );
}

const headerStyles =
  "flex min-w-0 flex-col gap-1.5 border-b border-white/25 pb-4 dark:border-white/10";

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
  "text-glass-600 text-sm leading-relaxed dark:text-glass-400";

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
  "flex flex-wrap items-center gap-2 border-t border-white/20 pt-4 dark:border-white/10";

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={twMerge(footerStyles, className)} />;
}
