"use client";
import { login } from "@/src/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/lib/routes";
import { LoginSchema } from "@/src/schemas/LoginSchema";
import { Alert, Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const rule = createSchemaFieldRule(LoginSchema);

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  function onSubmit(values: any) {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      login(values).then((response: any) => {
        if (!response) return;
        if (response.error) {
          setError(response.error as string);
        }
        if (response.success) {
          setSuccess(response.success as string);
        }
      });
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        {...layout}
        name="login-form"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
        disabled={isPending}
      >
        {error ? <Alert message={error} type="error" /> : null}
        {success ? <Alert message={success} type="success" /> : null}
        {!success && !error ? (
          <Alert message="Please fill in the form" type="info" />
        ) : null}
        <br />
        <Form.Item label="Email" name="email" rules={[rule]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[rule]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Link href="/auth/register">{"Doesn't have an account?"}</Link>
        <Button
          onClick={() => {
            signIn("github", {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
          }}
        >
          Github
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
