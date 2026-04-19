import type { Meta } from "@storybook/react-vite";
import { ProgressBar, type ProgressBarProps } from "../src/ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ProgressBarProps) => <ProgressBar {...args} />;

Example.args = {
  label: "Loading…",
  value: 80,
};
