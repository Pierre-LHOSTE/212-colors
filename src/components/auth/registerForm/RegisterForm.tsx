"use client";
import { register } from "@/src/actions/register";
import { RegisterSchema } from "@/src/schemas/registerSchema";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useState, useTransition } from "react";

const rule = createSchemaFieldRule(RegisterSchema);

const validateConfirmPassword = ({ getFieldValue }: any) => ({
  validator(_: any, value: any) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match!"));
  },
});

function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: any) {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      register(values).then((response) => {
        setError(response.error as string);
        setSuccess(response.success as string);
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
        {/* {error ? <Alert message={error} type="error" /> : null}
        {success ? <Alert message={success} type="success" /> : null}
        {!success && !error ? (
          <Alert message="Please fill in the form" type="info" />
        ) : null}
        <br /> */}

        <header className="card-header">
          <h3>Register</h3>
        </header>

        <div>
          <Form.Item label="Username" name="name" rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[rule]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              rule,
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => validateConfirmPassword({ getFieldValue }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        {/* <Link href="/auth/login">{"Already have an account?"}</Link> */}
      </Form>
    </>
  );
}

export default RegisterForm;
