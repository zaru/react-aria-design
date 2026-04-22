"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Apple Liquid Glass メッセージバブル
 * - チャット/タイムラインの発話一単位。Avatar + 送信者 + 時刻 + 吹き出し本文を束ねる
 * - `align="start"` は相手の発話、`align="end"` は自分の発話（iOS Messages 風）
 * - 吹き出しは `Card` と同等のガラスマテリアル。ただし角丸と最大幅を会話向けに調整
 */
const bubble = tv({
  base: [
    "relative isolate inline-block max-w-[34rem] box-border font-sans text-sm leading-relaxed",
    "px-4 py-3 rounded-[1.4rem] ring-1 overflow-hidden",
    "backdrop-blur-2xl backdrop-saturate-150",
  ].join(" "),
  variants: {
    align: {
      start: "rounded-tl-md",
      end: "rounded-tr-md",
    },
    variant: {
      default: [
        "ring-black/8 text-glass-900",
        "bg-linear-to-br from-white/78 via-white/48 to-white/30",
        "shadow-[0_14px_30px_-18px_rgba(15,23,42,0.2),inset_1px_1px_0_rgba(255,255,255,0.65)]",
        "dark:ring-white/12 dark:text-glass-50",
        "dark:bg-linear-to-br dark:from-glass-800/72 dark:via-glass-900/52 dark:to-glass-950/48",
        "dark:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.18)]",
      ].join(" "),
      frost: [
        "ring-frost-400/20 text-glass-900",
        "bg-linear-to-br from-white/72 via-frost-50/48 to-white/32",
        "shadow-[0_14px_30px_-18px_rgba(56,189,248,0.18),inset_1px_1px_0_rgba(255,255,255,0.7)]",
        "dark:ring-frost-400/18 dark:text-glass-50",
        "dark:bg-linear-to-br dark:from-glass-800/62 dark:via-frost-950/42 dark:to-glass-950/52",
      ].join(" "),
      glow: [
        "ring-glow-400/35 text-white",
        "bg-linear-to-br from-glow-400/92 via-glow-500/92 to-glow-600/94",
        "shadow-[0_16px_32px_-18px_rgba(0,122,255,0.4),inset_1px_1px_0_rgba(255,255,255,0.28)]",
        "dark:ring-glow-400/28",
        "dark:bg-linear-to-br dark:from-glow-500/92 dark:via-glow-600/92 dark:to-glow-700/94",
      ].join(" "),
    },
  },
  defaultVariants: {
    align: "start",
    variant: "default",
  },
});

export type MessageBubbleVariantProps = VariantProps<typeof bubble>;

export interface MessageBubbleProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    MessageBubbleVariantProps {
  avatar?: ReactNode;
  senderName?: ReactNode;
  timestamp?: ReactNode;
  children: ReactNode;
}

export function MessageBubble({
  className,
  avatar,
  senderName,
  timestamp,
  align = "start",
  variant,
  children,
  ...props
}: MessageBubbleProps) {
  const isEnd = align === "end";
  return (
    <div
      {...props}
      className={twMerge(
        "flex flex-col gap-1.5 min-w-0",
        isEnd ? "items-end pl-10" : "items-start pr-10",
        className,
      )}
    >
      {(avatar || senderName || timestamp) && (
        <div
          className={twMerge(
            "flex items-center gap-2 min-w-0 text-glass-600 dark:text-glass-400 text-xs font-sans",
            isEnd && "flex-row-reverse",
          )}
        >
          {avatar}
          {senderName && (
            <span className="font-medium text-glass-700 dark:text-glass-200 truncate">
              {senderName}
            </span>
          )}
          {senderName && timestamp && (
            <span aria-hidden className="text-glass-400 dark:text-glass-500">
              ·
            </span>
          )}
          {timestamp && <span className="shrink-0">{timestamp}</span>}
        </div>
      )}
      <div className={bubble({ align, variant })}>{children}</div>
    </div>
  );
}
