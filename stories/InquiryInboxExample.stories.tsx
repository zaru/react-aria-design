import type { Meta, StoryObj } from "@storybook/react-vite";
import { Crown } from "lucide-react";
import { useState } from "react";
import { Avatar } from "../src/Avatar";
import { Badge } from "../src/Badge";
import { InquirySummaryCard } from "../src/InquirySummaryCard";
import { PageGreeting } from "../src/PageGreeting";
import { SegmentedControl, SegmentedItem } from "../src/SegmentedControl";
import { Tag, TagGroup } from "../src/TagGroup";
import { glassBackdrop } from "./decorators";

type Scope = "self" | "team" | "unassigned";

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

const inquiries = [
  {
    id: "1",
    customer: "LayerX",
    title: "Webhook が送信されていない",
    preview:
      "3 日前から特定のイベントで Webhook が届いていません。ログでも確認できず。",
    status: "inProgress" as const,
    statusLabel: "対応中",
    category: "障害報告",
    timestamp: "10時間前",
    assignee: { name: "田中 太郎", label: "自分" },
  },
  {
    id: "2",
    customer: "Hatena Systems",
    title: "ユーザー招待メールが届かない",
    preview: "招待を送信しても相手にメールが届きません。迷惑メールも確認済み。",
    status: "waiting" as const,
    statusLabel: "回答待ち",
    category: "バグ報告",
    timestamp: "5時間前",
    assignee: { name: "田中 太郎", label: "自分" },
  },
  {
    id: "3",
    customer: "Mercari Labs",
    title: "ダッシュボードが読み込めない",
    preview:
      "朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しまし…",
    status: "pending" as const,
    statusLabel: "未対応",
    category: "障害報告",
    timestamp: "30分前",
    assignee: null,
  },
  {
    id: "4",
    customer: "Mercari Labs",
    title: "SAML ログイン後にリダイレクトされない",
    preview: "SAML 認証後、画面が真っ白になります。",
    status: "pending" as const,
    statusLabel: "未対応",
    category: "障害報告",
    timestamp: "1時間前",
    assignee: null,
  },
];

/**
 * プランラベル（属性）— 塗りなしのゴースト表示
 * 役割: ステータスピル（塗り+ドット）と視覚的に明確に区別するため、
 * プランは属性注釈として小さな大文字テキスト + 王冠アイコンで控えめに表現する。
 */
function PlanGhost({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-coral-700/90 dark:text-coral-300/90">
      <Crown aria-hidden className="size-3" strokeWidth={2.25} />
      {children}
    </span>
  );
}

export const InquiryInbox: StoryObj<typeof meta> = {
  render: () => {
    const [scope, setScope] = useState<Set<string | number>>(new Set(["team"]));
    const [filters, setFilters] = useState<Set<string | number>>(new Set());

    return (
      <div className="mx-auto w-full max-w-md flex flex-col gap-5 px-4 py-6 font-sans">
        <PageGreeting
          greeting="お疲れさまです、田中さん"
          summary={
            <>
              未解決の問い合わせは{" "}
              <strong className="text-glass-900 dark:text-glass-50">
                19件
              </strong>
            </>
          }
        />

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
        >
          <Tag id="pending">未対応</Tag>
          <Tag id="inProgress">対応中</Tag>
          <Tag id="waiting">回答待ち</Tag>
        </TagGroup>

        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <InquirySummaryCard
              key={inq.id}
              onPress={() => console.log("open", inq.id)}
              aria-label={`問い合わせを開く: ${inq.title}`}
              customer={inq.customer}
              customerBadge={<PlanGhost>Enterprise</PlanGhost>}
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
