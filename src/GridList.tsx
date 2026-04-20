"use client";

import type { HTMLAttributes } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  GridList as AriaGridList,
  GridListHeader as AriaGridListHeader,
  GridListItem as AriaGridListItem,
  Button,
  type GridListItemProps,
  type GridListProps,
} from "react-aria-components/GridList";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

const gridListRootStyles = tv({
  base:
    "relative font-sans bg-clip-padding empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm " +
    "rounded-[1.5rem] [corner-shape:squircle] " +
    "ring-1 ring-black/8 dark:ring-white/12 " +
    "shadow-[0_1px_3px_-1px_rgba(15,23,42,0.08),0_10px_24px_-10px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] " +
    "dark:shadow-[0_1px_3px_-1px_rgba(0,0,0,0.45),0_12px_28px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] " +
    "bg-linear-to-br from-white/76 via-white/48 to-white/32 backdrop-blur-2xl backdrop-saturate-[1.5] " +
    "dark:bg-linear-to-br dark:from-glass-800/72 dark:via-glass-900/54 dark:to-glass-950/48",
  variants: {
    orientation: {
      horizontal:
        "flex flex-row flex-nowrap overflow-x-auto w-full max-w-[500px]",
      vertical: "overflow-auto w-[200px]",
    },
  },
});

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  const orientation =
    (props as { orientation?: "horizontal" | "vertical" }).orientation ===
    "horizontal"
      ? "horizontal"
      : "vertical";
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        gridListRootStyles({ orientation }),
      )}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: [
    "relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-glass-900 dark:text-glass-100 border-transparent [corner-shape:squircle] -outline-offset-2 transition-[background-color,background-image,color] duration-150 ease-out",
    "[[data-orientation=vertical]_&]:border-t [[data-orientation=vertical]_&]:border-t-black/6 [[data-orientation=vertical]_&]:dark:border-t-white/8 [[data-orientation=vertical]_&]:first:border-t-0 [[data-orientation=vertical]_&]:first:rounded-t-[1.35rem] [[data-orientation=vertical]_&]:last:rounded-b-[1.35rem]",
    "[[data-orientation=horizontal]_&]:border-l [[data-orientation=horizontal]_&]:border-l-black/6 [[data-orientation=horizontal]_&]:dark:border-l-white/8 [[data-orientation=horizontal]_&]:first:border-l-0 [[data-orientation=horizontal]_&]:first:rounded-s-[1.35rem] [[data-orientation=horizontal]_&]:last:rounded-e-[1.35rem] [[data-orientation=horizontal]_&]:flex-shrink-0",
  ].join(" "),
  variants: {
    isSelected: {
      false:
        "hover:bg-white/55 pressed:bg-white/68 dark:hover:bg-glass-800/55 dark:pressed:bg-glass-800/68",
      true: [
        "text-white z-20",
        "[background-image:linear-gradient(rgba(0,122,255,.9),rgba(0,122,255,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)]",
        "[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06)]",
        "dark:[background-image:linear-gradient(rgba(0,122,255,.82),rgba(0,122,255,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)]",
        "dark:[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05)]",
        "hover:brightness-[1.05] pressed:brightness-[0.96]",
        "forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "[[data-orientation=vertical]_&]:border-y-transparent [[data-orientation=vertical]_&+[data-selected]]:border-t-white/25",
        "[[data-orientation=horizontal]_&]:border-x-transparent [[data-orientation=horizontal]_&+[data-selected]]:border-l-white/25",
        "-outline-offset-4 outline-white dark:outline-white forced-colors:outline-[HighlightText]",
      ].join(" "),
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText] z-10",
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        ),
      )}
    </AriaGridListItem>
  );
}

const gridListHeaderStyles = tv({
  base: "text-xs font-semibold uppercase tracking-wider text-glass-600 dark:text-glass-300 px-4 py-1.5 -mt-px z-10 bg-white/45 dark:bg-glass-900/45 backdrop-blur-lg backdrop-saturate-[1.4] supports-[-moz-appearance:none]:bg-white border-y border-y-black/8 dark:border-y-white/10",
});

export function GridListHeader({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <AriaGridListHeader
      {...props}
      className={twMerge(gridListHeaderStyles(), props.className)}
    >
      {children}
    </AriaGridListHeader>
  );
}

export type { GridListProps } from "react-aria-components/GridList";
