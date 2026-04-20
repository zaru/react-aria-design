"use client";
import { ChevronDown } from "lucide-react";
import type React from "react";
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  ListBox,
  type ListBoxItemProps,
  SelectValue,
  type ValidationResult,
} from "react-aria-components/Select";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps,
} from "./ListBox";
import { Popover } from "./Popover";
import { composeTailwindRenderProps } from "./utils";

/** Liquid Glass：Select トリガのフォーカスリング（入力系と揃える） */
const liquidSelectFocusRing = tv({
  base: "outline outline-glow-600 dark:outline-glow-400 forced-colors:outline-[Highlight] -outline-offset-1",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const styles = tv({
  extend: liquidSelectFocusRing,
  base: [
    "flex items-center text-start gap-3 w-full font-sans text-sm min-h-10 min-w-[180px] py-2 pl-4 pr-3 box-border cursor-default",
    "rounded-[1.125rem] transition-[box-shadow,background-color,filter] duration-300 [-webkit-tap-highlight-color:transparent]",
    "border-0 ring-1 ring-black/10 text-glass-900 backdrop-blur-2xl backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(15,23,42,0.06),0_6px_20px_-12px_rgba(15,23,42,0.15)]",
    "bg-linear-to-b from-white/82 to-white/42",
    "dark:ring-white/14 dark:text-glass-50",
    "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.35),0_10px_28px_-14px_rgba(0,0,0,0.55)]",
    "dark:bg-linear-to-b dark:from-glass-800/72 dark:to-glass-950/58",
    "group-invalid:ring-roseglass-500/75 group-invalid:bg-linear-to-b group-invalid:from-roseglass-50/55 group-invalid:to-white/38 dark:group-invalid:from-roseglass-950/42 dark:group-invalid:to-glass-950/52 forced-colors:group-invalid:outline forced-colors:group-invalid:outline-[Mark]",
  ].join(" "),
  variants: {
    isDisabled: {
      false:
        "hover:brightness-[1.015] dark:hover:brightness-[1.02] pressed:brightness-[0.98]",
      true: "cursor-not-allowed ring-black/6 bg-glass-100/88 text-glass-400 saturate-100 shadow-none backdrop-blur-md dark:ring-white/8 dark:bg-glass-900/72 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export interface SelectProps<T extends object, M extends "single" | "multiple">
  extends Omit<AriaSelectProps<T, M>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<
  T extends object,
  M extends "single" | "multiple" = "single",
>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 relative font-sans",
      )}
    >
      {label && (
        <Label className="text-glass-800 dark:text-glass-100">{label}</Label>
      )}
      <Button className={styles}>
        <SelectValue className="flex-1 text-sm text-glass-900 dark:text-glass-50 placeholder-shown:text-glass-500 dark:placeholder-shown:text-glass-400">
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <ChevronDown
          aria-hidden
          className="w-4 h-4 text-glass-500 dark:text-glass-300 forced-colors:text-[ButtonText] group-disabled:text-glass-300 dark:group-disabled:text-glass-600 forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && (
        <Description className="text-glass-600 dark:text-glass-400">
          {description}
        </Description>
      )}
      <FieldError className="text-roseglass-700 dark:text-roseglass-400 forced-colors:text-[Mark]">
        {errorMessage}
      </FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="outline-hidden box-border p-1.5 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_1.375rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(
  props: DropdownSectionProps<T>,
) {
  return <DropdownSection {...props} />;
}
