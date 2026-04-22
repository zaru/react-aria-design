"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * ページトップの挨拶ヘッダー
 * - 「お疲れさまです、田中さん」のような呼びかけと、その下のサマリ（件数など）
 * - タイトルは視覚的な重みを持つが h1 相当として意味付けされる
 * - `summary` はテキスト/カウントなど ReactNode で自由に
 */
export interface PageGreetingProps extends ComponentPropsWithoutRef<"section"> {
  greeting: ReactNode;
  summary?: ReactNode;
  /** タイトルに紐付ける視覚要素（アバターなど）。右上に配置 */
  trailing?: ReactNode;
}

export function PageGreeting({
  className,
  greeting,
  summary,
  trailing,
  ...props
}: PageGreetingProps) {
  return (
    <section
      {...props}
      className={twMerge("flex items-start gap-3 font-sans", className)}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-glass-950 dark:text-glass-50">
          {greeting}
        </h1>
        {summary && (
          <p className="text-sm text-glass-600 dark:text-glass-400">
            {summary}
          </p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </section>
  );
}
