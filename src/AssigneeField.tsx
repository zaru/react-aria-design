"use client";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";

/**
 * 担当者表示＋アクションのフィールドカード
 * - アバター + ラベル+名前 + 任意のアクション（変更ボタンなど）
 * - 内部は `Card variant="default" padding="sm"` 相当を直接組成（余白と高さを行サイズに調整）
 * - 未アサイン時は `avatar` に `?` / `name` に「未アサイン」を渡す運用を想定
 */
export interface AssigneeFieldProps extends ComponentPropsWithoutRef<"div"> {
  label?: ReactNode;
  avatar?: ReactNode;
  name: ReactNode;
  action?: ReactNode;
}

export function AssigneeField({
  className,
  label,
  avatar,
  name,
  action,
  ...props
}: AssigneeFieldProps) {
  return (
    <Card
      padding="none"
      className={twMerge(
        "flex flex-row items-center gap-3 px-4 py-3 rounded-[1.25rem]",
        className,
      )}
      {...props}
    >
      {avatar && <span className="shrink-0">{avatar}</span>}
      <div className="flex flex-col min-w-0 flex-1">
        {label && (
          <span className="font-sans text-xs text-glass-500 dark:text-glass-400">
            {label}
          </span>
        )}
        <span className="font-sans text-sm font-medium text-glass-900 dark:text-glass-100 truncate">
          {name}
        </span>
      </div>
      {action && <span className="shrink-0">{action}</span>}
    </Card>
  );
}
