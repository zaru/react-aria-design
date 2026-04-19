import type { Meta } from "@storybook/react-vite";
import type { DateValue } from "react-aria-components/DateRangePicker";
import { Form } from "react-aria-components/Form";
import { Button } from "../src/Button";
import {
  DateRangePicker,
  type DateRangePickerProps,
} from "../src/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Trip dates",
  },
};

export default meta;

export const Example = (args: DateRangePickerProps<DateValue>) => (
  <DateRangePicker {...args} />
);

export const Validation = (args: DateRangePickerProps<DateValue>) => (
  <Form className="flex flex-col gap-2 items-start">
    <DateRangePicker {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
