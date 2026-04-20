"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  type ValidationResult,
} from "react-aria-components/NumberField";
import {
  Description,
  FieldError,
  FieldGroup,
  fieldBorderStyles,
  Input,
  Label,
} from "./Field";
import { composeTailwindRenderProps } from "./utils";

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 font-sans",
      )}
    >
      {label && (
        <Label className="text-glass-800 dark:text-glass-100">{label}</Label>
      )}
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input className="w-20" placeholder={placeholder} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                class: "flex flex-col border-s h-full",
              })}
            >
              <StepperButton slot="increment">
                <ChevronUp aria-hidden className="w-4 h-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  class: "border-b",
                })}
              />
              <StepperButton slot="decrement">
                <ChevronDown aria-hidden className="w-4 h-4" />
              </StepperButton>
            </div>
          </>
        )}
      </FieldGroup>
      {description && (
        <Description className="text-glass-600 dark:text-glass-400">
          {description}
        </Description>
      )}
      <FieldError className="text-roseglass-700 dark:text-roseglass-400 forced-colors:text-[Mark]">
        {errorMessage}
      </FieldError>
    </AriaNumberField>
  );
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="flex border-0 py-0 px-1 flex-1 box-border cursor-default text-glass-500 bg-transparent hover:bg-black/5 pressed:bg-black/10 dark:text-glass-300 dark:hover:bg-white/10 dark:pressed:bg-white/15 group-disabled:text-glass-300 dark:group-disabled:text-glass-600 forced-colors:group-disabled:text-[GrayText] [-webkit-tap-highlight-color:transparent]"
    />
  );
}
