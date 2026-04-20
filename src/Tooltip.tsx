"use client";
import type React from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  OverlayArrow,
} from "react-aria-components/Tooltip";
import { tv } from "tailwind-variants";

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode;
}

const styles = tv({
  base:
    "group font-sans text-xs text-white px-3 py-1.5 box-border will-change-transform bg-clip-padding " +
    "rounded-[0.875rem] [corner-shape:squircle] " +
    "bg-glass-900/88 dark:bg-glass-800/90 backdrop-blur-xl backdrop-saturate-[1.6] " +
    "ring-1 ring-white/10 dark:ring-white/8 " +
    "shadow-[0_8px_22px_-8px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] " +
    "dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]",
  variants: {
    isEntering: {
      true: "animate-in fade-in zoom-in-95 placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out fade-out zoom-out-95 placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 ease-in duration-150",
    },
  },
});

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={10}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      <OverlayArrow>
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: 矢印は装飾（ツールチップ本文で意味が伝わる） */}
        <svg
          aria-hidden
          width={8}
          height={8}
          viewBox="0 0 8 8"
          className="block fill-glass-900/88 dark:fill-glass-800/90 forced-colors:fill-[Canvas] stroke-white/10 dark:stroke-white/8 forced-colors:stroke-[ButtonBorder] group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  );
}
