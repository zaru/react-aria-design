"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

/**
 * メタ情報ラベル（非インタラクティブ）
 * - 「カテゴリ 障害報告」「状態 ● 未対応」のようなラベル+値の読み物表示
 * - 枠や背景を持たず、隣接するボタンやタグと明確に区別する
 * - `dot` を渡すとラベルと値の間に色付きドットを差し込める
 */
const pill = tv({
  base: "inline-flex items-center gap-1.5 max-w-fit font-sans text-xs",
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
