import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionDivider } from "../src/SectionDivider";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "SectionDivider",
  component: SectionDivider,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  args: {
    children: "4/21 18:41 に受信",
  },
} satisfies Meta<typeof SectionDivider>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <SectionDivider {...args} />
    </div>
  ),
};

export const WithoutText: StoryObj<typeof meta> = {
  args: { children: undefined, decorative: true },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <SectionDivider {...args} />
    </div>
  ),
};

export const BetweenContent: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md flex flex-col gap-4 font-sans">
      <p className="text-sm text-glass-800 dark:text-glass-200">
        タイムライン上段のテキストブロック
      </p>
      <SectionDivider>4/21 18:41 に受信</SectionDivider>
      <p className="text-sm text-glass-800 dark:text-glass-200">
        タイムライン下段のテキストブロック
      </p>
    </div>
  ),
};
