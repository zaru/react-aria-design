import type { Meta, StoryObj } from "@storybook/react-vite";
import { AssigneeField } from "../src/AssigneeField";
import { Avatar } from "../src/Avatar";
import { Button } from "../src/Button";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "AssigneeField",
  component: AssigneeField,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  args: {
    name: "",
  },
} satisfies Meta<typeof AssigneeField>;

export default meta;

export const Unassigned: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <AssigneeField
        label="担当"
        avatar={<Avatar fallback="?" tone="coral" size="md" />}
        name="未アサイン"
        action={<Button variant="secondary">変更</Button>}
      />
    </div>
  ),
};

export const Assigned: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <AssigneeField
        label="担当"
        avatar={<Avatar name="田中 太郎" size="md" />}
        name="田中 太郎"
        action={<Button variant="secondary">変更</Button>}
      />
    </div>
  ),
};

export const WithoutAction: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <AssigneeField
        label="報告者"
        avatar={<Avatar name="Mercari Labs" size="md" />}
        name="Mercari Labs (山田 花子)"
      />
    </div>
  ),
};
