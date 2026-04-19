import type { Meta } from "@storybook/react-vite";
import { ColorWheel, type ColorWheelProps } from "../src/ColorWheel";

const meta: Meta<typeof ColorWheel> = {
  component: ColorWheel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ColorWheelProps) => <ColorWheel {...args} />;
