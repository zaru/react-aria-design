import type { Meta } from "@storybook/react-vite";
import { GridListSection } from "react-aria-components/GridList";
import {
  GridList,
  GridListHeader,
  GridListItem,
  type GridListProps,
} from "../src/GridList";

const meta: Meta<typeof GridList> = {
  component: GridList,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    keyboardNavigationBehavior: {
      control: {
        type: "radio",
      },
      options: ["arrow", "tab"],
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: GridListProps<object>) => (
  <GridList aria-label="Ice cream flavors" {...args}>
    <GridListItem id="chocolate">Chocolate</GridListItem>
    <GridListItem id="mint">Mint</GridListItem>
    <GridListItem id="strawberry">Strawberry</GridListItem>
    <GridListItem id="vanilla">Vanilla</GridListItem>
  </GridList>
);

Example.args = {
  onAction: null,
  selectionMode: "multiple",
  keyboardNavigationBehavior: "arrow",
};

export const Horizontal = (args: GridListProps<object>) => (
  <GridList aria-label="Ice cream flavors" orientation="horizontal" {...args}>
    <GridListItem id="chocolate">Chocolate</GridListItem>
    <GridListItem id="mint">Mint</GridListItem>
    <GridListItem id="strawberry">Strawberry</GridListItem>
    <GridListItem id="vanilla">Vanilla</GridListItem>
  </GridList>
);

Horizontal.args = {
  ...Example.args,
};

export const DisabledItems = (args: GridListProps<object>) => (
  <Example {...args} />
);
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["mint"],
};

export const Sections = (args: GridListProps<object>) => (
  <GridList aria-label="Food" {...args}>
    <GridListSection>
      <GridListHeader>Fruits</GridListHeader>
      <GridListItem id="Apple">Apple</GridListItem>
      <GridListItem id="Grape">Grape</GridListItem>
      <GridListItem id="Peach">Peach</GridListItem>
      <GridListItem id="Melon">Melon</GridListItem>
    </GridListSection>
    <GridListSection>
      <GridListHeader>Vegetables</GridListHeader>
      <GridListItem id="brocoli">Broccoli</GridListItem>
      <GridListItem id="peas">Peas</GridListItem>
      <GridListItem id="brussels-sprouts">Brussels Sprouts</GridListItem>
      <GridListItem id="zucchini">Zucchini</GridListItem>
    </GridListSection>
  </GridList>
);

Sections.args = {
  onAction: null,
  selectionMode: "multiple",
};
