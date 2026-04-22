import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AssigneeField } from "../src/AssigneeField";
import { Avatar } from "../src/Avatar";
import { Badge } from "../src/Badge";
import { Button } from "../src/Button";
import { Menu, MenuItem, MenuTrigger } from "../src/Menu";
import { MessageBubble } from "../src/MessageBubble";
import { MessageComposer } from "../src/MessageComposer";
import { MetaPill } from "../src/MetaPill";
import { SectionDivider } from "../src/SectionDivider";
import { TopBar } from "../src/TopBar";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Examples/InquiryThread",
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;

type TicketStatus = "未対応" | "対応中" | "顧客対応待ち" | "解決";

const statusDotClass: Record<TicketStatus, string> = {
  未対応: "bg-roseglass-500",
  対応中: "bg-glow-500",
  顧客対応待ち: "bg-coral-500",
  解決: "bg-mint-500",
};

const statusOrder: TicketStatus[] = [
  "未対応",
  "対応中",
  "顧客対応待ち",
  "解決",
];

const StatusDot = ({ status }: { status: TicketStatus }) => (
  <span
    aria-hidden
    className={`inline-block w-1.5 h-1.5 rounded-full ${statusDotClass[status]}`}
  />
);

const StatusMenu = ({
  current,
  trigger,
}: {
  current: TicketStatus;
  trigger: ReactNode;
}) => (
  <MenuTrigger>
    {trigger}
    <Menu>
      {statusOrder.map((s) => (
        <MenuItem
          key={s}
          onAction={() => console.log("set status", s)}
          textValue={s}
        >
          <StatusDot status={s} />
          <span className={s === current ? "font-semibold" : ""}>{s}</span>
        </MenuItem>
      ))}
    </Menu>
  </MenuTrigger>
);

export const InquiryThread: StoryObj<typeof meta> = {
  render: () => {
    const current: TicketStatus = "未対応";

    return (
      <div className="mx-auto w-full max-w-md flex flex-col font-sans">
        <TopBar title="問い合わせ" onBack={() => console.log("back")} />

        <div className="flex flex-col gap-4 px-4 py-5">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm text-glass-700 dark:text-glass-200">
                Mercari Labs
              </span>
              <Badge variant="enterprise">Enterprise</Badge>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-glass-950 dark:text-glass-50">
              ダッシュボードが読み込めない
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
              <MetaPill label="カテゴリ" value="障害報告" />
              <StatusMenu
                current={current}
                trigger={
                  <Button
                    variant="secondary"
                    className="h-auto px-3 py-1 rounded-full text-xs font-normal gap-1.5"
                  >
                    <span className="text-glass-500 dark:text-glass-400">
                      状態
                    </span>
                    <StatusDot status={current} />
                    <span className="font-medium text-glass-900 dark:text-glass-100">
                      {current}
                    </span>
                    <ChevronDownIcon
                      aria-hidden
                      className="w-3 h-3 text-glass-500 dark:text-glass-400"
                    />
                  </Button>
                }
              />
            </div>
          </header>

          <AssigneeField
            label="担当"
            avatar={<Avatar fallback="?" tone="coral" size="md" />}
            name="未アサイン"
            action={<Button variant="secondary">変更</Button>}
          />

          <SectionDivider>4/21 18:41 に受信</SectionDivider>

          <div className="flex flex-col gap-4">
            <MessageBubble
              avatar={<Avatar name="Mercari Labs" size="sm" />}
              senderName="Mercari Labs"
              timestamp="2時間前"
            >
              朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しました。
            </MessageBubble>
            <MessageBubble
              align="end"
              variant="glow"
              avatar={<Avatar name="田中 太郎" size="sm" tone="glow" />}
              senderName="田中 太郎（自分）"
              timestamp="1時間前"
            >
              ご連絡ありがとうございます。現在、インフラチームで調査を進めておりますので、今しばらくお待ちください。
            </MessageBubble>
            <MessageBubble
              avatar={<Avatar name="Mercari Labs" size="sm" />}
              senderName="Mercari Labs"
              timestamp="30分前"
            >
              先ほど再度試しましたが、改善していません。急ぎで確認をお願いします。
            </MessageBubble>
            <MessageBubble
              align="end"
              variant="glow"
              avatar={<Avatar name="田中 太郎" size="sm" tone="glow" />}
              senderName="田中 太郎（自分）"
              timestamp="たった今"
            >
              原因が判明しました。該当の API
              キャッシュを再構築しましたので、再度お試しください。
            </MessageBubble>
          </div>
        </div>

        <div className="mt-auto px-4 pb-5 pt-3 flex flex-col gap-1">
          <MessageComposer
            placeholder="顧客への返信を入力"
            onSubmitMessage={(value) => console.log("submit", value)}
          />
          <p className="text-[11px] text-glass-500 dark:text-glass-400 px-3">
            送信すると状態を
            <span className="font-medium text-glass-700 dark:text-glass-300">
              「顧客対応待ち」
            </span>
            に変更します
          </p>
        </div>
      </div>
    );
  },
};
