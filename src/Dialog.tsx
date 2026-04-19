"use client";
import {
  type DialogProps,
  Heading,
  Dialog as RACDialog,
} from "react-aria-components/Dialog";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const dialogStyles = tv({
  base:
    "font-sans outline-0 box-border relative max-h-[inherit] overflow-auto " +
    "p-7 [[data-placement]>&]:p-4 " +
    "text-glass-900 dark:text-glass-50",
});

export function Dialog(props: DialogProps) {
  return (
    <RACDialog
      {...props}
      className={twMerge(dialogStyles(), props.className)}
    />
  );
}

export { Heading };
