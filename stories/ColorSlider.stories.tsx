import type { Meta } from "@storybook/react-vite";
import { ColorSlider, type ColorSliderProps } from "../src/ColorSlider";

const meta: Meta<typeof ColorSlider> = {
  component: ColorSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ColorSliderProps) => <ColorSlider {...args} />;

Example.args = {
  label: "Fill Color",
  channel: "hue",
  colorSpace: "hsl",
  defaultValue: "#f00",
};
