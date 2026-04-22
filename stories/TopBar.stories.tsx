import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../src/Button";
import { TopBar } from "../src/TopBar";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "TopBar",
  component: TopBar,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <TopBar title="問い合わせ" onBack={() => console.log("back")} />
    </div>
  ),
};

export const WithTrailing: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <TopBar
        title="問い合わせ"
        onBack={() => console.log("back")}
        trailing={
          <Button variant="quiet" aria-label="メニュー">
            <MoreHorizontalIcon aria-hidden className="w-5 h-5" />
          </Button>
        }
      />
    </div>
  ),
};

export const TitleOnly: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <TopBar title="設定" />
    </div>
  ),
};

export const LongTitle: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <TopBar
        title="ダッシュボードが読み込めない — Mercari Labs"
        onBack={() => console.log("back")}
      />
    </div>
  ),
};
