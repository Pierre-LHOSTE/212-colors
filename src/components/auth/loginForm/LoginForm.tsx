"use client";
import { login } from "@/src/actions/login";
import { LoginSchema } from "@/src/schemas/LoginSchema";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useState, useTransition } from "react";

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
    <>
      <Form
        layout="vertical"
        name="login-form"
        onFinish={onSubmit}
        // style={{ maxWidth: 600 }}
        disabled={isPending}
      >
        {/* {error ? <Alert message={error} type="error" /> : null}
        {success ? <Alert message={success} type="success" /> : null}
        {!success && !error ? (
          <Alert message="Please fill in the form" type="info" />
        ) : null} */}

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
          <Button type="primary" htmlType="submit">
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
