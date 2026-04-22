import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../src/Avatar";
import { Badge } from "../src/Badge";
import { InquirySummaryCard } from "../src/InquirySummaryCard";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "InquirySummaryCard",
  component: InquirySummaryCard,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InquirySummaryCard>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <InquirySummaryCard
        customer="LayerX"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="Webhook が送信されていない"
        preview="3 日前から特定のイベントで Webhook が届いていません。ログでも確認できず。"
        status={
          <Badge variant="inProgress" withDot>
            対応中
          </Badge>
        }
        category="障害報告"
        timestamp="10時間前"
        assignee={
          <>
            <Avatar name="田中 太郎" size="xs" />
            自分
          </>
        }
      />
    </div>
  ),
};

export const Pressable: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <InquirySummaryCard
        onPress={() => console.log("pressed")}
        aria-label="問い合わせを開く: ダッシュボードが読み込めない"
        customer="Mercari Labs"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="ダッシュボードが読み込めない"
        preview="朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しました…"
        status={
          <Badge variant="pending" withDot>
            未対応
          </Badge>
        }
        category="障害報告"
        timestamp="30分前"
        assignee={<span className="italic text-glass-500">未アサイン</span>}
      />
    </div>
  ),
};

export const Waiting: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <InquirySummaryCard
        customer="Hatena Systems"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="ユーザー招待メールが届かない"
        preview="招待を送信しても相手にメールが届きません。迷惑メールも確認済み。"
        status={
          <Badge variant="waiting" withDot>
            回答待ち
          </Badge>
        }
        category="バグ報告"
        timestamp="5時間前"
        assignee={
          <>
            <Avatar name="田中 太郎" size="xs" />
            自分
          </>
        }
      />
    </div>
  ),
};

export const List: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md flex flex-col gap-3">
      <InquirySummaryCard
        customer="LayerX"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="Webhook が送信されていない"
        preview="3 日前から特定のイベントで Webhook が届いていません。"
        status={
          <Badge variant="inProgress" withDot>
            対応中
          </Badge>
        }
        category="障害報告"
        timestamp="10時間前"
        assignee={
          <>
            <Avatar name="田中 太郎" size="xs" />
            自分
          </>
        }
      />
      <InquirySummaryCard
        customer="Hatena Systems"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="ユーザー招待メールが届かない"
        preview="招待を送信しても相手にメールが届きません。"
        status={
          <Badge variant="waiting" withDot>
            回答待ち
          </Badge>
        }
        category="バグ報告"
        timestamp="5時間前"
        assignee={
          <>
            <Avatar name="田中 太郎" size="xs" />
            自分
          </>
        }
      />
      <InquirySummaryCard
        customer="Mercari Labs"
        customerBadge={<Badge variant="enterprise">Enterprise</Badge>}
        title="ダッシュボードが読み込めない"
        preview="朝から管理画面にアクセスするとスピナーが回り続けて表示されません。"
        status={
          <Badge variant="pending" withDot>
            未対応
          </Badge>
        }
        category="障害報告"
        timestamp="30分前"
        assignee={<span className="italic text-glass-500">未アサイン</span>}
      />
    </div>
  ),
};
