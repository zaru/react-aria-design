"use client";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  type FieldErrorProps,
  FieldError as RACFieldError,
} from "react-aria-components/FieldError";
import { Group, type GroupProps } from "react-aria-components/Group";
import {
  type InputProps,
  Input as RACInput,
} from "react-aria-components/Input";
import {
  type LabelProps,
  Label as RACLabel,
} from "react-aria-components/Label";
import { Text, type TextProps } from "react-aria-components/Text";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import {
  composeTailwindRenderProps,
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
} from "./utils";

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(fieldLabelStyles(), props.className)}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge(fieldDescriptionStyles(), props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        fieldErrorStyles(),
      )}
    />
  );
}

const inputStyles = tv({
  base: "px-3 py-2 flex-1 min-w-0 border-0 outline outline-0 bg-transparent font-sans text-sm text-glass-900 dark:text-glass-50 placeholder:text-glass-500 dark:placeholder:text-glass-400 disabled:text-glass-400 dark:disabled:text-glass-600 disabled:placeholder:text-glass-300 dark:disabled:placeholder:text-glass-600 [-webkit-tap-highlight-color:transparent]",
});

/** Liquid Glass：FieldGroup/Input 系のアウトライン（-inset でまとわせる） */
const liquidFieldFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] -outline-offset-1",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export const fieldBorderStyles = tv({
  base: "transition",
  variants: {
    isFocusWithin: {
      false:
        "border-black/10 dark:border-white/14 forced-colors:border-[ButtonBorder]",
      true: "border-glow-500/55 dark:border-glow-400/45 forced-colors:border-[Highlight]",
    },
    isInvalid: {
      true: "border-roseglass-500/75 dark:border-roseglass-400/65 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-glass-300/60 dark:border-glass-700/60 forced-colors:border-[GrayText]",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: liquidFieldFocusRing,
  base: [
    "group flex items-center min-h-10 w-full box-border overflow-hidden",
    "rounded-[1.125rem] transition-[box-shadow,background-color,filter] duration-300 [-webkit-tap-highlight-color:transparent]",
    "border-0 ring-1 ring-black/10 backdrop-blur-2xl backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(15,23,42,0.06),0_6px_20px_-12px_rgba(15,23,42,0.15)]",
    "bg-linear-to-b from-white/82 to-white/42",
    "dark:ring-white/14",
    "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.35),0_10px_28px_-14px_rgba(0,0,0,0.55)]",
    "dark:bg-linear-to-b dark:from-glass-800/72 dark:to-glass-950/58",
    "forced-colors:bg-[Field]",
  ].join(" "),
  variants: {
    isFocusWithin: {
      false: "",
      true: "ring-2 ring-glow-500/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_-10px_rgba(45,212,191,0.28)] dark:ring-glow-400/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_14px_36px_-12px_rgba(34,211,238,0.22)]",
    },
    isInvalid: {
      false: "",
      true: "ring-roseglass-500/75 bg-linear-to-b from-roseglass-50/55 to-white/38 dark:from-roseglass-950/42 dark:to-glass-950/52",
    },
    isDisabled: {
      false: "",
      true: "cursor-not-allowed ring-black/6 bg-glass-100/88 saturate-100 shadow-none backdrop-blur-md dark:ring-white/8 dark:bg-glass-900/72",
    },
  },
  compoundVariants: [
    {
      isFocusWithin: true,
      isInvalid: true,
      class:
        "ring-2 ring-roseglass-600/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_32px_-12px_rgba(225,29,72,0.28)] dark:ring-roseglass-400/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_36px_-12px_rgba(251,113,133,0.22)]",
    },
  ],
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(props.className, inputStyles())}
    />
  );
}
