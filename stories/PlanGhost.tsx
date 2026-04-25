import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type Plan = "enterprise" | "pro" | "free";

const colors: Record<Plan, string> = {
  enterprise: "text-coral-700/90 dark:text-coral-300/90",
  pro: "text-aurora-700/90 dark:text-aurora-300/90",
  free: "text-glass-500 dark:text-glass-400",
};

/**
 * プランラベル（属性）— 塗りなしのゴースト表示
 * 役割: ステータスピル（塗り+ドット）と視覚的に明確に区別するため、
 * プランは属性注釈として小さな大文字テキストで控えめに表現する。
 */
export function PlanGhost({
  plan = "enterprise",
  children,
}: {
  plan?: Plan;
  children: ReactNode;
}) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.08em]",
        colors[plan],
      )}
    >
      {children}
    </span>
  );
}
