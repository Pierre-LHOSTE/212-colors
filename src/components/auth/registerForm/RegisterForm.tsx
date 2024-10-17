"use client";
import { register } from "@/src/actions/register";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { RegisterSchema } from "@/src/schemas/registerSchema";
import { Alert, Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { z } from "zod";

const rule = createSchemaFieldRule(RegisterSchema);

function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { LL } = useI18nContext();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      register(values).then((response) => {
        setError(response.error as string);
        setSuccess(response.success as string);
        // if (response.success) {
        //   router.push("/auth/login");
        // }
      });
    });
  }

  return (
    <>
      <Form
        layout="vertical"
        name="register-form"
        onFinish={onSubmit}
        disabled={isPending}
      >
        {error ? <Alert message={error} type="error" /> : null}
        {success ? <Alert message={success} type="success" /> : null}
        {/* {!success && !error ? (
          <Alert message="Please fill in the form" type="info" />
        ) : null} */}

        <header className="card-header">
          <h3>{LL.profile.auth.register.title()}</h3>
        </header>

        <div>
          <Form.Item
            label={LL.profile.auth.register.name()}
            name="name"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={LL.profile.auth.register.email()}
            name="email"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={LL.profile.auth.register.password()}
            name="password"
            rules={[rule]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={LL.profile.auth.register.confirmPassword()}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              rule,
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {LL.profile.auth.register.submit()}
          </Button>
        </Form.Item>
        {/* <Link href="/auth/login">{"Already have an account?"}</Link> */}
      </Form>
    </>
  );
}

export default RegisterForm;
