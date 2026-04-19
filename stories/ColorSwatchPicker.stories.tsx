import type { Meta } from "@storybook/react-vite";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  type ColorSwatchPickerRootProps,
} from "../src/ColorSwatchPicker";

const meta: Meta<typeof ColorSwatchPicker> = {
  component: ColorSwatchPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: ColorSwatchPickerRootProps) => (
  <ColorSwatchPicker {...args}>
    <ColorSwatchPickerItem color="#A00" />
    <ColorSwatchPickerItem color="#f80" />
    <ColorSwatchPickerItem color="#080" />
    <ColorSwatchPickerItem color="#08f" />
    <ColorSwatchPickerItem color="#088" />
    <ColorSwatchPickerItem color="#008" />
  </ColorSwatchPicker>
);
