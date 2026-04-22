"use client";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Apple Liquid Glass バッジ（表示専用）
 * - `Tag` は選択・削除のインタラクションが主眼。純表示用は本コンポーネントを使う
 * - variant はドメインセマンティクス、色はカラートークンにマップ
 * - `withDot` は iOS ステータス表示に合わせた先頭のドット
 */
const badge = tv({
  base: "inline-flex items-center gap-1 font-sans font-medium rounded-full max-w-fit whitespace-nowrap border backdrop-blur-md forced-color-adjust-none",
  variants: {
    variant: {
      neutral:
        "bg-white/55 text-glass-700 border-black/10 dark:bg-glass-800/55 dark:text-glass-200 dark:border-white/12",
      enterprise:
        "bg-coral-100/70 text-coral-800 border-coral-400/30 dark:bg-coral-500/18 dark:text-coral-300 dark:border-coral-400/22",
      pending:
        "bg-roseglass-100/70 text-roseglass-800 border-roseglass-400/30 dark:bg-roseglass-500/18 dark:text-roseglass-300 dark:border-roseglass-400/22",
      inProgress:
        "bg-glow-100/70 text-glow-800 border-glow-400/30 dark:bg-glow-500/18 dark:text-glow-300 dark:border-glow-400/22",
      waiting:
        "bg-coral-100/70 text-coral-800 border-coral-400/30 dark:bg-coral-500/18 dark:text-coral-300 dark:border-coral-400/22",
      done: "bg-mint-100/70 text-mint-800 border-mint-400/30 dark:bg-mint-500/18 dark:text-mint-300 dark:border-mint-400/22",
      info: "bg-frost-100/70 text-frost-800 border-frost-400/30 dark:bg-frost-500/18 dark:text-frost-200 dark:border-frost-400/22",
    },
    size: {
      sm: "text-[10px] leading-none px-2 py-0.5",
      md: "text-xs leading-none px-2.5 py-1",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});

const dotColor = {
  neutral: "bg-glass-500 dark:bg-glass-300",
  enterprise: "bg-coral-500 dark:bg-coral-300",
  pending: "bg-roseglass-500 dark:bg-roseglass-300",
  inProgress: "bg-glow-500 dark:bg-glow-300",
  waiting: "bg-coral-500 dark:bg-coral-300",
  done: "bg-mint-500 dark:bg-mint-300",
  info: "bg-frost-500 dark:bg-frost-300",
} as const;

export type BadgeVariantProps = VariantProps<typeof badge>;

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">,
    BadgeVariantProps {
  withDot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  withDot,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant: keyof typeof dotColor = variant ?? "neutral";
  return (
    <span {...props} className={twMerge(badge({ variant, size }), className)}>
      {withDot && (
        <span
          aria-hidden
          className={twMerge(
            "inline-block w-1.5 h-1.5 rounded-full",
            dotColor[resolvedVariant],
          )}
        />
      )}
      {children}
    </span>
  );
}
