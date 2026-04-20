"use client";

import { ChevronRight } from "lucide-react";
import {
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  type TreeItemProps as AriaTreeItemProps,
  Button,
  type TreeProps,
} from "react-aria-components/Tree";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

const itemStyles = tv({
  extend: focusRing,
  base: "relative font-sans flex group gap-3 cursor-default select-none py-1.5 px-3 text-sm text-glass-900 dark:text-glass-100 border-t border-t-black/6 dark:border-t-white/8 border-transparent first:border-t-0 -outline-offset-2 first:rounded-t-[1.35rem] last:rounded-b-[1.35rem] transition-[background-color,box-shadow,color] duration-150 ease-out",
  variants: {
    isSelected: {
      false:
        "hover:bg-white/55 pressed:bg-white/68 dark:hover:bg-glass-800/55 dark:pressed:bg-glass-800/68",
      true: "bg-glow-400/18 dark:bg-glow-500/22 hover:bg-glow-400/26 pressed:bg-glow-400/32 dark:hover:bg-glow-500/30 dark:pressed:bg-glow-500/36 border-y-glow-400/30 dark:border-y-glow-500/28 z-20",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText] z-10",
    },
  },
});

export function Tree<T extends object>({ children, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "w-48 max-w-full overflow-auto relative font-sans bg-clip-padding " +
          "rounded-[1.5rem] [corner-shape:squircle] " +
          "ring-1 ring-black/8 dark:ring-white/12 " +
          "shadow-[0_1px_3px_-1px_rgba(15,23,42,0.08),0_10px_24px_-10px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] " +
          "dark:shadow-[0_1px_3px_-1px_rgba(0,0,0,0.45),0_12px_28px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] " +
          "bg-linear-to-br from-white/76 via-white/48 to-white/32 backdrop-blur-2xl backdrop-saturate-[1.5] " +
          "dark:bg-linear-to-br dark:from-glass-800/72 dark:via-glass-900/54 dark:to-glass-950/48",
      )}
    >
      {children}
    </AriaTree>
  );
}

const expandButton = tv({
  extend: focusRing,
  base: "border-0 p-0 bg-transparent shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-start cursor-default [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

const chevron = tv({
  base: "w-4.5 h-4.5 text-glass-500 dark:text-glass-400 transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-90",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export interface TreeItemProps extends Partial<AriaTreeItemProps> {
  title: string;
}

export function TreeItem(props: TreeItemProps) {
  return (
    <AriaTreeItem className={itemStyles} textValue={props.title} {...props}>
      <AriaTreeItemContent {...props}>
        {({
          selectionMode,
          selectionBehavior,
          hasChildItems,
          isExpanded,
          isDisabled,
        }) => (
          <div className={`flex items-center`}>
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            <div className="shrink-0 w-[calc(calc(var(--tree-item-level)_-_1)_*_calc(var(--spacing)_*_3))]" />
            {hasChildItems ? (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <ChevronRight
                  aria-hidden
                  className={chevron({ isExpanded, isDisabled })}
                />
              </Button>
            ) : (
              <div className="shrink-0 w-8 h-8" />
            )}
            {props.title}
          </div>
        )}
      </AriaTreeItemContent>
      {props.children}
    </AriaTreeItem>
  );
}

export type { TreeProps } from "react-aria-components/Tree";
