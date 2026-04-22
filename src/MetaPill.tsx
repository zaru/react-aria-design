"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

/**
 * Apple Liquid Glass メタピル
 * - 「カテゴリ 障害報告」「状態 ● 未対応」のようなラベル+値の組み合わせ表示
 * - ラベルは弱コントラスト、値は主コントラストで情報階層を作る
 * - `dot` を渡すとラベルと値の間に色付きドットを差し込める
 */
const pill = tv({
  base: [
    "inline-flex items-center gap-1.5 max-w-fit font-sans text-xs px-3 py-1 rounded-full",
    "border border-black/10 bg-white/55 backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
    "dark:border-white/12 dark:bg-glass-800/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  ].join(" "),
});

export interface MetaPillProps extends ComponentPropsWithoutRef<"span"> {
  label: ReactNode;
  value: ReactNode;
  dot?: ReactNode;
}

export function MetaPill({
  className,
  label,
  value,
  dot,
  ...props
}: MetaPillProps) {
  return (
    <span {...props} className={twMerge(pill(), className)}>
      <span className="text-glass-500 dark:text-glass-400">{label}</span>
      {dot}
      <span className="font-medium text-glass-900 dark:text-glass-100">
        {value}
      </span>
    </span>
  );
}
