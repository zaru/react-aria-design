"use client";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components/TextField";
import { tv } from "tailwind-variants";
import { Description, FieldError, Input, Label } from "./Field";
import { composeTailwindRenderProps } from "./utils";

/** Glassmorphism 向けフォーカスリング（Button と同系統） */
const glassFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const inputStyles = tv({
  extend: glassFocusRing,
  base: [
    "border-1 rounded-xl min-h-9 w-full font-sans text-sm py-0 px-3 box-border transition [-webkit-tap-highlight-color:transparent]",
    "border border-glass-300/80 bg-white/45 text-glass-900 shadow-inner shadow-white/25 backdrop-blur-md",
    "placeholder:text-glass-500 dark:border-white/25 dark:bg-glass-800/48 dark:text-glass-50 dark:shadow-inner dark:shadow-black/20 dark:placeholder:text-glass-400",
    /* hover：白の半透明枠は背景に溶けるため、glass 階調の境界で輪郭を保つ */
    "enabled:hover:border-glass-500 enabled:hover:bg-white/52 enabled:hover:shadow-inner",
    "dark:enabled:hover:border-glass-400 dark:enabled:hover:bg-glass-800/60",
  ].join(" "),
  variants: {
    isFocused: {
      false: "",
      true: "border-glow-500 bg-white/65 shadow-md shadow-glow-600/20 dark:border-glow-400 dark:bg-glass-800/62 dark:shadow-black/30",
    },
    isInvalid: {
      false: "",
      true: "border-roseglass-500 bg-roseglass-50/35 dark:border-roseglass-500 dark:bg-roseglass-950/35",
    },
    isDisabled: {
      false: "",
      true: "cursor-not-allowed border-glass-300/80 bg-glass-100/75 text-glass-400 shadow-none backdrop-blur-sm disabled:placeholder:text-glass-300 dark:border-glass-700 dark:bg-glass-900/68 dark:text-glass-600 dark:disabled:placeholder:text-glass-600",
    },
  },
  compoundVariants: [
    {
      isFocused: true,
      isInvalid: true,
      class:
        "border-roseglass-600 bg-roseglass-50/45 shadow-md shadow-roseglass-700/25 dark:border-roseglass-400 dark:bg-roseglass-950/42 dark:shadow-black/35",
    },
  ],
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) {
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
      <Input className={inputStyles} />
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
