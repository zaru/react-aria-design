import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDownIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  PencilLineIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { AssigneeField } from "../src/AssigneeField";
import { Avatar } from "../src/Avatar";
import { Badge } from "../src/Badge";
import { Button } from "../src/Button";
import { Menu, MenuItem, MenuTrigger } from "../src/Menu";
import { MessageComposer } from "../src/MessageComposer";
import { MetaPill } from "../src/MetaPill";
import { SectionDivider } from "../src/SectionDivider";
import { TopBar } from "../src/TopBar";
import { glassBackdrop } from "./decorators";
import { PlanGhost } from "./PlanGhost";

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

type MessageKind = "incoming" | "outgoing" | "internal" | "draft";

type Attachment = {
  name: string;
  size: string;
  kind: "image" | "doc";
};

type ThreadMessage = {
  id: string;
  kind: MessageKind;
  authorName: string;
  authorTone?: "glow" | "coral" | "mint" | "frost";
  timestamp: string;
  body: ReactNode;
  attachments?: Attachment[];
  edited?: string;
  draftedBy?: string;
};

const messages: ThreadMessage[] = [
  {
    id: "m1",
    kind: "incoming",
    authorName: "Mercari Labs",
    timestamp: "2時間前",
    body: "朝から管理画面にアクセスするとスピナーが回り続けて表示されません。複数のアカウントで確認しました。",
  },
  {
    id: "m2",
    kind: "outgoing",
    authorName: "田中 太郎",
    authorTone: "glow",
    timestamp: "1時間前",
    body: "ご連絡ありがとうございます。現在、インフラチームで調査を進めておりますので、今しばらくお待ちください。",
  },
  {
    id: "m3",
    kind: "internal",
    authorName: "山田 翔",
    authorTone: "coral",
    timestamp: "55分前",
    body: (
      <>
        ログを確認したところ{" "}
        <code className="font-mono text-[0.78rem] px-1 py-px rounded bg-black/8 dark:bg-white/12">
          /api/dashboard/ping
        </code>{" "}
        で 504 が連続。先週デプロイした認証ミドルウェアが疑わしい。@田中
        ロールバック検討してください。
      </>
    ),
  },
  {
    id: "m4",
    kind: "incoming",
    authorName: "Mercari Labs",
    timestamp: "30分前",
    body: "先ほど再度試しましたが、改善していません。急ぎで確認をお願いします。",
    attachments: [
      { name: "screen_recording.mp4", size: "2.1MB", kind: "image" },
    ],
  },
  {
    id: "m5",
    kind: "outgoing",
    authorName: "田中 太郎",
    authorTone: "glow",
    timestamp: "たった今",
    body: "原因が判明しました。該当の API キャッシュを再構築しましたので、再度お試しください。",
    edited: "編集済み 2分前",
  },
  {
    id: "m6",
    kind: "draft",
    authorName: "田中 太郎",
    authorTone: "glow",
    timestamp: "下書き保存中",
    draftedBy: "田中 太郎",
    body: "重ねてのご連絡となり恐縮ですが、再発防止策として監視ジョブを追加いたします。完了次第、改めてご報告いたします…",
  },
];

type CardStyle = "default" | "sticker" | "tail" | "glow" | "paper";

const cardTint: Record<MessageKind, string> = {
  incoming:
    "ring-black/10 bg-white/55 dark:ring-white/12 dark:bg-glass-800/55",
  outgoing:
    "ring-glow-400/30 bg-glow-50/55 dark:ring-glow-400/22 dark:bg-glow-950/35",
  internal:
    "ring-coral-400/35 bg-coral-50/65 dark:ring-coral-400/25 dark:bg-coral-950/30",
  draft:
    "ring-glass-400/35 bg-white/35 dark:ring-glass-500/30 dark:bg-glass-800/30",
};

