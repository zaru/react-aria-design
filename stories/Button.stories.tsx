import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src/Button";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Button",
  component: Button,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "quiet"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    isDisabled: false,
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    variant: "primary",
  },
};

export const Secondary: StoryObj<typeof meta> = {
  args: {
    variant: "secondary",
  },
};

export const Destructive: StoryObj<typeof meta> = {
  args: {
    variant: "destructive",
  },
};

export const Sizes: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
