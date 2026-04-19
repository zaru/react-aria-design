import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/Card";
import { DateField } from "../src/DateField";
import { Form, type FormProps } from "../src/Form";
import { TextField } from "../src/TextField";
import { glassBackdrop } from "./decorators";

const meta = {
  title: "Form",
  component: Form,
  decorators: [glassBackdrop],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;

export const Example: StoryObj<typeof meta> = {
  render: (args: FormProps) => (
    <div className="mx-auto w-full max-w-lg px-4">
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>フォーム</CardTitle>
          <CardDescription>
            ガラスパネル上での入力レイアウトを確認できます（実アプリに近い見た目）。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...args}>
            <TextField
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              isRequired
            />
            <DateField label="Birth date" isRequired />
            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  ),
};
