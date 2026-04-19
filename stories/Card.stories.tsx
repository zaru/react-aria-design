import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Button } from "../src/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../src/Card";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Card",
  component: Card,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "frost", "glow"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
  args: {
    variant: "default",
    padding: "md",
  },
} satisfies Meta<typeof Card>;

export default meta;

function CardExample(args: ComponentProps<typeof Card>) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Card {...args}>
        <CardHeader>
          <CardTitle>ガラスカード</CardTitle>
          <CardDescription>
            汎用の Glassmorphism
            パネルです。ヘッダー・本文・フッターに分割して使えます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-glass-700 text-sm leading-relaxed dark:text-glass-300">
            半透明・ぼかし・淡い境界線で奥行きを出します。バリアントはニュートラル寄りの
            default、frost の寒色ニュアンス、glow
            のティール／オーロラ差し色から選べます。
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="primary">保存</Button>
          <Button variant="secondary">キャンセル</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export const Default: StoryObj<typeof meta> = {
  render: (args) => <CardExample {...args} />,
};

export const Frost: StoryObj<typeof meta> = {
  args: { variant: "frost" },
  render: (args) => <CardExample {...args} />,
};

export const Glow: StoryObj<typeof meta> = {
  args: { variant: "glow" },
  render: (args) => <CardExample {...args} />,
};

export const PaddingLg: StoryObj<typeof meta> = {
  args: { padding: "lg" },
  render: (args) => <CardExample {...args} />,
};

export const ContentOnly: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <Card {...args}>
        <CardContent>
          <p className="text-glass-800 text-sm dark:text-glass-200">
            ヘッダー／フッターなしのシンプルなパネル。通知や短い説明に向きます。
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
