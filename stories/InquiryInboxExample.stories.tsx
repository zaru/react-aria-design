import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Avatar } from "../src/Avatar";
import { Badge } from "../src/Badge";
import { InquirySummaryCard } from "../src/InquirySummaryCard";
import { SegmentedControl, SegmentedItem } from "../src/SegmentedControl";
import { Tag, TagGroup } from "../src/TagGroup";
import { glassBackdrop } from "./decorators";
import { type Plan, PlanGhost } from "./PlanGhost";

type Scope = "self" | "team" | "unassigned";
type Status = "pending" | "inProgress" | "waiting";

const meta = {
  title: "Examples/InquiryInbox",
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;

const planLabel: Record<Plan, string> = {
  enterprise: "Enterprise",
  pro: "Pro",
  free: "Free",
};

const statusRank: Record<Status, number> = {
  pending: 0,
  inProgress: 1,
  waiting: 2,
};
const planRank: Record<Plan, number> = { enterprise: 0, pro: 1, free: 2 };

type Inquiry = {
  id: string;
  customer: string;
  plan: Plan;
  title: string;
  preview: string;
  status: Status;
  statusLabel: string;
  category: string;
  timestamp: string;
  assignee: { name: string; label: string } | null;
};

const inquiries: Inquiry[] = [
  {
    id: "1",
    customer: "LayerX",
    plan: "enterprise",
    title: "Webhook が送信されていない",
    preview:
      "3 日前から特定のイベントで Webhook が届いていません。ログでも確認できず。",
    status: "inProgress",
    statusLabel: "対応中",
    category: "障害報告",
    timestamp: "10時間前",
    assignee: { name: "田中 太郎", label: "自分" },
  },
  {
    id: "2",
    customer: "Hatena Systems",
    plan: "pro",
    title: "ユーザー招待メールが届かない",
    preview: "招待を送信しても相手にメールが届きません。迷惑メールも確認済み。",
    status: "waiting",
    statusLabel: "回答待ち",
    category: "バグ報告",
    timestamp: "5時間前",
    assignee: { name: "田中 太郎", label: "自分" },
  },
  {
    id: "3",
    customer: "Mercari Labs",
    plan: "enterprise",
    title: "ダッシュボードが読み込めない",
    preview:
      "朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しまし…",
    status: "pending",
    statusLabel: "未対応",
    category: "障害報告",
    timestamp: "30分前",
    assignee: null,
  },
  {
    id: "4",
    customer: "Mercari Labs",
    plan: "enterprise",
    title: "SAML ログイン後にリダイレクトされない",
    preview: "SAML 認証後、画面が真っ白になります。",
    status: "pending",
    statusLabel: "未対応",
    category: "障害報告",
    timestamp: "1時間前",
    assignee: null,
  },
  {
    id: "5",
    customer: "Suzuki Dental",
    plan: "pro",
    title: "請求書 PDF が表示できない",
    preview: "請求書を開くとエラーになります。ブラウザを変えても同様。",
    status: "pending",
    statusLabel: "未対応",
    category: "バグ報告",
    timestamp: "2時間前",
    assignee: null,
  },
  {
    id: "6",
    customer: "Yamada Craft",
    plan: "free",
    title: "プラン変更の手順が知りたい",
    preview: "Free から Pro にアップグレードしたいのですが、どこから可能でしょうか？",
    status: "inProgress",
    statusLabel: "対応中",
    category: "質問",
    timestamp: "4時間前",
    assignee: { name: "佐藤 花子", label: "佐藤" },
  },
];

const sortedInquiries = [...inquiries].sort(
  (a, b) => statusRank[a.status] - statusRank[b.status] || planRank[a.plan] - planRank[b.plan],
);

export const InquiryInbox: StoryObj<typeof meta> = {
  render: () => {
    const [scope, setScope] = useState<Set<string | number>>(new Set(["team"]));
    const [filters, setFilters] = useState<Set<string | number>>(new Set());

    return (
      <div className="mx-auto w-full max-w-md flex flex-col gap-4 px-4 py-5 font-sans">
        <header className="flex items-center justify-between gap-3 px-1">
          <p className="text-sm text-glass-600 dark:text-glass-400">
            田中さん、未解決{" "}
            <strong className="text-base font-semibold text-glass-950 dark:text-glass-50">
              19
            </strong>{" "}
            件
          </p>
          <Avatar name="田中 太郎" size="sm" />
        </header>

        <div
          role="group"
          aria-label="問い合わせの絞り込み"
          className="flex flex-col gap-1.5"
        >
          <SegmentedControl
            selectedKeys={scope}
            onSelectionChange={(keys) => setScope(keys as Set<Scope>)}
            aria-label="表示範囲"
            className="self-stretch justify-stretch"
          >
            <SegmentedItem id="self" className="flex-1">
              自分
            </SegmentedItem>
            <SegmentedItem id="team" className="flex-1">
              チーム
            </SegmentedItem>
            <SegmentedItem id="unassigned" className="flex-1">
              未アサイン
            </SegmentedItem>
          </SegmentedControl>

          <TagGroup
            aria-label="ステータスで絞り込み"
            selectionMode="multiple"
            selectedKeys={filters}
            onSelectionChange={(keys) =>
              setFilters(keys === "all" ? new Set() : (keys as Set<string>))
            }
            className="px-1"
          >
            <Tag id="pending">未対応</Tag>
            <Tag id="inProgress">対応中</Tag>
            <Tag id="waiting">回答待ち</Tag>
          </TagGroup>
        </div>

        <div className="flex flex-col gap-3">
          {sortedInquiries.map((inq) => (
            <InquirySummaryCard
              key={inq.id}
              onPress={() => console.log("open", inq.id)}
              aria-label={`問い合わせを開く: ${inq.title}`}
              customer={inq.customer}
              customerBadge={
                <PlanGhost plan={inq.plan}>{planLabel[inq.plan]}</PlanGhost>
              }
              title={inq.title}
              preview={inq.preview}
              status={
                <Badge variant={inq.status} withDot>
                  {inq.statusLabel}
                </Badge>
              }
              category={inq.category}
              timestamp={inq.timestamp}
              assignee={
                inq.assignee ? (
                  <>
                    <Avatar name={inq.assignee.name} size="xs" />
                    {inq.assignee.label}
                  </>
                ) : (
                  <span className="italic text-glass-500 dark:text-glass-500">
                    未アサイン
                  </span>
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
