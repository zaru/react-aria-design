import type { Meta } from "@storybook/react-vite";
import { Slider, type SliderProps } from "../src/Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: SliderProps<number[]>) => <Slider {...args} />;

Example.args = {
  label: "Range",
  defaultValue: [30, 60],
  thumbLabels: ["start", "end"],
};
