"use client";
import {
  composeRenderProps,
  SelectionIndicator as RACSelectionIndicator,
  ToggleButton as RACToggleButton,
  ToggleButtonGroup as RACToggleButtonGroup,
  SharedElementTransition,
  type Key,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

/**
 * Apple Liquid Glass セグメンテッドコントロール
 * - `Tabs` と違い 1 つのピル容器に複数セグメント。iOS 標準の Segmented Control 相当
 * - 単一選択・空選択不可がデフォルト。`RadioGroup` 相当のセマンティクスだが、
 *   視覚・操作体系はトグル群に寄せるため `ToggleButtonGroup` をベースに採用
 * - 選択ピルは `SelectionIndicator` で共有要素として描画し、選択移動時にスライド
 */
const group = tv({
  base: [
    "inline-flex p-1 gap-0.5 font-sans rounded-full",
    "border border-black/8 bg-glass-100/70 backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
    "dark:border-white/10 dark:bg-glass-900/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  ].join(" "),
});

const segment = tv({
  extend: focusRing,
  base: [
    "relative inline-flex items-center justify-center min-w-16 h-8 px-4 rounded-full",
    "font-sans text-sm font-medium tracking-tight cursor-default",
    "transition-[color] duration-200",
    "[-webkit-tap-highlight-color:transparent]",
  ].join(" "),
  variants: {
    isSelected: {
      false:
        "text-glass-600 hover:text-glass-900 dark:text-glass-300 dark:hover:text-glass-50",
      true: "text-glass-900 dark:text-glass-50 forced-colors:text-[ButtonText]!",
    },
    isDisabled: {
      true: "cursor-not-allowed text-glass-300 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

const indicator = tv({
  base: [
    "absolute inset-0 -z-10 rounded-full pointer-events-none",
    "bg-linear-to-b from-white/95 to-white/75 dark:from-glass-700/85 dark:to-glass-800/80",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_10px_-4px_rgba(15,23,42,0.25)]",
    "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-8px_rgba(0,0,0,0.55)]",
    "ring-1 ring-black/5 dark:ring-white/10",
    "forced-colors:bg-[ButtonFace]!",
    "transition-[translate] duration-300 ease-out",
  ].join(" "),
});

export interface SegmentedControlProps
  extends Omit<ToggleButtonGroupProps, "selectionMode"> {}

export function SegmentedControl({
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <SharedElementTransition>
      <RACToggleButtonGroup
        selectionMode="single"
        disallowEmptySelection
        {...props}
        className={composeRenderProps(className, (className) =>
          group({ className }),
        )}
      />
    </SharedElementTransition>
  );
}

export interface SegmentedItemProps extends ToggleButtonProps {
  id: Key;
}

export function SegmentedItem({ children, ...props }: SegmentedItemProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        segment({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(children, (resolved) => (
        <>
          <RACSelectionIndicator className={indicator()} />
          {resolved}
        </>
      ))}
    </RACToggleButton>
  );
}
