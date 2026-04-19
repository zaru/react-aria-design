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

/** Glassmorphism 向けフォーカスリング（パレットの glow に整合） */
const glassFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const button = tv({
  extend: glassFocusRing,
  base: "relative inline-flex items-center justify-center gap-2 h-9 box-border px-3.5 py-0 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:w-8 font-sans font-medium text-sm text-center transition-all duration-200 rounded-full cursor-default [-webkit-tap-highlight-color:transparent]",
  variants: {
    variant: {
      primary:
        "border border-white/35 bg-glow-500/90 shadow-lg shadow-glow-600/25 backdrop-blur-md text-white hover:bg-glow-600/92 pressed:bg-glow-700/95 dark:border-white/20 dark:bg-glow-500/88 dark:shadow-black/25",
      secondary:
        "border border-glass-edge bg-white/45 shadow-sm backdrop-blur-md text-glass-800 hover:bg-white/58 pressed:bg-white/68 dark:border-white/15 dark:bg-glass-800/50 dark:text-glass-100 dark:hover:bg-glass-800/62 dark:pressed:bg-glass-800/72",
      destructive:
        "border border-white/30 bg-roseglass-600/90 shadow-lg shadow-roseglass-800/25 backdrop-blur-md text-white hover:bg-roseglass-700/92 pressed:bg-roseglass-800/95 dark:border-white/15 dark:bg-roseglass-600/88",
      quiet:
        "border border-transparent bg-transparent hover:border-white/25 hover:bg-white/40 hover:backdrop-blur-md pressed:bg-white/52 text-glass-800 dark:text-glass-100 dark:hover:border-white/10 dark:hover:bg-glass-800/45 dark:pressed:bg-glass-800/58",
    },
    isDisabled: {
      true: "cursor-not-allowed border-white/35 bg-glass-200/80 text-glass-400 shadow-none backdrop-blur-sm dark:border-white/10 dark:bg-glass-900/75 dark:text-glass-600 forced-colors:text-[GrayText]",
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
        "border-transparent bg-transparent hover:border-transparent dark:border-transparent dark:bg-transparent dark:hover:border-transparent",
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
