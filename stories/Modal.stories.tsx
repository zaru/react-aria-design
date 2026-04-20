import type { Meta } from "@storybook/react-vite";
import { DialogTrigger } from "react-aria-components/Dialog";
import { Heading } from "react-aria-components/Heading";
import { Button } from "../src/Button";
import { Dialog } from "../src/Dialog";
import { Form } from "../src/Form";
import { FormActions } from "../src/FormActions";
import { Modal } from "../src/Modal";
import { TextField } from "../src/TextField";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = () => (
  <DialogTrigger>
    <Button variant="secondary">プロフィール編集</Button>
    <Modal>
      <Dialog>
        {({ close }) => (
          <>
            <Heading
              slot="title"
              className="text-xl font-semibold leading-6 my-0"
            >
              プロフィール編集
            </Heading>
            <p className="mt-2 text-sm text-glass-600 dark:text-glass-300">
              変更内容は保存するまで反映されません。
            </p>
            <Form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                close();
              }}
            >
              <TextField
                label="表示名"
                name="displayName"
                placeholder="山田 太郎"
                defaultValue="山田 太郎"
                isRequired
              />
              <TextField
                label="メールアドレス"
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue="taro@example.com"
                isRequired
              />
              <TextField
                label="自己紹介"
                name="bio"
                placeholder="あなたについて教えてください"
              />
              <FormActions className="mt-2">
                <Button variant="secondary" onPress={close}>
                  キャンセル
                </Button>
                <Button type="submit">保存</Button>
              </FormActions>
            </Form>
          </>
        )}
      </Dialog>
    </Modal>
  </DialogTrigger>
);
