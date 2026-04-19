"use client";
import type React from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  OverlayArrow,
} from "react-aria-components/Popover";
import { tv } from "tailwind-variants";

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  showArrow?: boolean;
  children: React.ReactNode;
}

const styles = tv({
  base:
    "font-sans isolate text-glass-900 dark:text-glass-50 outline-0 bg-clip-padding will-change-transform " +
    "rounded-[1.75rem] [corner-shape:squircle] " +
    "ring-1 ring-black/8 dark:ring-white/12 " +
    "shadow-[0_2px_6px_-2px_rgba(15,23,42,0.1),0_14px_34px_-10px_rgba(15,23,42,0.18),0_36px_72px_-22px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.78),inset_1px_0_0_rgba(255,255,255,0.45),inset_-1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(15,23,42,0.06)] " +
    "dark:shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5),0_16px_36px_-12px_rgba(0,0,0,0.55),0_40px_82px_-26px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.22),inset_1px_0_0_rgba(255,255,255,0.1),inset_-1px_0_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.32)] " +
    "bg-linear-to-br from-white/78 via-white/46 to-white/30 backdrop-blur-2xl backdrop-saturate-[1.8] " +
    "dark:bg-linear-to-br dark:from-glass-800/74 dark:via-glass-900/56 dark:to-glass-950/52 " +
    "forced-colors:bg-[Canvas] forced-colors:ring-1 forced-colors:ring-[ButtonBorder]",
  variants: {
    isEntering: {
      true: "animate-in fade-in zoom-in-95 placement-bottom:slide-in-from-top-2 placement-top:slide-in-from-bottom-2 placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out fade-out zoom-out-95 placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 ease-in duration-150",
    },
  },
});

export function Popover({
  children,
  showArrow,
  className,
  ...props
}: PopoverProps) {
  const offset = showArrow ? 12 : 8;
  return (
    <AriaPopover
      offset={offset}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: 矢印は装飾（オーバーレイの見た目用） */}
          <svg
            aria-hidden
            width={14}
            height={14}
            viewBox="0 0 14 14"
            className="block fill-white/88 dark:fill-glass-900/88 forced-colors:fill-[Canvas] stroke-[0.75] stroke-black/10 dark:stroke-white/12 forced-colors:stroke-[ButtonBorder] drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)] dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.14)] group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
          >
            <path
              d="M0 0 C 3.2 0.1, 4.6 7, 7 7 C 9.4 7, 10.8 0.1, 14 0"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  );
}
