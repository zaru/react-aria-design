import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../src/Button";
import { MessageComposer } from "../src/MessageComposer";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "MessageComposer",
  component: MessageComposer,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageComposer>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <MessageComposer
        placeholder="顧客への返信を入力"
        onSubmitMessage={(value) => {
          console.log("submit", value);
        }}
      />
    </div>
  ),
};

export const WithActions: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <MessageComposer
        placeholder="顧客への返信を入力"
        actions={<Button variant="destructive">対応中にする</Button>}
        onSubmitMessage={(value) => {
          console.log("submit", value);
        }}
      />
    </div>
  ),
};

export const Controlled: StoryObj<typeof meta> = {
  render: () => {
    const [value, setValue] = useState(
      "担当者を確認次第、改めてご返信いたします。",
    );
    return (
      <div className="mx-auto w-full max-w-md flex flex-col gap-3">
        <MessageComposer
          placeholder="返信を入力"
          value={value}
          onValueChange={setValue}
          onSubmitMessage={(v) => console.log("submit", v)}
        />
        <p className="text-xs text-glass-500 dark:text-glass-400 font-sans">
          現在の入力: {value || "(空)"}
        </p>
      </div>
    );
  },
};

export const Disabled: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <MessageComposer
        placeholder="この問い合わせは解決済みです"
        defaultValue=""
        isDisabled
      />
    </div>
  ),
};

export const Pending: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <MessageComposer
        placeholder="送信中..."
        defaultValue="送信中のメッセージ内容"
        isPending
      />
    </div>
  ),
};
