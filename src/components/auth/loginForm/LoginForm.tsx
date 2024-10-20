"use client";
import { login } from "@/src/actions/login";
import { LoginSchema } from "@/src/schemas/LoginSchema";
import { Alert, Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useState, useTransition } from "react";
import type { z } from "zod";

const rule = createSchemaFieldRule(LoginSchema);

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await login(values);
      if (!res) return;
      if ("error" in res) {
        setError(res.error);
      } else {
        setSuccess(true);
      }
    });
  }

  return (
    <>
      <Form
        layout="vertical"
        name="login-form"
        onFinish={onSubmit}
        // style={{ maxWidth: 600 }}
        disabled={isPending}
      >
        {error ? <Alert message={error} type="error" /> : null}
        {success ? <Alert message={success} type="success" /> : null}

        <header className="card-header">
          <h3>Login</h3>
        </header>

        <div>
          <Form.Item label="Email" name="email" rules={[rule]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[rule]}>
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Login
          </Button>
        </Form.Item>
        {/* <Link href="/auth/register">{"Doesn't have an account?"}</Link>
        <Button
          onClick={() => {
            signIn("github", {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
          }}
        >
          Github
        </Button> */}
      </Form>
    </>
  );
}

export default LoginForm;
