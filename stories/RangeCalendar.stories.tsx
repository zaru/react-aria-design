import type { Meta } from "@storybook/react-vite";
import type { DateValue } from "react-aria-components/RangeCalendar";
import { RangeCalendar, type RangeCalendarProps } from "../src/RangeCalendar";

const meta: Meta<typeof RangeCalendar> = {
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: RangeCalendarProps<DateValue>) => (
  <RangeCalendar aria-label="Trip dates" {...args} />
);
