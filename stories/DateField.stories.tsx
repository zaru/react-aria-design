import type { Meta } from "@storybook/react-vite";
import type { DateValue } from "react-aria-components/DateField";
import { Form } from "react-aria-components/Form";
import { Button } from "../src/Button";
import { DateField, type DateFieldProps } from "../src/DateField";

const meta: Meta<typeof DateField> = {
  component: DateField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Event date",
  },
};

export default meta;

export const Example = (args: DateFieldProps<DateValue>) => (
  <DateField {...args} />
);

export const Validation = (args: DateFieldProps<DateValue>) => (
  <Form className="flex flex-col gap-2 items-start">
    <DateField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
