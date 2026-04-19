import type { Meta } from "@storybook/react-vite";
import { Form } from "react-aria-components/Form";
import type { TimeValue } from "react-aria-components/TimeField";
import { Button } from "../src/Button";
import { TimeField, type TimeFieldProps } from "../src/TimeField";

const meta: Meta<typeof TimeField> = {
  component: TimeField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Event time",
  },
};

export default meta;

export const Example = (args: TimeFieldProps<TimeValue>) => (
  <TimeField {...args} />
);

export const Validation = (args: TimeFieldProps<TimeValue>) => (
  <Form className="flex flex-col gap-2 items-start">
    <TimeField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
