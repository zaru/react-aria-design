import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../src/Avatar";
import { PageGreeting } from "../src/PageGreeting";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "PageGreeting",
  component: PageGreeting,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  args: {
    greeting: "",
  },
} satisfies Meta<typeof PageGreeting>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md px-6">
      <PageGreeting
        greeting="お疲れさまです、田中さん"
        summary={
          <>
            未解決の問い合わせは{" "}
            <strong className="text-glass-900 dark:text-glass-50">19件</strong>
          </>
        }
      />
    </div>
  ),
};

export const WithAvatar: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md px-6">
      <PageGreeting
        greeting="お疲れさまです、田中さん"
        summary="未解決の問い合わせは 19件"
        trailing={<Avatar name="田中 太郎" size="lg" />}
      />
    </div>
  ),
};

export const GreetingOnly: StoryObj<typeof meta> = {
  render: () => (
    <div className="mx-auto w-full max-w-md px-6">
      <PageGreeting greeting="ようこそ" />
    </div>
  ),
};
