import type { Meta } from "@storybook/react-vite";
import type { DateValue } from "react-aria-components/Calendar";
import { Calendar, type CalendarProps } from "../src/Calendar";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: CalendarProps<DateValue>) => (
  <Calendar aria-label="Event date" {...args} />
);
