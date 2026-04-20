import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/Card";
import { Checkbox } from "../src/Checkbox";
import { CheckboxGroup } from "../src/CheckboxGroup";
import { DateField } from "../src/DateField";
import { Form, type FormProps } from "../src/Form";
import { FormActions } from "../src/FormActions";
import { Radio, RadioGroup } from "../src/RadioGroup";
import { Select, SelectItem } from "../src/Select";
import { Switch } from "../src/Switch";
import { TextArea } from "../src/TextArea";
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
            <FormActions>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Full: StoryObj<typeof meta> = {
  render: (args: FormProps) => (
    <div className="mx-auto w-full max-w-xl px-4 py-8">
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>アカウント設定</CardTitle>
          <CardDescription>
            よく使われるフォームパーツを一通り配置したサンプルです。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...args}>
            <TextField
              label="表示名"
              name="displayName"
              placeholder="山田 太郎"
              isRequired
            />
            <TextField
              label="メールアドレス"
              name="email"
              type="email"
              placeholder="you@example.com"
              isRequired
            />
            <DateField label="生年月日" />
            <Select label="国/地域" name="country" defaultSelectedKey="jp">
              <SelectItem id="jp">日本</SelectItem>
              <SelectItem id="us">アメリカ</SelectItem>
              <SelectItem id="uk">イギリス</SelectItem>
              <SelectItem id="au">オーストラリア</SelectItem>
            </Select>
            <RadioGroup
              label="プラン"
              name="plan"
              defaultValue="standard"
              isRequired
            >
              <Radio value="free">Free</Radio>
              <Radio value="standard">Standard</Radio>
              <Radio value="pro">Pro</Radio>
            </RadioGroup>
            <CheckboxGroup label="興味のあるトピック" name="interests">
              <Checkbox value="design">デザイン</Checkbox>
              <Checkbox value="engineering">エンジニアリング</Checkbox>
              <Checkbox value="product">プロダクト</Checkbox>
              <Checkbox value="marketing">マーケティング</Checkbox>
            </CheckboxGroup>
            <TextArea
              label="自己紹介"
              name="bio"
              placeholder="あなたについて教えてください"
              rows={4}
            />
            <Switch name="notifications" defaultSelected>
              メール通知を受け取る
            </Switch>
            <FormActions>
              <Button type="reset" variant="secondary">
                リセット
              </Button>
              <Button type="submit">保存</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </div>
  ),
};
