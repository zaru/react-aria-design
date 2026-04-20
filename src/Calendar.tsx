"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  type CalendarProps as AriaCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  type DateValue,
  Heading,
  Text,
} from "react-aria-components/Calendar";
import { useLocale } from "react-aria-components/I18nProvider";
import { tv } from "tailwind-variants";
import { Button } from "./Button";
import { composeTailwindRenderProps, focusRing } from "./utils";

const cellStyles = tv({
  extend: focusRing,
  base: "w-[calc(100cqw/7)] aspect-square text-sm cursor-default rounded-full flex items-center justify-center forced-color-adjust-none [-webkit-tap-highlight-color:transparent] transition-[background-color,box-shadow,color] duration-150 ease-out",
  variants: {
    isSelected: {
      false:
        "text-glass-900 dark:text-glass-100 hover:bg-white/55 pressed:bg-white/68 dark:hover:bg-glass-800/55 dark:pressed:bg-glass-800/68",
      true:
        "text-white bg-linear-to-b from-glow-400/92 to-glow-500/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] " +
        "dark:from-glow-500/88 dark:to-glow-600/92 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] " +
        "invalid:from-roseglass-400/92 invalid:to-roseglass-500/94 invalid:dark:from-roseglass-500/88 invalid:dark:to-roseglass-600/92 " +
        "forced-colors:bg-[Highlight] forced-colors:invalid:bg-[Mark] forced-colors:text-[HighlightText]",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container",
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="border-spacing-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className={cellStyles} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  );
}

export function CalendarHeader() {
  const { direction } = useLocale();

  return (
    <header className="flex items-center gap-1 pb-4 px-1 border-box">
      <Button variant="quiet" slot="previous">
        {direction === "rtl" ? (
          <ChevronRight aria-hidden size={18} />
        ) : (
          <ChevronLeft aria-hidden size={18} />
        )}
      </Button>
      <Heading className="flex-1 font-sans font-semibold [font-variation-settings:normal] text-base text-center mx-2 my-0 text-glass-900 dark:text-glass-50" />
      <Button variant="quiet" slot="next">
        {direction === "rtl" ? (
          <ChevronLeft aria-hidden size={18} />
        ) : (
          <ChevronRight aria-hidden size={18} />
        )}
      </Button>
    </header>
  );
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className="text-xs text-glass-500 dark:text-glass-400 font-semibold">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  );
}
