"use client";
import { Button, Form, Input } from "antd";
import MainCard from "../card/MainCard";
import { createSchemaFieldRule } from "antd-zod";
import { ChangePasswordSchema } from "./ChangePasswordSchema";
import type { z } from "zod";
import { changePassword } from "@/src/actions/changePassword";
import { useTransition } from "react";
import { handleError } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";

const rule = createSchemaFieldRule(ChangePasswordSchema);

function ProfilePwd() {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const setMessage = useSettingsStore((state) => state.setMessage);

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
      <MainCard id="profile-pwd-card" title="Change password">
        <Form
          layout="vertical"
          name="profile-pwd"
          onFinish={submit}
          form={form}
        >
          <Form.Item
            label="Current password"
            name="currentPassword"
            rules={[rule]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="New password" name="newPassword" rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirmNewPassword"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change password
            </Button>
          </Form.Item>
        </Form>
      </MainCard>
    </>
  );
}

export default ProfilePwd;
