"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * 中央にテキストを持つ水平区切り線
 * - タイムライン内の受信時刻など、視覚的な区切りと軽い情報を兼ねる
 * - `role="separator"` で `aria-label` にテキストを反映
 */
export interface SectionDividerProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children?: ReactNode;
  /** テキスト省略時の装飾のみ区切り */
  decorative?: boolean;
}

export function SectionDivider({
  className,
  children,
  decorative,
  ...props
}: SectionDividerProps) {
  const label =
    !decorative &&
    (typeof children === "string" || typeof children === "number")
      ? String(children)
      : undefined;

  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "separator", "aria-label": label } as const);

  return (
    <div
      {...a11y}
      {...props}
      className={twMerge(
        "flex items-center gap-3 w-full font-sans text-xs text-glass-500 dark:text-glass-400 select-none",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex-1 h-px bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/10"
      />
      {children && <span className="whitespace-nowrap">{children}</span>}
      <span
        aria-hidden
        className="flex-1 h-px bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/10"
      />
    </div>
  );
}
