import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../src/Avatar";
import { MessageBubble } from "../src/MessageBubble";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "MessageBubble",
  component: MessageBubble,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
    variant: { control: "select", options: ["default", "frost", "glow"] },
  },
  args: {
    align: "start",
    variant: "default",
    senderName: "Mercari Labs",
    timestamp: "2時間前",
    children:
      "朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しました。",
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <MessageBubble
        {...args}
        avatar={<Avatar name="Mercari Labs" size="sm" />}
      />
    </div>
  ),
};

export const OutgoingGlow: StoryObj<typeof meta> = {
  args: {
    align: "end",
    variant: "glow",
    senderName: "自分",
    timestamp: "たった今",
    children: "ご報告ありがとうございます。担当者が確認に入ります。",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <MessageBubble
        {...args}
        avatar={<Avatar name="サポート" size="sm" tone="glow" />}
      />
    </div>
  ),
};

export const Conversation: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md flex flex-col gap-4">
      <MessageBubble
        align="start"
        avatar={<Avatar name="Mercari Labs" size="sm" />}
        senderName="Mercari Labs"
        timestamp="2時間前"
      >
        朝から管理画面にアクセスするとスピナーが回り続けて表示されません。
      </MessageBubble>
      <MessageBubble
        align="start"
        avatar={<Avatar name="Mercari Labs" size="sm" />}
        senderName="Mercari Labs"
        timestamp="30分前"
      >
        先ほど再度試しましたが、改善していません。急ぎで確認をお願いします。
      </MessageBubble>
      <MessageBubble
        align="end"
        variant="glow"
        avatar={<Avatar name="サポート" size="sm" tone="glow" />}
        senderName="自分"
        timestamp="5分前"
      >
        現在、調査しております。10 分ほどお待ちください。
      </MessageBubble>
    </div>
  ),
};

export const LongContent: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <MessageBubble
        avatar={<Avatar name="Mercari Labs" size="sm" />}
        senderName="Mercari Labs"
        timestamp="たった今"
      >
        ダッシュボードにアクセスすると、画面全体にスピナーが回転し続けたまま 5
        分以上経っても表示されません。Chrome と Safari
        で同じ挙動を確認しました。社内のエンジニアが開発者ツールでも確認しましたが、ネットワーク応答は
        200 で返ってきています。再現手順と画面録画を添付します。
      </MessageBubble>
    </div>
  ),
};
