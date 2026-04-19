"use client";
import { type FormProps, Form as RACForm } from "react-aria-components/Form";
import { twMerge } from "tailwind-merge";

import { stack } from "./utils";

export type { FormProps };

export function Form(props: FormProps) {
  return (
    <RACForm
      {...props}
      className={twMerge(stack({ gap: "lg" }), props.className)}
    />
  );
}
