"use client";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "quiet";
}

/** Liquid Glass 向けフォーカス（ビブラントなティール系 glow と整合） */
const liquidFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const button = tv({
  extend: liquidFocusRing,
  base: "relative isolate inline-flex items-center justify-center gap-2 h-9 box-border px-6 py-0 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:w-8 font-sans font-medium text-sm text-center transition-[transform,box-shadow,filter] duration-200 rounded-full cursor-default [-webkit-tap-highlight-color:transparent]",
  variants: {
    variant: {
      primary:
        "text-white ring-1 ring-white/35 backdrop-blur-md backdrop-saturate-125 bg-linear-to-b from-glow-400 via-glow-500 to-glow-500 shadow-[0_12px_28px_-10px_rgba(13,148,136,0.42),inset_0_0_0_1px_rgba(255,255,255,0.22),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.14)] hover:brightness-[1.02] hover:shadow-[0_14px_32px_-10px_rgba(13,148,136,0.48),inset_0_0_0_1px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.12)] pressed:brightness-[0.97] pressed:scale-[0.99] dark:ring-white/22 dark:bg-linear-to-b dark:from-glow-600 dark:via-glow-700 dark:to-glow-800 dark:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.38)] dark:hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.34)]",
      secondary:
        "text-glass-900 ring-1 ring-black/10 backdrop-blur-xl backdrop-saturate-125 bg-white/44 shadow-[0_10px_26px_-14px_rgba(15,23,42,0.14),inset_0_0_0_1px_rgba(255,255,255,0.55),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(15,23,42,0.06)] hover:bg-white/54 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.16),inset_0_0_0_1px_rgba(255,255,255,0.68),inset_0_1px_0_rgba(255,255,255,0.52),inset_0_-1px_0_rgba(15,23,42,0.05)] pressed:bg-white/58 pressed:scale-[0.99] dark:text-glass-50 dark:ring-white/12 dark:bg-glass-800/52 dark:shadow-[0_14px_34px_-16px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,255,255,0.13),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.35)] dark:hover:bg-glass-800/62 dark:hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.52),inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.32)] dark:pressed:bg-glass-800/68",
      destructive:
        "text-white ring-1 ring-white/35 backdrop-blur-md backdrop-saturate-125 bg-linear-to-b from-roseglass-400 via-roseglass-500 to-roseglass-500 shadow-[0_12px_28px_-10px_rgba(190,24,93,0.38),inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.16)] hover:brightness-[1.02] hover:shadow-[0_14px_32px_-10px_rgba(190,24,93,0.44),inset_0_0_0_1px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.14)] pressed:brightness-[0.97] pressed:scale-[0.99] dark:ring-white/20 dark:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.4)] dark:hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.52),inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.36)]",
      quiet:
        "ring-1 ring-transparent bg-transparent text-glass-800 shadow-none backdrop-blur-none hover:bg-white/38 hover:ring-black/8 hover:shadow-[0_8px_22px_-12px_rgba(15,23,42,0.12),inset_0_0_0_1px_rgba(255,255,255,0.55),inset_0_1px_0_rgba(255,255,255,0.42)] hover:backdrop-blur-md pressed:bg-white/46 dark:text-glass-100 dark:hover:bg-glass-900/46 dark:hover:ring-white/10 dark:hover:shadow-[0_10px_26px_-14px_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] dark:pressed:bg-glass-900/54",
    },
    isDisabled: {
      true: "cursor-not-allowed ring-1 ring-black/5 bg-glass-200/85 text-glass-400 shadow-none backdrop-blur-md saturate-100 dark:ring-white/8 dark:bg-glass-900/78 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
    isPending: {
      true: "text-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
  compoundVariants: [
    {
      variant: "quiet",
      isDisabled: true,
      class:
        "ring-transparent bg-transparent hover:ring-transparent hover:bg-transparent hover:shadow-none dark:hover:shadow-none",
    },
  ],
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span
              aria-hidden
              className="flex absolute inset-0 justify-center items-center"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: ローディングスピナーは装飾であり親 span が aria-hidden */}
              <svg
                aria-hidden
                className="w-4 h-4 text-white animate-spin"
                viewBox="0 0 24 24"
                stroke={
                  props.variant === "secondary" || props.variant === "quiet"
                    ? "light-dark(black, white)"
                    : "white"
                }
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
