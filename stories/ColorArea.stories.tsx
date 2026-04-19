import type { Meta } from "@storybook/react-vite";
import { ColorArea, type ColorAreaProps } from "../src/ColorArea";

const meta: Meta<typeof ColorArea> = {
  component: ColorArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ColorAreaProps) => (
  <ColorArea {...args} className="w-50" />
);
