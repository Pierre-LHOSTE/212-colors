"use client";
import { updateProject } from "@/src/api/project";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import type { ProjectType } from "@/src/types/project";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import MainCard from "../card/MainCard";
import FormIa from "../formIa/FormIa";
import { InfoFormSchema } from "./InfoFormSchema";

const rule = createSchemaFieldRule(InfoFormSchema);

export default function FormInfo({
  project,
  loading,
}: {
  project: ProjectType;
  loading: boolean;
}) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [changed, setChanged] = useState(false);
  const setProject = useDataStore((state) => state.setProject);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const { LL } = useI18nContext();

  useEffect(() => {
    form.setFieldsValue({
      name: project.name,
      description: project.description,
    });
  }, [form, project]);

  if (loading) {
    return (
      <MainCard>
        <Spin indicator={<LoadingOutlined spin />} />
      </MainCard>
    );
  }

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
        setChanged(false);
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

  const sections = [
    {
      title: LL.project.info.form.title(),
      children: (
        <>
          <Form
            layout="vertical"
            name="info-form"
            disabled={isPending}
            onFinish={onSubmit}
            form={form}
            onChange={checkChanges}
          >
            <Form.Item
              label={LL.project.info.form.name()}
              name="name"
              rules={[rule]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={LL.project.info.form.description()}
              name="description"
              rules={[rule]}
            >
              <Input.TextArea />
            </Form.Item>
            {changed ? (
              <Button type="primary" htmlType="submit" loading={isPending}>
                {LL.global.button.edit()}
              </Button>
            ) : null}
          </Form>
        </>
      ),
    },
  ];

  console.log(project.owner);

  if (project.owner.premium) {
    sections.push({
      title: LL.project.info.prompt.title(),
      children: <FormIa project={project} />,
    });
  }

  return <MainCard sections={sections}></MainCard>;
}
