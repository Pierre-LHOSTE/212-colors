"use client";
import { updateProject } from "@/src/api/project";
import { useDataStore } from "@/src/store/data";
import type { ProjectType } from "@/src/types/project";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import MainCard from "../card/MainCard";
import { InfoFormSchema } from "./InfoFormSchema";
import { handleError } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";

const rule = createSchemaFieldRule(InfoFormSchema);

function FormInfo({ project }: { project: ProjectType }) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [changed, setChanged] = useState(false);
  const setProject = useDataStore((state) => state.setProject);
  const setMessage = useSettingsStore((state) => state.setMessage);

  useEffect(() => {
    form.setFieldsValue({
      name: project.name,
      description: project.description,
    });
  }, [form, project]);

  function onSubmit(values: ProjectType) {
    const newProject = {
      ...values,
      id: project.id,
    };
    startTransition(async () => {
      const res = await updateProject(newProject);
      if ("id" in res) {
        setProject(res);
        setMessage({
          type: "success",
          content: "Project updated",
        });
      } else {
        handleError(res, "Failed to update project");
      }
    });
  }

  function checkChanges() {
    const fieldsValue = form.getFieldsValue();
    const projectValue = {
      name: project.name,
      description: project.description,
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
