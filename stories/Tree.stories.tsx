import type { Meta } from "@storybook/react-vite";
import { Tree, TreeItem, type TreeProps } from "../src/Tree";

const meta: Meta<typeof Tree> = {
  component: Tree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: TreeProps<object>) => (
  <Tree
    aria-label="Files"
    style={{ height: "400px", width: "300px" }}
    {...args}
  >
    <TreeItem title="Documents">
      <TreeItem title="Project">
        <TreeItem title="Weekly Report" />
      </TreeItem>
    </TreeItem>
    <TreeItem title="Photos">
      <TreeItem title="Image 1" />
      <TreeItem title="Image 2" />
    </TreeItem>
  </Tree>
);

Example.args = {
  onAction: null,
  defaultExpandedKeys: ["documents", "photos", "project"],
  selectionMode: "multiple",
  defaultSelectedKeys: ["project"],
};

export const DisabledItems = (args: TreeProps<object>) => <Example {...args} />;
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["photos"],
};
