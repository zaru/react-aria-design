"use client";
import { SearchIcon, XIcon } from "lucide-react";
import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult,
} from "react-aria-components/SearchField";
import { Description, FieldError, FieldGroup, Input, Label } from "./Field";
import { FieldButton } from "./FieldButton";
import { composeTailwindRenderProps } from "./utils";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 min-w-[40px] font-sans max-w-full",
      )}
    >
      {label && (
        <Label className="text-glass-800 dark:text-glass-100">{label}</Label>
      )}
      <FieldGroup>
        <SearchIcon
          aria-hidden
          className="w-4 h-4 ml-3 text-glass-500 dark:text-glass-300 forced-colors:text-[ButtonText] group-disabled:text-glass-300 dark:group-disabled:text-glass-600 forced-colors:group-disabled:text-[GrayText]"
        />
        <Input
          placeholder={placeholder}
          className="pl-2 [&::-webkit-search-cancel-button]:hidden"
        />
        <FieldButton className="mr-1.5 w-6 h-6 group-empty:invisible">
          <XIcon aria-hidden className="w-4 h-4" />
        </FieldButton>
      </FieldGroup>
      {description && (
        <Description className="text-glass-600 dark:text-glass-400">
          {description}
        </Description>
      )}
      <FieldError className="text-roseglass-700 dark:text-roseglass-400 forced-colors:text-[Mark]">
        {errorMessage}
      </FieldError>
    </AriaSearchField>
  );
}
