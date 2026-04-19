import type { Meta } from "@storybook/react-vite";
import { Switch, type SwitchProps } from "../src/Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: SwitchProps) => <Switch {...args}>Wi-Fi</Switch>;