const cardTintGlow: Record<MessageKind, string> = {
  incoming:
    "ring-white/40 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0.3)_55%)] dark:ring-white/15 dark:bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.18),rgba(15,23,42,0.55)_55%)]",
  outgoing:
    "ring-glow-300/45 bg-[radial-gradient(120%_80%_at_15%_0%,var(--color-glow-100),var(--color-glow-50)_70%)] dark:ring-glow-400/30 dark:bg-[radial-gradient(120%_80%_at_15%_0%,var(--color-glow-700)_/_70%,var(--color-glow-950)_/_60%_70%)]",
  internal:
    "ring-coral-300/55 bg-[radial-gradient(120%_80%_at_15%_0%,var(--color-coral-100),var(--color-coral-50)_70%)] dark:ring-coral-400/35 dark:bg-[radial-gradient(120%_80%_at_15%_0%,var(--color-coral-700)_/_60%,var(--color-coral-950)_/_55%_70%)]",
  draft:
    "ring-glass-400/35 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.55),rgba(255,255,255,0.15)_55%)] dark:ring-glass-500/30 dark:bg-glass-800/30",
};

const cardTintPaper: Record<MessageKind, string> = {
  incoming:
    "ring-roseglass-200/40 bg-linear-to-b from-roseglass-50/85 via-white/65 to-white/55 dark:ring-white/12 dark:bg-glass-800/60",
  outgoing:
    "ring-glow-300/45 bg-linear-to-b from-glow-100/90 via-glow-50/65 to-white/45 dark:ring-glow-400/25 dark:bg-glow-950/40",
  internal:
    "ring-coral-300/50 bg-linear-to-b from-coral-100/90 via-coral-50/70 to-white/55 dark:ring-coral-400/30 dark:bg-coral-950/35",
  draft:
    "ring-glass-300/40 bg-linear-to-b from-white/70 to-white/40 dark:ring-glass-500/30 dark:bg-glass-800/30",
};

const visibilityChip: Record<
  MessageKind,
  { label: string; variant: "neutral" | "info" | "waiting" }
> = {
  incoming: { label: "顧客", variant: "neutral" },
  outgoing: { label: "顧客への返信", variant: "info" },
  internal: { label: "社内メモ", variant: "waiting" },
  draft: { label: "下書き", variant: "neutral" },
};

