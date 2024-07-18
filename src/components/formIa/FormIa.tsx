"use client";
import { updateProjectPrompt } from "@/src/api/project";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import type { ProjectType } from "@/src/types/project";
import { Button, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import { PromptFormSchema } from "./PromptFormSchema";

const rule = createSchemaFieldRule(PromptFormSchema);

export default function FormIa({ project }: { project: ProjectType }) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [changed, setChanged] = useState(false);
  const setProject = useDataStore((state) => state.setProject);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const { LL } = useI18nContext();

  useEffect(() => {
    form.setFieldsValue({
      generalPrompt: project.generalPrompt,
      namePrompt: project.namePrompt,
      descriptionPrompt: project.descriptionPrompt,
      colorPrompt: project.colorPrompt,
    });
  }, [form, project]);

  function onSubmit(values: ProjectType) {
    const newProject = {
      ...values,
      id: project.id,
    };
    console.log("🚀 ~ newProject:", newProject);
    startTransition(async () => {
      const res = await updateProjectPrompt(newProject);
      if ("id" in res) {
        setProject(res);
        setMessage({
          type: "success",
          content: "Project updated",
        });
        setChanged(false);
      } else {
        handleError(res, "Failed to update project");
      }
    });
  }

  function checkChanges() {
    const fieldsValue = form.getFieldsValue();
    const promptValue = {
      general: project.generalPrompt,
      name: project.namePrompt,
      description: project.descriptionPrompt,
      color: project.colorPrompt,
    };
    setChanged(JSON.stringify(fieldsValue) !== JSON.stringify(promptValue));
  }

  return (
    <Form
      layout="vertical"
      name="ia-form"
      disabled={isPending}
      onFinish={onSubmit}
      form={form}
      onChange={checkChanges}
    >
      <Form.Item
        label={LL.project.info.prompt.generalPrompt()}
        name="generalPrompt"
        rules={[rule]}
      >
        <Input.TextArea placeholder={LL.project.info.prompt.generalExample()} />
      </Form.Item>
      <Form.Item
        label={LL.project.info.prompt.namePrompt()}
        name="namePrompt"
        rules={[rule]}
      >
        <Input.TextArea placeholder={LL.project.info.prompt.nameExample()} />
      </Form.Item>
      <Form.Item
        label={LL.project.info.prompt.descriptionPrompt()}
        name="descriptionPrompt"
        rules={[rule]}
      >
        <Input.TextArea
          placeholder={LL.project.info.prompt.descriptionExample()}
        />
      </Form.Item>
      <Form.Item
        label={LL.project.info.prompt.colorPrompt()}
        name="colorPrompt"
        rules={[rule]}
      >
        <Input.TextArea placeholder={LL.project.info.prompt.colorExample()} />
      </Form.Item>
      {changed ? (
        <Button type="primary" htmlType="submit" loading={isPending}>
          {LL.global.button.edit()}
        </Button>
      ) : null}
    </Form>
  );
}
