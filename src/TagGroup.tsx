"use client";
import { XIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
  Button,
  TagList,
  type TagListProps,
  Text,
} from "react-aria-components/TagGroup";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Description, Label } from "./Field";
import { fieldErrorStyles, focusRing, stack } from "./utils";

const colors = {
  gray: "bg-white/55 text-glass-700 border-black/10 hover:border-black/18 dark:bg-glass-800/50 dark:text-glass-200 dark:border-white/12 dark:hover:border-white/22",
  green:
    "bg-mint-100/70 text-mint-800 border-mint-400/30 hover:border-mint-500/50 dark:bg-mint-500/18 dark:text-mint-300 dark:border-mint-400/20 dark:hover:border-mint-400/35",
  yellow:
    "bg-coral-100/70 text-coral-800 border-coral-400/30 hover:border-coral-500/50 dark:bg-coral-500/18 dark:text-coral-300 dark:border-coral-400/20 dark:hover:border-coral-400/35",
  blue: "bg-glow-100/70 text-glow-800 border-glow-400/30 hover:border-glow-500/50 dark:bg-glow-500/18 dark:text-glow-300 dark:border-glow-400/20 dark:hover:border-glow-400/35",
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>("gray");

const tagStyles = tv({
  extend: focusRing,
  base: "transition cursor-default text-xs rounded-full border px-3 py-0.5 flex items-center max-w-fit gap-1 font-sans [-webkit-tap-highlight-color:transparent]",
  variants: {
    color: {
      gray: "",
      green: "",
      yellow: "",
      blue: "",
    },
    allowsRemoving: {
      true: "pr-1",
    },
    isSelected: {
      true: "text-white bg-linear-to-b from-glow-400/92 to-glow-500/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] dark:from-glow-500/88 dark:to-glow-600/92 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] border-transparent forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-color-adjust-none",
    },
    isDisabled: {
      true: "bg-glass-100/60 dark:bg-transparent dark:border-white/15 text-glass-400 dark:text-glass-600 forced-colors:text-[GrayText]",
    },
  },
  compoundVariants: (Object.keys(colors) as Color[]).map((color) => ({
    isSelected: false,
    isDisabled: false,
    color,
    class: colors[color],
  })),
});

export interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
  color?: Color;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup
      {...props}
      className={twMerge(stack({ gap: "sm", font: "sans" }), props.className)}
    >
      <Label>{label}</Label>
      <ColorContext.Provider value={props.color || "gray"}>
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1"
        >
          {children}
        </TagList>
      </ColorContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className={fieldErrorStyles()}>
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: "cursor-default rounded-full transition-[background-color] p-0.5 flex items-center justify-center bg-transparent text-[inherit] border-0 hover:bg-black/10 dark:hover:bg-white/10 pressed:bg-black/20 dark:pressed:bg-white/20",
});

export function Tag({ children, color, ...props }: TagProps) {
  const textValue = typeof children === "string" ? children : undefined;
  const groupColor = useContext(ColorContext);
  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({ ...renderProps, className, color: color || groupColor }),
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="w-3 h-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
}
