import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const focusRing = tv({
  base: "outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

/** Form shell, TagGroup root — vertical rhythm shared across fields */
export const stack = tv({
  base: "flex flex-col",
  variants: {
    gap: {
      sm: "gap-2",
      lg: "gap-6",
    },
    font: {
      inherit: "",
      sans: "font-sans",
    },
  },
  defaultVariants: {
    font: "inherit",
  },
});

/** Inline rows — breadcrumbs, toolbar clusters */
export const row = tv({
  base: "flex",
  variants: {
    gap: {
      xs: "gap-1",
      sm: "gap-2",
    },
  },
});

export const fieldLabelStyles = tv({
  base: "font-sans text-sm text-neutral-600 dark:text-neutral-300 font-medium cursor-default w-fit",
});

export const fieldDescriptionStyles = tv({
  base: "text-sm text-neutral-600",
});

export const fieldErrorStyles = tv({
  base: "text-sm text-red-600 forced-colors:text-[Mark]",
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
