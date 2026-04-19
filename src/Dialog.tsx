"use client";
import {
  type DialogProps,
  Heading,
  Dialog as RACDialog,
} from "react-aria-components/Dialog";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const dialogStyles = tv({
  base: "outline outline-0 box-border p-6 [[data-placement]>&]:p-4 max-h-[inherit] overflow-auto relative",
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
