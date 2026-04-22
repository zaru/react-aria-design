import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../src/Badge";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Badge",
  component: Badge,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "neutral",
        "enterprise",
        "pending",
        "inProgress",
        "waiting",
        "done",
        "info",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    withDot: { control: "boolean" },
  },
  args: {
    variant: "neutral",
    size: "md",
    withDot: false,
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const Enterprise: StoryObj<typeof meta> = {
  args: { variant: "enterprise", children: "Enterprise" },
};

export const StatusPending: StoryObj<typeof meta> = {
  args: { variant: "pending", withDot: true, children: "未対応" },
};

export const StatusInProgress: StoryObj<typeof meta> = {
  args: { variant: "inProgress", withDot: true, children: "対応中" },
};

export const StatusWaiting: StoryObj<typeof meta> = {
  args: { variant: "waiting", withDot: true, children: "回答待ち" },
};

export const StatusDone: StoryObj<typeof meta> = {
  args: { variant: "done", withDot: true, children: "解決済み" },
};

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-2 justify-center">
      <Badge variant="neutral">neutral</Badge>
      <Badge variant="enterprise">Enterprise</Badge>
      <Badge variant="pending" withDot>
        未対応
      </Badge>
      <Badge variant="inProgress" withDot>
        対応中
      </Badge>
      <Badge variant="waiting" withDot>
        回答待ち
      </Badge>
      <Badge variant="done" withDot>
        解決済み
      </Badge>
      <Badge variant="info">info</Badge>
    </div>
  ),
};
