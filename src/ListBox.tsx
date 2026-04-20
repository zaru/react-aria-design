"use client";
import { Check } from "lucide-react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  type ListBoxItemProps,
  ListBoxSection,
  type ListBoxSectionProps,
} from "react-aria-components/ListBox";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface ListBoxProps<T>
  extends Omit<AriaListBoxProps<T>, "layout" | "orientation"> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "font-sans outline-0 p-1.5 w-[200px] text-glass-900 dark:text-glass-50 bg-clip-padding " +
          "rounded-[1.5rem] [corner-shape:squircle] " +
          "ring-1 ring-black/8 dark:ring-white/12 " +
          "shadow-[0_2px_6px_-2px_rgba(15,23,42,0.1),0_14px_34px_-10px_rgba(15,23,42,0.18),0_36px_72px_-22px_rgba(15,23,42,0.26),inset_0_1px_0_rgba(255,255,255,0.78),inset_1px_0_0_rgba(255,255,255,0.42),inset_-1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(15,23,42,0.06)] " +
          "dark:shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5),0_16px_36px_-12px_rgba(0,0,0,0.55),0_40px_80px_-26px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.22),inset_1px_0_0_rgba(255,255,255,0.1),inset_-1px_0_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.3)] " +
          "bg-linear-to-br from-white/78 via-white/48 to-white/32 backdrop-blur-2xl backdrop-saturate-[1.6] " +
          "dark:bg-linear-to-br dark:from-glass-800/74 dark:via-glass-900/56 dark:to-glass-950/50 " +
          "forced-colors:bg-[Canvas] forced-colors:ring-[ButtonBorder]",
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base:
    "group relative flex items-center gap-8 cursor-default select-none py-2 px-3 " +
    "rounded-[1.375rem] [corner-shape:squircle] will-change-transform text-sm forced-color-adjust-none " +
    "transition-[background-color,box-shadow,color] duration-150 ease-out",
  variants: {
    isSelected: {
      false:
        "text-glass-800 dark:text-glass-100 hover:bg-white/55 pressed:bg-white/68 dark:hover:bg-glass-800/55 dark:pressed:bg-glass-800/68 -outline-offset-2",
      true:
        "text-white " +
        "[background-image:linear-gradient(rgba(0,122,255,.9),rgba(0,122,255,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)] " +
        "[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06)] " +
        "dark:[background-image:linear-gradient(rgba(0,122,255,.82),rgba(0,122,255,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)] " +
        "dark:[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05)] " +
        "forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] " +
        "[&:has(+[data-selected])]:rounded-b-none [&+[data-selected]]:rounded-t-none " +
        "-outline-offset-4 outline-white dark:outline-white forced-colors:outline-[HighlightText]",
    },
    isDisabled: {
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute left-4 right-4 bottom-0 h-px bg-white/25 forced-colors:bg-[HighlightText] hidden [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base:
    "group flex items-center gap-4 cursor-default select-none py-2 pl-3 pr-3 selected:pr-1 " +
    "rounded-[1.375rem] [corner-shape:squircle] outline-0 text-sm forced-color-adjust-none no-underline " +
    "[&[href]]:cursor-pointer [-webkit-tap-highlight-color:transparent] " +
    "transition-[background-color,color,box-shadow] duration-150 ease-out",
  variants: {
    isDisabled: {
      false: "text-glass-900 dark:text-glass-50",
      true: "text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
    isPressed: {
      true: "bg-white/60 dark:bg-glass-800/60",
    },
    isFocused: {
      true:
        "text-white " +
        "[background-image:linear-gradient(rgba(0,122,255,.9),rgba(0,122,255,.9)),linear-gradient(135deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.14)_100%)] " +
        "[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.3),inset_-1px_-1px_2px_rgba(255,255,255,.1),inset_2px_2px_4px_rgba(255,255,255,.06)] " +
        "dark:[background-image:linear-gradient(rgba(0,122,255,.82),rgba(0,122,255,.82)),linear-gradient(135deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_55%,rgba(255,255,255,.1)_100%)] " +
        "dark:[box-shadow:inset_1px_1px_1px_rgba(255,255,255,.2),inset_-1px_-1px_2px_rgba(255,255,255,.08),inset_2px_2px_4px_rgba(255,255,255,.05)] " +
        "forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: "bg-white/50 dark:bg-glass-800/55",
    },
  ],
});

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex items-center flex-1 gap-2 font-normal truncate group-selected:font-semibold">
            {children}
          </span>
          <span className="flex items-center w-5">
            {isSelected && <Check className="w-4 h-4" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends ListBoxSectionProps<T> {
  title?: string;
  items?: Iterable<T>;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>,
) {
  return (
    <ListBoxSection className="first:-mt-[5px] after:content-[''] after:block after:h-[5px] last:after:hidden">
      <Header className="font-sans text-xs font-semibold tracking-wider uppercase text-glass-600 dark:text-glass-300 px-3 py-1.5 truncate sticky -top-[5px] -mt-px -mx-1.5 z-10 bg-white/45 dark:bg-glass-900/45 backdrop-blur-lg backdrop-saturate-[1.4] border-y border-black/5 dark:border-white/8 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
}
