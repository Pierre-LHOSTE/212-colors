"use client";
import { updateProject } from "@/src/api/project";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import MainCard from "../card/MainCard";
import { InfoFormSchema } from "./InfoFormSchema";

const rule = createSchemaFieldRule(InfoFormSchema);

function FormInfo({ project }: { project: any }) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [localProject, setLocalProject] = useState(project);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: localProject.name,
      description: localProject.description,
    });
  }, [project]);

  function onSubmit(values: any) {
    console.log(values);
    const newProject = {
      ...values,
      id: localProject.id,
    };
    startTransition(async () => {
      const res = await updateProject(newProject);
      if ("id" in res) {
        setLocalProject(res);
      }
    });
  }

  function checkChanges() {
    console.log("checkChanges");
    const fieldsValue = form.getFieldsValue();
    const projectValue = {
      name: localProject.name,
      description: localProject.description,
    };
    setChanged(JSON.stringify(fieldsValue) !== JSON.stringify(projectValue));
  }

  return (
    <MainCard>
      <Form
        layout="vertical"
        name="new-color-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
        onChange={checkChanges}
      >
        <Form.Item label="Nom" name="name" rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[rule]}>
          <Input.TextArea />
        </Form.Item>
        {changed ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : null}
      </Form>
    </MainCard>
  );
}

export default FormInfo;
