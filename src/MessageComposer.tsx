"use client";
import { ArrowRightIcon } from "lucide-react";
import {
  type FormEvent,
  type FormHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from "react";
import { Button as RACButton } from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { TextArea as RACTextArea } from "react-aria-components/TextArea";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

/**
 * Apple Liquid Glass メッセージコンポーザ
 * - 上段に任意のアクション群（例: 「対応中にする」ボタン）、下段に入力欄＋送信ボタン
 * - 入力欄は `TextArea` ベース。Enter 送信・Shift+Enter 改行をサポート
 * - 制御・非制御どちらでも使える（`value` / `defaultValue` と `onValueChange` / `onSubmitMessage`）
 */
const wrap = tv({
  base: [
    "relative isolate flex items-end gap-1 w-full font-sans",
    "rounded-[1.4rem] px-2 py-1.5 box-border overflow-hidden",
    "border border-black/10 bg-white/55 backdrop-blur-2xl backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_-14px_rgba(15,23,42,0.18)]",
    "dark:border-white/12 dark:bg-glass-800/55",
    "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_36px_-18px_rgba(0,0,0,0.55)]",
  ].join(" "),
});

const sendButton = tv({
  extend: focusRing,
  base: [
    "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full cursor-default",
    "transition-[background-color,color,filter,box-shadow] duration-200",
    "[-webkit-tap-highlight-color:transparent]",
    "ring-1 ring-black/8 bg-white/70 text-glass-700 dark:text-glass-200 dark:ring-white/12 dark:bg-glass-700/70",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    "enabled:hover:brightness-[1.04]",
  ].join(" "),
  variants: {
    isActive: {
      true: [
        "text-white bg-linear-to-b from-glow-400/95 to-glow-500/95",
        "dark:from-glow-500/90 dark:to-glow-600/92",
        "ring-glow-500/35 dark:ring-glow-400/25",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_6px_18px_-8px_rgba(0,122,255,0.45)]",
      ].join(" "),
    },
    isDisabled: {
      true: "cursor-not-allowed bg-glass-100/70 text-glass-400 dark:bg-glass-900/60 dark:text-glass-600 shadow-none ring-transparent dark:ring-transparent",
    },
  },
});

export interface MessageComposerProps
  extends Omit<
    FormHTMLAttributes<HTMLFormElement>,
    "onSubmit" | "children" | "defaultValue"
  > {
  placeholder?: string;
  /** 制御用 */
  value?: string;
  /** 非制御用 */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 送信ハンドラ。戻り値なしでも Promise でも可 */
  onSubmitMessage?: (value: string) => void | Promise<void>;
  /** 入力欄上部の追加アクション行（例: 「対応中にする」） */
  actions?: ReactNode;
  /** 送信ボタン自体を無効化（入力可否とは独立） */
  isDisabled?: boolean;
  isPending?: boolean;
  rows?: number;
  textFieldProps?: Omit<
    AriaTextFieldProps,
    "value" | "defaultValue" | "onChange" | "children" | "isDisabled"
  >;
  label?: string;
  sendIcon?: ReactNode;
}

export function MessageComposer({
  className,
  placeholder = "メッセージを入力",
  value,
  defaultValue,
  onValueChange,
  onSubmitMessage,
  actions,
  isDisabled,
  isPending,
  rows = 1,
  textFieldProps,
  label,
  sendIcon,
  ...formProps
}: MessageComposerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = isControlled ? (value ?? "") : internal;
  const fieldId = useId();

  const setValue = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const trimmed = current.trim();
  const canSend = trimmed.length > 0 && !isDisabled && !isPending;

  const submit = () => {
    if (!canSend) return;
    onSubmitMessage?.(current);
    if (!isControlled) setInternal("");
    else onValueChange?.("");
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <form
      {...formProps}
      onSubmit={handleFormSubmit}
      className={twMerge("flex flex-col gap-2 w-full", className)}
    >
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      <div className={wrap()}>
        <AriaTextField
          {...textFieldProps}
          value={current}
          onChange={setValue}
          isDisabled={isDisabled}
          className="flex-1 min-w-0"
        >
          {label && (
            <label htmlFor={fieldId} className="sr-only">
              {label}
            </label>
          )}
          <RACTextArea
            id={fieldId}
            rows={rows}
            placeholder={placeholder}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submit();
              }
            }}
            className={composeRenderProps("", (className) =>
              twMerge(
                "block w-full resize-none bg-transparent border-0 outline-none",
                "font-sans text-sm leading-relaxed text-glass-900 dark:text-glass-50",
                "placeholder:text-glass-500 dark:placeholder:text-glass-400",
                "px-3 py-2 max-h-40",
                "[-webkit-tap-highlight-color:transparent]",
                className,
              ),
            )}
          />
        </AriaTextField>
        <RACButton
          type="submit"
          isPending={isPending}
          isDisabled={!canSend}
          aria-label="送信"
          className={composeRenderProps("", (className, renderProps) =>
            sendButton({
              ...renderProps,
              isActive: canSend,
              className,
            }),
          )}
        >
          {sendIcon ?? <ArrowRightIcon aria-hidden className="w-4 h-4" />}
        </RACButton>
      </div>
    </form>
  );
}
