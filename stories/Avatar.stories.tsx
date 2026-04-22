import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../src/Avatar";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Avatar",
  component: Avatar,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    tone: {
      control: "select",
      options: [
        "auto",
        "glass",
        "frost",
        "glow",
        "aurora",
        "mint",
        "coral",
        "roseglass",
      ],
    },
  },
  args: {
    name: "田中 太郎",
    size: "md",
    tone: "auto",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const Initials: StoryObj<typeof meta> = {
  args: { name: "Mercari Labs" },
};

export const WithImage: StoryObj<typeof meta> = {
  args: {
    name: "Example",
    src: "https://i.pravatar.cc/96?img=12",
  },
};

export const Unassigned: StoryObj<typeof meta> = {
  args: { name: undefined, fallback: "?", tone: "coral" },
};

export const Sizes: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="XS Size" size="xs" />
      <Avatar name="SM Size" size="sm" />
      <Avatar name="MD Size" size="md" />
      <Avatar name="LG Size" size="lg" />
    </div>
  ),
};

export const AutoTones: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-3 justify-center">
      {[
        "田中 太郎",
        "Mercari Labs",
        "LayerX",
        "Hatena Systems",
        "Aurora Co.",
        "Sakura Studio",
        "Zenith",
        "Nova",
      ].map((name) => (
        <Avatar key={name} name={name} size="md" />
      ))}
    </div>
  ),
};
