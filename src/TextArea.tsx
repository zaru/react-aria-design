"use client";
import { TextArea as RACTextArea } from "react-aria-components/TextArea";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components/TextField";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps } from "./utils";

const liquidAreaFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] -outline-offset-1",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const areaStyles = tv({
  extend: liquidAreaFocusRing,
  base: [
    "rounded-[1.125rem] min-h-24 w-full font-sans text-sm py-2 px-4 box-border resize-y transition-[box-shadow,background-color,filter] duration-300 [-webkit-tap-highlight-color:transparent]",
    "border-0 ring-1 ring-black/10 text-glass-900 placeholder:text-glass-500 backdrop-blur-2xl backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(15,23,42,0.06),0_6px_20px_-12px_rgba(15,23,42,0.15)]",
    "bg-linear-to-b from-white/82 to-white/42",
    "dark:ring-white/14 dark:text-glass-50 dark:placeholder:text-glass-400",
    "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.35),0_10px_28px_-14px_rgba(0,0,0,0.55)]",
    "dark:bg-linear-to-b dark:from-glass-800/72 dark:to-glass-950/58",
    "enabled:hover:brightness-[1.015] dark:enabled:hover:brightness-[1.02]",
  ].join(" "),
  variants: {
    isFocused: {
      false: "",
      true: "ring-2 ring-glow-500/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_-10px_rgba(45,212,191,0.28)] dark:ring-glow-400/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_14px_36px_-12px_rgba(34,211,238,0.22)]",
    },
    isInvalid: {
      false: "",
      true: "ring-roseglass-500/75 bg-linear-to-b from-roseglass-50/55 to-white/38 dark:from-roseglass-950/42 dark:to-glass-950/52",
    },
    isDisabled: {
      false: "",
      true: "cursor-not-allowed ring-black/6 bg-glass-100/88 text-glass-400 saturate-100 shadow-none backdrop-blur-md disabled:placeholder:text-glass-300 dark:ring-white/8 dark:bg-glass-900/72 dark:text-glass-600 dark:disabled:placeholder:text-glass-600",
    },
  },
  compoundVariants: [
    {
      isFocused: true,
      isInvalid: true,
      class:
        "ring-2 ring-roseglass-600/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_32px_-12px_rgba(225,29,72,0.28)] dark:ring-roseglass-400/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_36px_-12px_rgba(251,113,133,0.22)]",
    },
  ],
});

export interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextArea({
  label,
  description,
  placeholder,
  rows = 4,
  errorMessage,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1 font-sans",
      )}
    >
      {label && (
        <Label className="text-glass-800 dark:text-glass-100">{label}</Label>
      )}
      <RACTextArea
        placeholder={placeholder}
        rows={rows}
        className={areaStyles}
      />
      {description && (
        <Description className="text-glass-600 dark:text-glass-400">
          {description}
        </Description>
      )}
      <FieldError className="text-roseglass-700 dark:text-roseglass-400 forced-colors:text-[Mark]">
        {errorMessage}
      </FieldError>
    </AriaTextField>
  );
}
