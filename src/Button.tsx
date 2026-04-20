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

/** Liquid Glass フォーカスリング（iOS Blue glow 相当） */
const liquidFocusRing = tv({
  base: "outline outline-glow-500 dark:outline-glow-400 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

/**
 * Apple Liquid Glass ボタン（左上光源モデル）
 * - 2 層 background-image + `background-clip: padding-box, border-box` で
 *   透明 border にガラスの縁光（135deg グラデ）を描く。
 * - 内側シャドウは左上ハイライト（+x/+y 正方向）、
 *   外側シャドウは右下に落とす（光源: 左上・上方）。
 */
const button = tv({
  extend: liquidFocusRing,
  base: "relative isolate inline-flex items-center justify-center gap-2 h-11 box-border px-7 py-0 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-11 [&:has(>svg:only-child)]:w-11 font-sans font-medium text-sm leading-none tracking-[-0.01em] text-center rounded-full border border-transparent cursor-default [-webkit-tap-highlight-color:transparent] [background-origin:border-box] [background-clip:padding-box,border-box] transition-[transform,box-shadow,filter,background-color,background-image] duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
  variants: {
    variant: {
      primary:
        "text-white backdrop-blur-[20px] backdrop-saturate-200 [background-clip:border-box,border-box] [background-image:linear-gradient(rgba(0,122,255,.9),rgba(0,122,255,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)] shadow-[inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06),3px_4px_12px_rgba(0,122,255,.25),6px_10px_20px_rgba(0,0,0,.1)] hover:brightness-[1.05] dark:[background-image:linear-gradient(rgba(0,122,255,.82),rgba(0,122,255,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05),3px_4px_14px_rgba(0,122,255,.45),6px_10px_22px_rgba(0,0,0,.4)]",
      secondary:
        "text-glass-900 backdrop-blur-[20px] backdrop-saturate-[1.8] [background-image:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,.55)),linear-gradient(135deg,rgba(255,255,255,.95)_0%,rgba(255,255,255,.4)_45%,rgba(255,255,255,.3)_55%,rgba(255,255,255,.75)_100%)] shadow-[inset_1px_1px_1px_rgba(255,255,255,.9),inset_-1px_-1px_2px_rgba(255,255,255,.5),inset_2px_2px_4px_rgba(255,255,255,.3),3px_4px_10px_rgba(0,0,0,.08),6px_10px_24px_rgba(0,0,0,.06)] hover:brightness-[1.04] dark:text-glass-50 dark:[background-image:linear-gradient(rgba(60,60,65,.6),rgba(60,60,65,.6)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.08)_45%,rgba(255,255,255,.05)_55%,rgba(255,255,255,.22)_100%)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.14),inset_2px_2px_4px_rgba(255,255,255,.1),3px_4px_12px_rgba(0,0,0,.4),6px_10px_26px_rgba(0,0,0,.28)]",
      destructive:
        "text-white backdrop-blur-[20px] backdrop-saturate-200 [background-clip:border-box,border-box] [background-image:linear-gradient(rgba(255,59,48,.9),rgba(255,59,48,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)] shadow-[inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06),3px_4px_12px_rgba(255,59,48,.25),6px_10px_20px_rgba(0,0,0,.1)] hover:brightness-[1.05] dark:[background-image:linear-gradient(rgba(255,59,48,.82),rgba(255,59,48,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05),3px_4px_14px_rgba(255,59,48,.45),6px_10px_22px_rgba(0,0,0,.4)]",
      quiet:
        "text-glass-900 bg-transparent shadow-none [background-image:none] hover:backdrop-blur-[20px] hover:backdrop-saturate-[1.8] hover:[background-image:linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,.4)),linear-gradient(135deg,rgba(255,255,255,.9)_0%,rgba(255,255,255,.35)_45%,rgba(255,255,255,.25)_55%,rgba(255,255,255,.65)_100%)] hover:shadow-[inset_1px_1px_1px_rgba(255,255,255,.8),inset_-1px_-1px_2px_rgba(255,255,255,.4),3px_4px_10px_rgba(0,0,0,.06),6px_10px_18px_rgba(0,0,0,.05)] dark:text-glass-50 dark:hover:[background-image:linear-gradient(rgba(60,60,65,.5),rgba(60,60,65,.5)),linear-gradient(135deg,rgba(255,255,255,.25)_0%,rgba(255,255,255,.08)_45%,rgba(255,255,255,.05)_55%,rgba(255,255,255,.18)_100%)] dark:hover:shadow-[inset_1px_1px_1px_rgba(255,255,255,.25),inset_-1px_-1px_2px_rgba(255,255,255,.1),3px_4px_10px_rgba(0,0,0,.3),6px_10px_18px_rgba(0,0,0,.25)]",
    },
    isDisabled: {
      false: "pressed:scale-[0.97]",
      true: "cursor-not-allowed text-glass-400 bg-glass-200/70 [background-image:none] shadow-none backdrop-blur-md saturate-100 dark:text-glass-600 dark:bg-glass-800/55 forced-colors:text-[GrayText]",
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
      class: "bg-transparent dark:bg-transparent shadow-none",
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
                className="w-4 h-4 animate-spin"
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
