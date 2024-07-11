"use client";
import { changePassword } from "@/src/actions/changePassword";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import type { z } from "zod";
import MainCard from "../card/MainCard";
import { ChangePasswordSchema } from "./ChangePasswordSchema";

const rule = createSchemaFieldRule(ChangePasswordSchema);

function ProfilePwd() {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const setMessage = useSettingsStore((state) => state.setMessage);
  const { LL } = useI18nContext();

  async function submit(e: z.infer<typeof ChangePasswordSchema>) {
    startTransition(async () => {
      const res = await changePassword(e);
      if ("success" in res) {
        form.resetFields();
        setMessage({ type: "success", content: res.message });
      } else {
        handleError(res, "Error changing password");
      }
    });
  }

  return (
    <>
      <MainCard id="profile-pwd-card" title={LL.profile.changePassword.title()}>
        <Form
          layout="vertical"
          name="profile-pwd"
          onFinish={submit}
          form={form}
        >
          <Form.Item
            label={LL.profile.changePassword.currentPassword()}
            name="currentPassword"
            rules={[rule]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={LL.profile.changePassword.newPassword()}
            name="newPassword"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={LL.profile.changePassword.confirmNewPassword()}
            name="confirmNewPassword"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {LL.profile.changePassword.submit()}
            </Button>
          </Form.Item>
        </Form>
      </MainCard>
    </>
  );
}

export default ProfilePwd;
