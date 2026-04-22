import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SegmentedControl, SegmentedItem } from "../src/SegmentedControl";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "SegmentedControl",
  component: SegmentedControl,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(
      new Set(["team"]),
    );
    return (
      <div className="flex justify-center">
        <SegmentedControl
          selectedKeys={selected}
          onSelectionChange={(keys) => setSelected(keys as Set<string>)}
          aria-label="問い合わせの表示範囲"
        >
          <SegmentedItem id="self">自分</SegmentedItem>
          <SegmentedItem id="team">チーム</SegmentedItem>
          <SegmentedItem id="unassigned">未アサイン</SegmentedItem>
        </SegmentedControl>
      </div>
    );
  },
};

export const TwoItems: StoryObj<typeof meta> = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(
      new Set(["open"]),
    );
    return (
      <div className="flex justify-center">
        <SegmentedControl
          selectedKeys={selected}
          onSelectionChange={(keys) => setSelected(keys as Set<string>)}
          aria-label="ステート"
        >
          <SegmentedItem id="open">未解決</SegmentedItem>
          <SegmentedItem id="closed">解決済み</SegmentedItem>
        </SegmentedControl>
      </div>
    );
  },
};

export const Disabled: StoryObj<typeof meta> = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(
      new Set(["team"]),
    );
    return (
      <div className="flex justify-center">
        <SegmentedControl
          selectedKeys={selected}
          onSelectionChange={(keys) => setSelected(keys as Set<string>)}
          isDisabled
          aria-label="無効状態"
        >
          <SegmentedItem id="self">自分</SegmentedItem>
          <SegmentedItem id="team">チーム</SegmentedItem>
          <SegmentedItem id="unassigned">未アサイン</SegmentedItem>
        </SegmentedControl>
      </div>
    );
  },
};
