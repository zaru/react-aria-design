"use client";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const formActions = tv({
  base: "flex gap-2 flex-wrap",
  variants: {
    align: {
      end: "justify-end",
      between: "justify-between",
      center: "justify-center",
      start: "justify-start",
    },
  },
  defaultVariants: {
    align: "end",
  },
});

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'end' */
  align?: "end" | "between" | "center" | "start";
}

export function FormActions({ align, className, ...props }: FormActionsProps) {
  return (
    <div {...props} className={twMerge(formActions({ align }), className)} />
  );
}
