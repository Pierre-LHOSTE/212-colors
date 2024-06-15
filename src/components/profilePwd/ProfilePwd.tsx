"use client";
import { Button, Form, Input } from "antd";
import MainCard from "../card/MainCard";
import { createSchemaFieldRule } from "antd-zod";
import { ChangePasswordSchema } from "./ChangePasswordSchema";

const rule = createSchemaFieldRule(ChangePasswordSchema);

function ProfilePwd() {
  const [form] = Form.useForm();

  return (
    <>
      <MainCard id="profile-pwd-card" title="Change password">
        <Form
          layout="vertical"
          name="profile-pwd"
          onFinish={() => {}}
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
