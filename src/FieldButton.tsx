"use client";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "icon";
}

const button = tv({
  extend: focusRing,
  base: "relative inline-flex items-center border-0 font-sans text-sm text-center transition rounded-full cursor-default p-1 flex items-center justify-center text-glass-500 bg-transparent hover:bg-black/5 pressed:bg-black/10 dark:text-glass-300 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "bg-transparent dark:bg-transparent text-glass-300 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export function FieldButton(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className }),
      )}
    >
      {props.children}
    </RACButton>
  );
}
