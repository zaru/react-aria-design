"use client";
import { ArrowUp, ChevronRight } from "lucide-react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { Group } from "react-aria-components/Group";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  type TableProps as AriaTableProps,
  Button,
  type CellProps,
  Collection,
  type ColumnProps,
  ColumnResizer,
  ResizableTableContainer,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  useTableOptions,
} from "react-aria-components/Table";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface TableProps extends Omit<AriaTableProps, "className"> {
  className?: string;
}

const tableContainerStyles = tv({
  base:
    "w-full max-h-[320px] overflow-auto scroll-pt-[2.281rem] relative box-border font-sans bg-clip-padding " +
    "rounded-[1.5rem] [corner-shape:squircle] " +
    "ring-1 ring-black/8 dark:ring-white/12 " +
    "shadow-[0_1px_3px_-1px_rgba(15,23,42,0.08),0_10px_24px_-10px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] " +
    "dark:shadow-[0_1px_3px_-1px_rgba(0,0,0,0.45),0_12px_28px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] " +
    "bg-linear-to-br from-white/76 via-white/48 to-white/32 backdrop-blur-2xl backdrop-saturate-[1.5] " +
    "dark:bg-linear-to-br dark:from-glass-800/72 dark:via-glass-900/54 dark:to-glass-950/48",
});

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer
      onScroll={props.onScroll}
      className={twMerge(tableContainerStyles(), props.className)}
    >
      <AriaTable
        {...props}
        className="border-separate border-spacing-0 box-border overflow-hidden has-[>[data-empty]]:h-full"
      />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: "px-2 h-5 box-border flex-1 flex gap-1 items-center overflow-hidden",
});

const resizerStyles = tv({
  extend: focusRing,
  base: "w-px px-[8px] translate-x-[8px] box-content py-1 h-5 bg-clip-content bg-glass-400 dark:bg-glass-500 forced-colors:bg-[ButtonBorder] cursor-col-resize rounded-xs resizing:bg-glow-500 forced-colors:resizing:bg-[Highlight] resizing:w-[2px] resizing:pl-[7px] -outline-offset-2",
});

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "box-border h-1 [&:hover]:z-20 focus-within:z-20 text-start text-sm font-semibold text-glass-700 dark:text-glass-200 cursor-default",
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group role="presentation" tabIndex={-1} className={columnStyles}>
              <span className="truncate">{children}</span>
              {allowsSorting && (
                <span
                  className={`w-4 h-4 flex items-center justify-center transition ${
                    sortDirection === "descending" ? "rotate-180" : ""
                  }`}
                >
                  {sortDirection && (
                    <ArrowUp
                      aria-hidden
                      className="w-4 h-4 text-glass-500 dark:text-glass-400 forced-colors:text-[ButtonText]"
                    />
                  )}
                </span>
              )}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        ),
      )}
    </AriaColumn>
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <AriaTableHeader
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "sticky top-0 z-10 bg-white/45 dark:bg-glass-900/45 backdrop-blur-lg backdrop-saturate-[1.4] supports-[-moz-appearance:none]:bg-white dark:supports-[-moz-appearance:none]:bg-glass-900 forced-colors:bg-[Canvas] rounded-t-[1.5rem] border-b border-b-black/8 dark:border-b-white/10",
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="box-border p-2 text-sm font-semibold cursor-default text-start"
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="empty:italic empty:text-center empty:text-sm"
    />
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: "group/row relative cursor-default select-none -outline-offset-2 text-glass-900 disabled:text-glass-400 dark:text-glass-100 dark:disabled:text-glass-600 text-sm transition-[background-color,box-shadow,color] duration-150 ease-out hover:bg-white/55 pressed:bg-white/68 dark:hover:bg-glass-800/55 dark:pressed:bg-glass-800/68 selected:bg-glow-400/18 selected:hover:bg-glow-400/26 selected:pressed:bg-glow-400/32 dark:selected:bg-glow-500/22 dark:selected:hover:bg-glow-500/30 dark:selected:pressed:bg-glow-500/36 last:rounded-b-[1.35rem]",
});

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: "box-border [-webkit-tap-highlight-color:transparent] border-b border-b-black/6 dark:border-b-white/8 group-last/row:border-b-0 [--selected-border:color-mix(in_oklch,var(--color-glow-400)_40%,transparent)] dark:[--selected-border:color-mix(in_oklch,var(--color-glow-500)_32%,transparent)] group-selected/row:border-(--selected-border) [:is(:has(+[data-selected])_*)]:border-(--selected-border) p-2 truncate -outline-offset-2 group-last/row:first:rounded-bl-[1.35rem] group-last/row:last:rounded-br-[1.35rem]",
});

const expandButton = tv({
  extend: focusRing,
  base: "border-0 p-0 pr-1 bg-transparent shrink-0 align-middle cursor-default [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

const chevron = tv({
  base: "w-4.5 h-4.5 text-glass-500 dark:text-glass-400 transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-90",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export function Cell(props: CellProps) {
  return (
    <AriaCell
      {...props}
      className={cellStyles}
      style={({ hasChildItems, isTreeColumn, level }) => ({
        paddingInlineStart: isTreeColumn
          ? 4 + (hasChildItems ? 0 : 20) + (level - 1) * 16
          : undefined,
      })}
    >
      {composeRenderProps(
        props.children,
        (children, { hasChildItems, isTreeColumn, isExpanded, isDisabled }) => (
          <>
            {hasChildItems && isTreeColumn && (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <ChevronRight
                  aria-hidden
                  className={chevron({ isExpanded, isDisabled })}
                />
              </Button>
            )}
            {children}
          </>
        ),
      )}
    </AriaCell>
  );
}
