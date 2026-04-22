"use client";
import { ChevronLeftIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

/**
 * Apple Liquid Glass トップバー（画面ナビゲーション）
 * - 左端の leading 領域（戻るボタン等）+ タイトル + 右端の trailing 領域
 * - `onBack` を渡せば標準の戻るボタンが自動配置される（leading 未指定時）
 * - 下端に薄いガラスの境界線、`sticky` にしても馴染むように半透明背景
 */
export interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  leading?: ReactNode;
  trailing?: ReactNode;
  title?: ReactNode;
  onBack?: () => void;
  /** 戻るボタンの aria-label */
  backLabel?: string;
}

export function TopBar({
  className,
  leading,
  trailing,
  title,
  onBack,
  backLabel = "戻る",
  ...props
}: TopBarProps) {
  const resolvedLeading =
    leading ??
    (onBack ? (
      <Button variant="quiet" aria-label={backLabel} onPress={onBack}>
        <ChevronLeftIcon aria-hidden className="w-5 h-5" />
      </Button>
    ) : null);

  return (
    <header
      {...props}
      className={twMerge(
        [
          "flex items-center gap-2 w-full box-border px-3 h-14 font-sans",
          "border-b border-black/8 dark:border-white/8",
          "bg-white/35 backdrop-blur-2xl backdrop-saturate-150 dark:bg-glass-900/45",
        ].join(" "),
        className,
      )}
    >
      <div className="shrink-0 flex items-center">{resolvedLeading}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="text-base font-semibold tracking-tight text-glass-900 dark:text-glass-50 truncate">
            {title}
          </h1>
        )}
      </div>
      {trailing && <div className="shrink-0 flex items-center">{trailing}</div>}
    </header>
  );
}
