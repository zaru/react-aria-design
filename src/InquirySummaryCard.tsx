"use client";
import type { ReactNode } from "react";
import { Button as RACButton } from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Card } from "./Card";
import { focusRing } from "./utils";

/**
 * 問い合わせ一覧のサマリーカード
 * - 顧客（+ バッジ） / タイトル / プレビュー / ステータス / カテゴリ / 時刻 / 担当者
 * - `onPress` を渡すと押下可能な Card（react-aria の Button 化）になる
 * - プレビューは 2 行でトランケート
 */
const pressableCard = tv({
  extend: focusRing,
  base: "block w-full text-left cursor-default rounded-[2rem] transition-[transform,filter] duration-200 pressed:scale-[0.995] hover:brightness-[1.02] [-webkit-tap-highlight-color:transparent]",
});

export interface InquirySummaryCardProps {
  customer: ReactNode;
  customerBadge?: ReactNode;
  title: ReactNode;
  preview?: ReactNode;
  status?: ReactNode;
  category?: ReactNode;
  timestamp?: ReactNode;
  assignee?: ReactNode;
  onPress?: () => void;
  className?: string;
  "aria-label"?: string;
}

function CardBody({
  customer,
  customerBadge,
  title,
  preview,
  status,
  category,
  timestamp,
  assignee,
}: Omit<InquirySummaryCardProps, "onPress" | "className" | "aria-label">) {
  return (
    <>
      <header className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <span className="font-sans text-sm font-medium text-glass-800 dark:text-glass-200 truncate">
            {customer}
          </span>
          {customerBadge}
        </div>
        {status && <div className="shrink-0">{status}</div>}
      </header>
      <h3 className="font-sans text-base font-semibold tracking-tight text-glass-950 dark:text-glass-50">
        {title}
      </h3>
      {preview && (
        <p className="font-sans text-sm leading-relaxed text-glass-600 dark:text-glass-400 line-clamp-2">
          {preview}
        </p>
      )}
      {(category || timestamp || assignee) && (
        <footer className="flex items-center justify-between gap-3 min-w-0 pt-1">
          <div className="flex items-center gap-2 min-w-0 text-xs text-glass-500 dark:text-glass-400 font-sans">
            {category && <span className="truncate">{category}</span>}
            {category && timestamp && (
              <span aria-hidden className="text-glass-300 dark:text-glass-600">
                ·
              </span>
            )}
            {timestamp && <span className="shrink-0">{timestamp}</span>}
          </div>
          {assignee && (
            <div className="shrink-0 flex items-center gap-1.5 text-xs text-glass-600 dark:text-glass-300 font-sans">
              {assignee}
            </div>
          )}
        </footer>
      )}
    </>
  );
}

export function InquirySummaryCard({
  onPress,
  className,
  "aria-label": ariaLabel,
  ...content
}: InquirySummaryCardProps) {
  if (onPress) {
    return (
      <RACButton
        onPress={onPress}
        aria-label={ariaLabel}
        className={composeRenderProps("", (renderClassName, renderProps) =>
          pressableCard({ ...renderProps, className: renderClassName }),
        )}
      >
        <Card padding="md" className={twMerge("gap-2", className)}>
          <CardBody {...content} />
        </Card>
      </RACButton>
    );
  }
  return (
    <Card padding="md" className={twMerge("gap-2", className)}>
      <CardBody {...content} />
    </Card>
  );
}
