"use client";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  ToggleButton as RACToggleButton,
  type ToggleButtonProps,
} from "react-aria-components/ToggleButton";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

const styles = tv({
  extend: focusRing,
  base: "relative inline-flex items-center justify-center gap-2 h-9 box-border px-3.5 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:aspect-square font-sans text-sm text-center transition-[background-color,color,box-shadow] duration-150 ease-out rounded-full cursor-default forced-color-adjust-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isSelected: {
      false:
        "ring-1 ring-black/10 dark:ring-white/12 bg-white/55 hover:bg-white/65 pressed:bg-white/72 text-glass-900 backdrop-blur-md dark:bg-glass-800/55 dark:hover:bg-glass-800/65 dark:pressed:bg-glass-800/72 dark:text-glass-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] forced-colors:bg-[ButtonFace]! forced-colors:text-[ButtonText]!",
      true: "text-white backdrop-blur-[20px] backdrop-saturate-200 [background-clip:border-box,border-box] [background-image:linear-gradient(rgba(0,122,255,.9),rgba(0,122,255,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)] shadow-[inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06),3px_4px_12px_rgba(0,122,255,.25),6px_10px_20px_rgba(0,0,0,.1)] hover:brightness-[1.05] dark:[background-image:linear-gradient(rgba(0,122,255,.82),rgba(0,122,255,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05),3px_4px_14px_rgba(0,122,255,.45),6px_10px_22px_rgba(0,0,0,.4)] forced-colors:bg-[Highlight]! forced-colors:text-[HighlightText]!",
    },
    isDisabled: {
      true: "ring-transparent dark:ring-transparent bg-glass-100/70 dark:bg-glass-900/60 shadow-none dark:shadow-none forced-colors:bg-[ButtonFace]! text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]!",
    },
  },
});

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    />
  );
}

export type { ToggleButtonProps };