function MessageCard({
  message,
  style = "default",
}: {
  message: ThreadMessage;
  style?: CardStyle;
}) {
  const chip = visibilityChip[message.kind];
  const own = message.kind !== "incoming";

  const tintTable =
    style === "glow"
      ? cardTintGlow
      : style === "paper"
        ? cardTintPaper
        : cardTint;

  // Style-specific shadow / motion / shape
  const baseShadow =
    "shadow-[0_10px_24px_-18px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:shadow-[0_12px_28px_-22px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)]";
  const stickerShadow =
    "shadow-[6px_10px_24px_-10px_rgba(15,23,42,0.28),0_2px_4px_-2px_rgba(15,23,42,0.12),inset_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[8px_12px_28px_-12px_rgba(0,0,0,0.7),0_2px_6px_-2px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]";
  const glowShadow =
    "shadow-[0_18px_40px_-22px_rgba(15,23,42,0.3),0_2px_6px_-3px_rgba(15,23,42,0.12),inset_1px_1px_0_rgba(255,255,255,0.65)] dark:shadow-[0_22px_48px_-22px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.22)]";
  const paperShadow =
    "shadow-[2px_4px_0_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_10px_22px_-14px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const shapeClasses =
    style === "tail"
      ? "rounded-2xl rounded-tl-md"
      : style === "sticker"
        ? "rounded-3xl"
        : "rounded-2xl";

  const shadowClasses =
    style === "sticker"
      ? stickerShadow
      : style === "glow"
        ? glowShadow
        : style === "paper"
          ? paperShadow
          : baseShadow;

  const interactiveClasses =
    style === "glow"
      ? "transition-[transform,box-shadow,filter] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-22px_rgba(15,23,42,0.32),0_3px_8px_-3px_rgba(15,23,42,0.14),inset_1px_1px_0_rgba(255,255,255,0.7)] hover:brightness-[1.02] active:translate-y-0 active:shadow-[0_10px_22px_-16px_rgba(15,23,42,0.22),inset_1px_1px_0_rgba(255,255,255,0.55)]"
      : "";

  return (
    <article
      style={{
        // @ts-ignore まだ型定義が未対応
        cornerShape: "squircle",
      }}
      className={twMerge(
        "p-3 ring-1 backdrop-blur-2xl backdrop-saturate-150 font-sans flex flex-col gap-2",
        shapeClasses,
        shadowClasses,
        interactiveClasses,
        tintTable[message.kind],
        message.kind === "draft" &&
          "outline-2 outline-dashed outline-glass-400/45 outline-offset-[-1px]",
        own ? "ml-8" : "mr-8",
      )}
    >
      <header className="flex items-center gap-2 min-w-0">
        <Avatar
          name={message.authorName}
          size={style === "sticker" ? "md" : "sm"}
          tone={message.authorTone ?? "auto"}
          className={twMerge(
            style === "sticker" &&
              "-mt-4 -ml-1 ring-2 ring-white/85 dark:ring-glass-900/85 shadow-[0_4px_10px_-4px_rgba(15,23,42,0.35)]",
          )}
        />
        <span className="text-sm font-medium text-glass-900 dark:text-glass-100 truncate">
          {message.authorName}
        </span>
        <Badge size="sm" variant={chip.variant}>
          {chip.label}
        </Badge>
        <span className="ml-auto shrink-0 text-[11px] text-glass-500 dark:text-glass-400 tabular-nums">
          {message.timestamp}
        </span>
        <button
          type="button"
          aria-label="メッセージのメニュー"
          className="shrink-0 -mr-1 inline-flex items-center justify-center size-7 rounded-full text-glass-500 dark:text-glass-400 hover:bg-black/5 dark:hover:bg-white/8"
        >
          <MoreHorizontalIcon className="size-4" aria-hidden />
        </button>
      </header>
      <div className="text-sm leading-relaxed text-glass-900 dark:text-glass-50">
        {message.body}
      </div>
      {(message.attachments || message.edited || message.draftedBy) && (
        <footer className="flex flex-wrap items-center gap-1.5 text-[11px] text-glass-500 dark:text-glass-400">
          {message.attachments?.map((a) => (
            <span
              key={a.name}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/8 pl-1.5 pr-2 py-0.5"
            >
              {a.kind === "image" ? (
                <ImageIcon className="size-3" aria-hidden />
              ) : (
                <FileTextIcon className="size-3" aria-hidden />
              )}
              <span className="text-glass-700 dark:text-glass-200">
                {a.name}
              </span>
              <span className="text-glass-400 dark:text-glass-500 tabular-nums">
                {a.size}
              </span>
            </span>
          ))}
          {message.edited && (
            <span className="inline-flex items-center gap-1">
              <PencilLineIcon className="size-3" aria-hidden />
              {message.edited}
            </span>
          )}
          {message.draftedBy && <span>下書き by {message.draftedBy}</span>}
        </footer>
      )}
    </article>
  );
}


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
              <PlanGhost>Enterprise</PlanGhost>
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

          <div data-uidotsh-pick="Card design" className="contents">
            <div data-uidotsh-option="Default (current)" className="contents">
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <MessageCard key={m.id} message={m} style="default" />
                ))}
              </div>
            </div>
            <div data-uidotsh-option="Sticker pop" className="contents" hidden>
              <div className="flex flex-col gap-5 pt-2">
                {messages.map((m) => (
                  <MessageCard key={m.id} message={m} style="sticker" />
                ))}
              </div>
            </div>
            <div data-uidotsh-option="Tail" className="contents" hidden>
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <MessageCard key={m.id} message={m} style="tail" />
                ))}
              </div>
            </div>
            <div data-uidotsh-option="Liquid glow" className="contents" hidden>
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <MessageCard key={m.id} message={m} style="glow" />
                ))}
              </div>
            </div>
            <div data-uidotsh-option="Paper memo" className="contents" hidden>
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <MessageCard key={m.id} message={m} style="paper" />
                ))}
              </div>
            </div>
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
