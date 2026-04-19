import type { Meta } from "@storybook/react-vite";
import { Tag, TagGroup, type TagGroupProps } from "../src/TagGroup";

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: TagGroupProps<object>) => (
  <TagGroup {...args}>
    <Tag>Chocolate</Tag>
    <Tag isDisabled>Mint</Tag>
    <Tag>Strawberry</Tag>
    <Tag>Vanilla</Tag>
  </TagGroup>
);

Example.args = {
  label: "Ice cream flavor",
  selectionMode: "single",
};
