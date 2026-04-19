import type { Meta } from "@storybook/react-vite";
import { Form } from "react-aria-components/Form";
import { Button } from "../src/Button";
import { SearchField, type SearchFieldProps } from "../src/SearchField";

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Search",
    placeholder: "Search documents",
  },
};

export default meta;

export const Example = (args: SearchFieldProps) => <SearchField {...args} />;

export const Validation = (args: SearchFieldProps) => (
  <Form className="flex flex-col gap-2 items-start">
    <SearchField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
