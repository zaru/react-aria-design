"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Apple Liquid Glass アバター
 * - 画像が無い場合は `name` からイニシャル生成、色はハッシュで決定論的にトーン選択
 * - `tone="auto"` の時のみハッシュ、明示指定時はそのトーンを使用
 * - 背景はガラスの淡い層（左上ハイライト）
 */
const tones = {
  glass:
    "bg-glass-200/80 text-glass-700 dark:bg-glass-700/70 dark:text-glass-200",
  frost:
    "bg-frost-200/80 text-frost-800 dark:bg-frost-800/60 dark:text-frost-200",
  glow: "bg-glow-200/80 text-glow-800 dark:bg-glow-800/60 dark:text-glow-200",
  aurora:
    "bg-aurora-200/80 text-aurora-800 dark:bg-aurora-800/60 dark:text-aurora-200",
  mint: "bg-mint-200/80 text-mint-800 dark:bg-mint-800/60 dark:text-mint-200",
  coral:
    "bg-coral-200/80 text-coral-800 dark:bg-coral-800/60 dark:text-coral-200",
  roseglass:
    "bg-roseglass-200/80 text-roseglass-800 dark:bg-roseglass-800/60 dark:text-roseglass-200",
} as const;

type Tone = keyof typeof tones;
const TONE_KEYS: Tone[] = [
  "frost",
  "glow",
  "aurora",
  "mint",
  "coral",
  "roseglass",
];

const avatar = tv({
  base: "inline-flex items-center justify-center shrink-0 rounded-full font-sans font-medium tracking-tight overflow-hidden select-none ring-1 ring-black/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:ring-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
  variants: {
    size: {
      xs: "w-5 h-5 text-[10px]",
      sm: "w-6 h-6 text-[11px]",
      md: "w-9 h-9 text-sm",
      lg: "w-12 h-12 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AvatarVariantProps = VariantProps<typeof avatar>;

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children">,
    AvatarVariantProps {
  name?: string;
  src?: string;
  alt?: string;
  tone?: Tone | "auto";
  fallback?: ReactNode;
}

function hashTone(input: string): Tone {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return TONE_KEYS[Math.abs(hash) % TONE_KEYS.length];
}

function getInitials(name?: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (!trimmed) return "";
  const asciiParts = trimmed.split(/\s+/).filter(Boolean);
  if (asciiParts.length >= 2) {
    return (asciiParts[0][0] + asciiParts[1][0]).toUpperCase();
  }
  return trimmed[0].toUpperCase();
}

export function Avatar({
  className,
  size,
  name,
  src,
  alt,
  tone = "auto",
  fallback,
  ...props
}: AvatarProps) {
  const resolvedTone: Tone =
    tone === "auto" ? (name ? hashTone(name) : "glass") : tone;
  const initials = getInitials(name);

  const label = alt ?? name;
  const a11y = label
    ? ({ role: "img", "aria-label": label } as const)
    : ({} as const);
  return (
    <span
      {...a11y}
      {...props}
      className={twMerge(avatar({ size }), tones[resolvedTone], className)}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          className="w-full h-full object-cover"
        />
      ) : (
        (fallback ?? initials ?? null)
      )}
    </span>
  );
}
