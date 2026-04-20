"use client";
import {
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  type DateValue,
  Text,
} from "react-aria-components/RangeCalendar";
import { tv } from "tailwind-variants";
import { CalendarGridHeader, CalendarHeader } from "./Calendar";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base: "w-full h-full flex items-center justify-center rounded-full forced-color-adjust-none text-glass-900 dark:text-glass-100 transition-[background-color,box-shadow,color] duration-150 ease-out",
  variants: {
    selectionState: {
      none: "group-hover:bg-white/55 dark:group-hover:bg-glass-800/55 group-pressed:bg-white/68 dark:group-pressed:bg-glass-800/68",
      middle: [
        "group-hover:bg-glow-400/28 dark:group-hover:bg-glow-500/30 forced-colors:group-hover:bg-[Highlight]",
        "group-invalid:group-hover:bg-roseglass-400/28 dark:group-invalid:group-hover:bg-roseglass-500/30 forced-colors:group-invalid:group-hover:bg-[Mark]",
        "group-pressed:bg-glow-400/38 dark:group-pressed:bg-glow-500/40 forced-colors:group-pressed:bg-[Highlight] forced-colors:text-[HighlightText]",
        "group-invalid:group-pressed:bg-roseglass-400/38 dark:group-invalid:group-pressed:bg-roseglass-500/40 forced-colors:group-invalid:group-pressed:bg-[Mark]",
      ],
      cap:
        "text-white bg-linear-to-b from-glow-400/92 to-glow-500/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] " +
        "dark:from-glow-500/88 dark:to-glow-600/92 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] " +
        "group-invalid:from-roseglass-400/92 group-invalid:to-roseglass-500/94 group-invalid:dark:from-roseglass-500/88 group-invalid:dark:to-roseglass-600/92 " +
        "forced-colors:bg-[Highlight] forced-colors:group-invalid:bg-[Mark] forced-colors:text-[HighlightText]",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container",
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="[&_td]:px-0 [&_td]:py-px border-spacing-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className="group w-[calc(100cqw/7)] aspect-square text-sm outline outline-0 cursor-default outside-month:text-glass-300 dark:outside-month:text-glass-600 selected:bg-glow-400/18 dark:selected:bg-glow-500/22 forced-colors:selected:bg-[Highlight] invalid:selected:bg-roseglass-400/18 dark:invalid:selected:bg-roseglass-500/22 forced-colors:invalid:selected:bg-[Mark] [td:first-child_&]:rounded-s-full selection-start:rounded-s-full [td:last-child_&]:rounded-e-full selection-end:rounded-e-full [-webkit-tap-highlight-color:transparent]"
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled,
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isDisabled,
                    isFocusVisible,
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  );
}
