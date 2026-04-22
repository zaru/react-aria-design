import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetaPill } from "../src/MetaPill";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "MetaPill",
  component: MetaPill,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  args: {
    label: "カテゴリ",
    value: "障害報告",
  },
} satisfies Meta<typeof MetaPill>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const WithDot: StoryObj<typeof meta> = {
  args: {
    label: "状態",
    value: "未対応",
    dot: (
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full bg-roseglass-500"
      />
    ),
  },
};

export const Group: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-2 justify-center">
      <MetaPill label="カテゴリ" value="障害報告" />
      <MetaPill
        label="状態"
        value="未対応"
        dot={
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full bg-roseglass-500"
          />
        }
      />
      <MetaPill label="優先度" value="高" />
      <MetaPill label="プラン" value="Enterprise" />
    </div>
  ),
};
