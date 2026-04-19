import type { Meta } from "@storybook/react-vite";
import { ColorPicker, type ColorPickerProps } from "../src/ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Color",
    defaultValue: "#ff0",
  },
};

export default meta;

export const Example = (args: ColorPickerProps) => <ColorPicker {...args} />;
