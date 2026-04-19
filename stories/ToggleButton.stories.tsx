import type { Meta } from "@storybook/react-vite";
import { ToggleButton, type ToggleButtonProps } from "../src/ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ToggleButtonProps) => (
  <ToggleButton {...args}>Pin</ToggleButton>
);
